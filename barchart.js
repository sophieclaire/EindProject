

function drawbarchart(countrydata, id, name, type, year) {

    // // Create the button
    // var button = document.createElement("button");
    // button.innerHTML = "Change order";
    //
    // // Append
    // var body = document.getElementById("barchart");
    // body.appendChild(button);
    //
    // // 3. Add event handler
    // button.addEventListener ("click", function() {
    //     countrydata.sort(function(a, b) {
    //         return d3v5.descending(a[year], b[year]);
    //         });;
    // });
        // sort data
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

        //if no barchart yet
        if( $('#barchart').is(':empty')) {
            bar(dataset, name, year, type);
        }
          else{
          newbarchart(dataset, name, year, type)
        }
}

function bar(dataset, name, year, type) {

    document.getElementById('dropdownbutton').style.visibility='visible';

    // set dimensions
    margin = {top: 90, right: 20, bottom: 120, left: 200},
      w = 1300 - margin.left - margin.right,
      h = 1100 - margin.top - margin.bottom,
      barPadding = 1;

      //create SVG element
      svg = d3v5.select("div#barchart")
              //.attr("class", "graph")
              .append("svg")
              .attr("width", w + margin.left + margin.right)
              .attr("height", h + margin.bottom + margin.top)
              .attr("id","bars")
            .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // initialize axes
    yAxis = svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + barPadding + ",0)"),
    xAxis = svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (0 - barPadding / 2) + ")");

    //create tip
     tip = d3v5.tip()
          .attr('class', 'd3-tip')
          .offset([-10, 0])
          .html(function(d) {
            return "<strong>Amount:</strong> <span style='color:lavender'>" + d + "</span>";
            });

    // call funcntion that draws barchart
      newbarchart(dataset, name, year, type)
}

function newbarchart(dataset, name, year, type)
{

    var minValue = Math.min.apply(null, Object.values(dataset)),
        maxValue = Math.max.apply(null, Object.values(dataset));

    // set x & y scales & axes
    var yScale = d3v5.scaleBand()
                   .domain(d3v5.range(dataset.length))
                   .range([h, 0])
                   .padding(0.08);

    var xScale = d3v5.scaleLinear()
                   .domain([0, maxValue])
                   .range([0, w]);

    // set palette scale for colors
    var palettescale = d3v5.scaleSequential()
        .domain([minValue, maxValue])
        .interpolator(d3v5.interpolateBuGn);

    // set the domains
    yScale.domain(Object.keys(dataset));
    xScale.domain([0, maxValue]);

    // update y-axis
    yAxis.transition().duration(1000)
        .call(d3v5.axisLeft(yScale))

    yAxis.selectAll("text.y-label").remove();

    yAxis.append("text")
        .attr("class", "y-label")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left )
        .attr("x", 0 - h /2 )
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style("fill", "black")
        .style("font-size", "20px")
        .text(type + " categories");

    // update x-axis
    xAxis.transition().duration(1000)
        .call(d3v5.axisTop(xScale))

    xAxis.selectAll("text")
          .style("text-anchor", "end")
          .attr("dx", ".95em")
          .attr("dy", ".25em")
          .attr("transform", "translate(0," + (0 - barPadding / 2) + ")", "rotate(-90)" );

    xAxis.selectAll("text.x-label").remove();

    xAxis.append("text")
         .attr("class", "x-label")
         .attr("y", - margin.top / 2)
         .attr("x", h * 1.05)
         .attr("dy", "1em")
         .style("text-anchor", "middle")
         .style("fill", "black")
         .style("font-size", "20px")
         .text("Amount produced in tonnes");

         svg.call(tip);


    var u = svg.selectAll("rect")
                .data(Object.values(dataset))

    // draw new bars
    u.enter()
     .append("rect")
     .attr("class", "bar")
     .merge(u)
     .transition()
     .duration(1000)
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

       // tip
       svg.selectAll("rect").on('mouseover', tip.show)
         .on('mouseout', tip.hide)

    // remove unneeded bars
    u.exit().remove()

    var actualyear = year.replace('Y', '');

    // update title
    svg.select("text.title").remove();
    svg.append("text")
        .attr("class","title")
        .attr("x", (w / 2))
        .attr("y", -65)
        .attr("text-anchor", "middle")
        .style("font-size", "30px")
        .style("fill", "#00491b")
        .style("font-family", "Palatino")
        .text([actualyear] + " " + [type] + " production in " + [name]);

    }
