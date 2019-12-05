import React, { Component } from "react";
import Card from "./Card";
import Button from "@material-ui/core/Button";

class JustReviewsPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewingSize: 3,
      // results: this.sourceFilter(computedResults.results),
      results: [],
    };
  }

  componentDidMount() {
    this.applyFilter("");
  }

  applyFilter(filter) {
    var url = '/reviews?poster=' + this.props.username;
    
    fetch(url)
    .then(res => res.json())
    .then((data) => this.setState({results: data.reviews}))
    .catch(error => console.log(error));
  }

  onRemoveButtonClicked(reviewID) {
    // make sql call to remove the review from the db
  }

  render() {
    return (
      <Card className='justReviewsPanel'>
        <div className='header'>
          <div className='title'>{this.props.title}</div>
          <div className='titleText'>{this.props.titleText}</div>
        </div>

        <div className='results'>
          {this.state.results.slice(0, this.state.viewingSize).map(result => {
            return (
            <div className="resultRow">
              <div className={`singleResult ${result.review_sentiment}`}>
                <div className='resultHeader'>{result.poster_username}</div>
                <div className='resultContent'>{result.review_content}</div>
              </div>
            </div>
            );
          })}
        </div>

        {this.state.results.length >= this.state.viewingSize ? (
          <div className='seeMore'>
            <span onClick={() => this.increaseResultSize.call(this)}>
              See More
            </span>
          </div>
        ) : (
          <div style={{ padding: "20px"}}/>
        )}
      </Card>
    );
  }
}

export default JustReviewsPanel;
