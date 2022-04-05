/**
 * Function that is called at every frame
 * It scans the current chunk we're in and update the surroundings in order to create an infinite world
 */

import { Scene } from "three";

import { Noise } from "../models";

import generateChunk from "./generateChunk";
import displayChunks from "./displayChunks";
import { getCurrentChunk, getSurroundingChunks, randRange } from "../utils";

import { BIOMES, BIOME_SIZE } from "../constants";
import { Biome, Chunks, Exists, InstancedMeshes, Level, Reference } from "../types";

const updateChunks = (
  instancedMeshes: Reference<InstancedMeshes>,
  scene: Scene,
  noise: Noise,
  currentChunk: Reference<string>,
  chunks: Chunks,
  displayableChunks: Reference<Chunks>,
  knownTerritory: Reference<Exists>,
  topLevel: Reference<Level>,
  x: number,
  z: number,
  currentBiome: Reference<Biome>,
  currentBiomeCount: Reference<number>,
  currentAmplitude: Reference<number>
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

          const newChunk = generateChunk(
            noise, x, z, knownTerritory, topLevel, currentBiome.value, currentAmplitude.value); // Generate blocks
          currentBiomeCount.value += 1; // Increase the count of chunks that have been built in the current biome

          // Change biome if we exceeded the current biome limit
          if (currentBiomeCount.value >= BIOME_SIZE) {
            // Implement new biome
            currentBiomeCount.value = 0;
            const biomeIndex = randRange(0, currentBiome.value.neighbors.length - 1);
            currentBiome.value = BIOMES[currentBiome.value.neighbors[biomeIndex]];
            currentAmplitude.value = randRange(currentBiome.value.amplitudeRange[0], currentBiome.value.amplitudeRange[1]);
          }
  
          chunks[surroundingChunks[i]] = newChunk; // Add blocks to database
        }
      }
    }

    // Reset displayableChunks to make sure the keys were properly added / deleted
    displayableChunks.value = {};
    for (let i = 0; i < surroundingChunks.length; i++) {
      displayableChunks.value[surroundingChunks[i]] = chunks[surroundingChunks[i]];
    }

    // Display the new chunks
    displayChunks(scene, instancedMeshes, displayableChunks.value);
  }
};

export default updateChunks;