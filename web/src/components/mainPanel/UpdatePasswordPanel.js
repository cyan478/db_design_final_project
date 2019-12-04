import React, {Component} from "react"
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "./Card";

class UpdatePasswordPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      verifyPW: "",
      passwordHelperText: ""
    };
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleVerifyPWChange(event) {
    this.setState({ verifyPW: event.target.value });
  }

  // if password and confirm password are not the same, enforce requirements
  handleVeryifyPWConfirmed() {
    if (this.state.password !== this.state.verifyPW) {
      this.setState({ passwordHelperText: "Passwords must match." });
    } else {
      const data = {
        password: this.state.password,
        username: this.props.username
      };
  
      const otherParams = {
        headers: {'content-type':'application/json; charset=UTF-8'},
        body: JSON.stringify(data),
        method: 'POST'
      };
  
      const url = '/users/password';
      fetch(url, otherParams);
      alert('Success!')
      this.setState({ passwordHelperText: "" });
    }
  }

  handleUpdatePWButtonClicked() {
    // if user did not update their password
    if (this.state.password === "" || this.state.verifyPW === "") {
      this.setState({ passwordHelperText: "Password Required."});
      return;
    }
  }

   render() {
    const passwordHelperText = this.state.passwordHelperText;

    return (
    	<Card className='updatePasswordPanel'>
    	<div className='header'>
          <div className='title'>{this.props.title}</div>
          <div className='titleText'>{this.props.titleText}</div>
        </div>
      <div className='updatePassword'>
        <div className='password-header'>
          New Password <span style={{color:"red"}}>*</span>
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
          Confirm New Password <span style={{color:"red"}}>*</span>
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
          className='update-password-button'
          variant='outlined'
          onClick={this.handleUpdatePWButtonClicked.bind(this)}>
          Update Password
        </Button>
      </div>
      </Card>
    );
  }
}

export default UpdatePasswordPanel;