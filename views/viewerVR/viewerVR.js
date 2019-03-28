var clock = new THREE.Clock();

var container;
var camera, scene, raycaster, renderer;

var room;
var isMouseDown = false;

var INTERSECTED;
var crosshair;
let menus = [];

let cube;
let cameraBody;
let bool = false;
let timing;

var objects = [];

var keyframesViewer = [];

var exportObj = [];
var exportPath = [];

var pathFollower = new PathFollower();

var geoFile = new GeoFile();

function init() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x505050 );

    let cameraBodyGeo = new THREE.BoxGeometry(1,1,1);
    let cameraBodyMat = new THREE.MeshBasicMaterial({transparent: true,opacity: 0});
    cameraBody = new THREE.Mesh(cameraBodyGeo, cameraBodyMat);
    cameraBody.position.set(0,0,5);
    scene.add(cameraBody)

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100 );

    cameraBody.add( camera );

    // Polyfill always provides us with `navigator.getVRDisplays`
    navigator.getVRDisplays().then(displays => {
        // If we have a native VRDisplay, or if the polyfill
        // provided us with a CardboardVRDisplay, use it
        if (displays.length) {
            vrDisplay = displays[0];
            controls = new THREE.VRControls(camera);
            vrDisplay.requestAnimationFrame(animate);
        } else {
            // If we don't have a VRDisplay, we're probably on
            // a desktop environment, so set up desktop-oriented controls
            controls = new THREE.OrbitControls(camera);
            requestAnimationFrame(animate);
        }
    });

    crosshair = new THREE.Mesh(
        new THREE.RingBufferGeometry( 0.02, 0.04, 32 ),
        new THREE.MeshBasicMaterial( {
            color: 0xffffff,
            opacity: 0.5,
            transparent: true
        } )
    );
    crosshair.position.z = - 2;
    camera.add( crosshair );

    room = new THREE.LineSegments(
        new THREE.BoxLineGeometry( 80, 20, 60, 10, 10, 10 ),
        new THREE.LineBasicMaterial( { color: 0x808080 } )
    );
    room.position.y = 3;
    scene.add( room );

    scene.add( new THREE.HemisphereLight( 0x606060, 0x404040 ) );

    var light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 1, 1, 1 ).normalize();
    scene.add( light );

    // let cubeGeo = new THREE.BoxGeometry(1,1,1);
    // let cubeMat = new THREE.MeshBasicMaterial({color: new THREE.Color("rgb(0,255,0)")});
    //  cube = new THREE.Mesh(cubeGeo, cubeMat);
    // cube.position.set(0,0,-2);
    // scene.add(cube)


    raycaster = new THREE.Raycaster();

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.vr.enabled = true;
    let renderDiv = document.getElementById("renderDiv");
    renderDiv.appendChild( renderer.domElement );

    renderer.domElement.addEventListener( 'mousedown', onMouseDown, false );
    renderer.domElement.addEventListener( 'mouseup', onMouseUp, false );
    renderer.domElement.addEventListener( 'touchstart', onMouseDown, false );
    renderer.domElement.addEventListener( 'touchend', onMouseUp, false );

    window.addEventListener( 'resize', onWindowResize, false );
    window.addEventListener( 'keydown', onkeydown, false );

    //

    window.addEventListener( 'vrdisplaypointerrestricted', onPointerRestricted, false );
    window.addEventListener( 'vrdisplaypointerunrestricted', onPointerUnrestricted, false );

    createMenus();

    

    document.body.appendChild( WEBVR.createButton( renderer ) );

    animate();
}

function selectedMenu(){
    if(bool){
        cube.material.color = new THREE.Color("rgb(255,0,0)");
    }else{
        cube.material.color = new THREE.Color("rgb(0,255,0)");
    }
    bool = !bool;
}

function onkeydown(e){
    if(e.code == "KeyW"){
        cameraBody.position.z -= 1;
        
    }else if(e.code == "KeyS"){
        cameraBody.position.z += 1;
        previewer();
    }
}

