function buildPlots() {

  d3.json("samples.json").then (data =>{
    var trace1 = {
        x: data.samples[0].sample_values.slice(0,10).reverse(),
        y: data.samples[0].otu_ids.slice(0, 10).reverse().map(d => "OTU " + d),
        text: data.samples[0].otu_labels.slice(0,10),
        type:"bar",
        orientation: "h",
    };
    
    var data1 = [trace1];

    var layout1 = {
        title: "Top 10 OTU",
    };

    Plotly.newPlot("bar", data1, layout1);

    var trace2 = {
        x: data.samples[0].otu_ids,
        y: data.samples[0].sample_values,
        mode: "markers",
        marker: {
            size: data.samples[0].sample_values,
        },
        text:  data.samples[0].otu_labels
    };

    var layout2 = {
        xaxis:{title: "OTU ID"},
        height: 600,
        width: 1200
    };

     var data2 = [trace2];
    
     Plotly.newPlot("bubble", data2, layout2); 
  
  });
}  

function getMetadata(subjectid) {
  d3.json("samples.json").then((sample)=> {
      var metadata = sample.metadata;
     var result = metadata.filter(meta => meta.id.toString() === subjectid)[0];
     var metadatahtml = d3.select("#sample-metadata");
     metadatahtml.html("");
      Object.entries(result).forEach((item) => {   
        metadatahtml.append("div").text(item[0] + ": " + item[1] + "\n");    
      });
  });
}

function optionChanged(subjectid) {
  getMetadata(subjectid);
}

function init() {
  var testsubject = d3.select("#selDataset");
  d3.json("samples.json").then((sample)=> {
    sample.names.forEach(function(name) {
          testsubject
            .append("option")
            .property("value", name)
            .text(name);
      });
      getMetadata(sample.names[0]);
      buildPlots();
  });
}

init();