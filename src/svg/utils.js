import { CONFIG } from '../config.js';

export async function getSvg(svgPath) {
  const response = await fetch(svgPath);
  const svgEl = await response.text();

  return svgEl;
}

export function createSvg(element, container) {
  container.innerHTML = element;

  const svg = container.querySelector('svg');
  svg.style.backgroundColor = CONFIG.scene.background;

  return svg;
}
