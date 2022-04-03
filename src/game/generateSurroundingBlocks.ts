/**
 * This function checks if there is a block around the block we're removing, if not - it creates on
 * The function is used for infinite underground generation
 */

import { Block } from "../models";

import { getCurrentChunk } from "../utils";

import { BLOCK_SIZE } from "../constants";
import { BlockType, Chunks, Coordinates, Exists, Reference } from "../types";

const generateSurroundingBlocks = (
  x: number,
  y: number,
  z: number,
  chunks: Chunks,
  knownTerritory: Reference<Exists>
) => {
  const blocks: Coordinates[] = [
    { x: x - BLOCK_SIZE, y, z }, // Left
    { x: x + BLOCK_SIZE, y, z }, // Right
    { x, y: y - BLOCK_SIZE, z }, // Bottom
    { x, y: y + BLOCK_SIZE, z }, // Top
    { x, y, z: z - BLOCK_SIZE }, // Back
    { x, y, z: z + BLOCK_SIZE }, // Front
  ];
  
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    // Check if we know territory
    if (!knownTerritory.value[`${block.x},${block.y},${block.z}`]) {
      // If we don't know territory, add new block
      const chunk = getCurrentChunk(block.x, block.z);
      chunks[chunk][`${block.x},${block.z}`].push(new Block(block.x, block.y, block.z, BlockType.GRASS));
      // Add new block to known territory
      knownTerritory.value[`${block.x},${block.y},${block.z}`] = true;
    }
  }
};

export default generateSurroundingBlocks;