
            //Sizing
            var contentRightHeight = $(".content-right").width();
            var width = $(window).width() - 160 - contentRightHeight; 
            var height = width * 0.67;
            var svg_marginTop = 20;

			const sector = ["Textiles_and_furniture", "Vegetables_foodstuff_and_wood","Stone_and_glass","Minerals","Metals","Chemicals_and_plastics","Transport_vehicles","Machinery","Electronics","Other"]
			const color_names = ["#7ddaa1","#F5CF23","#dab47d","#bb968a","#d97b7b","#c57bd9","#8d7bd8","#7ba2d9","#7ddada","#2a607c"]
			var scaleColor = d3.scaleOrdinal()
                .domain(sector)
				.range(color_names);  
            
            //Full Product Space Non - Filtered
            var year_array;
            var Ind_array2016 = [];
            
            //Filtered Data for Circle Area
            var year_array_filtered;
            var data_filtered;
            var in_circle_id = [];
            var dataConnection_filtered;
            var IndonesiaList_filtered;
            var VietnamList_filtered;
			var Ind_array2000_filtered = [],
				Ind_array2004_filtered = [],
				Ind_array2008_filtered = [],
				Ind_array2012_filtered = [],
                Ind_array2014_filtered = [],
                Ind_array2016_filtered = [];
            var Vnm_array2000_filtered = [],
                Vnm_array2004_filtered = [],
				Vnm_array2008_filtered = [],
				Vnm_array2012_filtered = [],
                Vnm_array2014_filtered = [],
                Vnm_array2016_filtered = [];

            var all_array = [],
                data,
                animatedLines,
                dataConnection,
                IndonesiaList,
                VietnamList;
			var radius = 5;

            var svg_ind;

            var svg_ind_filtered;
            var vnm_ind_filtered;
        
            var productSpaceLabels;

			var scaleX = d3.scaleLinear()
				.range([10,width-20]);
			var scaleY = d3.scaleLinear()
                .range([10,height-20 - (svg_marginTop * 2)]);
            var scaleTest = d3.scaleLinear()
				.range([10,height-20]);

queue()
	.defer(d3.csv, "data/productSpace.csv")
	.defer(d3.csv, "data/connections.csv")
	.defer(d3.csv, "data/Ind_Rca_allyears.csv")
    .defer(d3.csv, "data/Vnm_Rca_allyears.csv")
    .defer(d3.csv, "data/in_circle.csv")
    .defer(d3.csv, "data/pcLines.csv")
    .defer(d3.csv, "data/productLabels.csv")
	.await(function(error, datax, dataConnectionx, Indlist, Vnmlist, pickedIds, labelLines, labels){

	datax.forEach(function(d){
				d.x = +d.x;
				d.y = +d.y;
				d.id = d.id;
                d.sector = d.sector;
                all_array.push(d.id);
			});

	data = datax;

    dataConnection = dataConnectionx;

    IndonesiaList = Indlist;

	IndonesiaList.forEach(function(d){
		if(d.year == "2016")
        Ind_array2016.push(d.id);
    });	

    VietnamList = Vnmlist;
    
    pickedIds.forEach(function(d){
        in_circle_id.push(d.id);
    })

    labelLines.forEach(function(d){
        d.x = +d.x;
        d.y = +d.y;
        d.name = d.name;
    });

    animatedLines = labelLines;

    labels.forEach(function(d){
        d.x = +d.x;
        d.y = +d.y;
        d.id = d.id;
        d.name = d.name;
    });

    productSpaceLabels = labels;
	
	dataWrangler();
});


function dataWrangler(){

dataConnection.forEach(function(d){
	temp = d.id_1;
	index = data.findIndex(function(d) {
  		return d.id == temp 
	});
	d.id_1 = {"x1": data[index].x, "y1":data[index].y, "idx": d.id_1 };

	temp2 = d.id_2;
	index2 = data.findIndex(function(d) {
  		return d.id == temp2 
	});
	d.id_2 = {"x2": data[index2].x, "y2":data[index2].y, "idx": d.id_2 };
});
draw();
};

            
function draw(){

svg_ind = d3.select(".content-fix").append("svg").attr("height",height).attr("width",width).attr("class","allProductSpace");
svg_ind.append("g").attr("id","svg_animatedLines");
svg_ind.append("g").attr("id", "svg_ind_links").attr("height",height-(svg_marginTop * 2)).attr("width",width).attr("transform","translate(0,"+ svg_marginTop +")");
svg_ind.append("g").attr("id", "svg_ind_nodes").attr("height",height-(svg_marginTop * 2)).attr("width",width).attr("transform","translate(0,"+ svg_marginTop +")");


var extentX = d3.extent(data,function(d){return d.x});
var extentY = d3.extent(data,function(d){return d.y});

scaleX.domain(extentX);
scaleY.domain(extentY);

updateViz("all");
$(".content-fix").append("<div class='pcText' style='margin-top: -2rem; width:"+width+"px'><p style='font-size: 14px'><b>Product Space</b> maps the relatedness of 800 export products as nodes whose proximity is defined by the probability that two products are co-exported. Products are connected if they require similar capabilities in production, where countries are more successful in diversifying by moving into ‘nearby’ products, in utilizing existing capabilities.</p></div>")
$(".content-fix").append("<img class='legend' style='margin-top: 1rem; height:50px; display: block;' src='legend.svg'>")
}

