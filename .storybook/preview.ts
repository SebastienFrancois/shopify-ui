import '../src/index';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'light',
    values: [
      { name: 'light', value: '#ffffff' },
      { name: 'dark', value: '#1e293b' },
      { name: 'shopify', value: '#f6f6f7' },
      { name: 'gradient', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    ],
  },
  viewport: {
    viewports: {
      mobile: { name: 'Mobile', styles: { width: '375px', height: '812px' } },
      tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
      desktop: { name: 'Desktop', styles: { width: '1440px', height: '900px' } },
    },
  },
};
