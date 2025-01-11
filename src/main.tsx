import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BookMarksContextProvider from "./contexts/BookMarksContextProvider.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BookMarksContextProvider>
        <App />
      </BookMarksContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
