import React from "react";
import ReactDOM from "react-dom/client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { ProductProvider } from "./contexts/ProductContext";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF8000",
      light: "#FFB8B8",
      dark: "#B25A00",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#9C27B0",
      light: "#BA68C8",
      dark: "#7b1FA2",
      contrastText: "#FFFFFF",
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <ProductProvider>
      <App />
    </ProductProvider>
  </ThemeProvider>
);

reportWebVitals();
