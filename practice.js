let out = document.querySelector(".out");
let snake = document.querySelector(".snakeHead");
let left = document.querySelector(".left");
let up = document.querySelector(".up");
let down = document.querySelector(".down");
let right = document.querySelector(".right");
let food = document.querySelector(".food")

let way = "s";
let speed = 20;
let step = 1;
let area = 290;
let coordinates= [];
let i = 1;
let long = 10;
let crutch = true;
let cornersHeadSnake = [];
let foodSides = [];
let bodySides = [];
let fail = () => `You fail. Score: ${score.innerHTML}`;

//every body-box assign coordinates 
function moveBody (x,j) {
  setInterval(()=>{
    let box = document.querySelector(`${"#part"+x}`)
    box.style.top = coordinates[x+j][0];
    box.style.left = coordinates[x+j][1];
    if (x > 2) {
    for (let i = 0; i < 10; i += 1) {
    bodySides.push([box.style.top, parseInt(box.style.left) + i + "px"].toString());
    
    bodySides.push([parseInt(box.style.top) + 10 + "px", parseInt(box.style.left) + (10 - i) + "px"].toString());
  }
  
  for (let i = 0; i < 10; i += 1) {
    bodySides.push([parseInt(box.style.top) + i + "px", parseInt(box.style.left) + 10 + "px"].toString());
  
    bodySides.push([parseInt(box.style.top) + (10 - i) + "px", box.style.left].toString());
  }
 }
    
  }, speed)
}

//check snake hurt yourself body, if NOT, then take coordinates 
function coord () {
  for (let y = 0; y < cornersHeadSnake.length; y += 1) {
    if (bodySides.includes(cornersHeadSnake[y].toString()) && crutch) {
    crutch = false;
    location.reload();
    clearInterval(process);
    alert(fail());
    }
  }
 
  if (coordinates.size > (area * 2)) coordinates.pop();
  coordinates.unshift([snake.style.top, snake.style.left])
  corners();
}

//get coordinates 4 corners head snake
function corners() {
  cornersHeadSnake = [];
  cornersHeadSnake.push([snake.style.top, snake.style.left]);
  cornersHeadSnake.push([snake.style.top, parseInt(snake.style.left) + 10 + "px"]);
  cornersHeadSnake.push([parseInt(snake.style.top) + 10 + "px", parseInt(snake.style.left) + 10 + "px"]);
  cornersHeadSnake.push([parseInt(snake.style.top) + 10 + "px", snake.style.left]);
}

//creat food
function randLocFood () {
  food.style.top = Math.round(Math.random()*(area/step))*step + "px";
  food.style.left = Math.round(Math.random()*(area/step))*step + "px";
  foodBorder()
}
randLocFood ();

//get all sides food
function foodBorder() {
  foodSides = [];
  for (let i = 0; i < 10; i += 1) {
    foodSides.push([food.style.top, parseInt(food.style.left) + i + "px"].toString());
    
    foodSides.push([parseInt(food.style.top) + 10 + "px", parseInt(food.style.left) + (10 - i) + "px"].toString());
  }
  
  for (let i = 0; i < 10; i += 1) {
    foodSides.push([parseInt(food.style.top) + i + "px", parseInt(food.style.left) + 10 + "px"].toString());
  
    foodSides.push([parseInt(food.style.top) + (10 - i) + "px", food.style.left].toString());
  }
}

//check eat food, if YES, then creat body-box
function check() {
  let checkArrays = false;
  for (let y = 0; y < cornersHeadSnake.length; y += 1) {
    if (foodSides.includes(cornersHeadSnake[y].toString())) {
      checkArrays = true;
      break;
    }
  }

  if (checkArrays) {
    randLocFood();
     out.insertAdjacentHTML("afterbegin", `<div class='snakeBody' style='top:${coordinates[0][0]}; left:${coordinates[0][1]}' id='${'part'+i}'></div>`)
     moveBody(i,long)
     i += 1;
     long += 10;
     score.innerHTML = +score.innerHTML + 1;
     //speed -= 10;
  }
}

//process interval
let process = setInterval(() => {
  switch (way) {
    case "u": 
      snake.style.top = (parseInt(snake.style.top) || 0) - step + "px";
      break;
    case "d": 
      snake.style.top = (parseInt(snake.style.top) || 0) + step + "px";
      break;
    case "l": 
      snake.style.left = (parseInt(snake.style.left) || 0) - step + "px";
      break;
    case "r": 
      snake.style.left = (parseInt(snake.style.left) || 0) + step + "px";
      break;
    default: 
      break;
  }
  
  if (parseInt(snake.style.top) < 0 || parseInt(snake.style.top) > area || parseInt(snake.style.left) < 0 || parseInt(snake.style.left) > area) {
       alert(fail());
       clearInterval(process);
       location.reload();
    } 
  
  check();
  coord();
  bodySides.splice(0)
}, speed)

function direction (xy) {
  if (way === "u" && xy === "d" && i > 1) return;
  if (way === "d" && xy === "u" && i > 1) return;
  if (way === "l" && xy === "r" && i > 1) return;
  if (way === "r" && xy === "l" && i > 1) return;
  way = xy;
}

up.addEventListener("click", () => direction("u"))

down.addEventListener("click", () => direction("d"))

left.addEventListener("click", () => direction("l"))

right.addEventListener("click", () => direction("r"))
