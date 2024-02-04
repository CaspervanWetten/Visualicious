# Visualicious: Meaningful Vizualization Group 1

This is the repository for the Visualicious project, a project created for the course Meaningful Visualisation.

<style>img{width:10px;height:10px;}</style>

---

## Project aims

This project aims to be a crime [dashboard](https://ieeexplore.ieee.org/abstract/document/8443395/) for the country of the Netherlands. It implores the users to explore the country, first province by province and later munincipality by munincipality, and provides a variety of information on the crimes in this area, as well as providing the option to cross-reference these crime statistics with a few socio-economic factors to paint a more comprehensinve picture of the selected region.

This project limits itself to theft and theft-adjacent crimes, such as vehicle theft, pickpockets and robbery (to name a few). It aims to be an interactive, drill-down experience in which the user themselves can select what they want to learn.

## Visualization explanation

The dashboard employs three distinct, different visualizations. All of which are interactive and respond responsively and automagically to the different filters one can apply using the filter bar.

The Choropleth (the map on the left-hand side of the screen) shows the amount of times the selected crime has been committed between the selected dates within that specific area. A darker red = more of the crime. So Amsterdam is a very dark red (meaning loads of the selected crime) while Landsmeer is a much whiter red (less crime).
Hovering over any muninicipality shows a tooltip with the exact numbers.

This choropleth is enriched with icons. Upon clicking on a municipality, the map zooms in, and an icon appears. Each icon encodes the most frequent crime in that region, below is a short breakdown of which icon represents which image:
House 							= Breakin into a house (i.e. a place someone permenantly lives in)
Car in house						= Breakin into a garage/shed
Guy with cowboy hat and car 		= Theft from/from within a motorized vehicle
Steering wheel + lock				= Theft of a motorized vehicle
Guy with bike						= Theft of a non-motorized vehicle (i.e. bikes)
Guy with money and woman with bag 	= Pickpockets
Train and bus 						= Theft from/of/within public transport vehicles
Guy with moustache and striped shirt	= Street Robbery
Gun 							= Robbery on someplace other than the street
Boat								= Theft on water
Guy carrying box with cap			= Breakin into a business
Man on a computer screen			= Breakin into a store


The bar chart on the right hand side of the screen visualizes the summed frequency of the selected crimes over the selected date range. A higher bar = more crimes. Furthermore, a green bar indicates that less of the selected crimes were committed than the previous bar while a red bar indicates that more (or the same amount) of the selected crimes have been committed in that time period when compared to the previous bar.
To give an example, our data indicates that exactly 370 overvals have been committed in 2012 in Bronckhorst. There was exactly 409 overvallen in Bronckhorst in 2013. 370 < 409, thus the 2013 bar is red. However, in 2014 there were exactly 362 overvallen, 409 > 362, thus that bar is green.
Hovering over any bar shows a tooltip with the exact numbers.

The treemap, the squares on the right hand side of your screen, is a visual representation of the relative frequency between the selected crimes over the selected date range. A green square means the crime is classified as a "class 1" crime, i.e. petty theft. A yellow square is a "class 2" crime, i.e. petty theft that disturbs the public order or undermines public authority. Note that these classes were defined by our data source (the CBS) while the allocated icons were created by us, with some creative freedom.
The sizes of the squares relate to the frequency of that crime. A bigger square = more of said crime than it's smaller counterparts.
To give an example, when we select "all crimes" over a period of December 2022->December 2023 in the entirety of NL the treemap shows us that theft of non or small motorized vehicles (such as bikes) was the most frequent crime. This is a class 1 crime, so the square is green. This square is by far the biggest, so this is by far the most common form of theft. The second biggest square, store-theft, is yellow, meaning it was a crime against public order.
Hovering over any square shows a tooltip with the exact numbers.

## Running the project

The entire project is included in this repository. The project can be found by running the ``index.html`` on the localhost and navigating to the correct address. This can be done through a variety of ways, but we recommend using the ``five server`` vscode extension.

1. Open this project with visual studio code (the blue icon, if yours is purple you are using Visual Studio, which is a different program)
2. Navigate to the extensions pane by clicking the extensions button on the left-hand side of your screen. It looks like a tetris square, with the top right block seperated.
3. Search for and install the ``five server`` extension using the search bar
   Note: Its full name is ``Live server (five server)`` which, depending on the size of the screen, gets cut off to ``Live server (...`` Its icon looks like a purple 5, with two purple wifi-stripes next to it
4. Once installed, restart visual studio code
5. Once restarted, open the file navigation pane on the left-hand side of the screen. It can be found by clicking the top button in the navigation bar, or by using the ``ctrl+shift+E`` shortcut on your keyboard
6. Navigate to the Code/webapp/ folder
7. Right-click on the ``index.html`` file and select ``open with five server``
8. If everything was done well, vscode will automatically open your default browser and open the dashboard.
9. For support, contact us using the github bug-report function, or by email c.o.vanwetten@students.uu.nl

## Project outline

This project is structured as follows:

```
Visualicious/
|-Code/
|-	- data wrangling/
|-	-	- archive/
|-	- webapp/
|-	-	- css/
|-	-	- js/
|-Data/
|-Documentation/
|-	- Data understanding/
|-	- Evaluation/
|- 	- Infovis design/
|-	- Sketches/
|- LICENSE
|- ProjectVideo_Visualicious
|- README.MD
```

The code/ folder holds all the code necessary for this project to work, including the python scripts used for data cleaning and processing (data wrangling/), with the old .csv files still saved in the archive/ folder. The webapp itself is in the webapp/ folder, with all the css and js seperated in their own css/ and js/ folders.

Secondly, the data/ folder holds all the data for this project, including the crimes.tsv, as well as the munincipualties.geojson, the provinces.geojson and the outline.geojson, which are all used to draw the map. Finally, the data/ folder holds the education.csv and SES-WOA.csv, which are used for the education and SES-WOA score charts respectively.

Furthermore, the Documentation/ folder holds all the documentation for this project. Including screenshots of the steps we took to understand the data better (Data understanding/), the results of the Evaluation performed on {TODO VOEG DATUM TOE} (Evaluation/), the initial hi-fi prototype and storyboards of the data story that we wanted to tell (Infovis design/). Lastly, the initial lo-fi sketches made during the brainstorming of this project can be found in the Sketches/ folder. Do note that this folder has a variety of sketches that are *not* in the final project. This is on purpose. We pruposefully over-drew and designed *too many* sketches, with the goal of selecting the best, most interesting and most novel visualizations later on in the proces.

Finally, the LICENSE outlines the terms and conditions of our GNU General Public License, the ProjectVideo_Visualicious is a video presentation of this project, and README.md is the file you are currently reading.

## Credits

This project was conceived of and created by:

Reinout Vlaanderen
Bjorn Koemans
Casper van Wetten
Florence Herrent
Maureen van Veen

TODO: Alfabetische volgorde

Special thanks go to [Michael Behrisch](http://michael.behrisch.info/) and [Başak Oral](https://basakoral.github.io/) for guiding us through this process, and to [Evanthia Dimara](https://www.evanthiadimara.com/home) for providing the lectures on this topic.