function onMouseDown() {

    isMouseDown = true;

}

function onMouseUp() {

    isMouseDown = false;

}

function onPointerRestricted() {

    var pointerLockElement = renderer.domElement;
    if ( pointerLockElement && typeof ( pointerLockElement.requestPointerLock ) === 'function' ) {

        pointerLockElement.requestPointerLock();

    }

}

function onPointerUnrestricted() {

    var currentPointerLockElement = document.pointerLockElement;
    var expectedPointerLockElement = renderer.domElement;
    if ( currentPointerLockElement && currentPointerLockElement === expectedPointerLockElement && typeof ( document.exitPointerLock ) === 'function' ) {

        document.exitPointerLock();

    }

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

    renderer.setAnimationLoop( render );

}

function render() {

    pathFollower.update();

    var delta = clock.getDelta() * 60;

    // find intersections

    raycaster.setFromCamera( { x: 0, y: 0 }, camera );

    var intersects = raycaster.intersectObjects( menus );

    if ( intersects.length > 0 ) {



        if ( INTERSECTED != intersects[ 0 ].object ) {

            if ( INTERSECTED ){
                
                // cube.material.color = new THREE.Color("rgb(255,0,0)");

            } else{
                INTERSECTED = intersects[ 0 ].object;
                // cube.material.color = new THREE.Color("rgb(255,0,0)");
            }
            
            timing = setTimeout(previewer, 2000); 

        }
        

        
        
       

    } else {

        if ( INTERSECTED ){
            // cube.material.color = new THREE.Color("rgb(0,255,0)");
        }

        INTERSECTED = undefined;

        clearTimeout(timing);
       
        

    }


    renderer.render( scene, camera );

}

function createMenus(){

    var element = document.createElement("canvas");
    var elementContext = element.getContext("2d");
    element.width = element.height = 180;
    elementContext.shadowColor = "#000";
    elementContext.shadowBlur = 7;
    elementContext.fillStyle = "orange";
    elementContext.font = "30pt arial bold";

    elementContext.fillText("Explode", 10, 64);
    var xm = new THREE.MeshBasicMaterial({ map: new THREE.Texture(element), });
    xm.map.needsUpdate = true;

    var transform = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.5, 0.01), xm);
    transform.doubleSided = true;
    transform.position.set(0, 0, 3.5);
    transform.rotation.x = -Math.PI/2;
    menus.push(transform);
    scene.add(transform);

}

function previewer(){
    pathFollower.preview(exportObj, exportPath);
}

function onModelLoadViewer(event) {
    callInit();
    let text = event.target.result;

    let toAdd = geoFile.importInAR(text);

    for(let i = 0; i < toAdd.meshesArr.length; i++){
        toAdd.meshesArr[i].mesh.castShadow = true;
        objects.push(toAdd.meshesArr[i].mesh);
        for(let j = 0; j < toAdd.keyframes.length; j++){
            if(toAdd.meshesArr[i].id == toAdd.keyframes[j].id ){
            keyframesViewer.push(toAdd.keyframes[j]);
            break;
            }
        }
        
        toAdd.meshesArr[i].mesh.position.copy(keyframesViewer[i].position[0]);
        scene.add(toAdd.meshesArr[i].mesh);
    }

    exportObj = objects;
    exportPath = keyframesViewer;



}

function onChooseFile(event, onLoadFileHandler) {
    if (typeof window.FileReader !== "function")
        throw "The file API isn't supported on this browser.";
    let input = event.target;
    if (!input) throw "The browser does not properly implement the event object";
    if (!input.files)
        throw "This browser does not support the `files` property of the file input.";
    if (!input.files[0]) return undefined;
    let file = input.files[0];
    let fr = new FileReader();
    fr.onload = onLoadFileHandler;
    fr.readAsText(file);
}

function callInit(){
    document.getElementById("bt1").style.display = "none";
    
    init();
}