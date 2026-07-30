import { create } from 'zustand';

interface StoreState {
    selectedPlot: string | null;
    showPlotModal: boolean;
    favorites: Set<string>;
    comparisonPlots: string[];
    filters: {
        search: string;
        status: string;
    };
    isAdmin: boolean;
    setSelectedPlot: (id: string | null) => void;
    setShowPlotModal: (show: boolean) => void;
    toggleFavorite: (id: string) => void;
    addToComparison: (id: string) => void;
    removeFromComparison: (id: string) => void;
    setFilters: (filters: Partial<StoreState['filters']>) => void;
    setIsAdmin: (isAdmin: boolean) => void;
}

export const useStore = create<StoreState>((set) => ({
    selectedPlot: null,
    showPlotModal: false,
    favorites: new Set(),
    comparisonPlots: [],
    filters: {
        search: '',
        status: 'All',
    },
    isAdmin: false,

    setSelectedPlot: (id) => set({ selectedPlot: id }),

    setShowPlotModal: (show) => set({ showPlotModal: show }),

    toggleFavorite: (id) =>
        set((state) => {
            const newFavorites = new Set(state.favorites);
            if (newFavorites.has(id)) {
                newFavorites.delete(id);
            } else {
                newFavorites.add(id);
            }
            return { favorites: newFavorites };
        }),

    addToComparison: (id) =>
        set((state) => ({
            comparisonPlots: [...state.comparisonPlots, id].slice(-3),
        })),

    removeFromComparison: (id) =>
        set((state) => ({
            comparisonPlots: state.comparisonPlots.filter((p) => p !== id),
        })),

    setFilters: (newFilters) =>
        set((state) => ({
            filters: { ...state.filters, ...newFilters },
        })),

    setIsAdmin: (isAdmin) => set({ isAdmin }),
}));