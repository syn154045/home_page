'use client';

import React, { JSX, useEffect, useRef } from 'react';
import { createNoise3D } from 'simplex-noise';
import * as THREE from 'three';

/*
  調整可能なパラメータはここを編集してください。
  - COUNT: 表示するボイド（鳥）の数。値を下げると軽くなります。
  - MAX_SPEED / MAX_FORCE: 動きの速さと曲がりやすさ。
  - BG_COLOR / BG_OPACITY: 背景色と透明度（透明にしたい場合は BG_OPACITY を 0 にします）。
  - BOID_COLOR / BOID_OPACITY: 個体の色と透明度。
  - MOUSE_REPEL_*: マウスへの反発挙動の調整。
*/
const CONFIG = {
  COUNT: 800, // ← ここを変えると個体数が変わります（性能に直結）
  MAX_SPEED: 0.8, // ← 全体の速さを上げたいときは大きくする
  MAX_FORCE: 0.028, // ← 瞬時の向き変更の強さ（大きいほど急に曲がる）
  PERCEPTION: 10, // ← 近傍探索半径（群れの協調範囲）
  SEPARATION_DIST: 10, // ← 距離がこれより近いと分離（衝突回避）を強める
  ALIGNMENT_WEIGHT: 0.4,
  COHESION_WEIGHT: 0.5,
  SEPARATION_WEIGHT: 1.6,
  NOISE_WEIGHT: 0.45, // ← ノイズで渦巻き感を付与（ムクドリっぽさ）
  NOISE_SCALE: 0.002,
  BOUNDS_PADDING: 10, // ← 画面端で押し戻す幅（大きいと端に近づきにくい）
  MOUSE_REPEL_RADIUS: 50,
  MOUSE_REPEL_STRENGTH: 1.8,
  Z_DEPTH: 20, // ← 群れの奥行き（z方向の広がり）
  BG_COLOR: 0xf7f7f8, // ← 背景色（16進数）
  BG_OPACITY: 0.0, // ← 背景の透明度（0〜1）
  BOID_COLOR: 0x395771, // ← 個体の色
  BOID_OPACITY: 0.5, // ← 個体の透明度
  DITHER: true,
};

/*
  Boid クラス: 各個体の位置・速度・加速度を管理
  - edges(): 画面端でラップするのではなく、端に近づいたら速度を弱くして押し戻す
  - update(): 加速度を速度に適用して位置を更新
*/
class Boid {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  acceleration: THREE.Vector3;

  constructor(x: number, y: number, z: number) {
    this.position = new THREE.Vector3(x, y, z);
    const angle = Math.random() * Math.PI * 2;
    this.velocity = new THREE.Vector3(
      Math.cos(angle),
      Math.sin(angle),
      (Math.random() - 0.5) * 0.3
    );
    this.acceleration = new THREE.Vector3();
  }

  // 画面端（ボリューム端）に近づいたら速度を調整して戻す
  edges(width: number, height: number, depth: number, pad: number): void {
    if (this.position.x > width / 2 - pad) this.velocity.x -= 0.05;
    if (this.position.x < -width / 2 + pad) this.velocity.x += 0.05;
    if (this.position.y > height / 2 - pad) this.velocity.y -= 0.05;
    if (this.position.y < -height / 2 + pad) this.velocity.y += 0.05;
    if (this.position.z > depth / 2 - pad) this.velocity.z -= 0.05;
    if (this.position.z < -depth / 2 + pad) this.velocity.z += 0.05;
  }

  // 速度を更新して位置に加算（毎フレーム呼ばれる）
  update(maxSpeed: number): void {
    this.velocity.add(this.acceleration);
    if (this.velocity.length() > maxSpeed) {
      this.velocity.setLength(maxSpeed);
    }
    this.position.add(this.velocity);
    this.acceleration.multiplyScalar(0);
  }

