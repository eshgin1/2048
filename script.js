"use strict";

document.addEventListener('DOMContentLoaded', ()=>{
        const gridDisplay = document.querySelector('.grid');
        const scoreDisplay = document.querySelector('#score');
        const resultDisplay = document.querySelector('#result');
        const width = 4;
        let squares = []; // создали пустой массив для квадратов что б мы могли с ним работать
        let score = 0; 
        
        
        //создаем игровое поле
        function createBoard(){
                //мы создали 16 квадратов 4 * 4
                for (let i=0; i<width*width; i++){
                        const square = document.createElement('div');// создаем квадрат с тегом div
                        square.innerHTML = 0; // добавили в него 0 
                        gridDisplay.appendChild(square); // взяли квадрат и поместили в конец grid
                        squares.push(square); // используем метод push, что бы новый созданный квадрат с 0
                        
                }
                
                // фукцию случайного числа мы добавляем в игровое поле и вызываем 2 раза что б появилось 2 числа
                generate();
                generate();
                
                
        }
        createBoard();
        
        //добавляем два числа случайным образом
        function generate(){
                let randomNumer = Math.floor(Math.random() * squares.length); // создали переменную "рандомное число" и умножили длинну массива , что бы получить случайное число основываясь на колличество элементов в массиве (а их 16 квадратов). Math.floor - округляет число до целочисленного

                // прописываем условие, когда будет появляться случайное число
                if(squares[randomNumer].innerHTML == 0){
                        squares[randomNumer].innerHTML =2;
                        checkForGamesOver();
                } else generate();
        }

        //свайп вправо
        function moveRight (){
                for(let i = 0; i < 16; i++){
                        //ecли квадрат с индексом 0, 4, 8, 12(а это вся наша ЛЕВАЯ часть) равна 0
                        if(i % 4 === 0){
                                let totalOne = squares[i].innerHTML;
                                let totalTwo = squares[i+1].innerHTML;
                                let totalThree = squares[i+2].innerHTML;
                                let totalFour = squares[i+3].innerHTML;
                                // создаем массив , который будем нашей строкой и благодаря методу parseInt мы превращаем строку в числа
                                let row = [parseInt(totalOne),
                                           parseInt(totalTwo),
                                          parseInt(totalThree),
                                        parseInt(totalFour) ];

                                // хотим отчистить строку 
                                let filteredRow = row.filter(num => num);

                                let missing = 4 - filteredRow.length;
                                
                                let zeros = Array(missing).fill(0);

                                let newRow = zeros.concat(filteredRow);

                                squares[i].innerHTML = newRow[0];
                                squares[i+1].innerHTML = newRow[1];
                                squares[i+2].innerHTML = newRow[2];
                                squares[i+3].innerHTML = newRow[3];

                        }
                }
        }

        // свайп влево
        function moveLeft (){
                for(let i = 0; i < 16; i++){
                        //ecли квадрат с индексом 0, 4, 8, 12(а это вся наша ЛЕВАЯ часть) равна 0
                        if(i % 4 === 0){
                                let totalOne = squares[i].innerHTML;
                                let totalTwo = squares[i+1].innerHTML;
                                let totalThree = squares[i+2].innerHTML;
                                let totalFour = squares[i+3].innerHTML;
                                // создаем массив , который будем нашей строкой и благодаря методу parseInt мы превращаем строку в числа
                                let row = [parseInt(totalOne),
                                           parseInt(totalTwo),
                                          parseInt(totalThree),
                                        parseInt(totalFour) ];

                                // хотим отчистить строку 
                                let filteredRow = row.filter(num => num);

                                let missing = 4 - filteredRow.length;
                                
                                let zeros = Array(missing).fill(0);

                                let newRow = filteredRow.concat(zeros);

                                squares[i].innerHTML = newRow[0];
                                squares[i+1].innerHTML = newRow[1];
                                squares[i+2].innerHTML = newRow[2];
                                squares[i+3].innerHTML = newRow[3];

                        }
                }
        }

        // свайп вниз
        function moveDown(){
                for(let i=0; i < 4; i++){
                        let totalOne =squares[i].innerHTML;
                        let totalTwo =squares[i+width].innerHTML;
                        let totalThree =squares[i+(width*2)].innerHTML;
                        let totalFour =squares[i+(width*3)].innerHTML;

                        let column = [parseInt(totalOne),
                                    parseInt(totalTwo),
                                   parseInt(totalThree),
                                   parseInt(totalFour)];
                        
                        let filteredColumn = column.filter(num => num);
                        let missing = 4 - filteredColumn.length;
                        let zeros = Array(missing).fill(0);
                        let newColumn = zeros.concat(filteredColumn);
                        
                        squares[i].innerHTML = newColumn[0];
                        squares[i+width].innerHTML = newColumn[1];
                        squares[i+(width*2)].innerHTML = newColumn[2];
                        squares[i+(width*3)].innerHTML = newColumn[3];

                }
        }

        // свайп вверх
        function moveUp(){
                for(let i=0; i < 4; i++){
                        let totalOne =squares[i].innerHTML;
                        let totalTwo =squares[i+width].innerHTML;
                        let totalThree =squares[i+(width*2)].innerHTML;
                        let totalFour =squares[i+(width*3)].innerHTML;

                        let column = [parseInt(totalOne),
                                    parseInt(totalTwo),
                                   parseInt(totalThree),
                                   parseInt(totalFour)];
                        
                        let filteredColumn = column.filter(num => num);
                        let missing = 4 - filteredColumn.length;
                        let zeros = Array(missing).fill(0);
                        let newColumn = filteredColumn.concat(zeros);
                        
                        squares[i].innerHTML = newColumn[0];
                        squares[i+width].innerHTML = newColumn[1];
                        squares[i+(width*2)].innerHTML = newColumn[2];
                        squares[i+(width*3)].innerHTML = newColumn[3];

                }
        }
        // функция объдинения строк, чисел которые находяться рядом друг с другом в направлении прокрутки 

        function combineRow(){
                for(let i = 0; i<15; i++){
                        if(squares[i].innerHTML === squares[i+1].innerHTML){
                                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML);
                                squares[i].innerHTML = combinedTotal;
                                squares[i+1].innerHTML = 0;
                                score += combinedTotal;
                                scoreDisplay.innerHTML = score;
                                
                        }
                }
                checkForWin();
        }
        function combineColumn(){
                for(let i = 0; i < 12; i++){
                        if(squares[i].innerHTML === squares[i+width].innerHTML){
                                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+width].innerHTML);
                                squares[i].innerHTML = combinedTotal;
                                squares[i+width].innerHTML = 0;
                                score += combinedTotal;
                                scoreDisplay.innerHTML = score;
                        }
                }
                checkForWin();  
        }

        //настраиваем клавиатуру 
        function control (e){
                // если объект события == стрелка вправо
                if(e.keyCode === 39){
                        keyRight();
                } else if (e.keyCode === 37){
                        keyLeft();
                } else if (e.keyCode === 38){
                        keyUp();
                } else if(e.keyCode === 40){
                        keyDown();
                }
        }
        document.addEventListener('keyup', control);

        //функция перемешения вправо
        function keyRight(){
                moveRight();
                combineRow();
                moveRight();
                generate();
        }
        //функция перемещения влево
        function keyLeft(){
                moveLeft();
                combineRow();
                moveLeft();
                generate();
        }
        //функция перемещения вниз
        function keyDown(){
                moveDown();
                combineColumn();
                moveDown();
                generate();
        }
        //функция перемещения вверх
        function keyUp(){
                moveUp();
                combineColumn();
                moveUp();
                generate();
        }

        //функция когда наш один квадрат наберет 2048счет 
        function checkForWin(){
                for(let i=0; i< squares.length; i++){
                        if(squares[i].innerHTML == 2048){
                                resultDisplay.innerHTML = 'You Win!';
                                document.removeEventListener('keyup', control);
                        }
                }
        }
        // функция проверка если ли нули на нашей доске. если нулей нет на доске то игра закончилась 
        function checkForGamesOver(){
                let zeros = 0;
                for(let i = 0; i < squares.length; i++){
                        if(squares[i].innerHTML === 0){
                                zeros++;
                        }
                }
                if(zeros === '0'){
                        resultDisplay.innerHTML = 'You Lose!';
                        document.removeEventListener('keyup', control);
                }
                
                
        }
        
});


