import 'mongodb-stitch';
import React from 'react';
import './App.css';
import { scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';

export class Popular extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      checkins: null,
      width: '0'
    }
    this.createBarChart = this.createBarChart.bind(this);
    this.updateWindowWidth = this.updateWindowWidth.bind(this);
  }

  componentDidMount() {

  this.updateWindowWidth();

  this.props.stitchClient
    .executeFunction('popularCheckins', 10)
    .then(
      checkinData => {
        this.setState({checkins: checkinData});
        this.createBarChart();
      },
      error => {
        console.log(
          "Failed to fetch most popular check-ins: "
          + error)
    })
  }

  updateWindowWidth() {
    this.setState({width: window.innerWidth});
  }

  createBarChart() {
    const node = this.node;
    var data = this.state.checkins;
    var width = this.state.width - 80,
        barHeight = 20;

    // The highest count will always be for the first venue in the array
    var x = scaleLinear()
        .domain([0, data[0].count.toNumber()])
        .range([0, width]);

    var chart = select(node)
        .attr("width", width)
        .attr("height", barHeight * data.length);

    var bar = chart.selectAll("g")
        .data(data)
      .enter().append("g")
        .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

    bar.append("rect")
        .attr("width", function(d) {return x(d.count.toNumber())})
        .attr("height", barHeight - 1);

    bar.append("text")
        .attr("x", function(d) { return x(d.count.toNumber()) - 3; })
        .attr("y", barHeight / 2)
        .attr("dy", ".35em")
        .text(function(d) { return d.count.toNumber(); });

    bar.append("text")
        .attr("x", function(d) { return x(d.count.toNumber()) - 30; })
        .attr("y", barHeight / 2)
        .attr("dy", ".35em")
        .text(function(d) { return d.venue; });
  }

 render() {
    return (
      <div>
        <h2>Most popular check-ins</h2>
        <div>
          <svg className="chart" ref={node => this.node = node}
            width={ this.state.width } height={500}>
          </svg>
        </div>
      </div>
    );
  }
}