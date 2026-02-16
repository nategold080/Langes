import { Platform } from 'react-native';

export const Colors = {
  deliRed: '#C23B22',
  mustard: '#D4A843',
  forest: '#2D5016',
  warmCream: '#FDF6EC',
  paper: '#F5EDE0',
  iosGray: '#F2F2F7',
  white: '#FFFFFF',
  black: '#000000',
  textPrimary: '#000000',
  textSecondary: '#8E8E93',
  textTertiary: 'rgba(60,60,67,0.6)',
  separator: 'rgba(60,60,67,0.12)',
  success: '#34C759',
  destructive: '#FF3B30',
  background: '#F2F2F7',
  cardBackground: '#FFFFFF',
  headerBlur: 'rgba(255,255,255,0.85)',
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const Typography = {
  largeTitle: {
    fontSize: 34,
    fontWeight: '700' as const,
    letterSpacing: 0.37,
  },
  title1: {
    fontSize: 28,
    fontWeight: '700' as const,
    letterSpacing: 0.36,
  },
  title2: {
    fontSize: 22,
    fontWeight: '700' as const,
    letterSpacing: 0.35,
  },
  title3: {
    fontSize: 20,
    fontWeight: '600' as const,
    letterSpacing: 0.38,
  },
  headline: {
    fontSize: 17,
    fontWeight: '600' as const,
    letterSpacing: -0.41,
  },
  body: {
    fontSize: 17,
    fontWeight: '400' as const,
    letterSpacing: -0.41,
  },
  callout: {
    fontSize: 16,
    fontWeight: '400' as const,
    letterSpacing: -0.32,
  },
  subheadline: {
    fontSize: 15,
    fontWeight: '400' as const,
    letterSpacing: -0.24,
  },
  footnote: {
    fontSize: 13,
    fontWeight: '400' as const,
  },
  caption1: {
    fontSize: 12,
    fontWeight: '400' as const,
  },
  caption2: {
    fontSize: 11,
    fontWeight: '400' as const,
    letterSpacing: 0.07,
  },
} as const;

export const BorderRadius = {
  sm: 8,
  md: 10,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;
