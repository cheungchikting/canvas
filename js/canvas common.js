let canvasReal = document.getElementById("canvas-real");
let contextReal = canvasReal.getContext('2d');
let canvasReal2 = document.getElementById("canvas-real2");
let contextReal2 = canvasReal2.getContext('2d');
let canvasDraft = document.getElementById("canvas-draft");
let contextDraft = canvasDraft.getContext('2d');
// Buttons
let drawButton = document.getElementById('drawButton');
let rectButton = document.getElementById('rectButton');
let lineButton = document.getElementById('lineButton');
let quadButton = document.getElementById('quadButton');
let circleButton = document.getElementById('circleButton');
let textButton = document.getElementById('textButton');
let clearButton = document.getElementById('clearButton');
let speechBubbleButton = document.getElementById('speechButton');
let triangleButton = document.getElementById('triangleButton');
let zoomInButton = document.getElementById('zoomIn');
let undoButton = document.getElementById('undoButton');
let redoButton = document.getElementById('redoButton');
let saveButton = document.getElementById('save');
let upLoadButton = document.getElementById('imageLoader');
let eraserButton = document.getElementById('eraser');

let font = "30px Arial";

//Get X and Y Coordinate
let currentFunction;

let dragging = false;

let getXY = function (e) {
    this.x = e.offsetX;
    this.y = e.offsetY;
};

class MouseMethods {
    constructor() {};
    onMouseDown() {};
    onMouseMove() {};
    onMouseUp() {};
    onMouseLeave() {};
    onMouseEnter() {};
};

canvasReal.addEventListener('mousedown', e => {
    getXY(e);
    dragging = true;
    currentFunction.onMouseDown(x, y);
});

canvasReal.addEventListener('mousemove', e => {
    if (dragging === true) {
        getXY(e);
        currentFunction.onMouseDrag(x, y);
    }
});

canvasReal.addEventListener('mousemove', e => {
    if (dragging !== true) {
        getXY(e);
        currentFunction.onMouseMove(x, y);
    }
});

canvasReal.addEventListener('mouseup', e => {
    getXY(e);
    dragging = false;
    currentFunction.onMouseUp(x, y)
});

canvasReal.addEventListener('mouseenter', e => {
    getXY(e);
    currentFunction.onMouseEnter(x, y)
});

canvasReal.addEventListener('mouseleave', e => {
    getXY(e);
    dragging = false;
    currentFunction.onMouseLeave(x, y)
});

document.addEventListener('keydown', (e) => {
    currentFunction.onKeyDown(e)
});





// Color Picker Function
let selectedColor = document.getElementById("favcolor").value
document.getElementById("favcolor").addEventListener('input', (e) => {
    selectedColor = document.getElementById("favcolor").value;
})

//Width Slider Funciton
let width = document.getElementById("width").value
document.getElementById("width").addEventListener('input', (e) => {
    width = document.getElementById("width").value;
})


//filter
let blur = document.getElementById("blur-slider");
blur.addEventListener('input', () => {
    contextDraft.filter = `blur(${blur.value}px)`;
    contextReal.filter = `blur(${blur.value}px)`;
    contextReal.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
    for (each of log) {
        if (each.type === "Circle") {
            contextReal.fillStyle = each.color
            contextReal.beginPath()
            contextReal.arc(each.x, each.y, each.r, each.sAngle, each.eAngle)
            contextReal.fill()
        } else if (each.type === "draw") {
            contextReal.strokeStyle = each.color;
            contextReal.lineWidth = each.drawWidth;
            contextReal.beginPath();
            contextReal.moveTo(each.moveTo[0], each.moveTo[1]);
            for (i of each.lineTo) {
                contextReal.strokeStyle = each.color;
                contextReal.lineWidth = each.drawWidth;
                contextReal.lineTo(i[0], i[1]);
                contextReal.moveTo(i[0], i[1]);
                contextReal.stroke();
            }
        } else if (each.type === "line") {
            contextReal.strokeStyle = each.color;
            contextReal.lineWidth = each.drawWidth;
            contextReal.beginPath()
            contextReal.moveTo(each.moveTo[0], each.moveTo[1]);
            contextReal.lineTo(each.lineTo[0], each.lineTo[1])
            contextReal.stroke();
        } else if (each.type === "rect") {
            contextReal.fillStyle = each.color;
            contextReal.fillRect(each.x, each.y, each.xdist, each.ydist);
        } else if (each.type === "text") {
            contextReal.font = each.font
            contextReal.fillStyle = each.color
            contextReal.fillText(each.content, each.x, each.y)
        } else if (each.type === "curve") {
            contextReal.strokeStyle = each.color;
            contextReal.lineWidth = each.width;
            contextReal.beginPath();
            contextReal.moveTo(each.moveTo[0], each.moveTo[1]);
            contextReal.quadraticCurveTo(each.control[0], each.control[1], each.end[0], each.end[1]);
            contextReal.stroke();
        } else if (each.type === "bubble") {
            contextReal.strokeStyle = each.color;
            contextReal.lineWidth = each.width;
            contextReal.beginPath();
            contextReal.moveTo(each.start[0] + 50, each.start[1]);
            contextReal.quadraticCurveTo(each.start[0], each.start[1], each.start[0], each.start[1] + 37.5);
            contextReal.quadraticCurveTo(each.start[0], each.start[1] + 75, each.start[0] + 25, each.start[1] + 75);
            contextReal.quadraticCurveTo(each.start[0] + 25, each.start[1] + 95, each.start[0] + 5, each.start[1] + 100);
            contextReal.quadraticCurveTo(each.start[0] + 35, each.start[1] + 95, each.start[0] + 40, each.start[1] + 75);
            contextReal.quadraticCurveTo(each.start[0] + 100, each.start[1] + 75, each.start[0] + 100, each.start[1] + 37.5);
            contextReal.quadraticCurveTo(each.start[0] + 100, each.start[1], each.start[0] + 50, each.start[1]);
            contextReal.stroke();
        } else if (each.type === "triangle") {
            contextReal.fillStyle = each.color;
            contextReal.lineWidth = each.width;
            contextReal.beginPath()
            contextReal.moveTo(each.xy[0], each.xy[1]);
            contextReal.lineTo(each.start[0], each.start[1]);
            contextReal.lineTo(each.xy[0] + (each.xy[0] - each.start[0]), each.start[1]);
            contextReal.fill();
        } else if (each.type === "eraser") {
            contextReal.clearRect(each.start[0], each.start[1], each.size, each.size);
            for (i of each.path) {
                contextReal.clearRect(i[0], i[1], each.size, each.size);
            }
        }
    }
    
})

