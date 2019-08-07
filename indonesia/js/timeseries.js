
var width_ind = ($(window).width() - 274 - contentRightHeight)/2
var height_ind = width_ind;
var scaleX_ind = d3.scaleLinear()
                    .range([20,width_ind-20]);
var scaleY_ind = d3.scaleLinear()
                    .range([20,height_ind-20]);
var radiusFiltered = 7;

var vietnamWidth;



function dataWrangler_filtered(){

    data_filtered = data.filter(function(d){return this.indexOf(d.id)>=0}, in_circle_id);
    dataConnection_filtered = dataConnection.filter(function(d){return this.indexOf(d.id_1.idx)>=0}, in_circle_id);
    dataConnection_filtered = dataConnection_filtered.filter(function(d){return this.indexOf(d.id_2.idx)>=0}, in_circle_id);
    IndonesiaList_filtered = IndonesiaList.filter(function(d){return this.indexOf(d.id)>=0}, in_circle_id); 
    VietnamList_filtered = VietnamList.filter(function(d){return this.indexOf(d.id)>=0}, in_circle_id); 

    IndonesiaList_filtered.forEach(function(d){
		if(d.year == "2016")
        {Ind_array2016_filtered.push(d.id)};
		if(d.year == "2014")
        {Ind_array2014_filtered.push(d.id)};
		if(d.year == "2012")
        {Ind_array2012_filtered.push(d.id)};
		if(d.year == "2008")
        {Ind_array2008_filtered.push(d.id)};
		if(d.year == "2004")
        {Ind_array2004_filtered.push(d.id)};
		if(d.year == "2000")
        {Ind_array2000_filtered.push(d.id)};
    });	 

    VietnamList_filtered.forEach(function(d){
		if(d.year == "2016")
        {
            Vnm_array2016_filtered.push(d.id)
        };
		if(d.year == "2014")
        {Vnm_array2014_filtered.push(d.id)};
		if(d.year == "2012")
        {Vnm_array2012_filtered.push(d.id)};
		if(d.year == "2008")
        {Vnm_array2008_filtered.push(d.id)};
		if(d.year == "2004")
        {Vnm_array2004_filtered.push(d.id)};
		if(d.year == "2000")
        {Vnm_array2000_filtered.push(d.id)};
    });
}

