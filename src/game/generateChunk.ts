/**
 * Code responsible for generating a chunk - a chunk is an n x n collection of blocks
 * The world generates random chunks as we move over the map
 */
import { MeshBasicMaterial } from "three";

import { Noise, Block } from "../models";

import { BLOCK_SIZE, PERLIN_AMPLITUDE, PERLIN_INCREMENT, CHUNK_SIZE } from "../constants";
import { Chunk } from "../types";

const generateChunk = (noise: Noise, texture: MeshBasicMaterial[], initialX: number, initialZ: number): Chunk => {
	let chunk: Chunk = {};

	let xoff = 0; // Increment on the x axis
  let zoff = 0; // Increment on the y axis
  for (let x = initialX * CHUNK_SIZE; x < initialX * CHUNK_SIZE + CHUNK_SIZE; x++) {
    xoff = 0;
    for (let z = initialZ * CHUNK_SIZE; z < initialZ * CHUNK_SIZE + CHUNK_SIZE; z++) {
      xoff = x * PERLIN_INCREMENT;
      zoff = z * PERLIN_INCREMENT;
      const blockX = x * BLOCK_SIZE;
      const blockZ = z * BLOCK_SIZE;
      const y =
        Math.round(
          (noise.perlin2(xoff, zoff) * PERLIN_AMPLITUDE) / BLOCK_SIZE
        ) * BLOCK_SIZE;
      const block = new Block(blockX, y, blockZ, texture);

      chunk[`${blockX},${blockZ}`] = block;
    }
  }

	return chunk;
};

export default generateChunk;