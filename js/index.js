var fullpage = new PureFullPage();

fullpage.init();


var animation = bodymovin.loadAnimation({
    container: document.getElementById('anim'),
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: './assets/data.json'
});


function getStarted(){
    fullpage.goDown();
}