function draw_filtered(){
    
    // Add country names
    $(".content-fix").append("<div class='country-names'><p class='ind-text'>INDONESIA</p><p class='vnm-text'>VIETNAM</p></div>");

    // Add timeline
    $(".content-fix").append("<div class='timeline'><div id='node1' class='time-node'></div><div id='link1' class='time-link'></div><div id='node2' class='time-node'></div><div id='link2' class='time-link'></div><div id='node3' class='time-node'></div><div id='link3' class='time-link'></div><div id='node4' class='time-node'></div><div id='link4 'class='time-link'></div><div id='node5' class='nodeElection time-node'></div><div id='link5' class='time-link'></div><div id='node6' class='time-node'></div></div>");
    svg_ind_filtered = d3.select(".content-fix").append("svg").attr("height",height_ind).attr("width",width_ind).attr("class","Ind_filteredProductSpace");
    svg_ind_filtered.append("g").attr("id", "svg_ind_links");
    svg_ind_filtered.append("g").attr("id", "svg_ind_nodes");
    svg_ind_filtered.append("g").attr("id", "svg_ind_labels");

    // Create SVG's for electronics space
    svg_vnm_filtered = d3.select(".content-fix").append("svg").attr("height",height_ind).attr("width",width_ind).attr("class","Vnm_filteredProductSpace");
    svg_vnm_filtered.append("g").attr("id", "svg_vnm_links");
    svg_vnm_filtered.append("g").attr("id", "svg_vnm_nodes");
    svg_vnm_filtered.append("g").attr("id", "svg_vnm_labels");
   
    var extentX_ind = d3.extent(data_filtered,function(d){return d.x});
    var extentY_ind = d3.extent(data_filtered,function(d){return d.y});

  
    $(".vnm-text").css("margin-left", $(".Vnm_filteredProductSpace").width()-150)

    scaleX_ind.domain(extentX_ind);
    scaleY_ind.domain(extentY_ind);

    //INDONESIA EMPTY NODES
    svg_ind_filtered.select("#svg_ind_nodes").selectAll(".Ind_empty_nodes")
            .data(data_filtered)
            .enter()
            .append("circle")
            .attr("cx", function(d){return scaleX_ind(d.x)})
            .attr("cy", function(d){return scaleY_ind(d.y)})
            .attr("r",radiusFiltered)
            .attr("stroke","#333333")
            .attr("stroke-width",0.3)
            .attr("fill", "#f9f9f3")
            .attr("class","Ind_empty_nodes");   

    //INDONESIA ALL LINKS
    svg_ind_filtered.select("#svg_ind_links").selectAll(".Ind_empty_links")
            .data(dataConnection_filtered)
            .enter()
            .append("line")
            .attr("x1", function(d){return scaleX_ind(d.id_1.x1)})
            .attr("y1", function(d){return scaleY_ind(d.id_1.y1)})
            .attr("x2", function(d){return scaleX_ind(d.id_2.x2)})
            .attr("y2", function(d){return scaleY_ind(d.id_2.y2)})
            .attr("stroke","black")
            .attr("opacity",0.6)
            .attr("stroke-width",0.4)
            .attr("stroke-dasharray",3)
            .attr("class","Ind_empty_links");

    //VIETNAM EMPTY NODES
    svg_vnm_filtered.select("#svg_vnm_nodes").selectAll(".Vnm_empty_nodes")
            .data(data_filtered)
            .enter()
            .append("circle")
            .attr("cx", function(d){return scaleX_ind(d.x)})
            .attr("cy", function(d){return scaleY_ind(d.y)})
            .attr("r",radiusFiltered)
            .attr("stroke","#333333")
            .attr("stroke-width",0.3)
            .attr("fill", "#f9f9f3")
            .attr("class","Vnm_empty_nodes");   

    //VIETNAM ALL LINKS
    svg_vnm_filtered.select("#svg_vnm_links").selectAll(".Vnm_empty_links")
            .data(dataConnection_filtered)
            .enter()
            .append("line")
            .attr("x1", function(d){return scaleX_ind(d.id_1.x1)})
            .attr("y1", function(d){return scaleY_ind(d.id_1.y1)})
            .attr("x2", function(d){return scaleX_ind(d.id_2.x2)})
            .attr("y2", function(d){return scaleY_ind(d.id_2.y2)})
            .attr("stroke","black")
            .attr("opacity",0.6)
            .attr("stroke-width",0.4)
            .attr("stroke-dasharray",3)
            .attr("class","Vnm_empty_links");

    updateViz_filtered("2000","2000");
}


