import { Scene, WebGLRenderer, PerspectiveCamera } from "three";

import { PointerLockControls } from "./models";
import { generateRandomTerrain, updateGame } from "./game";

import {
  CAMERA_FIELD_OF_VIEW,
  CAMERA_MIN_DISTANCE,
  CAMERA_MAX_DISTANCE,
} from "./constants";

const scene = new Scene();
const renderer = new WebGLRenderer();

// Variables shared accross the game
let pressedKeys: Set<string> = new Set<string>(); // Keys that are pressed at a certain frame

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

// Generate the terrain
generateRandomTerrain(scene);

// Controls - listeners that add and remove keys from the set of pressed keys
document.addEventListener("keydown", (event: KeyboardEvent) => {
  pressedKeys.add(event.key);
});

document.addEventListener("keyup", (event: KeyboardEvent) => {
  pressedKeys.delete(event.key);
});

const gameLoop = () => {
  requestAnimationFrame(gameLoop);
  updateGame(controls, pressedKeys);
  renderer.render(scene, camera); // render the game
};

gameLoop();
