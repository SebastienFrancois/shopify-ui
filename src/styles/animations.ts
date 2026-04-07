export const fadeIn = `
  @keyframes sui-fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

export const slideUp = `
  @keyframes sui-slide-up {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const scaleIn = `
  @keyframes sui-scale-in {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
`;

export const pulse = `
  @keyframes sui-pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
`;

export const shimmer = `
  @keyframes sui-shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
`;
