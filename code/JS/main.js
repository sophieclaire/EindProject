/*
Sophie Stiekema,
10992499,
This file sets the year and calls the world map
*/

// Set initial year
var year = 'Y2013';

// Call function that fetches and transfroms the data
startfunction(year);

// Function that updates the year when the button is pressed
function updateyear(e)
{
    var year = e.value;
        // Remove graphs
       d3v5.select('#gradientlegend').remove();
       $('#barchart').empty();
       document.getElementById('sortbutton').style.visibility='hidden';
       d3v5.select("#pies").remove();
       d3v5.select("svg.datamap").remove();
       // Get new data & redraw map
       startfunction(year);
   }

// Function that fetches and transfroms the data
function startfunction(year)
{
    fetch("../../data/map_data.json")
        .then(response => response.json())
        .then(json => {
            var data = transformdata(json, year);
            var dataset = data[0];
            var palettescale = data[1];
            drawmap(json, dataset, palettescale, year);
    });
}
