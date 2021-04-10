'use strict';
class Board {
    constructor(name, color) {
        this.name = name;
        this.id = name;
        this.color = color;
        this.element = this.createBoard(450, 320, 10, 50);
        this.left = () => this.element.getBoundingClientRect().left;
        this.top = () => this.element.getBoundingClientRect().top;
        this.bottom = () => this.element.getBoundingClientRect().top + this.element.offsetHeight;
        this.right = () => this.element.getBoundingClientRect().left + this.element.offsetWidth;
        this.width = () => this.element.offsetWidth;
        this.height = () => this.element.offsetHeight;
    }

    createBoard(width, height, left, top) {
        this.element = document.createElement("div");
        this.element.className = 'appearing';
        this.element.id = this.id;
        this.element.style.opacity = '0';
        this.element.style.border = 'solid';
        this.element.style.borderColor = 'blue';
        this.element.style.borderWidth = '3px';
        this.element.style.borderRadius = '10px';
        this.element.style.height = height + 'px';
        this.element.style.width = width + 'px';
        this.element.style.backgroundColor = this.color;
        this.element.style.position = 'absolute';
        this.element.style.left = left + 'px';
        this.element.style.top = top + 'px';
        document.body.appendChild(this.element);
        return this.element;

    }

    show() {
        this.element.style.opacity = '1';
    }

    hide() {
        this.element.style.opacity = '0';
    }

}

class Counter {
    constructor(firstPlayerName, secondPlayerName, maxGoals, getPosition) {
        this.firstPlayer = {
            name: firstPlayerName,
            goals: 0
        };

        this.secondPlayer = {
            name: secondPlayerName,
            goals: 0
        };

        this.getPosition = getPosition;


        this.maxGoals = maxGoals;
        this.id = 'counter';
        this.element = null;
        this.createCounter(450, 16);
        this.positioningCounter();

    }

    createCounter(width, height) {
        this.element = document.createElement("div");
        this.element.id = this.id;
        this.element.className = 'appearing';
        this.element.style.opacity = '0';
        this.element.style.height = height + 'px';
        this.element.style.width = width + 'px';
        this.element.style.position = 'absolute';
        this.element.style.textAlign = 'center';
        this.element.textContent = `${this.firstPlayer.name}:${this.firstPlayer.goals}---${this.secondPlayer.name}:${this.secondPlayer.goals}`;
        document.body.appendChild(this.element);
    }

    show() {
        this.element.style.opacity = '1';
    }

    hide() {
        this.element.style.opacity = '0';
    }

    positioningCounter() {
        this.element.style.left = this.getPosition().x + 'px';
        this.element.style.top = this.getPosition().y + 'px';
    }

    updateCounter() {
        this.element.textContent = `${this.firstPlayer.name}:${this.firstPlayer.goals}---${this.secondPlayer.name}:${this.secondPlayer.goals}`;
    }

    countGoal(player) {
        if (this.firstPlayer.name === player) {
            this.firstPlayer.goals++;
        }
        else this.secondPlayer.goals++;
        this.updateCounter();
    }
}


class playerRocket {

    constructor(playerName, color, playerNumber, getPosition, getDimensions) {
        this.name = playerName;
        this.id = playerName;
        this.color = color;
        this.playerNumber = playerNumber;
        this.getPosition = getPosition;
        this.getDimensions = getDimensions;
        this.element = null; // DOM тело ракетки
        this.createRocket();
        this.left = () => this.element.getBoundingClientRect().left;//ракетка не следует за краем поля, координаты от края окна
        this.top = () => this.element.getBoundingClientRect().top;
        this.bottom = () => this.element.getBoundingClientRect().top + this.element.offsetHeight;
        this.right = () => this.element.getBoundingClientRect().left + this.element.offsetWidth;
        this.width = () => this.element.offsetWidth;
        this.height = () => this.element.offsetHeight;
        this.positioningRocket();
    }

