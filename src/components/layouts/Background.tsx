'use client';

import { useEffect, useRef, useState } from 'react';
import { createNoise3D } from 'simplex-noise';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

export const BackGround: React.FC = () => {
  const canvasRef = useRef<HTMLElement | null>(null);
  // UI state for live tuning
  const [frequency, setFrequency] = useState<number>(0.05);
  const [amplitude, setAmplitude] = useState<number>(2.0);
  const [speed, setSpeed] = useState<number>(0.3);

  // refs used by the animation loop to read latest values without re-subscribing effect
  const frequencyRef = useRef<number>(frequency);
  const amplitudeRef = useRef<number>(amplitude);
  const speedRef = useRef<number>(speed);

  // sync refs when state changes
  useEffect(() => {
    frequencyRef.current = frequency;
  }, [frequency]);
  useEffect(() => {
    amplitudeRef.current = amplitude;
  }, [amplitude]);
  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    if (canvasRef.current) return;

    canvasRef.current = document.getElementById('bg');
    const scene = new THREE.Scene();
    const sizes = {
      width: innerWidth,
      height: innerHeight,
    };

    // カメラ
    const camera = new THREE.PerspectiveCamera(
      55,
      sizes.width / sizes.height,
      0.1,
      10000
    );
    // camera.position.z = 0;
    camera.position.set(10, 5, 10);

    // カメラコントローラ
    const controls = new OrbitControls(camera, canvasRef.current);
    // scene.add(controls);

    // レンダラ
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current || undefined,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(window.devicePixelRatio);

    // ボックスジオメトリ
    const boxGeometry1 = new THREE.BoxGeometry(4, 4, 4);
    const boxMaterial1 = new THREE.MeshLambertMaterial({
      color: '#f5f7fa',
    });
    const box1 = new THREE.Mesh(boxGeometry1, boxMaterial1);
    // box1.position.z = -5;
    // box1.rotation.set(1, 1, 1);
    scene.add(box1);
    // ボックスジオメトリ
    // const boxGeometry2 = new THREE.BoxGeometry(4, 4, 4);
    // const boxMaterial2 = new THREE.MeshLambertMaterial({
    //   color: '#f5f7fa',
    // });
    // const box2 = new THREE.Mesh(boxGeometry2, boxMaterial2);
    // box2.position.z = -4.1;
    // // box2.rotation.set(1, 1, 1);
    // scene.add(box2);

    // 地面
    const landGeometry = new THREE.PlaneGeometry(1000, 1000, 64, 64);
    // Standard マテリアルに変更してスペキュラ/ラフネスで立体感を出す
    const landMaterial = new THREE.MeshStandardMaterial({
      color: '#094cee',
      roughness: 0.75,
      metalness: 0.0,
    });
    const land = new THREE.Mesh(landGeometry, landMaterial);
    // 回転済みメッシュのローカルZを変化させるとワールドY方向に高さが出るため、
    // ここでは回転は維持してジオメトリのZ値を変化させる。
    land.rotation.x = Math.PI / -2;
    scene.add(land);

    // Simplex ノイズのセットアップ（波アニメーション用）
    const simplex = createNoise3D();
    // frequency / amplitude / speed は UI の state を参照する（refs 経由）

    // 元の頂点位置をコピーして基準にする（変更はジオメトリのZ成分に加える）
    const posAttr = land.geometry.attributes.position as THREE.BufferAttribute;
    const initialPositions = new Float32Array(posAttr.array.length);
    initialPositions.set(posAttr.array as Float32Array);

    // ライト
    // 環境光（弱めにして方向性のあるライトで陰影を作る）
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(ambientLight);
    // 半球光（空と地面の色を与え、ソフトな補助光を追加）
    const hemi = new THREE.HemisphereLight(0x87ceeb, 0x444444, 0.5);
    scene.add(hemi);
    // 平行光源（メインライト、高めの位置から斜めに当てる）
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.0);
    directionalLight.position.set(100, 200, 100);
    directionalLight.castShadow = false;
    scene.add(directionalLight);
    // 弱い点光源で近接のハイライトを少し追加
    const pointLight = new THREE.PointLight(0xffffff, 0.6, 300);
    pointLight.position.set(0, 30, 50);
    scene.add(pointLight);
    // スポット光源 (点を中心に円錐状に照射)

    // ヘルパ
    const axes = new THREE.AxesHelper(100);
    axes.material.depthTest = false;
    axes.renderOrder = 1;
    // x: red / y: green / z: blue
    scene.add(axes);
    const grids = new THREE.GridHelper(1000, 50, 0xffff00);
    scene.add(grids);
    // const plane = new THREE.Plane(new THREE.Vector3(1, 1, 0.2), 3);
    // const helper = new THREE.PlaneHelper(plane, 1, 0xffff00);
    // scene.add(helper);
    // const sptLight = new THREE.SpotLightHelper();
    // デバッグ用ヘルパは削除（見た目に影響するのでリリース時は非表示）

    // アニメーション
    // const clock = new THREE.Clock();
    let reqId = 0;
    const tick = (): void => {
      const time = performance.now() * 0.001; // 秒単位

      // 頂点ごとにノイズでZ成分を変化させる（ローカルZ -> 回転後はワールドY方向の高さになる）
      const positions = land.geometry.attributes
        .position as THREE.BufferAttribute;
      for (let i = 0; i < positions.count; i++) {
        const ix = initialPositions[i * 3];
        const iy = initialPositions[i * 3 + 1];
        // baseZ は初期のZ（PlaneGeometryでは通常0だが念のため保存値を使う）
        const baseZ = initialPositions[i * 3 + 2];
        // スライダーの最新値を refs から取得
        const f = frequencyRef.current;
        const a = amplitudeRef.current;
        const s = speedRef.current;
        const n = simplex(ix * f + time * s, iy * f + time * s, time * s * 0.7);
        const z = baseZ + n * a;
        positions.setZ(i, z);
      }
      positions.needsUpdate = true;
      // ランバート材質なので法線を再計算して照明を正しくする
      land.geometry.computeVertexNormals();

      renderer.render(scene, camera);
      reqId = window.requestAnimationFrame(tick);
    };
    reqId = window.requestAnimationFrame(tick);

    // ブラウザのリサイズ処理
    const onResize = (): void => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(window.devicePixelRatio);
    };
    window.addEventListener('resize', onResize);

    // クリーンアップ
    const cleanup = (): void => {
      window.removeEventListener('resize', onResize);
      if (reqId) window.cancelAnimationFrame(reqId);
      try {
        controls.dispose();
      } catch {
        // ignore
      }
      // dispose geometries / materials / renderer
      try {
        land.geometry.dispose();
        landMaterial.dispose();
        box1.geometry.dispose();
        boxMaterial1.dispose();
        renderer.dispose();
      } catch {
        // ignore dispose errors
      }
    };
    return cleanup;
  }, []);

  return (
    <div className="absolute inset-0">
      <canvas id="bg" className="w-full h-full block" />

      {/* コントロールパネル（右上） */}
      <div className="fixed top-4 right-4 z-50 bg-white/80 dark:bg-black/60 text-black dark:text-white p-3 rounded-lg shadow-md w-64">
        <div className="mb-2 font-medium">Wave Controls</div>

        <label className="text-xs">
          Frequency:
          <span className="font-mono">{frequency.toFixed(3)}</span>
        </label>
        <input
          type="range"
          min="0.005"
          max="0.2"
          step="0.005"
          value={frequency}
          onChange={(e) => {
            const v = parseFloat(e.target.value);
            setFrequency(v);
            frequencyRef.current = v;
          }}
          className="w-full"
        />

        <label className="text-xs">
          Amplitude:
          <span className="font-mono">{amplitude.toFixed(2)}</span>
        </label>
        <input
          type="range"
          min="0"
          max="5"
          step="0.1"
          value={amplitude}
          onChange={(e) => {
            const v = parseFloat(e.target.value);
            setAmplitude(v);
            amplitudeRef.current = v;
          }}
          className="w-full"
        />

        <label className="text-xs">
          Speed:
          <span className="font-mono">{speed.toFixed(2)}</span>
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={speed}
          onChange={(e) => {
            const v = parseFloat(e.target.value);
            setSpeed(v);
            speedRef.current = v;
          }}
          className="w-full"
        />
      </div>
    </div>
  );
};
