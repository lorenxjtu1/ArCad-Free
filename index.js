let interval;
let currentImg = 1;


let root = "misc/imgs/";
let srcArr = [];

function reset(){
    document.getElementById("textLearn").style.display = "block";
    document.getElementById("imgControls").style.display = "block";
    document.getElementById("auxImg").style.display = "none";
    document.getElementById("imgControls").style.animation = "none";
    document.getElementById("imgControls").style.webkitAnimation = "none";
    document.getElementById("grid").style.display = "block";
}

function showControls(){
    stopEffects();
   
   
    document.getElementById("textLearn").textContent = "Change the position, rotation or scale.";
    
    srcArr = ["moveLearn.png","rotateLearn.png","scaleLearn.png"];
    
    currentImg = 0;

    document.getElementById("imgControls").src = root + srcArr[currentImg];
  
    interval = setInterval(changeImg, 1500);
    
    
}

function changeImg(){

    document.getElementById("imgControls").src = root + srcArr[currentImg];
    if(currentImg >= srcArr.length - 1){
        currentImg = 0;
    }else{
        currentImg++;
    }

}

function stopEffects(){
    if(interval != null){
        clearInterval(interval);
    }
    reset();
}

function displayNone(n){
    if(n == 1){
        document.getElementById("textLearn").style.display = "block";
        document.getElementById("imgControls").style.display = "block";
    }
}

function showKeyframe(){
    stopEffects();
    
    document.getElementById("textLearn").textContent = "Add the position and rotation to make an animation";
    
    document.getElementById("imgControls").src = root + "keyframeLearn.png";
    let auxImg = document.getElementById("auxImg");
    auxImg.style.display = "block";
    auxImg.src = root + "dotCube.png";
    auxImg.style.position = "absolute";
    auxImg.style.top = "180px";
    auxImg.style.left = "430px";
    
}

function showPreview(){
    stopEffects();
    
    document.getElementById("textLearn").textContent = "Preview the animation before testing in the Viewer";
    
    document.getElementById("imgControls").src = root + "cube.png";
    let auxImg = document.getElementById("auxImg");
    auxImg.style.display = "block";
    auxImg.src = root + "path.png";
    auxImg.style.position = "absolute";
    auxImg.style.top = "180px";
    auxImg.style.left = "380px";
    document.getElementById("imgControls").style.animation = '';
    document.getElementById("imgControls").style.webkitAnimation = '';
    document.getElementById("imgControls").style.animationPlayState = "running";
    document.getElementById("imgControls").style.webkitAnimationPlayState = "running";
}
function showPreview2(){
    stopEffects();
    document.getElementById('grid').style.display = "none";
    document.getElementById("textLearn").textContent = "View the animation in AR.";
    
    document.getElementById("imgControls").src = root + "cube.png";
    let auxImg = document.getElementById("auxImg");
    auxImg.style.display = "block";
    auxImg.src = root + "smart.png";
    auxImg.style.position = "absolute";
    auxImg.style.top = "120px";
    auxImg.style.left = "380px";
    document.getElementById("imgControls").style.animation = '';
    document.getElementById("imgControls").style.webkitAnimation = '';
    document.getElementById("imgControls").style.animationPlayState = "running";
    document.getElementById("imgControls").style.webkitAnimationPlayState = "running";
}

function showExport(){
    stopEffects();

    document.getElementById("textLearn").textContent = "Export your animation directly to the Viewer or export to a .arcad file.";

    document.getElementById("grid").style.display = "none";
    document.getElementById("imgControls").style.display = "none";
    let auxImg = document.getElementById("auxImg");
    auxImg.style.display = "block";
    auxImg.src = root + "exportLearn.png";
    auxImg.style.position = "absolute";
    auxImg.style.top = "30px";
    auxImg.style.left = "200px";
    
}

function showImport(){
    stopEffects();

    document.getElementById("textLearn").textContent = "Import a 3D Model from a file.";

    document.getElementById("grid").style.display = "none";
    document.getElementById("imgControls").style.display = "none";
    let auxImg = document.getElementById("auxImg");
    auxImg.style.display = "block";
    auxImg.src = root + "importLearn.png";
    auxImg.style.position = "absolute";
    auxImg.style.top = "100px";
    auxImg.style.left = "350px";
}

function showViewer(){
    stopEffects();

    document.getElementById("textLearn").textContent = "Go to the Viewer.";

    document.getElementById("grid").style.display = "none";
    document.getElementById("imgControls").style.display = "none";
    let auxImg = document.getElementById("auxImg");
    auxImg.style.display = "block";
    auxImg.src = root + "viewerLearn.png";
    auxImg.style.position = "absolute";
    auxImg.style.top = "100px";
    auxImg.style.left = "300px";
}

function showEditorLearn(){
    document.getElementById('grid').style.display = "block";
    document.getElementById('viewerToolbar').style.display = "none";
    document.getElementById('editorToolbar').style.display = "block";
    document.getElementById('demonstrateArea').style.display = "block";
}

function showViewerLearn(){
    document.getElementById('grid').style.display = "none";
    document.getElementById('editorToolbar').style.display = "none";
    document.getElementById('viewerToolbar').style.display = "block";
    document.getElementById('demonstrateArea').style.display = "block";

    showImport();
}
