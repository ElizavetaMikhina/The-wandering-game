import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';

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

    // Взгляд камеры на землю
    const camera = new THREE.PerspectiveCamera(60, sizes.width / sizes.height, 1, 50000);
    camera.position.set(4000, 1500, -4000);
    scene.add(camera);

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;

    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(sizes.width, sizes.height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    const textureLoader = new THREE.TextureLoader();

    // Контроллер от первого лица
    const fpControls = new FirstPersonControls(camera, canvas);
    fpControls.lookSpeed = 0.05; 
    fpControls.movementSpeed = 3000; 
    fpControls.noFly = true; 
    fpControls.lookVertical = true; 
    controls.autoForward = false;

    const clock = new THREE.Clock();

    // Анимация
    const animate = () => {
        fpControls.update(clock.getDelta()); 
        // controls.update();

        renderer.render(scene, camera);

        requestAnimationFrame(animate);
    };

    animate();

	return { 
        sizes, 
        scene, 
        canvas, 
        camera,
        renderer, 
        controls, 
        textureLoader, 
};
};

export default init;