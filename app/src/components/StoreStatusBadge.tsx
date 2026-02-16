import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/theme';
import { useStoreStatus } from '../hooks/useStoreStatus';

export function StoreStatusBadge() {
  const { isOpen, statusText } = useStoreStatus();

  return (
    <View style={[styles.badge, { backgroundColor: isOpen ? Colors.success : Colors.textSecondary }]}>
      <Text style={styles.text}>{statusText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 9999,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  text: {
    fontSize: 13,
    color: Colors.white,
    fontWeight: '500',
  },
});
