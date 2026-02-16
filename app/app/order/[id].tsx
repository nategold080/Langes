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

export default function OrderDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const handleShare = async () => {
    try {
      await Share.share({
        message: `My order at Lange's Deli: ${id}`,
      });
    } catch {}
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.headerLeft}
          activeOpacity={0.7}
        >
          <Ionicons name="close" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Details</Text>
        <TouchableOpacity
          onPress={handleShare}
          style={styles.headerRight}
          activeOpacity={0.7}
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
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>Pending</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>What's next?</Text>
          <Text style={styles.cardBody}>
            Call or text us with your order number to confirm and arrange pickup.
          </Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.callButton}
            onPress={() => Linking.openURL('tel:9142383553')}
            activeOpacity={0.8}
          >
            <Ionicons name="call" size={20} color={Colors.white} />
            <Text style={styles.callButtonText}>Call {STORE_INFO.phone}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.textButton}
            onPress={() => Linking.openURL('sms:9143803532')}
            activeOpacity={0.8}
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
    paddingVertical: 32,
  },
  orderNumber: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.deliRed,
    marginTop: 12,
    letterSpacing: 1,
  },
  statusBadge: {
    backgroundColor: Colors.mustard,
    borderRadius: 9999,
    paddingHorizontal: 14,
    paddingVertical: 5,
    marginTop: 10,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.white,
  },
  card: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  cardBody: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 22,
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
