let sizeX;
let sizeY;
sizeX = 500;
sizeY = 400;

let objs = [];
let index = 0;
let visible;

let colors = ["rgb(83,119,166)", "green", "rgb(177, 174, 16)", "rgb(228, 37, 37)", "rgb(224,207,179)"];

var scene = new THREE.Scene();
scene.background = new THREE.Color("rgb(255,255,255)");
var camera = new THREE.PerspectiveCamera( 75, sizeX/sizeY, 0.1, 4 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( sizeX, sizeY);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
let renderDiv = document.getElementById("renderDiv");
renderDiv.appendChild( renderer.domElement );

var light = new THREE.PointLight( 0xffffff, 1, 100 );
light.position.set( 0, 10, 3.5 );
light.castShadow = true; 
scene.add( light );

var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
scene.add( light );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 2.1;
camera.position.y = 1.7;
camera.position.x = -1;
camera.lookAt(0,0,0);
// camera.position.z =5;

var mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath( 'src/models/' );
var url = "table.mtl";
mtlLoader.load( url, function( materials ) {

    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials( materials );
    objLoader.setPath( 'src/models/' );
    objLoader.load( 'table.obj', function ( object ) {

        object.castShadow = true;
        object.receiveShadow = true;
        object.rotation.y = Math.PI;
        scene.add( object );
        
        
    });

});
// CHAIR

var mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath( 'src/models/' );
var url = "chair.mtl";
mtlLoader.load( url, function( materials ) {

    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials( materials );
    objLoader.setPath( 'src/models/' );
    objLoader.load( 'chair.obj', function ( object ) {

        object.castShadow = true;
        object.receiveShadow = true;
        object.scale.set(0.5,0.5,0.5);
        object.position.set(-0.8, 1.4, 1.55);
        
        
        visible = object;
        objs.push(object);
        
        scene.add( objs[objs.length -1] );
    });

});

var mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath( 'src/models/' );
var url = "engine.mtl";
mtlLoader.load( url, function( materials ) {

    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials( materials );
    objLoader.setPath( 'src/models/' );
    objLoader.load( 'engine.obj', function ( object ) {

        object.castShadow = true;
        object.receiveShadow = true;
        object.scale.set(0.2,0.2,0.2);
        object.position.set(-0.75, 1.3, 1.4);
        
        
        
        objs.push(object);
        objs[objs.length -1].visible = false;
        scene.add( objs[objs.length -1] );
    });

});

var mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath( 'src/models/' );
var url = "candles.mtl";
mtlLoader.load( url, function( materials ) {

    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials( materials );
    objLoader.setPath( 'src/models/' );
    objLoader.load( 'candles.obj', function ( object ) {

        object.castShadow = true;
        object.receiveShadow = true;
        object.scale.set(0.2,0.2,0.2);
        object.position.set(-0.8, 1.3, 1.6);
        
        
        
        objs.push(object);
        objs[objs.length -1].visible = false;
        scene.add( objs[objs.length -1] );
    });

});

var mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath( 'src/models/' );
var url = "house.mtl";
mtlLoader.load( url, function( materials ) {

    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials( materials );
    objLoader.setPath( 'src/models/' );
    objLoader.load( 'house.obj', function ( object ) {

        object.castShadow = true;
        object.receiveShadow = true;
        object.scale.set(0.2,0.2,0.2);
        object.position.set(-0.8, 1.3, 1.6);
        
        
        
        objs.push(object);
        objs[objs.length -1].visible = false;
        scene.add( objs[objs.length -1] );
    });

});

var animate = function () {
    requestAnimationFrame( animate );

   
       
    visible.rotation.y +=0.01;
   
    
    
    renderer.render( scene, camera );
};

animate();

function show(c){
    if(c == "n"){
        objs[index].visible = false;

        let lastVisibleText = "txt" + index;
        let lastVisibleSpan = "txtSpan" + index;
        let lastEl = document.getElementById(lastVisibleText);
        lastEl.style.opacity = 0.3;
        let lastSpan = document.getElementById(lastVisibleSpan);
        lastSpan.style.color = colors[4];

        if(index == objs.length-1){
            index = 0;
        }else{
            index++;
        }
        let visibleText = "txt" + index;
        let visibleSpan = "txtSpan" + index;
        let el = document.getElementById(visibleText);
        el.style.opacity = 1;
        let span = document.getElementById(visibleSpan);
        span.style.color = colors[index];

        objs[index].visible = true;
        visible = objs[index];

    }else if(c == "p"){
        objs[index].visible = false;

        let lastVisibleText = "txt" + index;
        let lastVisibleSpan = "txtSpan" + index;
        let lastEl = document.getElementById(lastVisibleText);
        lastEl.style.opacity = 0.3;
        let lastSpan = document.getElementById(lastVisibleSpan);
        lastSpan.style.color = colors[4];

        if(index == 0){
            index = objs.length-1;
        }else{
            index--;
        }

        let visibleText = "txt" + index;
        let visibleSpan = "txtSpan" + index;
        let el = document.getElementById(visibleText);
        el.style.opacity = 1;
        let span = document.getElementById(visibleSpan);
        span.style.color = colors[index];
       
        objs[index].visible = true;
        visible = objs[index];
    }
}

