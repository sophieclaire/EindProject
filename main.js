/*
Sophie Stiekema,
10992499,
This file creates a world map and a barchart
*/
var year = 'Y2013'
jscode(year)


function updateyear(e)
{
    var year = e.value
       console.log(year)
       d3v5.select('#gradientlegend').remove();
       d3v5.select("#bars").remove();
       d3v5.select("#pies").remove();
       d3v5.select("svg.datamap").remove();
       jscode(year)
   };

function jscode(year) {
  fetch("map_data.json")
    .then(response => response.json())
    .then(json => {
        // console.log(json)
        // console.log(Object.values(json)["0"].Y1961)
        // console.log(Object.keys(json)[0])

        console.log(year)
        var dataset = transformdata(json, year)[0]
        var palette_scale = transformdata(json, year)[1]
        //console.log(json['NLD'])

        drawmap(json, dataset, palette_scale, year);
        //drawpiechart();
        //drawbarchart();

    });
}
