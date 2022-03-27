/**
 * This function renders the chunk we are on
 */

import { BLOCK_SIZE, CHUNK_SIZE } from "../constants";

const getCurrentChunk = (x: number, z: number): string => {
  const MULTIPLE = CHUNK_SIZE * BLOCK_SIZE;
  const currentChunkX = Math.floor(x / MULTIPLE) * MULTIPLE;
  const currentChunkZ = Math.floor(z / MULTIPLE) * MULTIPLE;

  return `${currentChunkX},${currentChunkZ}`;
};

export default getCurrentChunk;