
    function drawpiechart(){

        fetch("data/NLD.json")
          .then(response => response.json())
          .then(nld => {
              console.log(nld)
              console.log(nld.length)
              var piedata1 = {
                  "type" : "food",
                  "amount" : 0
              }
              var piedata2 = {
                  "type" : "feed",
                  "amount": 0
              };
              for (i = 0; i < nld.length; i ++) {
                   if (nld[i].Element == "Food") {
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
        var data = [{"letter":"q","presses":1},{"letter":"w","presses":5},{"letter":"e","presses":2}];
        console.log(data);

        // Set the width, height and radius
        var w = 300,
            h = 300,
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
        .attr("width", w)
        .attr("height", h)
        .append("g")
        .attr("transform", "translate(" + w/2 + "," + h/2 +")");

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
        })
    }
