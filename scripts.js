// Set up the scene, camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('gameCanvas') });
renderer.setSize(window.innerWidth, window.innerHeight);

// Create the cube
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);

// Create falling objects (spheres)
const spheres = [];
function createSphere() {
  const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
  const sphereMaterial = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.x = (Math.random() - 0.5) * 10;
  sphere.position.y = 10;
  spheres.push(sphere);
  scene.add(sphere);
}
createSphere(); // Initial sphere

// Score tracking
let score = 0;

// Game loop
function gameLoop() {
  update();
  render();
  requestAnimationFrame(gameLoop);
}

// Update game elements
function update() {
  // Move the cube with arrow keys
  if (keys['ArrowRight']) {
    cube.position.x += 0.1;
  }
  if (keys['ArrowLeft']) {
    cube.position.x -= 0.1;
  }
  // Check for collisions with spheres
  for (let i = 0; i < spheres.length; i++) {
    if (cube.position.distanceTo(spheres[i].position) < 0.75) {
      score++;
      scene.remove(spheres[i]);
      spheres.splice(i, 1);
      createSphere();
      break;
    }
    // Remove spheres that fall off the screen
    if (spheres[i].position.y < -10) {
      scene.remove(spheres[i]);
      spheres.splice(i, 1);
      createSphere();
      break;
    }
    // Move the spheres down
    spheres[i].position.y -= 0.1;
  }
}

// Render the scene
function render() {
  renderer.render(scene, camera);
}

// Handle user input
const keys = {};
document.addEventListener('keydown', (event) => {
  keys[event.key] = true;
});
document.addEventListener('keyup', (event) => {
  keys[event.key] = false;
});

// Initialize the game loop
gameLoop();
