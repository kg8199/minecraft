import {
  Scene,
  BoxBufferGeometry,
  MeshBasicMaterial,
  Mesh,
  EdgesGeometry,
  LineSegments,
  LineBasicMaterial,
} from "three";

import { BLOCK_SIZE } from "../constants";

/**
 * The Block class builds the squared object that we see in the game (example: cube of dirt, cube of sand, water...)
 */

class Block {
  // Coordinates of the block
  private x: number;
  private y: number;
  private z: number;

  public constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y - BLOCK_SIZE * 2; // Initiate the Block Y position under the player position
    this.z = z;
  }

  // Method that displays the block
  public display = (scene: Scene) => {
    // Create the block
    const blockBox = new BoxBufferGeometry(BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE); // Create a new box (width, height, depth)
    const blockMesh = new MeshBasicMaterial({ color: 0x00ff00 }); // What is displayed on the block (the color / image)
    let block = new Mesh(blockBox, blockMesh); // Combine the block and the material

    // Position the block
    block.position.x = this.x;
    block.position.y = this.y;
    block.position.z = this.z;

    // Create edges for the block (borders)
    const edges = new EdgesGeometry(blockBox); // Position the border
    let line = new LineSegments(
      edges, // Position
      new LineBasicMaterial({ color: 0xffffff }) // Material
    ); // Create the border

    // Position the edges
    line.position.x = this.x;
    line.position.y = this.y - BLOCK_SIZE * 2; // Initiate the Block Y edges position under the player position
    line.position.z = this.z;

    // Display the block
    scene.add(line);
    scene.add(block); // Add the block to the scene (our environement)
  };
}

export default Block;
