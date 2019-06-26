/*
Sophie Stiekema,
10992499,
This file transfroms data and creates a world map
*/

// This function prepares the data for the world map
function transformdata(json, year)
{

    // Pair up countries from the dataset and the world map data
    var countries = Datamap.prototype.worldTopo.objects.world.geometries;
    var replacekey = Object.keys(json).map((key) => {
      for (var i = 0, j = countries.length; i < j; i++) {
        if (countries[i].id == key){
          var newkey = countries[i].id;
          return [newkey, json[key], countries[i].properties.name];
        }
      }
    });

    // Remove countries without data
    replacekey = replacekey.filter(function( element ) {
        return element !== undefined;
    });

    // Get the values for the color palette domain
    var onlyValues = replacekey.map(function(obj){ return obj[1][year]; });

    // Remove undefined vales
    onlyValues = onlyValues.filter(function( element ) {
     return element !== undefined;
    });

    // Set min & max values
    minValue = Math.min.apply(Math, onlyValues);
    maxValue = Math.max.apply(Math, onlyValues);

    // Create plette scale
    var paletteScale = d3v5.scaleSequential()
            .domain([minValue, maxValue / 2])
            .interpolator(d3v5.interpolateGnBu);

    // Fill the dataset with production amounts
    var dataset = {};

    replacekey.forEach(function(item){
        var countrycode = item[0],
            index = Math.round(item[1][year]),
            country = item[2];
        dataset[countrycode] = { Production: index, fillColor: paletteScale(index), country : country };
    });

    var variables = [dataset, paletteScale];
    return variables;
    }

// This function draws the world map and colors each coutry according to their production
function drawmap(data, dataset, paletteScale, year)
{

    var actualyear = year.replace('Y', '');

    // Draw the map
    var map = new Datamap({
        element: document.getElementById('container'),
        scope : 'world',
        fills: { defaultFill: '#e6e6e6'},
        data: dataset,

        // Style the map
        geographyConfig : {
          borderColor: 'cadetblue',
          borderOpacity: 0.5,
          highlightOnHover : true,
          highlightFillColor: dataset,
          highlightBorderColor: 'dimgrey',
          highlightBorderWidth: 1,
          highlightBorderOpacity: 1,

          // Configure tooltip
            popupTemplate: function(geo, data) {
                // Text if no data
                if (!data) {
                  return ['<div class="hoverinfo">',
                      'Production data not available for ',
                      geo.properties.name,
                      '</div>'].join('');
                    }
                else if (data.Production == null){
                    return ['<div class="hoverinfo">',
                        'Production data not available for ',
                        geo.properties.name,
                        '</div>'].join('');
                }
                // Set tooltip content
                return ['<div class="hoverinfo">',
                    '<strong>', geo.properties.name, '</strong>',
                    '<br>Production: <strong>', d3v5.format(",")(data.Production), '</strong>',
                    '</div>'].join('');
            }
        },

        // Update the piechart when clicking on a country
        done: function(map) {
          map.svg.selectAll('.datamaps-subunit').on('click', function (geography) {
            for(let i = 0, j = Object.keys(dataset).length; i < j; i++) {
              if (geography.id == Object.keys(dataset)[i]) {
                  document.getElementById('sortbutton').style.visibility='hidden';
                  if (!isNaN(dataset[geography.id].Production)) {
                      drawpiechart(geography.id, geography.properties.name, year, dataset[geography.id].Production);
                  }
                }
              else {
                continue;
              }
            }
          });

          // Add a title
          map.svg.append('text')
                 .attr("class", "title")
                 .attr("x", 650)
                 .attr("y", 23 )
                 .attr("text-anchor", "middle")
                 .style("font-size", "32px")
                 .style("fill", "#e6fceb")
                 .style("font-family", "Helvetica Neue")
                 .text("World food production in " + actualyear);
        }
    });

    // Call function that draws the map legend
    drawlegend(dataset, paletteScale, minValue, maxValue);
}
