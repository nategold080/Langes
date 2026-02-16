import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Colors, Spacing } from '../src/constants/theme';
import { CATERING_CATEGORIES } from '../src/constants/menu';
import { useCateringStore } from '../src/store/cateringStore';

export default function CateringScreen() {
  const router = useRouter();
  const { form, submitted, updateForm, toggleCategory, resetForm, submitForm } =
    useCateringStore();

  const buildInquiryText = () => {
    const selectedCategories = CATERING_CATEGORIES
      .filter((cat) => form.categories.includes(cat.id))
      .map((cat) => cat.name)
      .join(', ');

    let text = `Catering Inquiry from ${form.name}\n`;
    text += `Date: ${form.date || 'TBD'}\n`;
    text += `Guests: ${form.guests || 'TBD'}\n`;
    text += `Categories: ${selectedCategories}\n`;
    if (form.dietary) text += `Dietary: ${form.dietary}\n`;
    if (form.notes) text += `Notes: ${form.notes}\n`;
    text += `Phone: ${form.phone}\n`;
    text += `Email: ${form.email}`;
    return text;
  };

  const handleSubmit = () => {
    if (!form.name || !form.phone || !form.email) {
      Alert.alert('Missing Info', 'Please fill in your name, phone, and email.');
      return;
    }
    if (form.categories.length === 0) {
      Alert.alert('Select Categories', 'Please select at least one catering category.');
      return;
    }
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    const inquiryText = buildInquiryText();

    Alert.alert(
      'Send Inquiry',
      'How would you like to send your catering inquiry?',
      [
        {
          text: 'Text',
          onPress: () => {
            const separator = Platform.OS === 'ios' ? '&' : '?';
            const encoded = encodeURIComponent(inquiryText);
            Linking.openURL(`sms:9143803532${separator}body=${encoded}`);
            submitForm();
          },
        },
        {
          text: 'Email',
          onPress: () => {
            const subject = encodeURIComponent(`Catering Inquiry - ${form.name}`);
            const body = encodeURIComponent(inquiryText);
            Linking.openURL(`mailto:?subject=${subject}&body=${body}`);
            submitForm();
          },
        },
        {
          text: 'Call',
          onPress: () => {
            Alert.alert(
              'Your Inquiry',
              `${inquiryText}\n\nReference this info on the call.`,
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Call Now', onPress: () => Linking.openURL('tel:9142383553') },
              ]
            );
            submitForm();
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleDone = () => {
    resetForm();
    router.back();
  };

  if (submitted) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View style={styles.headerLeft} />
          <Text style={styles.headerTitle}>Catering</Text>
          <TouchableOpacity onPress={handleDone} style={styles.headerRight} activeOpacity={0.7}>
            <Text style={styles.doneText}>Done</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.successContainer}>
          <Ionicons name="checkmark-circle" size={64} color={Colors.success} />
          <Text style={styles.successTitle}>Inquiry Submitted!</Text>
          <Text style={styles.successText}>
            We'll get back to you soon to discuss your event. You can also call us
            directly for immediate assistance.
          </Text>
          <TouchableOpacity style={styles.successButton} onPress={handleDone} activeOpacity={0.8}>
            <Text style={styles.successButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

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
        <Text style={styles.headerTitle}>Catering Inquiry</Text>
        <View style={styles.headerRight} />
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Event Details */}
          <Text style={styles.sectionLabel}>Event Details</Text>
          <View style={styles.card}>
            <View style={styles.inputRow}>
              <Text style={styles.inputLabel}>Date</Text>
              <TextInput
                style={styles.inputValue}
                placeholder="Event date"
                placeholderTextColor={Colors.textSecondary}
                value={form.date}
                onChangeText={(v) => updateForm({ date: v })}
              />
            </View>
            <View style={styles.inputSeparator} />
            <View style={styles.inputRow}>
              <Text style={styles.inputLabel}>Guests</Text>
              <TextInput
                style={styles.inputValue}
                placeholder="Number of guests"
                placeholderTextColor={Colors.textSecondary}
                value={form.guests}
                onChangeText={(v) => updateForm({ guests: v })}
                keyboardType="number-pad"
              />
            </View>
          </View>

          {/* Categories */}
          <Text style={styles.sectionLabel}>Categories</Text>
          <View style={styles.card}>
            {CATERING_CATEGORIES.map((cat, i) => {
              const selected = form.categories.includes(cat.id);
              return (
                <View key={cat.id}>
                  <TouchableOpacity
                    style={styles.categoryRow}
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      toggleCategory(cat.id);
                    }}
                    activeOpacity={0.7}
                    accessibilityLabel={cat.name + (selected ? ", selected" : "")}
                    accessibilityRole="checkbox"
                    accessibilityState={{checked: selected}}
                  >
                    <View style={styles.categoryContent}>
                      <Text style={styles.categoryName}>{cat.name}</Text>
                      {cat.description && (
                        <Text style={styles.categoryDesc}>{cat.description}</Text>
                      )}
                    </View>
                    <Ionicons
                      name={selected ? 'checkmark-circle' : 'ellipse-outline'}
                      size={24}
                      color={selected ? Colors.deliRed : Colors.textSecondary}
                    />
                  </TouchableOpacity>
                  {i < CATERING_CATEGORIES.length - 1 && <View style={styles.inputSeparator} />}
                </View>
              );
            })}
          </View>

          {/* Dietary & Notes */}
          <Text style={styles.sectionLabel}>Additional Info</Text>
          <View style={styles.card}>
            <View style={styles.inputRow}>
              <Text style={styles.inputLabel}>Dietary</Text>
              <TextInput
                style={styles.inputValue}
                placeholder="Requirements"
                placeholderTextColor={Colors.textSecondary}
                value={form.dietary}
                onChangeText={(v) => updateForm({ dietary: v })}
              />
            </View>
            <View style={styles.inputSeparator} />
            <TextInput
              style={styles.notesInput}
              placeholder="Special requests or notes..."
              placeholderTextColor={Colors.textSecondary}
              value={form.notes}
              onChangeText={(v) => updateForm({ notes: v })}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>

          {/* Contact Info */}
          <Text style={styles.sectionLabel}>Your Contact Info</Text>
          <View style={styles.card}>
            <View style={styles.inputRow}>
              <Text style={styles.inputLabel}>Name</Text>
              <TextInput
                style={styles.inputValue}
                placeholder="Full name"
                placeholderTextColor={Colors.textSecondary}
                value={form.name}
                onChangeText={(v) => updateForm({ name: v })}
                autoCapitalize="words"
              />
            </View>
            <View style={styles.inputSeparator} />
            <View style={styles.inputRow}>
              <Text style={styles.inputLabel}>Phone</Text>
              <TextInput
                style={styles.inputValue}
                placeholder="Phone number"
                placeholderTextColor={Colors.textSecondary}
                value={form.phone}
                onChangeText={(v) => updateForm({ phone: v })}
                keyboardType="phone-pad"
              />
            </View>
            <View style={styles.inputSeparator} />
            <View style={styles.inputRow}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.inputValue}
                placeholder="Email address"
                placeholderTextColor={Colors.textSecondary}
                value={form.email}
                onChangeText={(v) => updateForm({ email: v })}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Submit */}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            activeOpacity={0.8}
            accessibilityLabel="Submit catering inquiry"
            accessibilityRole="button"
          >
            <Text style={styles.submitText}>Submit Inquiry</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  flex: {
    flex: 1,
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
  doneText: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.deliRed,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textTertiary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingHorizontal: Spacing.lg,
    paddingTop: 24,
    paddingBottom: 8,
  },
  card: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 10,
    marginHorizontal: Spacing.lg,
    overflow: 'hidden',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    minHeight: 44,
  },
  inputLabel: {
    fontSize: 16,
    color: Colors.textPrimary,
    fontWeight: '500',
    width: 80,
  },
  inputValue: {
    flex: 1,
    fontSize: 16,
    color: Colors.textPrimary,
    textAlign: 'right',
    paddingVertical: 10,
  },
  inputSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.separator,
    marginLeft: 16,
  },
  notesInput: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: Colors.textPrimary,
    minHeight: 80,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  categoryContent: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
  categoryDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  submitButton: {
    backgroundColor: Colors.deliRed,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginHorizontal: Spacing.lg,
    marginTop: 24,
  },
  submitText: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: '600',
  },
  successContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: 16,
  },
  successText: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
  },
  successButton: {
    backgroundColor: Colors.deliRed,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 48,
    marginTop: 24,
  },
  successButtonText: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: '600',
  },
});
