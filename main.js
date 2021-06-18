
//pega elementos HTML
let lengthSnake = document.getElementById("length");
let level = document.getElementById("level");
let canvas = document.getElementById("game");

//cria context
let context = canvas.getContext("2d");

//pega tecla clicada e envia para a funcao getDirection
document.addEventListener("keydown", getDirection);

//inicializção de variaveis
let box = 32;
let game = null;
let direction = "right";
let time = 200;
let snake = [];
let food = null;
level.innerHTML = 1;
lengthSnake.innerHTML = 1;

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

function createFood(){
    context.fillStyle = "#336699"
    context.fillRect(food.x, food.y, box, box)
}

function getDirection(event){
    //define a direção aparti da tecla clicada
    let key = event.keyCode;
    if(key == 37 && direction != "right") direction = "left";
    if(key == 38 && direction != "up") direction = "down";
    if(key == 39 && direction != "left") direction = "right";
    if(key == 40 && direction != "down") direction = "up";
}

function startVars(){
    //limpa contador de tempo
    game!=null?clearInterval(game):null;
    
    //inicializa variaveis
    game = null;
    direction = "right";
    lengthSnake.innerHTML = 1;
    snake = [];
    food = [];
    snake[0] = {
        x: 2 * box,
        y: 2 * box
    }
    food = {
        x: Math.floor(Math.random() * 15 + 1) * box,
        y: Math.floor(Math.random() * 15 + 1) * box
    }
}

function checkEndOfScreen(){
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 * box && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "up") snake[0].y = 0;
    if(snake[0].y < 0 * box && direction == "down") snake[0].y = 16 * box;
}

function checkDirection(snakeX, snakeY){    
    //verifica direção 
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY += box;
    if(direction == "down") snakeY -= box;
    return {x: snakeX, y: snakeY};
}

function checkFood(snakeX, snakeY){
    if(snakeX == food.x && snakeY == food.y){
        lengthSnake.innerHTML = Number(lengthSnake.innerHTML) + 1;
        food = {
            x: Math.floor(Math.random() * 15 + 1) * box,
            y: Math.floor(Math.random() * 15 + 1) * box
        }
    }else{
        snake.pop();
    }
}

function newLevel(){
    time -= 10;
    level.innerHTML = Number(level.innerHTML)+1;
    start();
}

function checkLevel(){
    if(lengthSnake.innerHTML == 10){
        console.log("New Level");
        newLevel();
    }
}

function start(){
    startVars();
    game = setInterval(()=>{
        //verifica fim de tela
        checkEndOfScreen()
        
        //redenriza elementos
        createBG();
        createFood();
        createSnake();
    
        //posição a cabeça da cobra.
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;
        
        //verifica se cobra vai comer comida
        checkFood(snakeX, snakeY);

        // nova cabeça
        let newHead = checkDirection(snakeX, snakeY)
        //remove ultimo bloco da cobra
        
        //adiciona newHead na primeira posição da cobra
        snake.unshift(newHead);
        checkLevel();
    }, time);
}

createBG();
