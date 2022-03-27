/**
 * Function used to display a chunk on the scene
 */

import { InstancedMesh, Matrix4, Scene } from "three";

import { BLOCK_BOX, CHUNK_SIZE, GRASS_TEXTURE, RENDER_DISTANCE } from "../constants";
import { Chunks, InstancedMeshReference } from "../types";

const displayChunk = (scene: Scene, instancedMesh: InstancedMeshReference, chunks: Chunks) => {
  // Remove old mesh
  if (scene.children.length) {
    scene.remove(instancedMesh.value);
  }

  instancedMesh.value = new InstancedMesh(
    BLOCK_BOX,
    GRASS_TEXTURE,
    RENDER_DISTANCE**2 * CHUNK_SIZE**2
  );

  // Create new mesh and add it to the scene
  let count = 0;
  for (let chunk in chunks) {
    for (let key in chunks[chunk]) {
      const block = chunks[chunk][key];
      const matrix = new Matrix4().makeTranslation(block.x, block.y, block.z);
      instancedMesh.value.setMatrixAt(count, matrix);
      count++;
    }
  }
  scene.add(instancedMesh.value);
};

export default displayChunk;