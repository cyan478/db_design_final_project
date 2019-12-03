import React, { Component } from "react";
import Chart from "react-apexcharts";
const fetch = require("node-fetch");

class BarChart extends Component {
      
  constructor(props) {
    super(props);

    this.state = {
      options: {
        plotOptions: {
          bar: {
            horizontal: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
            'United States', 'China', 'Germany'
          ],
        }
      },
      series: [{
        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
      }],
      keywords: []
    }
  }

  componentDidMount() {
    this.getKeywords();

  }

  setChartParam() {
    // Create items array
    var items = Object.keys(this.state.keywords).map(function(key) {
      return [key, this.state.keywords[key]];
    });

    // Sort the array based on the second element
    items.sort(function(first, second) {
      return second[1] - first[1];
    });

    console.log(items);
  }

  getKeywords() {
    const url = '/keywords?site=' + this.props.review_site 
      + '&company=' + this.props.company
      + '&sentiment=' + this.props.sentiment;

    fetch(url)
    .then(res => res.json())
    .then(data => this.setState({keywords: data.keywords}))
    .catch(error => console.log(error));
  }

  render() {
    return (
      

      <div id="chart">
        <Chart options={this.state.options} series={this.state.series} type="bar" height="350" />
      </div>


    );
  }
}