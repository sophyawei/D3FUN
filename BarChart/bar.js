
var w = 500;
var h = 100;
var barPadding = 1;

var data = [4,8,15,16,23,42,5,16,28,41,19,25,11,18,7,21,10,7,9,35];

//create svg element
var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

svg.selectAll("rect")
   .data(data)
   .enter()
   .append("rect")
   .attr("x", function(d,i) {
        return i * (w / data.length);
   })
   .attr("y", function(d) {
        return h - (d*4); //make data grows from the bottom
   })
   .attr("width", w / data.length - barPadding)
   .attr("height", function(d) {
        return d * 5; //the data value
   })
   .attr("fill", function(d) {
        return "rgb(0,0," + (d*10) + ")";
   });

svg.selectAll("text")
   .data(data)
   .enter()
   .append("text")
   .text(function(d) {
        return d;
   })
   .attr("text-anchor", "middle");