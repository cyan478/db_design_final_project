import React, { Component } from "react";
import Card from "./Card";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const fetch = require("node-fetch");

class AddReviewPanel extends Component {
  constructor(props) {
    super(props);
    console.log("constructor: " + props.review_site)
    this.state = {
      textboxShown: false,
      text:"",
      addReviewHelperText:"",
      confirmationOpen: false
    };
  }

  onAddReviewButtonClicked() {
    this.setState({
      textboxShown: true
    });
  }

  handleTextChanged(text) {
    this.setState({
      text
    });
  }

  handleClose() {
    console.log("closing")
    this.setState({
      confirmationOpen: false
    });
  }

  onSubmitButtonClicked() {
    if (this.state.text == "") {
      this.setState({ addReviewHelperText: "You didn't write a review yet." });
      return;
    }
    // to do on the backend (add the review onto the database)

    this.setState({
      textboxShown: false,
      text:"",
      confirmationOpen: true,
      addReviewHelperText:""
    });
  }


  renderBody(){
    if (this.state.textboxShown == false) {
      return(
        <React.Fragment>
        <Button
          className="add-review-button"
          variant="outlined"
          startIcon={<AddCircleOutlineIcon />}
          onClick={this.onAddReviewButtonClicked.bind(this)}>
          Write a review
        </Button>
        <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={this.state.confirmationOpen}
        autoHideDuration={5000}
        onClose={this.handleClose.bind(this)}
        >
        <SnackbarContent className="success-snackbar"
          variant="success"
          message = { <span className="success-snackbar-line">
                      <CheckCircleIcon className="checkCircleIcon" />
                      <span style={{height:"100%"}}>Review successfully submitted. You can submit another review if you want.</span>
                      </span>
                    }
        />
      </Snackbar>
      </React.Fragment>
        )
    }
    else {
      return(
      <div>
        <TextField
          className='write-review-textfield'
          placeholder="Write your review here."
          multiline
          variant='outlined'
          value={this.state.text}
          onChange={(event) => this.handleTextChanged(event.target.value)}
          helperText={this.state.addReviewHelperText}
          error={this.state.addReviewHelperText !== ""}
        />
        <Button
          className="submit-review-button"
          variant="outlined"
          onClick={this.onSubmitButtonClicked.bind(this)}>
          Submit my review
        </Button>
        </div>
      )
    }
  }

  render() {
    return (
      <Card className='addReviewPanel'>
        <div className='header'>
          <div className='title'>{this.props.title}</div>
          <div className='titleText'>{this.props.titleText}</div>
        </div>

        {this.renderBody()}

      </Card>
    );
  }
}

export default AddReviewPanel;
