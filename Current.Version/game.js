
window.onload = () => {
  document.getElementById('start-button').onclick = () => {
      startGame();
  };

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Set the background color of the canvas
ctx.fillStyle = "lightblue";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Load the background image
const backgroundImage = new Image();
backgroundImage.src = 'images/bckgroundVessel.png';

const cursorImg = new Image();
cursorImg.src = 'images/cursor1.png';

backgroundImage.onload = function() {
  // Draw the background image
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height,);
  ctx.drawImage(cursorImg, 0, 0, cursorX, CursorY);

};


const GOLD_INCREMENT = 1;
//will ad const startButton = document.createElement('button'); startButton.textContent = 'Start Game'; startButton.style.position = 'absolute'; startButton.style.top = '50%'; startButton.style.left = '50%'; startButton.style.transform = 'translate(-50%, -50%)'; canvas.parentNode.appendChild(startButton);

let Points = 0;
let Immune = 9999999;
let elapsedTime = 0;
let lastEnemySpawnTime = 0;
const enemySpawnInterval = 1000; // Spawn a new enemy every second
cursor="cursorImg"


let enemies = [
  { ap: 1, hp: 1, speed: 1, x: canvas.width, y: 0, width: 100, height: 100, image: 'images/lvl1.png' },
  { ap: 2, hp: 2, speed: 1.2, x: canvas.width, y: 0, width: 100, height: 100, image: 'images/lvl2.png' },
  { ap: 3, hp: 3, speed: 1.4, x: canvas.width, y: 0, width: 100, height: 100, image: 'images/lvl3.png' },
  { ap: 4, hp: 4, speed: 1.6, x: canvas.width, y: 0, width: 100, height: 100, image: 'images/lvl4.png' },
  { ap: 5, hp: 5, speed: 1.8, x: canvas.width, y: 0, width: 100, height: 100, image: 'images/lvl5.png' },
];


//Doesn't work!
// Rotate the enemy images


function draw() {
  {
  // Clear the canvas
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  

  // Set offsets
  const xOffset = 45;
  const yOffset = 460;

  // Draw indicators with offsets
  ctx.font = "34px Virus";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`Points: ${Points}`, 10 + xOffset, 25 + yOffset);
  ctx.fillText(`Immune: ${Immune}`, 10 + xOffset, 55 + yOffset);
}


// Upgrade boxes
const boxWidth = 220;
const totalBoxWidth = boxWidth * 5;
const xOffset = (canvas.width - totalBoxWidth) / 2.2;
const boxHeight = 100;
const yOffset = 5;
const boxImages = ['images/u1.png', 'images/u2.png', 'images/u3.png', 'images/u4.png', 'images/u5.png']; // box images

// Draw the boxes
for (let i = 0; i < boxImages.length; i++) {
  const image = new Image();
  image.src = boxImages[i];
    ctx.drawImage(image, xOffset + (boxWidth + 5) *i, yOffset, boxWidth, boxHeight);
  };
  
  // Move enemies
  for (let i = 0; i < enemies.length; i++) {
    const enemy = enemies[i];
    enemy.x -= enemy.speed;

    // Remove enemy when it reaches the left side of the canvas
    if (enemy.x <= 0) {
      enemies.splice(i, 1);
      Immune -= enemy.ap;

      // Game over
      if (Immune <= 0) {
        alert("Game over!");
        location.reload();
      }


    } else {
      // Draw the enemy
      const image = new Image();
      image.src = enemy.image;
      ctx.drawImage(image, enemy.x, enemy.y, enemy.width, enemy.height);
      
    }
  }
}




// Does not work at al !!!!!
// Does not work at al !!!!!
// Does not work at al !!!!!
// Does not work at al !!!!!
function onClick2(event) {
  let mouseX = event.clientX - canvas.offsetLeft;
  let mouseY = event.clientY - canvas.offsetTop;

  for (let i = 0; i < boxColors.length; i++) {
    let boxX = xOffset + (boxWidth + 20) * i; // calculate the x position of the box
    let boxY = yOffset; // calculate the y position of the box
    if (
      mouseX >= boxX &&
      mouseX <= boxX + boxWidth &&
      mouseY >= boxY && 
      mouseY <= boxY + boxHeight
    ) {
      // add your code to execute if the condition is true
      console.log(onClick2, i);
      // or any other code you want to run
    }
  }

  // redraw the boxes with the updated colors
  for (let i = 0; i < boxColors.length; i++) {
    ctx.fillStyle = clickedBoxColors[i];
    ctx.fillRect(xOffset + (boxWidth + 20) * i, yOffset, boxWidth, boxHeight);
  }
}



function onClick(event) {
  let audio = new Audio('sounds/kill.mp3');
  let audio2 = new Audio('sounds/hit.mp3');
  let mouseX = event.clientX - canvas.offsetLeft;
  let mouseY = event.clientY - canvas.offsetTop;


  for (let i = 0; i < enemies.length; i++) {
    let enemy = enemies[i];
    if (
      mouseX >= enemy.x &&
      mouseX <= enemy.x + enemy.width &&
      mouseY >= enemy.y &&
      mouseY <= enemy.y + enemy.height
    ) {
      enemy.hp -= 1;
      if (enemy.hp <= 0) {
        enemies.splice(i, 1); // Remove enemy
        Points += GOLD_INCREMENT;
        audio.play();
      }
      break; // Exit loop after one enemy is clicked
    }
  }
}



canvas.addEventListener("click", onClick);
canvas.addEventListener("click", onClick2);

setInterval(draw, 10);
setInterval(() => {
  elapsedTime += 1000;
  
  // Spawn enemies
  let enemyY = Math.floor(Math.random() * (575 - enemies[0].height - 50) + 50);
  let numEnemies = Math.min(enemies.length, Math.floor(elapsedTime / 10000) + 1);
  for (let i = 0; i < numEnemies; i++) {
    let enemy = Object.assign({i}, enemies[i], {x: canvas.width, y: enemyY});
    enemies.push(enemy);
    }
      // Check elapsed time and update enemies
  if (elapsedTime <= 10000, enemies.length < 1) {
    // Spawn first enemy
    let enemyY = Math.floor(Math.random() * (575 - enemies[0].height - 50) + 50);
    let enemy = { ...enemies[0], x: canvas.width, y: enemyY };
    enemies.push(enemy);
  } else if (elapsedTime >= 20000, enemies.length < 2) {
    // Spawn second enemy
    let enemyY = Math.floor(Math.random() * (575 - enemies[1].height - 50) + 50);
    let enemy = { ...enemies[0,1], x: canvas.width, y: enemyY };
    enemies.push(enemy);
  } else if (elapsedTime >= 30000, enemies.length < 3) {
    // Spawn third enemy
    let enemyY = Math.floor(Math.random() * (575 - enemies[2].height - 50) + 50);
    let enemy = { ...enemies[0,1,2], x: canvas.width, y: enemyY };
    enemies.push(enemy);
  } else if (elapsedTime >= 40000, enemies.length < 4) {
    // Spawn fourth enemy
    let enemyY = Math.floor(Math.random() * (575 - enemies[3].height - 50) + 50);
    let enemy = { ...enemies[0,1,2,3], x: canvas.width, y: enemyY, };
    enemies.push(enemy);
  } else if (elapsedTime >= 50000, enemies.length < 5) {
    // Spawn fifth enemy
    let enemyY = Math.floor(Math.random() * (575 - enemies[4].height - 50) + 50);
    let enemy = { ...enemies[0,1,2,3,4], x: canvas.width, y: enemyY };
    enemies.push(enemy);
  }

  

  // Call the draw function
  draw();

}, 250);

}