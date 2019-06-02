AFRAME.registerComponent('markerhandler', {

    init: function() {
        console.log("event js called");
        const animatedMarker = document.querySelector(".animated-marker");
        const aEntity = document.querySelector(".box");

        // every click, we make our model grow in size :)
        animatedMarker.addEventListener('click', function(ev, target){
            console.log("event js click event fired");
            if (ev.target.getAttribute('name')!=null) {
                const intersectedElement = ev.target;
                console.log(intersectedElement.getAttribute('name'));
                $("#countryName").html("<p style='text-align:center; color:white; background-color:black; font-size:20px; text-transform:uppercase; line-height:2'>" + intersectedElement.getAttribute('name') + "</p>")
                // console.log("event js from hello");
                // const scale = aEntity.getAttribute('scale');
                // Object.keys(scale).forEach((key) => scale[key] = scale[key] + 1);
                // aEntity.setAttribute('scale', scale);
            }
        });
    },
    tick: function(time,deltaTime){
        console.log("tick tock tick tock");
        const boxes = document.querySelectorAll(".box");
            boxes.forEach(function(box){
                 const rotation = box.getAttribute('rotation');
                 Object.keys(rotation).forEach((key) => rotation[key] = rotation[key] + 2);
                 box.setAttribute('rotation', rotation);
            })
        


    }



});
