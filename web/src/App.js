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
      selectedAirline: "jetblue",
      selectedPanel: "general",
      loggedInUser: undefined
    };
  }

  onPanelSelect(selectedPanel) {
    this.setState({ selectedPanel });
  }

  onLogin(loggedInUser) {
    this.setState({ loggedInUser });
  }

  onDropdownSelect(selectedAirline) {
    this.setState({ selectedAirline });
  }

  renderPage() {
    if (this.state.loggedInUser) {
      return (
        <React.Fragment>
          <SidePanel
            selectedAirline={this.state.selectedAirline}
            onDropdownSelect={this.onDropdownSelect.bind(this)}
            selected={this.state.selectedPanel}
            onPanelSelect={this.onPanelSelect.bind(this)}
          />
          <MainPanel 
            selectedAirline={this.state.selectedAirline} 
            selected={this.state.selectedPanel} 
            username={this.state.loggedInUser}
          />
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