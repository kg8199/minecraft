/**
 * Algorithm that generates a certain number of chunks
 */

import { MeshBasicMaterial } from "three";

import { Noise } from "../models";

import { CHUNK_SIZE, RENDER_DISTANCE } from "../constants";
import { Chunks } from "../types";
import generateChunk from "./generateChunk";

const generateChunks = (texture: MeshBasicMaterial[]): Chunks => {
	// Load Perlin Noise
	let noise = new Noise();
	noise.seed(Math.random());

	// Array of chunks we return
	let chunks: Chunks = {};

	// Loop over the render distance to generate the chunks
	for (let x = 0; x < CHUNK_SIZE * RENDER_DISTANCE; x+= CHUNK_SIZE) {
		for (let z = 0; z < CHUNK_SIZE * RENDER_DISTANCE; z+= CHUNK_SIZE) {
			const key = `(${x},${z})`; // The key of the chunk is the initial x and z
			chunks[key] = generateChunk(noise, texture, x, z);
		}
	}

	return chunks;
};

export default generateChunks;