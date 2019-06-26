/*
Sophie Stiekema,
10992499,
This file draws a gradientlegend for the world map
*/

// This function draws the gradient legend for the worldmap
function drawlegend(dataset, minvalue, maxvalue)
{
    // Set color scale
    palettescale = d3v5.scaleSequential(d3v5.interpolateGnBu).domain([0, 42])

    // Set width and height
    var w = 1300, h = 160;

    // Append svg
    var key = d3v5.select("#container")
      .append("svg")
      .attr("id", "gradientlegend")
      .attr("width", w)
      .attr("height", h);

      // Add legend title
      key.append("text")
              .attr("x", (w / 2))
              .attr("y", h / 1.9 )
              .attr("text-anchor", "middle")
              .style("font-size", "20px")
              .style("fill", "#073983")
              .style("font-family", "Georgia")
              .style("font-style", "bold")
              .text("Food production in 1,000 tonnes");

    // Draw colored legend
    var legend = key.append("defs")
      .append("svg:linearGradient")
      .attr("id", "gradient");

    legend.selectAll("stop")
        .data(palettescale.ticks().map((t, i, n) => ({ offset: `${100*i/n.length}%`, color: palettescale(t) })))
        .enter().append("stop")
        .attr("offset", d => d.offset)
        .attr("stop-color", d => d.color);

    key.append("rect")
      .attr("width", w)
      .attr("height", h - 130)
      .style("fill", "url(#gradient)")
      .attr("transform", "translate(0,100)");

    // Draw axis & ticks
    var y = d3v5.scaleLinear()
      .range([1300, 0])
      .domain([maxvalue, minvalue]);
    var yaxis = d3v5.axisBottom()
      .scale(y)
      .ticks(12);
    key.append("g")
      .attr("class", "y-axis")
      .attr("transform", "translate(0,130)")
      .call(yaxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("axis title");
}
