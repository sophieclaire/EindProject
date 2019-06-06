window.onload = drawbarchart();

function drawbarchart() {

  fetch("data/NLD.json")
    .then(response => response.json())
    .then(nld => {
        console.log(nld)
        console.log(nld.length)
        var dataset = {}

        for (i = 0; i < nld.length; i ++) {
             if (nld[i].Element == "Food") {
                 if (nld[i].Y1961 == 0) {
                     continue
                 }
                 else {
                     dataset[nld[i].Item] = nld[i].Y1961
                 };
             }
        }
        console.log(dataset)


    //     console.log(Object.keys(dataset))
    //     console.log(Object.values(dataset).amount)
    //
    // console.log(dataset)
    stuff(dataset);
})
}
function stuff(dataset) {


  // set dimensions
  var margin = {top: 70, right: 20, bottom: 120, left: 50},
      w = 900 - margin.left - margin.right,
      h = 450 - margin.top - margin.bottom,
      barPadding = 1;

  // set x & y scales & axes
  var xScale = d3v5.scaleBand()
                  .range([0, w ])
                  .padding(.01)

  var yScale = d3v5.scaleLinear()
                  .range([h, 0])

  var yAxis = d3v5.axisLeft(yScale),
      xAxis = d3v5.axisBottom(xScale);

  //create tip
  var tip = d3v5.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {
        return "<strong>Index:</strong> <span style='color:lavender'>" + d + "</span>";
        })

  //create SVG element
  var svg = d3v5.select("div#barchart")
              .attr("class", "graph")
              .append("svg")
              .attr("width", w + margin.left + margin.right)
              .attr("height", h + margin.bottom + margin.top)
            .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.call(tip);




  var minValue = Math.min.apply(null, Object.values(dataset)),
      maxValue = Math.max.apply(null, Object.values(dataset));
      var palettescale = d3v5.scaleSequential()
        .domain([minValue,maxValue])
        .interpolator(d3v5.interpolateGnBu);

    // set the domains
    xScale.domain(Object.keys(dataset))
    yScale.domain([0, maxValue]);

  // draw the bars
  svg.selectAll("bar")
      .data(Object.values(dataset))
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d,i) {
        return xScale(Object.keys(dataset)[i]);
        })
      .attr("y", function(d) {
        return yScale(d);
        })
    .attr("width", xScale.bandwidth())
    .attr("height", function(d) {
        return h - yScale(d);
        })
    .attr("fill", function(d, i) {
      return palettescale(Object.values(dataset)[i]);
    })
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide);

    // add y-axis
    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + barPadding + ",0)")
        .call(yAxis)
      .append("text")
        .attr("class", "y label")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left )
        .attr("x", 0 - h /2 )
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style("fill", "black")
        .text("Production amount");

    // add x-axis
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (h - barPadding) + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );

    // add title
    svg.append("text")
        .attr("x", (w / 2))
        .attr("y", 0 - (margin.top / 2 ))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .style("font-style", "italic")
        .text("Food categories");
}
