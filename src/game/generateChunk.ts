/**
 * Code responsible for generating a chunk - a chunk is an n x n collection of blocks
 * The world generates random chunks as we move over the map
 */
import { MeshBasicMaterial } from "three";

import { Noise, Block } from "../models";

import { BLOCK_SIZE, PERLIN_AMPLITUDE, PERLIN_INCREMENT, CHUNK_SIZE, INITIAL_WORLD_DEPTH } from "../constants";
import { Chunk } from "../types";

const generateChunk = (noise: Noise, texture: MeshBasicMaterial[], initialX: number, initialZ: number): Chunk => {
	let chunk: Chunk = {};

	let xoff = 0; // Increment on the x axis
  let zoff = 0; // Increment on the z axis
  for (let x = initialX; x < initialX + CHUNK_SIZE * BLOCK_SIZE; x+=BLOCK_SIZE) {
    xoff = 0;
    for (let z = initialZ; z < initialZ + CHUNK_SIZE * BLOCK_SIZE; z+=BLOCK_SIZE) {
      xoff = (x / BLOCK_SIZE) * PERLIN_INCREMENT;
      zoff = (z / BLOCK_SIZE) * PERLIN_INCREMENT;
      const initialY =
        Math.round(
          (noise.perlin2(xoff, zoff) * PERLIN_AMPLITUDE) / BLOCK_SIZE
        ) * BLOCK_SIZE;
      const blocks: Block[] = [];
      // Generate INITIAL_WORLD_DEPTH blocks
      for (let d = 0; d < INITIAL_WORLD_DEPTH; d++) {
        const y = initialY - d * BLOCK_SIZE;
        blocks.push(new Block(x, y, z, texture));
      }
      chunk[`${x},${z}`] = blocks;
    }
  }

	return chunk;
};

export default generateChunk;