let brightness = document.getElementById("brightness-slider");
brightness.addEventListener('input', () => {
    contextDraft.filter = `brightness(${brightness.value}%)`;
    contextReal.filter = `brightness(${brightness.value}%)`;
    contextReal.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
    for (each of log) {
        if (each.type === "Circle") {
            contextReal.fillStyle = each.color
            contextReal.beginPath()
            contextReal.arc(each.x, each.y, each.r, each.sAngle, each.eAngle)
            contextReal.fill()
        } else if (each.type === "draw") {
            contextReal.strokeStyle = each.color;
            contextReal.lineWidth = each.drawWidth;
            contextReal.beginPath();
            contextReal.moveTo(each.moveTo[0], each.moveTo[1]);
            for (i of each.lineTo) {
                contextReal.strokeStyle = each.color;
                contextReal.lineWidth = each.drawWidth;
                contextReal.lineTo(i[0], i[1]);
                contextReal.moveTo(i[0], i[1]);
                contextReal.stroke();
            }
        } else if (each.type === "line") {
            contextReal.strokeStyle = each.color;
            contextReal.lineWidth = each.drawWidth;
            contextReal.beginPath()
            contextReal.moveTo(each.moveTo[0], each.moveTo[1]);
            contextReal.lineTo(each.lineTo[0], each.lineTo[1])
            contextReal.stroke();
        } else if (each.type === "rect") {
            contextReal.fillStyle = each.color;
            contextReal.fillRect(each.x, each.y, each.xdist, each.ydist);
        } else if (each.type === "text") {
            contextReal.font = each.font
            contextReal.fillStyle = each.color
            contextReal.fillText(each.content, each.x, each.y)
        } else if (each.type === "curve") {
            contextReal.strokeStyle = each.color;
            contextReal.lineWidth = each.width;
            contextReal.beginPath();
            contextReal.moveTo(each.moveTo[0], each.moveTo[1]);
            contextReal.quadraticCurveTo(each.control[0], each.control[1], each.end[0], each.end[1]);
            contextReal.stroke();
        } else if (each.type === "bubble") {
            contextReal.strokeStyle = each.color;
            contextReal.lineWidth = each.width;
            contextReal.beginPath();
            contextReal.moveTo(each.start[0] + 50, each.start[1]);
            contextReal.quadraticCurveTo(each.start[0], each.start[1], each.start[0], each.start[1] + 37.5);
            contextReal.quadraticCurveTo(each.start[0], each.start[1] + 75, each.start[0] + 25, each.start[1] + 75);
            contextReal.quadraticCurveTo(each.start[0] + 25, each.start[1] + 95, each.start[0] + 5, each.start[1] + 100);
            contextReal.quadraticCurveTo(each.start[0] + 35, each.start[1] + 95, each.start[0] + 40, each.start[1] + 75);
            contextReal.quadraticCurveTo(each.start[0] + 100, each.start[1] + 75, each.start[0] + 100, each.start[1] + 37.5);
            contextReal.quadraticCurveTo(each.start[0] + 100, each.start[1], each.start[0] + 50, each.start[1]);
            contextReal.stroke();
        } else if (each.type === "triangle") {
            contextReal.fillStyle = each.color;
            contextReal.lineWidth = each.width;
            contextReal.beginPath()
            contextReal.moveTo(each.xy[0], each.xy[1]);
            contextReal.lineTo(each.start[0], each.start[1]);
            contextReal.lineTo(each.xy[0] + (each.xy[0] - each.start[0]), each.start[1]);
            contextReal.fill();
        } else if (each.type === "eraser") {
            contextReal.clearRect(each.start[0], each.start[1], each.size, each.size);
            for (i of each.path) {
                contextReal.clearRect(i[0], i[1], each.size, each.size);
            }
        }
    }
})

