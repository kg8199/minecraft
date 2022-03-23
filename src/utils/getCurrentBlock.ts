/**
 * Returns the current block based on the coordinates of the player
 */

import { Block } from "../models";

import { BlockStorage } from "../types";
import { BLOCK_SIZE } from "../constants";

const getCurrentBlock = (x: number, z: number, blocks: BlockStorage): Block | null => {
	// Get the current block the player is on
	const currentPositionX =
	Math.floor((x + BLOCK_SIZE / 2) / BLOCK_SIZE) * BLOCK_SIZE;
	const currentPositionZ = Math.floor((z + BLOCK_SIZE / 2) / BLOCK_SIZE) * BLOCK_SIZE;
	return blocks[`${currentPositionX},${currentPositionZ}`]; // Current block we're on
};

export default getCurrentBlock;