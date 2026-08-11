'use client';

import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import { createNoise3D } from 'simplex-noise';
import * as THREE from 'three';

/**
 * BgTest2
 * シンプルでエンジニアらしい背景コンポーネント
 * - three.js で点群 (Points) を生成
 * - simplex-noise で自然な頂点変形
 * - anime.js で初期フェードイン / スクロール反応のトゥイーン
 *
 * コンセプト案: "Reactive Grid" — ミニマルな点のグリッドが
 * 時間とスクロールに応じてうねる。目立ちすぎず、サイトの前景を
 * 引き立てるモダンな印象を与える。
 */

const BgTest2: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const rafRef = useRef<number | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    if (!canvas) return;

    let width = canvas.clientWidth || window.innerWidth;
    let height = canvas.clientHeight || window.innerHeight;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 2000);
    camera.position.set(0, 0, 300);

    // グループを作って全体操作をしやすくする
    const group = new THREE.Group();
    scene.add(group);
    groupRef.current = group;

    // 軽めの環境光
    const hemi = new THREE.HemisphereLight(0xffffff, 0x000000, 0.4);
    scene.add(hemi);

    // パーティクル設定
    const particleCount = 5000; // パフォーマンス考慮
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 8);
    const sizes = new Float32Array(particleCount);

    const color = new THREE.Color();
    const spread = 420;
    for (let i = 0; i < particleCount; i++) {
      const r = THREE.MathUtils.randFloatSpread(spread);
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      const x = Math.cos(theta) * Math.cos(phi) * (200 + r * 0.2);
      const y = Math.sin(phi) * (120 + r * 0.1);
      const z = Math.sin(theta) * Math.cos(phi) * (200 + r * 0.2);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // 色味は淡いシアン〜薄紫のグラデーション
      color.setHSL(
        0.52 + Math.random() * 0.06,
        0.6,
        0.45 + Math.random() * 0.1
      );
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = 2 + Math.random() * 3;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('customColor', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // マテリアル - 頂点色を使った小粒子
    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthTest: true,
      uniforms: {
        color: { value: new THREE.Color(0xffffff) },
        pointTexture: { value: null },
        uTime: { value: 0 },
      },
      vertexShader: `
        attribute float size;
        attribute vec3 customColor;
        varying vec3 vColor;
        uniform float uTime;
        void main(){
          vColor = customColor;
          vec3 pos = position;
          // 振幅を小さくして高速な揺れを抑える（滑らかな動きにする）
          pos += normalize(position) * (sin(uTime * 0.0002 + position.x * 0.005) * 0.6);
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main(){
          float d = length(gl_PointCoord - vec2(0.5));
          float alpha = smoothstep(0.5, 0.25, d);
          gl_FragColor = vec4(vColor, alpha * 0.9);
        }
      `,
    });

    const points = new THREE.Points(geometry, material);
    points.frustumCulled = false;
    group.add(points);

    // ノイズで位置をちょっと動かす
    const noise3D = createNoise3D();
    const basePositions = new Float32Array(positions); // 元座標を保持

    const clockStart = Date.now();

    const onResize = (): void => {
      width = canvas.clientWidth || window.innerWidth;
      height = canvas.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', onResize);

    // ポインタ（マウス／タッチ）追跡: canvas の中央基準で -0.5..0.5 に正規化して保持
    const onPointerMove = (e: PointerEvent): void => {
      const rect = canvas.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width; // 0..1
      const ny = (e.clientY - rect.top) / rect.height; // 0..1
      mouseRef.current.x = nx - 0.2; // -0.5 .. 0.5
      mouseRef.current.y = 0.2 - ny; // 上が正
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    // 初期フェードイン（anime.js）
    // anime の内部構造に依存すると実行時に undefined になることがあるため
    // アニメーション対象オブジェクトを外側で保持して参照する方式にする。
    const fade = { v: 0 };
    animate(fade, {
      v: 1,
      duration: 900,
      easing: 'easeOutCubic',
      update: () => {
        // group にスケールと軽い回転でフェードイン感をつける
        const t = fade.v;
        group.scale.setScalar(0.9 + 0.1 * t);
        group.rotation.y = (1 - t) * 0.12;
        const uTimeUniform = material.uniforms.uTime as { value: number };
        uTimeUniform.value = (Date.now() - clockStart) * 0.5;
      },
    });

    // スクロールでわずかに回転させる（anime.js）
    // 以前はスクロール終了時に元に戻すアニメが走っていたため
    // その処理を削除し、常に現在のスクロール位置に対応する角度へ
    // アニメーションで補間する実装に変更する。
    const onScroll = (): void => {
      const progress = Math.min(window.scrollY / 800, 1);
      animate(group.rotation, {
        y: -0.035 * progress,
        duration: 7000,
        easing: 'easeOutQuad',
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // レンダーループ（高速な個別sinは削除し、ノイズのみで滑らかに動かす）
    const render = (): void => {
      const time = Date.now() - clockStart;
      const posAttr = geometry.getAttribute(
        'position'
      ) as THREE.BufferAttribute;
      // 線形補間係数（小さいほど滑らかで遅延が出る）
      const lerpFactor = 0.06;
      for (let i = 0; i < particleCount; i++) {
        const ix = i * 3;
        const bx = basePositions[ix];
        const by = basePositions[ix + 1];
        const bz = basePositions[ix + 2];

        const n = noise3D(bx * 0.004, by * 0.004, bz * 0.004 + time * 0.00045);
        const displacement = n * 5.0; // 振幅を少し抑える

        const targetX = bx + displacement;
        const targetY = by + displacement * 0.5;
        const targetZ = bz - displacement * 0.35;

        // 現在値からターゲットへ lerp して高速往復を抑える
        const curX = posAttr.array[ix];
        const curY = posAttr.array[ix + 1];
        const curZ = posAttr.array[ix + 2];

        posAttr.array[ix] = curX + (targetX - curX) * lerpFactor;
        posAttr.array[ix + 1] = curY + (targetY - curY) * lerpFactor;
        posAttr.array[ix + 2] = curZ + (targetZ - curZ) * lerpFactor;
      }
      posAttr.needsUpdate = true;
      (material.uniforms.uTime as { value: number }).value = time;

      // マウスによるパララックス（控えめに適用）
      // const mx = mouseRef.current.x; // -0.5..0.5
      // const my = mouseRef.current.y; // -0.5..0.5
      // // 位置の遅延追従（係数を下げて動きを小さくする）
      // group.position.x += (mx * 10 - group.position.x) * 0.02; // was 60,0.06
      // group.position.y += (my * 12 - group.position.y) * 0.02; // was 40,0.06
      // // 軽い回転を与えて視差感を強める（z 軸回転） — 小さく
      // group.rotation.z += (mx * -0.02 - group.rotation.z) * 0.04; // was -0.06,0.06

      // 粒子自体を常時ゆっくり回転させる（スクロールによる group.rotation.y と競合しない）
      points.rotation.y += 0.0005; // 調整可: 回転速度

      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    // クリーンアップ
    return (): void => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onPointerMove as EventListener);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="fixed w-full h-screen -z-10">
      <canvas
        ref={canvasRef}
        className="fixed inset-0 size-full"
        style={{ zIndex: 0 }}
      />
    </div>
  );
};

export default BgTest2;
