/**
 * Function that removes a block when we click on it
 */

import { Camera, Scene } from "three";

import { getCurrentChunk, getRaycasterIntersection } from "../utils";
import displayChunk from "./displayChunks";

import { BLOCK_SIZE, MAX_WORLD_DEPTH, RAYCASTER_DISTANCE } from "../constants";
import { BlockType, Chunks, Exists, InstancedMeshes, Level, Reference } from "../types";
import generateSurroundingBlocks from "./generateSurroundingBlocks";

const removeBlock = (
  camera: Camera,
  instancedMeshes: Reference<InstancedMeshes>,
  chunks: Chunks,
  displayableChunks: Reference<Chunks>,
  knownTerritory: Reference<Exists>,
  topLevel: Reference<Level>,
  scene: Scene
) => {
  // Throw a raycast to detect which block to remove
  const intersection = getRaycasterIntersection(camera, instancedMeshes);

  // Check if we're intersecting an object in range in order to remove it
  if (intersection.length && intersection[0].distance <= RAYCASTER_DISTANCE) {
    const materialIndex = intersection[0].face.materialIndex; // Get the face of the block we want to remove
    const position = intersection[0].point; // Get the coordinates of the face we're pointing at
    const increment = BLOCK_SIZE / 2;
    let x: number, y: number, z: number; // Coordinates of the block we're removing
    // Determine the position of the block based on the face we're aiming at
    switch (materialIndex) {
      case 0: // Right
        x = Math.round(position.x - increment);
        y = Math.round(position.y / BLOCK_SIZE) * BLOCK_SIZE;
        z = Math.round(position.z / BLOCK_SIZE) * BLOCK_SIZE;
        break;
      case 1: // Left
        x = Math.round(position.x + increment);
        y = Math.round(position.y / BLOCK_SIZE) * BLOCK_SIZE;
        z = Math.round(position.z / BLOCK_SIZE) * BLOCK_SIZE;
        break;
      case 2: // Top
        x = Math.round(position.x / BLOCK_SIZE) * BLOCK_SIZE;
        y = Math.round(position.y - increment);
        z = Math.round(position.z / BLOCK_SIZE) * BLOCK_SIZE;
        break;
      case 3: // Bottom
        x = Math.round(position.x / BLOCK_SIZE) * BLOCK_SIZE;
        y = Math.round(position.y + increment);
        z = Math.round(position.z / BLOCK_SIZE) * BLOCK_SIZE;
        break;
      case 4: // Front
        x = Math.round(position.x / BLOCK_SIZE) * BLOCK_SIZE;
        y = Math.round(position.y / BLOCK_SIZE) * BLOCK_SIZE;
        z = Math.round(position.z - increment);
        break;
      case 5: // Back
        x = Math.round(position.x / BLOCK_SIZE) * BLOCK_SIZE;
        y = Math.round(position.y / BLOCK_SIZE) * BLOCK_SIZE;
        z = Math.round(position.z + increment);
        break;
    }
    // Get the chunk the block is on
    const chunk = getCurrentChunk(x, z);
    // Remove the block from the chunk
    const blockKey = `${x},${z}`;

    if (chunks[chunk][blockKey]) {
      chunks[chunk][blockKey] = chunks[chunk][blockKey].filter(block => y !== block.y || block.type === BlockType.BEDROCK);
      // Generate neighbor blocks
      if (y < topLevel.value[blockKey]) { // We don't want to generate surrounding blocks beyond the top level
        generateSurroundingBlocks(x, y, z, chunks, knownTerritory);
      }
      // Display the chunks with the block removed
      displayChunk(scene, instancedMeshes, displayableChunks.value);
    }
  }
};

export default removeBlock;