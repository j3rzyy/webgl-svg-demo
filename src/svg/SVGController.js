import { getSvg, createSvg } from './utils.js';
import { CONFIG } from '../config.js';

export class SVGController {
  constructor(container) {
    this.container = container;
    this.circle = null;
  }

  async init() {
    const svgEl = await getSvg('./src/assets/circle.svg');
    this.circle = createSvg(svgEl, this.container).getElementById('main-circle');
  }

  updateCircleColor(isTogether) {
    if (!this.circle) return;

    const color = isTogether ? CONFIG.cubes.colorTogether : CONFIG.cubes.colorApart;
    this.circle.setAttribute('fill', color);
  }
}
