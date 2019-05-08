var sector = ["Textiles_and_furniture", "Vegetables_foodstuff_and_wood","Stone_and_glass","Minerals","Metals","Chemicals_and_plastics","Transport_vehicles","Machinery","Electronics","Other"]
var color_names = ["#7ddaa1","#F5CF23","#dab47d","#bb968a","#d97b7b","#c57bd9","#8d7bd8","#7ba2d9","#7ddada","#2a607c"]
var scaleColor = d3.scaleOrdinal()
    .domain(sector)
    .range(color_names);  

function loadData() {
    d3.csv("data/feasibility.csv", function(error, csv) {
        csv.forEach(function(d){
            d.Cog = +d.Cog;
            d.Distance = +d.Distance;
            d.Export = +d.Export;
            d.Pci = +d.Pci;
            d.Sector = d.Sector;
        });
        data = csv;		
        draw();
    });
}


function draw(){

    var extentX = d3.extent(data,function(d){return d.Distance});
    var extentY = d3.extent(data,function(d){return d.Cog});
    var extentZ = d3.extent(data,function(d){return d.Pci});
    var extentR = d3.extent(data,function(d){return d.Export});

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

    // var scene = new THREE.Scene();
    // var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

    // var renderer = new THREE.WebGLRenderer();
    // renderer.setSize( window.innerWidth, window.innerHeight );
    // document.body.appendChild( renderer.domElement );

    var materialList ={};

    sector.forEach(function(d,i){

        materialList[d] = new THREE.MeshPhongMaterial( { color: color_names[i], specular: 0x000000, flatShading: true, side: THREE.DoubleSide } );

    });



    data.forEach(function(d){

        AFRAME.registerComponent('mythreejsthing', {
            schema: {
              color: {
                default: '#000'
              },
            },
            update: function() {

                geometry = new THREE.SphereGeometry( scaleR(d.Export), 16, 16 );
                // sphere = new THREE.Mesh( geometry, materialList[d.Sector] );
                // sphere.position.set ( scaleX(d.Distance), scaleY(d.Cog), scaleZ(d.Pci));   
                objects = this.el.setObject3D('mesh', new THREE.Mesh(geometry, materialList[d.Sector]));
                objects.position.set ( scaleX(d.Distance), scaleY(d.Cog), scaleZ(d.Pci));   

            },
        });
  
    })

    // camera.position.z = 400;

    // var light = new THREE.PointLight(0x777777, 1, 100);
    // light.position.set( 0, 0, 0);
    // scene.add ( light );

    // var light2 = new THREE.PointLight(0x777777, 1, 100);
    // light.position.set( 50, 50, 50);
    // scene.add ( light2 );

    // var light3 = new THREE.AmbientLight(0x333333, 1, 100);
    // scene.add ( light3 );

    // var animate = function () {
    //     requestAnimationFrame( animate );
    //     renderer.render( scene, camera );
    // };

    // animate();

}			

loadData();