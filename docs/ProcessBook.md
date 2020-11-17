# Project ProcessBook

**Github:** https://github.com/fmitch/dataviscourse-pr-western-water-use

**Github Pages (Hosted):** https://fmitch.github.io/dataviscourse-pr-western-water-use/


## Overview and Motivation
The purspose of this project is to effectively display data on water usage in the Utah and other areas of the Western United States. Temperature, precipitation, and water usage data is available for each county over time, providing perspective for past water usage and how usage has been affected by other factors. 
<!--- provide details on what final groupings and info we highlight --->

There is publicly available data on water usage for each state from the USGS. However this data is an overwhelming amount of information with no visual statistics or tools for interpretation. This data is difficult to read by people, since there are many complex factors such as different categories of water use, as well as different water needs in different climates. Visualizing water consumption against other variables can provide us insights into an area's condition. In addition, the USGS data does not provide any context or information about reckless water use in some of the nations driest areas.

Water is an essential resource that keeps depleting, and hence, it needs to be analyzed by not just the government but also the local people. Knowing how much water is consumed every year in one area and comparing it with other data such as precipitation, population, and agricultural or industrial output can help devise a solution to various water usage problems. For example, comparing water usage with temperature can help us know how global warming affects per capita water consumption. By knowing and understanding the data carefully, we can allocate resources and change policy to prevent a water crisis. Therefore, this project's motivation is to spread information in a visual form that is readable and understandable by the general public.

We also provide tools to compare many different variables, finding communities that are outlines in terms of water usage and climate. Our visualization will help users find if a county is particularly conservative in their water usage, possibly encouraging research into what methods this county uses to encourage responsible water usage. This visualization can be used to compare water usage between counties with similar climate and populations.

Although neither of us have a background in water conservation, this project was prompted by concerns about irresponsible water use along the Wasatch Front as well as other areas in Utah. Utah is the 2nd driest state in the US, but desert communities such as St. George use far more water per capita than other desert metro-areas such as Las Vegas and Tucson. As well, rampant water use along the Wasatch Front is entirely responsible for the rapidly lowering water levels in the Great Salt Lake, which would be catastrophic for air quality, wildlife, and local businesses.


## Related Work
There are several governmental organizations that provide data and high level visualizations into how water is used across the United States, but to our knowledge there is no fine-grain data visualiztion available to the public. Some of these data and visualization sources are as follows:

**USGS Water Use Data for Utah:** https://waterdata.usgs.gov/ut/nwis/water_use?
As we can see, USGS has a website which displays data for water consumption, but the data is represented using tables. This is difficult to read and understand. Hence, a better approach is required which visualizes the same data in a way which is easy to read and interpret.

**USGS Water Use Data:** https://labs.waterdata.usgs.gov/visualizations/water-use/index.html
This page povides water usage data for the United States but fails to provide details for each state. Additionally, it fails to provide a side-by-side comparison of different categories.

**US EPA:** https://www.epa.gov/watersense/how-we-use-water
US EPA just displays an article with a few visuals for a given year. There is no historical data displayed. It does not provide the trend over time for water usage.


## Project Objectives
This visualization is intended to present data about water consumption so that the user can observe trends in water usage, and potentially find ways that local communities could improve. With this project, we are specifically trying to answer the following questions for any user:

* How much water is consumed by a state or its counties?
* How does a state/county compare to others in terms of water usage?
* How does water usage vary as per the temperature and precipitation?
* What categories of water usage consume the most fresh water?
* Which category usage must be reduced to protect water resources?
* How to plan on saving water?
* Which areas to target for saving water?
* Which county/state has unused abundant resources that can help others?

Other objectives include:

* Learning about maps in visualization.
* Learning and understanding interactive and synchronized layout.
* Building and hosting a website on github.
* Learning and developing various types of visualization charts.


## Data and Processing
The main data for our project comes from the USGS survey of water usage (https://waterdata.usgs.gov/ut/nwis/water_use/). This data is available for every county in the continental US every 5 years. In particular, the data for Utah is available from 1985-2015.

However, this data has considerable problems in terms of consistency. Over 250 different data categories are defined for each county, but only a small fraction of these contain data. Over time, the reporting system for counties changed and measurements that were reported in one category were changed into another. We had to manually determine which categories to combine, which data was not available for each county, and which of the categories were relevant for our visualization.

Country precipitation and temperature data is available for every county in the continental US at ftp://ftp.ncdc.noaa.gov/pub/data/cirs/climdiv/. This data requires aggregation and processing to match the timeline of the water-use data. US County GEOJson data is available here: https://eric.clst.org/tech/usgeojson/

## Exploratory Data Analysis:
Intially, we used the USGS tabluar visualization to explore our Data. This helped us to search for various categories and check availability of data for counties. 

We were able to draw a few insights such as total water consumption and it's different categories. This was sufficient to start working on creating designs for visuals. Based on availability of data in each category, we filtered the data and then designed visuals accordingly.

<!--- provide details on How our visualization has changed as we made discoveries in the data --->

## Design Evolution

Design starts with a home page which displays the map of the western US, and a scatter plot (Optional feature) which displays water use, temperature and precipitation data for every state.
Selecting any state on the map will open a new page to show detailed analysis of the state. At present, we are just processing and displaying data for Utah. Other states will be added later during the course of the project.

In the state-specific page, data is displayed in 3 main views, all of which include multiple plots. A scatterplot with changeable axis data (including precipitation, temperature, total water use, and water use by category) is on the right, with a map of counties in Utah on the left, colored by the Y/X data from the scatterplot. A slider can be used to select the year.

In the time view, the data from the X-axis and Y-axis are plotted over time in two separate line plots. Here, the Y-axis is changable and X-axis is Time. In the focus view, a single county can be set as the point-of-focus, which shows the change in water use categories over time.

The scatter and time view plot data for all counties for a selected state. The focus-view plots data for a selected county on the map. Every view is synchronized, making a selection on one view will highlight the selection on other views. 

Instead of providing a table of buttons, we have implemented a double-click and single-click feature on the county map. Double-click helps to select point-of-interest and single clicks select the states that need to be compared. This comparison is highlighted in every view and an additional view is displayed which shows a stacked barchart of water use categories for every selected county.

Color can be used in several ways. First, to distinguish between data points on the map (counties) and to provide some context for the plotted data (Y/X). Separate colors are also used to distinguish between each category of water use.

Having these three views allows the visualization to be flexible. A user can compare different variables in the scatter plot, as well as view how those variables have changed over time in the time view. The focus view can be used to compare different counties, or how one particular county's water use has changed. 


## Evaluation:
So far we were able to answer a few question with respect to water consumption and its relation with other factors such as precipitation, temperature, etc. 

We are still working on creating different visuals such as additional line charts and stacked bar plots. These additional features will help understand and provide an informative visual of the data.
