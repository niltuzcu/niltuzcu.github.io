
var data;
var continent = ["AS", "EU","SA","OC","AF"]
var color_names = ["#7ddaa1","#F5CF23","#dab47d","#bb968a","#d97b7b"]
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
		draw("happy_planet_index","human_development_index","world_happiness_score");
    });
}


            
function draw(axisX, axisY, axisZ){

data.forEach(function(d){
    console.log(d["population"]);
})

var extentX = d3.extent(data,function(d){return d[axisX]});
var extentY = d3.extent(data,function(d){return d[axisY]});
var extentZ = d3.extent(data,function(d){return d[axisZ]});
var extentR = d3.extent(data,function(d){return d["population"]});

var scaleX = d3.scaleLinear()
				.range([0,200])
				.domain(extentX);

var scaleY = d3.scaleLinear()
				.range([0,200])
				.domain(extentY);

var scaleZ = d3.scaleLinear()
				.range([0,200])
				.domain(extentZ);

var scaleR = d3.scaleSqrt()
				.range([1,10])
				.domain(extentR);

	        var scene = new THREE.Scene();
			var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

			var renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );

var materialList ={};

	materialTest = new THREE.MeshPhongMaterial( { color: "red", specular: 0x000000, flatShading: true, side: THREE.DoubleSide } );

continent.forEach(function(d,i){

	materialList[d] = new THREE.MeshPhongMaterial( { color: color_names[i], specular: 0x000000, flatShading: true, side: THREE.DoubleSide } );

});

			
		
		// data.forEach(function(d){
		// 	console.log(materialList);
		// 	geometry = new THREE.SphereGeometry( scaleR(d.Export), 16, 16 );
		// 	sphere = new THREE.Mesh( geometry, materialList[d.continent] );
		// 	sphere.position.set ( scaleX(d.Distance), scaleY(d.Cog), scaleZ(d.Pci));
		// 	scene.add( sphere );
		// })

		data.forEach(function(d){
			geometry = new THREE.SphereGeometry( scaleR(d.population), 16, 16 );
			sphere = new THREE.Mesh( geometry, materialList[d.continent] );
			sphere.position.set ( scaleX(d[axisX]), scaleY(d[axisY]), scaleZ(d[axisZ]));
			scene.add( sphere );
		})

			camera.position.z = 400;

			var light = new THREE.PointLight(0x777777, 1, 100);
			light.position.set( 0, 0, 0);
			scene.add ( light );

			var light2 = new THREE.PointLight(0x777777, 1, 100);
			light.position.set( 50, 50, 50);
			scene.add ( light2 );

			var light3 = new THREE.AmbientLight(0x333333, 1, 100);
			scene.add ( light3 );

			var animate = function () {
				requestAnimationFrame( animate );

				// sphere.rotation.x += 0.01;
				// cube.rotation.y += 0.01;

				renderer.render( scene, camera );
			};

			animate();
}			

     loadData();   