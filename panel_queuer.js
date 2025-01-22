// Script by CITG!! Plz credit if you stealy this :3
// At least don't remove this: https://citg.neocities.org/

const PANEL_NAME = "peeker_panel";

function rem(node) {
    node.remove();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function peek(x, y, speed = (Math.random() + 1) / 2 * 1.6) {
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

    // Hijacking the zIndex attribute because this function getting called so much makes any 'i' index variables clash(?)
    for(panel.zIndex = zIndex_0 + 1; panel.zIndex < 49 + zIndex_0; ++panel.zIndex) {
        panel.innerHTML = "<img src=media/peek/peek" + ("000" + (Number(panel.zIndex) - zIndex_0)).slice(-4) + ".png>";
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
    await peek(window.screen.width+16, 0, 0.6) // Precachers
    await peek(window.screen.width+16, 1, 0.6);
    //await precache();
    //await precache();
    loop();
}