import React, { Component } from "react";
import "./App.css";
import Routes from "./routes";
import { UIProvider } from "contexts/UIContext";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#c93b0e",
      light: "#c93b0e",
      dark: "#ff7043",
      contrastText: "#ff7043"
    },
    secundary: {
      main: "#c93b0e",
      light: "#c93b0e",
      dark: "#c93b0e",
      contrastText: "#c93b0e"
    }
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <UIProvider>
          <Routes />
        </UIProvider>
      </MuiThemeProvider>
    );
  }
}

export default App;
