import React, { Component } from "react";
import Card from "./Card";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import Search from "@material-ui/icons/Search";
const fetch = require("node-fetch");

class MyFilterPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: "",
      viewingSize: 3,
      // results: this.sourceFilter(computedResults.results),
      results: [],
      selectedTag: ""
    };
  }

  componentDidMount() {
    var url = '/reviews/save?username=' + this.props.username;
    
    fetch(url)
    .then(res => res.json())
    .then((data) => this.setState({results: data.reviews}))
    .catch(error => console.log(error));
  }

  sourceFilter(results) {
    if (this.props.sourceFilter) {
      results = results.filter(match => match.source === this.props.sourceFilter);
    }
    return results;
  }

  filter(results, filter) {
    let matches = [];

    for (let i = 0; i < results.length; i++) {
      let result = results[i];
      if (result.keywords.includes(filter)) {
        let match = {};

        let sentiment;
        if (result.sentiment_score < 0) {
          sentiment = "negative";
        } else {
          sentiment = "positive";
        }

        match["username"] = result.username;
        match["source"] = result.source;
        match["sentiment"] = sentiment;
        match["location"] = result.location[0];
        match["content"] = result.content;

        matches.push(match);
      }
    }

    matches = this.sourceFilter(matches);

    return matches;
  }

  onSearchChanged(value) {
    this.setState({ filter: value });
  }

  increaseResultSize() {
    let newSize = Math.min(this.state.viewingSize + 3, this.state.results.length);
    this.setState({ viewingSize: newSize });
  }

  onRemoveReview(username, review_id) {
    console.log("deleeting some stuff");
    const url = "/reviews/delete"
    const data = { username: username, 
      review_id: review_id }
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { 'Content-Type': "application/json" }
    }).then(() => {
      this.applyFilter(this.state.filter);
    })
  }

  render() {
    return (
      <Card className='myfilterPanel'>
        <div className='header'>
          <div className='title'>{this.props.title}</div>
          <div className='titleText'>{this.props.titleText}</div>
        </div>
        {/* <div className='search'>
          <TextField
            variant='outlined'
            id='searchInput'
            value={this.state.filter}
            onChange={event =>
              this.onSearchChanged.call(this, event.target.value)
            }
            onKeyPress={event => {
              if (event.key === "Enter") {
                this.onEnterKeyPressed.call(this);
              }
            }}
            className='searchInput'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Search />
                </InputAdornment>
              )
            }}
          />
        </div>
        <div className='terms'>
          {this.props.tags.map(tag => {
            return (
              <div
                key={tag}
                onClick={() => this.onTagClicked(tag)}
                className={`searchTerm ${
                  this.state.selectedTag === tag ? "selected" : ""
                }`}>
                {tag}
              </div>
            );
          })}
        </div> */}
        <div className='results'>
          {this.state.results.slice(0, this.state.viewingSize).map(result => {
            return (
              <div className="resultRow" key={result.review_id}>
              <div className={`singleResult ${result.review_sentiment}`}>
                <div className='resultHeader'>{result.poster_username}</div>
                <div className='resultContent'>{result.review_content}</div>
              </div>
              <div className="removeButtonLocation">
               <Button
                className='removeButton'
                variant='outlined'
                onClick={() => {
                  this.onRemoveReview.call(this, this.props.username, result.review_id)
                }}>
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

export default MyFilterPanel;
