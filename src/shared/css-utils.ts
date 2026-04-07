export function glassmorphism(
  blur = 12,
  opacity = 0.15,
  borderOpacity = 0.2,
): string {
  return `
    background: rgba(255, 255, 255, ${opacity});
    backdrop-filter: blur(${blur}px);
    -webkit-backdrop-filter: blur(${blur}px);
    border: 1px solid rgba(255, 255, 255, ${borderOpacity});
  `;
}

export function responsiveGrid(minCol = '280px', gap = '1rem'): string {
  return `
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(${minCol}, 1fr));
    gap: ${gap};
  `;
}
