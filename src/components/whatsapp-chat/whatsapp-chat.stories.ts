import './whatsapp-chat';

export default {
  title: 'Components/WhatsappChat',
  tags: ['autodocs'],
  argTypes: {
    phone: { control: 'text' },
    message: { control: 'text' },
    position: { control: 'select', options: ['bottom-right', 'bottom-left'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    tooltip: { control: 'text' },
    pulse: { control: 'boolean' },
    delay: { control: 'number' },
  },
};

export const Default = () => {
  const el = document.createElement('ecom-whatsapp-chat');
  el.setAttribute('phone', '+33612345678');
  el.setAttribute('message', 'Bonjour, je suis interesse par vos produits !');
  el.setAttribute('tooltip', 'Besoin d\'aide ?');
  return el;
};

export const WithPulse = () => {
  const el = document.createElement('ecom-whatsapp-chat');
  el.setAttribute('phone', '+33612345678');
  el.setAttribute('pulse', '');
  el.setAttribute('tooltip', 'Discutons !');
  el.setAttribute('size', 'lg');
  return el;
};

export const Small = () => {
  const el = document.createElement('ecom-whatsapp-chat');
  el.setAttribute('phone', '+33612345678');
  el.setAttribute('size', 'sm');
  el.setAttribute('position', 'bottom-left');
  return el;
};
