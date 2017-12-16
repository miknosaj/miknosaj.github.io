var body = document.getElementsByTagName('body')[0];

var fadeIn = () => {
  body.classList.add('fade-in');
} 

window.onload = fadeIn

function getMousePos(evt) {
    var doc = document.documentElement || document.body;
    var pos = {
        x: evt ? evt.pageX : window.event.clientX + doc.scrollLeft - doc.clientLeft,
        y: evt ? evt.pageY : window.event.clientY + doc.scrollTop - doc.clientTop
    };
    return pos;
}

document.onmousemove = moveMouse;

function moveMouse(evt) {
    var pos = getMousePos(evt),
		followMouse = document.getElementById("_followMouse");
    followMouse.style.backgroundPosition = pos.x + "px " + pos.y + "px";
}