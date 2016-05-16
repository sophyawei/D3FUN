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
  })
  // .on("click", function(d) {    //<--To update and add new bar when trigger click event
      
      // var numValues = dataset.length;
      // dataset = [];

      // for (var i = 0; i < numValues; i++) {
      //   var newNum = Math.floor(Math.random() * 100); //new random integer(0-99)
      //   dataset.push(newNum);
      // }

      // //update scale domain
      // yScale.domain([0, d3.max(dataset)]);

      // //Update all rects
      // svg.selectAll("rect")
      //    .data(dataset)
      //    .transition()
      //    .duration(3000)
      //    .ease("linear")
      //    .attr("y", function(d) {
      //       return h - yScale(d);
      //    })
      //    .attr("height", function(d) {
      //       return yScale(d);
      //    })
      //    .attr("fill", function(d) {
      //       return "rgb(0, 0, " + (d * 10) + ")";
      //    });

      //   //Update all labels
      //   svg.selectAll("text")
      //      .data(dataset)
      //      .transition()
      //      .delay(1000)                
      //      .duration(1000)
      //      .ease("linear")               
      //      .text(function(d) {
      //         return d;
      //      })
      //      .attr("x", function(d, i) {
      //         return xScale(i) + xScale.rangeBand() / 2;
      //      })
      //      .attr("y", function(d) {
      //         return h - yScale(d) + 14;
      //      });

      //   //Select..
      //   var bars = svg.selectAll("rect").data(dataset);

      //   //Enter..
      //   bars.eneter()
      //       .append("rect")
      //       .attr("x", w)
      //       .attr("y", function(d){
      //         return h - yScale(d);
      //       })
      //       .attr("width", xScale.rangeBand())
      //       .attr("height", function(d){
      //         return yScale(d);
      //       })
      //       .attr("fill", function(d){
      //         return "rgb(0,0 " + (d*10) + ")";
      //       })

      //   //Update..
      //   bars.transition()
      //       .duration(500)
      //       .attr("x", function(d,i){
      //         return xScale(i);
      //       })
      //       .attr("y", function(d){
      //         return h - yScale(d);
      //       })
      //       .attr("width", xScale.rangeBand())
      //       .attr("height", function(d){
      //         return yScale(d);
      //       });

      //   //Remove one value from dataset
      //   dataset.shift();

      //   //Exit..
      //   bars.exit()
      //       .transition()
      //       .duration(500)
      //       .attr("x", w)
      //       .remove();
//  })
  .on("mouseover", function(d){
      d3.select(this)
          .attr("fill", "orange");

      //get this bar's x/y values, then augment for the tooltiip
      var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.rangeBand() / 2;
      var yPosition = parseFloat(d3.select(this).attr("y")) + 14;

      // //create the tooltop label
      // svg.append("text")
      //    .attr("id", "tooltip")
      //    .attr("x", xPosition)
      //    .attr("y", yPosition)
      //    .attr("text-anchor", "middle")
      //    .attr("font-family", "sans-serif")
      //    .attr("font-size", "11px")
      //    .attr("font-weight", "bold")
      //    .attr("fill", "black")
      //    .text(d);

      //update the tooltip position and value
      d3.select("#tooltip")
        .style("left", xPosition + "px")
        .style("top", yPosition + "px")
        .select("#value")
        .text(d);

      //show the tooltip
      d3.select("#tooltip").classed("hidden", false);
  })
  .on("mouseout", function(d){
      d3.select(this)
           //.transition()   //<--this need to comment out to avoid the conflict
           //.duration(250)
           .attr("fill", function(d) {
              return "rgb(0, 0, " + (d * 10) + ")";
           });
      d3.select("#tooltip").classed("hidden", true);
  })
  .on("click", function() {
    sortBars();
  });


// //Create labels
// svg.selectAll("text")
//   .data(dataset)
//   .enter()
//   .append("text")
//   .text(function(d) {
//     return d;
//   })
//   .attr("text-anchor", "middle")
//   .attr("x", function(d, i) {
//     return xScale(i) + xScale.rangeBand() / 2;
//   })
//   .attr("y", function(d) {
//     return h - yScale(d) + 14;
//   })
//   .attr("font-family", "sans-serif")
//   .attr("font-size", "11px")
//   .attr("fill", "white")
//   .style("pointer-events", "none")
//   .on("click", function() {
//     sortTexts();
//   });


//Sorting
var sortOrder = false;

var sortBars = function() {

  //flip value of sortOrder
  sortOrder = !sortOrder;

  svg.selectAll("rect")
     .sort(function(a, b) {
        if(sortOrder) {
            return d3.ascending(a,b);
        } else {
            return d3.descending(a,b);
        }
     })
     .transition()
     .delay(function(d,i) {
        return i * 50;
     })
     .duration(1000)
     .attr("x", function(d,i) {
        return xScale(i);
     });

};




}); //end of script

