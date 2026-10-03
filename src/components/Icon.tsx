import type { SVGProps } from 'react';

const strokePaths = {
  'arrow-right': 'M5 12h14M13 6l6 6-6 6',
  'arrow-up-right': 'M7 17 17 7M8 7h9v9',
  'chevron-down': 'm6 9 6 6 6-6',
  check: 'M20 6 9 17l-5-5',
  'check-circle': 'M22 11.1V12a10 10 0 1 1-5.9-9.1M22 4 12 14l-3-3',
  menu: 'M4 7h16M4 12h16M4 17h16',
  close: 'M18 6 6 18M6 6l12 12',
  plus: 'M12 5v14M5 12h14',
  phone:
    'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z',
  mail: 'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2ZM22 7l-10 6L2 7',
  'map-pin': 'M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0ZM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
  calendar: 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z',
  clock: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM12 6v6l4 2',
  play: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM10 8.5l5.5 3.5-5.5 3.5Z',
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z',
  lock: 'M7 11V7a5 5 0 0 1 10 0v4M5 11h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z',
  globe: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z',
  instagram:
    'M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5ZM16 11.4A4 4 0 1 1 12.6 8a4 4 0 0 1 3.4 3.4ZM17.5 6.5h.01',
} as const;

const fillPaths = {
  star: 'M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5-4.8-4.6 6.6-.9L12 2.5Z',
  quote:
    'M9.6 5C6 6.6 3.5 9.9 3.5 14.2 3.5 17.3 5.3 19 7.6 19c2 0 3.6-1.6 3.6-3.6S9.8 12 7.9 12c-.4 0-.8 0-1 .1.4-2.2 2.3-4.3 4.2-5.3L9.6 5Zm9 0c-3.6 1.6-6 4.9-6 9.2 0 3.1 1.7 4.8 4 4.8 2 0 3.6-1.6 3.6-3.6S18.8 12 16.9 12c-.4 0-.8 0-1 .1.4-2.2 2.3-4.3 4.2-5.3L18.6 5Z',
  facebook:
    'M14 13.5h2.5l1-4H14v-2c0-1 0-2 2-2h1.5V2.1C17.2 2.1 15.9 2 14.6 2 11.9 2 10 3.7 10 6.7v2.8H7v4h3V22h4v-8.5Z',
  linkedin:
    'M6.9 8.9H3.1V21h3.8V8.9ZM5 3a2.2 2.2 0 1 0 0 4.4A2.2 2.2 0 0 0 5 3Zm15.9 11.4c0-3.3-.7-5.8-4.5-5.8-1.8 0-3 1-3.5 1.9h-.1V8.9H9.2V21H13v-6c0-1.6.3-3.1 2.3-3.1s2 1.8 2 3.2V21h3.8l-.1-6.6Z',
  twitter:
    'M17.8 3h3.1l-6.8 7.7 8 10.3h-6.2l-4.9-6.3L5.4 21H2.3l7.2-8.3L1.9 3h6.4l4.4 5.8L17.8 3Zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5Z',
  whatsapp:
    'M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.2l-1 1.2c-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.5.3-.5c.1-.2 0-.4 0-.5l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.4ZM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4a9.8 9.8 0 0 1-1.5-5.2c0-5.4 4.4-9.9 9.9-9.9a9.9 9.9 0 0 1 9.9 9.9c0 5.4-4.5 9.8-10 9.8Zm8.4-18.3A11.8 11.8 0 0 0 12 0C5.5 0 .2 5.3.2 11.9c0 2.1.5 4.1 1.6 5.9L.1 24l6.3-1.7a11.9 11.9 0 0 0 5.7 1.4c6.5 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.5-8.4Z',
} as const;

export type IconName = keyof typeof strokePaths | keyof typeof fillPaths;

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName;
  size?: number;
}

export function Icon({ name, size = 16, ...rest }: IconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    'aria-hidden': true,
    focusable: false,
    ...rest,
  } as const;

  if (name in fillPaths) {
    return (
      <svg {...common} fill="currentColor">
        <path d={fillPaths[name as keyof typeof fillPaths]} />
      </svg>
    );
  }

  return (
    <svg {...common} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d={strokePaths[name as keyof typeof strokePaths]} />
    </svg>
  );
}
