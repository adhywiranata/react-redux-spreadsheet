import React, { Component } from 'react';
import * as d3 from 'd3';
import _ from 'lodash';

class ChartContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataset: [25, 5, 10, 13, 19, 21, 25, 22, 18, 15],
    };

    this.changeDataset = this.changeDataset.bind(this);
  }

  componentDidMount() {
    this.renderChart();
    window.addEventListener('resize', () => this.renderChart());
  }

  componentDidUpdate() {
    this.updateChart();
  }

  changeDataset() {
    const randBar = _.random(0, this.state.dataset.length - 1);
    const randVal = _.multiply(_.random(1, 3), 5);
    const randOp = _.random(0, 1);
    const newDataset = this.state.dataset.map((val, i) => {
      if (i === randBar) {
        if (randOp === 0) {
          if (val <= 0) {
            return val - randVal;
          }
          return val;
        }
        return val + randVal;
      }
      return val;
    });

    this.setState({
      dataset: newDataset,
    });
  }

  updateChart() {
    const { dataset } = this.state;
    // reselect the svg
    const svg = d3.select('#SvgWrapper');

    const svgWidth = parseInt(svg.style('width').replace('px', ''), 10);
    const svgHeight = parseInt(svg.style('height').replace('px', ''), 10);

    // recalculate the scales
    const yScale = d3.scaleLinear()
              .domain([0, d3.max(dataset)])
              .range([svgHeight, 0]);

    const xScale = d3.scaleLinear()
              .domain([0, dataset.length])
              .range([0, svgWidth]);

    const yAxis = d3.axisLeft(yScale).ticks(d3.max(dataset) / 5);
    //
    const xAxis = d3.axisBottom(xScale).ticks(dataset.length);

    svg.select('.x.axis') // change the x axis
        .call(xAxis)
        .attr('transform', `translate(0, ${svgHeight})`);

    svg.select('.y.axis') // change the y axis
        .call(yAxis);

    dataset.forEach((val, index) => {
      const currHeight = d3.select(`.bar-${index}`).attr('height');
      const currY = d3.select(`.bar-${index}`).attr('y');

      svg.select(`.bar-${index}`)
        .attr('height', currHeight)
        .attr('y', currY)
      .transition()
        .duration(1000)
        .ease(d3.easeBounceOut)
        .attr('height', svgHeight - yScale(val))
        .attr('y', yScale(val));
    });
  }


  renderChart() {
    const { dataset } = this.state;
    const barPadding = 5;
    const customElasticEasing = d3.easeElastic.period(0.6);

    d3.select('.chart-svg').remove();

    const svg = d3.select('#SvgWrapper')
          .append('svg')
          .attr('class', 'chart-svg')
          .style('width', '100%')
          .style('height', '100%')
          .style('padding', 50)
          .style('background-color', '#FFFFFF');

    const svgWidth = parseInt(svg.style('width').replace('px', ''), 10);
    const svgHeight = parseInt(svg.style('height').replace('px', ''), 10);

    const yScale = d3.scaleLinear()
              .domain([0, d3.max(dataset)])
              .range([svgHeight, 0]);

    const xScale = d3.scaleLinear()
              .domain([0, dataset.length])
              .range([0, svgWidth]);

    const yAxis = d3.axisLeft(yScale).ticks(d3.max(dataset) / 5);

    const xAxis = d3.axisBottom(xScale).ticks(dataset.length);

    svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis);

    svg.append('g')
      .attr('class', 'x axis')
      .call(xAxis)
      .attr('transform', `translate(0,${svgHeight})`);

    svg.selectAll('rect')
       .data(dataset)
       .enter()
         .append('rect')
         .attr('class', (d, i) => `bar bar-${i}`)
         .attr('fill', '#1BBC9B')
         .attr('x', (d, i) => i * (svgWidth / dataset.length))
         .attr('width', (svgWidth / dataset.length) - barPadding)
         .attr('y', svgHeight)
         .attr('height', 0)
       .transition()
         .duration(2000)
         .ease(customElasticEasing)
         .delay((d, i) => i * 50)
         .attr('y', d => yScale(d))
         .attr('height', d => svgHeight - yScale(d));
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h2>Charts (Coming Soon)</h2>
        <button onClick={this.changeDataset} style={{ alignSelf: 'center', width: '50%', padding: 10, backgroundColor: 'teal', color: 'white', border: '0', margin: 10 }}>
          Change Value
        </button>
        <div style={{ display: 'flex', flexDirection: 'row', padding: 20 }}>
          <div style={{ width: '50%', backgroundColor: 'teal', height: 500 }} />
          <div style={{ width: '40%', height: 500 }}>
            <div id="SvgWrapper" style={{ width: '100%', height: 300, margin: '0 auto', padding: 0 }} />
          </div>
        </div>
      </div>
    );
  }
}

export default ChartContainer;