  applyForce(force: THREE.Vector3): void {
    this.acceleration.add(force);
  }
}

/*
  SpatialHash: 簡易的な空間ハッシュで近傍探索を高速化
  - 大量の個体に対して O(N) に近い振る舞いを目指す（完全な k-d tree ほど高機能ではない）
*/
class SpatialHash {
  private cellSize: number;
  private map: Map<string, number[]>;

  constructor(cellSize: number) {
    this.cellSize = cellSize;
    this.map = new Map();
  }

  key(x: number, y: number, z: number): string {
    const cx = Math.floor(x / this.cellSize);
    const cy = Math.floor(y / this.cellSize);
    const cz = Math.floor(z / this.cellSize);
    return `${cx},${cy},${cz}`;
  }

  build(positions: Float32Array): void {
    this.map.clear();
    for (let i = 0; i < positions.length; i += 3) {
      const k = this.key(positions[i], positions[i + 1], positions[i + 2]);
      const arr = this.map.get(k) || [];
      arr.push(i / 3);
      this.map.set(k, arr);
    }
  }

  // 指定位置の近傍セル（3x3x3）を返す
  neighbors(x: number, y: number, z: number): number[] {
    const cx = Math.floor(x / this.cellSize);
    const cy = Math.floor(y / this.cellSize);
    const cz = Math.floor(z / this.cellSize);
    const idxs: number[] = [];
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        for (let dz = -1; dz <= 1; dz++) {
          const k = `${cx + dx},${cy + dy},${cz + dz}`;
          const arr = this.map.get(k);
          if (arr) idxs.push(...arr);
        }
      }
    }
    return idxs;
  }
}

