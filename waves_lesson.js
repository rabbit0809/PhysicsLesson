import * as THREE from 'https://unpkg.com/three@0.120.1/build/three.module.js';

const scene = new THREE.Scene();
const light = new THREE.AmbientLight(0x808080); // soft white light
scene.add( light );
const camera= new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const bob_geometry = new THREE.SphereGeometry(0.1, 32, 32);
const material = new THREE.MeshBasicMaterial({color: 0xff0000});
const bob = new THREE.Mesh(bob_geometry, material);
scene.add(bob);
var rest_x = -3.5;
var amplitude = 4.0;
var rest_y = 7.0;

bob.position.x = rest_x + amplitude;
bob.position.y = rest_y;
bob.position.z = -5.0;
//bob.position.z = 0.0;
//bob.rotation.x = Math.PI/4;
//bob.rotation.y = Math.PI/4;
//bob.rotation.z = Math.PI/4;
const NUM_SAMPLES = 100;
const PITCH = 0.12;
var stored = [];
for (var i=0; i<NUM_SAMPLES; i++) {
  var sample = new THREE.Mesh(bob_geometry, material);
  sample.position.x = rest_x;
  sample.position.y = (rest_y - PITCH) - (PITCH * i);
  sample.position.z = -5.0
  scene.add(sample);
  stored.push(sample);
}
var frame_count = 0;
var spring = -1.0;
var speed = 0.0;
function animate() {
  requestAnimationFrame(animate);
  for (var i=stored.length - 1; i > 0; i--) {
    stored[i].position.x = stored[i-1].position.x;
  }

  renderer.render(scene, camera);
  var force = spring * (bob.position.x - rest_x);
  speed += force * 0.01;
  stored[0].position.x = bob.position.x;
  bob.position.x += speed;
}

var tensionBox = document.getElementById("tension");
tensionBox.innerHTML = spring.toString();

document.getElementById("incr_tension").onclick = function() {
  spring -= 0.05;
  tensionBox.innerHTML = spring.toString();
}

document.getElementById("decr_tension").onclick = function() {
  if (spring <= -0.05) {
    spring += 0.05;
  }
  tensionBox.innerHTML = spring.toString();
}

animate();
