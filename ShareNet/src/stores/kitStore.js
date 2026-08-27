import { create } from 'zustand';
import { mockKits } from '../lib/mockData';

const useKitStore = create((set, get) => ({
    kits: mockKits,
    selectedCategory: 'All',
    searchQuery: '',

    setSearchQuery: (query) => set({ searchQuery: query }),
    setSelectedCategory: (category) => set({ selectedCategory: category }),

    getFilteredKits: () => {
        const { kits, selectedCategory, searchQuery } = get();
        return kits.filter(kit => {
            const matchesCategory = selectedCategory === 'All' || kit.category === selectedCategory;
            const matchesQuery = kit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                kit.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                kit.itemsIncluded.some(item => item.toLowerCase().includes(searchQuery.toLowerCase()));
            return matchesCategory && matchesQuery;
        });
    },

    getKitById: (id) => get().kits.find(k => k.id === id),

    addKit: (newKit) => set((state) => ({
        kits: [newKit, ...state.kits]
    }))
}));

export default useKitStore;
