let canvas;
let context;
let width;
let height;
let interval_id;

let objects = []
let snake = {
    x : 100,
    y : 250,
    size : 40
};

let moveRight = false;
let moveUp = false;
let moveDown = false;
let moveLeft = false;

let counter = 0;
let count_display;

document.addEventListener('DOMContentLoaded', init, false);

function init() {
  canvas = document.querySelector('canvas');
  context = canvas.getContext('2d');
  width = canvas.width;
  height = canvas.height;
  let control_div = create_control_div();
  let aside = document.querySelector('aside')
  aside.appendChild(control_div);
  window.addEventListener('keydown', activate, false)
  interval_id = window.setInterval(draw, 33);
}

function draw() {
    if (objects.length < 1){
        let object = {
            x : getRandomNumber(0, width - 40),
            y : getRandomNumber(0, height - 40),
            size : 40
        };
        objects.push(object);
    }
    context.clearRect(0, 0, width, height);
    context.fillStyle = 'red';
    for (let object of objects){
    context.fillRect(object.x, object.y, object.size, object.size);
    }
    context.fillStyle = 'green';
    context.fillRect(snake.x, snake.y, snake.size, snake.size);
    if (moveRight){
      snake.x += 10;
    }
    if (moveUp){
      snake.y -= 10;
    }
    if (moveDown){
      snake.y += 10;
    }
    if (moveLeft){
      snake.x -= 10;
    }
    if ((snake.x - 20) + snake.size >= height){
        stop();
        window.alert('YOU LOSE! Your total was ' + counter + '!');
        location.reload();
    } else if ((snake.y + 20 ) <= 0){
        stop();
        window.alert('YOU LOSE! Your total was ' + counter + '!');
        location.reload();
    } else if ((snake.x + 20) <= 0){
        stop();
        window.alert('YOU LOSE! Your total was ' + counter + '!');
        location.reload();
    } else if ((snake.y - 20)  + snake.size >= width){
        stop();
        window.alert('YOU LOSE! Your total was ' + counter + '!');
        location.reload();
    }
    for (let object of objects){
      if (collides(object)){
          count_display.nodeValue = 'Score: ' + (counter + 1)
          counter += 1
          objects.pop(object)
          return;
        }
    }
}

function create_control_div(){
    count_display = document.createTextNode('');
    let control_div = document.createElement('div');
    control_div.appendChild(count_display);
    return control_div;
}

function collides(object) {
    if (snake.x + snake.size < object.x ||
        object.x + object.size < snake.x ||
        snake.y > object.y + object.size ||
        object.y > snake.y + snake.size) {
        return false;
    } else {
        return true;
    }
}

function activate(event){
  let keycode = event.keyCode;
  if (keycode === 38){
      moveUp = true;
      moveRight = false;
      moveDown = false;
      moveLeft = false;
  } else if (keycode === 39){
    moveUp = false;
    moveRight = true;
    moveDown = false;
    moveLeft = false;
  } else if (keycode === 40){
    moveUp = false;
    moveRight = false;
    moveDown = true;
    moveLeft = false;
  } else if (keycode === 37){
    moveUp = false;
    moveRight = false;
    moveDown = false;
    moveLeft = true;
  }
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function stop() {
    clearInterval(interval_id);
    window.removeEventListener('keydown', activate);
}