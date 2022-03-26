/**
 * Algorithm that generates a certain number of chunks
 */

import { MeshBasicMaterial } from "three";

import { Noise } from "../models";

import { RENDER_DISTANCE } from "../constants";
import { Chunk } from "../types";
import generateChunk from "./generateChunk";

const generateChunks = (texture: MeshBasicMaterial[]): Chunk[] => {
	// Load Perlin Noise
	let noise = new Noise();
	noise.seed(Math.random());

	// Array of chunks we return
	const chunks: Chunk[] = [];

	// Loop over the render distance to generate the chunks
	for (let i = 0; i < RENDER_DISTANCE; i++) {
		for (let j = 0; j < RENDER_DISTANCE; j++) {
			chunks.push(generateChunk(noise, texture, i, j));
		}
	}

	return chunks;
};

export default generateChunks;