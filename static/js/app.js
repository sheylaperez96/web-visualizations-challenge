
// function that populates the metadata
function demoInfo(sample)
{    
    // use d3 to get the data
    url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
    d3.json(url).then(function(data){
        let metaData = data.metadata;
        let result = metaData.filter(sampleResult => sampleResult.id == sample);
        let resultData = result[0];

        // clear metadata out
        d3.select("#sample-metadata").html("");

        Object.entries(resultData).forEach(([key, value]) => {
            d3.select("#sample-metadata")
                .append("h5").text(`${key}: ${value}`);
        });
    });
}

// function to build chart
function buildBarChart(sample)
{
    url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
    d3.json(url).then(function(data){
        let sampleData = data.samples;
        let result = sampleData.filter(sampleResult => sampleResult.id == sample);
        let resultData = result[0];

        // get x and y values for the plot  
        let otu_ids = resultData.otu_ids;
        let otu_labels = resultData.otu_labels;
        let sample_values = resultData.sample_values;

        // build chart
        let yaxis = otu_ids.slice(0, 10).map(id => `OTU ${id}`);
        let xaxis = sample_values.slice(0, 10);
        let labels = otu_labels.slice(0, 10);

        // plotly
        let barChart = {
            y: yaxis.reverse(),
            x: xaxis.reverse(),
            text: labels,
            type: "bar", 
            orientation: "h"
        }

        let layout = {
            title: "Top 10 Belly Button Bacteria"
        }

        Plotly.newPlot("bar", [barChart], layout);
    });
}

// build bubble chart
function buildBubbleChart(sample)
{
    url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
    d3.json(url).then(function(data){
        let sampleData = data.samples;
        let result = sampleData.filter(sampleResult => sampleResult.id == sample);
        let resultData = result[0];

        // get x and y values for the plot  
        let otu_ids = resultData.otu_ids;
        let otu_labels = resultData.otu_labels;
        let sample_values = resultData.sample_values;

         // plotly
         let bubbleChart = {
            y: sample_values,
            x: otu_ids,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }

        };

        let layout = {
            title: "Bacteria Cultures Per Sample",
            hovermode: "closest",
            xaxis: {title: "OTU ID"}
        };

        Plotly.newPlot("bubble", [bubbleChart], layout);
    });
}



// createfunction that initializes the dashboard
function initialize()
{
    // access dropdown selector
    let select = d3.select("#selDataset");

    // use d3 to get the data
    url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
    d3.json(url).then(function(data){
        let sampleNames = data.names;

        // use a foreach in order to create options for each sample in the selector
        sampleNames.forEach((sample) => {
            select.append("option")
            .text(sample)
            .property("value", sample);
        });

         // pass the first sample and call function to build metadata
        let sample1 = sampleNames[0];
        demoInfo(sample1);
        buildBarChart(sample1);
        buildBubbleChart(sample1);
    });
}

// function that updates the dashboard
function optionChanged(item)
{
    demoInfo(item);
    buildBarChart(item);
    buildBubbleChart(item);
}

// call initialize function
initialize();

