import * as THREE from 'three';

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x050505);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.z = 8;

const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);


// Sun

const sunGeometry = new THREE.SphereGeometry(1, 32, 32);

const sunMaterial = new THREE.MeshBasicMaterial({
    color: 0xffaa00
});

const sun = new THREE.Mesh(
    sunGeometry,
    sunMaterial
);

scene.add(sun);


// Earth

const earthGeometry = new THREE.SphereGeometry(0.3, 32, 32);

const earthMaterial = new THREE.MeshBasicMaterial({
    color: 0x2266cc
});

const earth = new THREE.Mesh(
    earthGeometry,
    earthMaterial
);

scene.add(earth);


// Earth orbit

const orbitGeometry = new THREE.RingGeometry(3.99, 4.01, 128);

const orbitMaterial = new THREE.MeshBasicMaterial({
    color: 0x444444,
    side: THREE.DoubleSide
});

const earthOrbit = new THREE.Mesh(
    orbitGeometry,
    orbitMaterial
);

earthOrbit.rotation.x = Math.PI / 2;

scene.add(earthOrbit);


// Animation

let angle = 0;

function animate() {
    requestAnimationFrame(animate);

    angle += 0.005;

    earth.position.x = Math.cos(angle) * 4;
    earth.position.z = Math.sin(angle) * 4;

    sun.rotation.y += 0.005;
    earth.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();