let out = document.querySelector(".out");
let snake = document.querySelector(".snakeHead");
let left = document.querySelector(".left");
let up = document.querySelector(".up");
let down = document.querySelector(".down");
let right = document.querySelector(".right");
let food = document.querySelector(".food")

let way = "s";
let speed = 10;
let step = 1;
let areaMin = 0;
let areaMax = 290;
let coordinates= [];
let i = 1;
let long = 10;
let crutch = true;
let cornersHeadSnake = [];
let foodSides = [];
let bodySides = [];
let boxs = [];
let fail = () => `You fail. Score: ${score.innerHTML}`;

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
 
  if (coordinates.size > (areaMax * 2)) coordinates.pop();
  coordinates.unshift([snake.style.top, snake.style.left])
  corners();
}

//get coordinates 4 corners head snake
function corners() {
  let topSnake = parseInt(snake.style.top);
  let leftSnake = parseInt(snake.style.left);
  cornersHeadSnake = [];
  cornersHeadSnake.push([snake.style.top, snake.style.left]);
  cornersHeadSnake.push([snake.style.top, leftSnake + 10 + "px"]);
  cornersHeadSnake.push([topSnake + 10 + "px", leftSnake + 10 + "px"]);
  cornersHeadSnake.push([topSnake + 10 + "px", snake.style.left]);
}

//creat food
function randLocFood () {
  food.style.top = Math.round(Math.random()*(areaMax/step))*step + "px";
  food.style.left = Math.round(Math.random()*(areaMax/step))*step + "px";
  foodBorder()
}
randLocFood ();

//get all sides food
function foodBorder() {
  let topFood = parseInt(food.style.top);
  let leftFood = parseInt(food.style.left);
  foodSides = [];
  for (let i = 0; i < 10; i += 1) {
    foodSides.push([food.style.top, leftFood + i + "px"].toString());
    
    foodSides.push([topFood + 10 + "px", leftFood + (10 - i) + "px"].toString());
  }
  
  for (let i = 0; i < 10; i += 1) {
    foodSides.push([topFood + i + "px", leftFood + 10 + "px"].toString());
  
    foodSides.push([topFood + (10 - i) + "px", food.style.left].toString());
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
     boxs.push(`${"part"+i}`)
     i += 1;
     score.innerHTML = +score.innerHTML + 1;
     //speed -= 10;
  }
}

//process interval
let process = setInterval(() => {
  
  let topSnake = parseInt(snake.style.top);
  let leftSnake = parseInt(snake.style.left);

  switch (way) {
    case "u": 
      snake.style.top = (topSnake || 0) - step + "px";
      break;
    case "d": 
      snake.style.top = (topSnake || 0) + step + "px";
      break;
    case "l": 
      snake.style.left = (leftSnake || 0) - step + "px";
      break;
    case "r": 
      snake.style.left = (leftSnake || 0) + step + "px";
      break;
    default: 
      break;
  }
  
  if (topSnake < areaMin || topSnake > areaMax || leftSnake < areaMin || leftSnake > areaMax) {
       alert(fail());
       clearInterval(process);
       location.reload();
    } 
  
  for (let p = 0; p < boxs.length; p += 1) {
   let box = document.querySelector(`#${boxs[p]}`)
   box.style.top = coordinates[p+long][0];
   box.style.left = coordinates[+long][1];
   
   //if (p > 1) 
  let top = parseInt(box.style.top);
  let left = parseInt(box.style.left);
  for (let i = 0; i < 10; i += 2) {
    bodySides.push([top + 5 + "px", left + i + "px"].toString());
    bodySides.push([top + (10 - i) + "px", left + 5 + "px"].toString());
}
   
   long += 10;
  }
  long = 10;
  
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
