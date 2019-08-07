$(".content-fix").hide();

$(window).scroll(function(){
	
	scrollHeight = $(window).scrollTop();
	introHeight = $(".full-content").height() +  $(".header").height();
	windowHeight =$(window).height();

	if( scrollHeight > introHeight-windowHeight && scrollHeight<introHeight){
		$(".content-fix").fadeIn();
		$(".content-fix").css("top",introHeight-scrollHeight+40);

	}

	else if(scrollHeight>=introHeight){
		$(".content-fix").css("top",40);

	}
	else if(scrollHeight<introHeight-windowHeight){
		$(".content-fix").fadeOut();

	}
	
});

//WAYPOINTS

// PRODUCT SPACE WITH TEXT AND LEGEND
var waypoint1 = new Waypoint({
	element: document.getElementById('wp1'),
	handler: function(direction) {
		if(direction == "down"){
			$(".vizTitle").html("PRODUCT SPACE");
		}
		else{
			$(".vizTitle").html("");
		}
	}
  })

// WP2 PRODUCT SPACE WITH LABELS 
var waypoint2 = new Waypoint({
	element: document.getElementById('wp2'),
	handler: function(direction) {
		if(direction == "down"){
			pcAnimatedLines();
			$(".legend").css("margin-top","1rem");
			dataWrangler_filtered();
			$(".vizTitle").html("PRODUCT SPACE");
			$(".pcText").remove();
		}
		else{
			remove_pcAnimatedLines();
			$(".content-fix").append("<div class='pcText' style='margin-top: 1rem;width:"+width+"px'><p style='font-size: 14px'><b>Product Space</b> maps the relatedness of 800 export products as nodes whose proximity is defined by the probability that two products are co-exported. Products are connected if they require similar capabilities in production, where countries are more successful in diversifying by moving into ‘nearby’ products, in utilizing existing capabilities.</p></div>")
			$(".legend").css("margin-top","-1rem");
		}
	}
  })

// WP3 UGANDA PRODUCT SPACE 2016
  var waypoint3 = new Waypoint({
	element: document.getElementById('wp3'),
	handler: function(direction) {
		if(direction == "down"){
			$(".legend").remove();
			updateViz("2016");
			$(".content-fix").append("<img class='howToRead'style='margin-top: -1rem; height: 100px; display:block' src='how-to-read.svg'>")
			remove_pcAnimatedLines();
			$(".vizTitle").html("INDONESIA PRODUCT SPACE, 2016")
		}
		else{
			updateViz("all");
			pcAnimatedLines();
			$(".howToRead").remove();
			$(".vizTitle").html("PRODUCT SPACE")
			$(".content-fix").append("<img class='legend' style='margin-top: 1rem; height:50px; display: block;' src='legend.svg'>")

		}
	}
  })

// WP4 DRAW ELECTRONICS AREA
var waypoint4 = new Waypoint({
	element: document.getElementById('wp4'),
	handler: function(direction) {
		if(direction == "down"){
			drawCircle();
		}
		else{
			remove_drawCircle();
		}
	}
  })

