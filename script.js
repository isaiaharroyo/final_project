var gdpPromise = d3.csv("birth.csv")

gdpPromise.then(
function(data)
    {
        console.log("GDP",data)
        //setup(data);
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

var screen = {width:500,height:500}
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
    
    var xScale = d3.scaleLinear().domain([0,17]).range([0,width])
    var yScale = d3.scaleLinear().domain([0,10]).range([height,0])
    
    //var cScale = d3.scaleOrdinal(d3.schemeTableau10)
    
    var xAxis = d3.axisBottom(xScale)
    var yAxis = d3.axisLeft(yScale)
    d3.select("svg")
        .append("g")
        .classed("axis",true)
    
    d3.select(".axis")
        .append("g")
        .attr("id","xAxis")
        .attr("transform","translate("+margins.left+","+(margins.top+height)+")")
        .call(xAxis)
    
    d3.select(".axis")
        .append("g")
        .attr("id","yAxis")
        .attr("transform","translate(25,"+margins.top+")")
        .call(yAxis)
    
    drawArray(array2D,xScale,yScale)
}

var drawArray = function(array2D,xScale,yScale)
{
    var arrays = d3.select("#graph")
        .selectAll("g")
        .data(array2D)
        .enter()
        .append("g")
        .attr("fill","none")
        .attr("stroke","black")
        .attr("stroke-width",3)
    
    var lineGenerator = d3.line()
        .x(function(num,index){return xScale(index)})
        .y(function(num){return yScale(num)})
        .curve(d3.curveLinear)
    
    arrays.append("path")
        .datum(function(obj){return obj.arr})
        .attr("d",lineGenerator)
}

var thing = [
        {graph:"GDP", arr:[1.5,3.7,3.0,2.0,-1.0,2.9,-0.1,4.7,3.2,1.7,0.5,0.5,3.6,0.5,3.2,3.2,-1.1,5.5,5.0,2.3,3.2,3.0,1.3,0.1,2.0,1.9,2.2,2.0,2.3,2.2,3.2,3.5,2.5,3.5,2.9,1.1,3.1,2.0,1.9]}
    ]

setup(thing);
