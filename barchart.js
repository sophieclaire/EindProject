//window.onload = drawbarchart();

function drawbarchart(id) {

    var countryfilename = 'data/' + [id] + '.json'
    console.log(countryfilename)

  fetch(countryfilename)
    .then(response => response.json())
    .then(nld => {
        console.log(nld)
        nld.sort(function(a, b) {
              return d3v5.ascending(a.Y2013, b.Y2013)
            })
        console.log(nld)
        var dataset = {}

        for (i = 0; i < nld.length; i ++) {
             if (nld[i].Element == "Food") {
                 if (nld[i].Y1961 == 0) {
                     continue
                 }
                 else {
                     dataset[nld[i].Item] = nld[i].Y2013
                 };
             }
        }
        console.log(dataset)
        var result = Object.values(dataset).sort(function(a, b) {
                  return dataset[b] - dataset[a];
                })
        console.log(result)


    //     console.log(Object.keys(dataset))
    //     console.log(Object.values(dataset).amount)
    //
    // console.log(dataset)

    bar(dataset);
})
}
function bar(dataset) {

    d3v5.select("#bars").remove();


  // set dimensions
  var margin = {top: 90, right: 20, bottom: 120, left: 200},
      w = 900 - margin.left - margin.right,
      h = 1100 - margin.top - margin.bottom,
      barPadding = 1;

  var minValue = Math.min.apply(null, Object.values(dataset)),
      maxValue = Math.max.apply(null, Object.values(dataset));

for (i = 0; i < dataset.length; i++){
  dataset.sort(function(a, b) {
         return a - b;
       });
   }

  // set x & y scales & axes
  var yScale = d3v5.scaleBand()
                  .domain(d3v5.range(dataset.length))
                  .range([h, 0])
                  .padding(.1)

  var xScale = d3v5.scaleLinear()
                  .domain([0, maxValue])
                  .range([0, w])



  var yAxis = d3v5.axisLeft(yScale),
      xAxis = d3v5.axisBottom(xScale);

  //create tip
  var tip = d3v5.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {
        return "<strong>Amount:</strong> <span style='color:lavender'>" + d + "</span>";
        })

  //create SVG element
  var svg = d3v5.select("div#barchart")
              .attr("class", "graph")
              .append("svg")
              .attr("width", w + margin.left + margin.right)
              .attr("height", h + margin.bottom + margin.top)
              .attr("id","bars")
            .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.call(tip);



      var palettescale = d3v5.scaleSequential()
        .domain([minValue,maxValue])
        .interpolator(d3v5.interpolateGnBu);

    // set the domains
    yScale.domain(Object.keys(dataset))
    xScale.domain([0, maxValue]);

  // draw the bars
  svg.selectAll("bar")
      .data(Object.values(dataset))
    .enter().append("rect")
      .attr("class", "bar")
      .attr("y", function(d,i) {
        return yScale(Object.keys(dataset)[i]);
        })
      .attr("x", function(d) {
        return xScale(d3v5.range(d.length));
        })
    .attr("height", yScale.bandwidth())
    .attr("width", function(d) {
        return xScale(d);
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
        .text("Food produced");

    // add x-axis
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (h - barPadding) + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" )
     .append("text")
        .attr("class", "x label")
        .attr("y", 0 - 2 * margin.left )
        .attr("x", 0 - hs /2 )
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style("fill", "black")
        .text("Amount produced in tonnes");

    // add title
    svg.append("text")
        .attr("x", (w / 2))
        .attr("y", 0 - (margin.top / 2 ))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .style("font-style", "bold")
        .text("Food categories");

}