function updateViz_filtered(year_array_ind, year_array_vnm){

    if (year_array_ind == "2000") {
        year_array_ind = Ind_array2000_filtered;
    }
    if (year_array_ind == "2004") {
        year_array_ind= Ind_array2004_filtered;
    }
    if (year_array_ind == "2008") {
        year_array_ind = Ind_array2008_filtered;
    }
    if (year_array_ind == "2012") {
        year_array_ind= Ind_array2012_filtered;
    }
    if (year_array_ind == "2014") {
        year_array_ind = Ind_array2014_filtered;
    }
    if (year_array_ind == "2016") {
        year_array_ind = Ind_array2016_filtered;
    }

    if (year_array_vnm == "2000") {
        year_array_vnm = Vnm_array2000_filtered;
    }
    if (year_array_vnm == "2004") {
        year_array_vnm = Vnm_array2004_filtered;
    }
    if (year_array_vnm == "2008") {
        year_array_vnm = Vnm_array2008_filtered;
    }
    if (year_array_vnm == "2012") {
        year_array_vnm = Vnm_array2012_filtered;
    }
    if (year_array_vnm == "2014") {
        year_array_vnm = Vnm_array2014_filtered;
    }
    if (year_array_vnm == "2016") {
        year_array_vnm = Vnm_array2016_filtered;
    }

InddataColorCircle = data_filtered.filter(function(d){return this.indexOf(d.id)>=0}, year_array_ind);
VnmdataColorCircle = data_filtered.filter(function(d){return this.indexOf(d.id)>=0}, year_array_vnm);

//INDONESIA COLORED CIRCLES
var IndColorCircle =svg_ind_filtered.select("#svg_ind_nodes").selectAll(".ind_color_node")
							.data(InddataColorCircle);
    IndColorCircle.enter()
	.append("circle")
	.merge(IndColorCircle)
	.attr("cx", function(d){return scaleX_ind(d.x)})
	.attr("cy", function(d){return scaleY_ind(d.y)})
    .attr("r",radiusFiltered)
    .attr("stroke","#333333")
    .attr("stroke-width",0.2)
	.attr("fill", function(d){return scaleColor(d.sector)})
	.attr("opacity",1)
	.attr("class","ind_color_node");
IndColorCircle.exit().remove();

//VIETNAM COLORED CIRCLES
var VnmColorCircle =svg_vnm_filtered.select("#svg_vnm_nodes").selectAll(".vnm_color_node")
							.data(VnmdataColorCircle);
    VnmColorCircle.enter()
	.append("circle")
	.merge(VnmColorCircle)
	.attr("cx", function(d){return scaleX_ind(d.x)})
	.attr("cy", function(d){return scaleY_ind(d.y)})
    .attr("r",radiusFiltered)
    .attr("stroke","#333333")
    .attr("stroke-width",0.2)
	.attr("fill", function(d){return scaleColor(d.sector)})
	.attr("opacity",1)
	.attr("class","vnm_color_node");
VnmColorCircle.exit().remove();

//INDONESIA GRAY CIRLCE DATA
InddataGrayCircle = dataConnection_filtered.filter(function(d){return year_array_ind.indexOf(d.id_1.idx)>=0 && year_array_ind.indexOf(d.id_2.idx)<0});
InddataGrayCircle_2 = dataConnection_filtered.filter(function(d){return year_array_ind.indexOf(d.id_2.idx)>=0 && year_array_ind.indexOf(d.id_1.idx)<0});

InduniqueGrayCircleIds=[]
InduniqueGrayCircleData=[]
InduniqueGrayCircleData2=[]
InddataGrayCircle.forEach(function(d){
	if(InduniqueGrayCircleIds.indexOf(d.id_2.idx)<0){
		InduniqueGrayCircleIds.push(d.id_2.idx)
		InduniqueGrayCircleData.push(d.id_2);
	}
});

InddataGrayCircle_2.forEach(function(d){
	if(InduniqueGrayCircleIds.indexOf(d.id_1.idx)<0){
		InduniqueGrayCircleIds.push(d.id_1.idx)
		InduniqueGrayCircleData2.push(d.id_1);
	}
});

//VIETNAM GRAY CIRLCE DATA
VnmdataGrayCircle = dataConnection_filtered.filter(function(d){return year_array_vnm.indexOf(d.id_1.idx)>=0 && year_array_vnm.indexOf(d.id_2.idx)<0});
VnmdataGrayCircle_2 = dataConnection_filtered.filter(function(d){return year_array_vnm.indexOf(d.id_2.idx)>=0 && year_array_vnm.indexOf(d.id_1.idx)<0});

VnmuniqueGrayCircleIds=[]
VnmuniqueGrayCircleData=[]
VnmuniqueGrayCircleData2=[]
VnmdataGrayCircle.forEach(function(d){
	if(VnmuniqueGrayCircleIds.indexOf(d.id_2.idx)<0){
		VnmuniqueGrayCircleIds.push(d.id_2.idx)
		VnmuniqueGrayCircleData.push(d.id_2);
	}
});

VnmdataGrayCircle_2.forEach(function(d){
	if(VnmuniqueGrayCircleIds.indexOf(d.id_1.idx)<0){
		VnmuniqueGrayCircleIds.push(d.id_1.idx)
		VnmuniqueGrayCircleData2.push(d.id_1);
	}
});

//INDONESIA LINES
var Indlines = svg_ind_filtered.select("#svg_ind_links").selectAll(".ind_lines")
                .data(dataConnection_filtered.filter(function(d){return this.indexOf(d.id_1.idx)>=0  || this.indexOf(d.id_2.idx)>=0}, year_array_ind));
    Indlines.enter()
    .append("line")
    .merge(Indlines)
    .attr("x1", function(d){return scaleX_ind(d.id_1.x1)})
    .attr("y1", function(d){return scaleY_ind(d.id_1.y1)})
    .attr("x2", function(d){return scaleX_ind(d.id_2.x2)})
    .attr("y2", function(d){return scaleY_ind(d.id_2.y2)})
    .attr("stroke","#333333")
    .attr("opacity",1)
    .attr("stroke-width",0.6)
    .attr("class","ind_lines");
Indlines.exit().remove();

//VIETNAME LINES
var Vnmlines = svg_vnm_filtered.select("#svg_vnm_links").selectAll(".vnm_lines")
                .data(dataConnection_filtered.filter(function(d){return this.indexOf(d.id_1.idx)>=0  || this.indexOf(d.id_2.idx)>=0}, year_array_vnm));
    Vnmlines.enter()
    .append("line")
    .merge(Vnmlines)
    .attr("x1", function(d){return scaleX_ind(d.id_1.x1)})
    .attr("y1", function(d){return scaleY_ind(d.id_1.y1)})
    .attr("x2", function(d){return scaleX_ind(d.id_2.x2)})
    .attr("y2", function(d){return scaleY_ind(d.id_2.y2)})
    .attr("stroke","#333333")
    .attr("opacity",1)
    .attr("stroke-width",0.6)
    .attr("class","vnm_lines");
Vnmlines.exit().remove();

//VIETNAME GRAY CIRCLE
var VnmGreyNode = svg_vnm_filtered.select("#svg_vnm_nodes").selectAll(".vnm_grey_node")
						.data(VnmuniqueGrayCircleData);
    VnmGreyNode.enter()
				.append("circle")
				.merge(VnmGreyNode)
				.attr("cx", function(d){return scaleX_ind(d.x2)})
				.attr("cy", function(d){return scaleY_ind(d.y2)})
                .attr("r",radiusFiltered)
                .attr("stroke","black")
                .attr("stroke-width",0.4)
                .attr("fill", "#e6e6e6")
				.attr("opacity",1)
				.attr("class","vnm_grey_node");
    VnmGreyNode.exit().remove();


var VnmGreyNode_2 = svg_vnm_filtered.select("#svg_vnm_nodes").selectAll(".vnm_grey_node_2")
						.data(VnmuniqueGrayCircleData2);
    VnmGreyNode_2.enter()
				.append("circle")
				.merge(VnmGreyNode_2)
				.attr("cx", function(d){return scaleX_ind(d.x1)})
				.attr("cy", function(d){return scaleY_ind(d.y1)})
                .attr("r",radiusFiltered)
                .attr("stroke","black")
                .attr("stroke-width",0.4)
                .attr("fill", "#e6e6e6")
				.attr("opacity",1)
				.attr("class","vnm_grey_node_2");
    VnmGreyNode_2.exit().remove();

//INDONESIA GRAY CIRCLE
var IndGreyNode = svg_ind_filtered.select("#svg_ind_nodes").selectAll(".ind_grey_node")
						.data(InduniqueGrayCircleData);
    IndGreyNode.enter()
				.append("circle")
				.merge(IndGreyNode)
				.attr("cx", function(d){return scaleX_ind(d.x2)})
				.attr("cy", function(d){return scaleY_ind(d.y2)})
                .attr("r",radiusFiltered)
                .attr("stroke","black")
                .attr("stroke-width",0.4)
                .attr("fill", "#e6e6e6")
				.attr("opacity",1)
				.attr("class","ind_grey_node");
     IndGreyNode.exit().remove();


var IndGreyNode_2 = svg_ind_filtered.select("#svg_ind_nodes").selectAll(".ind_grey_node_2")
						.data(InduniqueGrayCircleData2);
    IndGreyNode_2.enter()
				.append("circle")
				.merge(IndGreyNode_2)
				.attr("cx", function(d){return scaleX_ind(d.x1)})
				.attr("cy", function(d){return scaleY_ind(d.y1)})
                .attr("r",radiusFiltered)
                .attr("stroke","black")
                .attr("stroke-width",0.4)
                .attr("fill", "#e6e6e6")
				.attr("opacity",1)
				.attr("class","ind_grey_node_2");
    IndGreyNode_2.exit().remove();
}

