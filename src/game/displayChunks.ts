/**
 * Function used to display a chunk on the scene
 */

import { InstancedMesh, Matrix4, Scene } from "three";

import { getBlockCount } from "../utils";

import {
  BLOCK_BOX,
  BLOCK_BOX_CHEST_BASE,
  BLOCK_BOX_CHEST_TOP,
  BLOCK_SIZE,
  CHEST_BASE_BLOCK_HEIGHT,
  CHEST_TOP_BLOCK_HEIGHT,
  MAP_BLOCK_TO_TEXTURE
} from "../constants";
import { BlockType, Chunks, InstancedMeshes, Reference } from "../types";

const displayChunk = (
  scene: Scene,
  instancedMeshes: Reference<InstancedMeshes>,
  chunks: Chunks
) => {
  // Remove old mesh
  for (const blockType in instancedMeshes.value) {
    scene.remove(instancedMeshes.value[blockType as BlockType]);
  }

  const blockCounts = getBlockCount(chunks);

  // Modify current mesh
  for (const blockType in instancedMeshes.value) {
    const type = blockType as BlockType;
    if (type === BlockType.CHEST) {
      instancedMeshes.value[type] = new InstancedMesh(
        BLOCK_BOX_CHEST_BASE,
        MAP_BLOCK_TO_TEXTURE[type],
        blockCounts[type],
      );
    } else if (type === BlockType.CHEST_TOP) {
      instancedMeshes.value[type] = new InstancedMesh(
        BLOCK_BOX_CHEST_TOP,
        MAP_BLOCK_TO_TEXTURE[type],
        blockCounts[type],
      );
    } else {
      instancedMeshes.value[type] = new InstancedMesh(
        BLOCK_BOX,
        MAP_BLOCK_TO_TEXTURE[type],
        blockCounts[type],
      );
    }
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
        if (block.type === BlockType.CHEST) {
          // If block is chest, add both chest base and chest top to the scene
          const baseMatrix = new Matrix4().makeTranslation(
            block.x,
            block.y - BLOCK_SIZE / 2 + CHEST_BASE_BLOCK_HEIGHT / 2,
            block.z
          );
          instancedMeshes.value[block.type].setMatrixAt(counts[block.type], baseMatrix);
          counts[block.type] += 1;
          let topMatrix = new Matrix4().makeTranslation(
            block.x,
            block.y - BLOCK_SIZE / 2 + CHEST_BASE_BLOCK_HEIGHT + CHEST_TOP_BLOCK_HEIGHT / 2,
            block.z
          );
          instancedMeshes.value[BlockType.CHEST_TOP].setMatrixAt(counts[BlockType.CHEST_TOP], topMatrix);
          counts[BlockType.CHEST_TOP] += 1;
        } else {
          const matrix = new Matrix4().makeTranslation(block.x, block.y, block.z);
          instancedMeshes.value[block.type].setMatrixAt(counts[block.type], matrix);
          counts[block.type] += 1;
        }
      }
    }
  }

  // Add blocks to the scene
  for (const blockType in instancedMeshes.value) {
    scene.add(instancedMeshes.value[blockType as BlockType]);
  }
};

export default displayChunk;