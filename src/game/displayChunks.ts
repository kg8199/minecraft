/**
 * Function used to display a chunk on the scene
 */

import { Color, InstancedMesh, Matrix4, Scene } from "three";

import { getBlockCount } from "../utils";

import { BLOCK_BOX, MAP_BLOCK_TO_TEXTURE } from "../constants";
import { BlockType, Chunks, InstancedMeshes, Reference } from "../types";

const displayChunk = (scene: Scene, instancedMeshes: Reference<InstancedMeshes>, chunks: Chunks) => {
  // Remove old mesh
  for (const blockType in instancedMeshes.value) {
    scene.remove(instancedMeshes.value[blockType as BlockType]);
  }

  const blockCounts = getBlockCount(chunks);

  // Modify current mesh
  for (const blockType in instancedMeshes.value) {
    instancedMeshes.value[blockType as BlockType] = new InstancedMesh(
      BLOCK_BOX,
      MAP_BLOCK_TO_TEXTURE[blockType as BlockType],
      blockCounts[blockType as BlockType],
    );
  }

  // Create a counts hashmap to keep track of each blocktype count
  let counts: { [key in BlockType]: number } = {} as { [key in BlockType]: number };

  // Fill the counts variable
  const blockTypes = Object.keys(BlockType);
  for (let i = 0; i < blockTypes.length; i++) {
    counts[blockTypes[i] as BlockType] = 0;
  }


  // Create new mesh and add it to the scene
  for (let chunk in chunks) {
    for (let key in chunks[chunk]) {
      for (let i = 0; i < chunks[chunk][key].length; i++) {
        const block = chunks[chunk][key][i];
        const matrix = new Matrix4().makeTranslation(block.x, block.y, block.z);
        instancedMeshes.value[block.type].setMatrixAt(counts[block.type], matrix);
        counts[block.type] += 1;
      }
    }
  }

  // Add blocks to the scene
  for (const blockType in instancedMeshes.value) {
    scene.add(instancedMeshes.value[blockType as BlockType]);
  }
};

export default displayChunk;