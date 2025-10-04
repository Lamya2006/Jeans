// --- Scene, Camera, Renderer ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// --- Cube Body ---
const geometry = new THREE.BoxGeometry(1, 1, 1); // base cube (1x1x1)
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
const body = new THREE.Mesh(geometry, material);
scene.add(body);


// --- Default scale ---
body.scale.set(0.5, 1.8, 0.3);
camera.position.z = 2;


// --- Function to apply measurements ---
function applyMeasurements() {
const heightInches = parseFloat(document.getElementById("height").value);
const chestInches  = parseFloat(document.getElementById("chest").value);
const depthInches  = parseFloat(document.getElementById("depth").value);
const waistInches  = parseFloat(document.getElementById("waist").value);
const hipsInches   = parseFloat(document.getElementById("hips").value);


// Convert to meters
const height = inchesToMeters(heightInches);
const chest  = inchesToMeters(chestInches);
const depth  = inchesToMeters(depthInches);
const waist  = inchesToMeters(waistInches);
const hips   = inchesToMeters(hipsInches);


// Now apply to the model
body.scale.set(chest, height, depth);








}
function inchesToMeters(inches) {
  return inches * 0.0254; // 1 inch = 0.0254 meters
}


// --- Button event ---
document.getElementById("applyBtn").addEventListener("click", applyMeasurements);


// --- Animation loop ---
function animate() {
  requestAnimationFrame(animate);
  body.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();


// --- Handle window resize ---
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
