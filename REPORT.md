# Final Report

## Description
My data visualization starts with a world map showing how much food each country produces in the year 2013. A darker color means a higher production. When clicking on a country a piechart appears showing what percentage of the food produced is actually used for humans (food), and which percentage is used for animals (feed). The user can then click on one of the two slices of the pie and a barchart will appear showing the exact amount of each food or feed element produced by that country in that year. The bar chart can be sorted in ascending or descending order. The year can be changed via a dropdown button at the top of the page.
![Screenshot](doc/REPORT-6be0a26a.png)

## Technical Design
Clearly describe the technical design: how is the functionality implemented in your code? This should be like your DESIGN.md but updated to reflect the final application.

First, give a high level overview, which helps us navigate and understand the total of your code (which components are there?). Second, go into detail, and describe the modules/classes (apps) files/functions (data) and how they relate.


All data files are contained within the data folder. All pictures are contained in the doc folder. All code is contained within the code folder, this one contains three folders: HTML, JS and CSS which each contain respective code files.

There are 3 HTML files, one for each page.
The most important one is the index.html file, this one displays all the visualizations.

There are also several JS files, one for each graph.

### main.js
The main.js file sets the initial year (2013). It contains two functions. One that updates the data for each year when the dropdown button is used. And one that fetches the data and calls the transformation function and then the function that draws the worldmap.

### map.js
The map.js file contains two functions. One that prepares the data for the world map, this function pairs up countries from the world map dataset with countries from my food production dataset. It also creates a palette scale with a sequential color scale. The other function draws the worldmap and calls the function that draws its legend.

### maplegend.js
The maplegend.js file contains just one function that draws the legend for the worldmap. It creates horizontal gradient bar with an x-axis to explain what the colors of the worldmap mean.

### piechart.js
The piechart.js file draws the piechart when the user clicks on a country in the worldmap. This file contains four functions. One that is called in the map.js file and fetches the data for the specific country, it counts the amount of

There is only one CSS file for the style.

## Challenges

A challenge was to get the data in the right format. I had to split it in separate files for each country since the file was so big.
Then it took me a while to figure out how to change the barchart from vertical to horizontal, and then to change its sorting order.
It was also hard to make the gradient legend for the map, at first I had several blocks of different colors but it wasn't very aesthetically pleasing.
 Another challenge was to actually update the graphs instead of deleting and redrawing them, I am so very glad I did figure out how to do this in  the end because it just looks so much better.

 A big challenge was the appearance of the website, I struggled with making it look better, bootstrap helped a lot with this, and a gradient background also made it look much nicer.

 In the end I decided to to implement a slider but keep the dropdown button to change the year because I did not have the time to properly implement that. Therefore, I am only showing part of the data (years 2001-2013) as the dropdown menu would be too long otherwise. If I had more time I would implement a slider for all the years so that you could see how production changed in the world over half a century.

 I changed the color scheme a couple of times, in the end I settled with InterpolateGnBu(green to blue) as this showed differences between countries better.
