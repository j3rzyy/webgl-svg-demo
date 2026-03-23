import { createScene } from './scene/scene.js';
import { createRenderer } from './scene/renderer.js';
import { createCamera } from './scene/camera.js';
import { createLights } from './scene/lights.js';
import { createCubes } from './scene/cubes.js';
import { CubeAnimation } from './CubeAnimation.js';
import { CONFIG } from '../config.js';

export class WebGLController {
  constructor(container) {
    this.container = container;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.updateSize = null;
    this.animation = null;
  }

  init() {
    this.scene = createScene();

    const { renderer, updateSize } = createRenderer(this.container);
    this.renderer = renderer;
    this.updateSize = updateSize;

    this.camera = createCamera(this.getAspect());

    createLights(this.scene, this.camera);

    const { cube1, cube2 } = createCubes(this.scene);
    this.animation = new CubeAnimation(cube1, cube2, this.renderer, this.scene, this.camera);

    window.addEventListener('resize', () => this.onWindowResize());

    this.animation.animate();
  }

  getAspect() {
    return this.container.clientWidth / this.container.clientHeight;
  }

  onWindowResize() {
    const aspect = this.getAspect();
    const d = CONFIG.camera.frustumSize;

    this.camera.left = -d * aspect;
    this.camera.right = d * aspect;
    this.camera.top = d;
    this.camera.bottom = -d;
    this.camera.updateProjectionMatrix();

    this.updateSize();
    this.animation.animate();
  }

  async toggle() {
    return this.animation.toggle();
  }
}
