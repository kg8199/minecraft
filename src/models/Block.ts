import {
  Scene,
  BoxBufferGeometry,
  MeshBasicMaterial,
  Mesh,
  EdgesGeometry,
  LineSegments,
  LineBasicMaterial,
} from "three";

import { BLOCK_SIZE, EDGE_COLOR } from "../constants";

/**
 * The Block class builds the squared object that we see in the game (example: cube of dirt, cube of sand, water...)
 */

class Block {
  // Coordinates of the block
  x: number;
  y: number;
  z: number;

  // Texture of the block (grass, stone, dirt...)
  texture: MeshBasicMaterial[];

  public constructor(x: number, y: number, z: number, texture: MeshBasicMaterial[]) {
    this.x = x;
    this.y = y - BLOCK_SIZE * 2; // Initiate the Block Y position under the player position
    this.z = z;
    this.texture = texture;
  }

  // Method that displays the block
  public display = (scene: Scene) => {
    // Create the block
    // Create a new box (width, height, depth)
    const blockBox = new BoxBufferGeometry(BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    let block = new Mesh(blockBox, this.texture); // Combine the block and the material

    // Position the block
    block.position.x = this.x;
    block.position.y = this.y;
    block.position.z = this.z;

    // Create edges for the block (borders)
    const edges = new EdgesGeometry(blockBox); // Position the border
    let line = new LineSegments(
      edges, // Position
      new LineBasicMaterial({ color: EDGE_COLOR }) // Material
    ); // Create the border

    // Position the edges
    line.position.x = this.x;
    line.position.y = this.y; // Initiate the Block Y edges position under the player position
    line.position.z = this.z;

    // Display the block
    // scene.add(line);
    scene.add(block); // Add the block to the scene (our environement)
  };
}

export default Block;
