import React, { Component } from "react";
import Card from "./Card";
import Button from "@material-ui/core/Button";
import computedResults from "./test_reviews.json";

class JustReviewsPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewingSize: 3,
      // results: this.sourceFilter(computedResults.results),
      results: computedResults.results
    };
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
              <div className="removeButtonLocation">
               <Button
                className='removeButton'
                variant='outlined'
                onClick={() => {}}>
                Remove
              </Button>
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
