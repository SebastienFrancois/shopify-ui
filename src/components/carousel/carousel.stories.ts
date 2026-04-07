import './carousel';

export default {
  title: 'Components/Carousel',
  tags: ['autodocs'],
  argTypes: {
    autoplay: { control: 'boolean' },
    interval: { control: 'number' },
    loop: { control: 'boolean' },
    slidesPerView: { control: 'number' },
    navigation: { control: 'select', options: ['arrows', 'dots', 'both', 'none'] },
  },
};

const slideStyle = `
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  font-size: 2rem;
  font-weight: bold;
  color: white;
  border-radius: 12px;
`;

export const Default = () => {
  const el = document.createElement('ecom-carousel');
  const colors = ['#2563eb', '#7c3aed', '#059669', '#dc2626'];
  colors.forEach((color, i) => {
    const slide = document.createElement('div');
    slide.style.cssText = `${slideStyle} background: ${color};`;
    slide.textContent = `Slide ${i + 1}`;
    el.appendChild(slide);
  });
  return el;
};

export const MultipleSlides = () => {
  const el = document.createElement('ecom-carousel');
  el.setAttribute('slides-per-view', '3');
  el.setAttribute('gap', '1rem');
  for (let i = 0; i < 6; i++) {
    const slide = document.createElement('div');
    slide.style.cssText = `${slideStyle} background: hsl(${i * 60}, 60%, 50%); height: 200px;`;
    slide.textContent = `Item ${i + 1}`;
    el.appendChild(slide);
  }
  return el;
};

export const Autoplay = () => {
  const el = document.createElement('ecom-carousel');
  el.setAttribute('autoplay', '');
  el.setAttribute('interval', '3000');
  for (let i = 0; i < 4; i++) {
    const slide = document.createElement('div');
    slide.style.cssText = `${slideStyle} background: hsl(${i * 90}, 70%, 45%); height: 250px;`;
    slide.textContent = `Auto ${i + 1}`;
    el.appendChild(slide);
  }
  return el;
};
