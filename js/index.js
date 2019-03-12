var fullpage = new PureFullPage();

fullpage.init();


var animation = bodymovin.loadAnimation({
    container: document.getElementById('anim'),
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: './assets/animations/logoAnim.json'
});

var animationLearn = bodymovin.loadAnimation({
    container: document.getElementById('learnAnim'),
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: './assets/animations/learnAnim.json'
});


function getStarted(){
    fullpage.goDown();
}

let editorBt = document.getElementById("btEditor");
editorBt.addEventListener("mouseover", (e) => {
    e.preventDefault();
    let viewerContainer = document.getElementById("viewerContainer");
    viewerContainer.style.display = "none";
    let editorExplain = document.getElementById("editorExplain");
    editorExplain.style.display = "block";
})

editorBt.addEventListener("mouseout", (e) => {
    e.preventDefault();
    let viewerContainer = document.getElementById("viewerContainer");
    viewerContainer.style.display = "block";
    let editorExplain = document.getElementById("editorExplain");
    editorExplain.style.display = "none";
})


let viewerBt = document.getElementById("btViewer");
viewerBt.addEventListener("mouseover", (e) => {
    e.preventDefault();
    let editorContainer = document.getElementById("editorContainer");
    editorContainer.style.display = "none";
    let viewerExplain = document.getElementById("viewerExplain");
    viewerExplain.style.display = "block";
})

viewerBt.addEventListener("mouseout", (e) => {
    e.preventDefault();
    let editorContainer = document.getElementById("editorContainer");
    editorContainer.style.display = "block";
    let viewerExplain = document.getElementById("viewerExplain");
    viewerExplain.style.display = "none";
})