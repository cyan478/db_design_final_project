import React, {Component} from "react"
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
const fetch = require("node-fetch");

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      verifyPW: "",
      firstNameHelperText: "",
      lastNameHelperText: "",
      passwordHelperText: "",
      usernameHelperText: "",
      usernameExists: 0
    };
  }

  handleFirstNameChange(event) {
    this.setState({ firstName: event.target.value})
  }

  handleLastNameChange(event) {
    this.setState({ lastName: event.target.value})
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

  async checkUsernameExists(username) {
    var url = '/users?username=' + username;
    let response = await fetch(url);
    let data = await response.json();
    
    return data.user_data.length > 0;
  }

  async handleSignupButtonClicked() {
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
    let usernameExists = await this.checkUsernameExists(this.state.username)

    if (usernameExists) {
      this.setState({ usernameHelperText: "Username taken.'" });
      return;
    } else {
      var today = new Date();
      var date = today.getFullYear() + '-'
             + ('0' + (today.getMonth()+1)).slice(-2) + '-'
             + ('0' + (today.getDate())).slice(-2);

      const data = {
        firstname: this.state.firstName,
        lastname: this.state.lastName,
        username: this.state.username,
        password: this.state.password,
        creationdate: date
      };
      const otherParams = {
        headers: {'content-type':'application/json; charset=UTF-8'},
        body: JSON.stringify(data),
        method: 'POST'
      };
      const url = '/users';
      console.log(otherParams)
      let response = await fetch(url, otherParams);
      let success = await response.json();
      console.log(success)

      this.setState({ usernameHelperText: "" })
      this.props.onLogin(this.state.username);
    }
  }

  render() {
    const firstNameHelperText = this.state.firstNameHelperText;
    const lastNameHelperText = this.state.lastNameHelperText;
    const passwordHelperText = this.state.passwordHelperText;
    const usernameHelperText = this.state.usernameHelperText;

    return (
      <div className='signup'>
        <div className='firstName-header'>
          First name <span style={{color:"red"}}>*</span>
        </div>
        <TextField
          className='firstNameHeader-textfield'
          helperText={firstNameHelperText}
          error={firstNameHelperText !== ""}
          onChange={this.handleFirstNameChange.bind(this)}
          variant='outlined'
          value={this.state.firstName}
          required
        />
        <div className='lastName-header'>
          Last name <span style={{color:"red"}}>*</span>
        </div>
        <TextField
          className='lastNameHeader-textfield'
          helperText={lastNameHelperText}
          error={lastNameHelperText !== ""}
          onChange={this.handleLastNameChange.bind(this)}
          variant='outlined'
          value={this.state.lastName}
          required
        />
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