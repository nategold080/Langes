import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors, Spacing } from '../../src/constants/theme';
import { MENU_CATEGORIES } from '../../src/constants/menu';
import { useCartStore } from '../../src/store/cartStore';
import { MenuItemCard } from '../../src/components/MenuItemCard';
import { MenuItem, MenuCategory } from '../../src/types';

export default function MenuScreen() {
  const router = useRouter();
  const addToCart = useCartStore((s) => s.addToCart);
  const [activeCategory, setActiveCategory] = useState(MENU_CATEGORIES[0].key);
  const tabScrollRef = useRef<ScrollView>(null);

  const currentCategory = MENU_CATEGORIES.find((c) => c.key === activeCategory) ?? MENU_CATEGORIES[0];

  const handleAdd = (item: MenuItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      description: item.description,
      type: activeCategory,
    });
  };

  const handleCategoryPress = (key: string) => {
    setActiveCategory(key);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Menu</Text>
      </View>

      {/* Category Tabs */}
      <View style={styles.tabContainer}>
        <ScrollView
          ref={tabScrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabScroll}
        >
          {MENU_CATEGORIES.map((cat) => {
            const isActive = cat.key === activeCategory;
            return (
              <TouchableOpacity
                key={cat.key}
                onPress={() => handleCategoryPress(cat.key)}
                style={[styles.tab, isActive && styles.tabActive]}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={cat.icon as any}
                  size={16}
                  color={isActive ? Colors.white : Colors.deliRed}
                />
                <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Category Note */}
      {currentCategory.note && (
        <View style={styles.noteContainer}>
          <Text style={styles.noteText}>{currentCategory.note}</Text>
        </View>
      )}

      {/* Items */}
      {currentCategory.key === 'catering' ? (
        <FlatList
          data={currentCategory.data}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item, index }) => (
            <View style={styles.cateringCard}>
              <View style={styles.cateringContent}>
                <Text style={styles.cateringName}>{item.name}</Text>
                {item.description && (
                  <Text style={styles.cateringDesc}>{item.description}</Text>
                )}
              </View>
              <TouchableOpacity
                onPress={() => router.push('/catering')}
                style={styles.cateringButton}
                activeOpacity={0.7}
              >
                <Text style={styles.cateringButtonText}>Inquire</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <FlatList
          data={currentCategory.data}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item, index }) => (
            <View style={index === 0 ? styles.cardFirst : undefined}>
              <MenuItemCard
                item={item}
                onAdd={handleAdd}
                showSeparator={index < currentCategory.data.length - 1}
              />
            </View>
          )}
          ListHeaderComponent={
            <View style={styles.cardTopRadius} />
          }
          ListFooterComponent={
            <View style={styles.cardBottomRadius} />
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.separator,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  tabContainer: {
    backgroundColor: Colors.cardBackground,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.separator,
  },
  tabScroll: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: Colors.background,
    gap: 6,
  },
  tabActive: {
    backgroundColor: Colors.deliRed,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.deliRed,
  },
  tabLabelActive: {
    color: Colors.white,
  },
  noteContainer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: 12,
    paddingBottom: 4,
  },
  noteText: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  listContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: 12,
    paddingBottom: 100,
  },
  cardFirst: {},
  cardTopRadius: {
    height: 10,
    backgroundColor: Colors.cardBackground,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardBottomRadius: {
    height: 10,
    backgroundColor: Colors.cardBackground,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  cateringCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cateringContent: {
    flex: 1,
  },
  cateringName: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  cateringDesc: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  cateringButton: {
    backgroundColor: Colors.deliRed,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginLeft: 12,
  },
  cateringButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
});
