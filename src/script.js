import * as THREE from 'three';
import init from './init';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import * as CANNON from 'cannon-es';
import CannonDebugger from 'cannon-es-debugger';

import './style.css';

const { sizes, camera, scene, canvas, renderer, textureLoader } = init();

// Создание земли
const grassTexture = textureLoader.load('grass-texture.jpg');
grassTexture.wrapS = THREE.RepeatWrapping;
grassTexture.wrapT = THREE.RepeatWrapping;
grassTexture.repeat.set(5, 5); 

const groundGeometry = new THREE.PlaneGeometry(10000, 10000);
const groundMaterial = new THREE.MeshPhysicalMaterial({ map: grassTexture });

const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
groundMesh.rotation.x = -Math.PI / 2;
scene.add(groundMesh);

// Создание стен
const brickTexture = textureLoader.load('brick_texture.jpg');
brickTexture.wrapS = THREE.RepeatWrapping;
brickTexture.wrapT = THREE.RepeatWrapping;
brickTexture.repeat.set(2, 2);

const wallMaterial = new THREE.MeshPhysicalMaterial({ 
	map: brickTexture,
	roughness: 0.2,
	metalness: 0.1,
});
const wallGeometry = new THREE.BoxGeometry(10000, 3000, 0.5);

const rightWall = new THREE.Mesh(wallGeometry, wallMaterial);
const leftWall = new THREE.Mesh(wallGeometry, wallMaterial);
const nearRightWall = new THREE.Mesh(wallGeometry, wallMaterial);
const nearLeftWall = new THREE.Mesh(wallGeometry, wallMaterial);

rightWall.position.set(0, 1500, 5000);
leftWall.position.set(-5000, 1500, -0);
nearRightWall.position.set(0, 1500,-5000);
nearLeftWall.position.set(5000, 1500, -0);

rightWall.rotation.x = Math.PI;
leftWall.rotation.x = Math.PI;
leftWall.rotation.y = Math.PI / 2;
nearRightWall.rotation.x = Math.PI;
nearLeftWall.rotation.x = Math.PI;
nearLeftWall.rotation.y = Math.PI / 2;

scene.add(rightWall, leftWall, nearRightWall, nearLeftWall);

// Создание мешей кубов и сфер
// Загрузка текстур для сфер
const planetTexture_1 = textureLoader.load('planet_texture_2.png');
const sphereMaterial_1 = new THREE.MeshPhysicalMaterial({ map: planetTexture_1 });
const planetTexture_2 = textureLoader.load('planet_texture_3.jpg');
const sphereMaterial_2 = new THREE.MeshPhysicalMaterial({ map: planetTexture_2 });
const planetTexture_3 = textureLoader.load('planet_texture_4.jpg');
const sphereMaterial_3 = new THREE.MeshPhysicalMaterial({ map: planetTexture_3 });

const material_1 = new THREE.MeshPhysicalMaterial({ color:'#14471E' });
const material_2 = new THREE.MeshPhysicalMaterial({ color:'#68904D' });
const material_3 = new THREE.MeshPhysicalMaterial({ color:'#EE9B01' });

const cube1 = new THREE.Mesh(new THREE.BoxGeometry(500, 500, 500), material_1);
cube1.position.set(3000, 250, 2000);
const cube2 = new THREE.Mesh(new THREE.BoxGeometry(800, 800, 800), material_2);
cube2.position.set(-3000, 400, -2000);
const cube3 = new THREE.Mesh(new THREE.BoxGeometry(500, 500, 500), material_3);
cube3.position.set(-2000, 250, -1000);

const sphere1 = new THREE.Mesh(new THREE.SphereGeometry(500, 32, 32), sphereMaterial_1);
sphere1.position.set(2500, 1500, 2000);
const sphere2 = new THREE.Mesh(new THREE.SphereGeometry(400, 32, 32), sphereMaterial_2);
sphere2.position.set(1500, 2000, -3000);
const sphere3 = new THREE.Mesh(new THREE.SphereGeometry(300, 32, 32), sphereMaterial_3);
sphere3.position.set(-2000, 2500, 2000);

scene.add(cube1, cube2, cube3, sphere1, sphere2, sphere3);

