import React, { Component } from 'react';
import * as d3 from 'd3';
import _ from 'lodash';

class ChartContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataset: [ 25, 5, 10, 13, 19, 21, 25, 22, 18, 15 ],
    };

    this.changeDataset = this.changeDataset.bind(this);
  }

  componentDidMount() {
    const { dataset } = this.state;
    const barPadding = 5;
    const customElasticEasing = d3.easeElastic.period(0.6);

    var svg = d3.select('#SvgWrapper')
          .append('svg')
          .style('width', '100%')
          .style('height', '100%')
        //  //responsive SVG needs these 2 attributes and no width and height attr
        //   .attr('preserveAspectRatio', 'xMinYMin meet')
          .style('padding', 50)
          .style('background-color', '#FFFFFF');

    var svgWidth = parseInt(svg.style('width').replace('px', ''), 10);
    var svgHeight = parseInt(svg.style('height').replace('px', ''), 10);

    var yScale = d3.scaleLinear()
              .domain([0, d3.max(dataset)])
              .range([svgHeight, 0]);

    var xScale = d3.scaleLinear()
              .domain([0, dataset.length])
              .range([0, svgWidth]);

    var yAxis = d3.axisLeft(yScale).ticks(d3.max(dataset) / 5);

    var xAxis = d3.axisBottom(xScale).ticks(dataset.length);

    svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis);

      svg.append('g')
        .attr('class', 'x axis')
        .call(xAxis)
        .attr('transform', 'translate(0,' + svgHeight + ')');

    svg.selectAll('rect')
       .data(dataset)
       .enter()
         .append('rect')
         .attr('class', (d, i) => 'bar bar-' + i)
         .attr('fill', function(d) {
          return '#1BBC9B';
         })
         .attr('x', function(d, i) {
            return i * (svgWidth / dataset.length);
         })
         .attr('width', svgWidth / dataset.length - barPadding)
         .attr('y', function(d) {
            return svgHeight;
         })
         .attr('height', function(d) {
            return 0;
         })
       .transition()
         .duration(2000)
         .ease(customElasticEasing)
         .delay(function(d, i) { return i * 50 })
         .attr('y', function(d) {
            return yScale(d);
         })
         .attr('height', function(d) {
            return svgHeight - yScale(d);
         });
  }

  changeDataset() {
    let randBar = _.random(0, this.state.dataset.length - 1);
    let randVal = _.multiply(_.random(1, 3), 5);
    let randOp = _.random(0, 1);
    const newDataset = this.state.dataset.map((val, i) => i === randBar ? randOp === 0 ? val <= 0 ? val - randVal : val : val + randVal : val)
    this.setState({
      dataset: newDataset
    })
  }

  componentWillUpdate(nextProps, nextState) {
    console.log(nextState.dataset);

    const { dataset } = nextState;

    // reselect the svg
    var svg = d3.select('#SvgWrapper');

    var svgWidth = parseInt(svg.style('width').replace('px', ''), 10);
    var svgHeight = parseInt(svg.style('height').replace('px', ''), 10);

    // recalculate the scales
    var yScale = d3.scaleLinear()
              .domain([0, d3.max(dataset)])
              .range([svgHeight, 0]);

    var xScale = d3.scaleLinear()
              .domain([0, dataset.length])
              .range([0, svgWidth]);

    var yAxis = d3.axisLeft(yScale).ticks(d3.max(dataset) / 5);
    //
    var xAxis = d3.axisBottom(xScale).ticks(dataset.length);

    svg.select(".x.axis") // change the x axis
        .call(xAxis)
        .attr('transform', 'translate(0,' + svgHeight + ')');

    svg.select(".y.axis") // change the y axis
        .call(yAxis);

    // svg.select('.bar-5')
    // .attr('height', svgHeight - yScale(dataset[5]))
    // .attr('y', yScale(dataset[5]));

    dataset.forEach((val, index) => {
      let currHeight = d3.select('.bar-' + index).attr('height');
      let currY = d3.select('.bar-' + index).attr('y');

      svg.select('.bar-' + index)
        .attr('height', currHeight)
        .attr('y', currY)
      .transition()
        .duration(1000)
        .ease(d3.easeBounceOut)
        .attr('height', svgHeight - yScale(val))
        .attr('y', yScale(val));
    });
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h2>Charts (Coming Soon)</h2>
        <button onClick={this.changeDataset} style={{ alignSelf: 'center', width: '50%', padding: 10, backgroundColor: 'teal', color: 'white', border: '0', margin: 10 }}>
          Change Value
        </button>
        <div style={{ display: 'flex', flexDirection: 'row', padding: 20 }}>
          <div style={{ width: '50%', backgroundColor: 'teal', height: 500 }}></div>
          <div style={{ width: '40%', height: 500,  }}>
            <div id="SvgWrapper" style={{ width: '100%', height: 300, margin: '0 auto', padding: 0 }}></div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChartContainer;
