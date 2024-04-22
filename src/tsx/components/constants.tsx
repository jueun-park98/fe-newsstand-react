interface Headline {
  thumbnailSrc: string;
  title: string;
  href: string;
}

interface Sidenews {
  title: string;
  href: string;
}

export interface News {
  id: string;
  pressName: string;
  logoImageSrc: string;
  editedTime: string;
  category: string;
  headline: Headline;
  sideNews: Sidenews[];
}

export interface NewsProps {
  newsItem: News;
}

export interface RollingProps {
  news: News[];
}

export interface PressProps {
  news: News[];
  subscriptions: News[];
}

export interface ViewProps {
  menuSelected: string;
}

export interface RollingTextProps {
  news: News;
  index: number;
  animate: boolean;
  setAnimate: (state: boolean) => void;
}

export interface LogoState {
  name: string;
  src: string;
}

export interface PageState {
  page: number;
  subscriptionPage: number;
  animateProgress: boolean;
}

export type PageAction =
  | { type: "SET_PAGE"; payload: { page: number } }
  | { type: "SET_SUBSCRIPTION_PAGE"; payload: { subscriptionPage: number } }
  | { type: "START_ANIMATION" };

export const MENU_STATES = {
  allPress: "ALL_PRESS",
  subscribedPress: "SUBSCRIBED_PRESS",
};

export const VIEW_STATES = {
  grid: "GRID",
  list: "LIST",
};
