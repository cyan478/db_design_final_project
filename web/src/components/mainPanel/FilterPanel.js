import React, { Component } from "react";
import Card from "./Card";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Search from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import computedResults from "./test_reviews.json";
const fetch = require("node-fetch");

class FilterPanel extends Component {
  constructor(props) {
    super(props);
    console.log("constructor: " + props.review_site)
    this.state = {
      filter: "",
      viewingSize: 3,
      results: [],
      selectedTag: ""
    };
  }

  componentDidMount() {
    console.log('mounted: ' + this.props.review_site)
    this.applyFilter("");
  }

  onSearchChanged(value) {
    this.setState({ filter: value });
  }

  onEnterKeyPressed() {
    this.setState({ selectedTag: "" });
    this.applyFilter(this.state.filter);
  }

  onTagClicked(selectedTag) {
    this.setState({ filter: "", selectedTag: selectedTag });
    this.applyFilter(selectedTag);
  }

  increaseResultSize() {
    let newSize = Math.min(this.state.viewingSize + 3, this.state.results.length);
    this.setState({ viewingSize: newSize });
  }

  applyFilter(filter) {
    if (this.props.selectedAirline == '') {
      var url = '/reviews?site=' + this.props.review_site;
    } else {
      var url = '/reviews?company=' + encodeURIComponent(this.props.selectedAirline.trim()) + '&site=' + this.props.review_site;
    }
    console.log("getting: " + url)
    if (filter != "") {
      url + '&keyword=' + filter;
    }
    
    fetch(url)
    .then(res => res.json())
    .then((data) => {
      console.log(data);
      this.setState({results: data.reviews})
    })
    .catch(error => console.log(error));
  }

  render() {
    return (
      <Card className='filterPanel'>
        <div className='header'>
          <div className='title'>{this.props.title}</div>
          <div className='titleText'>{this.props.titleText}</div>
        </div>
        <div className='search'>
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
        </div>

        <div className='results'>
          {this.state.results.slice(0, this.state.viewingSize).map(result => {
            return (
              <div className="resultRow">
              <div className={`singleResult ${result.review_sentiment}`}>
                <div className='resultHeader'>{result.poster_username}</div>
                <div className='resultContent'>{result.review_content}</div>
              </div>
              <div className="saveButtonLocation">
               <Button
                className='saveButton'
                variant='outlined'
                onClick={() => {}}>
                Save Review
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

export default FilterPanel;
