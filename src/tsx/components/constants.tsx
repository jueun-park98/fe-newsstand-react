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

export interface ViewProps extends PressProps {
  menuSelected: string;
}

export interface LogoState {
  name: string;
  src: string;
}

export const MENU_STATES = {
  allPress: "ALL_PRESS",
  subscribedPress: "SUBSCRIBED_PRESS",
};

export const VIEW_STATES = {
  grid: "GRID",
  list: "LIST",
};