import _ from 'lodash';
import './style.css';
import * as THREE from 'three';

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 50);

let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function handleResize() {
    let { innerWidth, innerHeight } = window;
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
}



// Sphere creator.
function createSphere(r = 1, color = 0xffffff) {
    const sphereGeo = new THREE.SphereGeometry(r, 20, 20);
    const sphereMat = new THREE.MeshPhongMaterial({
        color,
        shininess: 20,
    });
    return new THREE.Mesh(sphereGeo, sphereMat);
}
// Light creator.
function createLight(i = 1, color = 0xffffff) {
    return new THREE.PointLight(color, i);
}

const nucleus = createSphere(4);
const l1 = createLight(.2);
const l2 = createLight();
l1.position.set(120, 5, 10);
l2.position.set(-60, 0, 20);
scene.add(nucleus, l2);
nucleus.add(l1);

// Electron creator.
function createElectron(r = 1, color = 0xffffff) {
    const sphere = createSphere(r, color);
    const pivot = new THREE.Object3D();
    pivot.add(sphere);
    return {
        sphere,
        pivot
    }
}

const e1 = createElectron(0.5);
const e2 = createElectron(0.5);
const e3 = createElectron(0.5);
const e4 = createElectron(0.5);
e1.sphere.position.set(13, 0, 0);
e2.sphere.position.set(8, 0, 0);
e3.sphere.position.set(-8, 0, 0);
e4.sphere.position.set(-13, 0, 0);
nucleus.add(e1.pivot, e2.pivot, e3.pivot, e4.pivot);

e1.pivot.rotation.y = 120;
e2.pivot.rotation.y = 30;
e3.pivot.rotation.y = 30;
e4.pivot.rotation.y = 120;


function animate() {
    requestAnimationFrame(animate);
    e1.pivot.rotation.z += 0.04;
    e2.pivot.rotation.z += 0.03;
    e3.pivot.rotation.z += 0.04;
    e4.pivot.rotation.z += 0.03;
    nucleus.rotation.z += 0.01;
    nucleus.rotation.x += 0.02;
    nucleus.rotation.y += 0.03;
	renderer.render(scene, camera);
}

animate();
window.addEventListener('resize', handleResize);