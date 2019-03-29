var fullpage = new PureFullPage();

fullpage.init();

var animation = bodymovin.loadAnimation({
    container: document.getElementById('anim'),
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: './assets/animations/logoAnim.json'
});


function getStarted(){
    fullpage.goDown();
}

let editorBt = document.getElementById("btEditor");
editorBt.addEventListener("mouseover", (e) => {
    e.preventDefault();
    document.getElementById("viewerContainer").style.display = "none";
    document.getElementById("editorExplain").style.display = "block";
})

editorBt.addEventListener('touchstart', (e) => {
    e.preventDefault();
    window.location.href = './views/editor/editor.html';
})

editorBt.addEventListener("mouseout", (e) => {
    e.preventDefault();
    document.getElementById("viewerContainer").style.display = "block";
    document.getElementById("editorExplain").style.display = "none";
})


let viewerBt = document.getElementById("btViewer");
let markerBt = document.getElementById("btMarker");

viewerBt.addEventListener("mouseover", show);
markerBt.addEventListener("mouseover", show);

viewerBt.addEventListener("mouseout", hide);
markerBt.addEventListener("mouseout", hide);

viewerBt.addEventListener("touchstart", (e) => {
    e.preventDefault();
    window.location.href = './views/viewer/viewer.html';
})

function show(e) {
    e.preventDefault();
    document.getElementById("editorContainer").style.display = "none";
    document.getElementById("viewerExplain").style.display = "block";
    document.getElementById('btMarker').style.display = "block";
}

function hide(e){
    e.preventDefault();
    document.getElementById("editorContainer").style.display = "block";
    document.getElementById("viewerExplain").style.display = "none";
    document.getElementById('btMarker').style.display = "none";
}