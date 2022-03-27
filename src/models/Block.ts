import {
  Scene,
  BoxBufferGeometry,
  MeshBasicMaterial,
  Mesh,
} from "three";

import { BLOCK_SIZE } from "../constants";

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

  // Visuals of the Block
  mesh: Mesh;

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
    this.mesh = new Mesh(blockBox, this.texture); // Combine the block and the material

    // Position the block
    this.mesh.position.x = this.x;
    this.mesh.position.y = this.y;
    this.mesh.position.z = this.z;

    // Display the block
    scene.add(this.mesh); // Add the block to the scene (our environement)
  };
}

export default Block;
