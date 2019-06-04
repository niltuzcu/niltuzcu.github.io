AFRAME.registerComponent('axisthing', { 
  update: function() {
      console.log("axis is happening")
      var el = this.el; 
      var mythreejsobject = new THREE.AxesHelper(10);
      el.setObject3D('mesh', mythreejsobject);    
   }
});


AFRAME.registerComponent('axisgrid', { 
    update: function() {
        console.log("grid is happening ");
        var el = this.el; 
        var mythreejsobjectgrid = new THREE.GridHelper( 50, 50 );
        el.setObject3D('mesh', mythreejsobjectgrid);      
     }
  });


