import React, { useState, useRef, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Colors, Spacing } from '../../src/constants/theme';
import { MENU_CATEGORIES } from '../../src/constants/menu';
import { useCartStore } from '../../src/store/cartStore';
import { useFavoritesStore } from '../../src/store/favoritesStore';
import { MenuItem } from '../../src/types';

export default function MenuScreen() {
  const router = useRouter();
  const addToCart = useCartStore((s) => s.addToCart);
  const favorites = useFavoritesStore((s) => s.favorites);
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);
  const [activeCategory, setActiveCategory] = useState(MENU_CATEGORIES[0].key);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const tabScrollRef = useRef<ScrollView>(null);
  const searchInputRef = useRef<TextInput>(null);

  const currentCategory = MENU_CATEGORIES.find((c) => c.key === activeCategory) ?? MENU_CATEGORIES[0];

  // Search across all categories
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    const results: { item: MenuItem; categoryLabel: string; categoryKey: string }[] = [];
    for (const cat of MENU_CATEGORIES) {
      if (cat.key === 'catering') continue;
      for (const item of cat.data) {
        if (
          item.name.toLowerCase().includes(query) ||
          item.description?.toLowerCase().includes(query)
        ) {
          results.push({ item, categoryLabel: cat.label, categoryKey: cat.key });
        }
      }
    }
    return results;
  }, [searchQuery]);

  // Favorite items from all categories
  const favoriteItems = useMemo(() => {
    if (favorites.length === 0) return [];
    const items: { item: MenuItem; categoryKey: string }[] = [];
    for (const cat of MENU_CATEGORIES) {
      if (cat.key === 'catering') continue;
      for (const item of cat.data) {
        if (favorites.includes(item.id)) {
          items.push({ item, categoryKey: cat.key });
        }
      }
    }
    return items;
  }, [favorites]);

  const handleAdd = useCallback((item: MenuItem, type: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    addToCart({
      id: item.id,
      name: item.name,
      description: item.description,
      type,
    });
  }, [addToCart]);

  const handleToggleFavorite = useCallback((itemId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    toggleFavorite(itemId);
  }, [toggleFavorite]);

  const renderMenuItem = useCallback(({ item, categoryKey, showSeparator = true }: {
    item: MenuItem;
    categoryKey: string;
    showSeparator?: boolean;
  }) => {
    const isFav = favorites.includes(item.id);
    return (
      <View>
        <View style={styles.itemRow}>
          <TouchableOpacity
            onPress={() => handleToggleFavorite(item.id)}
            style={styles.heartButton}
            activeOpacity={0.7}
            accessibilityLabel={isFav ? `Remove ${item.name} from favorites` : `Add ${item.name} to favorites`}
            accessibilityRole="button"
          >
            <Ionicons
              name={isFav ? 'heart' : 'heart-outline'}
              size={20}
              color={isFav ? Colors.deliRed : Colors.textSecondary}
            />
          </TouchableOpacity>
          <View style={styles.itemContent}>
            <View style={styles.nameRow}>
              <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
              {item.popular && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularText}>Popular</Text>
                </View>
              )}
            </View>
            {item.description && (
              <Text style={styles.itemDescription} numberOfLines={2}>{item.description}</Text>
            )}
          </View>
          <TouchableOpacity
            onPress={() => handleAdd(item, categoryKey)}
            style={styles.addButton}
            activeOpacity={0.7}
            accessibilityLabel={`Add ${item.name} to order`}
            accessibilityRole="button"
          >
            <Ionicons name="add-circle" size={26} color={Colors.deliRed} />
          </TouchableOpacity>
        </View>
        {showSeparator && <View style={styles.separator} />}
      </View>
    );
  }, [favorites, handleAdd, handleToggleFavorite]);

  const renderSearchResults = () => (
    <FlatList
      data={searchResults}
      keyExtractor={(r) => `${r.categoryKey}-${r.item.id}`}
      contentContainerStyle={styles.listContent}
      keyboardShouldPersistTaps="handled"
      ListEmptyComponent={
        <View style={styles.emptySearch}>
          <Ionicons name="search-outline" size={48} color={Colors.textSecondary} />
          <Text style={styles.emptySearchTitle}>No results found</Text>
          <Text style={styles.emptySearchSubtitle}>Try a different search term</Text>
        </View>
      }
      renderItem={({ item: result, index }) => (
        <View>
          {index === 0 || searchResults[index - 1].categoryLabel !== result.categoryLabel ? (
            <Text style={styles.searchCategoryLabel}>{result.categoryLabel}</Text>
          ) : null}
          <View style={styles.searchCard}>
            {renderMenuItem({
              item: result.item,
              categoryKey: result.categoryKey,
              showSeparator: false,
            })}
          </View>
        </View>
      )}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header with Search */}
      <View style={styles.header}>
        {isSearching ? (
          <View style={styles.searchBar}>
            <Ionicons name="search" size={18} color={Colors.textSecondary} />
            <TextInput
              ref={searchInputRef}
              style={styles.searchInput}
              placeholder="Search menu..."
              placeholderTextColor={Colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
              returnKeyType="search"
              autoCorrect={false}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')} activeOpacity={0.7}>
                <Ionicons name="close-circle" size={18} color={Colors.textSecondary} />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => {
                setIsSearching(false);
                setSearchQuery('');
              }}
              style={styles.cancelButton}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text style={styles.headerTitle}>Menu</Text>
            <TouchableOpacity
              onPress={() => setIsSearching(true)}
              style={styles.searchIcon}
              activeOpacity={0.7}
              accessibilityLabel="Search menu"
              accessibilityRole="button"
            >
              <Ionicons name="search" size={22} color={Colors.textPrimary} />
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Search Results Mode */}
      {isSearching && searchQuery.trim().length > 0 ? (
        renderSearchResults()
      ) : isSearching ? (
        <View style={styles.searchPrompt}>
          <Text style={styles.searchPromptText}>Search for any menu item</Text>
        </View>
      ) : (
        <>
          {/* Category Tabs */}
          <View style={styles.tabContainer}>
            <ScrollView
              ref={tabScrollRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.tabScroll}
            >
              {favoriteItems.length > 0 && (
                <TouchableOpacity
                  onPress={() => setActiveCategory('favorites')}
                  style={[styles.tab, activeCategory === 'favorites' && styles.tabActive]}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name="heart"
                    size={16}
                    color={activeCategory === 'favorites' ? Colors.white : Colors.deliRed}
                  />
                  <Text style={[styles.tabLabel, activeCategory === 'favorites' && styles.tabLabelActive]}>
                    Favorites
                  </Text>
                </TouchableOpacity>
              )}
              {MENU_CATEGORIES.map((cat) => {
                const isActive = cat.key === activeCategory;
                return (
                  <TouchableOpacity
                    key={cat.key}
                    onPress={() => setActiveCategory(cat.key)}
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
          {activeCategory !== 'favorites' && currentCategory.note && (
            <View style={styles.noteContainer}>
              <Text style={styles.noteText}>{currentCategory.note}</Text>
            </View>
          )}

          {/* Favorites View */}
          {activeCategory === 'favorites' ? (
            <FlatList
              data={favoriteItems}
              keyExtractor={(r) => r.item.id}
              contentContainerStyle={styles.listContent}
              ListHeaderComponent={<View style={styles.cardTopRadius} />}
              ListFooterComponent={<View style={styles.cardBottomRadius} />}
              renderItem={({ item: fav, index }) =>
                renderMenuItem({
                  item: fav.item,
                  categoryKey: fav.categoryKey,
                  showSeparator: index < favoriteItems.length - 1,
                })
              }
            />
          ) : currentCategory.key === 'catering' ? (
            <FlatList
              data={currentCategory.data}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContent}
              renderItem={({ item }) => (
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
              ListHeaderComponent={<View style={styles.cardTopRadius} />}
              ListFooterComponent={<View style={styles.cardBottomRadius} />}
              renderItem={({ item, index }) =>
                renderMenuItem({
                  item,
                  categoryKey: activeCategory,
                  showSeparator: index < currentCategory.data.length - 1,
                })
              }
            />
          )}
        </>
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
    paddingHorizontal: Spacing.lg,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  searchIcon: {
    position: 'absolute',
    right: Spacing.lg,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.iosGray,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 36,
    gap: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.textPrimary,
    padding: 0,
  },
  cancelButton: {
    paddingLeft: 10,
  },
  cancelText: {
    fontSize: 16,
    color: Colors.deliRed,
    fontWeight: '500',
  },
  searchPrompt: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
  },
  searchPromptText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  emptySearch: {
    alignItems: 'center',
    paddingTop: 60,
  },
  emptySearchTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginTop: 12,
  },
  emptySearchSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  searchCategoryLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textTertiary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingTop: 16,
    paddingBottom: 8,
  },
  searchCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 2,
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
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    paddingLeft: 8,
    minHeight: 50,
  },
  heartButton: {
    width: 36,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContent: {
    flex: 1,
    paddingVertical: 10,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  itemName: {
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
  itemDescription: {
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
    marginLeft: 44,
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
