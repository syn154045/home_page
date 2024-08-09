'use client';

import { gsap } from 'gsap';
import React, { useEffect, useRef } from 'react';
import { createNoise3D } from 'simplex-noise';
import * as THREE from 'three';

const BubbleScene: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const bubbleRef = useRef<THREE.Mesh | null>(null);
    
    useEffect(() => {
        const canvas = canvasRef.current!;
        let width = canvas.offsetWidth;
        let height = canvas.offsetHeight;
        
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true,
        });
        const scene = new THREE.Scene();
        const noise3D = createNoise3D();
        
        // レンダラーの設定
        const setup = () => {
            // ピクセル比
            renderer.setPixelRatio(window.devicePixelRatio);
            // サイズ
            renderer.setSize(width, height);
            // 背景透過（renderer alpha: trueと併せて定義）
            renderer.setClearColor(0x000000, 0);
            // 地面への影描写 (createPlaneで範囲を設定)
            renderer.shadowMap.enabled = true;
            // 霧による奥行き(色、開始距離、終点距離)
            scene.fog = new THREE.Fog(0x000000, 100, 450);
            
            // 透視投影（視野角 / アスペクト比 / 近クリップ面 / 遠クリップ面)
            const camera = new THREE.PerspectiveCamera(
                75,
                width / height,
                0.1,
                10000
            );
            // カメラの位置（x=左右位置, y=仰角?, z=距離)
            camera.position.set(0, 0, 350);

            /** 光源 */
            const createLights = () => {
                // 環境光＋天頂光を組み合わせた半球
                const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x000000, 0.5);
                
                // 平行光源
                const shadowLight = new THREE.DirectionalLight(0xff8f16, 0.4);
                // 光源位置
                shadowLight.position.set(0, 450, 350);
                shadowLight.castShadow = true;
                // シャドウカメラの設定
                shadowLight.shadow.camera.left = -650;
                shadowLight.shadow.camera.right = 650;
                shadowLight.shadow.camera.top = 650;
                shadowLight.shadow.camera.bottom = -650;
                shadowLight.shadow.camera.near = 1;
                shadowLight.shadow.camera.far = 1000;
                shadowLight.shadow.mapSize.width = 4096;
                shadowLight.shadow.mapSize.height = 4096;
                
                // 平行光源２
                const light2 = new THREE.DirectionalLight(0xfff150, 0.25);
                light2.position.set(-600, 350, 350);
                
                // 平行光源３
                const light3 = new THREE.DirectionalLight(0xfff150, 0.15);
                light3.position.set(0, -250, 300);
                
                scene.add(hemisphereLight);
                scene.add(shadowLight);
                scene.add(light2);
                scene.add(light3);
            };
            createLights();

            /** 球体 */
            // ウィンドウ幅に応じて球体のジオメトリの細かさを設定
            const vertex = width > 600 ? 100 : 40;
            // ジオメトリ（球体）
            const bubbleGeometry = new THREE.SphereGeometry(120, vertex, vertex);
            // メッシュ
            let bubble: THREE.Mesh;
            const createBubble = () => {
                const bubbleMaterial = new THREE.MeshStandardMaterial({
                    emissive: 0x4effef,         // 球体の色(Hex)
                    emissiveIntensity: 0.8,     // 自発光強度
                    roughness: 0.6,             // 表面の粗さ(光沢 < 0 to 1 > マット)
                    metalness: 0.3,             // 金属度(非金属 < 0 to 1 > 金属)
                    side: THREE.FrontSide,      // 描画する面（基本は表面のみ？）
                });
                bubble = new THREE.Mesh(bubbleGeometry, bubbleMaterial);
                bubble.castShadow = true;
                scene.add(bubble);
                bubbleRef.current = bubble;
            };
            createBubble();

            /** 影を受ける平面 */
            const createPlane = () => {
                // 影
                const planeGeometry = new THREE.PlaneGeometry(2000, 2000);
                // 影の濃さ
                const planeMaterial = new THREE.ShadowMaterial({
                    opacity: 0.08,
                });
                const plane = new THREE.Mesh(planeGeometry, planeMaterial);
                plane.position.set(0, -200, 0);
                plane.rotation.x = Math.PI / 180 * -90;
                plane.receiveShadow = true;
                scene.add(plane);
            };
            createPlane();

            /** ウィンドウリサイズ対応 */
            const onResize = () => {
                canvas.style.width = '';
                canvas.style.height = '';
                width = canvas.offsetWidth;
                height = canvas.offsetHeight;
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
                renderer.setSize(width, height);
            };
            let resizeTm: NodeJS.Timeout;
            window.addEventListener('resize', function () {
                clearTimeout(resizeTm);
                resizeTm = setTimeout(onResize, 200);
            });
            
            /** ノイズ設定 */
            // 値を別の範囲にマッピング
            const map = (num: number, in_min: number, in_max: number, out_min: number, out_max: number) => {
                return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
            };
            const updateVertices = (time: number) => {
                // ノイズ量
                const noiseScale = 0.012;
                // 頂点変動量
                const displacementScale = 10;
                // 頂点の位置を取得
                const positionAttribute = bubbleGeometry.getAttribute('position');
                // 3Dベクトル
                const vertex = new THREE.Vector3();
                
                for (let i = 0; i < positionAttribute.count; i++) {
                    vertex.fromBufferAttribute(positionAttribute, i);
                    // 3Dノイズ
                    const noiseValue = noise3D(
                        vertex.x * noiseScale,
                        vertex.y * noiseScale,
                        vertex.z * noiseScale + time * 0.0005
                    );
                    // ノイズ値: -1 to 1 -> -displacementScale to displacementScale内でマッピング
                    const displacement = map(noiseValue, -1, 1, -displacementScale, displacementScale);
                    // 頂点を正規化
                    vertex.normalize().multiplyScalar(120 + displacement);
                    // 頂点位置更新
                    positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
                }
                
                positionAttribute.needsUpdate = true;
            };
            
            /** レンダラー */
            const render = (a: number) => {
                requestAnimationFrame(render);
                bubble.rotation.y += 0.0005;
                bubble.rotation.z += 0.005;
                updateVertices(a);
                renderer.clear();
                renderer.render(scene, camera);
            };
            requestAnimationFrame(render);
            renderer.render(scene, camera);
            
            /** スクロールイベント */
            const onScroll = () => {
                const scrollY = window.scrollY;
                const startScroll = 200;
                const endScroll = 400;
                const maxMove = 200;
                if (scrollY >= startScroll && scrollY <= endScroll) {
                    const progress = (scrollY - startScroll) / (endScroll - startScroll);
                    const moveX = progress * maxMove;
                    gsap.to(bubbleRef.current!.position, {
                        x: moveX,
                        duration: 0.5,
                    });
                }
            };
            window.addEventListener('scroll', onScroll);
            
            return () => {
                window.removeEventListener('scroll', onScroll);
            };
        };
        
        setup();
    }, []);
    
    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-screen" />;
};

export default BubbleScene;
