# Plotly Visualizations

## Background

An interactive dashboard built to explore a .json file, identifying the biodiversity among microbes that colonize human navels.

The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

### Read Data via D3

A D3, JavaScript library was used to read and visualize multiple arrays of data sourced through a .json file and interactively displayed in an .html file.  Value variables were created and inserted into plotting codes to build a bar and bubble chart.

### Interactive Dropdown Menu and Data Panel

An html dropdown menu was developed to hold a list of Subject IDs and resopnsively adjust chart values upon selection.  A separate data array was read to pull the selected patient's demographic information and rendered into an html div tag.

![](Images/DropDown.png)
 
### Bar Chart
Visualized data was sorted and sliced in JavaScript coding to sort values in decsending order and solely display the top 10 OTUs found for a specific Subject ID. Hovertext was added to bars to provide the OTU_Labels.  Chart layout coding was used to add a title and set the size of the chart.  Lastly, all Bar Chart data was rendered into a correlated div tag in the .html file to be displayed in the localhost. 

![](Images/PlotlyBar.png)


### Bubble Chart
Chart values variables used to establish X & Y values (x: otu_ids, y: sample_values).  Sample_value totals reflected in size and otu_ids marked by color.  Otu_labels added as hovertext. All Bar Chart data again rendered into a correlated div tag in the .html file to be displayed in the localhost.

![](Images/PlotlyBubbleChart.png)







Display the sample metadata, i.e., an individual's demographic information.


Display each key-value pair from the metadata JSON object somewhere on the page.


Update all of the plots any time that a new sample is selected.