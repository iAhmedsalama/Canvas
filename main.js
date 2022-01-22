// @ts-nocheck

let canvas = document.querySelector('canvas');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let ctx = canvas.getContext('2d');

ctx.font = '50pt times new roman'
ctx.strokeStyle = '#09c';

// ctx.fillText('Welcome', 500,400);
// console.log(ctx);
// console.log(ctx.font);
// console.log(ctx.strokeStyle);

//-----------------------------------------------------

//create rectangle
/*
ctx.fillStyle = 'rgb(255,0,0)';
ctx.fillRect(400, 400, 100, 100)

ctx.fillStyle = 'rgb(0,255,0)';
ctx.fillRect(500, 0, 100, 100)

ctx.fillStyle = 'rgb(0,0,255)';
ctx.fillRect(700, 400, 100, 100)

ctx.stroke()
ctx.fill()
*/

/*
canvas.addEventListener('click',function(e){
    // ctx.rect(e.offsetX, e.offsetY,Math.random() * window.innerWidth ,Math.random() * window.innerHeight);
    ctx.rect(e.offsetX, e.offsetY,200,400);
    ctx.stroke()
    console.log('rect');
});
*/
//-----------------------------------------------------

//create line
/*
ctx.beginPath()
ctx.moveTo(100, 150);
ctx.lineTo(450, 50);
ctx.lineWidth = 2;
ctx.stroke()
*/

//-----------------------------------------------------


//create Arch / circles

/*
ctx.beginPath()
ctx.arc(700, 200, 30, Math.PI * 2, false);
ctx.fillStyle = 'tomato';
ctx.strokeStyle = 'magenta'
ctx.fill()
ctx.stroke()
*/

/*
canvas.addEventListener('click',function(e){
    ctx.beginPath()
    ctx.arc(e.offsetX,e.offsetY,30,Math.PI*2,false);
    ctx.fillStyle='yellow';
    ctx.fill();
    ctx.strokeStyle='magenta';
    ctx.stroke();
})
*/

/*
for (let i = 0; i < 20; i++) {
    let x = Math.random();
    let y = Math.random();

    let randomFill = Math.random();
    let randomStrock = Math.random();

    ctx.beginPath();
    ctx.arc(x * window.innerWidth, y * window.innerHeight, 60, 0, Math.PI * 2, false);

    // ctx.fillStyle = 'green';
    ctx.fillStyle = randomFill;
    ctx.fill();
    // ctx.strokeStyle = 'blue';
    ctx.strokeStyle = randomStrock;
    ctx.stroke();

}
*/

/*
canvas.addEventListener("click", function (e) {
    for (let i = 0; i < 1; i++) {

        //generate random colors
        randomFill = '#' + Math.floor(Math.random() * 16777215).toString(16);
        // console.log(randomFill);

        //generate random colors
        let randomStrock = '#' + Math.floor(Math.random() * 16777215).toString(16);
        // console.log(randomStrock);


        ctx.beginPath()
        ctx.arc(e.offsetX, e.offsetY, 50, 0, Math.PI * 2, false)

        // ctx.fillStyle = 'magenta';
        ctx.fillStyle = randomFill;
        ctx.fill();

        // ctx.strokeStyle = 'black';
        ctx.strokeStyle = randomStrock;
        ctx.stroke();

    }
})
*/

//-----------------------------------------------------

//declare mouse object to store mouse coordinates of the screen on it
let mouse = {
    x: undefined,
    y: undefined
}
let maxRadius = 40;
let minRadius = 5;

let maxDist = 50;
let minDist = -50;

// addEvent to get the mouse coordinates on the screen
canvas.addEventListener('mousemove', function (e) {
    mouse.x = e.x;
    mouse.y = e.y;
})

// addEvent to resize the screen
window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.length = window.innerHeight;

    init();
})

// define the color array
// let colorArray = [
//     '#ffaa33',
//     '#99ffaaa',
//     '#00ff00',
//     '#4411aa',
//     '#ff1100'
// ]

let colorArray = [
    '#2C3E50',
    '#E74C3C',
    '#ECF0F1',
    '#3498DB',
    '#2980B9'
]
//Circle object
function Circle(x, y, dx, dy, radius) {
    this.x = x
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;

    // //random fill
    // let randomFill = '#' + Math.floor(Math.random() * 16777215).toString(16);
    // //random strock
    // let randomStroke = '#' + Math.floor(Math.random() * 16777215).toString(16);

    this.color = colorArray[Math.floor(Math.random() * colorArray.length)]

    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

        ctx.fillStyle = this.color;
        ctx.fill();

        ctx.strokeStyle = this.color;
        ctx.stroke();
    }

    this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        //interactivity
        if (mouse.x - this.x < maxDist && mouse.x - this.x > minDist
            && mouse.y - this.y < maxDist && mouse.y - this.y > minDist) {
            if (this.radius < maxRadius) {
                this.radius += 1;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

        this.draw();
    }
}



let circleArray = [];

// init() function
function init() {
    circleArray = [];
    for (let i = 0; i < 800; i++) {
        let radius = Math.random() * 3 + 1;

        let x = Math.random() * (innerWidth - radius * 2) + radius;
        let y = Math.random() * (innerHeight - radius * 2) + radius;

        let dy = (Math.random() - 0.5);
        let dx = (Math.random() - 0.5);

        circleArray.push(new Circle(x, y, dx, dy, radius));

    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}
init();
animate();

