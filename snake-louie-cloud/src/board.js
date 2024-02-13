import React from "react";
import { useEffect, useRef, useState } from "react";

export default function Board() {
    const [score, setScore] = useState(0);
    var blockSize = 25;
    var rows = 20;
    var cols = 20;
    let boardRef = useRef(null);
    let contextRef = useRef(null);

    // Snake velocity
    var velocityX = 0;
    var velocityY = 0;
    // Snake
    var snakeX = blockSize * 5;
    var snakeY = blockSize * 5;
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
        const gameInterval = setInterval(update, 1000/5);

        return () => {
            clearInterval(gameInterval);
            document.removeEventListener('keydown', changeDirection);
        }
    }, []);

    function changeDirection (event) {
        if (event.code === 'ArrowUp') {
            velocityX = 0;
            velocityY = -1;
        }
        if (event.code === 'ArrowDown') {
            velocityX = 0;
            velocityY = 1;
        }
        if (event.code === 'ArrowLeft') {
            velocityX = -1;
            velocityY = 0;
        }
        if (event.code === 'ArrowRight') {
            velocityX = 1;
            velocityY = 0;
        }
        if (event.code === 'Escape') {
            velocityX = 0;
            velocityY = 0;
        }
    }

    function update() {
        const context = contextRef.current;
        if (snakeX === foodX && snakeY === foodY) {
            placeFood();
            setScore(prevScore => prevScore + 1);
        }
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
        
        context.fillStyle= "lime";
        snakeX += velocityX * blockSize;
        snakeY += velocityY * blockSize;
        context.fillRect(snakeX, snakeY, blockSize, blockSize);

    }

    function placeFood () {
        foodX = Math.floor(Math.random() * cols) * blockSize;
        foodY = Math.floor(Math.random() * rows) * blockSize;
    }
    
    return (
        <div>
            <canvas id = "board" ref={boardRef}></canvas>
            <h2>Score: {score}</h2>
        </div>
    );
}