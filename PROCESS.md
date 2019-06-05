# Process Book

## Day 1
I downloaded the data and decided to convert it into a JSON file. I had to decide which columns to keep and which to discard, I dropped the area code, area, item code, element code, unit, latitude, and longitude. The information contained in these columns wasn't relevant for my visualization.  

## Day 2
I had my first mentor meeting today. I decided to split up the data since the file is so big. I will have a JSON file for each country as the bar chart and pie chart only need data for one country. For the world map I will make a JSON file that contains all countries and the total food produced in each year.
I have also decided that for the years I will start with a dropdown button instead of a slider since a slider would load a lot of data while sliding whereas it will be quicker to just click on a year as that will only load the data for that specific year.

## Day 3
We had our first stand-up meeting this morning. My team mates thought my idea was clear. They did say a slider would be nicer than a dropdown for the years as a dropdown of 50 years would be very long. So I might start with a selection of 10 years. I also asked them for advice on my data format. I need to change the JSON files, right now they are ordered per food item and then per year, I would like them to be ordered per year and then per food item.
I have not been able to change the strucure but I have made a new file that contains total production per country per year. This loads into my map! 
