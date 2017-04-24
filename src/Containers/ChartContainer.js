import React, { Component } from 'react';
import * as d3 from 'd3';

class ChartContainer extends Component {

  componentDidMount() {
    //Width and height
		var svgWidth = 1000;
		var svgHeight = 200;
		var barPadding = 1;
		var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
						11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];
		//Create SVG element
		var svg = d3.select("#SvgWrapper")
					.append("svg")
					.attr("width", svgWidth)
					.attr("height", svgHeight);
		svg.selectAll("rect")
		   .data(dataset)
		   .enter()
		   .append("rect")
		   .attr("x", function(dataVal, iterationCounter) {
		   		return iterationCounter * (svgWidth / dataset.length);
		   })
		   .attr("y", function(dataVal) {
		   		return svgHeight - (dataVal * 4);
		   })
		   .attr("width", svgWidth / dataset.length - barPadding)
		   .attr("height", function(dataVal) {
		   		return dataVal * 4;
		   })
		   .attr("fill", function(dataVal) {
				return "rgb(0, 0, " + (dataVal * 10) + ")";
		   });
		svg.selectAll("text")
		   .data(dataset)
		   .enter()
		   .append("text")
		   .text(function(dataVal) {
		   		return dataVal;
		   })
		   .attr("text-anchor", "middle")
		   .attr("x", function(dataVal, iterationCounter) {
		   		return iterationCounter * (svgWidth / dataset.length) + (svgWidth / dataset.length - barPadding) / 2;
		   })
		   .attr("y", function(dataVal) {
		   		return svgHeight - (dataVal * 4) + 14;
		   })
		   .attr("font-family", "sans-serif")
		   .attr("font-size", "11px")
		   .attr("fill", "white");
  }
  render() {
    return (
      <div>
        <h2>Charts</h2>
        <div id="SvgWrapper"></div>
      </div>
    );
  }
}

export default ChartContainer;