let contrast = document.getElementById("contrast-slider");
contrast.addEventListener('input', () => {
    contextDraft.filter = `contrast(${contrast.value}%)`;
    contextReal.filter = `contrast(${contrast.value}%)`;
    contextReal.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
    for (each of log) {
        if (each.type === "Circle") {
            contextReal.fillStyle = each.color
            contextReal.beginPath()
            contextReal.arc(each.x, each.y, each.r, each.sAngle, each.eAngle)
            contextReal.fill()
        } else if (each.type === "draw") {
            contextReal.strokeStyle = each.color;
            contextReal.lineWidth = each.drawWidth;
            contextReal.beginPath();
            contextReal.moveTo(each.moveTo[0], each.moveTo[1]);
            for (i of each.lineTo) {
                contextReal.strokeStyle = each.color;
                contextReal.lineWidth = each.drawWidth;
                contextReal.lineTo(i[0], i[1]);
                contextReal.moveTo(i[0], i[1]);
                contextReal.stroke();
            }
        } else if (each.type === "line") {
            contextReal.strokeStyle = each.color;
            contextReal.lineWidth = each.drawWidth;
            contextReal.beginPath()
            contextReal.moveTo(each.moveTo[0], each.moveTo[1]);
            contextReal.lineTo(each.lineTo[0], each.lineTo[1])
            contextReal.stroke();
        } else if (each.type === "rect") {
            contextReal.fillStyle = each.color;
            contextReal.fillRect(each.x, each.y, each.xdist, each.ydist);
        } else if (each.type === "text") {
            contextReal.font = each.font
            contextReal.fillStyle = each.color
            contextReal.fillText(each.content, each.x, each.y)
        } else if (each.type === "curve") {
            contextReal.strokeStyle = each.color;
            contextReal.lineWidth = each.width;
            contextReal.beginPath();
            contextReal.moveTo(each.moveTo[0], each.moveTo[1]);
            contextReal.quadraticCurveTo(each.control[0], each.control[1], each.end[0], each.end[1]);
            contextReal.stroke();
        } else if (each.type === "bubble") {
            contextReal.strokeStyle = each.color;
            contextReal.lineWidth = each.width;
            contextReal.beginPath();
            contextReal.moveTo(each.start[0] + 50, each.start[1]);
            contextReal.quadraticCurveTo(each.start[0], each.start[1], each.start[0], each.start[1] + 37.5);
            contextReal.quadraticCurveTo(each.start[0], each.start[1] + 75, each.start[0] + 25, each.start[1] + 75);
            contextReal.quadraticCurveTo(each.start[0] + 25, each.start[1] + 95, each.start[0] + 5, each.start[1] + 100);
            contextReal.quadraticCurveTo(each.start[0] + 35, each.start[1] + 95, each.start[0] + 40, each.start[1] + 75);
            contextReal.quadraticCurveTo(each.start[0] + 100, each.start[1] + 75, each.start[0] + 100, each.start[1] + 37.5);
            contextReal.quadraticCurveTo(each.start[0] + 100, each.start[1], each.start[0] + 50, each.start[1]);
            contextReal.stroke();
        } else if (each.type === "triangle") {
            contextReal.fillStyle = each.color;
            contextReal.lineWidth = each.width;
            contextReal.beginPath()
            contextReal.moveTo(each.xy[0], each.xy[1]);
            contextReal.lineTo(each.start[0], each.start[1]);
            contextReal.lineTo(each.xy[0] + (each.xy[0] - each.start[0]), each.start[1]);
            contextReal.fill();
        } else if (each.type === "eraser") {
            contextReal.clearRect(each.start[0], each.start[1], each.size, each.size);
            for (i of each.path) {
                contextReal.clearRect(i[0], i[1], each.size, each.size);
            }
        }
    }
})

