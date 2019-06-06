/*
Sophie Stiekema,
10992499,
This file creates a world map and a barchart
*/

window.onload = jscode();

function jscode() {

  fetch("map_data.json")
    .then(response => response.json())
    .then(json => {
        console.log(json)
        console.log(Object.values(json)["0"].Y1961)
        console.log(Object.keys(json)[0])

        var dataset = transformdata(json)[0]
        var palette_scale = transformdata(json)[1]
        console.log(json['NLD'])

        drawmap(json, dataset, palette_scale);
        drawpiechart();
    });
}
