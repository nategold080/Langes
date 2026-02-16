import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Colors } from '../constants/theme';
import { MenuItem } from '../types';

interface MenuItemCardProps {
  item: MenuItem;
  onAdd: (item: MenuItem) => void;
  showSeparator?: boolean;
}

export function MenuItemCard({ item, onAdd, showSeparator = true }: MenuItemCardProps) {
  const handleAdd = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onAdd(item);
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.nameRow}>
            <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
            {item.popular && (
              <View style={styles.popularBadge}>
                <Text style={styles.popularText}>Popular</Text>
              </View>
            )}
          </View>
          {item.description && (
            <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
          )}
        </View>
        <TouchableOpacity onPress={handleAdd} style={styles.addButton} activeOpacity={0.7}>
          <Ionicons name="add-circle" size={26} color={Colors.deliRed} />
        </TouchableOpacity>
      </View>
      {showSeparator && <View style={styles.separator} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    minHeight: 50,
  },
  content: {
    flex: 1,
    paddingVertical: 10,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  name: {
    fontSize: 17,
    color: Colors.textPrimary,
    flexShrink: 1,
  },
  popularBadge: {
    backgroundColor: Colors.deliRed,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  popularText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.white,
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 2,
    lineHeight: 18,
  },
  addButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.separator,
    marginLeft: 16,
  },
});
