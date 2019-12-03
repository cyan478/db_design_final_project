import React, {Component} from "react"
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      usernameHelperText: "",
      passwordHelperText: ""
    };
  }

  handleUsernameChanged(event) {
    this.setState({ username: event.target.value, usernameHelperText: "" });
  }

  handlePasswordChanged(event) {
    this.setState({ password: event.target.value, passwordHelperText: "" });
  }

  handleLoginButtonClicked() {
    // check that username and password are there
    if (this.state.username === "") {
      this.setState({ usernameHelperText: "Username Required." });
      return;
    }

    if (this.state.password === "") {
      this.setState({ passwordHelperText: "Password Required." });
      return;
    }

    // check that the username is valid
    const usernameValid = true;

    if (!usernameValid) {
      this.setState({ passwordHelperText: "Username Invalid." });
      return;
    }

    // try to login.
    const loginValid = true;

    if (loginValid) {
      this.props.onLogin(this.state.username);
    } else {
      this.setState({ passwordHelperText: "Password Invalid." });
    }
  }

  render() {
    return (
      <div className='login'>
        <div className='username-header'>
          Username <span style={{color:"red"}}>*</span>
        </div>
        <TextField
        className='username-textfield'
          id='username'
          placeholder='Username'
          variant='outlined'
          value={this.state.username}
          onChange={this.handleUsernameChanged.bind(this)}
          helperText={this.state.usernameHelperText}
          error={this.state.usernameHelperText !== ""}
        />
        <div className='password-header'>
          Password <span style={{color:"red"}}>*</span>
        </div>
        <TextField
          className='password-textfield'
          id='password'
          placeholder='Password'
          variant='outlined'
          value={this.state.password}
          onChange={this.handlePasswordChanged.bind(this)}
          helperText={this.state.passwordHelperText}
          error={this.state.passwordHelperText !== ""}
        />
        <Button
          className='login-button'
          variant='outlined'
          onClick={this.handleLoginButtonClicked.bind(this)}>
          Log in
        </Button>
      </div>
    );
  }
}

export default Login;