// Script by CITG!! Plz credit if you stealy this :3
// At least don't remove this: https://citg.neocities.org/

const PANEL_NAME = "peeker_panel";

// Animations can be easily added here
const animations = [
    {filename: "peek", frames: 48},
    {filename: "shake", frames: 48},
    {filename: "drop", frames: 48},
    {filename: "shy", frames: 30},
    {filename: "slap", frames: 33}
];

function rem(node) {
    node.remove();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function peek(
    x = Math.floor(Math.random() * window.innerWidth / 64) * 64, 
    y = Math.floor(Math.random() * window.innerHeight / 64) * 64, 
    speed = (Math.random() - .5) * .3 + 1, 
    anim = Math.floor(Math.random() * animations.length)
) {
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
    //panel.style.overflow = "hidden"; Does nothing
    panel.style.pointerEvents = "none";
    zIndex_0 = 999 - 49;
    panel = document.body.appendChild(panel);
    panel.className += anim; // Used for the anim choice

    // Hijacking the zIndex attribute because this function getting called so much makes any 'i' index variables clash(?)
    for(panel.zIndex = zIndex_0 + 1; panel.zIndex < animations[Number(panel.className)].frames + zIndex_0; ++panel.zIndex) {
        // media/FILENAME/FILENAME0001.png thru FILENAMEFRAMES.png
        /*
        var innerImg = new Image();
        innerImg.src = 
        "media/" 
        + animations[Number(panel.className)].filename 
        + "/" 
        + animations[Number(panel.className)].filename 
        + ("000" + (Number(panel.zIndex) - zIndex_0)).slice(-4) 
        + ".png";
        panel.appendChild(innerImg);
        */

        panel.innerHTML = 
            "<img src=media/" 
            + animations[Number(panel.className)].filename 
            + "/" 
            + animations[Number(panel.className)].filename 
            + ("000" + (Number(panel.zIndex) - zIndex_0)).slice(-4) 
            + ".png>";
        
        await sleep(41.666666667 / speed);
    }

    document.getElementById(panel.id).remove();
}

async function loop() {
    peek();
    setTimeout(loop, Math.random() * 2000);
}

// Browser seems to forget all images here since they don't show?
/*
var cache = [];
async function precache() {
    for(i = 0; i < animations.length; ++i) {
        for(j = 1; j < animations[i].frames; ++j) {
            img = new Image()
            img.src = "media/" 
            + animations[i].filename 
            + "/" 
            + animations[i].filename 
            + ("000" + j).slice(-4) 
            + ".png";
            cache.push(img);
        }
    }
    await sleep(5000);
    console.log("Frames cached");
}
*/

// Takes too long, confuses people
async function precache() {
    var loadSpeed = 2;
    for(i = 0; i < animations.length; ++i) {
        peek(window.innerWidth + 16, i * 2, loadSpeed, i);
        await sleep(100);
        peek(window.innerWidth + 16, i * 2 + 1, loadSpeed, i);
        await sleep(100);
    }
    await sleep(500);
    console.log("Prepared panels");
}

window.onload = async function() {
    await precache();
    loop();
}