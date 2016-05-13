/*practice
http://chimera.labs.oreilly.com/books/1230000000345/ch09.html#_randomizing_the_data*/

$(document).ready(function() {

//Width and height
var w = 600;
var h = 250;
			
var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
				11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];
			
var xScale = d3.scale.ordinal()
				.domain(d3.range(dataset.length))
				.rangeRoundBands([0, w], 0.05);

var yScale = d3.scale.linear()
				.domain([0, d3.max(dataset)])
				.range([0, h]);
			
//create SVG element
var svg = d3.select("body")
			.append("svg")
			.attr("width", w)
			.attr("height", h);

			//Create bars
			svg.selectAll("rect")
			   .data(dataset)
			   .enter()
			   .append("rect")
			   .attr("x", function(d, i) {
			   		return xScale(i);
			   })
			   .attr("y", function(d) {
			   		return h - yScale(d);
			   })
			   .attr("width", xScale.rangeBand())
			   .attr("height", function(d) {
			   		return yScale(d);
			   })
			   .attr("fill", function(d) {
					return "rgb(0, 0, " + (d * 10) + ")";
			   });

			//Create labels
			svg.selectAll("text")
			   .data(dataset)
			   .enter()
			   .append("text")
			   .text(function(d) {
			   		return d;
			   })
			   .attr("text-anchor", "middle")
			   .attr("x", function(d, i) {
			   		return xScale(i) + xScale.rangeBand() / 2;
			   })
			   .attr("y", function(d) {
			   		return h - yScale(d) + 14;
			   })
			   .attr("font-family", "sans-serif")
			   .attr("font-size", "11px")
			   .attr("fill", "white");




			//On click, update with new data			
			d3.select("p")
				.on("click", function() {

					//New values for dataset
					// dataset = [ 11, 12, 15, 20, 18, 17, 16, 18, 23, 25,
					// 			5, 10, 13, 19, 21, 25, 22, 18, 15, 13 ];

					var numValues = dataset.length;
					dataset = [];

					for (var i = 0; i < numValues; i++) {
						var newNum = Math.floor(Math.random() * 25); //new random integer(0-24)
						dataset.push(newNum);
					}

					//Update all rects
					svg.selectAll("rect")
					   .data(dataset)
					   .transition()
					   .duration(3000)
					   .ease("linear")
					   .attr("y", function(d) {
					   		return h - yScale(d);
					   })
					   .attr("height", function(d) {
					   		return yScale(d);
					   })
					   .attr("fill", function(d) {
							return "rgb(0, 0, " + (d * 10) + ")";
					   });

					//Update all labels
					svg.selectAll("text")
					   .data(dataset)
					   .transition()
					   .delay(1000)								
					   .duration(1000)
					   .ease("linear")								
					   .text(function(d) {
					   		return d;
					   })
					   .attr("x", function(d, i) {
					   		return xScale(i) + xScale.rangeBand() / 2;
					   })
					   .attr("y", function(d) {
					   		return h - yScale(d) + 14;
					   });
					   				
				});

});

