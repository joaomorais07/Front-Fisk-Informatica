import { darkTheme } from "./themes.ts";
import { GlobalStyle } from "./global.ts";
import { AuthProvider } from "./contexts/Auth/index.tsx";
import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ThemeProvider theme={darkTheme}>
    <BrowserRouter basename="/Front-Fisk-Informatica/">
      <AuthProvider>
        <GlobalStyle />
        <App />
      </AuthProvider>
    </BrowserRouter>
  </ThemeProvider>
);
