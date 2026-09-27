import { site } from '../data/site';
import { Icon } from './Icon';
import s from './WhatsAppButton.module.css';

export function WhatsAppButton() {
  return (
    <a
      href={site.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={s.button}
      aria-label="Chat with UEMS Ventures on WhatsApp (opens in a new tab)"
    >
      <Icon name="whatsapp" size={22} />
      <span className={s.label} aria-hidden="true">
        WhatsApp us
      </span>
    </a>
  );
}
