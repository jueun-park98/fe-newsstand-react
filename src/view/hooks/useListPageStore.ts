import { create } from "zustand";

interface ListPageState {
  page: number;
  subscriptionPage: number;
  animateProgress: boolean;
  setPage: (pageType: "page" | "subscriptionPage", updatedPage: number) => void;
  startAnimation: () => void;
}

const useListPageStore = create<ListPageState>((set) => ({
  page: 0,
  subscriptionPage: 0,
  animateProgress: false,
  setPage: (pageType, updatedPage) => set((state) => ({ ...state, [pageType]: updatedPage, animateProgress: false })),
  startAnimation: () => set({ animateProgress: true }),
}));

export default useListPageStore;
