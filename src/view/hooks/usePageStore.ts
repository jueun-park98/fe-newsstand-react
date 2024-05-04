import { create } from "zustand";

interface ListPageState {
  page: number;
  subscriptionPage: number;
  setPage: (page: number) => void;
  setSubscriptionPage: (page: number) => void;
}

const usePageStore = create<ListPageState>((set) => ({
  page: 0,
  subscriptionPage: 0,
  setPage: (page: number) => set((state) => ({ ...state, page: page })),
  setSubscriptionPage: (subscriptionPage: number) =>
    set((state) => ({ ...state, subscriptionPage: subscriptionPage })),
}));

export default usePageStore;
