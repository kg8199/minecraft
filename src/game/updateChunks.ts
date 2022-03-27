/**
 * Function that is called at every frame
 * It scans the current chunk we're in and update the surroundings in order to create an infinite world
 */

import { Scene } from "three";

import { Noise } from "../models";

import generateChunk from "./generateChunk";
import { getCurrentChunk, getSurroundingChunks } from "../utils";

import { CHUNK_SIZE, GRASS_TEXTURE, RENDER_DISTANCE } from "../constants";
import { Chunks, CurrentChunk } from "../types";

const updateChunks = (
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
        // Check if chunk already exists in database
        if (chunks[surroundingChunks[i]]) {
          // Display the chunks
          for (let key in chunks[surroundingChunks[i]]) {
            chunks[surroundingChunks[i]][key].display(scene, chunks);
          }
        } else {
          // Create a new chunk
          const [x, z] = surroundingChunks[i].split(",").map(Number); // Get the coordinates of the chunk to generate blocks

          const newChunk = generateChunk(noise, GRASS_TEXTURE, x, z); // Generate blocks
  
          chunks[surroundingChunks[i]] = newChunk; // Add blocks to database
          displayableChunks[surroundingChunks[i]] = newChunk; // Add blocks to chunks we're currently displaying

          // Display the chunks
          for (let key in newChunk) {
            newChunk[key].display(scene, chunks);
          }
        }
      }
    }

    // Iterate over the displayable chunks to see which chunks need to be removed (the ones that are not in the
    // surroundingChunks array)
    for (let key in displayableChunks) {
      // Check if displayableChunk is no longer in the surroundingChunks and remove it
      if (!surroundingChunks.includes(key)) {
        // Remove the mesh of the blocks of the chunk from the scene (hide the blocks)
        for (let block in displayableChunks[key]) {
          scene.remove(displayableChunks[key][block].mesh);
        }
      }
    }

    // Reset displayableChunks to make sure the keys were properly added / deleted
    displayableChunks = {};
    for (let i = 0; i < surroundingChunks.length; i++) {
      displayableChunks[surroundingChunks[i]] = chunks[surroundingChunks[i]];
    }

    // Check if the scene is clean (there are RENDER_DISTANCE**2 * CHUNK_SIZE**2 blocks) - if not, reset scene
    if (scene.children.length !== RENDER_DISTANCE**2 * CHUNK_SIZE**2) {
      // Rebuild scene from scratch
      scene.children = [].concat(
        ...Object.keys(displayableChunks).map(
          chunk => Object.keys(displayableChunks[chunk]).map(block => displayableChunks[chunk][block].mesh)
        )
      );
    }
  }
};

export default updateChunks;