function updateViz(year_array){

   if (year_array == "2016") {
        year_array = Ind_array2016;
    }
    if (year_array == "all") {
        year_array = all_array;
    }

dataColorCircle = data.filter(function(d){return this.indexOf(d.id)>=0}, year_array);

dataGrayCircle = dataConnection.filter(function(d){return year_array.indexOf(d.id_1.idx)>=0 && year_array.indexOf(d.id_2.idx)<0});

dataGrayCircle_2 = dataConnection.filter(function(d){return year_array.indexOf(d.id_2.idx)>=0 && year_array.indexOf(d.id_1.idx)<0});


uniqueGrayCircleIds=[]
uniqueGrayCircleData=[]
uniqueGrayCircleData2=[]
dataGrayCircle.forEach(function(d){
	if(uniqueGrayCircleIds.indexOf(d.id_2.idx)<0){
		uniqueGrayCircleIds.push(d.id_2.idx)
		uniqueGrayCircleData.push(d.id_2);
	}
});

dataGrayCircle_2.forEach(function(d){
	if(uniqueGrayCircleIds.indexOf(d.id_1.idx)<0){
		uniqueGrayCircleIds.push(d.id_1.idx)
		uniqueGrayCircleData2.push(d.id_1);
	}
});

emptyCircles=[];
uniqueGrayCircleData.forEach(function(d){
    emptyCircles.push(d.idx);
});
uniqueGrayCircleData2.forEach(function(d){
    emptyCircles.push(d.idx);
});
    
var lines = svg_ind.select("#svg_ind_links").selectAll(".connections")
    .data(dataConnection.filter(function(d){return this.indexOf(d.id_1.idx)>=0  || this.indexOf(d.id_2.idx)>=0}, year_array));

    lines.enter()
    .append("line")
    .merge(lines)
    .attr("x1", function(d){return scaleX(d.id_1.x1)})
    .attr("y1", function(d){return scaleY(d.id_1.y1)})
    .attr("x2", function(d){return scaleX(d.id_1.x1)})
    .attr("y2", function(d){return scaleY(d.id_1.y1)})
    .transition()
    .duration(2000)
    .attr("x2", function(d){return scaleX(d.id_2.x2)})
    .attr("y2", function(d){return scaleY(d.id_2.y2)})
    .attr("stroke","#333333")
    .attr("opacity",1)
    .attr("stroke-width",0.2)
    .attr("class","connections");

    lines.exit().remove();

var gray_circles = svg_ind.select("#svg_ind_nodes").selectAll(".circles_gray")
						.data(uniqueGrayCircleData);

	gray_circles.enter()
				.append("circle")
				.merge(gray_circles)
				.attr("cx", function(d){return scaleX(d.x2)})
				.attr("cy", function(d){return scaleY(d.y2)})
                .attr("r",radius)
                .attr("stroke","#333333")
                .attr("stroke-width",0.2)
				.attr("opacity",0)
				.transition(1)
				.delay(2003)
                .attr("fill", "#cccccc")
				.attr("opacity",1)
				.attr("class","circles_gray");

	gray_circles.exit().remove();


var gray_circles_2 = svg_ind.select("#svg_ind_nodes").selectAll(".circles_gray_2")
						.data(uniqueGrayCircleData2);
	
	gray_circles_2.enter()
				.append("circle")
				.merge(gray_circles_2)
				.attr("cx", function(d){return scaleX(d.x1)})
				.attr("cy", function(d){return scaleY(d.y1)})
                .attr("r",radius)
                .attr("stroke","#333333")
                .attr("stroke-width",0.2)
				.attr("opacity",0)
				.transition(1)
                .delay(2003)
				.attr("fill", "#cccccc")
				.attr("opacity",1)
				.attr("class","circles_gray_2");

    gray_circles_2.exit().remove();

var empty_circle_data = data.filter(function(d){return this.indexOf(d.id)<0}, year_array);
    empty_circle_data = data.filter(function(d){return this.indexOf(d.idx)<0}, emptyCircles);
    
var empty_circles = svg_ind.select("#svg_ind_nodes").selectAll(".empty")
                    .data(empty_circle_data);


    empty_circles.enter()
    .append("circle")
    .merge(empty_circles)
    .attr("cx", function(d){return scaleX(d.x)})
    .attr("cy", function(d){return scaleY(d.y)})
    .attr("r",radius)
    .attr("stroke","#333333")
    .attr("stroke-width",0.1)
    // .attr("opacity",0)
    // .transition(1)
    // .delay(3003)
    .attr("fill", "transparent")
    .attr("opacity",1)
    .attr("class","empty");

    empty_circles.exit().remove();

var colored_circles = svg_ind.select("#svg_ind_nodes").selectAll(".circles_colored")
							.data(data.filter(function(d){return this.indexOf(d.id)>=0}, year_array));

	colored_circles.enter()
	.append("circle")
	.merge(colored_circles)
	.attr("cx", function(d){return scaleX(d.x)})
	.attr("cy", function(d){return scaleY(d.y)})
    .attr("r",radius)
    .attr("stroke","#333333")
    .attr("stroke-width",0.2)
	//.attr("fill", "none")
	.attr("fill", function(d){return scaleColor(d.sector)})
	.attr("opacity",1)
	.attr("class","circles_colored");

    colored_circles.exit().remove();

}

