import React, { Component } from 'react';
import * as d3 from 'd3';

class ChartContainer extends Component {

  componentDidMount() {
    //Width and height
		// var svgWidth = 1000;
		// var svgHeight = 400;
		var barPadding = 5;
		var dataset = [ 25, 5, 10, 13, 19, 21, 25, 22, 18, 15 ];

		//Create SVG element
		var svg = d3.select("#SvgWrapper")
					.append("svg")
					.style("width", '100%')
					.style("height", '100%')
         //responsive SVG needs these 2 attributes and no width and height attr
          .attr("preserveAspectRatio", "xMinYMin meet")
          .style("padding", 50)
          .style("background-color", "#FFFFFF");

    var svgWidth = parseInt(svg.style('width').substring(0, 3), 10) * 10;
    var svgHeight = parseInt(svg.style('height').substring(0, 3), 10);

    var yScale = d3.scaleLinear()
              .domain([0, d3.max(dataset)])
              .range([svgHeight, 0]);

    var xScale = d3.scaleLinear()
              .domain([0, dataset.length])
              .range([0, svgWidth]);

    var yAxis = d3.axisLeft(yScale).ticks(d3.max(dataset) / 5);

    var xAxis = d3.axisBottom(xScale).ticks(dataset.length);

    svg.append('g')
      .call(yAxis);

      svg.append('g')
        .call(xAxis)
        .attr("transform", "translate(0," + svgHeight + ")");

  const customElastic = d3.easeElastic.period(0.6);

		svg.selectAll("rect")
		   .data(dataset)
		   .enter()
  		   .append("rect")
  		   .attr("fill", function(d) {
  				return "#1BBC9B";
  		   })
         .attr("x", function(d, i) {
  		   		return i * (svgWidth / dataset.length);
  		   })
  		   .attr("width", svgWidth / dataset.length - barPadding)
  		   .attr("y", function(d) {
            return svgHeight;
  		   })
  		   .attr("height", function(d) {
            return 0;
  		   })
       .transition()
         .duration(2000)
         .ease(customElastic)
         .delay(function(d, i) { return i * 50 })
         .attr("y", function(d) {
            return yScale(d);
         })
         .attr("height", function(d) {
            return svgHeight - yScale(d);
         });

		svg.selectAll("text")
		   .data(dataset)
		   .enter()
		   .append("text")
		   .text(function(d) {
		   		return d;
		   })
		   .attr("text-anchor", "middle")
		   .attr("x", function(d, i) {
		   		return i * (svgWidth / dataset.length) + (svgWidth / dataset.length - barPadding) / 2;
		   })
		   .attr("y", function(d) {
          return yScale(d) + 20;
		   })
		   .attr("font-size", "15px")
		   .attr("fill", "white");
  }

  render() {
    return (
      <div>
        <h2>Charts (Coming Soon)</h2>
        <div id="SvgWrapper" style={{ width: '70%', height: 300, margin: '0 auto' }}></div>
      </div>
    );
  }
}

export default ChartContainer;
