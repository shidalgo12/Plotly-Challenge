function buildChart(chart){
    d3.json("data/samples.json").then((data) => {
    var chartSample = data.samples;
    var resultArray = chartSample.filter(object => object.id==chart);
    var result = resultArray[0];
    var sampleValues = result.sample_vaules.slice(0,10).reverse();
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
        margin: {t: 20, l:50, r: 50, b:20}
    }

    Plotly.newPlot("bar",barData,barLayout)
    });
}

function init(){ 
    var name = d3.select("#selDataset");


    d3.json("data/samples.json").then((data) => {

    var samNames = data.names;

    samNames.forEach((sample) => {
        name.append("option")
        .text(sample)
        .property("value", sample);
    });

    var firstSample = samNames[0];
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
    var samData = d3.select("#sample-metadata");
    samData.html("");
    Object.entries(result).forEach(([key, value]) => {
      samData.append("h6").text(`${key.toUpperCase()}: ${value}`);
});
    });
}

init()

function optionChanged(sample){
    mData(sample);
    buildChart(sample);
}