function vietnamLabelsFunction(){

    svg_vnm_filtered.select("#svg_vnm_labels").selectAll(".vietnamLabels")
                    .data(productSpaceLabels)
                    .enter()
                    .append("line")
                    .attr("x1", function(d){return scaleX_ind(d.x)})
                    .attr("y1",function(d){return scaleY_ind(d.y)})
                    .attr("x2", function(d){return scaleX_ind(d.x)})
                    .attr("y2",function(d){return scaleY_ind(d.y)})
                    .transition()
                    .duration(2000)
                    .attr("x2",function(d){ 
                        if(d.id == "1745")
                        {return scaleX_ind(d.x)+30}
                        else
                        {return scaleX_ind(d.x)}
                    })
                    .attr("y2",function(d){
                        if(d.id == "1720")
                        {return scaleY_ind(d.y)-30}
                        if(d.id == "1689")
                        {return scaleY_ind(d.y)+30}
                        if(d.id == "1745")
                        {return scaleY_ind(d.y) }
                    })
                    .attr("stroke","black")
                    .attr("stroke-width",2)
                    .attr("class","vietnamLabels");

    svg_vnm_filtered.select("#svg_vnm_labels").selectAll(".vietnamLabelsRect")
                    .data(productSpaceLabels)
                    .enter()
                    .append("rect")
                    .attr("x", function(d){
                        if(d.id == "1720")
                        {return scaleX_ind(d.x)}
                        if(d.id == "1689")
                        {return scaleX_ind(d.x)}
                        if(d.id == "1745")
                        {return scaleX_ind(d.x)+30}
                    })
                    .attr("y",function(d){
                        if(d.id == "1720")
                        {return scaleY_ind(d.y)-30-16}
                        if(d.id == "1689")
                        {return scaleY_ind(d.y)+30}
                        if(d.id == "1745")
                        {return scaleY_ind(d.y)-8}
                    })
                    .attr("width",90)
                    .attr("height",function(d){
                        if(d.id == "1745"){
                            return 35
                        }
                        else {return 16}
                    })
                    .attr("opacity",0)
                    .transition()
                    .duration(2003)
                    .attr("opacity",1)
                    .attr("fill","black")
                    .attr("opacity",0.6)
                    .attr("class","vietnamLabelsRect");

        

    svg_vnm_filtered.select("#svg_vnm_labels").selectAll(".vietnamLabels_text")
                    .data(productSpaceLabels)
                    .enter()
                    .append("text")
                    .attr("x", function(d){
                        if(d.id == "1745")
                        {return scaleX_ind(d.x)+32}
                        else
                        {return scaleX_ind(d.x)+5}
                    })
                    .attr("y",function(d){
                        if(d.id == "1720")
                        {return scaleY_ind(d.y)-35}
                        if(d.id == "1689")
                        {return scaleY_ind(d.y)+42}
                        if(d.id == "1745")
                        {return scaleY_ind(d.y)+4 }
                    })
                    .html(function(d){return d.name})
                    .attr("opacity",0)
                    .transition()
                    .duration(2003)
                    .attr("opacity",1)
                    .attr("fill","white")
                    .attr("text-anchor","start")
                    .attr("class","vietnamLabels_text");
                    
}