// WP5 DRAW ELECTRONICS AREA
var waypoint5 = new Waypoint({
	element: document.getElementById('wp5'),
	handler: function(direction) {
		if(direction == "down"){
			$(".howToRead").remove();
			remove_drawCircle();
			d3.select(".content-fix .allProductSpace").remove();
			draw_filtered();
			$(".vizTitle").html("ELECTRONICS SPACE");
			$("#node1").addClass("selected-node");
			$(".content-fix").append("<img class='legend' style='margin-top: 1rem; height:45px; display: block;' src='legend.svg'>");
			$(".content-fix").append("<img class='howToRead2'style='margin-top: 1rem; height: 75px; display:block' src='how-to-read2.svg'>")

		}
		else{
			$(".howToRead2").remove();
			$(".vizTitle").html("INDONESIA PRODUCT SPACE, 2016")
			d3.select(".content-fix .Vnm_filteredProductSpace").remove();
			d3.select(".content-fix .Ind_filteredProductSpace").remove();
			d3.select(".content-fix .timeline").remove();
			d3.select(".content-fix .country-names").remove();
			svg_ind = d3.select(".content-fix").append("svg").attr("height",height).attr("width",width).attr("class","allProductSpace");
			svg_ind.append("g").attr("id","svg_animatedLines");
			svg_ind.append("g").attr("id", "svg_ind_links").attr("height",height-(svg_marginTop * 2)).attr("width",width).attr("transform","translate(0,"+ svg_marginTop +")");
			svg_ind.append("g").attr("id", "svg_ind_nodes").attr("height",height-(svg_marginTop * 2)).attr("width",width).attr("transform","translate(0,"+ svg_marginTop +")");
			updateViz("2016");
			drawCircle();
			$(".legend").remove();
			$(".content-fix").append("<img class='howToRead'style='margin-top: -1rem; height: 100px; display:block' src='how-to-read.svg'>")

		}
	}
  })


  var waypoint6 = new Waypoint({
	element: document.getElementById('wp6'),
	handler: function(direction) {
		if(direction == "down"){
			updateViz_filtered("2004","2004");
			$("#node2").addClass("selected-node");
		}
		else{
			updateViz_filtered("2000","2000");
			console.log("UP updateViz_filtered 2000 called");
			$("#node2").removeClass("selected-node");
		}
	}
  })

 var waypoint7 = new Waypoint({
	element: document.getElementById('wp7'),
	handler: function(direction) {
		if(direction == "down"){
			updateViz_filtered("2008","2008");
			console.log("DOWN updateViz_filtered 2008 called");
			$("#node3").addClass("selected-node");
		}
		else{
			updateViz_filtered("2004","2004");
			console.log("UP updateViz_filtered 2004 called");
			$("#node3").removeClass("selected-node");
		}
	}
  })

  var waypoint8 = new Waypoint({
	element: document.getElementById('wp8'),
	handler: function(direction) {
		if(direction == "down"){
			updateViz_filtered("2012","2012");
			$("#node4").addClass("selected-node");
		}
		else{
			updateViz_filtered("2008","2008");
			$("#node4").removeClass("selected-node");
		}
	}
  })

 var waypoint9 = new Waypoint({
	element: document.getElementById('wp9'),
	handler: function(direction) {
		if(direction == "down"){
			updateViz_filtered("2014","2014");
			$("#node5").addClass("pattern-node");
			$(".howToRead2").remove();
			$(".content-fix").append("<img class='election2014' style='margin-top: 1rem; height: 70px; display:block' src='2014election.svg'>")
		}
		else{
			updateViz_filtered("2008","2008");
			console.log("UP updateViz_filtered 2008 called");
			$("#node5").removeClass("pattern-node");
			$(".election2014").remove();
			$(".content-fix").append("<img class='howToRead2'style='margin-top: 1rem; height: 75px; display:block' src='how-to-read2.svg'>")
		}
	}
  })

  var waypoint10 = new Waypoint({
	element: document.getElementById('wp10'),
	handler: function(direction) {
		if(direction == "down"){
			updateViz_filtered("2016","2016");
			$("#node6").addClass("selected-node");
			vietnamLabelsFunction();
			$(".election2014").remove();
			$(".content-fix").append("<img class='howToRead2'style='margin-top: 1rem; height: 75px; display:block' src='how-to-read2.svg'>")

		}
		else{
			updateViz_filtered("2014","2014");
			$("#node6").removeClass("selected-node");
			$(".content-fix").append("<img class='election2014'style='height: 70px; display:block' src='2014election.svg'>")
			$(".howToRead2").remove();
		}
	}
  })

  var waypoint11 = new Waypoint({
	element: document.getElementById('wp11'),
	handler: function(direction) {
		if(direction == "down"){
			vietnamLabelsFunction();
			indonesiaLabelsFunction();
		}
		else{
			removeVietnamLabelsFunction();
			removeIndonesiaLabelsFunction();
		}
	}
  })
