/**
 * Function that adds blocks to the map
 */

import { Camera, Scene } from "three";

import { Block } from "../models";

import { getCurrentBlock, getCurrentChunk, getRaycasterIntersection, playSound } from "../utils";

import { BLOCK_SIZE, BLOCK_TYPES, MAP_BLOCK_TO_SOUND, RAYCASTER_DISTANCE } from "../constants";
import { Chunks, Exists, InstancedMeshes, Reference } from "../types";
import { displayChunks } from ".";

const addBlock = (
  camera: Camera,
  instancedMeshes: Reference<InstancedMeshes>,
  chunks: Chunks,
  displayableChunks: Reference<Chunks>,
  knownTerritory: Reference<Exists>,
  scene: Scene,
  currentItemIndex: number,
  soundOn: boolean
) => {
  // Throw a raycast to detect where to place the block
  const intersection = getRaycasterIntersection(camera, instancedMeshes);

  // Check if the block that needs to be placed is in range
  if (intersection.length && intersection[0].distance <= RAYCASTER_DISTANCE) {
    const materialIndex = intersection[0].face.materialIndex; // Get the face we want to place the block on
    const position = intersection[0].point; // Get the coordinates of the block we're aiming at
    const increment = BLOCK_SIZE / 2; // How far do we want to place the block from the face we're aiming at
    let x: number, y: number, z: number; // Initiate coordinates of the block
    // Determine the position of the block based on the face we're aiming at
    switch (materialIndex) {
      case 0: // Right
        x = Math.round(position.x + increment);
        y = Math.round(position.y / BLOCK_SIZE) * BLOCK_SIZE;
        z = Math.round(position.z / BLOCK_SIZE) * BLOCK_SIZE;
        break;
      case 1: // Left
        x = Math.round(position.x - increment);
        y = Math.round(position.y / BLOCK_SIZE) * BLOCK_SIZE;
        z = Math.round(position.z / BLOCK_SIZE) * BLOCK_SIZE;
        break;
      case 2: // Top
        x = Math.round(position.x / BLOCK_SIZE) * BLOCK_SIZE;
        y = Math.round(position.y + increment);
        z = Math.round(position.z / BLOCK_SIZE) * BLOCK_SIZE;
        break;
      case 3: // Bottom
        x = Math.round(position.x / BLOCK_SIZE) * BLOCK_SIZE;
        y = Math.round(position.y - increment);
        z = Math.round(position.z / BLOCK_SIZE) * BLOCK_SIZE;
        break;
      case 4: // Front
        x = Math.round(position.x / BLOCK_SIZE) * BLOCK_SIZE;
        y = Math.round(position.y / BLOCK_SIZE) * BLOCK_SIZE;
        z = Math.round(position.z + increment);
        break;
      case 5: // Back
        x = Math.round(position.x / BLOCK_SIZE) * BLOCK_SIZE;
        y = Math.round(position.y / BLOCK_SIZE) * BLOCK_SIZE;
        z = Math.round(position.z - increment);
        break;
    }
    const currentBlock = getCurrentBlock(camera.position.x, camera.position.y, camera.position.z, chunks);

    // Check that the block that will be placed is not on the player
    if (
      (currentBlock.x === x && currentBlock.z === z)
      && !(camera.position.y - BLOCK_SIZE * 2 > y + BLOCK_SIZE / 2)
      && !(camera.position.y < y - BLOCK_SIZE / 2)
    ) return;

    // Check what chunk the block is on
    const chunk = getCurrentChunk(x, z);
    // Create new block
    const block = new Block(x, y, z, BLOCK_TYPES[currentItemIndex]);
    // Add block to chunk
    const blockKey = `${x},${z}`;
    chunks[chunk][blockKey].push(block);

    // Play sound of added block
    soundOn && playSound(MAP_BLOCK_TO_SOUND[BLOCK_TYPES[currentItemIndex]].place);

    // Add the block to the known territory database
    knownTerritory.value[`${x},${y},${z}`] = true;

    // Display the scene
    displayChunks(scene, instancedMeshes, displayableChunks.value);
  }
};

export default addBlock;