'use client';

import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeScene = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const meshRef = useRef<THREE.Mesh | null>(null);
    
    useEffect(() => {
        // シーン・カメラ・レンダラー
        const mount = mountRef.current!;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

        // レンダラーサイズの設定 & DOM追加
        renderer.setSize(window.innerWidth, window.innerHeight);
        mount.appendChild(renderer.domElement);

        // グループ（地球・大気圏）
        const group = new THREE.Group();
        group.rotation.z = 23.4 * Math.PI / 180;
        scene.add(group);
        
        // テクスチャ（地球）・ジオメトリ・マテリアル（色・影など）・メッシュ（ジオメトリとマテリアルの統合）の設定
        const txLoader = new THREE.TextureLoader();
        const earthTx = txLoader.load('../../../../assets/earth_tx.jpg');
        const geometry = new THREE.IcosahedronGeometry(1, 12);
        // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        // const material = new THREE.MeshPhongMaterial({
        //     color: 0x156289,
        //     emissive: 0x072534,
        //     side: THREE.DoubleSide,
        //     flatShading: true,
        //     map: earthTx,
        // });
        const material = new THREE.MeshStandardMaterial({
            color: 0xffff00,
            map: earthTx,
        })
        const mesh = new THREE.Mesh(geometry, material);
        group.add(mesh);

        // 光源
        // 点光源（特定の位置から全方向に光を放射する
        // const pointLight = new THREE.PointLight(0xffffff, 1, 100);
        // pointLight.position.set(0, 10, 0);
        // scene.add(pointLight);
        // スポットライト（特定の方向に円錐状の光を放射する
        // const spotLight = new THREE.SpotLight(0xffffff);
        // spotLight.position.set(100, 1000, 100);
        // spotLight.castShadow = true;
        // scene.add(spotLight);
        // 平行光源（太陽光のような平行な光線を生成
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(-2, 0.5, 1.5);
        scene.add(directionalLight);
        
        // 影
        renderer.shadowMap.enabled = true;
        // pointLight.castShadow = true;
        // spotLight.castShadow = true;
        directionalLight.castShadow = true;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        
        // カメラの位置
        camera.position.z = 5;

        // refに保存
        sceneRef.current = scene;
        cameraRef.current = camera;
        rendererRef.current = renderer;
        meshRef.current = mesh;
        
        // アニメーションループ
        const animate = () => {
            requestAnimationFrame(animate);
            // mesh.rotation.x += 0.01;
            mesh.rotation.y += 0.005;
            renderer.render(scene, camera);
        };
        animate();

        // スクロールイベント
        const handleScroll = () => {
            const scrollY = window.scrollY;
            
            if (meshRef.current) {
                // 拡大・縮小
                gsap.to(meshRef.current.scale, {
                    x: 1 + scrollY / 500,
                    y: 1 + scrollY / 500,
                    z: 1 + scrollY / 500,
                    duration: 0.5
                })
                // 左右移動
                gsap.to(meshRef.current.position, {
                    x: Math.sin(scrollY / 100) * 2,
                    duration: 0.5
                });
                // 回転
                // gsap.to(meshRef.current.rotation, {
                //     y: scrollY / 100,
                //     duration: 0.5
                // });
            }
            // フェードイン・フェードアウト
            const opacity = Math.max(0, Math.min(1, 1 - (scrollY / 500) / 500));
            if (meshRef.current && meshRef.current.material instanceof THREE.MeshBasicMaterial) {
                meshRef.current.material.opacity = opacity;
                meshRef.current.material.transparent = true;
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            mount.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full" />;
};

export default ThreeScene;

