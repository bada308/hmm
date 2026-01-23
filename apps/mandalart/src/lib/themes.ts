import type { ThemeType } from './types';

export interface ThemeColors {
  primary: string; // 핵심 목표 배경
  secondary: string; // 세부 목표 배경
  background: string; // 실행 항목 배경
  border: string; // 테두리
  text: string; // 텍스트 색상
  textLight: string; // 밝은 텍스트
}

export const themes: Record<ThemeType, ThemeColors> = {
  peach: {
    primary: '#FFB5A7',
    secondary: '#FCD5CE',
    background: '#FFF5F3',
    border: '#F8B4A7',
    text: '#8B4A3B',
    textLight: '#C47D6D',
  },
  mint: {
    primary: '#95D5B2',
    secondary: '#B7E4C7',
    background: '#F0FFF4',
    border: '#74C69D',
    text: '#2D6A4F',
    textLight: '#5A9A7C',
  },
  lavender: {
    primary: '#C8B6FF',
    secondary: '#E2D6FF',
    background: '#F8F5FF',
    border: '#B8A4E8',
    text: '#5B4B8A',
    textLight: '#8B7BB5',
  },
  lemon: {
    primary: '#FFE066',
    secondary: '#FFF3B0',
    background: '#FFFEF5',
    border: '#FFD93D',
    text: '#7A6B1A',
    textLight: '#A89A3D',
  },
  sky: {
    primary: '#89CFF0',
    secondary: '#BAE1FF',
    background: '#F0F9FF',
    border: '#6BB9E8',
    text: '#1A5276',
    textLight: '#4A82A0',
  },
};

export const themeNames: Record<ThemeType, string> = {
  peach: '피치',
  mint: '민트',
  lavender: '라벤더',
  lemon: '레몬',
  sky: '스카이',
};

export const getTheme = (themeType: ThemeType): ThemeColors => {
  return themes[themeType];
};

export const themeList: ThemeType[] = ['peach', 'mint', 'lavender', 'lemon', 'sky'];
