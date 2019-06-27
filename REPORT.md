# Final Report
Sophie Stiekema, 10992499
Minor Programmeren, Universiteit van Amsterdam

[Website](https://sophieclaire.github.io/project/code/HTML/index.html)
[Video](https://www.youtube.com/watch?v=o0iD2iGQh24&feature=youtu.be)
## Description
My data visualization starts with a world map showing how much food each country produces in the year 2013. A darker color means a higher production. When clicking on a country a piechart appears showing what percentage of the food produced is actually used for humans (food), and which percentage is used for animals (feed). The user can then click on one of the two slices of the pie and a barchart will appear showing the exact amount of each food or feed element produced by that country in that year. The bar chart can be sorted in ascending or descending order. The year can be changed via a dropdown button at the top of the page.
![Screenshot](doc/REPORT-6be0a26a.png)

## Technical Design
Clearly describe the technical design: how is the functionality implemented in your code? This should be like your DESIGN.md but updated to reflect the final application.

First, give a high level overview, which helps us navigate and understand the total of your code (which components are there?). Second, go into detail, and describe the modules/classes (apps) files/functions (data) and how they relate.


All data files are contained within the data folder. All pictures are contained in the doc folder. All code is contained within the code folder, this one contains three folders: HTML, JS and CSS which each contain respective code files.

There are 3 HTML files, one for each page.
The most important one is the index.html file, this one displays all the visualizations. The data file provides more information on the data I have used and the about file talks about the problem and gives a suggestion to the reader.

There are 5 JS files, one for each graph.

### main.js
The main.js file sets the initial year (2013). It contains two functions.
- updateyear: updates the data for each year when the dropdown button is used.
- startfunction: fetches the data and calls the transformation function and then the function that draws the worldmap.

### map.js
The map.js file contains two functions.
- transformdata: prepares the data for the world map, this function pairs up countries from the world map dataset with countries from my food production dataset. It also creates a palette scale with a sequential color scale.
- drawmap: draws the worldmap and calls the function that draws its legend.

### maplegend.js
The maplegend.js file contains just one function.
- drawlegend: it draws the legend for the worldmap. It creates horizontal gradient bar with an x-axis to explain what the colors of the worldmap mean.

### piechart.js
The piechart.js file draws the piechart when the user clicks on a country in the worldmap. This file contains four functions.
- drawpiechart: it is called in the map.js file and fetches the data for the specific country, it counts the amount of food or feed produced and converts it into a percentage of total production.
- newpiechart: draws a new piechart if none has been made yet
- updatepiechart: updates this piechart
- arctween: is used during the transitions when updating the pie chart for new arcs

### barchart.js
The barchart.js file draws a barchart when the user clicks on a slice of the pie.  This file contains four functions.
- changeorder: it is called when the button is pressed and keeps track of a counter that knows whether to change the barchart order to ascending or descending
- drawbarchart: it is called when a slice of the pie is clicked. It sorts the data in ascending or descending order, depending on the whether the counter is even or odd. Then it fills up the dataset dictionary with production amounts for each food or feed item for that year. Then it decided whether to draw a new barchart or to update an existing one
- newbarchart: it creates the svg for a new barchart and initializes its axes
- updatebarchart: it draws (new) bars

There is only one CSS file, linked.css, setting the style.

There are several markdown files
- DESIGN.md: contains my initial design ideas.
- PROCESS.md: the process book, covering what I have done each day
- PROPOSAL.md: initial proposal
- README.md: Brief explanation and listing of external Sources
- REPORT.md: this file
- STYLE.md: JS style guide

## Challenges & Changes

One challenge was to get the data in the right format. I first converted it from a CSV to JSON format, it took some error and trial to get the right format. I also had to split it in separate files for each country since the file was so big.

Then it took me a while to figure out how to change the barchart from vertical to horizontal, and then to change its sorting order.

It was also hard to make the gradient legend for the map, at first I had several blocks of different colors but it wasn't very aesthetically pleasing.

Another challenge was to actually update the graphs instead of deleting and redrawing them, I am so very glad I did figure out how to do this in  the end because it just looks so much better.

A big challenge was the appearance of the website, I struggled with making it look better, bootstrap helped a lot with this, and a gradient background also made it look much nicer.

In the end I decided not to implement a slider but keep the dropdown button to change the year because I did not have the time to properly implement that. Therefore, I am only showing part of the data (years 2001-2013) as the dropdown menu would be too long otherwise. If I had more time I would implement a slider for all the years so that you could see how production changed in the world over half a century.

I changed the color scheme a couple of times, in the end I settled with InterpolateGnBu(green to blue) as this provided more hues and thus showed differences between countries better.
