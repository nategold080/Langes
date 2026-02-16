import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors, Spacing } from '../../src/constants/theme';
import { STORE_INFO, STORE_HOURS } from '../../src/constants/store';
import { useStoreStatus } from '../../src/hooks/useStoreStatus';
import { useOrderHistoryStore } from '../../src/store/orderHistoryStore';

export default function ProfileScreen() {
  const router = useRouter();
  const { isOpen, statusText } = useStoreStatus();
  const orders = useOrderHistoryStore((s) => s.orders);
  const clearHistory = useOrderHistoryStore((s) => s.clearHistory);
  const recentOrders = orders.slice(0, 5);
  const now = new Date();
  const day = now.getDay();

  const formatRelativeTime = (timestamp: string): string => {
    const date = new Date(timestamp);
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleClearHistory = () => {
    Alert.alert(
      'Clear Order History',
      'This will permanently delete all your order history.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear History',
          style: 'destructive',
          onPress: clearHistory,
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>More</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Store Card */}
        <View style={styles.storeCard}>
          <View style={styles.storeCardContent}>
            <Text style={styles.storeName}>{STORE_INFO.shortName}</Text>
            <Text style={styles.storeTagline}>{STORE_INFO.tagline}</Text>
            <View style={[styles.statusBadge, { backgroundColor: isOpen ? Colors.success : Colors.textSecondary }]}>
              <Text style={styles.statusText}>{statusText}</Text>
            </View>
          </View>
        </View>

        {/* Contact */}
        <Text style={styles.sectionLabel}>Contact</Text>
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.row}
            onPress={() => Linking.openURL('tel:9142383553')}
            activeOpacity={0.7}
            accessibilityRole="link"
          >
            <Ionicons name="call-outline" size={22} color={Colors.deliRed} />
            <View style={styles.rowContent}>
              <Text style={styles.rowTitle}>Call</Text>
              <Text style={styles.rowSubtitle}>{STORE_INFO.phone}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity
            style={styles.row}
            onPress={() => Linking.openURL('sms:9143803532')}
            activeOpacity={0.7}
            accessibilityRole="link"
          >
            <Ionicons name="chatbubble-outline" size={22} color={Colors.deliRed} />
            <View style={styles.rowContent}>
              <Text style={styles.rowTitle}>Text</Text>
              <Text style={styles.rowSubtitle}>{STORE_INFO.text}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity
            style={styles.row}
            onPress={() => Linking.openURL(`https://${STORE_INFO.website}`)}
            activeOpacity={0.7}
            accessibilityRole="link"
          >
            <Ionicons name="globe-outline" size={22} color={Colors.deliRed} />
            <View style={styles.rowContent}>
              <Text style={styles.rowTitle}>Website</Text>
              <Text style={styles.rowSubtitle}>{STORE_INFO.website}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity
            style={styles.row}
            onPress={() => Linking.openURL('https://instagram.com/langes10514')}
            activeOpacity={0.7}
            accessibilityRole="link"
          >
            <Ionicons name="logo-instagram" size={22} color={Colors.deliRed} />
            <View style={styles.rowContent}>
              <Text style={styles.rowTitle}>Instagram</Text>
              <Text style={styles.rowSubtitle}>{STORE_INFO.instagram}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Location */}
        <Text style={styles.sectionLabel}>Location</Text>
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.row}
            onPress={() => Linking.openURL('maps:?address=382+King+Street+Chappaqua+NY+10514')}
            activeOpacity={0.7}
            accessibilityRole="link"
          >
            <Ionicons name="location-outline" size={22} color={Colors.deliRed} />
            <View style={styles.rowContent}>
              <Text style={styles.rowTitle}>Get Directions</Text>
              <Text style={styles.rowSubtitle}>{STORE_INFO.address}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Catering */}
        <Text style={styles.sectionLabel}>Services</Text>
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.row}
            onPress={() => router.push('/catering')}
            activeOpacity={0.7}
          >
            <Ionicons name="gift-outline" size={22} color={Colors.deliRed} />
            <View style={styles.rowContent}>
              <Text style={styles.rowTitle}>Catering Inquiry</Text>
              <Text style={styles.rowSubtitle}>Plan your event with us</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Order History */}
        <Text style={styles.sectionLabel}>Order History</Text>
        <View style={styles.card}>
          {recentOrders.length === 0 ? (
            <View style={styles.emptyHistory}>
              <Text style={styles.emptyHistoryText}>No recent orders</Text>
            </View>
          ) : (
            <>
              {recentOrders.map((order, i) => (
                <View key={order.id}>
                  <TouchableOpacity
                    style={styles.orderHistoryRow}
                    onPress={() => router.push(`/order/${order.orderNumber}`)}
                    activeOpacity={0.7}
                    accessibilityLabel={order.orderNumber + ", " + order.itemCount + " items"}
                    accessibilityRole="button"
                  >
                    <Ionicons name="receipt-outline" size={22} color={Colors.deliRed} />
                    <View style={styles.rowContent}>
                      <Text style={styles.orderNumber}>{order.orderNumber}</Text>
                      <Text style={styles.rowSubtitle}>
                        {order.itemCount} {order.itemCount === 1 ? 'item' : 'items'} · {formatRelativeTime(order.timestamp)}
                      </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} />
                  </TouchableOpacity>
                  {i < recentOrders.length - 1 && <View style={styles.separator} />}
                </View>
              ))}
              <View style={styles.separator} />
              <TouchableOpacity
                style={styles.clearHistoryRow}
                onPress={handleClearHistory}
                activeOpacity={0.7}
                accessibilityLabel="Clear order history"
                accessibilityRole="button"
              >
                <Ionicons name="trash-outline" size={18} color={Colors.destructive} />
                <Text style={styles.clearHistoryText}>Clear History</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Account */}
        <Text style={styles.sectionLabel}>Account</Text>
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.row}
            onPress={() => router.push('/(auth)/login')}
            activeOpacity={0.7}
            accessibilityLabel="Sign in or create account"
            accessibilityRole="button"
          >
            <Ionicons name="person-outline" size={22} color={Colors.deliRed} />
            <View style={styles.rowContent}>
              <Text style={styles.rowTitle}>Sign In / Create Account</Text>
              <Text style={styles.rowSubtitle}>Save orders and preferences</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity
            style={styles.row}
            onPress={() => router.push('/privacy')}
            activeOpacity={0.7}
            accessibilityLabel="View privacy policy"
            accessibilityRole="link"
          >
            <Ionicons name="shield-checkmark-outline" size={22} color={Colors.deliRed} />
            <View style={styles.rowContent}>
              <Text style={styles.rowTitle}>Privacy Policy</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Hours */}
        <Text style={styles.sectionLabel}>Store Hours</Text>
        <View style={styles.card}>
          {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(
            (dayName, i) => {
              const h = STORE_HOURS[i];
              const isToday = i === day;
              return (
                <View key={dayName}>
                  <View style={styles.hoursRow}>
                    <Text style={[styles.hoursDay, isToday && styles.hoursDayActive]}>
                      {dayName}
                    </Text>
                    <Text style={[styles.hoursTime, isToday && styles.hoursTimeActive]}>
                      {h.open} – {h.close}
                    </Text>
                  </View>
                  {i < 6 && <View style={styles.separator} />}
                </View>
              );
            }
          )}
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appInfoText}>Lange's Little Store & Delicatessen</Text>
          <Text style={styles.appInfoText}>Since 1965 · Chappaqua, NY</Text>
          <Text style={styles.appInfoVersion}>Version 1.0.0</Text>
        </View>
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
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  storeCard: {
    backgroundColor: Colors.deliRed,
    margin: Spacing.lg,
    borderRadius: 12,
    padding: 20,
  },
  storeCardContent: {
    alignItems: 'center',
  },
  storeName: {
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
  },
  storeTagline: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
  },
  statusBadge: {
    borderRadius: 9999,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginTop: 10,
  },
  statusText: {
    fontSize: 13,
    color: Colors.white,
    fontWeight: '500',
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textTertiary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingHorizontal: Spacing.lg,
    paddingTop: 20,
    paddingBottom: 8,
  },
  card: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 10,
    marginHorizontal: Spacing.lg,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  rowContent: {
    flex: 1,
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
  rowSubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.separator,
    marginLeft: 50,
  },
  orderHistoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  emptyHistory: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  emptyHistoryText: {
    fontSize: 15,
    color: Colors.textSecondary,
  },
  clearHistoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 6,
  },
  clearHistoryText: {
    fontSize: 15,
    color: Colors.destructive,
    fontWeight: '500',
  },
  hoursRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
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
  appInfo: {
    alignItems: 'center',
    padding: 24,
    marginTop: 8,
  },
  appInfoText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  appInfoVersion: {
    fontSize: 12,
    color: Colors.textTertiary,
    marginTop: 4,
  },
});
