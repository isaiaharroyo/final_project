var gdpPromise = d3.csv("birth.csv")

gdpPromise.then(
function(data)
    {
        console.log("GDP",data)
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

var screen = {width:400,height:500}
var margins = {top:10,right:50,bottom:50,left:50}

var setup = function(array2D)
{
    d3.select("svg")
        .attr("width",screen.width)
        .attr("height",screen.height)
        .append("g")
        .attr("id","graph")
        .attr("transform","translate("+margins.left+","+margins.top+")");
    
    var width = screen.width - margins.left - margins.right;
    var height = screen.height - margins.top - margins.bottom;
    
    var xScale
}