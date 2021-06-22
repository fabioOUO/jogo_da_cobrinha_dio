
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

function createBG() {
    //cria fundo
    context.fillStyle = '#808090';
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function createSnake() {
    //cria cobra
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = '#aa2222';
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function createFood() {
    //criar comida
    context.fillStyle = "#dddddd";
    context.fillRect(food.x, food.y, box, box);
}

function getDirection(event) {
    //define a direção aparti da tecla clicada
    let key = event.keyCode;
    if (key == 37 && direction != "right") direction = "left";
    if (key == 38 && direction != "up") direction = "down";
    if (key == 39 && direction != "left") direction = "right";
    if (key == 40 && direction != "down") direction = "up";

    //para laterais

    if (snake[0].x >= 16 * box && (direction == "up" || direction == "down")) direction = "right";
    if (snake[0].x <= 0 && (direction == "up" || direction == "down")) direction = "left";
    if (snake[0].y >= 16 * box && (direction == "right" || direction == "left")) direction = "up";
    if (snake[0].y <= 0 && (direction == "right" || direction == "left")) direction = "down";

}

function startVars() {
    //limpa game
    game != null ? clearInterval(game) : null;

    //inicializa variaveis
    game = null;
    direction = "right";
    lengthSnake.innerHTML = 1;
    snake = [];
    food = [];
    snake[0] = {
        x: 1 * box,
        y: 1 * box
    }
    food = {
        x: Math.floor(Math.random() * 15 + 1) * box,
        y: Math.floor(Math.random() * 15 + 1) * box
    }
}

function checkEndOfScreen() {
    //verifica se esta no fim da tela
    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 * box && direction == "left") snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == "up") snake[0].y = 0;
    if (snake[0].y < 0 * box && direction == "down") snake[0].y = 16 * box;
}

function checkDirection(snakeX, snakeY) {
    //verifica direção 
    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY += box;
    if (direction == "down") snakeY -= box;
    return { x: snakeX, y: snakeY };
}

function checkFood() {
    //verifica de cobra comeu comida
    //se comeu cria outra
    if (snake[0].x == food.x && snake[0].y == food.y) {
        lengthSnake.innerHTML = Number(lengthSnake.innerHTML) + 1;
        food = {
            x: Math.floor(Math.random() * 15 + 1) * box,
            y: Math.floor(Math.random() * 15 + 1) * box
        }
    } else {
        snake.pop();
    }
}

function newLevel() {
    //cria novo nivel
    time -= 15;
    level.innerHTML = Number(level.innerHTML) + 1;
    start();
}

function checkLevel() {
    //verifica se terminou nivel
    if (lengthSnake.innerHTML == 20) {
        if (level.innerHTML == "10") {
            alert("Você ganhou!");
            clearInterval(game);
            time = 200;
        } else {
            alert("Passou para nível " + (Number(level.innerHTML) + 1) + ".");
            newLevel();
        }
    }
}

function checkKnock() {
    //verifica se cobra bateu no corpo
    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            alert("Game Over!");
            clearInterval(game);
            level.innerHTML = 1;
            time = 200;
        }
    }
}

function start() {
    startVars();
    game = setInterval(() => {
        //verifica fim de tela
        checkEndOfScreen();

        //verifica se bateu no corpo
        checkKnock();

        //redenriza elementos
        createBG();
        createFood();
        createSnake();

        //posição a cabeça da cobra.
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        //verifica se cobra vai comer comida
        checkFood(snakeX, snakeY);

        // gera a nova posicao da cabeça da cobra
        let newHead = checkDirection(snakeX, snakeY)

        //adiciona newHead na primeira posição da cobra
        snake.unshift(newHead);

        //checkKnock();
        checkLevel();
    }, time);
}

createBG();
