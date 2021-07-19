import React, { useState, createContext, useContext } from "react";
import produce from "immer";

const GlobalContext = createContext();

const initialState = { darkMode: false, error: false };

function globalApi(state, setState) {
  const useDarkMode = () => {
    const html = document.getElementsByTagName("html")[0];
    const { darkMode } = state;
    !darkMode
      ? html.classList.add("dark-mode")
      : html.classList.remove("dark-mode");

    setState(
      produce((draft) => {
        draft.darkMode = !darkMode;
      })
    );
  };

  return { useDarkMode };
}

function GlobalProvider({ children }) {
  const [state, setState] = useState(initialState);
  const { useDarkMode } = globalApi(state, setState);
  const value = { useDarkMode, state };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

function useGlobalStore() {
  const context = useContext(GlobalContext);
  return context;
}

export { GlobalProvider, useGlobalStore };
