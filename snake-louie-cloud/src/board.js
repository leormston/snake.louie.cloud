import React from "react";
import './App.css';
import { useEffect, useRef, useState } from "react";

export default function Board() {
    const [score, setScore] = useState(0);
    const [pause, setPause] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    var blockSize = 25;
    var rows = 20;
    var cols = 20;
    var jscore = 0;
    var jpause = false;
    var jgameOver = false;
    let boardRef = useRef(null);
    let contextRef = useRef(null);

    // Snake velocity
    var velocityX = 0;
    var velocityY = 0;
    // Snake
    var snakeX = blockSize * 5;
    var snakeY = blockSize * 5;
    var snakeBody = [];

    // Food
    var foodX = blockSize * 15;
    var foodY = blockSize * 15;

    useEffect(() => {
        const board = boardRef.current;
        const context = board.getContext('2d');
        contextRef.current = context;
        board.height = blockSize * rows;
        board.width = blockSize * cols;
        placeFood();
        document.addEventListener('keydown', changeDirection);
        const gameInterval = setInterval(update, 1000 / 10);

        return () => {
            clearInterval(gameInterval);
            document.removeEventListener('keydown', changeDirection);
        }// eslint-disable-next-line
    }, [blockSize, rows, cols]);

    function changeDirection(event) {
        if (event.code === 'ArrowUp' && velocityY !== 1 && !pause) {
            velocityX = 0;
            velocityY = -1;
        }
        if (event.code === 'ArrowDown' && velocityY !== -1 && !pause) {
            velocityX = 0;
            velocityY = 1;
        }
        if (event.code === 'ArrowLeft' && velocityX !== 1 && !pause) {
            velocityX = -1;
            velocityY = 0;
        }
        if (event.code === 'ArrowRight' && velocityX !== -1 && !pause) {
            velocityX = 1;
            velocityY = 0;
        }
        if (event.code === 'Escape') {
            setPause(true);
            jpause = true;
        }
        if (event.code === 'Space') {
            setPause(false);
            jpause = false;
        }
    }

    function update() {
        if (jgameOver || jpause) {
            return;
        }
        const context = contextRef.current;

        context.fillStyle = 'black';
        context.fillRect(0, 0, boardRef.current.width, boardRef.current.height);

        context.fillStyle = "blue";
        context.fillRect(foodX, foodY, blockSize, blockSize);

        if (snakeX < 0) {
            snakeX = blockSize * (cols - 1);
        }
        if (snakeY < 0) {
            snakeY = blockSize * (rows - 1);
        }
        if (snakeX >= blockSize * cols) {
            snakeX = 0;
        }
        if (snakeY >= blockSize * rows) {
            snakeY = 0;
        }

        if (snakeX === foodX && snakeY === foodY) {
            setScore(prevScore => prevScore + 1);
            jscore = jscore + 1;
            snakeBody.push([foodX, foodY]);
            placeFood();
        }
        for (let i = snakeBody.length - 1; i > 0; i--) {
            snakeBody[i] = snakeBody[i - 1];
        }
        if (snakeBody.length) {
            snakeBody[0] = [snakeX, snakeY];
        }

        context.fillStyle = "lime";
        snakeX += velocityX * blockSize;
        snakeY += velocityY * blockSize;
        context.fillRect(snakeX, snakeY, blockSize, blockSize);

        for (let i = 0; i < snakeBody.length; i++) {
            context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
        }

        //game over conditions if walls are hit
        if (snakeX < 0 || snakeX >= blockSize * cols || snakeY < 0 || snakeY >= blockSize * rows) {
            setGameOver(true);
            jgameOver = true;
            alert("Game Over! You hit a wall! Your score is " + jscore);
        }
        if (pause === false) {
            for (let i = 0; i < snakeBody.length; i++) {
                if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
                    setGameOver(true);
                    jgameOver = true;
                    alert("Game Over! You ate yourself! Your score is " + { score });
                }
            }
        }

    }

    function placeFood() {
        foodX = Math.floor(Math.random() * cols) * blockSize;
        foodY = Math.floor(Math.random() * rows) * blockSize;
    }

    return (
        <div>
            <canvas id="board" ref={boardRef}></canvas>
            {gameOver && (
                <div>
                    <h1>Game Over! Your score was: {score}</h1>
                    <button onClick={() => window.location.reload()}>Play Again</button>
                </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span><h2>Score: {score}</h2></span>
                <span>{pause ? <h2>paused</h2> : <h2>playing</h2>}</span>
            </div>
        </div>

    );
}