let bird = document.querySelector(".bird");
let ground = document.querySelector(".ground");
let sky = document.querySelector(".sky");
let container = document.querySelector(".container");
let isGameOver = false;
let gap = 400;

let birdLeft = 220;
let birdBottom = 100;
let gravity = 2;

start = () => {
    birdBottom -= gravity;
    bird.style.bottom = birdBottom + "px";
    bird.style.left = birdLeft + "px";
}

let timerId = setInterval(start, 20);

jump = (event) => {
    if(event.keyCode === 32) {
    birdBottom += 50;
    bird.style.bottom = birdBottom + "px";
    console.log(birdBottom);
    }
}

document.addEventListener("keyup", jump);

generateObstacles = () => {
    let obstacleLeft = 500;
    let randomHeight = Math.random() * 100;
    let obstacleBottom = randomHeight  
    let obstacle = document.createElement("div");
    let topObstacle = document.createElement("div");
    if (!isGameOver) { 
        obstacle.classList.add("obstacle")
        topObstacle.classList.add("topObstacle")
    };
    container.appendChild(obstacle);
    container.appendChild(topObstacle);
    obstacle.style.left = obstacleLeft + "px";
    obstacle.style.bottom = obstacleBottom + "px";
    topObstacle.style.bottom = obstacleBottom + gap + "px";
    topObstacle.style.left = obstacleLeft + "px";

    moveOBstacle = () => {
        obstacleLeft -=2;
        obstacle.style.left = obstacleLeft + "px";
        topObstacle.style.left = obstacleLeft + "px";

        if (obstacleLeft === 0) {
            clearInterval(timerId)
            container.removeChild(obstacle)
        }

        if (obstacleLeft > 200 && obstacleLeft < 280 
            && birdLeft === 220 && birdBottom < obstacleBottom + 150) {
            gameOver();
            clearInterval(timerId);
            }

    }
    let timerId = setInterval(moveOBstacle, 20);
    if(!isGameOver) {
        setTimeout(generateObstacles, 3000)
    }
}

generateObstacles();

gameOver = () => {
    clearInterval(timerId);
    isGameOver = true;
    document.removeEventListener("keyup", jump);
    console.log("GAME OVER");
};




