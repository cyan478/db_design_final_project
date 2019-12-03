import React, { Component } from "react";
import Login from "./Login";
import Signup from "./Signup";

import "./LoginPage.css";

const LOGIN = "Log In";
const SIGNUP = "Sign Up";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      action: LOGIN
    };
  }

  changeAction(action) {
    this.setState({ action });
  }

  renderHeader() {
    const on = this.state.action === LOGIN ? "selected" : "";
    const off = this.state.action === SIGNUP ? "selected" : "";

    return (
      <div className='header'>
        <div className='toggleBar'>
          <div onClick={() => this.changeAction(LOGIN)} className={`toggle ${on}`}>
            {LOGIN}
          </div>
          <div onClick={() => this.changeAction(SIGNUP)} className={`toggle ${off}`}>
            {SIGNUP}
          </div>
        </div>
      </div>
    );
  }

  renderBody() {
    if (this.state.action === LOGIN) {
      return <Login onLogin={this.props.onLogin} />;
    } else {
      return <Signup onLogin={this.props.onLogin} /> ;
    }
  }

  render() {
    return (
      <div className='loginPage'>
        <div className='loginPanel'>
          {this.renderHeader()}
          {this.renderBody()}
        </div>
      </div>
    );
  }
}

export default LoginPage;