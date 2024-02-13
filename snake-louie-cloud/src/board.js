import React from "react";
import { useEffect, useRef } from "react";

export default function Board() {
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
        // const board = boardRef.current;
        // const context = board.getContext('2d');
        // contextRef.current = context;
        // board.height = blockSize * rows;
        // board.width = blockSize * cols;

        // document.addEventListener('keydown', changeDirection);

        // setInterval(update, 1000/5);

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

    // function gameStart() {
    //     board = document.getElementById('board');
    //     board.height = blockSize * rows;
    //     board.width = blockSize * cols;
    //     context = board.getContext('2d');
    //     placeFood();
    //     document.addEventListener('keydown', changeDirection);
    //     setInterval(update, 1000/5);
    // }

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
        context.fillStyle = 'black';
        context.fillRect(0, 0, boardRef.current.width, boardRef.current.height);

        context.fillStyle = "blue";
        context.fillRect(foodX, foodY, blockSize, blockSize);
        
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
        <canvas id = "board" ref={boardRef}></canvas>
    );
}