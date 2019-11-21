var gdpPromise = d3.csv("birth.csv")

gdpPromise.then(
function(data)
    {
        console.log("GDP",data)
        drawGraph(data)
    },
function(err)
    {
        console.log(err);
    })

var drawGraph = function(data)
{
    console.log(data[0].CHANGE)
    
    var horizonChart = d3.horizonChart()
        .height(80)
        //.title(data[280].DATE)
        .colors(['#313695', '#4575b4', '#74add1', '#abd9e9', '#fee090', '#fdae61', '#f46d43', '#d73027']);

    var horizons = d3.select('body').selectAll('.horizon')
        .data(data)
        .enter()
        .append('div')
        .attr('class', 'horizon')
        .each(horizonChart);
}