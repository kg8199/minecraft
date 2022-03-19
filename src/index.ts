import { Scene, WebGLRenderer, PerspectiveCamera } from "three";

import { Block, PointerLockControls } from "./models";

import {
  CAMERA_FIELD_OF_VIEW,
  CAMERA_MIN_DISTANCE,
  CAMERA_MAX_DISTANCE,
  BLOCK_SIZE,
} from "./constants";

const scene = new Scene();
const renderer = new WebGLRenderer();

// Set the size of the renderer to the screen width / height
renderer.setSize(window.innerWidth, window.innerHeight);

// Add the renderer to our page
document.body.appendChild(renderer.domElement);

// Setup camera - User POV
const camera = new PerspectiveCamera(
  CAMERA_FIELD_OF_VIEW, // Field of view - how wide the POV of the player is
  window.innerWidth / window.innerHeight, // Aspect ratio
  CAMERA_MIN_DISTANCE, // How near can the player see
  CAMERA_MAX_DISTANCE // How far can the player see
);

// Setup Controls
const controls = new PointerLockControls(camera, document.body); // Link the Controls to the Camera and the DOM
document.body.addEventListener("click", () => {
  controls.lock(); // Lock the camera on click
});

// Listener that resizes the renderer when the window is resized
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix(); // Apply changes on the camera
});

/**
 * TODO: Change place later
 */
// Initiate the game
for (let x = 0; x < 20; x++) {
  for (let z = 0; z < 20; z++) {
    const block = new Block(x * BLOCK_SIZE, 0, z * BLOCK_SIZE);
    block.display(scene);
  }
}

const gameLoop = () => {
  requestAnimationFrame(gameLoop);
  renderer.render(scene, camera); // render the game
};

gameLoop();