let grayscale = document.getElementById("grayscale-slider");
grayscale.addEventListener('input', () => {
    contextDraft.filter = `grayscale(${grayscale.value}%)`;
    contextReal.filter = `grayscale(${grayscale.value}%)`;
    contextReal.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
    for (each of log) {
        if (each.type === "Circle") {
            contextReal.fillStyle = each.color
            contextReal.beginPath()
            contextReal.arc(each.x, each.y, each.r, each.sAngle, each.eAngle)
            contextReal.fill()
        } else if (each.type === "draw") {
            contextReal.strokeStyle = each.color;
            contextReal.lineWidth = each.drawWidth;
            contextReal.beginPath();
            contextReal.moveTo(each.moveTo[0], each.moveTo[1]);
            for (i of each.lineTo) {
                contextReal.strokeStyle = each.color;
                contextReal.lineWidth = each.drawWidth;
                contextReal.lineTo(i[0], i[1]);
                contextReal.moveTo(i[0], i[1]);
                contextReal.stroke();
            }
        } else if (each.type === "line") {
            contextReal.strokeStyle = each.color;
            contextReal.lineWidth = each.drawWidth;
            contextReal.beginPath()
            contextReal.moveTo(each.moveTo[0], each.moveTo[1]);
            contextReal.lineTo(each.lineTo[0], each.lineTo[1])
            contextReal.stroke();
        } else if (each.type === "rect") {
            contextReal.fillStyle = each.color;
            contextReal.fillRect(each.x, each.y, each.xdist, each.ydist);
        } else if (each.type === "text") {
            contextReal.font = each.font
            contextReal.fillStyle = each.color
            contextReal.fillText(each.content, each.x, each.y)
        } else if (each.type === "curve") {
            contextReal.strokeStyle = each.color;
            contextReal.lineWidth = each.width;
            contextReal.beginPath();
            contextReal.moveTo(each.moveTo[0], each.moveTo[1]);
            contextReal.quadraticCurveTo(each.control[0], each.control[1], each.end[0], each.end[1]);
            contextReal.stroke();
        } else if (each.type === "bubble") {
            contextReal.strokeStyle = each.color;
            contextReal.lineWidth = each.width;
            contextReal.beginPath();
            contextReal.moveTo(each.start[0] + 50, each.start[1]);
            contextReal.quadraticCurveTo(each.start[0], each.start[1], each.start[0], each.start[1] + 37.5);
            contextReal.quadraticCurveTo(each.start[0], each.start[1] + 75, each.start[0] + 25, each.start[1] + 75);
            contextReal.quadraticCurveTo(each.start[0] + 25, each.start[1] + 95, each.start[0] + 5, each.start[1] + 100);
            contextReal.quadraticCurveTo(each.start[0] + 35, each.start[1] + 95, each.start[0] + 40, each.start[1] + 75);
            contextReal.quadraticCurveTo(each.start[0] + 100, each.start[1] + 75, each.start[0] + 100, each.start[1] + 37.5);
            contextReal.quadraticCurveTo(each.start[0] + 100, each.start[1], each.start[0] + 50, each.start[1]);
            contextReal.stroke();
        } else if (each.type === "triangle") {
            contextReal.fillStyle = each.color;
            contextReal.lineWidth = each.width;
            contextReal.beginPath()
            contextReal.moveTo(each.xy[0], each.xy[1]);
            contextReal.lineTo(each.start[0], each.start[1]);
            contextReal.lineTo(each.xy[0] + (each.xy[0] - each.start[0]), each.start[1]);
            contextReal.fill();
        } else if (each.type === "eraser") {
            contextReal.clearRect(each.start[0], each.start[1], each.size, each.size);
            for (i of each.path) {
                contextReal.clearRect(i[0], i[1], each.size, each.size);
            }
        }
    }
})

let opacity = document.getElementById("opacity-slider");
opacity.addEventListener('input', () => {
    contextDraft.filter = `opacity(${opacity.value}%)`;
    contextReal.filter = `opacity(${opacity.value}%)`;
    contextReal.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
    for (each of log) {
        if (each.type === "Circle") {
            contextReal.fillStyle = each.color
            contextReal.beginPath()
            contextReal.arc(each.x, each.y, each.r, each.sAngle, each.eAngle)
            contextReal.fill()
        } else if (each.type === "draw") {
            contextReal.strokeStyle = each.color;
            contextReal.lineWidth = each.drawWidth;
            contextReal.beginPath();
            contextReal.moveTo(each.moveTo[0], each.moveTo[1]);
            for (i of each.lineTo) {
                contextReal.strokeStyle = each.color;
                contextReal.lineWidth = each.drawWidth;
                contextReal.lineTo(i[0], i[1]);
                contextReal.moveTo(i[0], i[1]);
                contextReal.stroke();
            }
        } else if (each.type === "line") {
            contextReal.strokeStyle = each.color;
            contextReal.lineWidth = each.drawWidth;
            contextReal.beginPath()
            contextReal.moveTo(each.moveTo[0], each.moveTo[1]);
            contextReal.lineTo(each.lineTo[0], each.lineTo[1])
            contextReal.stroke();
        } else if (each.type === "rect") {
            contextReal.fillStyle = each.color;
            contextReal.fillRect(each.x, each.y, each.xdist, each.ydist);
        } else if (each.type === "text") {
            contextReal.font = each.font
            contextReal.fillStyle = each.color
            contextReal.fillText(each.content, each.x, each.y)
        } else if (each.type === "curve") {
            contextReal.strokeStyle = each.color;
            contextReal.lineWidth = each.width;
            contextReal.beginPath();
            contextReal.moveTo(each.moveTo[0], each.moveTo[1]);
            contextReal.quadraticCurveTo(each.control[0], each.control[1], each.end[0], each.end[1]);
            contextReal.stroke();
        } else if (each.type === "bubble") {
            contextReal.strokeStyle = each.color;
            contextReal.lineWidth = each.width;
            contextReal.beginPath();
            contextReal.moveTo(each.start[0] + 50, each.start[1]);
            contextReal.quadraticCurveTo(each.start[0], each.start[1], each.start[0], each.start[1] + 37.5);
            contextReal.quadraticCurveTo(each.start[0], each.start[1] + 75, each.start[0] + 25, each.start[1] + 75);
            contextReal.quadraticCurveTo(each.start[0] + 25, each.start[1] + 95, each.start[0] + 5, each.start[1] + 100);
            contextReal.quadraticCurveTo(each.start[0] + 35, each.start[1] + 95, each.start[0] + 40, each.start[1] + 75);
            contextReal.quadraticCurveTo(each.start[0] + 100, each.start[1] + 75, each.start[0] + 100, each.start[1] + 37.5);
            contextReal.quadraticCurveTo(each.start[0] + 100, each.start[1], each.start[0] + 50, each.start[1]);
            contextReal.stroke();
        } else if (each.type === "triangle") {
            contextReal.fillStyle = each.color;
            contextReal.lineWidth = each.width;
            contextReal.beginPath()
            contextReal.moveTo(each.xy[0], each.xy[1]);
            contextReal.lineTo(each.start[0], each.start[1]);
            contextReal.lineTo(each.xy[0] + (each.xy[0] - each.start[0]), each.start[1]);
            contextReal.fill();
        } else if (each.type === "eraser") {
            contextReal.clearRect(each.start[0], each.start[1], each.size, each.size);
            for (i of each.path) {
                contextReal.clearRect(i[0], i[1], each.size, each.size);
            }
        }
    }
})