// Прототипы 3D моделей

const cactusGeometry = new THREE.CylinderGeometry( 800, 600, 2100, 32 );
const cactusMaterial = new THREE.MeshPhysicalMaterial({ 
  // color:'#14471E',
  transparent: true,
  opacity: 0,
});
const cactusMesh = new THREE.Mesh(cactusGeometry, cactusMaterial);
cactusMesh.position.set(500, 1050, 2000);
scene.add(cactusMesh);

const sphereBirdMaterial = new THREE.MeshPhysicalMaterial({ 
  // color:'#14471E',
  transparent: true,
  opacity: 0, 
});
const sphereBirdMesh = new THREE.Mesh(new THREE.SphereGeometry(1000, 32, 32), sphereBirdMaterial);
sphereBirdMesh.position.set(1500, 1000, -1600);
scene.add(sphereBirdMesh);

//   Загрузчики 3D моделей
const gltfLoader_1 = new GLTFLoader();
const gltfLoader_2 = new GLTFLoader();

gltfLoader_1.load('baby_cactus/scene.gltf', (gltf) => {
  const model = gltf.scene;
  model.position.set(500, 0, 2000);
  model.scale.set(500, 500, 500);
  model.rotation.set(0, -1950, 0);
  model.castShadow = true;
  model.receiveShadow = true;
  scene.add(model);
});

gltfLoader_2.load('white_bird/scene.gltf', (gltf) => {
	const model = gltf.scene;
	model.position.set(1500, 1300, -1300);
	model.scale.set(500, 500, 500);
	model.rotation.set(0, 700, 0);
  model.castShadow = true;
  model.receiveShadow = true;
	scene.add(model);
});

// Разрешение отбрасывать тени от объектов
rightWall.castShadow = true;
leftWall.castShadow = true;
nearRightWall.castShadow = true;
nearLeftWall.castShadow = true;
cube1.castShadow = true;
cube2.castShadow = true;
cube3.castShadow = true;
sphere1.castShadow = true;
sphere2.castShadow = true;
sphere3.castShadow = true;

// Разрешение принимать тени от объектов

groundMesh.receiveShadow = true;
rightWall.receiveShadow = true;
leftWall.receiveShadow = true;
nearRightWall.receiveShadow = true;
nearLeftWall.receiveShadow = true;
cube1.receiveShadow = true;
cube2.receiveShadow = true;
cube3.receiveShadow = true;
sphere1.receiveShadow = true;
sphere2.receiveShadow = true;
sphere3.receiveShadow = true;

// Прожектор
// const spotLight = new THREE.SpotLight( 0xffffff, 60 );
// spotLight.position.set( 2, 3, 3 );

// spotLight.angle = Math.PI / 5;
// spotLight.penumbra = 0.2;
// spotLight.castShadow = true;

// spotLight.shadow.camera.near = 3;
// spotLight.shadow.camera.far = 10000;

// spotLight.shadow.mapSize.width = 2048;
// spotLight.shadow.mapSize.height = 2048;

// scene.add( spotLight );

// Направленный источник света
const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(15, 10, -5);

directionalLight.castShadow = true;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 10000;

directionalLight.shadow.camera.right = 5000;
directionalLight.shadow.camera.left = -5000;
directionalLight.shadow.camera.top	= 5000;
directionalLight.shadow.camera.bottom = -5000;

directionalLight.shadow.mapSize.width = 4096;
directionalLight.shadow.mapSize.height = 4096;

directionalLight.shadow.bias = -0.05;

scene.add(directionalLight);

// // Создайте хелпер для направленного источника света
// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5000, 0xff0000); // Второй аргумент - размер хелпера

// // Добавьте хелпер в сцену
// scene.add(directionalLightHelper);


// Создание мира Cannon.js
const world = new CANNON.World({
    gravity: new CANNON.Vec3(0, -9.81, 0)
});

const cameraMaterial = new CANNON.Material();
const groundBodyMaterial = new CANNON.Material();
const cube1Material = new CANNON.Material();
const cube2Material = new CANNON.Material();
const cube3Material = new CANNON.Material();
const sphere1Material = new CANNON.Material();
const sphere2Material = new CANNON.Material();
const sphere3Material = new CANNON.Material();

