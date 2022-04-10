/**
 * Function that returns the block count of a group of chunks
 */

import { BlockType, Chunks } from "../types";

const getBlockCount = (chunks: Chunks): { [key in BlockType]: number } => {
  let count: { [key in BlockType]: number } = {} as { [key in BlockType]: number };

  for (const blockType in BlockType) {
    count[blockType as BlockType] = 0;
  }

  for (const chunk in chunks) {
    for (const block in chunks[chunk]) {
      const blocks = chunks[chunk][block];
      for (let i = 0; i < blocks.length; i++) {
        if (blocks[i].type === BlockType.CHEST) {
          // If block is chest, add count to chest top
          count[BlockType.CHEST_TOP] += 1;
        }
        count[blocks[i].type] += 1
      }
    }
  }
  return count;
};

export default getBlockCount;