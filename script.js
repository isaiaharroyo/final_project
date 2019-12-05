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

var screen = {width:800,height:600}
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
    
    var xScale = d3.scaleLinear().domain([0,10]).range([0,width])
    var yScale = d3.scaleLinear().domain([-11,8]).range([height,0])
    
    var xScale2 = d3.scaleLinear().domain(d3.extent(array2D,function(d){return d.YEAR;})).range([0,width])
        
    var xAxis = d3.axisBottom(xScale2)
    var yAxis = d3.axisLeft(yScale)
    
    d3.select("svg")
        .append("g")
        .classed("axis",true)
    
    d3.select(".axis")
        .append("g")
        .attr("id","xAxis")
        .attr("transform","translate("+(margins.left+8)+","+(margins.top+(height-312.6))+")")
        .call(xAxis)
    
    d3.select(".axis")
        .append("g")
        .attr("id","yAxis")
        .attr("transform","translate(45,"+margins.top+")")
        .call(yAxis)
    
    d3.select("svg")
            .append("text")
            .attr("transform", "translate("+(width/2+90) + "," + (height - 269) + ")")
            .style("text-anchor", "middle")
            .text("Years")
        
        d3.select("svg")
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0-margins.left+7)
            .attr("x", 0-((height/2)))
            .attr("dy", "4em")
            .style("text-anchor", "middle")
            .text("Percentage (%)")
    
    d3.select("#graph")
        .append("path")     
    
    drawArray(getChangeData(array2D),xScale,yScale,"blue");
    
    d3.select("#tooltip").append("button")
        .text("Change in Immigrant Population")
        .on("click",function()
            {
                d3.select("#graph").selectAll("g").remove();
                drawArray(getChangeData(array2D),xScale,yScale,"blue");
            })
    
    d3.select("#tooltip").append("button")
        .text("Change in Gross Domestic Product (GDP)")
        .on("click",function()
            {
                d3.select("#graph").selectAll("g").remove();
                drawArray(getGDPData(array2D),xScale,yScale,"green");
            })
    
    d3.select("#tooltip").append("button")
        .text("Change in Violent Crimes in U.S.")
        .on("click",function()
            {
                d3.select("#graph").selectAll("g").remove();
                drawArray(getViolCrimData(array2D),xScale,yScale,"#c4160d");
            })

    d3.select("#tooltip").append("button")
        .text("Change in Robberies in U.S.")
        .on("click",function()
            {
                d3.select("#graph").selectAll("g").remove();
                drawArray(getRobData(array2D),xScale,yScale,"red");
            })
    
    d3.select("#tooltip").append("button")
        .text("Change in Aggressive Assaults in U.S.")
        .on("click",function()
            {
                d3.select("#graph").selectAll("g").remove();
                drawArray(getAggAssaData(array2D),xScale,yScale,"#f0661b");
            })
    
    d3.select("#tooltip").append("button")
        .text("Change in Burglaries in U.S.")
        .on("click",function()
            {
                d3.select("#graph").selectAll("g").remove();
                drawArray(getBurgData(array2D),xScale,yScale,"#fa8e13");
            })
}

var drawArray = function(data,xScale,yScale,color)
{       
    var arrays = d3.select("#graph")
        .selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr("fill","none")
        .attr("stroke",color)
        .attr("stroke-width",2)

    var lineGenerator = d3.line()
        .x(function(num,index)
        {
            return xScale(index)
        })
        .y(function(num){
            return yScale(num)
        })
        .curve(d3.curveLinear)
    
    arrays.datum(data)
        .append("path")
        .attr("d",lineGenerator)
} 

var getChangeData = function(data)
{
    return data.map(getChange);
}

var getChange = function(data)
{
    return data.ChgImmg; 
}

var getGDPData = function(data)
{
    return data.map(getGDP);
}

var getGDP = function(data)
{
    return data.ChgGdp; 
}

var getViolCrimData = function(data)
{
    return data.map(getViolCrim);
}

var getViolCrim = function(data)
{
    return data.ViolCrim; 
}

var getRobData = function(data)
{
    return data.map(getRob);
}

var getRob = function(data)
{
    return data.Rob; 
}

var getAggAssaData = function(data)
{
    return data.map(getAggAssa);
}

var getAggAssa = function(data)
{
    return data.AggAssa; 
}

var getBurgData = function(data)
{
    return data.map(getBurg);
}

var getBurg = function(data)
{
    return data.Burg; 
}
