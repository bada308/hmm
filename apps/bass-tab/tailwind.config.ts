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
        bass: {
          50: '#faf6f1',
          100: '#f0e6d8',
          200: '#e0ccb0',
          300: '#cdab80',
          400: '#b8895a',
          500: '#a67444',
          600: '#8a5d38',
          700: '#6e4830',
          800: '#5c3c2b',
          900: '#4d3326',
        },
      },
    },
  },
};

export default config;
