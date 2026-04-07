import './glass-card';

export default {
  title: 'Components/GlassCard',
  tags: ['autodocs'],
  argTypes: {
    blur: { control: { type: 'range', min: 0, max: 30 } },
    opacity: { control: { type: 'range', min: 0, max: 1, step: 0.05 } },
    borderOpacity: { control: { type: 'range', min: 0, max: 1, step: 0.05 } },
    tint: { control: 'text' },
  },
};

const bgStyle = `
  padding: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
`;

export const Default = () => {
  const wrapper = document.createElement('div');
  wrapper.style.cssText = bgStyle;
  wrapper.innerHTML = `
    <ecom-glass-card>
      <h3 style="color: white; margin-bottom: 8px;">Glassmorphism Card</h3>
      <p style="color: rgba(255,255,255,0.8);">Un effet moderne et elegant pour vos composants Shopify.</p>
    </ecom-glass-card>
  `;
  return wrapper;
};

export const HighBlur = () => {
  const wrapper = document.createElement('div');
  wrapper.style.cssText = bgStyle;
  wrapper.innerHTML = `
    <ecom-glass-card blur="24" opacity="0.1">
      <h3 style="color: white;">Blur Intense</h3>
      <p style="color: rgba(255,255,255,0.8);">Avec un flou plus prononce.</p>
    </ecom-glass-card>
  `;
  return wrapper;
};

export const ColorTint = () => {
  const wrapper = document.createElement('div');
  wrapper.style.cssText = `padding: 40px; background: url('https://picsum.photos/800/400') center/cover; border-radius: 12px;`;
  wrapper.innerHTML = `
    <ecom-glass-card tint="0, 0, 0" opacity="0.3">
      <h3 style="color: white;">Dark Tint</h3>
      <p style="color: rgba(255,255,255,0.8);">Teinte sombre sur fond image.</p>
    </ecom-glass-card>
  `;
  return wrapper;
};
