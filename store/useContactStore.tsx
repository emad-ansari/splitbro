import { Contact } from "@/utils/constants";
import { contacts as initialContacts } from "@/utils/data";
import { create } from "zustand";

type ContactStore = {
  contacts: Contact[];
  searchQuery: string;
  isLoading: boolean;

  setSearchQuery: (query: string) => void;
  toggleSelected: (id: string) => void;
  clearSelection: () => void;
  loadContacts: () => Promise<void>;
};

export const useContactStore = create<ContactStore>((set, get) => ({
  contacts: initialContacts,
  searchQuery: "",
  isLoading: false,

  loadContacts: async () => {
    set({ isLoading: true });

    // console.log("contact data: ", data);

    // set({ contacts, permission, isLoading: false });
  },

  setSearchQuery: (query) => set({ searchQuery: query }),

  toggleSelected: (id: string) => {
    set({
      contacts: get().contacts.map((contact) =>
        contact.id === id
          ? { ...contact, isSelected: !contact.isSelected }
          : contact,
      ),
    });
  },

  clearSelection: () => {
    
  },
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
