# Process Book

## Day 1
I downloaded the data and decided to convert it into a JSON file. I had to decide which columns to keep and which to discard, I dropped the area code, area, item code, element code, unit, latitude, and longitude. The information contained in these columns wasn't relevant for my visualization.  

## Day 2
I had my first mentor meeting today. I decided to split up the data since the file is so big. I will have a JSON file for each country as the bar chart and pie chart only need data for one country. For the world map I will make a JSON file that contains all countries and the total food produced in each year.
I have also decided that for the years I will start with a dropdown button instead of a slider since a slider would load a lot of data while sliding whereas it will be quicker to just click on a year as that will only load the data for that specific year.

## Day 3
We had our first stand-up meeting this morning. My team mates thought my idea was clear. They did say a slider would be nicer than a dropdown for the years as a dropdown of 50 years would be very long. So I might start with a selection of 10 years. I also asked them for advice on my data format. I need to change the JSON files, right now they are ordered per food item and then per year, I would like them to be ordered per year and then per food item.
I have not been able to change the strucure but I have made a new file that contains total production per country per year. This loads into my map!

## Day 4
Today we started off with our standup meeting. Everyone made a to-do list. I still have to write the code for my barchart. And then add the buttons. I also have to make the graphs interactive, so that they can load a data file for each country.
Today I wrote the code for the barchart. I am still hardcoding the opening of the countries' data file, but it is looking good. Moreover, I tried calling the function barchart from my main file but that gave me an error, so right now I am calling the barchart function when the page loads.

## Day 5
My group gave me the advice to change the orientation of my barchart. It would be better to put the type of food on the y axis, as that would be easier to read. Furthermore, maybe I should change the color scheme as right now a specfic type of food seems to be linked to a country if the color is the same. I also got the advice to add a button to change the order of the data within the barchart. So perhaps ascending, descending and alphabetical.
![before](doc/PROCESS-bbff4312.png)
![after](doc/PROCESS-ad55025b.png)

## Day 6
I was able to link the piechart to the barchart. Now when you click on a country just the piechart appears, and then when clicking on one part of the piechart, the bargraph appears.
I also changed the color scheme, I wanted to use colors similar to those of crops.  
Furthemore, I added bootstrap to have a navigation bar at the top.
![before](doc/PROCESS-0460fda6.png)
![after](doc/PROCESS-f4856dfb.png)

## Day 7
Today I implemented a dropdown to change years. In the beginning some years did not work with the paletteScale for the fillcolor, this was because a minimum and maximum value was not calculated from the values, this was because there were still undefined values in the array. After removing those it worked. The dropdown now works and when a new year is selected, everything is reset.
![Dropdown](doc/PROCESS-88012e72.png)

There is just an issue with the standard option:

![emptymap](doc/PROCESS-83626a3f.png)

## Day 8
Today I changed the layout of my page so everything is easier to read.
![newlayout](doc/PROCESS-52f8c686.png)

I also added a new gradient legend!
We discussed our style.

## Day 9
Today I got as feedback that I should put my x axis of my barchart at the top, so I changed that. I also changed the hover opacity for each graph. Furthermore I centered the piechart & barhraph. I wanted them side by side but they are too big to fit and I do not want to reduce their size as that would make them less comprehensible.
![newbar](doc/PROCESS-b7c0cd7b.png)

## Day 10

I fixed China's problem! So the barchart wasn't ordering itself in an ascending manner whereas the data had been sorted. My mentor, Renske, figured out that the problem was that there were duplicate items in the dataset, for example sweet potatoes appeared 8 times. I removed all the duplicates and now it works perfectly.
![chinabefore](doc/PROCESS-957c02b3.png)
![chinaafter](doc/PROCESS-b4d3aa5d.png)

I also changed the banner a bit and added some text to my page.
![banner](doc/PROCESS-052ad215.png)

## Day 11

Up until now I was deleting the svg and redrawing a graph when a variable changed. I created an update function for my piechart where the data gets updated and there is a nice transition.
This week I want to do the same for updating the map, it would be nice to be able to slide over the years and see the colors in the map change.
I want to implement the button for ascending/descending order for the barchart.
I also want to make the website prettier, I do not really like the look of it but I am not sure what I want to change. Overall I am proud of what I have achieved so far

## Day 12

I also rewrote my barchart file to have it update and not delete and redraw. It has nice transitions now!

## Day 13

I fixed the hover of my datamap which was hovering too high above. The problem was that the div of the map had an absolute position and so the hoverinfo was taking a fixed position relative to the main page. When I changed the map's div to relative, the hover pop up worked fine. I also removed a bug that a pie chart appeared hen clicking on a country that had no data for that year but did have data for another year.

## Day 14

During the standup meeting we looked at each others' websites and gave feedback. We also looked at code.
I implemented a button today to change the sorting order of the barchart, it can be ascending or descending.
I also changed the background color as a gradient, it starts blue to mimic the sea below the world map. Then it gets green so that the lighter bars can be seen in the barchart.

## Day 15

Today I changed the colors a bit, by changing the color scheme used for the map, it is now easier to see discrepancies between countries.  I also cleaned up code and added comments here and there.
![newcolors](doc/PROCESS-b460a862.png)

## Day 16

I changed the legend of my piechart because when the data was very small for feed the label would not be positioned correctly. Now the legend is outside of the piechart. I also started writing my final report.
