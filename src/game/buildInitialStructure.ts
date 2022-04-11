/**
 * Builds the initial structure of the terrain
 */

import { Block } from "../models";

import { getCurrentChunk } from "../utils";

import { BLOCK_SIZE, CHESTS } from "../constants";
import { BlockType, Chunks } from "../types";

const buildInitialStructure = (chunks: Chunks, minX: number, maxX: number, minZ: number, maxZ: number, level: number) => {
  for (let x = minX; x <= maxX; x += BLOCK_SIZE) {
    for (let z = minZ; z <= maxZ; z += BLOCK_SIZE) {
      const chunk = getCurrentChunk(x, z);
      chunks[chunk][`${x},${z}`].push(new Block(x, level, z, BlockType.COBBLESTONE));

      // Build the first layer
      if (
        x < minX + 5 * BLOCK_SIZE
        || x > maxX - 5 * BLOCK_SIZE
        || z < minZ + 5 * BLOCK_SIZE
        || z > maxZ - 5 * BLOCK_SIZE
      ) {
        chunks[chunk][`${x},${z}`].push(new Block(x, level + BLOCK_SIZE, z, BlockType.COBBLESTONE));
      }

      // Build the second layer
      if (
        !(x === minX || x === maxX || z === minZ || z === maxZ) &&
        ((x > minX && x < minX + 4 * BLOCK_SIZE)
        || (x > maxX - 4 * BLOCK_SIZE && x < maxX)
        || (z > minZ && z < minZ + 4 * BLOCK_SIZE)
        || (z > maxZ - 4 * BLOCK_SIZE && z < maxZ))
      ) {
        chunks[chunk][`${x},${z}`].push(new Block(x, level + 2 * BLOCK_SIZE, z, BlockType.COBBLESTONE));
      }

      // Build the third layer
      if (
        ((x === minX + 2 * BLOCK_SIZE || x === maxX - 2 * BLOCK_SIZE)
        && (z >= minZ + 2 * BLOCK_SIZE && z <= maxZ - 2 * BLOCK_SIZE))
        || ((z === minZ + 2 * BLOCK_SIZE || z === maxZ - 2 * BLOCK_SIZE)
        && (x >= minX + 2 * BLOCK_SIZE && x <= maxX - 2 * BLOCK_SIZE)) 
      ) {
        chunks[chunk][`${x},${z}`].push(new Block(x, level + 3 * BLOCK_SIZE, z, BlockType.COBBLESTONE));
      }
    }
  }

  for (let i = 0; i < CHESTS.length; i++) {
    const { x, y, z } = CHESTS[i].coords;

    let chunk = getCurrentChunk(x, z);
    chunks[chunk][`${x},${z}`].push(new Block(x, y, z, BlockType.CHEST));

    chunk = getCurrentChunk(x+BLOCK_SIZE, z);
    chunks[chunk][`${x+BLOCK_SIZE},${z}`].push(new Block(x + BLOCK_SIZE, y, z, CHESTS[i].labelTexture));
  }
};

export default buildInitialStructure;