import { create } from 'zustand';
import { BuilderState } from '../types';

interface BuilderStore extends BuilderState {
  setStep: (step: number) => void;
  setBread: (bread: string) => void;
  setMeat: (meat: string) => void;
  setCheese: (cheese: string) => void;
  toggleTopping: (topping: string) => void;
  toggleCondiment: (condiment: string) => void;
  setName: (name: string) => void;
  reset: () => void;
  getSummaryDescription: () => string;
}

const initialState: BuilderState = {
  step: 0,
  bread: null,
  meat: null,
  cheese: null,
  toppings: [],
  condiments: [],
  name: '',
};

export const useBuilderStore = create<BuilderStore>((set, get) => ({
  ...initialState,

  setStep: (step) => set({ step }),
  setBread: (bread) => set({ bread }),
  setMeat: (meat) => set({ meat }),
  setCheese: (cheese) => set({ cheese }),

  toggleTopping: (topping) => set((state) => ({
    toppings: state.toppings.includes(topping)
      ? state.toppings.filter((t) => t !== topping)
      : [...state.toppings, topping],
  })),

  toggleCondiment: (condiment) => set((state) => ({
    condiments: state.condiments.includes(condiment)
      ? state.condiments.filter((c) => c !== condiment)
      : [...state.condiments, condiment],
  })),

  setName: (name) => set({ name }),

  reset: () => set(initialState),

  getSummaryDescription: () => {
    const s = get();
    const descParts: string[] = [];
    if (s.meat) descParts.push(s.meat);
    if (s.cheese && s.cheese !== 'No Cheese') descParts.push(s.cheese);
    let mainPart = descParts.join(', ');
    if (s.bread) mainPart = mainPart + ' on ' + s.bread;
    const sections = [mainPart];
    if (s.toppings.length > 0) sections.push(s.toppings.join(', '));
    if (s.condiments.length > 0) sections.push(s.condiments.join(', '));
    return sections.join(' · ');
  },
}));
