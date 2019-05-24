
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
				.range([-2,2])
				.domain(extentX);

var scaleY = d3.scaleLinear()
				.range([0,4])
				.domain(extentY);

var scaleZ = d3.scaleLinear()
				.range([-2,2])
				.domain(extentZ);

var scaleR = d3.scaleSqrt()
				.range([0.1,0.5])
				.domain(extentR);

	        // var scene = new THREE.Scene();
			// var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

			// var renderer = new THREE.WebGLRenderer();
			// renderer.setSize( window.innerWidth, window.innerHeight );
			// document.body.appendChild( renderer.domElement );

var materialList ={};

	materialTest = new THREE.MeshPhongMaterial( { color: "red", specular: 0x000000, flatShading: true, side: THREE.DoubleSide } );

continent.forEach(function(d,i){

	materialList[d] = new THREE.MeshPhongMaterial( { color: color_names[i], specular: 0x000000, flatShading: true, side: THREE.DoubleSide } );

});


        AFRAME.registerComponent('mythreejsthing', {
            schema: {
            color: {
                default: '#000'
            },
            },
        
            update: function() {
                myComponent = this;
                var dataGroup = new THREE.Group();
                data.forEach(function(d){
                    geometry = new THREE.SphereGeometry( scaleR(d.population), 2, 2 );
                    mesh= new THREE.Mesh(geometry, materialList[d.continent]);
                    mesh.position.set ( scaleX(d[axisX]), scaleY(d[axisY]), scaleZ(d[axisZ]));
                    
                    dataGroup.add(mesh);
                });
                myComponent.el.setObject3D('mesh', dataGroup);
              
                // var rotate = function(){
                //     dataGroup.rotation+=0.1;
                //     console.log(dataGroup.rotation);
                // }
                // setInterval(rotate, 100);


             },
        })
        
            $("#population").append("<a-entity mythreejsthing position='0 0 0'></a-entity>");
                        

}			

//ANIMATION 
animation='property: rotation; to: 0 360 0; loop: true; easing: linear; dur: 4000;'