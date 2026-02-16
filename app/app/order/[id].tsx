import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Share,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Colors, Spacing } from '../../src/constants/theme';
import { STORE_INFO } from '../../src/constants/store';
import { useOrderHistoryStore } from '../../src/store/orderHistoryStore';

export default function OrderDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const orders = useOrderHistoryStore((s) => s.orders);
  const order = orders.find((o) => o.orderNumber === id);

  const buildOrderText = () => {
    if (!order) return `Order ${id}`;
    const lines = order.items.map((item) => `- ${item.quantity}x ${item.name}`);
    let text = `Order ${order.orderNumber}:\n${lines.join('\n')}`;
    if (order.note) text += `\nNote: ${order.note}`;
    return text;
  };

  const handleShare = async () => {
    try {
      await Share.share({ message: buildOrderText() });
    } catch {}
  };

  const handleTextOrder = () => {
    const body = encodeURIComponent(buildOrderText());
    const separator = Platform.OS === 'ios' ? '&' : '?';
    Linking.openURL(`sms:9143803532${separator}body=${body}`);
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.headerLeft}
          activeOpacity={0.7}
          accessibilityLabel="Close"
          accessibilityRole="button"
        >
          <Ionicons name="close" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Details</Text>
        <TouchableOpacity
          onPress={handleShare}
          style={styles.headerRight}
          activeOpacity={0.7}
          accessibilityLabel="Share order"
          accessibilityRole="button"
        >
          <Ionicons name="share-outline" size={22} color={Colors.deliRed} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.orderHeader}>
          <Ionicons name="receipt-outline" size={48} color={Colors.deliRed} />
          <Text style={styles.orderNumber}>{id}</Text>
          {order && (
            <Text style={styles.orderDate}>{formatDate(order.timestamp)}</Text>
          )}
        </View>

        {order ? (
          <>
            <View style={styles.card}>
              {order.items.map((item, i) => (
                <View key={item.cartId}>
                  <View style={styles.itemRow}>
                    <Text style={styles.itemQty}>{item.quantity}x</Text>
                    <View style={styles.itemContent}>
                      <Text style={styles.itemName}>{item.name}</Text>
                      {item.description && (
                        <Text style={styles.itemDesc} numberOfLines={2}>
                          {item.description}
                        </Text>
                      )}
                    </View>
                  </View>
                  {i < order.items.length - 1 && <View style={styles.separator} />}
                </View>
              ))}
              {order.note ? (
                <>
                  <View style={styles.separator} />
                  <View style={styles.noteRow}>
                    <Text style={styles.noteLabel}>Note:</Text>
                    <Text style={styles.noteText}>{order.note}</Text>
                  </View>
                </>
              ) : null}
            </View>

            <Text style={styles.helpText}>
              Call or text us to reorder or ask about this order.
            </Text>
          </>
        ) : (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Order Details</Text>
            <Text style={styles.cardBody}>
              Call or text us with your order number to check status or reorder.
            </Text>
          </View>
        )}

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.callButton}
            onPress={() => Linking.openURL('tel:9142383553')}
            activeOpacity={0.8}
            accessibilityLabel="Call to order"
            accessibilityRole="button"
          >
            <Ionicons name="call" size={20} color={Colors.white} />
            <Text style={styles.callButtonText}>Call {STORE_INFO.phone}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.textButton}
            onPress={handleTextOrder}
            activeOpacity={0.8}
            accessibilityLabel="Text to order"
            accessibilityRole="button"
          >
            <Ionicons name="chatbubble" size={20} color={Colors.deliRed} />
            <Text style={styles.textButtonText}>Text {STORE_INFO.text}</Text>
          </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.separator,
    paddingHorizontal: Spacing.lg,
  },
  headerLeft: {
    width: 44,
    height: 44,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  headerRight: {
    width: 44,
    height: 44,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.lg,
    paddingBottom: 40,
  },
  orderHeader: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  orderNumber: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.deliRed,
    marginTop: 12,
    letterSpacing: 1,
  },
  orderDate: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  card: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.textPrimary,
    padding: 16,
    paddingBottom: 4,
  },
  cardBody: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 22,
    padding: 16,
    paddingTop: 4,
  },
  itemRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  itemQty: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.deliRed,
    width: 32,
  },
  itemContent: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
  itemDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.separator,
    marginLeft: 16,
  },
  noteRow: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  noteLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  noteText: {
    fontSize: 14,
    color: Colors.textPrimary,
    marginTop: 2,
  },
  helpText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 16,
  },
  actions: {
    gap: 12,
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.deliRed,
    borderRadius: 12,
    paddingVertical: 16,
    gap: 8,
  },
  callButtonText: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: '600',
  },
  textButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    paddingVertical: 16,
    gap: 8,
    borderWidth: 1.5,
    borderColor: Colors.deliRed,
  },
  textButtonText: {
    color: Colors.deliRed,
    fontSize: 17,
    fontWeight: '600',
  },
});
