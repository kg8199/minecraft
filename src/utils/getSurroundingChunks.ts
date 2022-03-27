/**
 * Function that returns the surrounding chunks of a chunk
 */

import { BLOCK_SIZE, CHUNK_SIZE, RENDER_DISTANCE } from "../constants";

const getSurroundingChunks = (chunk: string): string[] => {
  const [x, z] = chunk.split(",").map(Number); // Separate coordinates

  const LIMIT = Math.floor(RENDER_DISTANCE / 2);

  const surroundingChunks: string[] = [];

  for (let i = -LIMIT; i <= LIMIT; i++) {
    for (let j = -LIMIT; j <= LIMIT; j++) {
      surroundingChunks.push(`${x + i * CHUNK_SIZE * BLOCK_SIZE},${z + j * CHUNK_SIZE * BLOCK_SIZE}`);
    }
  }

  return surroundingChunks;
};

export default getSurroundingChunks;