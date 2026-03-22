export async function getSvg(svgPath) {
  const response = await fetch(svgPath);
  const svgEl = await response.text();

  return svgEl;
}

export function addSvg(element, container) {
  container.innerHTML = element;

  const svg = container.querySelector('svg');

  return svg;
}