    createRocket() {
        this.element = document.createElement("div");
        this.element.id = this.id;
        this.element.className = 'appearing';
        this.element.style.opacity = '0';
        this.element.style.height = this.getDimensions().y / 4 + 'px';
        this.element.style.width = this.getDimensions().x / 45 + 'px';
        this.element.style.backgroundColor = this.color;
        this.element.style.borderRadius = '5px';
        this.element.style.position = 'absolute';
        document.body.appendChild(this.element);
    }

    show() {
        this.element.style.opacity = '1';
    }

    hide() {
        this.element.style.opacity = '0';
    }

    positioningRocket() {
        this.element.style.left = this.getPosition().x - this.width() / 2 + 'px';
        this.element.style.top = this.getPosition().y - this.height() / 2 + 'px';
    }
}


class Ball {
    constructor(name, color, speed, getPosition) {
        this.name = name;
        this.color = color;
        this.id = 'ball';
        this.speed = speed;
        this.positionX = getPosition().x;
        this.positionY = getPosition().y;
        this.element = null;

        this.createBall(32, 32);
        this.left = () => this.element.getBoundingClientRect().left;//ракетка не следует за краем поля, координаты от края окна
        this.top = () => this.element.getBoundingClientRect().top;
        this.bottom = () => this.element.getBoundingClientRect().top + this.element.offsetHeight;
        this.right = () => this.element.getBoundingClientRect().left + this.element.offsetWidth;
        this.width = () => this.element.offsetWidth;
        this.height = () => this.element.offsetHeight;
        this.center = () => {
            return {
                y: this.top() + this.height() / 2,
                x: this.left() + this.width() / 2,
            }
        }
        this.positioningBall();
    }

    createBall(width, height) {
        this.element = document.createElement("div");
        this.element.id = this.id;
        this.element.className = 'appearing';
        this.element.style.opacity = '0';
        this.element.style.height = height + 'px';
        this.element.style.width = width + 'px';
        this.element.style.backgroundColor = this.color;
        this.element.style.borderRadius = '50%';
        this.element.style.position = 'absolute';
        this.element.style.zIndex = '1';
        document.body.appendChild(this.element);
    }

    show() {
        this.element.style.opacity = '1';
    }

    hide() {
        this.element.style.opacity = '0';
    }

    positioningBall() {
        this.element.style.left = this.positionX - this.width() / 2 + 'px';
        this.element.style.top = this.positionY - this.height() / 2 + 'px';
    }
}


class RocketMover {
    constructor(rocket, board, playerNumber, speed) {
        this.rocket = rocket;
        this.board = board;
        this.playerNumber = playerNumber;
        this.speed = speed;
        this.installController(this.moveRocketUp.bind(this), this.moveRocketDown.bind(this));
    }

    moveRocketUp() {
        if (this.rocket.top() - this.speed < this.board.top()) {
            this.rocket.element.style.top = this.board.top() - 3 + 'px';
            return;
        };
        this.rocket.element.style.top = this.rocket.top() - this.speed + 'px';
    }

    moveRocketDown() {
        if (this.rocket.bottom() + this.speed > this.board.bottom()) {
            this.rocket.element.style.top = this.board.bottom() - this.rocket.height() + 'px';
            return;
        };
        this.rocket.element.style.top = this.rocket.top() + this.speed + 'px';
    }

    installController(moveUp, moveDown) {
        if (this.playerNumber === 1) {
            document.addEventListener('keydown', event => {
                if (event.code === 'ShiftLeft') moveUp();
            });
            document.addEventListener('keydown', event => {
                if (event.code === 'ControlLeft') moveDown();
            });
        }

        if (this.playerNumber === 2) {
            document.addEventListener('keydown', event => {
                if (event.code === 'ArrowUp') moveUp();
            });
            document.addEventListener('keydown', event => {
                if (event.code === 'ArrowDown') moveDown();
            });
        }
    }
}

