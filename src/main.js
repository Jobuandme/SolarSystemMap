import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import solarSystemData from './data/solarSystem.js';
import { createSolarSystem } from './3d/solarSystem.js';
import { updateOrbits } from './simulation/orbitSimulation.js';

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x050505);


const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.z = 25;

const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

document.body.appendChild(renderer.domElement);


// Controls

const controls = new OrbitControls(
    camera,
    renderer.domElement
);

controls.enableDamping = true;
controls.dampingFactor = 0.05;

controls.minDistance = 2;
controls.maxDistance = 50;


// Solar system

const objects = createSolarSystem(
    scene,
    solarSystemData
);


// Animation

let angle = 0;

function animate() {

    requestAnimationFrame(animate);

    angle += 0.005;

    updateOrbits(
        solarSystemData,
        objects,
        angle
    );

    controls.update();

    renderer.render(scene, camera);
}

// Resize

window.addEventListener('resize', () => {

    camera.aspect =
        window.innerWidth /
        window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});


animate();