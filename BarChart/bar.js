
var w = 600;
var h = 250;
var barPadding = 1;

var data = [ 4, 8, 15, 16, 23, 42, 5, 
             16, 28, 41, 19, 25, 11, 18, 
             7, 21, 10, 7, 9, 35 ];

var xScale = d3.scale.ordinal()
                .domain(d3.range(data, length))
                .rangeRoundBands([0,w], 0.5);

var yScale = d3.scale.linear()
                .domain([0,d3.max(data)])
                .range([0,h]);

//create svg element
var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

//create bars
svg.selectAll("rect")
   .data(data)
   .enter()
   .append("rect")
   .attr("x", function(d,i) {
        return i * (w / data.length); //xScale(i); 
   })
   .attr("y", function(d) {
        return h - (d*4); //h - yScale(d); //make data grows from the bottom
   })
   .attr("width", w / data.length - barPadding) //xScale.rangeBand()) 
   .attr("height", function(d) {
        return d * 5; //yScale(d); //the data value
   })
   .attr("fill", function(d) {
        return "rgb(0,0," + (d*10) + ")";
   });

//create labels
svg.selectAll("text")
   .data(data)
   .enter()
   .append("text")
   .text(function(d) {
        return d;
   })
   .attr("text-anchor", "middle")
   .attr("x", function(d, i) {
        return i * (w/data.length) + (w/data.length-barPadding)/2; //xScale(i) + xScale.rangeBand()/2;
   })
   .attr("y", function(d) {
        return h - (d*4) + 14; //h - yScale(d) + 14;
   })
   .attr("font-family", "sans-serif")
   .attr("font-size", "11px")
   .attr("fill", "white");

//click event and update with new data
d3.selectAll("p")
    .on("click", function() {
      
      //new values for data
      data = [11,12,15,20,18,17,16,18,23,25,5,10,13,19,21,25,22,18,15,13];

      //update all rects
      svg.selectAll("rect")
         .data(data)
         .transition()
         .attr("y", function(d) {
            return h - (d*4);
         })
         .attr("height", function(d) {
            return d * 5;
         })
         .attr("fill", function(d) {
            return "rgb(0,0 " + (d * 10) + ")";
         });

      svg.selectAll("text")
         .data(data)
         .text(function(d) {
            return d;
         })
         .attr("x", function(d, i) {
            return i * (w/data.length) + (w/data.length-barPadding)/2; //xScale(i) + xScale.rangeBand() / 2;
         })
         .attr("y", function(d) {
            return h - (d*4) + 14; //h - yScale(d) + 14;
         });

    });

