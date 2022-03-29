/**
 * Returns the current block based on the coordinates of the player
 */

import { Block } from "../models";

import { Chunks } from "../types";
import { BLOCK_SIZE } from "../constants";

const getCurrentBlock = (x: number, y: number, z: number, chunks: Chunks): Block | null => {
	// Get the current block the player is on
	const currentPositionX =
	Math.floor((x + BLOCK_SIZE / 2) / BLOCK_SIZE) * BLOCK_SIZE;
	const currentPositionZ = Math.floor((z + BLOCK_SIZE / 2) / BLOCK_SIZE) * BLOCK_SIZE;
	const block = `${currentPositionX},${currentPositionZ}`; // The key of the block we're looking for

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