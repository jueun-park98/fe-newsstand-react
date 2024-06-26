import ReactDOM from "react-dom/client";
import "./css/index.css";
import App from "./view/components/App";
import reportWebVitals from "./view/env/reportWebVitals";
import { NewsProvider } from "./view/components/provider/NewsProvider";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <QueryClientProvider client={queryClient}>
    <NewsProvider>
      <App />
    </NewsProvider>
  </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