let player1goal = new Event('goal1');
let player2goal = new Event('goal2');

class BallMovement { //после гола летит в туже сторону в которую летел до гола, надо добавить после гола рандомную валидацию угла
    constructor(board, ball, rocket1, rocket2, counter, speed = 2) {
        this.board = board;
        this.ball = ball;
        this.rocket1 = rocket1;
        this.rocket2 = rocket2;
        this.counter = counter;
        this.speed = speed;
        this.speedX = null;
        this.speedY = null;
        this.movingInterval = null;
        this.determineDirection();
    }

    determineDirection(){
        let coefficientX = Math.random() > 0.5 ? 1 : -1;
        let coefficientY = Math.random() > 0.5 ? 1 : -1;
        this.speedX = coefficientX * this.speed;
        this.speedY = coefficientY * this.speed * (Math.floor(Math.random() * (160 - 40 + 10)) + 40) / 100;
    }

    startMoving() {
        this.movingInterval = setInterval(this.movingBall.bind(this), 20);
    }

    stopMoving() {
        clearInterval(this.movingInterval);
    }

    goal(eventName) {
        this.board.element.dispatchEvent(eventName);
        this.rocket1.element.dispatchEvent(eventName);
        this.rocket2.element.dispatchEvent(eventName);
        this.ball.element.dispatchEvent(eventName);
        this.counter.element.dispatchEvent(eventName);
    }

    movingBall() {
        if (this.ball.top() <= this.board.top()) { //
            this.speedY = -1 * this.speedY;
        }

        if (this.ball.bottom() >= this.board.bottom()) {
            this.speedY = -1 * this.speedY;
        }

        if (this.ball.left() <= this.rocket1.right()) {
            if (this.ball.center().y * 11 / 10 >= this.rocket1.top() && this.ball.center().y * 10 / 11 <= this.rocket1.bottom()) {
                this.speedX = -1 * this.speedX;
                this.speedY = 1 * this.speedY;
            }
            else {
                this.goal(player1goal);
            };
        }

        if (this.ball.right() >= this.rocket2.left()) {
            if (this.ball.center().y * 11 / 10 >= this.rocket2.top() && this.ball.center().y * 10 / 11 <= this.rocket2.bottom()) {
                this.speedX = -1 * this.speedX;
                this.speedY = 1 * this.speedY;
            }
            else {
                this.goal(player2goal);
            };
        }

        this.ball.element.style.left = this.ball.left() + this.speedX + 'px';
        this.ball.element.style.top = this.ball.top() + this.speedY + 'px';
    }
}


class MovementController {

}


class GoalHandler {
    constructor(board, rocket, ball, goalCounter, ballMovement, event) {
        this.board = board;
        this.rocket = rocket;
        this.ball = ball,
            this.counter = goalCounter;
        this.event = event;
        this.ballMovement = ballMovement;
        this.addListeners();
    }


    addListeners() {
        this.ball.element.addEventListener(this.event, event => { //попробовать поставить задержку
            this.ballMovement.stopMoving.call(this.ballMovement);
            this.ball.positioningBall.call(this.ball);
            this.ballMovement.startMoving.call(this.ballMovement);
        });
        this.counter.element.addEventListener(this.event, event => {
            this.counter.countGoal.call(this.counter, this.rocket.id);
        });
    }

}

class RemotePanel {
    constructor(startButton, pauseButton, exitButton, resumeButton) {
        this.startButton = startButton;
        this.pauseButton = pauseButton;
        this.exitButton = exitButton;
        this.resumeButton = resumeButton;
        this.element = null;
        this.createRemotePanel();
    }

    createRemotePanel() {
        this.element = document.createElement('div');

        this.resumeButton.textContent = 'Продолжить';
        this.resumeButton.style.opacity = 0;
        this.element.append(this.resumeButton);

        this.startButton.textContent = 'Старт Игры';
        this.element.append(this.startButton);

        this.pauseButton.textContent = 'Пауза';
        this.element.append(this.pauseButton);

        this.exitButton.textContent = 'Выйти из игры';
        this.element.append(this.exitButton);

        document.body.append(this.element);
    }
}


