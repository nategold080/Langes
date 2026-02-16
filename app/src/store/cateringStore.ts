import { create } from 'zustand';
import { CateringForm } from '../types';

interface CateringStore {
  form: CateringForm;
  submitted: boolean;
  updateForm: (updates: Partial<CateringForm>) => void;
  toggleCategory: (categoryId: string) => void;
  resetForm: () => void;
  submitForm: () => void;
}

const initialForm: CateringForm = {
  date: '',
  guests: '',
  categories: [],
  dietary: '',
  notes: '',
  name: '',
  phone: '',
  email: '',
};

export const useCateringStore = create<CateringStore>((set) => ({
  form: { ...initialForm },
  submitted: false,

  updateForm: (updates) => set((state) => ({
    form: { ...state.form, ...updates },
  })),

  toggleCategory: (categoryId) => set((state) => ({
    form: {
      ...state.form,
      categories: state.form.categories.includes(categoryId)
        ? state.form.categories.filter((c) => c !== categoryId)
        : [...state.form.categories, categoryId],
    },
  })),

  resetForm: () => set({ form: { ...initialForm }, submitted: false }),
  submitForm: () => set({ submitted: true }),
}));
