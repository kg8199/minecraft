import { Scene, WebGLRenderer, PerspectiveCamera } from "three";

import {
  CAMERA_FIELD_OF_VIEW,
  CAMERA_MIN_DISTANCE,
  CAMERA_MAX_DISTANCE,
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

// Listener that resizes the renderer when the window is resized
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix(); // Apply changes on the camera
});

const gameLoop = () => {
  requestAnimationFrame(gameLoop);
  renderer.render(scene, camera); // render the game
};

gameLoop();