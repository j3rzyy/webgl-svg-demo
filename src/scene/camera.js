import * as THREE from 'three';
import { CONFIG } from '../config.js';

export function createCamera(aspect) {
  const { frustumSize, near, far, position } = CONFIG.camera;

  const camera = new THREE.OrthographicCamera(
    -frustumSize * aspect,
    frustumSize * aspect,
    frustumSize,
    -frustumSize,
    near,
    far,
  );

  camera.position.set(position.x, position.y, position.z);
  camera.lookAt(0, 0, 0);

  return camera;
}
