import React, {Component} from "react"
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      verifyPW: "",
      passwordHelperText: "",
      usernameHelperText: ""
    };
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleVerifyPWChange(event) {
    this.setState({ verifyPW: event.target.value });
  }

  handleVeryifyPWConfirmed() {
    if (this.state.password !== this.state.verifyPW) {
      this.setState({ passwordHelperText: "Passwords must match." });
    } else {
      this.setState({ passwordHelperText: "" });
    }
  }

  handleSignupButtonClicked() {
    // if username and password are still empty, enforce requirements
    if (this.state.username === "") {
      this.setState({ usernameHelperText: "Username Required."});
      return;
    }

    if (this.state.password === "" || this.state.verifyPW === "") {
      this.setState({ passwordHelperText: "Password Required."});
      return;
    }

    // do a database check to see if the username has been taken.
    const usernameTaken = false;
    if (usernameTaken) {
      this.setState({ usernameHelperText: "Username taken.'" });
    } else {
      this.setState({ usernameHelperText: "" })
      this.props.onLogin(this.state.username);
    }
  }

  render() {
    const passwordHelperText = this.state.passwordHelperText;
    const usernameHelperText = this.state.usernameHelperText;

    return (
      <div className='signup'>
      <div className='username-header'>
          Username <span style={{color:"red"}}>*</span>
        </div>
        <TextField
          className='username-textfield'
          helperText={usernameHelperText}
          error={usernameHelperText !== ""}
          onChange={this.handleUsernameChange.bind(this)}
          variant='outlined'
          value={this.state.username}
          required
        />
        <div className='password-header'>
          Password <span style={{color:"red"}}>*</span>
        </div>
        <TextField
          className='password-textfield'
          onChange={this.handlePasswordChange.bind(this)}
          variant='outlined'
          value={this.state.password}
          helperText={passwordHelperText}
          error={passwordHelperText !== ""}
        />
        <div className='password-header'>
          Confirm password <span style={{color:"red"}}>*</span>
        </div>
        <TextField
          className='password-textfield'
          onBlur={this.handleVeryifyPWConfirmed.bind(this)}
          onChange={this.handleVerifyPWChange.bind(this)}
          variant='outlined'
          value={this.state.verifyPW}
          helperText={passwordHelperText}
          error={passwordHelperText !== ""}
        />
        <Button
          className='login-button'
          variant='outlined'
          onClick={this.handleSignupButtonClicked.bind(this)}>
          Sign Up
        </Button>
      </div>
    );
  }
}

export default Signup;