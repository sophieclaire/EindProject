

function drawbarchart(countrydata, id, name, type, year) {

        countrydata.sort(function(a, b) {
            return d3v5.ascending(a[year], b[year]);
            });
        //console.log(countrydata)
        var dataset = {};

        for (var i = 0; i < countrydata.length; i ++) {
             if (countrydata[i].Element == type) {
                 if (countrydata[i][year] == 0) {
                     continue;
                 }
                 else {
                     dataset[countrydata[i].Item] = countrydata[i][year];
                 }
             }
        }

    bar(dataset, name, type);

}
function bar(dataset, name, type) {

    d3v5.select("#bars").remove();
    document.getElementById('dropdownbutton').style.visibility='visible';

  // set dimensions
  var margin = {top: 90, right: 20, bottom: 120, left: 200},
      w = 1300 - margin.left - margin.right,
      h = 1100 - margin.top - margin.bottom,
      barPadding = 1;

  var minValue = Math.min.apply(null, Object.values(dataset)),
      maxValue = Math.max.apply(null, Object.values(dataset));

  // set x & y scales & axes
  var yScale = d3v5.scaleBand()
                  .domain(d3v5.range(dataset.length))
                  .range([h, 0])
                  .padding(0.1);

  var xScale = d3v5.scaleLinear()
                  .domain([0, maxValue])
                  .range([0, w]);


  var yAxis = d3v5.axisLeft(yScale),
      xAxis = d3v5.axisTop(xScale);

  //create tip
  var tip = d3v5.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {
        return "<strong>Amount:</strong> <span style='color:lavender'>" + d + "</span>";
        });

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
        .domain([minValue, maxValue])
        .interpolator(d3v5.interpolateBuGn);

    // set the domains
    yScale.domain(Object.keys(dataset));
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

    // add title
    svg.append("text")
        .attr("x", (w / 2))
        .attr("y", 0 - (margin.top / 4 ))
        .attr("text-anchor", "middle")
        .style("font-size", "30px")
        .style("fill", "#00491b")
        .style("font-family", "Palatino")
        .text(type + " categories in " + name);


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
        .text(type + " categories");

    // add x-axis
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (0 - barPadding / 2) + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", ".95em")
      .attr("dy", ".25em")
      .attr("transform", "translate(0," + (0 - barPadding / 2) + ")", "rotate(-90)" );

      svg.append("text")
        .call(xAxis)
         .attr("class", "x label")
         .attr("y", 0 - 2 * margin.left )
         .attr("x", 0 - h /2 )
         .attr("dy", "1em")
         .style("text-anchor", "middle")
         .style("fill", "black")
         .text("Amount produced in tonnes");


}
