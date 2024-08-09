// components/elements/three/_ThreeScene.tsx
'use client';

import { getFresnelMat } from '@/lib/three/GetFresnelMat';
import getStarfield from '@/lib/three/GetStarField';
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeScene = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    // const meshRef = useRef<THREE.Mesh | null>(null);
    // const meshRef = useRef<THREE.Mesh | null>(null);
    const groupRef = useRef<THREE.Group | null>(null);

    useEffect(() => {
        // 初期化
        const mount = mountRef.current!;
        // シーン
        const scene = new THREE.Scene();
        // カメラ
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;
        // レンダラー
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        mount.appendChild(renderer.domElement);     // DOM追加
        // テクスチャローダー
        const txLoader = new THREE.TextureLoader();

        
        // グループ（地球・大気圏）
        const earthGroup = new THREE.Group();
        earthGroup.rotation.z = -23.4 * Math.PI / 180;
        scene.add(earthGroup);

        // const geometry2 = new THREE.IcosahedronGeometry(1, 12);
        // const material2 = new THREE.ShaderMaterial({
        //     uniforms: {
        //         color: { value: new THREE.Color(0x000000) },
        //         rimColor: { value: new THREE.Color(0x0077ff) },
        //         glowColor: { value: new THREE.Color(0x00ffff) },
        //         rimPower: { value: 4.0 },
        //         glowPower: { value: 2.5 },
        //     },
        //     vertexShader: `
        //         varying vec3 vNormal;
        //         varying vec3 vViewPosition;
                
        //         void main() {
        //             vNormal = normalize(normalMatrix * normal);
        //             vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        //             vViewPosition = -mvPosition.xyz;
        //             gl_Position = projectionMatrix * mvPosition;
        //         }
        //     `,
        //     fragmentShader: `
        //         uniform vec3 color;
        //         uniform vec3 rimColor;
        //         uniform vec3 glowColor;
        //         uniform float rimPower;
        //         uniform float glowPower;
                
        //         varying vec3 vNormal;
        //         varying vec3 vViewPosition;
                
        //         void main() {
        //             vec3 normal = normalize(vNormal);
        //             vec3 viewDir = normalize(vViewPosition);
                    
        //             // リムライティング
        //             float rim = 1.0 - max(dot(viewDir, normal), 0.0);
        //             rim = pow(rim, rimPower);
                    
        //             // 後発光
        //             float glow = max(dot(viewDir, normal), 0.0);
        //             glow = 1.0 - pow(glow, glowPower);
                    
        //             vec3 finalColor = color + rim * rimColor + glow * glowColor;
                    
        //             // 0.3 = 透明度
        //             gl_FragColor = vec4(finalColor, 0.2);
        //         }
        //     `,
        //     transparent: true,
        //     blending: THREE.AdditiveBlending,
        // });
        // const mesh2 = new THREE.Mesh(geometry2, material2);
        // mesh2.scale.setScalar(1.03);
        // earthGroup.add(mesh2);

        // 地球
        const earthGeometry = new THREE.IcosahedronGeometry(1, 12);
        // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        // const material = new THREE.MeshPhongMaterial({
        //     color: 0x156289,
        //     emissive: 0x072534,
        //     side: THREE.DoubleSide,
        //     flatShading: true,
        //     map: earthTx,
        // });
        const earthMaterial = new THREE.MeshPhongMaterial({
            map: txLoader.load('../../../../assets/earth_map.jpg'),
            specularMap: txLoader.load('../../../../assets/earth_specular.jpg'),
            bumpMap: txLoader.load('../../../../assets/earth_bump.jpg'),
            bumpScale: 0.04,
        });
        const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
        earthGroup.add(earthMesh);
        
        
        
        const lightsMat = new THREE.MeshBasicMaterial({
            map: txLoader.load("../../../../assets/earth_light.jpg"),
            blending: THREE.AdditiveBlending,
        });
        const lightsMesh = new THREE.Mesh(earthGeometry, lightsMat);
        earthGroup.add(lightsMesh);
        
        const cloudsMat = new THREE.MeshStandardMaterial({
            map: txLoader.load("../../../../assets/earth_cloud.jpg"),
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            alphaMap: txLoader.load('../../../../assets/earth_cloudtrans.jpg'),
            // alphaTest: 0.3,
        });
        const cloudsMesh = new THREE.Mesh(earthGeometry, cloudsMat);
        cloudsMesh.scale.setScalar(1.003);
        earthGroup.add(cloudsMesh);
        
        const fresnelMat = getFresnelMat();
        const glowMesh = new THREE.Mesh(earthGeometry, fresnelMat);
        glowMesh.scale.setScalar(1.01);
        earthGroup.add(glowMesh);
        
        const stars = getStarfield({numStars: 1000});
        scene.add(stars);
        
        const sunLight = new THREE.DirectionalLight(0xfcfcfc, 2.0);
        sunLight.position.set(-2, 0.5, 1.5);
        scene.add(sunLight);
        

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
        // const directionalLight = new THREE.DirectionalLight(0xfcfcfc, 1.5);
        // directionalLight.position.set(-2, 0.5, 1.5);
        // scene.add(directionalLight);

        // 影
        // renderer.shadowMap.enabled = true;
        // pointLight.castShadow = true;
        // spotLight.castShadow = true;
        // directionalLight.castShadow = true;
        // mesh.castShadow = true;
        // mesh.receiveShadow = true;


        // refに保存
        sceneRef.current = scene;
        cameraRef.current = camera;
        rendererRef.current = renderer;
        // meshRef.current = mesh;
        // meshRef2.current = mesh2;
        groupRef.current = earthGroup;

        // アニメーションループ
        const animate = () => {
            requestAnimationFrame(animate);
            // mesh.rotation.x += 0.01;
            earthMesh.rotation.y += 0.002;
            lightsMesh.rotation.y += 0.002;
            cloudsMesh.rotation.y += 0.0023;
            glowMesh.rotation.y += 0.002;
            stars.rotation.y -= 0.0002;
            
            // const time = performance.now() * 0.001; // 秒単位の時間
            // material2.uniforms.rimPower.value = 4.0 + Math.sin(time) * 0.5;
            renderer.render(scene, camera);
        };
        animate();

        // スクロールイベント
        const handleScroll = () => {
            const scrollY = window.scrollY;

            if (groupRef.current) {
                // 拡大・縮小
                gsap.to(groupRef.current.scale, {
                    x: 1 + scrollY / 500,
                    y: 1 + scrollY / 500,
                    z: 1 + scrollY / 500,
                    duration: 0.5
                })
                // 左右移動
                gsap.to(groupRef.current.position, {
                    x: Math.sin(scrollY / 100) * 2,
                    duration: 0.5
                });
                // 回転
                // gsap.to(groupRef.current.rotation, {
                //     y: scrollY / 100,
                //     duration: 0.5
                // });
            }
            // フェードイン・フェードアウト
            // const opacity = Math.max(0, Math.min(1, 1 - (scrollY / 500) / 500));
            // if (groupRef.current && groupRef.current.material instanceof THREE.MeshBasicMaterial) {
            //     groupRef.current.material.opacity = opacity;
            //     groupRef.current.material.transparent = true;
            // }
        };

        window.addEventListener('scroll', handleScroll);
        
        function handleWindowResize () {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
        window.addEventListener('resize', handleWindowResize, false);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            mount.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full" />;
};

// export default ThreeScene;

