import type { Config } from 'tailwindcss';
import sharedConfig from '@repo/config/tailwind';

const config: Config = {
  ...sharedConfig,
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    ...sharedConfig.theme,
    extend: {
      ...sharedConfig.theme?.extend,
      colors: {
        ...sharedConfig.theme?.extend?.colors,
        greenery: {
          50: '#f4f9f0',
          100: '#e5f1dc',
          200: '#cce4bc',
          300: '#a8d08f',
          400: '#88b04b',
          500: '#6a9a3a',
          600: '#527a2d',
          700: '#415f26',
          800: '#364d22',
          900: '#2e411f',
        },
      },
    },
  },
};

export default config;
