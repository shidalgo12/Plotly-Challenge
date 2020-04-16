function buildCharts(chart){
    // Read json data
    d3.json("data/samples.json").then((data) => {
    var chartSample = data.samples;
    var resultArray = chartSample.filter(object => object.id===chart);
    var result = resultArray[0];
        
    // Create chart value variables
    var sampleValues = result.sample_values;
    var otuID = result.otu_ids;
    var otuLabel = result.otu_labels;

    // Build Bar Chart
    
    var barData = [{
        x: sampleValues.slice(0, 10).reverse(),
        y: otuID.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
        text: otuLabel.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h"
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
        mode: "markers",
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

function init(){ 
    // Orient json "name" key with html <div> id "#selDataset"
    var name = d3.select("#selDataset");

    d3.json("data/samples.json").then((data) => {

        var sampleNames = data.names;

        sampleNames.forEach((sample) => {
            name.append("option")
            .text(sample)
            .property("value", sample);
        });

        var firstSample = sampleNames[0];
        metaData(firstSample);
        buildCharts(firstSample);

        console.log(data);
    });
}

function metaData(sample){
    d3.json("data/samples.json").then((data) => {
        var metaData = data.metadata;
        var resultArray = metaData.filter(object => object.id==sample);
        var result = resultArray[0];
        var sampleData = d3.select("#sample-metadata");
        sampleData.html("");

        // Use `Object.entries` to add each key and value pair to the panel
        Object.entries(result).forEach(([key, value]) => {
            sampleData.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });
    });
}

init()

function optionChanged(sample){
    metaData(sample);
    buildCharts(sample);
}