const cameraShape = new CANNON.Sphere(1); 
const cameraBody = new CANNON.Body({ 
    mass: 1, 
    shape: cameraShape,
    position: new CANNON.Vec3(4000, 1500, -4000),
    // type: CANNON.Body.STATIC,
});

world.addBody(cameraBody);

// Создание объектов для обнаружения коллизий (земли, стен, кубов и сфер)

// Земля
const groundShape = new CANNON.Box((new CANNON.Vec3(6000, 6000, 1)));
const groundBody = new CANNON.Body({ 
    shape: groundShape,
    type: CANNON.Body.STATIC,
    material: groundBodyMaterial,
});
groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
world.addBody(groundBody);

// // Стены
// const rightWallShape = new CANNON.Box(new CANNON.Vec3(5000, 1500, 10));
// const rightWallBody = new CANNON.Body({ 
//   mass: 1, 
//   shape: rightWallShape,
//   position: new CANNON.Vec3(0, 1500, 5000)
// });
// world.addBody(rightWallBody);

// const leftWallShape = new CANNON.Box(new CANNON.Vec3(5000, 1500, 100));
// const leftWallBody = new CANNON.Body({ 
//   mass: 1000, 
//   shape: leftWallShape,
//   position: new CANNON.Vec3(-5000, 1500, -0)
// });

// const angle = Math.PI / 2;
// const axis = new CANNON.Vec3(0, 1, 0);
// const quaternion = new CANNON.Quaternion();
// quaternion.setFromAxisAngle(axis, angle);
// leftWallBody.quaternion.copy(quaternion);

// world.addBody(leftWallBody);

// const nearRightWallShape = new CANNON.Box(new CANNON.Vec3(5000, 1500, 10));
// const nearRightWallBody = new CANNON.Body({ 
//   mass: 1, 
//   shape: nearRightWallShape,
//   position: new CANNON.Vec3(0, 1500,-5000)
// });
// world.addBody(nearRightWallBody);

// const nearLeftWallShape = new CANNON.Box(new CANNON.Vec3(5000, 1500, 10));
// const nearLeftWallBody = new CANNON.Body({ 
//   mass: 1, 
//   shape: nearLeftWallShape,
//   position: new CANNON.Vec3(0, 1500, 5000)
// });
// world.addBody(nearLeftWallBody);

// Создание физических тел для кубов и сфер
// Темно-зеленый
const cube1Shape = new CANNON.Box(new CANNON.Vec3(250, 250, 250));
const cube1Body = new CANNON.Body({ 
    mass: 10, 
    shape: cube1Shape, 
    position: new CANNON.Vec3(3000, 250, 2000),
});
world.addBody(cube1Body);

// Светло-зеленый
const cube2Shape = new CANNON.Box(new CANNON.Vec3(400, 400, 400));
const cube2Body = new CANNON.Body({ 
    mass: 10, 
    shape: cube2Shape, 
    position: new CANNON.Vec3(-3000, 400, -2000),
});
world.addBody(cube2Body);

// Желтый
const cube3Shape = new CANNON.Box(new CANNON.Vec3(250, 250, 250));
const cube3Body = new CANNON.Body({ 
    mass: 10, 
    shape: cube3Shape, 
    position: new CANNON.Vec3(-2000, 250, -1000),
});
world.addBody(cube3Body);

const sphere1Shape = new CANNON.Sphere(500);
const sphere1Body = new CANNON.Body({ 
    mass: 10, 
    shape: sphere1Shape, 
    position: new CANNON.Vec3(2500, 1500, 2000)
});
world.addBody(sphere1Body);

const sphere2Shape = new CANNON.Sphere(400);
const sphere2Body = new CANNON.Body({ 
    mass: 10, 
    shape: sphere2Shape, 
    position: new CANNON.Vec3(1500, 2000, -3000)
});
world.addBody(sphere2Body);

const sphere3Shape = new CANNON.Sphere(300);
const sphere3Body = new CANNON.Body({ 
    mass: 10, 
    shape: sphere3Shape, 
    position: new CANNON.Vec3(-2000, 2500, 2000)
});
world.addBody(sphere3Body);