let saturate = document.getElementById("saturate-slider");
saturate.addEventListener('input', () => {
    contextDraft.filter = `saturate(${saturate.value}%)`;
    contextReal.filter = `saturate(${saturate.value}%)`;
    contextReal.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
    for (each of log) {
        if (each.type === "Circle") {
            contextReal.fillStyle = each.color
            contextReal.beginPath()
            contextReal.arc(each.x, each.y, each.r, each.sAngle, each.eAngle)
            contextReal.fill()
        } else if (each.type === "draw") {
            contextReal.strokeStyle = each.color;
            contextReal.lineWidth = each.drawWidth;
            contextReal.beginPath();
            contextReal.moveTo(each.moveTo[0], each.moveTo[1]);
            for (i of each.lineTo) {
                contextReal.strokeStyle = each.color;
                contextReal.lineWidth = each.drawWidth;
                contextReal.lineTo(i[0], i[1]);
                contextReal.moveTo(i[0], i[1]);
                contextReal.stroke();
            }
        } else if (each.type === "line") {
            contextReal.strokeStyle = each.color;
            contextReal.lineWidth = each.drawWidth;
            contextReal.beginPath()
            contextReal.moveTo(each.moveTo[0], each.moveTo[1]);
            contextReal.lineTo(each.lineTo[0], each.lineTo[1])
            contextReal.stroke();
        } else if (each.type === "rect") {
            contextReal.fillStyle = each.color;
            contextReal.fillRect(each.x, each.y, each.xdist, each.ydist);
        } else if (each.type === "text") {
            contextReal.font = each.font
            contextReal.fillStyle = each.color
            contextReal.fillText(each.content, each.x, each.y)
        } else if (each.type === "curve") {
            contextReal.strokeStyle = each.color;
            contextReal.lineWidth = each.width;
            contextReal.beginPath();
            contextReal.moveTo(each.moveTo[0], each.moveTo[1]);
            contextReal.quadraticCurveTo(each.control[0], each.control[1], each.end[0], each.end[1]);
            contextReal.stroke();
        } else if (each.type === "bubble") {
            contextReal.strokeStyle = each.color;
            contextReal.lineWidth = each.width;
            contextReal.beginPath();
            contextReal.moveTo(each.start[0] + 50, each.start[1]);
            contextReal.quadraticCurveTo(each.start[0], each.start[1], each.start[0], each.start[1] + 37.5);
            contextReal.quadraticCurveTo(each.start[0], each.start[1] + 75, each.start[0] + 25, each.start[1] + 75);
            contextReal.quadraticCurveTo(each.start[0] + 25, each.start[1] + 95, each.start[0] + 5, each.start[1] + 100);
            contextReal.quadraticCurveTo(each.start[0] + 35, each.start[1] + 95, each.start[0] + 40, each.start[1] + 75);
            contextReal.quadraticCurveTo(each.start[0] + 100, each.start[1] + 75, each.start[0] + 100, each.start[1] + 37.5);
            contextReal.quadraticCurveTo(each.start[0] + 100, each.start[1], each.start[0] + 50, each.start[1]);
            contextReal.stroke();
        } else if (each.type === "triangle") {
            contextReal.fillStyle = each.color;
            contextReal.lineWidth = each.width;
            contextReal.beginPath()
            contextReal.moveTo(each.xy[0], each.xy[1]);
            contextReal.lineTo(each.start[0], each.start[1]);
            contextReal.lineTo(each.xy[0] + (each.xy[0] - each.start[0]), each.start[1]);
            contextReal.fill();
        } else if (each.type === "eraser") {
            contextReal.clearRect(each.start[0], each.start[1], each.size, each.size);
            for (i of each.path) {
                contextReal.clearRect(i[0], i[1], each.size, each.size);
            }
        }
    }
})

