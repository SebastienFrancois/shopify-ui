import './ai-chat';

export default {
  title: 'Components/AiChat',
  tags: ['autodocs'],
  argTypes: {
    position: { control: 'select', options: ['bottom-right', 'bottom-left'] },
    title: { control: 'text' },
    placeholder: { control: 'text' },
    welcomeMessage: { control: 'text' },
  },
};

export const Default = () => {
  const el = document.createElement('ecom-ai-chat');
  el.setAttribute('title', 'Assistant Boutique');
  el.setAttribute('welcome-message', 'Bonjour ! Je suis votre assistant. Comment puis-je vous aider ?');
  el.setAttribute('endpoint', '/api/chat');
  return el;
};

export const BottomLeft = () => {
  const el = document.createElement('ecom-ai-chat');
  el.setAttribute('position', 'bottom-left');
  el.setAttribute('title', 'Support');
  el.setAttribute('endpoint', '/api/chat');
  return el;
};
