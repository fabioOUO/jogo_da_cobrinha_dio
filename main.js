    let lengthSnake = document.getElementById("length");
    let level = document.getElementById("level");
    let canvas = document.getElementById("game");
    let context = canvas.getContext("2d");
    let box = 32;
    let snake = [];
    snake[0] = {
        x: 2 * box,
        y: 2 * box
    }

    level.innerHTML = 0;
    lengthSnake.innerHTML = 0;

    function createBG(){
        context.fillStyle = '#808090';
        context.fillRect(0, 0, 16 * box, 16 * box);    
    }

    function createSnake(){
        for (let i = 0; i < snake.length; i++) {
            context.fillStyle = '#aa2222';
            context.fillRect(snake[i].x, snake[i].y, box, box);
        }
    }

    function start(){
        createSnake();
    }

    createBG();
