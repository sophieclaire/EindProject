
    function drawpiechart(id, name){

        var countryfilename = 'data/' + [id] + '.json'
        console.log(countryfilename)

        fetch(countryfilename)
          .then(response => response.json())
          .then(country => {
              console.log(country)
              console.log(country.length)
              var piedata1 = {
                  "type" : "food",
                  "amount" : 0
              }
              var piedata2 = {
                  "type" : "feed",
                  "amount": 0
              };
              for (i = 0; i < country.length; i ++) {
                   if (country[i].Element == "Food") {
                       piedata1["amount"] +=1
                   }
                   else {
                       piedata2["amount"] +=1
                   }
              }
          //console.log(piedata)
          var piedata = [piedata1, piedata2];
          console.log(piedata)

        // this is the data
        //var data = [{"letter":"q","presses":1},{"letter":"w","presses":5},{"letter":"e","presses":2}];
        //console.log(data);

        d3v5.select("#pies").remove();


        // Set the width, height and radius
        var w = 400,
            h = 400,
            r = Math.min(w, h) / 2;

        // Set the color scheme
        var color = d3v5.scaleOrdinal()
                        .domain(piedata)
                        .range(d3v5.schemeGnBu[8]);

        // Set up the pie chart
        var pie = d3v5.pie()
            	.value(function(d) {
                    console.log(d.amount)
                    return d.amount; })(piedata);

        // Set the arcs for the chart and the labels with inner & outer radii
        var arc = d3v5.arc()
            .outerRadius(r - 10)
            .innerRadius(0);

        var labelArc = d3v5.arc()
            .outerRadius(r - 100)
              .innerRadius(r - 40);

     // Select the svg and append the pie
      var svg = d3v5.select("#piechart")
        .append("svg")
        .attr("id","pies")
        .attr("width", w + 100)
        .attr("height", h + 100)
        .append("g")
        .attr("transform", "translate(" + w / 2 + "," + h / 1.5 +")");

        var g = svg.selectAll("arc")
            .data(pie)
            .enter().append("g")
            .attr("class", "arc");

        g.append("path")
            .attr("d", arc)
            .style("fill", function(d) { return color(d.data.type);});

        // Add labels
        g.append("text")
            .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
            .text(function(d) { return d.data.type;})
            .style("fill", "#fff");

        // Add title
        g.append("text")
            .attr("x", (w / 60))
            .attr("y", - .55 * h)
            .attr("text-anchor", "middle")
            .style("font-size", "20px")
            //.style("text-decoration", "underline")
            .style("font-style", "bold")
            .text("Food v Feed for " + [name] );
        })
    }
