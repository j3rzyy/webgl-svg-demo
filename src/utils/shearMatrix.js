import * as THREE from 'three';
import { CONFIG } from '../config.js';

export function makeShearMatrix() {
  const { alpha, scaleZ } = CONFIG.shear;

  const Szx = scaleZ * Math.cos(alpha);
  const Szy = scaleZ * Math.sin(alpha);

  const m = new THREE.Matrix4();
  m.set(1, 0, -Szx, 0, 0, 1, -Szy, 0, 0, 0, 1, 0, 0, 0, 0, 1);

  return m;
}
