
//pega elementos HTML
let lengthSnake = document.getElementById("length");
let level = document.getElementById("level");
let canvas = document.getElementById("game");

//cria context
let context = canvas.getContext("2d");

//inicializção de variaveis
let box = 32;
let game = null;
let direction = "right";
let time = 200;
let snake = [];
snake[0] = {
    x: 2 * box,
    y: 2 * box
}
level.innerHTML = 0;
lengthSnake.innerHTML = 0;

//funções

function createBG(){
    //cria fundo
    context.fillStyle = '#808090';
    context.fillRect(0, 0, 16 * box, 16 * box);    
}

function createSnake(){
    //cria cobra
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = '#aa2222';
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function start(){
    game = setInterval(()=>{
        //redenriza o fundo
        createBG();
        //renderiza a cobra
        createSnake();
    
        //posição a cabeça da cobra.
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;
        
        //verifica direção 
        if(direction == "right") snakeX += box;
        if(direction == "left") snakeX -= box;
        if(direction == "up") snakeY += box;
        if(direction == "down") snakeY -= box;
        
        // nova cabeça
        let newHead = {
            x: snakeX,
            y: snakeY
        }
        
        //remove ultimo bloco da cobra
        snake.pop();
        
        //adiciona newHead na primeira posição da cobra
        snake.unshift(newHead);

    }, time);
}

createBG();
