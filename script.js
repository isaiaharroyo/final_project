var gdpPromise = d3.csv("test.csv")

gdpPromise.then(
function(data)
    {
        console.log("GDP",data)
        setup(data);
    },
function(err)
    {
        console.log(err);
    })

var getChangeData = function(data)
{
    return data.map(getChange);
}

var getChange = function(gdp)
{
    return gdp.CHANGE; 
}

var getCrimeRateData = function(data)
{
    return data.map(getCrimeRate);
}

var getCrimeRate = function(gdp)
{
    return gdp.CRIMERATE;
}

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

var screen = {width:1500,height:600}
var margins = {top:10,right:50,bottom:50,left:50}

var setup = function(array2D)
{
    console.log(array2D)
    d3.select("svg")
        .attr("width",screen.width)
        .attr("height",screen.height)
        .append("g")
        .attr("id","graph")
        .attr("transform","translate("+margins.left+","+margins.top+")");
    
    var width = screen.width - margins.left - margins.right;
    var height = screen.height - margins.top - margins.bottom;
    
    var xScale = d3.scaleLinear().domain([0,11]).range([0,width])
    var yScale = d3.scaleLinear().domain([-3,1500000]).range([height,0])
    
    //var cScale = d3.scaleOrdinal(d3.schemeTableau10)
    
    var xAxis = d3.axisBottom(xScale)
    var yAxis = d3.axisLeft(yScale)
    
    d3.select("svg")
        .append("g")
        .classed("axis",true)
    
    d3.select(".axis")
        .append("g")
        .attr("id","xAxis")
        .attr("transform","translate("+(margins.left-5)+","+(margins.top+(height-231))+")")
        .call(xAxis)
    
    d3.select(".axis")
        .append("g")
        .attr("id","yAxis")
        .attr("transform","translate(45,"+margins.top+")")
        .call(yAxis)
    
    d3.select("body").selectAll("button")
        .data(array2D)
        .enter()
        .append("button")
        .attr("id","CrimeRate")
        .text("Compare Crime Rates")
        /*.on("click",function(d)
            {
                console.log(getCrimeRateData(array2D));
                return drawArray(getCrimeRateData(array2D),xScale,yScale)
            })
    
    //console.log("help",getChangeData(array2D))
    
    /* d3.select("#graph")
        .selectAll("circle")
        .data(getChangeData(array2D))
        .enter()
        .append("circle")
        .on("mouseover",function(stat)
            {
                console.log(stat);
                /*d3.select("#tooltip")
                    .style("left",(d3.event.pageX+20)+"px")
                    .style("top",(d3.event.pageY-25)+"px")
                    .text("("+stat.index+","+stat.arr+")")
                    .classed("hidden",false)
            })
        .on("mouseout",function()
            {
                d3.select("#tooltip")
                    .classed("hidden",true)
            }) */
    
    d3.select("#graph")
            .append("path")
    
    drawArray(getChangeData(array2D),xScale,yScale)
    drawArray(getCrimeRateData(array2D),xScale,yScale)
}

var drawArray = function(data,xScale,yScale)
{   
    /*var everything = getChangeData(array2D)
    
    console.log(everything);*/
    
    var arrays = d3.select("#graph")
        .selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr("fill","none")
        .attr("stroke","black")
        .attr("stroke-width",2)

    var lineGenerator = d3.line()
        .x(function(num,index)
        {
            return xScale(index)
        })
        .y(function(num){
            return yScale(num)
        })
        .curve(d3.curveNatural)
    
    arrays.datum(data)
        .append("path")
        .attr("d",lineGenerator)
}