let hue_rotate = document.getElementById("hue-rotate-slider");
hue_rotate.addEventListener('input', () => {
    contextDraft.filter = `hue-rotate(${hue_rotate.value}deg)`;
    contextReal.filter = `hue-rotate(${hue_rotate.value}deg)`;
    contextReal.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
    for (each of log) {
        if (each.type === "Circle") {
            contextReal.fillStyle = each.color
            contextReal.beginPath()
            contextReal.arc(each.x, each.y, each.r, each.sAngle, each.eAngle)
            contextReal.fill()
        } else if (each.type === "draw") {
            contextReal.strokeStyle = each.color;
            contextReal.lineWidth = each.drawWidth;
            contextReal.beginPath();
            contextReal.moveTo(each.moveTo[0], each.moveTo[1]);
            for (i of each.lineTo) {
                contextReal.strokeStyle = each.color;
                contextReal.lineWidth = each.drawWidth;
                contextReal.lineTo(i[0], i[1]);
                contextReal.moveTo(i[0], i[1]);
                contextReal.stroke();
            }
        } else if (each.type === "line") {
            contextReal.strokeStyle = each.color;
            contextReal.lineWidth = each.drawWidth;
            contextReal.beginPath()
            contextReal.moveTo(each.moveTo[0], each.moveTo[1]);
            contextReal.lineTo(each.lineTo[0], each.lineTo[1])
            contextReal.stroke();
        } else if (each.type === "rect") {
            contextReal.fillStyle = each.color;
            contextReal.fillRect(each.x, each.y, each.xdist, each.ydist);
        } else if (each.type === "text") {
            contextReal.font = each.font
            contextReal.fillStyle = each.color
            contextReal.fillText(each.content, each.x, each.y)
        } else if (each.type === "curve") {
            contextReal.strokeStyle = each.color;
            contextReal.lineWidth = each.width;
            contextReal.beginPath();
            contextReal.moveTo(each.moveTo[0], each.moveTo[1]);
            contextReal.quadraticCurveTo(each.control[0], each.control[1], each.end[0], each.end[1]);
            contextReal.stroke();
        } else if (each.type === "bubble") {
            contextReal.strokeStyle = each.color;
            contextReal.lineWidth = each.width;
            contextReal.beginPath();
            contextReal.moveTo(each.start[0] + 50, each.start[1]);
            contextReal.quadraticCurveTo(each.start[0], each.start[1], each.start[0], each.start[1] + 37.5);
            contextReal.quadraticCurveTo(each.start[0], each.start[1] + 75, each.start[0] + 25, each.start[1] + 75);
            contextReal.quadraticCurveTo(each.start[0] + 25, each.start[1] + 95, each.start[0] + 5, each.start[1] + 100);
            contextReal.quadraticCurveTo(each.start[0] + 35, each.start[1] + 95, each.start[0] + 40, each.start[1] + 75);
            contextReal.quadraticCurveTo(each.start[0] + 100, each.start[1] + 75, each.start[0] + 100, each.start[1] + 37.5);
            contextReal.quadraticCurveTo(each.start[0] + 100, each.start[1], each.start[0] + 50, each.start[1]);
            contextReal.stroke();
        } else if (each.type === "triangle") {
            contextReal.fillStyle = each.color;
            contextReal.lineWidth = each.width;
            contextReal.beginPath()
            contextReal.moveTo(each.xy[0], each.xy[1]);
            contextReal.lineTo(each.start[0], each.start[1]);
            contextReal.lineTo(each.xy[0] + (each.xy[0] - each.start[0]), each.start[1]);
            contextReal.fill();
        } else if (each.type === "eraser") {
            contextReal.clearRect(each.start[0], each.start[1], each.size, each.size);
            for (i of each.path) {
                contextReal.clearRect(i[0], i[1], each.size, each.size);
            }
        }
    }
})