export default function BoidsBackground(): JSX.Element {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // シーンとカメラ
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 2000);
    camera.position.set(0, 0, 420);

    // レンダラ: alpha=true にして背景の透明度制御を可能にする
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    if (CONFIG.DITHER) renderer.outputColorSpace = THREE.SRGBColorSpace;
    // 背景色と透明度をここで設定（BG_OPACITY を 0 にすれば透明）
    renderer.setClearColor(CONFIG.BG_COLOR, CONFIG.BG_OPACITY);
    container.appendChild(renderer.domElement);

    // インスタンス描画用のジオメトリ（小さなコーン）
    const boidGeom = new THREE.ConeGeometry(1.8, 6, 5);
    boidGeom.rotateX(Math.PI / 2);
    const boidMat = new THREE.MeshBasicMaterial({
      color: CONFIG.BOID_COLOR,
      transparent: true,
      opacity: CONFIG.BOID_OPACITY,
    });

    const instanced = new THREE.InstancedMesh(boidGeom, boidMat, CONFIG.COUNT);
    instanced.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(instanced);

    // Boid 配列と位置配列（インスタンスの matrix を更新するために使用）
    const boids: Boid[] = [];
    const positions = new Float32Array(CONFIG.COUNT * 3);
    const noise3D = createNoise3D();

    let volumeWidth = width;
    let volumeHeight = height;
    let volumeDepth = CONFIG.Z_DEPTH;

    // 初期化: それぞれの個体をボリューム内にランダム配置
    for (let i = 0; i < CONFIG.COUNT; i++) {
      const x = (Math.random() - 0.5) * volumeWidth;
      const y = (Math.random() - 0.5) * volumeHeight;
      const z = (Math.random() - 0.5) * volumeDepth;
      boids.push(new Boid(x, y, z));
      positions.set([x, y, z], i * 3);
    }

    const hash = new SpatialHash(CONFIG.PERCEPTION);

    // マウス位置をワールド座標に変換するためのセットアップ
    const mouse = new THREE.Vector2();
    const mouse3 = new THREE.Vector3();
    const raycaster = new THREE.Raycaster();

    // スクリーン座標（px） -> ワールド座標（z=0 平面上）
    function screenToWorld(x: number, y: number): void {
      const ndc = new THREE.Vector2(
        (x / renderer.domElement.clientWidth) * 2 - 1,
        -(y / renderer.domElement.clientHeight) * 2 + 1
      );
      raycaster.setFromCamera(ndc, camera);
      const t = -raycaster.ray.origin.z / raycaster.ray.direction.z;
      mouse3
        .copy(raycaster.ray.origin)
        .add(raycaster.ray.direction.clone().multiplyScalar(t));
    }

    function onMove(e: MouseEvent): void {
      mouse.set(e.clientX, e.clientY);
      screenToWorld(e.clientX, e.clientY);
    }
    function onTouch(e: TouchEvent): void {
      const t = e.touches[0];
      if (!t) return;
      mouse.set(t.clientX, t.clientY);
      screenToWorld(t.clientX, t.clientY);
    }

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('touchmove', onTouch, { passive: true });

    const dummy = new THREE.Object3D();

    /*
      メインループ（step）:
      1) positions 配列を更新して SpatialHash を再構築
      2) 各 Boid について近傍を調べ、Alignment / Cohesion / Separation を計算
      3) Simplex ノイズで渦巻き（ランダムだが滑らかな力）を付与
      4) マウスの近傍なら反発力を追加
      5) 合成した力を加えて Boid を更新、インスタンス行列を書き換え
    */
    function step(): void {
      // positions 配列に現在位置を書き戻し
      for (let i = 0; i < CONFIG.COUNT; i++) {
        const b = boids[i];
        positions[i * 3] = b.position.x;
        positions[i * 3 + 1] = b.position.y;
        positions[i * 3 + 2] = b.position.z;
      }

      // 空間ハッシュを構築（近傍探索の高速化）
      hash.build(positions);

      // 再利用ベクトルを上で宣言してガベージ発生を抑える（ループ内で new をなるべく避ける）
      const sepVec = new THREE.Vector3();
      const aliVec = new THREE.Vector3();
      const cohVec = new THREE.Vector3();
      const toNeighbor = new THREE.Vector3();

      const time = performance.now() * 0.001;

      for (let i = 0; i < CONFIG.COUNT; i++) {
        const b = boids[i];

        // 各種ベクトルをリセット
        sepVec.set(0, 0, 0);
        aliVec.set(0, 0, 0);
        cohVec.set(0, 0, 0);

        let total = 0;
        const neighIdxs = hash.neighbors(
          b.position.x,
          b.position.y,
          b.position.z
        );

        // 近傍の個体を走査して Alignment / Cohesion / Separation を蓄積
        for (const idx of neighIdxs) {
          if (idx === i) continue;
          toNeighbor.set(
            positions[idx * 3] - b.position.x,
            positions[idx * 3 + 1] - b.position.y,
            positions[idx * 3 + 2] - b.position.z
          );
          const d = toNeighbor.length();
          if (d < CONFIG.PERCEPTION && d > 0.0001) {
            aliVec.add(boids[idx].velocity); // 近傍の速度を足して平均を作る（整列）
            cohVec.add(
              new THREE.Vector3(
                positions[idx * 3],
                positions[idx * 3 + 1],
                positions[idx * 3 + 2]
              )
            ); // 近傍の重心（結合）
            if (d < CONFIG.SEPARATION_DIST) {
              sepVec.add(toNeighbor.clone().multiplyScalar(-1 / (d + 0.0001))); // 近すぎたら押し返す（分離）
            }
            total++;
          }
        }

        // 平均化してステアリングベクトルを作る
        if (total > 0) {
          aliVec.multiplyScalar(1 / total);
          aliVec
            .setLength(CONFIG.MAX_SPEED)
            .sub(b.velocity)
            .clampLength(0, CONFIG.MAX_FORCE);

          cohVec.multiplyScalar(1 / total).sub(b.position);
          cohVec
            .setLength(CONFIG.MAX_SPEED)
            .sub(b.velocity)
            .clampLength(0, CONFIG.MAX_FORCE);

          sepVec.multiplyScalar(1 / total);
          sepVec
            .setLength(CONFIG.MAX_SPEED)
            .sub(b.velocity)
            .clampLength(0, CONFIG.MAX_FORCE);
        }

        // ノイズを使って渦巻きっぽい挙動を追加（滑らかな擬似乱数）
        const nx = noise3D(
          b.position.x * CONFIG.NOISE_SCALE,
          b.position.y * CONFIG.NOISE_SCALE,
          time * 0.25
        );
        const ny = noise3D(
          (b.position.x + 1000) * CONFIG.NOISE_SCALE,
          (b.position.y + 1000) * CONFIG.NOISE_SCALE,
          time * 0.27
        );
        const nz = noise3D(
          (b.position.x - 1000) * CONFIG.NOISE_SCALE,
          (b.position.y - 1000) * CONFIG.NOISE_SCALE,
          time * 0.23
        );
        const noiseForce = new THREE.Vector3(nx, ny, nz).multiplyScalar(
          CONFIG.NOISE_WEIGHT
        );

        // マウスからの反発力（マウス位置は mouse3 に入っている）
        const toMouse = mouse3.clone().sub(b.position);
        const distMouse = toMouse.length();
        let mouseForce = new THREE.Vector3();
        if (distMouse < CONFIG.MOUSE_REPEL_RADIUS) {
          // 距離に応じて強さを減衰させる
          mouseForce = toMouse
            .multiplyScalar(-1)
            .setLength(
              (CONFIG.MOUSE_REPEL_STRENGTH *
                (CONFIG.MOUSE_REPEL_RADIUS - distMouse)) /
                CONFIG.MOUSE_REPEL_RADIUS
            );
        }

        // 最終的なステアリングベクトルを合成
        const steer = new THREE.Vector3();
        steer
          .add(aliVec.multiplyScalar(CONFIG.ALIGNMENT_WEIGHT))
          .add(cohVec.multiplyScalar(CONFIG.COHESION_WEIGHT))
          .add(sepVec.multiplyScalar(CONFIG.SEPARATION_WEIGHT))
          .add(noiseForce)
          .add(mouseForce);

        b.applyForce(steer.clampLength(0, CONFIG.MAX_FORCE * 2.0));

        // 位置と速度を更新し、端で押し戻す
        b.update(CONFIG.MAX_SPEED);
        b.edges(volumeWidth, volumeHeight, volumeDepth, CONFIG.BOUNDS_PADDING);

        // インスタンスの行列を更新（位置・向き）
        dummy.position.copy(b.position);
        const dir = b.velocity.clone();
        if (dir.lengthSq() > 0.0001) {
          dummy.lookAt(dummy.position.clone().add(dir));
        }
        dummy.updateMatrix();
        instanced.setMatrixAt(i, dummy.matrix);
      }

      // GPU にインスタンス行列の更新を伝える
      instanced.instanceMatrix.needsUpdate = true;

      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(step);
    }

    rafRef.current = requestAnimationFrame(step);

    // リサイズ時の処理（表示ボリュームを更新）
    function onResize(): void {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      volumeWidth = w;
      volumeHeight = h;
      volumeDepth = CONFIG.Z_DEPTH;
    }
    const resizeObs = new ResizeObserver(onResize);
    resizeObs.observe(container);

    // クリーンアップ
    return (): void => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onTouch);
      resizeObs.disconnect();
      container.removeChild(renderer.domElement);
      boidGeom.dispose();
      boidMat.dispose();
      renderer.dispose();
    };
  }, []);

  // 背景は固定でページの背面に置く。必要ならスタイルを変えてセクション限定表示も可能。
  return (
    <div
      ref={mountRef}
      className="fixed inset-0 -z-10"
      style={{ pointerEvents: 'auto' }}
      aria-hidden
    />
  );
}
