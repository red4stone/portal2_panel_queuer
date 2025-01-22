// Script by CITG!! Plz credit if you stealy this :3
// At least don't remove this: https://citg.neocities.org/

const PANEL_NAME = "peeker_panel";

// Animations can be easily added here
const animations = [
    {filename: "peek", frames: 48},
    {filename: "shake", frames: 48},
    {filename: "drop", frames: 48}
];

function rem(node) {
    node.remove();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function peek(x, y, speed = (Math.random() + 1) / 2 * 1.6, anim = Math.floor(Math.random() * animations.length)) {
    if(document.getElementById(PANEL_NAME + "x" + x + "y" + y)) {
        return; // Don't overlap panels
    }
    var panel = document.createElement('div');
    panel.id = PANEL_NAME + "x" + x + "y" + y;
    panel.style.position = 'absolute';
    panel.style.left = (x - 32) + 'px';
    panel.style.top = y + 'px';
    panel.style.width = '128px';
    panel.style.height = '64px';
    panel.style.overflow = "hidden";
    panel.style.pointerEvents = "none";
    zIndex_0 = 999 - 49;
    panel = document.body.appendChild(panel);
    panel.className += anim; // Used for the anim choice

    // Hijacking the zIndex attribute because this function getting called so much makes any 'i' index variables clash(?)
    for(panel.zIndex = zIndex_0 + 1; panel.zIndex < animations[Number(panel.className)].frames + zIndex_0; ++panel.zIndex) {
        // media/FILENAME/FILENAME0001.png thru FILENAMEFRAMES.png
        panel.innerHTML = 
            "<img src=media/" 
            + animations[Number(panel.className)].filename 
            + "/" 
            + animations[Number(panel.className)].filename 
            + ("000" + (Number(panel.zIndex) - zIndex_0)).slice(-4) 
            + ".png>";
        await sleep(41.666666667 * speed);
    }

    document.getElementById(panel.id).remove();
}

async function loop() {
    peek(Math.floor(Math.random() * window.innerWidth / 64) * 64, Math.floor(Math.random() * window.innerHeight / 64) * 64);
    setTimeout(loop, Math.random() * 2000);
}

// Browser seems to forget all images here since they don't show?
/*
let cache = [];
async function precache() {
    for(i = 1; i < 49; ++i) {
        img = new Image()
        img.src = "media/peek/peek" +  ("000" + i).slice(-4) + ".png";
        cache.push(img);
        await sleep(50);
        //console.log("cached:" + "media/peek/peek" +  ("000" + i).slice(-4) + ".png");
    }
    console.log("Peek frames cached");
}
*/

window.onload = async function() {
    // Precache
    for(i = 0; i < animations.length; ++i) {
        await peek(window.screen.width+16, i*2, 0.6, i);
        await peek(window.screen.width+16, i*2+1, 0.6, i);
    }
    //await precache();
    //await precache();
    loop();
}