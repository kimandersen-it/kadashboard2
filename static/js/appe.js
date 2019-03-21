

// Plot the default route once the page loads

function buildMetadata(sample) {

  //Complete the following function that builds the metadata panel
  
var defaultURL = "/metadata/" + sample;
console.log(defaultURL);

d3.json(defaultURL).then(function(data) {
 
 var sel = d3.select("#sample-metadata");
 sel.html("");
  
  Object.entries(data).forEach(function([key, value]) {
    
	console.log(key, value);  
	var cell = sel.append("h5");
      cell.text(key + ":" +  value);

});
});
}

function buildCharts(sample) {
	
var defaultURL2 = "/samples/" + sample;
console.log(defaultURL2);

d3.json(defaultURL2).then(function(data) {
		
	console.log(data);


//pie chart

var data1 = [{
  values: data.sample_values.slice(0, 11),
  labels: data.sample_values.slice(0, 11),
  type: 'pie'
}];

var layout = {
  height: 600,
  width: 600
};

console.log(data1);
Plotly.newPlot("pie", data1, layout);	


//bubble chart

var trace1 = {
  x: data.otu_ids,
  y: data.sample_values,
  
  mode: 'markers',
  marker: {
  size: data.sample_values,
  color: data.otu_ids,
  text: data.otu_labels
 }
};

var data2 = [trace1];
console.log(data2);
var layout = {
  title: 'Data Samples Bubble Chart',
  showlegend: true,
  height: 400,
  width: 1200
  
};

Plotly.newPlot('bubble', data2, layout);

});
}


function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
