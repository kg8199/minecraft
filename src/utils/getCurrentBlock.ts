/**
 * Returns the current block based on the coordinates of the player
 */

import { Block } from "../models";

import { Chunk } from "../types";
import { BLOCK_SIZE } from "../constants";

const getCurrentBlock = (x: number, z: number, chunks: Chunk[]): Block | null => {
	// Get the current block the player is on
	const currentPositionX =
	Math.floor((x + BLOCK_SIZE / 2) / BLOCK_SIZE) * BLOCK_SIZE;
	const currentPositionZ = Math.floor((z + BLOCK_SIZE / 2) / BLOCK_SIZE) * BLOCK_SIZE;
	const key = `${currentPositionX},${currentPositionZ}`; // The key of the block we're looking for

	let idx = 0; // Index of the current chunk we're checking in

	// Loop over chunks to check if current block is there
	while (idx < chunks.length) {
		if (chunks[idx][key]) {
			return chunks[idx][key]; // Return current block if found
		}
		idx++;
	}

	return null;
};

export default getCurrentBlock;