function buildChart(chart){
    d3.json("data/samples.json").then((data) => {
    var chartSample = data.samples;
    var resultArray = chartSample.filter(object => object.id===chart);
    var result = resultArray[0];
    // Sort the array in ascending order using an arrow function (ERROR: result.sort is not a function at app.js:7)
    // var sortedDescending = result.sort(function sortFunction(a, b) {
    //     return b - a;
    // });
    // // Slice the first 10 elements of the sortedDescendingarray, assign to a variable
    // var sampleValues = result.slice(0, 10);
    // var sampleValues = result.sample_vaules.slice(0,10).reverse();
    // var sampleValues = result.sample_vaules.sort((a, b) => b - a);;
    // var sampleValues = sortedValues.slice(0, 10);
    var sampleValues = result.sample_vaules;
    var otuID = result.otu_ids;
    var otuLabel = result.otu_labels;

    var barData = [{
        x: sampleValues,
        y: otuID.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
        text: otuLabel.slice(0,10).reverse(),
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

    Plotly.newPlot("bar",barData,barLayout)
    });
}

function buildBubChart(bubChart){
    d3.json("data/samples.json").then((data) => {
    var bubChartSample = data.samples;
    var bubResultArray = bubChartSample.filter(object => object.id===bubChart);
    var bubResult = bubResultArray[0];
    var bubSampleValues = bubResult.sample_vaules;
    var bubOtuID = bubResult.otu_ids;
    var bubOtuLabel = bubResult.otu_labels;

    var bubData = [{
        x: bubOtuID,
        y: bubSampleValues,
        mode: "markers",
        text: bubOtuLabel,
        marker: {
            color: bubOtuID,
            size: bubSampleValues
        }
    }];

    var bubLayout = {
        yaxis: { automargin: true },
        xaxis: {title: "OTU ID"},
    };

    Plotly.newPlot("bubble",bubData,bubLayout);

    });
}

function init(){ 
    var name = d3.select("#selDataset");

    d3.json("data/samples.json").then((data) => {

        var sampleNames = data.names;

        sampleNames.forEach((sample) => {
            name.append("option")
            .text(sample)
            .property("value", sample);
        });

        var firstSample = sampleNames[0];
        mData(firstSample);
        
        buildChart(firstSample);

        console.log(data);
    });
}

function mData(sample){
    d3.json("data/samples.json").then((data) => {
        var metaData = data.metadata;
        var resultArray = metaData.filter(object => object.id==sample);
        var result = resultArray[0];
        var sampleData = d3.select("#sample-metadata");
        sampleData.html("");
        Object.entries(result).forEach(([key, value]) => {
            sampleData.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });
    });
}

init()

function optionChanged(sample){
    mData(sample);
    buildChart(sample);
}

