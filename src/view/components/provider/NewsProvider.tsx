import React, { useState, Dispatch, SetStateAction } from "react";
import { News } from "../../constants";

interface NewsState {
  news: Array<News>;
  subscription: Array<News>;
}

type NewsContextType = [NewsState, Dispatch<SetStateAction<NewsState>>];

export const NewsContext = React.createContext<NewsContextType>([
  { news: [], subscription: [] },
  () => {},
]);

const initialNewsState: NewsState = {
  news: [],
  subscription: [],
};

export const NewsProvider: React.FC<React.PropsWithChildren<{}>> = (props) => {
  const [newsState, setNewsState] = useState<NewsState>(initialNewsState);

  return (
    <NewsContext.Provider value={[newsState, setNewsState]}>{props.children}</NewsContext.Provider>
  );
};
