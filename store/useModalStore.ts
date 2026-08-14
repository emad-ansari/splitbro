import { create } from "zustand";

interface ModalStore {
  isAddExpenseOpen: boolean;
  openAddExpense: () => void;
  closeAddExpense: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isAddExpenseOpen: false,
  openAddExpense: () => set({ isAddExpenseOpen: true }),
  closeAddExpense: () => set({ isAddExpenseOpen: false }),
}));
