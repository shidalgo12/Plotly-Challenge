function buildCharts(chart){
    // Read json data
    d3.json("data/samples.json").then((data) => {
    var chartSample = data.samples; //filter for samples array in .json
    console.log(chartSample);
    var resultArray = chartSample.filter(object => object.id===chart); //object holds all chart samplevalues - .id filters for id values in array
    console.log(resultArray);
    var result = resultArray[0]; //start from [0] index beginning of resultArray= 1st element of dropdown
    console.log(result);


    // Create chart value variables
    var sampleValues = result.sample_values; //filter from result array for sample_values key
    var otuID = result.otu_ids;
    var otuLabel = result.otu_labels;

    // Build Bar Chart
    
    var barData = [{
        x: sampleValues.slice(0, 10).reverse(), //slice selects specific # items of list, reverse lists in descending order
        y: otuID.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
        text: otuLabel.slice(0, 10).reverse(), //hover label information
        type: "bar",
        orientation: "h" //horizontal bar
    }];

    var barLayout = {
        title: "OTU Sample Values",
        margin: {
            l: 75,
            r: 50,
            b: 50,
            t: 50,
            pad: 4
        },
        yaxis: { automargin: true },
        width: 750,
        height: 390
    }

    // Render the plot to the div tag with id "bar"
    Plotly.newPlot("bar",barData,barLayout);

    // Build Bubble Chart
    var bubbleData = [{
        x: otuID,
        y: sampleValues,
        text: otuLabel,
        mode: "markers", //bubble chart
        marker: {
            size: sampleValues,
            color: otuID,
            colorscale: "Earth"
        }
    }];

    var bubbleLayout = {
        yaxis: { automargin: true },
        xaxis: {title: "OTU ID"},
        hovermode: "closest",
        margin: {
            l: 75,
            r: 50,
            b: 50,
            t: 50,
            pad: 4
        }
    };

    // Render the plot to the div tag with id "bubble"
    Plotly.newPlot("bubble",bubbleData,bubbleLayout);
    });
}

function init(){ //"init" can be any given function name
    // Orient json "name" key with html <div> id "#selDataset"
    var name = d3.select("#selDataset");

    //Add id's into dropdown menu
    //read .json
    d3.json("data/samples.json").then((data) => {

        var sampleNames = data.names;
        console.log(sampleNames);
        // For loop to append in dropdown menu
        sampleNames.forEach((sample) => {
            name.append("option") //add name value to dropdown menu
            .text(sample) //format to text
            .property("value", sample); //property value = "sample" from beginning of for loop
        });

        var firstSample = sampleNames[0]; //select first element from index [0]
        console.log(firstSample);
        metaData(firstSample); // call function name correlated to firstSample variable
        buildCharts(firstSample); // call funtion to create chart by [0] index id

        console.log(data);
    });
}

function metaData(sample){
    //Read .json and create variables of data to pull from array
    d3.json("data/samples.json").then((data) => {
        var metaData = data.metadata;
        var resultArray = metaData.filter(object => object.id==sample); //filter data by sample id
        var result = resultArray[0]; // providing a dictionary of all elements of filtered id
        var sampleData = d3.select("#sample-metadata"); 
        sampleData.html(""); //clear previous value

        // Use `Object.entries` to add each key and value pair to the panel
        Object.entries(result).forEach(([key, value]) => {
            sampleData.append("h6").text(`${key.toUpperCase()}: ${value}`); //h6 = text size
        });
    });
}

init()

// call metadata and buildchart functions again when id is changed
function optionChanged(sample){
    metaData(sample); //displays new panel information
    buildCharts(sample); //displays new chart 
}