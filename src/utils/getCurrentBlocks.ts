/**
 * Function that returns the current block stack we are on
 */

import { BLOCK_SIZE } from "../constants";

const getCurrentBlocks = (x: number, z: number): string => {
  // Get the current block the player is on
	const currentPositionX =
	Math.floor((x + BLOCK_SIZE / 2) / BLOCK_SIZE) * BLOCK_SIZE;
	const currentPositionZ = Math.floor((z + BLOCK_SIZE / 2) / BLOCK_SIZE) * BLOCK_SIZE;
	return `${currentPositionX},${currentPositionZ}`; // The key of the block we're looking for
};

export default getCurrentBlocks;