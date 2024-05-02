import React, { ReactNode, createContext, useContext, useState } from "react";
import { MENU_STATES, VIEW_STATES } from "../../constants";

interface NavigationContextType {
  menuSelected: string;
  setMenuSelected: (menu: string) => void;
  viewSelected: string;
  setViewSelected: (view: string) => void;
}

interface NavigationProviderProps {
  children: ReactNode;
}

const initialNavigationState = {
  menuSelected: MENU_STATES.allPress,
  setMenuSelected: (menu: string) => {},
  viewSelected: VIEW_STATES.grid,
  setViewSelected: (view: string) => {},  
}

export const NavigationContext = createContext<NavigationContextType>(initialNavigationState);

export const useNavigation = () => useContext(NavigationContext);

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const [menuSelected, setMenuSelected] = useState<string>(MENU_STATES.allPress);
  const [viewSelected, setViewSelected] = useState<string>(VIEW_STATES.grid);

  return (
    <NavigationContext.Provider
      value={{ menuSelected, setMenuSelected, viewSelected, setViewSelected }}
    >
      {children}
    </NavigationContext.Provider>
  );
};
