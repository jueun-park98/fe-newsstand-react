import React from "react";

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
  _id: string;
  pressName: string;
  logoImageSrc: string;
  editedTime: string;
  category: string;
  headline: Headline;
  sideNews: Sidenews[];
}

export interface Category {
  name: string;
  details: {
    firstIndex: number;
    count: number;
  };
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
  subscribeState: SubscribeState;
  handleSubscribe: (logoName: string) => Promise<void>;
  handleUnsubscribe: (logoName: string) => Promise<void>;
}

export interface RollingTextProps {
  news: News;
  index: number;
  animate: boolean;
  setAnimate: (state: boolean) => void;
}

export interface TabProps {
  categories: Category[];
  pageState: PageState;
  dispatch: React.Dispatch<PageAction>;
}

export interface AlertProps {
  name: string;
  onUnsubscribe: (name: string) => void;
}

export interface LogoBoxProps {
  logo: {
    src: string;
    name: string;
  };
  onSubscribe: (name: string) => void;
  onUnsubscribe: (name: string) => void;
  isSubscribed: boolean;
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

export interface SubscribeState {
  showSnackBar: boolean;
  showAlert: boolean;
  alertMessage: string;
}

export type PageAction =
  | { type: "SET_PAGE"; payload: { page: number } }
  | { type: "SET_SUBSCRIPTION_PAGE"; payload: { subscriptionPage: number } }
  | { type: "START_ANIMATION"; payload?: never };

export type SubscribeAction =
  | { type: "SET_SHOW_SNACKBAR"; payload: { showSnackBar: boolean } }
  | { type: "SET_SHOW_ALERT"; payload: { showAlert: boolean } }
  | { type: "SET_ALERT_MESSAGE"; payload: { alertMessage: string } };

export const MENU_STATES = {
  allPress: "ALL_PRESS",
  subscribedPress: "SUBSCRIBED_PRESS",
};

export const VIEW_STATES = {
  grid: "GRID",
  list: "LIST",
};
