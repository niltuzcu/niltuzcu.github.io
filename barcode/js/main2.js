
var xVar, yVar, zVar;
var data;
var continent = ["AS", "EU","SA","OC","AF"];
var color_names = ["#7ddaa1","#F5CF23","#dab47d","#bb968a","#d97b7b"];
var scaleColor = d3.scaleOrdinal()
                .domain(continent)
                .range(color_names);  

//Load data
function loadData() {
    d3.csv("data/testData.csv", function(error, csv) {

        csv.forEach(function(d){
            d.name = d.name;
            d.iso = d.iso;
            d.population = +d.population;
            d.happy_planet_index = +d.happy_planet_index;
            d.human_development_index = +d.human_development_index;
            d.world_happiness_score = +d.world_happiness_score;
            d.GDP_per_capita = +d.GDP_per_capita;
			d.continent = d.continent;
        });
        data = csv;		
        console.log(data);
		draw(xVar, yVar, zVar);
    });
};


            
function draw(axisX, axisY, axisZ){

var extentX = d3.extent(data,function(d){return d[axisX]});
var extentY = d3.extent(data,function(d){return d[axisY]});
var extentZ = d3.extent(data,function(d){return d[axisZ]});
var extentR = d3.extent(data,function(d){return d["population"]});

var scaleX = d3.scaleLinear()
				.range([0,10])
				.domain(extentX);

var scaleY = d3.scaleLinear()
				.range([0,10])
				.domain(extentY);

var scaleZ = d3.scaleLinear()
				.range([0,10])
				.domain(extentZ);

var scaleR = d3.scaleSqrt()
				.range([0.1,0.5])
				.domain(extentR);

var materialList ={"AF":"#BA5454","AS":"#CEC555","EU":"#4ABAB4","OC":"#59A7CE","SA":"#EAA678"};

	materialTest = new THREE.MeshPhongMaterial( { color: "red", specular: 0x000000, flatShading: true, side: THREE.DoubleSide } );

data.forEach(function(d){

    var box= "<a-box class='box' name='"+ d.name +"' rotation='0 45 45' position='"+scaleX(d[axisX])+" "+scaleY(d[axisY])+" "+ scaleZ(d[axisZ])+"' scale='0.15 0.15 0.15' color=' "+ materialList[d.continent] +"'></a-box>";
    var sphere = "<a-sphere class='sphere' rotation='0 45 45' position='"+scaleX(d[axisX])+" "+scaleY(d[axisY])+" "+ scaleZ(d[axisZ])+"' radius='"+ scaleR(d.population) +"' color=' "+ materialList[d.continent] +"' alphaTest='0.5' transparent='true' opacity='0.9'></a-sphere>";
    $("#" +axisY).append( sphere );
});

$("#" +axisY).append("<a-entity axisthing position='0 0 0'> </a-entity>");
$("#" +axisY).append("<a-entity axisgrid position='0 0 0'> </a-entity>");

}			


//ANIMATION 
// animation='property: rotation; to: 0 360 0; loop: true; easing: linear; dur: 4000;'