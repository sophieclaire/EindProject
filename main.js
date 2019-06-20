/*
Sophie Stiekema,
10992499,
This file sets the year and calls the world map
*/
var year = 'Y2013'

jscode(year)


function updateyear(e)
{
    var year = e.value
       console.log(year)
       d3v5.select('#gradientlegend').remove();
       $('#barchart').empty()
       document.getElementById('dropdownbutton').style.visibility='hidden';
       d3v5.select("#pies").remove();
       d3v5.select("svg.datamap").remove();
       jscode(year)
   };

function jscode(year) {
  fetch("map_data.json")
    .then(response => response.json())
    .then(json => {
        var dataset = transformdata(json, year)[0]
        var palette_scale = transformdata(json, year)[1]
        drawmap(json, dataset, palette_scale, year);

    });
}
