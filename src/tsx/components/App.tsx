import React, { useEffect, useState } from "react";
import "../../css/App.css";
import Header from "./Header";
import RollingContainer from "./RollingContainer";
import PressContainer from "./PressContainer";
import { fetchNews } from "../api/NewsAPI";
import { News } from "./Interfaces";

function App() {
  const [news, setNews] = useState<News[]>([]);
  const [subscriptions, setSubscriptions] = useState<News[]>([]);

  useEffect(() => {
    loadNews(setNews);
  }, []);

  return (
    <div className="App">
      <Header></Header>
      <RollingContainer news={news}></RollingContainer>
      <PressContainer></PressContainer>
    </div>
  );
}

const loadNews: (setFn: Function) => void = async (setFn) => {
  const loadedNews = await fetchNews();
  setFn(loadedNews);
};

export default App;
