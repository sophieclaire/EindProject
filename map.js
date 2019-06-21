/*
Sophie Stiekema,
10992499,
This file creates a world map
*/

    function transformdata(json, year) {

      // pair up countries from both datasets
      var countries = Datamap.prototype.worldTopo.objects.world.geometries;
      //console.log(countries)
      let replacekey = Object.keys(json).map((key) => {
        for (var i = 0, j = countries.length; i < j; i++) {
          if (countries[i].id == key){
            var newkey = countries[i].id
            return [newkey, json[key], countries[i].properties.name]
          }
        }
      })

      // remove countries without data
      replacekey = replacekey.filter(function( element ) {
         return element !== undefined;
      });


      // create color palette
      var onlyValues = replacekey.map(function(obj){ return obj[1][year]; });

      // remove undefined vales
      onlyValues = onlyValues.filter(function( element ) {
         return element !== undefined;
      });

      minValue = Math.min.apply(Math, onlyValues);
      maxValue = Math.max.apply(Math, onlyValues);

      var paletteScale = d3v5.scaleSequential()
            .domain([minValue, maxValue / 2])
            .interpolator(d3v5.interpolateBuGn);

      // fill datasets
      var dataset = {};

      replacekey.forEach(function(item){
        var countrycode = item[0],
            index = Math.round(item[1][year]);
            //console.log(index)
            //console.log(paletteScale(index))
            var country = item[2];
        dataset[countrycode] = { Production: index, fillColor: paletteScale(index), country : country };
      });
      //console.log(dataset)

    var variables = [dataset, paletteScale]
    return variables;
    }

    function drawmap(data, dataset, paletteScale, year) {

        var actualyear = year.replace('Y', '');

      // draw map
      var map = new Datamap({
        element: document.getElementById('container'),
        scope : 'world',
        fills: { defaultFill: '#e6e6e6'},
        data: dataset,

        // set colors for hovering
        geographyConfig : {
          borderColor: 'cadetblue',
          borderOpacity: 0.5,
          highlightOnHover : true,
          highlightFillColor: dataset,
          highlightBorderColor: 'dimgrey',
          highlightBorderWidth: 1,
          highlightBorderOpacity: 1,

          // show Production Index in tooltip
            popupTemplate: function(geo, data) {
                // don't show tooltip if no data for the country
                if (!data) {
                  return ['<div class="hoverinfo">',
                      '<br>Production data not available for ',
                      geo.properties.name,,
                      '</div>'].join('');
                    }
                else if (data.Production == null){
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

        // update piechart when clicking on country
        done: function(map) {
          map.svg.selectAll('.datamaps-subunit').on('click', function (geography) {
            for(let i = 0, j = Object.keys(dataset).length; i < j; i++) {
              if (geography.id == Object.keys(dataset)[i]) {
                  document.getElementById('sortbutton').style.visibility='hidden';
                  if (!isNaN(dataset[geography.id].Production)) {
                      drawpiechart(geography.id, geography.properties.name, year)
                  }

                }
              else {
                continue;
              }
            }
          })
          // add title
          map.svg.append('text')
               .attr("x", 750)
               .attr("y", 22 )
               .attr("text-anchor", "middle")
               .style("font-size", "30px")
              // .style("text-decoration", "underline")
               //.style("font-style", "italic")
               .style("fill", "#00491b")
               .style("font-family", "Palatino")
               .text("World production in " + actualyear);
        }
      });
      drawlegend(dataset, paletteScale, minValue, maxValue);




      //
      // // set dimensions of legend elemenet
      // var margin = {top: 70, right: 20, bottom: 95, left: 50},
      //     w = 100 - margin.left - margin.right,
      //     h = 500 - margin.top - margin.bottom,
      //     padding = 40;
      //
      // // legend labels & color
      // var keys = ["< 150,000", " ", "", "  ", "    ", "     ", "      ", "> 3,000,000"];
      // var color = d3v5.scaleOrdinal()
      //     .domain(keys)
      //     .range(d3v5.schemeGnBu[9]);
      //
      // // create legend -- change to LINEARGRADIENT
      // var legend = d3v5.select("div#container").append("svg")
      //       .attr("class", "legend")
      //       .attr("width", w + margin.left + margin.right)
      //       .attr("height", h + margin.bottom + margin.top)
      //     .selectAll("g")
      //       .data(keys)
      //       .enter().append("g")
      //     .attr("transform", function(d, i) { return "translate(0," + i * -20 + ")"; });
      //
      //   // draw legend colored rectangles
      //   legend.append("rect")
      //         .attr("x", w + 35)
      //         .attr("y", h / 1.5)
      //         .attr("width", margin.right)
      //         .attr("height", margin.right)
      //         .style("fill", color);
      //
      //   // print legend text
      //   legend.append("text")
      //         .attr("x", w + 29)
      //         .attr("y", h / 1.45)
      //         .attr("dy", ".35em")
      //         .style("font-style", "italic")
      //         .style("text-anchor", "end")
      //         .style("font-size", "90%")
      //         .text(function(d) {
      //           return d;
      //         });
      //
      //     // add legend title
      //     d3v5.select("div#container").select("svg.legend").append('text')
      //          .attr("x", 70)
      //          .attr("y", 60 )
      //          .attr("text-anchor", "middle")
      //          .style("font-size", "16px")
      //          .style("font-style", "bold")
      //          .style("font-size", "120%")
      //          .text("Index");
      }
