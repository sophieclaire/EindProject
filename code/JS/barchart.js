/*
Sophie Stiekema
10992499
This file creates a barchart and updates it.
It also includes a button that changes the sorting order of the barchart.
*/

// This function is called when the button to change the barchart order is pressed
function changeorder()
{
    // Keep track of whether the barchart is ascending or descending
    counter +=1;

    // Update the barchart
    drawbarchart(bardata.data, bardata.id,  bardata.name, bardata.type, bardata.year);
}

function drawbarchart(countrydata, id, name, type, year, order)
{

    // Sort the data descending
    if (counter % 2 == 0) {
        countrydata.sort(function(a, b) {
            return d3v5.descending(a[year], b[year]);
            });
        }
    // Sort the data ascending
    else {
        countrydata.sort(function(a, b) {
            return d3v5.ascending(a[year], b[year]);
            });
    }

    var dataset = {};

    // Fill the dataset with feed or food elements of that year
    for (var i = 0; i < countrydata.length; i ++) {
         if (countrydata[i].Element == type) {
             // Skip elements with no production
             if (countrydata[i][year] == 0) {
                 continue;
             }
             else {
                 dataset[countrydata[i].Item] = countrydata[i][year];
             }
         }
    }

    // If no barchart has been drawn yet
    if( $('#barchart').is(':empty')) {
        newbarchart(dataset, name, year, type);
    }
      else{
      updatebarchart(dataset, name, year, type);
    }
}

function newbarchart(dataset, name, year, type)
{

    // Show the sorting button
    document.getElementById('sortbutton').style.visibility='visible';

    // Set dimensions
    margin = {top: 90, right: 20, bottom: 120, left: 200},
      w = 1300 - margin.left - margin.right,
      h = 1100 - margin.top - margin.bottom,
      barPadding = 1;

    // Create SVG element
    svg = d3v5.select("div#barchart")
              .append("svg")
                 .attr("width", w + margin.left + margin.right)
                 .attr("height", h + margin.bottom + margin.top)
                 .attr("id","bars")
             .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Initialize the axes
    yaxis = svg.append("g")
                .attr("class", "y axis");

    xaxis = svg.append("g")
                .attr("class", "x axis");

    // Create tip
     tip = d3v5.tip()
              .attr('class', 'd3-tip')
              .offset([-10, 0])
              .html(function(d) {
                return "<strong>Amount: </strong>" + d3v5.format(",")(d) + "</span>";
                });

    // Call function that draws the barchart
      updatebarchart(dataset, name, year, type);
}

function updatebarchart(dataset, name, year, type)
{
    // Calculate the min & max values
    var minvalue = Math.min.apply(null, Object.values(dataset)),
        maxvalue = Math.max.apply(null, Object.values(dataset));

    // Set x & y scales
    var yscale = d3v5.scaleBand()
                   .domain(d3v5.range(dataset.length))
                   .range([h, 0])
                   .padding(0.08);

    var xscale = d3v5.scaleLinear()
                   .domain([0, maxvalue])
                   .range([0, w]);

    // Set the palette scale for colors
    var palettescale = d3v5.scaleSequential()
        .domain([minvalue, maxvalue])
        .interpolator(d3v5.interpolateGnBu);

    // Set the domains
    yscale.domain(Object.keys(dataset));
    xscale.domain([0, maxvalue]);

    // Update y-axis
    yaxis.transition().duration(1000)
        .attr("class", "axis")
        .call(d3v5.axisLeft(yscale));

    yaxis.selectAll("text.y-label").remove();

    yaxis.append("text")
        .attr("class", "y-label")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left )
        .attr("x", 0 - h /2 )
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style("fill", "MintCream")
        .style("font-size", "20px")
        .text(type + " categories");

    // Update x-axis
    xaxis.transition().duration(1000)
        .attr("class", "axis")
        .call(d3v5.axisTop(xscale));

    xaxis.selectAll("text")
          .style("text-anchor", "end")
          .attr("dx", ".95em")
          .attr("dy", ".25em")
          .attr("transform", "translate(0," + (0 - barPadding / 2) + ")", "rotate(-90)" );

    xaxis.selectAll("text.x-label").remove();

    xaxis.append("text")
         .attr("class", "x-label")
         .attr("y", - margin.top / 2)
         .attr("x", h * 1.05)
         .attr("dy", "1em")
         .style("text-anchor", "middle")
         .style("fill", "MintCream")
         .style("font-size", "20px")
         .text("Amount produced in 1,000 tonnes");

    // Call tip
    svg.call(tip);

    var u = svg.selectAll("rect")
                .data(Object.values(dataset));

    // Draw new bars
    u.enter()
     .append("rect")
     .attr("class", "bar")
     .merge(u)
     .transition()
     .duration(1000)
     .attr("y", function(d,i) {
       return yscale(Object.keys(dataset)[i]);
       })
     .attr("x", function(d) {
       return xscale(d3v5.range(d.length)) + barPadding;
       })
      .attr("height", yscale.bandwidth())
      .attr("width", function(d) {
           return xscale(d);
           })
      .attr("fill", function(d, i) {
         return palettescale(Object.values(dataset)[i]);
       });

    // Set tip
    svg.selectAll("rect").on('mouseover', tip.show)
                         .on('mouseout', tip.hide);

    // Remove unneeded bars
    u.exit().remove();

    var actualyear = year.replace('Y', '');

    // Update title
    svg.select("text.title").remove();
    svg.append("text")
        .attr("class","title")
        .attr("x", (w / 2.5))
        .attr("y", -65)
        .attr("text-anchor", "middle")
        .style("font-size", "30px")
        .style("fill", "#e6fceb")
        .style("font-family", "Helvetica Neue")
        .text([actualyear] + " " + [type] + " production in " + [name]);
    }
