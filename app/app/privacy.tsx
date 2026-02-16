import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors, Spacing } from '../src/constants/theme';

export default function PrivacyPolicyScreen() {
  const router = useRouter();

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
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.lastUpdated}>Last updated: February 2026</Text>

        <Text style={styles.sectionTitle}>Introduction</Text>
        <Text style={styles.body}>
          Lange's Little Store & Delicatessen ("we," "our," or "us") respects your
          privacy and is committed to protecting your personal data. This privacy
          policy explains how we collect, use, and protect information when you use
          our mobile application.
        </Text>

        <Text style={styles.sectionTitle}>Information We Collect</Text>
        <Text style={styles.body}>
          We may collect the following information:{'\n\n'}
          • Contact information (name, email, phone number) when you create an
          account or submit a catering inquiry{'\n'}
          • Order history and preferences{'\n'}
          • Device information for app functionality{'\n\n'}
          We do not collect location data, photos, or any information from your
          device beyond what is necessary for the app to function.
        </Text>

        <Text style={styles.sectionTitle}>How We Use Your Information</Text>
        <Text style={styles.body}>
          We use your information to:{'\n\n'}
          • Process and fulfill your orders{'\n'}
          • Respond to catering inquiries{'\n'}
          • Improve our app and services{'\n'}
          • Send order confirmations and updates
        </Text>

        <Text style={styles.sectionTitle}>Data Storage & Security</Text>
        <Text style={styles.body}>
          Your data is securely stored using industry-standard encryption. We use
          Firebase (operated by Google) for secure data storage and authentication.
          We do not sell or share your personal information with third parties for
          marketing purposes.
        </Text>

        <Text style={styles.sectionTitle}>Your Rights</Text>
        <Text style={styles.body}>
          You have the right to:{'\n\n'}
          • Access your personal data{'\n'}
          • Request deletion of your account and data{'\n'}
          • Opt out of communications{'\n\n'}
          To exercise these rights, contact us at (914) 238-3553 or visit us at 382
          King Street, Chappaqua, NY 10514.
        </Text>

        <Text style={styles.sectionTitle}>Contact Us</Text>
        <Text style={styles.body}>
          Lange's Little Store & Delicatessen{'\n'}
          382 King Street, Chappaqua, NY 10514{'\n'}
          Phone: (914) 238-3553{'\n'}
          Text: (914) 380-3532
        </Text>

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
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: Spacing.lg,
    paddingBottom: 40,
  },
  lastUpdated: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: 20,
    marginBottom: 8,
  },
  body: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  footer: {
    height: 40,
  },
});