function pcAnimatedLines(){
    
    svg_ind.select("#svg_animatedLines").selectAll(".animatedLines")
	.data(animatedLines)
	.enter()
	.append("line")
	.attr("x1", function(d){return scaleX(d.x)})
    .attr("y1", function(d){return scaleY(d.y)})
    .attr("x2", function(d){return scaleX(d.x)})
    .attr("y2", function(d){return scaleY(d.y)})
    .transition()
	.duration(500)
    .attr("x2", function(d){return scaleX(d.x)})
	.attr("y2", function(d,i){ 
        if(i <= 2){
            return scaleY(1650) + 20
        } 
        else{ 
            return scaleY(2976) + 30
        }
    })
    .attr("stroke","black")
    .attr("class","animatedLines")

 svg_ind.select("#svg_animatedLines").selectAll(".labelName")
    .data(animatedLines)
    .enter()
    .append("text")
    .attr("x",function(d){return scaleX(d.x)})
    .attr("y", function(d,i){ 
        if(i <= 2){
            return scaleY(1650) + 10
        } 
        else{ 
            return scaleY(2976) + 30 + 20
        }
    })
    .attr("text-anchor","middle")
    .attr("class","labelName")
    .text(function(d){return d.name})
    .attr("fill", function(d){return d.color})
    .attr("opacity",0)
    .transition(1)
    .delay(500)
    .attr("opacity",1);
}


function remove_pcAnimatedLines(){
    d3.select("#svg_animatedLines").selectAll("line").remove();
    d3.select("#svg_animatedLines").selectAll("text").remove();
};

function drawCircle(){

    svg_ind.append("circle")
            .attr("cx", scaleX(1219) )
            .attr("cy", scaleY(2676) )
            .attr("r", $(window).width()/14)
            .attr("stroke", "#333333")
            .attr("stroke-width",2)
            .attr("stroke-dasharray", 3)
            .attr("fill","none")
            .attr("class","circleArea");

    svg_ind.append("text")
            .text("Electronics Space")
            .attr("x", scaleX(1219) )
            .attr("y", (scaleY(2676) + ($(window).width()/14)+20) )
            .attr("fill","#333333")
            .attr("class","circleAreaText")
            .attr("text-anchor","middle");
}

function remove_drawCircle(){
    d3.select(".circleArea").remove();
    d3.select(".circleAreaText").remove();    
};

