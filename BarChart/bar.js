/*the animation doesn't work*/
$(document).ready(function() {

var w = 600;
var h = 250;
//var barPadding = 1;

var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
              11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

var xScale = d3.scale.ordinal()
                .domain(d3.range(dataset.length))
                .rangeRoundBands([0,w], 0.05);

var yScale = d3.scale.linear()
                .domain([0,d3.max(dataset)])
                .range([0,h]);

//create svg element
var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

//create bars
svg.selectAll("rect")
   .data(dataset)
   .enter()
   .append("rect")
   .attr("x", function(d,i) {
        return xScale(i); 
        //i * (w / dataset.length); 
   })
   .attr("y", function(d) {
        return h - yScale(d); 
        //h - (d*4); //make data grows from the bottom
   })
   .attr("width", xScale.rangeBand()) 
   //w / dataset.length - barPadding)
   .attr("height", function(d) {
        return yScale(d); 
        //d * 5; //the data value
   })
   .attr("fill", function(d) {
        return "rgb(0,0," + (d*10) + ")";
   });

//create labels
svg.selectAll("text")
   .data(dataset)
   .enter()
   .append("text")
   .text(function(d) {
        return d;
   })
   .attr("text-anchor", "middle")
   .attr("x", function(d, i) {
        return xScale(i) + xScale.rangeBand()/2; 
        //i * (w/dataset.length) + (w/dataset.length-barPadding)/2;
   })
   .attr("y", function(d) {
        return h - yScale(d) + 14; 
        //h - (d*4) + 14;
   })
   .attr("font-family", "sans-serif")
   .attr("font-size", "11px")
   .attr("fill", "white");

//click event and update with new data
d3.select("p")
    .on("click", function() {
      
      //new values for data
      dataset = [ 11, 12, 15, 20, 18, 17, 16, 18, 23, 25,
                5, 10, 13, 19, 21, 25, 22, 18, 15, 13 ];
      //update all rects
      svg.selectAll("rect")
         .data(dataset)
         .transition()
         .duration(1000)
         .attr("y", function(d) {
            return h - yScale(d); //h - (d*4);
         })
         .attr("height", function(d) {
            return yScale(d); //d * 5;
         })
         .attr("fill", function(d) {
            return "rgb(0,0 " + (d * 10) + ")";
         });

      //updare labels
      svg.selectAll("text")
         .data(dataset)
         .transition()
         .text(function(d) {
            return d;
         })
         .attr("x", function(d, i) {
            return xScale(i) + xScale.rangeBand() / 2; 
            //i * (w/dataset.length) + (w/dataset.length-barPadding)/2;
         })
         .attr("y", function(d) {
            return h - yScale(d) + 14; 
            //h - (d*4) + 14;
         });

    });

});