/**
 * Code responsible for generating a chunk - a chunk is an n x n collection of blocks
 * The world generates random chunks as we move over the map
 */
import { Noise, Block } from "../models";

import {
  BLOCK_SIZE,
  PERLIN_INCREMENT,
  CHUNK_SIZE,
  INITIAL_WORLD_DEPTH,
  TOP_BLOCK_LIMIT,
  MID_BLOCK_LIMIT,
} from "../constants";
import { Biome, BlockType, Chunk, Exists, Level, Reference } from "../types";
import generateTree from "./generateTree";

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

	let xoff = 0; // Increment on the x axis
  let zoff = 0; // Increment on the z axis
  for (let x = initialX; x < initialX + CHUNK_SIZE * BLOCK_SIZE; x+=BLOCK_SIZE) {
    xoff = 0;
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

        if (x === 3 * BLOCK_SIZE && z === 3 * BLOCK_SIZE && d === 0) {
          blocks = [...blocks, ...generateTree(x, y, z, true)];
        }

        // Add the coordinates of the block to the known territory database
        knownTerritory.value[`${x},${y},${z}`] = true;
      }
      chunk[`${x},${z}`] = blocks;
    }
  }

	return chunk;
};

export default generateChunk;