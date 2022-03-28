/**
 * Function used to display a chunk on the scene
 */

import { InstancedMesh, Matrix4, Scene } from "three";

import { getBlockCount } from "../utils";

import { BLOCK_BOX, GRASS_TEXTURE } from "../constants";
import { Chunks, Reference } from "../types";

const displayChunk = (scene: Scene, instancedMesh: Reference<InstancedMesh>, chunks: Chunks) => {
  // Remove old mesh
  if (scene.children.length) {
    scene.remove(instancedMesh.value);
  }

  instancedMesh.value = new InstancedMesh(
    BLOCK_BOX,
    GRASS_TEXTURE,
    getBlockCount(chunks)
  );

  // Create new mesh and add it to the scene
  let count = 0;
  for (let chunk in chunks) {
    for (let key in chunks[chunk]) {
      for (let i = 0; i < chunks[chunk][key].length; i++) {
        const block = chunks[chunk][key][i];
        const matrix = new Matrix4().makeTranslation(block.x, block.y, block.z);
        instancedMesh.value.setMatrixAt(count, matrix);
        count++;
      }
    }
  }
  scene.add(instancedMesh.value);
};

export default displayChunk;