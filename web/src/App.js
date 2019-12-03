import React, { Component } from "react";
import "./App.css";
import SidePanel from "./components/sidePanel/SidePanel";
import MainPanel from "./components/mainPanel/MainPanel";
import LoginPage from "./components/loginPage/LoginPage";
import { ThemeProvider } from "@material-ui/core/styles";
import defaultTheme from "@material-ui/core/styles/defaultTheme";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPanel: "general-insights",
      loggedInUser: undefined
    };
  }

  onPanelSelect(selectedPanel) {
    this.setState({ selectedPanel });
  }

  onLogin(loggedInUser) {
    this.setState({ loggedInUser });
  }

  renderPage() {
    if (this.state.loggedInUser) {
      return (
        <React.Fragment>
          <SidePanel
            selected={this.state.selectedPanel}
            onPanelSelect={this.onPanelSelect.bind(this)}
          />
          <MainPanel selected={this.state.selectedPanel} />
        </React.Fragment>
      );
    } else {
      return <LoginPage onLogin={this.onLogin.bind(this)}></LoginPage>;
    }
  }

  render() {
    return (
      <div className='app'>
        <ThemeProvider theme={defaultTheme}>{this.renderPage()}</ThemeProvider>
      </div>
    );
  }
}

export default App;