function removeVietnamLabelsFunction(){
    d3.selectAll(".vietnamLabels_text").remove();
    d3.selectAll(".vietnamLabelsRect").remove();
    d3.selectAll(".vietnamLabels").remove();
}

function indonesiaLabelsFunction(){

    svg_ind_filtered.select("#svg_ind_labels").selectAll(".indonesiaLabels")
                    .data(productSpaceLabels)
                    .enter()
                    .append("line")
                    .attr("x1", function(d){return scaleX_ind(d.x)})
                    .attr("y1",function(d){return scaleY_ind(d.y)})
                    .attr("x2", function(d){return scaleX_ind(d.x)})
                    .attr("y2",function(d){return scaleY_ind(d.y)})
                    .transition()
                    .duration(500)
                    .attr("x2",function(d){ 
                        if(d.id == "1745")
                        {return scaleX_ind(d.x)+30}
                        else
                        {return scaleX_ind(d.x)}
                    })
                    .attr("y2",function(d){
                        if(d.id == "1720")
                        {return scaleY_ind(d.y)-30}
                        if(d.id == "1689")
                        {return scaleY_ind(d.y)+30}
                        if(d.id == "1745")
                        {return scaleY_ind(d.y) }
                    })
                    .attr("stroke","black")
                    .attr("stroke-width",2)
                    .attr("class","indonesiaLabels");

    svg_ind_filtered.select("#svg_ind_labels").selectAll(".indonesiaLabelsRect")
                    .data(productSpaceLabels)
                    .enter()
                    .append("rect")
                    .attr("x", function(d){
                        if(d.id == "1720")
                        {return scaleX_ind(d.x)}
                        if(d.id == "1689")
                        {return scaleX_ind(d.x)}
                        if(d.id == "1745")
                        {return scaleX_ind(d.x)+30}
                    })
                    .attr("y",function(d){
                        if(d.id == "1720")
                        {return scaleY_ind(d.y)-30-16}
                        if(d.id == "1689")
                        {return scaleY_ind(d.y)+30}
                        if(d.id == "1745")
                        {return scaleY_ind(d.y)-8}
                    })
                    .attr("width",90)
                    .attr("height",function(d){
                        if(d.id == "1745"){
                            return 35
                        }
                        else {return 16}
                    })
                    .attr("opacity",0)
                    .transition()
                    .duration(503)
                    .attr("opacity",1)
                    .attr("fill","black")
                    .attr("opacity",0.6)
                    .attr("class","indonesiaLabelsRect");

        

    svg_ind_filtered.select("#svg_ind_labels").selectAll(".indonesiaLabels_text")
                    .data(productSpaceLabels)
                    .enter()
                    .append("text")
                    .attr("x", function(d){
                        if(d.id == "1745")
                        {return scaleX_ind(d.x)+32}
                        else
                        {return scaleX_ind(d.x)+5}
                    })
                    .attr("y",function(d){
                        if(d.id == "1720")
                        {return scaleY_ind(d.y)-35}
                        if(d.id == "1689")
                        {return scaleY_ind(d.y)+42}
                        if(d.id == "1745")
                        {return scaleY_ind(d.y)+4 }
                    })
                    .html(function(d){return d.name})
                    .attr("opacity",0)
                    .transition()
                    .duration(503)
                    .attr("opacity",1)
                    .attr("fill","white")
                    .attr("text-anchor","start")
                    .attr("class","indonesiaLabels_text");
                    
}

function removeIndonesiaLabelsFunction(){

    d3.selectAll(".indonesiaLabels_text").remove();
    d3.selectAll(".indonesiaLabelsRect").remove();
    d3.selectAll(".indonesiaLabels").remove();
}