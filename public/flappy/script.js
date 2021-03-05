document.addEventListener('DOMContentLoaded', () => {
  const bird = document.querySelector('.bird');
  const game = document.querySelector('.game-container');
  const ground = document.querySelector('.ground');

  let birdLeft = 220;
  let birdBottom = 100;
  let gravity = 3;
  let isGameOver = false;
  let gap = 430;
  
  function startGame() {
    birdBottom -= gravity;
    bird.style.bottom = birdBottom + 'px';
    bird.style.left = birdLeft + 'px';
  }
  let gameTimeId = setInterval(startGame, 20);

  
  function gameOver() {
    clearInterval(gameTimeId);
    isGameOver = true;
    document.removeEventListener('keyup', jump)
  }


  function control(e) {
    if (e.keycode === 32) {
      jump();
    }
  }

  function jump() {
    if (birdBottom < 500) {
      birdBottom += 50;
    }
    bird.style.bottom = birdBottom + 'px';
  }

  document.addEventListener('keyup', jump);


  function generateObstacle() {
    let obstacleLeft = 500;
    let randomHeight = Math.random() * 60
    let obstacleBottom = randomHeight; 
    const obstacle = document.createElement('div');

    if (!isGameOver) { 
        obstacle.classList.add('obstacle');
    }

    game.appendChild(obstacle);
    obstacle.style.left = obstacleLeft + 'px';
    obstacle.style.bottom = obstacleBottom + 'px';

    function moveObstacle() {
      obstacleLeft -= 2;
      obstacle.style.left = obstacleLeft + 'px';

      if (obstacleLeft === -60) {
        clearInterval(timeId);
        game.removeChild(obstacle);
      }

      if (obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 &&
          (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap - 200) || 
          birdBottom === 0) {
        gameOver();
      }
    }
    let timeId = setInterval(moveObstacle, 20);
    if (!isGameOver) {
      setTimeout(generateObstacle, 3000)
    }
  }

  generateObstacle()

})