function updateViz_filtered(year_array_filtered){

    d3.select(".content-fix svg").remove();


    if (year_array_filtered == "2000") {
        year_array_filtered = Ind_array2000_filtered;
    }
    else if (year_array_filtered == "2004") {
         year_array_filtered = Ind_array2004_filtered;
    }
   if (year_array_filtered == "2008") {
        year_array_filtered = Ind_array2016_filtered;
    }
   if (year_array_filtered == "2012") {
        year_array_filtered = Ind_array2016_filtered;
    }
   if (year_array_filtered == "2014") {
        year_array_filtered = Ind_array2016_filtered;
    }
   if (year_array_filtered == "2016") {
        year_array_filtered = Ind_array2016_filtered;
    }


dataColorCircle = data_filtered.filter(function(d){return this.indexOf(d.id)>=0}, year_array_filtered);

dataGrayCircle = dataConnection.filter(function(d){return year_array_filtered.indexOf(d.id_1.idx)>=0 && year_array_filtered.indexOf(d.id_2.idx)<0});

dataGrayCircle_2 = dataConnection.filter(function(d){return year_array_filtered.indexOf(d.id_2.idx)>=0 && year_array_filtered.indexOf(d.id_1.idx)<0});


uniqueGrayCircleIds=[]
uniqueGrayCircleData=[]
uniqueGrayCircleData2=[]
dataGrayCircle.forEach(function(d){
	if(uniqueGrayCircleIds.indexOf(d.id_2.idx)<0){
		uniqueGrayCircleIds.push(d.id_2.idx)
		uniqueGrayCircleData.push(d.id_2);
	}
});

dataGrayCircle_2.forEach(function(d){
	if(uniqueGrayCircleIds.indexOf(d.id_1.idx)<0){
		uniqueGrayCircleIds.push(d.id_1.idx)
		uniqueGrayCircleData2.push(d.id_1);
	}
});

emptyCircles=[];
uniqueGrayCircleData.forEach(function(d){
    emptyCircles.push(d.idx);
});
uniqueGrayCircleData2.forEach(function(d){
    emptyCircles.push(d.idx);
});


//   var linesLight = svg_ind.select("#svg_ind_links").selectAll(".connectionsLight")
//     .data(dataConnection);

//     linesLight.enter()
//     .append("line")
//     .merge(linesLight)
//     .attr("x1", function(d){return scaleX(d.id_1.x1)})
//     .attr("y1", function(d){return scaleY(d.id_1.y1)})
//     // .attr("x2", function(d){return scaleX(d.id_1.x1)})
//     // .attr("y2", function(d){return scaleY(d.id_1.y1)})
//     // .transition()
//     // .duration(3000)
//     .attr("x2", function(d){return scaleX(d.id_2.x2)})
//     .attr("y2", function(d){return scaleY(d.id_2.y2)})
//     .attr("stroke","black")
//     .attr("opacity",0.5)
//     .attr("stroke-width",0.05)
//     // .attr("stroke-dasharray", 1)
//     .attr("class","connectionsLight");

//     linesLight.exit().remove();


var gray_circles = svg_ind_filtered.select("#svg_ind_nodes").selectAll(".circles_gray")
						.data(uniqueGrayCircleData);

	gray_circles.enter()
				.append("circle")
				.merge(gray_circles)
				.attr("cx", function(d){return scaleX(d.x2)})
				.attr("cy", function(d){return scaleY(d.y2)})
                .attr("r",radius)
                .attr("stroke","#333333")
                .attr("stroke-width",0.2)
				.attr("opacity",0)
				.transition(1)
				.delay(3003)
                .attr("fill", "#e6e6e6")
				.attr("opacity",1)
				.attr("class","circles_gray");

	gray_circles.exit().remove();


var gray_circles_2 = svg_ind_filtered.select("#svg_ind_nodes").selectAll(".circles_gray_2")
						.data(uniqueGrayCircleData2);
	
	gray_circles_2.enter()
				.append("circle")
				.merge(gray_circles_2)
				.attr("cx", function(d){return scaleX(d.x1)})
				.attr("cy", function(d){return scaleY(d.y1)})
                .attr("r",radius)
                .attr("stroke","#333333")
                .attr("stroke-width",0.2)
				.attr("opacity",0)
				.transition(1)
                .delay(3003)
				.attr("fill", "#e6e6e6")
				.attr("opacity",1)
				.attr("class","circles_gray_2");

    gray_circles_2.exit().remove();

var empty_circle_data = data.filter(function(d){return this.indexOf(d.id)<0}, year_array_filtered);
    empty_circle_data = data.filter(function(d){return this.indexOf(d.idx)<0}, emptyCircles);
    
var empty_circles = svg_ind_filtered.select("#svg_ind_nodes").selectAll(".empty")
                    .data(empty_circle_data);


    empty_circles.enter()
    .append("circle")
    .merge(empty_circles)
    .attr("cx", function(d){return scaleX(d.x)})
    .attr("cy", function(d){return scaleY(d.y)})
    .attr("r",radius)
    .attr("stroke","#333333")
    .attr("stroke-width",0.1)
    // .attr("opacity",0)
    // .transition(1)
    // .delay(3003)
    .attr("fill", "transparent")
    .attr("opacity",1)
    .attr("class","empty");

    empty_circles.exit().remove();

var colored_circles = svg_ind_filtered.select("#svg_ind_nodes").selectAll(".circles_colored")
							.data(data_filtered.filter(function(d){return this.indexOf(d.id)>=0}, year_array_filtered));

	colored_circles.enter()
	.append("circle")
	.merge(colored_circles)
	.attr("cx", function(d){return scaleX(d.x)})
	.attr("cy", function(d){return scaleY(d.y)})
    .attr("r",radius)
    .attr("stroke","#333333")
    .attr("stroke-width",0.2)
	//.attr("fill", "none")
	.attr("fill", function(d){return scaleColor(d.sector)})
	.attr("opacity",1)
	.attr("class","circles_colored");

    colored_circles.exit().remove();

}