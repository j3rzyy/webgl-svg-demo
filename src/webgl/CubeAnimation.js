import { CONFIG } from '../config.js';

export class CubeAnimation {
  constructor(cube1, cube2, renderer, scene, camera) {
    this.cubes = [cube1, cube2];
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;

    this.config = CONFIG.cubes;

    this.state = {
      currentDistance: this.config.maxDistance,
      targetDistance: this.config.maxDistance,
      isAnimating: false,
      isTogether: false,
      resolveAnimation: null,
    };

    this.#updatePositions();
  }

  #updatePositions() {
    const offset = this.state.currentDistance / 2;
    this.cubes[0].position.set(-offset, 0, 0);
    this.cubes[1].position.set(offset, 0, 0);
  }

  #updateColor() {
    const color = this.state.isTogether ? this.config.colorTogether : this.config.colorApart;

    this.cubes.forEach((cube) => cube.material.color.set(color));
  }

  animate() {
    const { state, config } = this;

    if (state.isAnimating) {
      const diff = state.targetDistance - state.currentDistance;

      if (Math.abs(diff) < config.animationSpeed) {
        state.currentDistance = state.targetDistance;
        state.isAnimating = false;
        this.#updateColor();
        state.resolveAnimation?.(state.isTogether);
        state.resolveAnimation = null;
      } else {
        state.currentDistance += Math.sign(diff) * config.animationSpeed;
        requestAnimationFrame(() => this.animate());
      }

      this.#updatePositions();
    }

    this.renderer.render(this.scene, this.camera);
  }

  toggle() {
    return new Promise((resolve) => {
      const { state, config } = this;

      if (state.isAnimating) {
        resolve(false);
        return;
      }

      state.resolveAnimation = resolve;
      state.targetDistance = state.isTogether ? config.maxDistance : config.minDistance;
      state.isTogether = !state.isTogether;
      state.isAnimating = true;

      this.animate();
    });
  }
}
