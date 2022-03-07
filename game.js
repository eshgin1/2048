"use strict"
class Game {
    constructor(parentElement, size = 5){
        let gameFieldElement = document.createElement('div');
        gameFieldElement.className = 'game';
        parentElement.appendChild(gameFieldElement);

        let headerElement = document.createElement('div');
        headerElement.className = 'header';
        gameFieldElement.appendChild(headerElement);

        let titleElement =document.createElement('div');
        titleElement.className = 'title';
        titleElement.innerHTML = '2048';
        headerElement.appendChild(titleElement);

        let scoreElement = document.createElement('h1');
        scoreElement.className = 'score';
        headerElement.appendChild(scoreElement);
        this.score = 0;
        scoreElement.innerHTML = this.score;


        let wrapperElement = document.createElement('div');
        wrapperElement.className = 'wrapper';
        gameFieldElement.appendChild(wrapperElement);

        for(let i = 0; i < size; i++){
            for(let k = 0; k < size; k++){
                let boxElement = document.createElement('div');
                boxElement.className = 'box';
                if(Math.random() > 0.8){
                    boxElement.innerHTML = Math.random() > 0.5 ? 4 : 2;
                }
                wrapperElement.appendChild(boxElement);
            }
        }
    }
}