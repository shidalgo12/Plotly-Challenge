# Plotly Visualization

## Background

An interactive dashboard built to explore a .json file, identifying the biodiversity among microbes that colonize human navels.

The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

### Read Data via D3

A D3, JavaScript library was used to read and visualize data sourced through a .json file and interactively displayed in an .html file.  Value variables were created and inserted into plotting codes to build a bar and bubble chart.

### Interactive Dropdown Menu

An html dropdown menu was developed to hold a list of Subject IDs and resopnsively adjust chart values upon selection.  
 
### Bar Chart
Visualized data was sorted and sliced in JavaScript coding to sort values in decsending order and solely display the top 10 OTUs found for a specific individual. Hovertext was added to bars to provide the OTU_Labels.  Chart layout coding was used to add a title and set the size of the chart.  Lastly, all Bar Chart data was rendered into a correlated div tag in the .html file to be displayed in the localhost. 

![](Images/PlotlyBar.png)


### Bubble Chart


![](Images/PlotlyBubbleChart.png)




Use otu_ids for the x values.


Use sample_values for the y values.


Use sample_values for the marker size.


Use otu_ids for the marker colors.


Use otu_labels for the text values.


Display the sample metadata, i.e., an individual's demographic information.


Display each key-value pair from the metadata JSON object somewhere on the page.


Update all of the plots any time that a new sample is selected.