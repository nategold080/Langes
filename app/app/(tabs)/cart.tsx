import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Linking,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Colors, Spacing } from '../../src/constants/theme';
import { useCartStore } from '../../src/store/cartStore';
import { STORE_INFO } from '../../src/constants/store';

export default function CartScreen() {
  const cart = useCartStore((s) => s.cart);
  const cartNote = useCartStore((s) => s.cartNote);
  const orderConfirmation = useCartStore((s) => s.orderConfirmation);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const setCartNote = useCartStore((s) => s.setCartNote);
  const clearCart = useCartStore((s) => s.clearCart);
  const placeOrder = useCartStore((s) => s.placeOrder);
  const clearConfirmation = useCartStore((s) => s.clearConfirmation);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handlePlaceOrder = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    placeOrder();
  };

  const handleClearCart = () => {
    Alert.alert('Clear Order', 'Remove all items from your order?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear',
        style: 'destructive',
        onPress: () => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          clearCart();
        },
      },
    ]);
  };

  // Order confirmation view
  if (orderConfirmation) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Order Placed</Text>
        </View>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.confirmContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.confirmIcon}>
            <Ionicons name="checkmark-circle" size={64} color={Colors.success} />
          </View>
          <Text style={styles.confirmTitle}>Order Confirmed!</Text>
          <Text style={styles.confirmNumber}>{orderConfirmation.orderNumber}</Text>
          <Text style={styles.confirmHint}>
            Reference this number when you call or text
          </Text>

          <View style={styles.confirmCard}>
            {orderConfirmation.items.map((item) => (
              <View key={item.cartId} style={styles.confirmItem}>
                <Text style={styles.confirmItemQty}>{item.quantity}x</Text>
                <View style={styles.confirmItemContent}>
                  <Text style={styles.confirmItemName}>{item.name}</Text>
                  {item.description && (
                    <Text style={styles.confirmItemDesc} numberOfLines={1}>
                      {item.description}
                    </Text>
                  )}
                </View>
              </View>
            ))}
            {orderConfirmation.note ? (
              <View style={styles.confirmNote}>
                <Text style={styles.confirmNoteLabel}>Note:</Text>
                <Text style={styles.confirmNoteText}>{orderConfirmation.note}</Text>
              </View>
            ) : null}
          </View>

          <View style={styles.confirmActions}>
            <TouchableOpacity
              style={styles.confirmCallButton}
              onPress={() => Linking.openURL('tel:9142383553')}
              activeOpacity={0.8}
            >
              <Ionicons name="call" size={20} color={Colors.white} />
              <Text style={styles.confirmCallText}>Call to Order</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmTextButton}
              onPress={() => Linking.openURL('sms:9143803532')}
              activeOpacity={0.8}
            >
              <Ionicons name="chatbubble" size={20} color={Colors.deliRed} />
              <Text style={styles.confirmTextText}>Text to Order</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.confirmInfo}>
            Call or text us with your order number to confirm pickup time.
          </Text>

          <TouchableOpacity
            style={styles.newOrderButton}
            onPress={clearConfirmation}
            activeOpacity={0.7}
          >
            <Text style={styles.newOrderText}>Start New Order</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Empty cart
  if (cart.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Your Order</Text>
        </View>
        <View style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={64} color={Colors.textSecondary} />
          <Text style={styles.emptyTitle}>Your order is empty</Text>
          <Text style={styles.emptySubtitle}>
            Browse the menu or build a custom sandwich
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // Cart with items
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Your Order ({totalItems} {totalItems === 1 ? 'item' : 'items'})
        </Text>
        <TouchableOpacity onPress={handleClearCart} style={styles.clearButton} activeOpacity={0.7}>
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Cart Items */}
        <View style={styles.card}>
          {cart.map((item, i) => (
            <View key={item.cartId}>
              <View style={styles.cartRow}>
                <View style={styles.cartItemContent}>
                  <Text style={styles.cartItemName}>{item.name}</Text>
                  {item.description && (
                    <Text style={styles.cartItemDesc} numberOfLines={2}>
                      {item.description}
                    </Text>
                  )}
                </View>
                <View style={styles.quantityControls}>
                  <TouchableOpacity
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      updateQuantity(item.cartId, item.quantity - 1);
                    }}
                    style={styles.quantityButton}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name={item.quantity === 1 ? 'trash-outline' : 'remove-circle-outline'}
                      size={24}
                      color={item.quantity === 1 ? Colors.destructive : Colors.deliRed}
                    />
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      updateQuantity(item.cartId, item.quantity + 1);
                    }}
                    style={styles.quantityButton}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="add-circle-outline" size={24} color={Colors.deliRed} />
                  </TouchableOpacity>
                </View>
              </View>
              {i < cart.length - 1 && <View style={styles.separator} />}
            </View>
          ))}
        </View>

        {/* Special Instructions */}
        <Text style={styles.noteLabel}>Special Instructions</Text>
        <TextInput
          style={styles.noteInput}
          placeholder="Allergies, modifications, pickup time..."
          placeholderTextColor={Colors.textSecondary}
          value={cartNote}
          onChangeText={setCartNote}
          multiline
          numberOfLines={3}
          textAlignVertical="top"
        />

        {/* Allergy Warning */}
        <View style={styles.allergyWarning}>
          <Ionicons name="alert-circle" size={18} color={Colors.mustard} />
          <Text style={styles.allergyText}>
            Please inform us of any food allergies when placing your order.
          </Text>
        </View>

        {/* Place Order */}
        <TouchableOpacity
          style={styles.placeOrderButton}
          onPress={handlePlaceOrder}
          activeOpacity={0.8}
        >
          <Text style={styles.placeOrderText}>Place Order</Text>
        </TouchableOpacity>
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
    flex: 1,
    textAlign: 'center',
  },
  clearButton: {
    position: 'absolute',
    right: Spacing.lg,
  },
  clearText: {
    fontSize: 16,
    color: Colors.destructive,
    fontWeight: '500',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.lg,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cartRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  cartItemContent: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 17,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
  cartItemDesc: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginLeft: 12,
  },
  quantityButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.textPrimary,
    minWidth: 24,
    textAlign: 'center',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.separator,
    marginLeft: 16,
  },
  noteLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textTertiary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 24,
    marginBottom: 8,
  },
  noteInput: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: Colors.textPrimary,
    minHeight: 80,
  },
  allergyWarning: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginTop: 16,
    paddingHorizontal: 4,
  },
  allergyText: {
    fontSize: 13,
    color: Colors.textSecondary,
    flex: 1,
    lineHeight: 18,
  },
  placeOrderButton: {
    backgroundColor: Colors.deliRed,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  placeOrderText: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
  confirmContent: {
    padding: Spacing.lg,
    paddingBottom: 100,
    alignItems: 'center',
  },
  confirmIcon: {
    marginTop: 24,
  },
  confirmTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: 12,
  },
  confirmNumber: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.deliRed,
    marginTop: 8,
    letterSpacing: 1,
  },
  confirmHint: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  confirmCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 10,
    width: '100%',
    marginTop: 24,
    overflow: 'hidden',
  },
  confirmItem: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.separator,
  },
  confirmItemQty: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.deliRed,
    width: 32,
  },
  confirmItemContent: {
    flex: 1,
  },
  confirmItemName: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
  confirmItemDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  confirmNote: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  confirmNoteLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  confirmNoteText: {
    fontSize: 14,
    color: Colors.textPrimary,
    marginTop: 2,
  },
  confirmActions: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    marginTop: 24,
  },
  confirmCallButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.deliRed,
    borderRadius: 12,
    paddingVertical: 14,
    gap: 8,
  },
  confirmCallText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  confirmTextButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    paddingVertical: 14,
    gap: 8,
    borderWidth: 1.5,
    borderColor: Colors.deliRed,
  },
  confirmTextText: {
    color: Colors.deliRed,
    fontSize: 16,
    fontWeight: '600',
  },
  confirmInfo: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 20,
  },
  newOrderButton: {
    marginTop: 24,
    paddingVertical: 12,
  },
  newOrderText: {
    fontSize: 16,
    color: Colors.deliRed,
    fontWeight: '500',
  },
});