// 3D объекты

const cactusShape = new CANNON.Cylinder(
  800, // Верхний радиус
  600, // Нижний радиус
  2100, // Высота
  32 // Количество сегментов (разбиение цилиндра)
);

const cactusBody = new CANNON.Body({ 
  mass: 10,
  shape: cactusShape,
  position: new CANNON.Vec3(500, 1050, 2000),
});

world.addBody(cactusBody);

const sphereBirdShape = new CANNON.Sphere(1000);
const sphereBirdBody = new CANNON.Body({ 
    mass: 10, 
    shape: sphereBirdShape, 
    position: new CANNON.Vec3(1500, 1000, -1600)
});
world.addBody(sphereBirdBody);

// Материалы тел
cameraBody.material = cameraMaterial;
groundBody.material = groundBodyMaterial;
cube1Body.material = cube1Material;
cube2Body.material = cube2Material;
cube3Body.material = cube3Material;
sphere1Body.material = sphere1Material;
sphere2Body.material = sphere2Material;
sphere3Body.material = sphere3Material;

const cameraGroundContactMaterial = new CANNON.ContactMaterial(
    cameraBody.material,
    groundBody.material,
    {
      friction: 0.5,
      restitution: 0.1,
    }
  );
  
  const cameraCubeContactMaterial = new CANNON.ContactMaterial(
    cameraBody.material,
    cube1Body.material,
    {
      friction: 0.5,
      restitution: 0.1,
    }
  );
  
  const cameraSphereContactMaterial = new CANNON.ContactMaterial(
    cameraBody.material,
    sphere1Body.material,
    {
      friction: 0.5,
      restitution: 0.1,
    }
  );

  world.addContactMaterial(cameraGroundContactMaterial);
  world.addContactMaterial(cameraCubeContactMaterial);
  world.addContactMaterial(cameraSphereContactMaterial);

const timeStep = 1 / 60;

// Анимация
const animateCamera = () => {
    const raycastOptions = {
        skipBackfaces: true,
        collisionFilterMask: 1,
    };

    world.step(timeStep);
    
    groundMesh.position.copy(groundBody.position);
    groundMesh.quaternion.copy(groundBody.quaternion);

    cube1.position.copy(cube1Body.position);
    cube1.quaternion.copy(cube1Body.quaternion);
    cube2.position.copy(cube2Body.position);
    cube2.quaternion.copy(cube2Body.quaternion);
    cube3.position.copy(cube3Body.position);
    cube3.quaternion.copy(cube3Body.quaternion);

    sphere1.position.copy(sphere1Body.position);
    sphere1.quaternion.copy(sphere1Body.quaternion);
    sphere2.position.copy(sphere2Body.position);
    sphere2.quaternion.copy(sphere2Body.quaternion);
    sphere3.position.copy(sphere3Body.position);
    sphere3.quaternion.copy(sphere3Body.quaternion);

    cactusMesh.position.copy(cactusBody.position);
    cactusMesh.quaternion.copy(cactusBody.quaternion);
    sphereBirdMesh.position.copy(sphereBirdBody.position);
    sphereBirdMesh.quaternion.copy(sphereBirdBody.quaternion);

    renderer.render(scene, camera);

    const from = cameraBody.position.clone();
    const to = camera.position.clone();
    const result = new CANNON.RaycastResult();
    world.raycastClosest(from, to, raycastOptions, result);

    if (result.hasHit) {
            camera.position.copy(result.hitPointWorld);
            cameraBody.position.copy(result.hitPointWorld);
    }

    requestAnimationFrame(animateCamera);
};

animateCamera();

// const cannonDebugRenderer = new CannonDebugger(scene, world);
// cannonDebugRenderer.update();

/** Базовые обработчики событий длы поддержки ресайза **/
window.addEventListener('resize', () => {
	// Обновляем размеры
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	// Обновляем соотношение сторон камеры
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	// Обновляем renderer
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	renderer.render(scene, camera);
});

window.addEventListener('dblclick', () => {
	if (!document.fullscreenElement) {
		canvas.requestFullscreen();
	} else {
		document.exitFullscreen();
	}
});