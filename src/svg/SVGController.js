import { loadSvg, createSvg } from './utils.js';
import { CONFIG } from '../config.js';

export class SVGController {
  constructor(container) {
    this.container = container;
    this.circle = null;
  }

  async init() {
    const svgText = await loadSvg('/circle.svg');
    const svg = createSvg(svgText, this.container);

    this.circle = svg.querySelector('#main-circle');
  }

  updateCircleColor(isTogether) {
    if (!this.circle) return;

    const color = isTogether ? CONFIG.cubes.colorTogether : CONFIG.cubes.colorApart;
    this.circle.setAttribute('fill', color);
  }
}
