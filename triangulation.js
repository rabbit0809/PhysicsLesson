import * as THREE from 'https://unpkg.com/three@0.120.1/build/three.module.js';
import ObjParser from './ObjParser.js';
const scene = new THREE.Scene();
const light = new THREE.AmbientLight(0x808080); // soft white light
scene.add( light );
const camera= new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
var objParse = new ObjParser('models/cube.obj');
var frame_period = 50.0;
var next_frame = 0.0;
function animate() {
  var now = Date.now();
  if (now >= next_frame) {
    renderer.render(scene, camera);
    next_frame = now + frame_period;
  }
  requestAnimationFrame(animate);
}


animate();
