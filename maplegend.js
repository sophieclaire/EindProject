
function drawlegend(dataset, paletteScale, minValue, maxValue) {


    colorScale = d3v5.scaleSequential(d3v5.interpolateBuGn).domain([0, 42])

    console.log(minValue)

    var w = 1300, h = 60;
    var key = d3v5.select("#container")
      .append("svg")
      .attr("id", "gradientlegend")
      .attr("width", w)
      .attr("height", h);
    var legend = key.append("defs")
      .append("svg:linearGradient")
      .attr("id", "gradient");

    legend.selectAll("stop")
        .data(colorScale.ticks().map((t, i, n) => ({ offset: `${100*i/n.length}%`, color: colorScale(t) })))
        .enter().append("stop")
        .attr("offset", d => d.offset)
        .attr("stop-color", d => d.color);

    key.append("rect")
      .attr("width", w)
      .attr("height", h - 30)
      .style("fill", "url(#gradient)")
      .attr("transform", "translate(0,10)");

    var y = d3v5.scaleLinear()
      .range([1300, 0])
      .domain([maxValue, minValue]);
    var yAxis = d3v5.axisBottom()
      .scale(y)
      .ticks(12);
    key.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(0,40)")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("axis title");
}
