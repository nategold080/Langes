import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/theme';

interface CartBadgeProps {
  count: number;
}

export function CartBadge({ count }: CartBadgeProps) {
  if (count <= 0) return null;
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{count > 99 ? '99+' : count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: Colors.deliRed,
    borderRadius: 9999,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  text: {
    color: Colors.white,
    fontSize: 11,
    fontWeight: '700',
    lineHeight: 13,
  },
});
