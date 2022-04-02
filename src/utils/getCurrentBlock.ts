/**
 * Returns the current block based on the coordinates of the player
 */

import { Block } from "../models";

import getCurrentBlocks from "./getCurrentBlocks";

import { Chunks } from "../types";

const getCurrentBlock = (x: number, y: number, z: number, chunks: Chunks): Block | null => {
	const block = getCurrentBlocks(x, z);

	// Loop over chunks to check if current block is there
	for (const chunk in chunks) {
		if (chunks[chunk][block]) {
			// Get the block that has the highest y and return it
			let currentBlock: Block;
			for (let i = 0; i < chunks[chunk][block].length; i++) {
				if ((chunks[chunk][block][i].y <= y) && (!currentBlock || chunks[chunk][block][i].y > currentBlock.y)) {
					currentBlock = chunks[chunk][block][i];
				}
			}
			return currentBlock; // Return current block if found
		}
	}

	return null;
};

export default getCurrentBlock;