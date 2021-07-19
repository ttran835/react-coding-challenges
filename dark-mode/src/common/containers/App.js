import React from "react";
import { GlobalProvider } from "../../store/global";

export default function App({ children }) {
  return <GlobalProvider>{children}</GlobalProvider>;
}