//Undo Function
let log = []
let popLog = []
undoButton.addEventListener('click', (e) => {
    if (log.length > 0) {
        popLog.push(log[log.length - 1])
        log.pop()
        console.log(log)
        console.log(popLog)
        contextReal.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        for (each of log) {
            if (each.type === "Circle") {
                contextReal.fillStyle = each.color
                contextReal.beginPath()
                contextReal.arc(each.x, each.y, each.r, each.sAngle, each.eAngle)
                contextReal.fill()
            } else if (each.type === "draw") {
                contextReal.strokeStyle = each.color;
                contextReal.lineWidth = each.drawWidth;
                contextReal.beginPath();
                contextReal.moveTo(each.moveTo[0], each.moveTo[1]);
                for (i of each.lineTo) {
                    contextReal.strokeStyle = each.color;
                    contextReal.lineWidth = each.drawWidth;
                    contextReal.lineTo(i[0], i[1]);
                    contextReal.moveTo(i[0], i[1]);
                    contextReal.stroke();
                }
            } else if (each.type === "line") {
                contextReal.strokeStyle = each.color;
                contextReal.lineWidth = each.drawWidth;
                contextReal.beginPath()
                contextReal.moveTo(each.moveTo[0], each.moveTo[1]);
                contextReal.lineTo(each.lineTo[0], each.lineTo[1])
                contextReal.stroke();
            } else if (each.type === "rect") {
                contextReal.fillStyle = each.color;
                contextReal.fillRect(each.x, each.y, each.xdist, each.ydist);
            } else if (each.type === "text") {
                contextReal.font = each.font
                contextReal.fillStyle = each.color
                contextReal.fillText(each.content, each.x, each.y)
            } else if (each.type === "curve") {
                contextReal.strokeStyle = each.color;
                contextReal.lineWidth = each.width;
                contextReal.beginPath();
                contextReal.moveTo(each.moveTo[0], each.moveTo[1]);
                contextReal.quadraticCurveTo(each.control[0], each.control[1], each.end[0], each.end[1]);
                contextReal.stroke();
            } else if (each.type === "bubble") {
                contextReal.strokeStyle = each.color;
                contextReal.lineWidth = each.width;
                contextReal.beginPath();
                contextReal.moveTo(each.xy[0] + 50, each.xy[1]);
                contextReal.quadraticCurveTo(each.xy[0], each.xy[1], each.xy[0], each.xy[1] + 37.5);
                contextReal.quadraticCurveTo(each.xy[0], each.xy[1] + 75, each.xy[0] + 25, each.xy[1] + 75);
                contextReal.quadraticCurveTo(each.xy[0] + 25, each.xy[1] + 95, each.xy[0] + 5, each.xy[1] + 100);
                contextReal.quadraticCurveTo(each.xy[0] + 35, each.xy[1] + 95, each.xy[0] + 40, each.xy[1] + 75);
                contextReal.quadraticCurveTo(each.xy[0] + 100, each.xy[1] + 75, each.xy[0] + 100, each.xy[1] + 37.5);
                contextReal.quadraticCurveTo(each.xy[0] + 100, each.xy[1], each.xy[0] + 50, each.xy[1]);
                contextReal.stroke();
            } else if (each.type === "triangle") {
                contextReal.fillStyle = each.color;
                contextReal.lineWidth = each.width;
                contextReal.beginPath()
                contextReal.moveTo(each.xy[0], each.xy[1]);
                contextReal.lineTo(each.start[0], each.start[1]);
                contextReal.lineTo(each.xy[0] + (each.xy[0] - each.start[0]), each.start[1]);
                contextReal.fill();
            } else if (each.type === "eraser") {
                contextReal.clearRect(each.start[0], each.start[1], each.size, each.size);
                for (i of each.path) {
                    contextReal.clearRect(i[0], i[1], each.size, each.size);
                }
            } else if (each.type === "hexagon") {
                contextReal.fillStyle = each.color;
                contextReal.lineWidth = each.width;
                let hexSides = 6;
                let hexStep = 2 * Math.PI / hexSides;
                let hexShift = (Math.PI / 180.0) * -0.1;
                contextReal.beginPath();
                for (let i = 0; i <= hexSides; i++) {
                    let curStep = i * hexStep + hexShift;
                    console.log(curStep);
                    contextReal.lineTo(each.xy[0] + (each.xy[0] - each.start[0]) * Math.cos(curStep), each.xy[1] + (each.xy[1] - each.start[1]) * Math.sin(curStep));
                    console.log.apply(contextReal.lineTo);
                }
                contextReal.fill();
            } else if (each.type === "pentagon") {
                contextReal.fillStyle = each.color;
                let sides = 5;
                let step = 2 * Math.PI / sides;
                let shift = (Math.PI / 180.0) * -18;
                contextReal.beginPath();
                for (let i = 0; i <= sides; i++) {
                    let curStep = i * step + shift;
                    console.log(curStep);
                    contextReal.lineTo(each.xy[0] + (each.xy[0] - each.start[0]) * Math.cos(curStep), each.xy[1] + (each.xy[1] - each.start[1]) * Math.sin(curStep));
                }
                contextReal.fill();
            }
        }
    }
})

