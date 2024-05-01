import React, { Dispatch, useReducer } from "react";
import { SubscribeAction } from "../../constants";

interface SubscribeState {
  showSnackBar: boolean;
  showAlert: boolean;
  alertMessage: string;
}

type SubscribeContextType = [SubscribeState, Dispatch<SubscribeAction>];

export const SubscribeContext = React.createContext<SubscribeContextType>([
  { showSnackBar: false, showAlert: false, alertMessage: "" },
  () => {},
]);

export const initialSubscribeState: SubscribeState = {
  showSnackBar: false,
  showAlert: false,
  alertMessage: "",
};

export const subscribeReducer = (state: SubscribeState, { type, payload }: SubscribeAction) => {
  switch (type) {
    case "SET_SHOW_SNACKBAR":
      return { ...state, showSnackBar: payload.showSnackBar ?? state.showSnackBar };
    case "SET_SHOW_ALERT":
      return { ...state, showAlert: payload.showAlert ?? state.showAlert };
    case "SET_ALERT_MESSAGE":
      return { ...state, alertMessage: payload.alertMessage ?? state.alertMessage };
    default:
      return state;
  }
};

export const SubscribeProvider: React.FC<React.PropsWithChildren<{}>> = (props) => {
  const [subscribeState, subscribeDispatch] = useReducer(subscribeReducer, initialSubscribeState);

  return (
    <SubscribeContext.Provider value={[subscribeState, subscribeDispatch]}>
      {props.children}
    </SubscribeContext.Provider>
  );
};
