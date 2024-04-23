import React from 'react';

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

export interface Category {
  name: string;
  details: {
    firstIndex: number,
    count: number,
  }
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
  setMenuSelected: (menuSelected: string) => void;
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

export interface SnackBarProps {
  name: string;
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
