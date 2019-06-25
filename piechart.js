/*
Sophie Stiekema,
10992499,
This file draws a piechart showing the amount of food v the amount of feed
*/

// This function prepares the data and calls the functions for drawing a piechart
function drawpiechart(id, name, year, production)
{

    var countryfilename = 'data/' + [id] + '.json'

    // Get data
    fetch(countryfilename)
      .then(response => response.json())
      .then(countrydata => {
      // Initialize variables
      var piedata1 = {
          "type" : "Food",
          "amount" : 0
      }
      var piedata2 = {
          "type" : "Feed",
          "amount": 0
      };
      // Count the number of food & feed elements
      for (i = 0; i < countrydata.length; i ++) {
           if (countrydata[i].Element == "Food") {
               piedata1["amount"] +=countrydata[i][year]
           }
           else {
               piedata2["amount"] +=countrydata[i][year]
           }
      }
      // Calculate perecnatges
      piedata1["amount"] = Math.round(piedata1["amount"] / production * 100)
      piedata2["amount"] = Math.round(piedata2["amount"] / production * 100);

      var piedata = [piedata1, piedata2];

      // shorten display name for long names
      if (name == "Democratic Republic of the Congo") {
          name = "DR Congo"
      }
      else if (name == "United States of America") {
          name = "the USA"
      }
      else if (name == "United Republic of Tanzania") {
          name = "Tazania"
      }

      // If there is no piechart yet, create one
      if ($('#piechart.figure').is(':empty')) {
        newpiechart(countrydata, piedata, id, name, year)
      }
      // Else, remove potential barchart and update the piechart
      else {
          $('#barchart').empty()
          updatepiechart(countrydata, piedata, id, name, year)
      }
  })
}

// This function draws a new pie chart
function newpiechart(countrydata, piedata, id, name, year)
{

    // Set the width, height and radius
        w = 350,
        h = 350,
        r = Math.min(w, h) / 2;

    // Set the color scheme
    var color = d3v5.scaleOrdinal()
                    .domain(piedata)
                    .range(d3v5.schemeGnBu[4]);

    // Set up the pie chart
     var pie = d3v5.pie()
        	.value(function(d) {
                return d.amount; })(piedata);

    // Set the arcs for the chart and the labels with inner & outer radii
    var arc = d3v5.arc()
          .outerRadius(r - 10)
          .innerRadius(0);

    var labelArc = d3v5.arc()
          .outerRadius(r - 80)
          .innerRadius(r - 40);

    // Create the tip
    var tip = d3v5.tip()
          .attr('class', 'd3-tip')
          .offset([-10, 0])
          .html(function(d) {
            return d.value + "</span> <strong>%</strong>";
            })

    // Select the svg and append the pie
    var svg = d3v5.select("#piechart")
                .append("svg")
                .attr("id","pies")
                .attr("width", w + 250)
                .attr("height", h + 150)
                .append("g")
                .attr("transform", "translate(" + w / 2 + "," + h /1.2 +")");

    // Call tip
    svg.call(tip);

    // Draw the pie
    var g = svg.selectAll("arc")
        .data(pie)
        .enter().append("g")
        .attr("transform", "translate(" + w / 3 + "," + h / 10 +")")
        .attr("class", "arc");

    g.append("path")
        .attr("d", arc)
        .style("fill", function(d) { return color(d.data.type);})
        .on("mouseover", tip.show)
        .on('mouseout', tip.hide);

    // Add labels
    var rectsize = 50
    svg.append("rect")
      .attr("width", rectsize)
      .attr("height", rectsize)
      .attr("transform", "translate(" + w / 1.13 + "," + h * .15 +")")
      .attr('stroke', 'white')
      .style("fill", function(d) { return color(pie["1"].data.type)});

      svg.append("text")
          .attr("transform", "translate(" + w / 1.1 + "," + h * .25 +")")
          .text("Feed")
          .style("fill", "#fff");

      svg.append("rect")
        .attr("width", rectsize)
        .attr("height", rectsize)
        .attr("transform", "translate(" + w / 1.13 + "," + - .1* h +")")
        .attr('stroke', 'white')
        .style("fill", function(d) { return color(pie["0"].data.type)});

    svg.append("text")
        .attr("transform", "translate(" + w / 1.1 + "," + h * .01 +")")
        .text("Food")
        .style("fill", "#fff");


    // g.append("text")
    //     .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
    //     .text(function(d) { return d.data.type;})
    //     .style("fill", "#fff");

    var actualyear = year.replace('Y', '');

    // Add title
    svg.append("text")
        .attr("class","title")
        .attr("x", (w / 3))
        .attr("y", - .44 * h)
        .attr("text-anchor", "middle")
        .style("fill", "#e6fceb")
        .style("font-family", "Helvetica Neue")
        .style("font-size", "30px")
        .text("Food v Feed for " + [name] + " in " + [actualyear]);

    // Draw barchart when clicking on an slice
    svg.selectAll(".arc")
          .on("click", function(d) {
              counter = 1
              bardata = {data: countrydata, id: id, name: name, type: d.data.type, year: year}
              drawbarchart(countrydata, id, name, d.data.type, year);
          });
}

// This function updates the piechart
function updatepiechart(countrydata, piedata, id, name, year)
{

    // Select the piechart div
    var svg = d3v5.select("#piechart")

    // Set up new pie chart
    var pie = d3v5.pie()
           .value(function(d) {
               return d.amount; })(piedata);
    // Set new angles
    path = svg.selectAll("path").data(pie);

    var actualyear = year.replace('Y', '');

    // Update title
    svg.select("text.title").text("Food v Feed for " + [name] + " in " + [actualyear]);

    // Redraw the arcs
    path.transition().duration(750).attrTween("d", arcTween);



    // Draw barchart when clicking on a slice
    svg.selectAll(".arc")
      .on("click", function(d) {
          counter = 1
          bardata = {data: countrydata, id: id, name: name, type: d.data.type, year: year}
          drawbarchart(countrydata, id, name, d.data.type, year);
    })
}

// This function is used when updating the piechart
function arcTween(a)
{
    // Set the width, height and radius
    var w = 350,
        h = 350,
        r = Math.min(w, h) / 2;

    // Set the arcs for the chart and the labels with inner & outer radii
    var arc = d3v5.arc()
        .outerRadius(r - 10)
        .innerRadius(0);

    var i = d3v5.interpolate(this._current, a);
    this._current = i(0);
    return function(t) {
    return arc(i(t));
    };
}
