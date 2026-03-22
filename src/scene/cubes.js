import * as THREE from 'three';
import { CONFIG } from '../config.js';
import { makeShearMatrix } from '../utils/shearMatrix.js';

export function createCubes(scene) {
  const { size, colorApart } = CONFIG.cubes;

  const material = new THREE.MeshStandardMaterial({
    color: colorApart,
    roughness: 0.5,
    metalness: 0.1,
  });

  const geometry1 = new THREE.BoxGeometry(size, size, size);
  const cube1 = new THREE.Mesh(geometry1, material);

  const geometry2 = new THREE.BoxGeometry(size, size, size);
  const cube2 = new THREE.Mesh(geometry2, material);

  const shearMatrix = makeShearMatrix();
  cube1.geometry.applyMatrix4(shearMatrix);
  cube2.geometry.applyMatrix4(shearMatrix);

  scene.add(cube1);
  scene.add(cube2);

  return { cube1, cube2 };
}
