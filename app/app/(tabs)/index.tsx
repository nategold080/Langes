import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Colors, Spacing } from '../../src/constants/theme';
import { STORE_INFO, STORE_HOURS, KNOWN_FOR_ITEMS } from '../../src/constants/store';
import { HOT_FOODS } from '../../src/constants/menu';
import { useCartStore } from '../../src/store/cartStore';
import { StoreStatusBadge } from '../../src/components/StoreStatusBadge';
import { SectionHeader } from '../../src/components/SectionHeader';

export default function HomeScreen() {
  const router = useRouter();
  const addToCart = useCartStore((s) => s.addToCart);
  const hotFoodPreview = HOT_FOODS.slice(0, 6);
  const now = new Date();
  const day = now.getDay();
  const hours = STORE_HOURS[day];

  const handleCall = () => {
    Linking.openURL('tel:9142383553');
  };

  const handleText = () => {
    Linking.openURL('sms:9143803532');
  };

  const handleAddHotFood = (item: { id: string; name: string }) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    addToCart({ id: item.id, name: item.name, type: 'hotFood' });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Lange's</Text>
        <TouchableOpacity
          onPress={() => router.push('/(tabs)/cart')}
          style={styles.headerButton}
          activeOpacity={0.7}
        >
          <Ionicons name="cart-outline" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Lange's Little Store</Text>
          <Text style={styles.heroSubtitle}>& Delicatessen</Text>
          <Text style={styles.heroTagline}>{STORE_INFO.tagline}</Text>
          <View style={styles.heroStatusRow}>
            <StoreStatusBadge />
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => router.push('/(tabs)/menu')}
            activeOpacity={0.7}
          >
            <Ionicons name="restaurant" size={22} color={Colors.deliRed} />
            <Text style={styles.quickActionLabel}>Order</Text>
          </TouchableOpacity>
          <View style={styles.quickActionDivider} />
          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => router.push('/(tabs)/builder')}
            activeOpacity={0.7}
          >
            <Ionicons name="fast-food" size={22} color={Colors.deliRed} />
            <Text style={styles.quickActionLabel}>Build</Text>
          </TouchableOpacity>
          <View style={styles.quickActionDivider} />
          <TouchableOpacity
            style={styles.quickAction}
            onPress={handleCall}
            activeOpacity={0.7}
          >
            <Ionicons name="call" size={22} color={Colors.deliRed} />
            <Text style={styles.quickActionLabel}>Call</Text>
          </TouchableOpacity>
        </View>

        {/* Known For */}
        <SectionHeader title="What We're Known For" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.knownForScroll}
        >
          {KNOWN_FOR_ITEMS.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={styles.knownForCard}
              onPress={() => router.push('/(tabs)/menu')}
              activeOpacity={0.7}
            >
              <Text style={styles.knownForEmoji}>{'\u2B50'}</Text>
              <Text style={styles.knownForName} numberOfLines={2}>
                {item.name}
              </Text>
              <Text style={styles.knownForCategory}>{item.category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Today's Hot Foods */}
        <SectionHeader title={'\uD83D\uDD25 Today\'s Hot Foods'} />
        <Text style={styles.hotFoodsNote}>
          Selections change daily — here's what we offer
        </Text>
        <View style={styles.card}>
          {hotFoodPreview.map((item, i) => (
            <View key={item.id}>
              <View style={styles.hotFoodRow}>
                <Text style={styles.hotFoodName}>{item.name}</Text>
                <TouchableOpacity
                  onPress={() => handleAddHotFood(item)}
                  style={styles.addButton}
                  activeOpacity={0.7}
                >
                  <Ionicons name="add-circle" size={24} color={Colors.deliRed} />
                </TouchableOpacity>
              </View>
              {i < hotFoodPreview.length - 1 && <View style={styles.separator} />}
            </View>
          ))}
        </View>
        <TouchableOpacity
          onPress={() => router.push('/(tabs)/menu')}
          style={styles.seeFullMenu}
          activeOpacity={0.7}
        >
          <Text style={styles.seeFullMenuText}>See Full Menu →</Text>
        </TouchableOpacity>

        {/* Visit Us */}
        <SectionHeader title="Visit Us" />
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.infoRow}
            onPress={() =>
              Linking.openURL(
                'maps:?address=382+King+Street+Chappaqua+NY+10514'
              )
            }
            activeOpacity={0.7}
          >
            <Ionicons name="location-outline" size={20} color={Colors.deliRed} />
            <Text style={styles.infoText}>{STORE_INFO.address}</Text>
            <Ionicons name="chevron-forward" size={16} color={Colors.textSecondary} />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity
            style={styles.infoRow}
            onPress={handleCall}
            activeOpacity={0.7}
          >
            <Ionicons name="call-outline" size={20} color={Colors.deliRed} />
            <Text style={styles.infoText}>{STORE_INFO.phone}</Text>
            <Ionicons name="chevron-forward" size={16} color={Colors.textSecondary} />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity
            style={styles.infoRow}
            onPress={handleText}
            activeOpacity={0.7}
          >
            <Ionicons name="chatbubble-outline" size={20} color={Colors.deliRed} />
            <Text style={styles.infoText}>Text: {STORE_INFO.text}</Text>
            <Ionicons name="chevron-forward" size={16} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Hours */}
        <SectionHeader title="Store Hours" />
        <View style={styles.card}>
          {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(
            (dayName, i) => {
              const h = STORE_HOURS[i];
              const isToday = i === day;
              return (
                <View key={dayName}>
                  <View style={styles.hoursRow}>
                    <Text
                      style={[
                        styles.hoursDay,
                        isToday && styles.hoursDayActive,
                      ]}
                    >
                      {dayName}
                    </Text>
                    <Text
                      style={[
                        styles.hoursTime,
                        isToday && styles.hoursTimeActive,
                      ]}
                    >
                      {h.open} – {h.close}
                    </Text>
                  </View>
                  {i < 6 && <View style={styles.separator} />}
                </View>
              );
            }
          )}
        </View>

        <View style={styles.footer} />
      </ScrollView>
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
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.separator,
  },
  headerTitle: {
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.deliRed,
  },
  headerButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  hero: {
    backgroundColor: Colors.deliRed,
    paddingHorizontal: 32,
    paddingTop: 40,
    paddingBottom: 40,
    alignItems: 'center',
  },
  heroTitle: {
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.white,
  },
  heroSubtitle: {
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    fontSize: 20,
    fontStyle: 'italic',
    color: Colors.white,
    marginTop: 2,
  },
  heroTagline: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 6,
  },
  heroStatusRow: {
    marginTop: 12,
  },
  quickActions: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 10,
    marginHorizontal: Spacing.lg,
    marginTop: -20,
    flexDirection: 'row',
    alignItems: 'stretch',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
    zIndex: 1,
  },
  quickAction: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  quickActionLabel: {
    fontSize: 13,
    color: Colors.deliRed,
    marginTop: 4,
    fontWeight: '500',
  },
  quickActionDivider: {
    width: 0.5,
    backgroundColor: Colors.separator,
    alignSelf: 'stretch',
  },
  knownForScroll: {
    paddingHorizontal: Spacing.lg,
    gap: 10,
  },
  knownForCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 10,
    width: 130,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  knownForEmoji: {
    fontSize: 16,
  },
  knownForName: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 6,
    lineHeight: 20,
  },
  knownForCategory: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  hotFoodsNote: {
    fontSize: 13,
    color: Colors.textSecondary,
    paddingHorizontal: Spacing.lg,
    paddingBottom: 10,
  },
  card: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 10,
    marginHorizontal: Spacing.lg,
    overflow: 'hidden',
  },
  hotFoodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: Spacing.lg,
    minHeight: 44,
  },
  hotFoodName: {
    fontSize: 17,
    color: Colors.textPrimary,
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
    marginLeft: Spacing.lg,
  },
  seeFullMenu: {
    alignItems: 'center',
    paddingVertical: 14,
  },
  seeFullMenuText: {
    fontSize: 15,
    color: Colors.deliRed,
    fontWeight: '500',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: 12,
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  hoursRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: 10,
  },
  hoursDay: {
    fontSize: 16,
    color: Colors.textPrimary,
  },
  hoursDayActive: {
    fontWeight: '600',
    color: Colors.deliRed,
  },
  hoursTime: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  hoursTimeActive: {
    color: Colors.deliRed,
    fontWeight: '600',
  },
  footer: {
    height: 40,
  },
});