class GameController {
    constructor(board, rocket1, rocket2, counter, ball, ballMovement, RemotePanel) {
        this.RemotePanel = RemotePanel;
        this.board = board;
        this.rocket1 = rocket1;
        this.rocket2 = rocket2;
        this.counter = counter;
        this.ball = ball;
        this.ballMovement = ballMovement;

        this.installConnections();
    }

    installConnections() {
        this.RemotePanel.startButton.addEventListener('click', (event) => {
            this.startGame.call(this);
        });

        this.RemotePanel.pauseButton.addEventListener('click', (event) => {
            this.pauseGame.call(this);
        });

        this.RemotePanel.exitButton.addEventListener('click', (event) => {
            this.exitGame.call(this);
        });

        this.RemotePanel.resumeButton.addEventListener('click', (event) => {
            this.resumeGame.call(this);
        })
    }

    startGame() {//фиксануть баг с мультиинтервалами
        this.board.show();
        this.rocket1.show();
        this.rocket2.show();
        this.counter.show();
        this.ball.show();

        setTimeout(this.ballMovement.startMoving.bind(this.ballMovement), 1800);
    }

    pauseGame() {
        this.ballMovement.stopMoving();
        this.RemotePanel.resumeButton.style.opacity = '1';
    }

    resumeGame() {
        this.ballMovement.startMoving();
        this.RemotePanel.resumeButton.style.opacity = '0';
    }

    exitGame() {
        this.ballMovement.stopMoving();

        this.board.hide();
        this.rocket1.hide();
        this.rocket2.hide();
        this.counter.hide();
        this.ball.hide();
    }
}

let tennisBoard = new Board('board1', 'yellow');

let rocket1 = new playerRocket('Vladik', 'red', 1,
    () => {
        return {
            x: tennisBoard.left(),
            y: tennisBoard.top() + tennisBoard.height() / 2,
        }
    },
    () => {
        return {
            x: tennisBoard.width(),
            y: tennisBoard.height(),
        }
    },
);

let rocket2 = new playerRocket('Vasilisa', 'green', 2,
    () => {
        return {
            x: tennisBoard.left() + tennisBoard.width(),
            y: tennisBoard.top() + tennisBoard.height() / 2,
        }
    },
    () => {
        return {
            x: tennisBoard.width(),
            y: tennisBoard.height(),
        }
    },
);


let oneBall = new Ball('myBall', 'red', 5, () => {
    return {
        x: tennisBoard.left() + tennisBoard.width() / 2,
        y: tennisBoard.top() + tennisBoard.height() / 2,
    }
});

let oneCounter = new Counter('Vladik', 'Vasilisa', 3, () => {
    return {
        x: tennisBoard.left(),
        y: tennisBoard.top() - tennisBoard.height() / 20,
    }
});

let ballMovement = new BallMovement(tennisBoard, oneBall, rocket1, rocket2, oneCounter);

let rocketMover1 = new RocketMover(rocket1, tennisBoard, 1, 15);

let rocketMover2 = new RocketMover(rocket2, tennisBoard, 2, 15);

let p2GoalHandler = new GoalHandler(tennisBoard, rocket2, oneBall, oneCounter, ballMovement, 'goal1');

let p1GoalHandler = new GoalHandler(tennisBoard, rocket1, oneBall, oneCounter, ballMovement, 'goal2');

let myRemotePanel = new RemotePanel(
    document.createElement('button'),
    document.createElement('button'),
    document.createElement('button'),
    document.createElement('button')
);

let myGameController = new GameController(tennisBoard, rocket1, rocket2, oneCounter, oneBall, ballMovement, myRemotePanel);


