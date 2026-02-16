import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Colors, Spacing } from '../../src/constants/theme';
import { BYO_OPTIONS } from '../../src/constants/menu';
import { useBuilderStore } from '../../src/store/builderStore';
import { useCartStore } from '../../src/store/cartStore';

const STEPS = [
  { key: 'bread', title: 'Choose Bread', subtitle: 'Select one' },
  { key: 'meat', title: 'Choose Meat', subtitle: 'Select one' },
  { key: 'cheese', title: 'Choose Cheese', subtitle: 'Select one' },
  { key: 'toppings', title: 'Add Toppings', subtitle: 'Select as many as you like' },
  { key: 'condiments', title: 'Add Condiments', subtitle: 'Select as many as you like' },
  { key: 'review', title: 'Review & Add', subtitle: 'Name your sandwich' },
];

export default function BuilderScreen() {
  const builder = useBuilderStore();
  const addToCart = useCartStore((s) => s.addToCart);
  const step = builder.step;
  const currentStep = STEPS[step];

  const handleSingleSelect = (value: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (currentStep.key === 'bread') builder.setBread(value);
    else if (currentStep.key === 'meat') builder.setMeat(value);
    else if (currentStep.key === 'cheese') builder.setCheese(value);
  };

  const handleMultiSelect = (value: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (currentStep.key === 'toppings') builder.toggleTopping(value);
    else if (currentStep.key === 'condiments') builder.toggleCondiment(value);
  };

  const isSelected = (value: string): boolean => {
    if (currentStep.key === 'bread') return builder.bread === value;
    if (currentStep.key === 'meat') return builder.meat === value;
    if (currentStep.key === 'cheese') return builder.cheese === value;
    if (currentStep.key === 'toppings') return builder.toppings.includes(value);
    if (currentStep.key === 'condiments') return builder.condiments.includes(value);
    return false;
  };

  const canGoNext = (): boolean => {
    if (step === 0) return builder.bread !== null;
    if (step === 1) return builder.meat !== null;
    if (step === 2) return builder.cheese !== null;
    return true;
  };

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      builder.setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      builder.setStep(step - 1);
    }
  };

  const handleAddToCart = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const description = builder.getSummaryDescription();
    addToCart({
      id: 'byo-' + Date.now(),
      name: builder.name || 'Custom Sandwich',
      description,
      type: 'byo',
    });
    builder.reset();
  };

  const getOptions = (): string[] => {
    const key = currentStep.key as keyof typeof BYO_OPTIONS;
    return BYO_OPTIONS[key] ?? [];
  };

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {STEPS.map((_, i) => (
        <View
          key={i}
          style={[
            styles.stepDot,
            i === step && styles.stepDotActive,
            i < step && styles.stepDotComplete,
          ]}
        />
      ))}
    </View>
  );

  const renderReview = () => (
    <View style={styles.reviewContainer}>
      <TextInput
        style={styles.nameInput}
        placeholder="Name your sandwich (optional)"
        placeholderTextColor={Colors.textSecondary}
        value={builder.name}
        onChangeText={builder.setName}
      />
      <View style={styles.reviewCard}>
        {builder.bread && (
          <View style={styles.reviewRow}>
            <Text style={styles.reviewLabel}>Bread</Text>
            <Text style={styles.reviewValue}>{builder.bread}</Text>
          </View>
        )}
        {builder.meat && (
          <>
            <View style={styles.reviewSeparator} />
            <View style={styles.reviewRow}>
              <Text style={styles.reviewLabel}>Meat</Text>
              <Text style={styles.reviewValue}>{builder.meat}</Text>
            </View>
          </>
        )}
        {builder.cheese && (
          <>
            <View style={styles.reviewSeparator} />
            <View style={styles.reviewRow}>
              <Text style={styles.reviewLabel}>Cheese</Text>
              <Text style={styles.reviewValue}>{builder.cheese}</Text>
            </View>
          </>
        )}
        {builder.toppings.length > 0 && (
          <>
            <View style={styles.reviewSeparator} />
            <View style={styles.reviewRow}>
              <Text style={styles.reviewLabel}>Toppings</Text>
              <Text style={styles.reviewValue}>{builder.toppings.join(', ')}</Text>
            </View>
          </>
        )}
        {builder.condiments.length > 0 && (
          <>
            <View style={styles.reviewSeparator} />
            <View style={styles.reviewRow}>
              <Text style={styles.reviewLabel}>Condiments</Text>
              <Text style={styles.reviewValue}>{builder.condiments.join(', ')}</Text>
            </View>
          </>
        )}
      </View>
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={handleAddToCart}
        activeOpacity={0.8}
      >
        <Text style={styles.addToCartText}>Add to Order</Text>
      </TouchableOpacity>
    </View>
  );

  const renderOptions = () => {
    const options = getOptions();
    return (
      <View style={styles.optionsCard}>
        {options.map((option, i) => {
          const selected = isSelected(option);
          const isMulti = currentStep.key === 'toppings' || currentStep.key === 'condiments';
          return (
            <View key={option}>
              <TouchableOpacity
                style={styles.optionRow}
                onPress={() => isMulti ? handleMultiSelect(option) : handleSingleSelect(option)}
                activeOpacity={0.7}
              >
                <Text style={[styles.optionText, selected && styles.optionTextSelected]}>
                  {option}
                </Text>
                {selected && (
                  <Ionicons name="checkmark-circle" size={22} color={Colors.deliRed} />
                )}
                {!selected && isMulti && (
                  <Ionicons name="ellipse-outline" size={22} color={Colors.textSecondary} />
                )}
                {!selected && !isMulti && (
                  <Ionicons name="ellipse-outline" size={22} color={Colors.textSecondary} />
                )}
              </TouchableOpacity>
              {i < options.length - 1 && <View style={styles.optionSeparator} />}
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Build Your Sandwich</Text>
      </View>

      {renderStepIndicator()}

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.stepTitle}>{currentStep.title}</Text>
        <Text style={styles.stepSubtitle}>{currentStep.subtitle}</Text>

        {step === 5 ? renderReview() : renderOptions()}
      </ScrollView>

      {/* Navigation */}
      {step < 5 && (
        <View style={styles.navBar}>
          <TouchableOpacity
            onPress={handleBack}
            style={[styles.navButton, step === 0 && styles.navButtonDisabled]}
            disabled={step === 0}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={20} color={step === 0 ? Colors.textSecondary : Colors.deliRed} />
            <Text style={[styles.navButtonText, step === 0 && styles.navButtonTextDisabled]}>
              Back
            </Text>
          </TouchableOpacity>

          <Text style={styles.navStep}>{step + 1} of {STEPS.length}</Text>

          <TouchableOpacity
            onPress={handleNext}
            style={[styles.navButton, !canGoNext() && styles.navButtonDisabled]}
            disabled={!canGoNext()}
            activeOpacity={0.7}
          >
            <Text style={[styles.navButtonText, !canGoNext() && styles.navButtonTextDisabled]}>
              Next
            </Text>
            <Ionicons name="arrow-forward" size={20} color={!canGoNext() ? Colors.textSecondary : Colors.deliRed} />
          </TouchableOpacity>
        </View>
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
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    backgroundColor: Colors.cardBackground,
  },
  stepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.separator,
  },
  stepDotActive: {
    backgroundColor: Colors.deliRed,
    width: 24,
  },
  stepDotComplete: {
    backgroundColor: Colors.deliRed,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  stepTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.textPrimary,
    paddingHorizontal: Spacing.lg,
    paddingTop: 20,
  },
  stepSubtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
    paddingHorizontal: Spacing.lg,
    paddingTop: 4,
    paddingBottom: 16,
  },
  optionsCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 10,
    marginHorizontal: Spacing.lg,
    overflow: 'hidden',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 44,
  },
  optionText: {
    fontSize: 17,
    color: Colors.textPrimary,
    flex: 1,
  },
  optionTextSelected: {
    fontWeight: '600',
    color: Colors.deliRed,
  },
  optionSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.separator,
    marginLeft: 16,
  },
  reviewContainer: {
    paddingHorizontal: Spacing.lg,
  },
  nameInput: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 17,
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  reviewCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 10,
    overflow: 'hidden',
  },
  reviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  reviewLabel: {
    fontSize: 15,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  reviewValue: {
    fontSize: 15,
    color: Colors.textPrimary,
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
    marginLeft: 16,
  },
  reviewSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.separator,
    marginLeft: 16,
  },
  addToCartButton: {
    backgroundColor: Colors.deliRed,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  addToCartText: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: '600',
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: 12,
    backgroundColor: Colors.cardBackground,
    borderTopWidth: 0.5,
    borderTopColor: Colors.separator,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  navButtonText: {
    fontSize: 16,
    color: Colors.deliRed,
    fontWeight: '500',
  },
  navButtonTextDisabled: {
    color: Colors.textSecondary,
  },
  navStep: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
});
