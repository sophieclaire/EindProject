
    function transformdata(json) {

      // pair up countries from both datasets
      var countries = Datamap.prototype.worldTopo.objects.world.geometries;
      console.log(countries)
      let replacekey = Object.keys(json).map((key) => {
        for (var i = 0, j = countries.length; i < j; i++) {
          if (countries[i].id == key){
            var newkey = countries[i].id
            return [newkey, json[key], countries[i].properties.name]
          }
        }
      })
      console.log(replacekey)

      // remove countries without data
      replacekey = replacekey.filter(function( element ) {
         return element !== undefined;
      });

      // create color palette
      var onlyValues = replacekey.map(function(obj){ return obj[1].Y2013; });
      var minValue = Math.min.apply(null, onlyValues),
          maxValue = Math.max.apply(null, onlyValues);

      var paletteScale = d3v5.scaleSequential()
            .domain([minValue,maxValue])
            .interpolator(d3v5.interpolateGnBu);

      // fill datasets
      var dataset = {};
      replacekey.forEach(function(item){ //
        var countrycode = item[0],
            index = Math.round(item[1].Y2013),
            country = item[2];
        dataset[countrycode] = { Production: index, fillColor: paletteScale(index), country : country };
      });

    var variables = [dataset, paletteScale]
    return variables;
    }

    function drawmap(data, dataset, paletteScale) {

      // draw map
      console.log(dataset)
      var map = new Datamap({
        element: document.getElementById('container'),
        scope : 'world',
        fills: { defaultFill: '#F5F5F5'},
        data: dataset,

        // set colors for hovering
        geographyConfig : {
          highlightOnHover : true,
          highlightFillColor: 'lightgoldenrodyellow',
          Opacity : 0.8,
          highlightBorderColor: 'darkgrey',
          highlightBorderWidth: 1,
          highlightBorderOpacity: 1,

          // show Production Index in tooltip
            popupTemplate: function(geo, data) {

                // don't show tooltip if no data for the country
                if (!data) {
                  return ['<div class="hoverinfo">',
                      '<br>Production data not available',
                      '</div>'].join('');
                    }

                // tooltip content
                return ['<div class="hoverinfo">',
                    '<strong>', geo.properties.name, '</strong>',
                    '<br>Production: <strong>', data.Production, '</strong>',
                    '</div>'].join('');
            }
        },

        // update barchart when clicking on country
        done: function(map) {
          map.svg.selectAll('.datamaps-subunit').on('click', function (geography) {
            for(let i = 0, j = Object.keys(data).length; i < j; i++) {
              if (geography.properties.name == Object.values(data)[i].Country) {
                  update(dataset, geography.properties.name, paletteScale);
                }
              else {
                continue;
              }
            }
          })
          // add title
          map.svg.append('text')
               .attr("x", 320)
               .attr("y", 15 )
               .attr("text-anchor", "middle")
               .style("font-size", "16px")
               .style("text-decoration", "underline")
               .style("font-style", "italic")
               .text("Food production around the world");
        }
      });

      // set dimensions of legend elemenet
      var margin = {top: 70, right: 20, bottom: 95, left: 50},
          w = 100 - margin.left - margin.right,
          h = 500 - margin.top - margin.bottom,
          padding = 40;

      // legend labels & color
      var keys = ["< 150,000", " ", "", "  ", "    ", "     ", "      ", "> 3,000,000"];
      var color = d3v5.scaleOrdinal()
          .domain(keys)
          .range(d3v5.schemeGnBu[8]);

      // create legend
      var legend = d3v5.select("div#container").append("svg")
            .attr("class", "legend")
            .attr("width", w + margin.left + margin.right)
            .attr("height", h + margin.bottom + margin.top)
          .selectAll("g")
            .data(keys)
            .enter().append("g")
          .attr("transform", function(d, i) { return "translate(0," + i * -20 + ")"; });

        // draw legend colored rectangles
        legend.append("rect")
              .attr("x", w + 35)
              .attr("y", h / 1.5)
              .attr("width", margin.right)
              .attr("height", margin.right)
              .style("fill", color);

        // print legend text
        legend.append("text")
              .attr("x", w + 29)
              .attr("y", h / 1.45)
              .attr("dy", ".35em")
              .style("font-style", "italic")
              .style("text-anchor", "end")
              .style("font-size", "90%")
              .text(function(d) {
                return d;
              });

          // add legend title
          d3v5.select("div#container").select("svg.legend").append('text')
               .attr("x", 70)
               .attr("y", 60 )
               .attr("text-anchor", "middle")
               .style("font-size", "16px")
               .style("font-style", "italic")
               .style("font-size", "120%")
               .text("Index");
      }
