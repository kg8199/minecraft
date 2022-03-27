/**
 * Function that is called at every frame
 * It scans the current chunk we're in and update the surroundings in order to create an infinite world
 */

import { InstancedMesh, Scene } from "three";

import { Noise } from "../models";

import generateChunk from "./generateChunk";
import displayChunks from "./displayChunks";
import { getCurrentChunk, getSurroundingChunks } from "../utils";

import { GRASS_TEXTURE } from "../constants";
import { Chunks, CurrentChunk, InstancedMeshReference } from "../types";

const updateChunks = (
  instancedMesh: InstancedMeshReference,
  scene: Scene,
  noise: Noise,
  currentChunk: CurrentChunk,
  chunks: Chunks,
  displayableChunks: Chunks,
  x: number,
  z: number
) => {
  // Get the chunk we are on
  const newChunk = getCurrentChunk(x, z);

  // If the chunk is not equal to the chunk at previous frame, rebuild the surroundings
  if (newChunk !== currentChunk.value) {
    // Current value is now the new calculated value
    const chunk = newChunk;
    currentChunk.value = chunk;

    // Get the chunk that are surrounding the chunk we are on
    const surroundingChunks = getSurroundingChunks(chunk);

    // Iterate over the surrounding chunks to see which ones need to be displayed (the ones that are not
    // in the displayableChunks object)
    for (let i = 0; i < surroundingChunks.length; i++) {
      if (!Object.keys(displayableChunks).includes(surroundingChunks[i])) {
        // If chunk does not exist, create a new one
        if (!chunks[surroundingChunks[i]]) {
          // Create a new chunk
          const [x, z] = surroundingChunks[i].split(",").map(Number); // Get the coordinates of the chunk to generate blocks

          const newChunk = generateChunk(noise, GRASS_TEXTURE, x, z); // Generate blocks
  
          chunks[surroundingChunks[i]] = newChunk; // Add blocks to database
        }
      }
    }

    // Reset displayableChunks to make sure the keys were properly added / deleted
    displayableChunks = {};
    for (let i = 0; i < surroundingChunks.length; i++) {
      displayableChunks[surroundingChunks[i]] = chunks[surroundingChunks[i]];
    }

    // Display the new chunks
    displayChunks(scene, instancedMesh, displayableChunks);
  }
};

export default updateChunks;