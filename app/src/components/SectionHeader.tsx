import React from 'react';
import { Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../constants/theme';

interface SectionHeaderProps {
  title: string;
  style?: ViewStyle;
}

export function SectionHeader({ title, style }: SectionHeaderProps) {
  return (
    <Text style={[styles.header, style]}>
      {title}
    </Text>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: Colors.textTertiary,
    paddingHorizontal: 16,
    paddingBottom: 8,
    paddingTop: 32,
    letterSpacing: 0.5,
  },
});
