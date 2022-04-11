/**
 * Function that destroys blocks from a certain level in a range on both x and z axes
 */

import { getCurrentChunk } from "../utils";

import { BLOCK_SIZE } from "../constants";
import { Chunks } from "../types";

const cleanTerrain = (
  chunks: Chunks,
  minX: number,
  maxX: number,
  minZ: number,
  maxZ: number,
  level: number
) => {
  // Iterate over a set of blocks to remove the blocks that are higher than the level
  for (let x = minX; x <= maxX; x += BLOCK_SIZE) {
    for (let z = minZ; z <= maxZ; z+= BLOCK_SIZE) {
      const chunk = getCurrentChunk(x, z);
      chunks[chunk][`${x},${z}`] = chunks[chunk][`${x},${z}`].filter(block => block.y <= level);
    }
  }
};

export default cleanTerrain;