import _ from 'lodash';
import './style.css';
import * as THREE from 'three';

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const colorYellow = new THREE.Color('hsl(40, 100%, 60%)');
const colorPink = new THREE.Color('hsl(306, 100%, 60%)');

var cubeGeometry = new THREE.BoxGeometry(1, 1.2, 1);
var cubeMaterial = new THREE.MeshPhongMaterial({
	color: colorYellow,
	shininess: 80,
});
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
var light = new THREE.PointLight(colorPink, 2);
var light2 = new THREE.PointLight(colorYellow, 2);

light.position.z = 20;
light.position.y = -20;
light.position.x = -40;

light2.position.z = 10;
light2.position.y = 20;
light2.position.x = 40;

scene.add(light);
scene.add(light2);
scene.add(cube);

camera.position.z = 5;

cube.rotation.x = 20;
cube.rotation.z = -20;

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();