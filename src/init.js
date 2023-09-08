import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const init = () => {
    // Канвас
    const canvas = document.querySelector('.canvas');

    // Сцена
    const scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xf0f0f0 );

    // Камера
    const sizes = {
		width: window.innerWidth,
		height: window.innerHeight,
	};

    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
    const cameraDistance = 2000; // Расстояние между камерой и землей
    camera.position.set(0, 0, cameraDistance);

    // camera.position.set(0, -1000, 1000);
    // camera.lookAt(0, 0, 0); 

    // const cameraHeight = 500;
    // camera.position.set(0, -cameraHeight, cameraHeight);

    const cameraTarget = new THREE.Vector3(0, 0, 0); 
    camera.lookAt(cameraTarget);

    // Основной код
	scene.add(camera);

	const controls = new OrbitControls(camera, canvas);
	controls.enableDamping = true;

	const renderer = new THREE.WebGLRenderer({ canvas });
	renderer.setSize(sizes.width, sizes.height);
	// renderer.render(scene, camera);

    const textureLoader = new THREE.TextureLoader();
    const grassTexture = textureLoader.load('grass-texture.jpg');
    grassTexture.wrapS = THREE.RepeatWrapping;
    grassTexture.wrapT = THREE.RepeatWrapping;
    grassTexture.repeat.set(10, 10); 

    const groundGeometry = new THREE.PlaneGeometry(10000, 10000);
    const groundMaterial = new THREE.MeshBasicMaterial({ map: grassTexture });

    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    scene.add(ground);

    

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    const animate = () => {
        controls.update();

        renderer.render(scene, camera);

        requestAnimationFrame(animate);
    };

    animate();

	return { sizes, scene, canvas, camera, renderer, controls };
};

export default init;
