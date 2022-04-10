/**
 * Code responsible for generating a chunk - a chunk is an n x n collection of blocks
 * The world generates random chunks as we move over the map
 */
import { Noise, Block } from "../models";

import generatePalmTree from "./generatePalmTree";
import generateTree from "./generateTree";

import {
  BLOCK_SIZE,
  PERLIN_INCREMENT,
  CHUNK_SIZE,
  INITIAL_WORLD_DEPTH,
  TOP_BLOCK_LIMIT,
  MID_BLOCK_LIMIT,
  CHEST_BASE_BLOCK_HEIGHT,
  CHEST_TOP_BLOCK_HEIGHT
} from "../constants";
import { Biome, BiomeType, BlockType, Chunk, Exists, Level, Reference } from "../types";

const generateChunk = (
  noise: Noise,
  initialX: number,
  initialZ: number,
  knownTerritory: Reference<Exists>,
  topLevel: Reference<Level>,
  biome: Biome,
  amplitude: number
): Chunk => {
  let chunk: Chunk = {};

  const trees: { x: number, y: number, z: number }[] = [];
  let builtTreeInQuadrant: Exists = {
    [`0,0`]: false,
    [`0,1`]: false,
    [`1,0`]: false,
    [`1,1`]: false,
  };

	let xoff = 0; // Increment on the x axis
  let zoff = 0; // Increment on the z axis
  let currentCountX = 0;
  let currentCountZ = 0;
  for (let x = initialX; x < initialX + CHUNK_SIZE * BLOCK_SIZE; x+=BLOCK_SIZE) {
    xoff = 0;
    currentCountZ = 0;
    for (let z = initialZ; z < initialZ + CHUNK_SIZE * BLOCK_SIZE; z+=BLOCK_SIZE) {
      xoff = (x / BLOCK_SIZE) * PERLIN_INCREMENT;
      zoff = (z / BLOCK_SIZE) * PERLIN_INCREMENT;
      const initialY = Math.round((noise.perlin2(xoff, zoff) * amplitude) / BLOCK_SIZE) * BLOCK_SIZE;
      let blocks: Block[] = [];
      // Add the first block to the top level
      topLevel.value[`${x},${z}`] = initialY;
      // Generate INITIAL_WORLD_DEPTH blocks
      for (let d = 0; d < INITIAL_WORLD_DEPTH; d++) {
        let type: BlockType;
        if (d <= TOP_BLOCK_LIMIT) {
          type = biome.top;
        } else if (d <= MID_BLOCK_LIMIT) {
          type = biome.bottom;
        } else {
          type = BlockType.STONE;
        }
        const y = initialY - d * BLOCK_SIZE;
        blocks.push(new Block(x, y, z, type));

        if (d === 0 && x === 20 && z === 20) {
          blocks.push(new Block(x, y + BLOCK_SIZE, z, BlockType.CHEST));
        }

        // Add the coordinates of the block to the known territory database
        knownTerritory.value[`${x},${y},${z}`] = true;

        // Check if we generate tree
        const quadrantX = currentCountX <= CHUNK_SIZE / 2 ? 0 : 1;
        const quadrantZ = currentCountZ <= CHUNK_SIZE / 2 ? 0 : 1;
        if (
          d === 0 // We're at the top of the chunk
          && currentCountX >= (biome.tree.width - 1) / 2 && currentCountZ >= (biome.tree.width - 1) / 2 // Check chunk limits
          && currentCountX < CHUNK_SIZE - (biome.tree.width - 1) / 2
          && currentCountZ < CHUNK_SIZE - (biome.tree.width - 1) / 2
          && !builtTreeInQuadrant[`${quadrantX},${quadrantZ}`] // If no tree has been built in the quadrant yet, randomly build
          && Math.random() < biome.treeFrequency // If we hit the probability of building a tree, build
        ) {

          builtTreeInQuadrant[`${quadrantX},${quadrantZ}`] = true;
          trees.push({ x, y, z });
        }
      }
      chunk[`${x},${z}`] = blocks;
      currentCountZ++;
    }
    currentCountX++;
  }

  // Iterate over tree array to build trees
  for (let i = 0; i < trees.length; i++) {
    if (biome.type === BiomeType.DESERT) {
      generatePalmTree(chunk, trees[i].x, trees[i].y, trees[i].z, biome.tree.leafType);
    } else {
      generateTree(chunk, trees[i].x, trees[i].y, trees[i].z, biome.tree.leafType);
    }
  }

	return chunk;
};

export default generateChunk;