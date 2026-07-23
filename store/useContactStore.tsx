import { Contact } from "@/utils/constants";
import { create } from "zustand";

type ContactStore = {
  contacts: Contact[];
  searchQuery: string;
  selectedIds: string[];
  isLoading: boolean;

  setSearchQuery: (query: string) => void;
  toggleSelected: (id: string) => void;
  clearSelection: () => void;
  loadContacts: () => Promise<void>;
};

export const useContactStore = create<ContactStore>((set, get) => ({
  contacts: [],
  searchQuery: "",
  selectedIds: [],
  isLoading: false,
  permission: "unknown",

  loadContacts: async () => {
    set({ isLoading: true });

    // console.log("contact data: ", data);

    // set({ contacts, permission, isLoading: false });
  },

  setSearchQuery: (query) => set({ searchQuery: query }),

  toggleSelected: (id) => {
    const { selectedIds } = get();
    set({
      selectedIds: selectedIds.includes(id)
        ? selectedIds.filter((existing) => existing !== id)
        : [...selectedIds, id],
    });
  },

  clearSelection: () => set({ selectedIds: [] }),
}));

// Derived, memo-free selectors kept as plain functions so components
// only re-render on the slice they actually read.
export const selectFilteredContacts = (state: ContactStore) => {
  const q = state.searchQuery.trim().toLowerCase();
  if (!q) return state.contacts;
  return state.contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.phone.replace(/\s/g, "").includes(q.replace(/\s/g, "")),
  );
};
