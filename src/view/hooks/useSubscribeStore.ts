import { create } from 'zustand';

interface SubscribeState {
  showSnackBar: boolean;
  showAlert: boolean;
  alertMessage: string;
  setShowSnackBar: (show: boolean) => void;
  setShowAlert: (show: boolean) => void;
  setAlertMessage: (message: string) => void;
}

const useSubscribeStore = create<SubscribeState>((set) => ({
  showSnackBar: false,
  showAlert: false,
  alertMessage: "",
  setShowSnackBar: (showSnackBar) => set(() => ({ showSnackBar })),
  setShowAlert: (showAlert) => set(() => ({ showAlert })),
  setAlertMessage: (alertMessage) => set(() => ({ alertMessage })),
}));

export default useSubscribeStore;