//Redo Function
redoButton.addEventListener('click', (e) => {
    if (popLog.length > 0) {
        let lastItem = popLog[popLog.length - 1]
        log.push(lastItem)
        popLog.pop()
        if (lastItem.type === "Circle") {
            contextReal.fillStyle = lastItem.color
            contextReal.beginPath()
            contextReal.arc(lastItem.x, lastItem.y, lastItem.r, lastItem.sAngle, lastItem.eAngle)
            contextReal.fill()
        } else if (lastItem.type === "draw") {
            contextReal.strokeStyle = lastItem.color;
            contextReal.lineWidth = lastItem.drawWidth;
            contextReal.beginPath();
            contextReal.moveTo(lastItem.moveTo[0], lastItem.moveTo[1]);
            for (i of lastItem.lineTo) {
                contextReal.lineTo(i[0], i[1]);
                contextReal.moveTo(i[0], i[1]);
                contextReal.stroke();
            }
        } else if (lastItem.type === "line") {
            contextReal.strokeStyle = lastItem.color;
            contextReal.lineWidth = lastItem.drawWidth;
            contextReal.beginPath()
            contextReal.moveTo(lastItem.moveTo[0], lastItem.moveTo[1]);
            contextReal.lineTo(lastItem.lineTo[0], lastItem.lineTo[1])
            contextReal.stroke();
        } else if (lastItem.type === "rect") {
            contextReal.fillStyle = lastItem.color;
            contextReal.fillRect(lastItem.x, lastItem.y, lastItem.xdist, lastItem.ydist);
        } else if (lastItem.type === "text") {
            contextReal.font = lastItem.font
            contextReal.fillStyle = lastItem.color
            contextReal.fillText(lastItem.content, lastItem.x, lastItem.y)
        } else if (lastItem.type === "curve") {
            contextReal.strokeStyle = lastItem.color;
            contextReal.lineWidth = lastItem.width;
            contextReal.beginPath();
            contextReal.moveTo(lastItem.moveTo[0], lastItem.moveTo[1]);
            contextReal.quadraticCurveTo(lastItem.control[0], lastItem.control[1], lastItem.end[0], lastItem.end[1]);
            contextReal.stroke();
        } else if (lastItem.type === "bubble") {
            contextReal.strokeStyle = lastItem.color;
            contextReal.lineWidth = lastItem.width;
            contextReal.beginPath();
            contextReal.moveTo(lastItem.xy[0] + 50, lastItem.xy[1]);
            contextReal.quadraticCurveTo(lastItem.xy[0], lastItem.xy[1], lastItem.xy[0], lastItem.xy[1] + 37.5);
            contextReal.quadraticCurveTo(lastItem.xy[0], lastItem.xy[1] + 75, lastItem.xy[0] + 25, lastItem.xy[1] + 75);
            contextReal.quadraticCurveTo(lastItem.xy[0] + 25, lastItem.xy[1] + 95, lastItem.xy[0] + 5, lastItem.xy[1] + 100);
            contextReal.quadraticCurveTo(lastItem.xy[0] + 35, lastItem.xy[1] + 95, lastItem.xy[0] + 40, lastItem.xy[1] + 75);
            contextReal.quadraticCurveTo(lastItem.xy[0] + 100, lastItem.xy[1] + 75, lastItem.xy[0] + 100, lastItem.xy[1] + 37.5);
            contextReal.quadraticCurveTo(lastItem.xy[0] + 100, lastItem.xy[1], lastItem.xy[0] + 50, lastItem.xy[1]);
            contextReal.stroke();
        } else if (lastItem.type === "triangle") {
            contextReal.fillStyle = lastItem.color;
            contextReal.lineWidth = lastItem.width;
            contextReal.beginPath()
            contextReal.moveTo(lastItem.xy[0], lastItem.xy[1]);
            contextReal.lineTo(lastItem.start[0], lastItem.start[1]);
            contextReal.lineTo(lastItem.xy[0] + (lastItem.xy[0] - lastItem.start[0]), lastItem.start[1]);
            contextReal.fill();
        } else if (lastItem.type === "eraser") {
            contextReal.clearRect(lastItem.start[0], lastItem.start[1], lastItem.size, lastItem.size);
            for (i of lastItem.path) {
                contextReal.clearRect(i[0], i[1], lastItem.size, lastItem.size);
            }
        } else if (lastItem.type === "hexagon") {
            contextReal.fillStyle = lastItem.color;
            let hexSides = 6;
            let hexStep = 2 * Math.PI / hexSides;
            let hexShift = (Math.PI / 180.0) * -0.1;

            contextReal.beginPath();
            for (let i = 0; i <= hexSides; i++) {
                let curStep = i * hexStep + hexShift;
                console.log(curStep);
                contextReal.lineTo(lastItem.xy[0] + (lastItem.xy[0] - lastItem.start[0]) * Math.cos(curStep), lastItem.xy[1] + (lastItem.xy[1] - lastItem.start[1]) * Math.sin(curStep));
                console.log.apply(contextReal.lineTo);
            }
            contextReal.fill();
        } else if (lastItem.type === "pentagon") {
            contextReal.fillStyle = lastItem.color;
            let sides = 5;
            let step = 2 * Math.PI / sides;
            let shift = (Math.PI / 180.0) * -18;
            contextReal.beginPath();
            for (let i = 0; i <= sides; i++) {
                let curStep = i * step + shift;
                console.log(curStep);
                contextReal.lineTo(lastItem.xy[0] + (lastItem.xy[0] - lastItem.start[0]) * Math.cos(curStep), lastItem.xy[1] + (lastItem.xy[1] - lastItem.start[1]) * Math.sin(curStep));
            }
            contextReal.fill();
        }

    }
})

$(document).ready(function btnImage() {
    let imagePath = [
        "Pen.png",
        "Eraser.png",
        "Line.png",
        "Quadratic.png",
        "Rectangle.png",
        "Circle.png",
        "Triangle.png",
        "Pentagon.png",
        "Hexagon.png",
        "Chat.png",
        "Text.png",
        "Zoom.png",
        "Undo.png",
        "Redo.png",
        "Clear.png",
        "Download.png"
    ];

    let imageName = [];
    let imageId =[];

    let countButton = $('button').length;
    for (let i = 0; i <= countButton; i++) {
        imageName.push(imagePath[i].split(".", 1));
        console.log(imageName);
        imagePath.push(`../images/${imagePath[i]}`);
        $("button").eq(`${i}`).append(`<img src="../images/normal/${imagePath[i]}" alt="${imageName[i]}">`);
        $("button").eq(`${i}`).attr("title", `${imageName[i]}`);
    }
    
    $("button").each(function(){
        imageId.push($(this).attr("id"));
        console.log(imageId);
    })

    for (let i = 0; i <= countButton; i++) {
        let src = $(`button[id=${imageId[i]}] > img`);
        $(`[id=${imageId[i]}]`).hover(function() {
                $(this).addClass("btnHover");
                src.attr("src", src.attr("src").replace("normal", "hover"));
                src.addClass("btnScale");
            }, function() {
                $(this).removeClass("btnHover");
                src.attr("src", src.attr("src").replace("hover", "normal"));
                src.removeClass("btnScale");
        })
    }

})
