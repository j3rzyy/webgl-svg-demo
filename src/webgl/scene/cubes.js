import * as THREE from 'three';
import { CONFIG } from '../../config.js';

function createTransformMatrix() {
  const { alpha, scaleZ } = CONFIG.shear;

  const Szx = scaleZ * Math.cos(alpha);
  const Szy = scaleZ * Math.sin(alpha);

  const matrix = new THREE.Matrix4();
  matrix.set(1, 0, -Szx, 0, 0, 1, -Szy, 0, 0, 0, 1, 0, 0, 0, 0, 1);

  return matrix;
}

export function createCubes(scene) {
  const { size, colorApart } = CONFIG.cubes;

  const material = new THREE.MeshStandardMaterial({ color: colorApart });

  const geometry1 = new THREE.BoxGeometry(size, size, size);
  const cube1 = new THREE.Mesh(geometry1, material);

  const geometry2 = new THREE.BoxGeometry(size, size, size);
  const cube2 = new THREE.Mesh(geometry2, material);

  const transformMatrix = createTransformMatrix();
  cube1.geometry.applyMatrix4(transformMatrix);
  cube2.geometry.applyMatrix4(transformMatrix);

  return { cube1, cube2 };
}
