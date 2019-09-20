import React from 'react';
import Snake from './Snake';
import Food from './Food';
import Block from './Block';
import Cell from './Cell';
import '../App.css';

class Board extends React.Component {

    state = {
        score: 0,
        initialSnakePosition: null,
        snakePositions: [],
        blockPositions: [],
        foodPositions: [],
        availablePositions: [],
        matrix: null,
        board: [],
        direction: '',
        snakeSpeed: 1500,
        head: [],
        status: ''
    }

    componentDidMount() {
        this.startGame();
    }

    startGame = () => {
        let matrix = this.props.config.matrix;
        let blockPositions = this.props.config.blockPositions;
        let board = [];
        // let directions = ['up', 'down', 'left', 'right'];
        // let randomDirection = directions[Math.floor((Math.random()*directions.length - 1))];
        let randomDirection = 'right';
    
        // creating the board
        for(let i=0; i < matrix; i++) {
            board.push([""]);
            for(let j = 0; j < matrix; j++) {
                board[i][j] = "";
            }
        }

        //inserting blocks
        for(let i = 0; i < blockPositions.length; i++) {
            board[blockPositions[i][0]][blockPositions[i][1]] = "B"
        }

        let availablePositions =  this.findingAvailablePositions(board, matrix);

        let availablePositionsLength = availablePositions.length;

        let randomInitialSnakePosition = Math.floor((Math.random()*availablePositionsLength - 1));

        randomInitialSnakePosition = availablePositions[randomInitialSnakePosition];

        availablePositions =  this.findingAvailablePositions(board, matrix);

        let randomFoodPosition = Math.floor((Math.random()*availablePositionsLength - 1));

        randomFoodPosition = availablePositions[randomFoodPosition];
        

        // console.log("random", randomFoodPosition[0], randomInitialSnakePosition);

        board[randomFoodPosition[0]][randomFoodPosition[1]] = "F";
        board[randomInitialSnakePosition[0]][randomInitialSnakePosition[1]] = "S";
        board[randomInitialSnakePosition[0]][randomInitialSnakePosition[1] + 1] = "S";
        // console.log("changed board", board);
        let snakePositions = [
                [randomInitialSnakePosition[0], randomInitialSnakePosition[1]],
                [randomInitialSnakePosition[0], randomInitialSnakePosition[1] + 1],
            ];
        let head = snakePositions[0];

        this.setState({
            board: board,
            blockPositions: blockPositions,
            matrix: matrix,
            direction: randomDirection,
            head: head,
            snakePositions,
        });

        let intervalID = setInterval(() => {
            const { direction } = this.state;
            if (this.state.status === 'You Lost!') {
                clearInterval(intervalID);
                return;
            }
            this.movingSnake(direction);
        }, this.state.snakeSpeed);
    }

    movingSnake = (direction) => {
        let newHead = [...this.state.head];

        console.log("head", this.state.head);
        const { matrix, board } = this.state;

        let newBoard = [];

        // creating the board
        for(let i=0; i < matrix; i++) {
            newBoard.push([]);
            for(let j = 0; j < matrix; j++) {
                newBoard[i][j] = board[i][j];
            }
        }

        switch (direction) {

            case 'up':
                newHead[1] =  newHead[1] - 1; 
                if(this.checkGameOver(newHead)) {
                    this.setState({
                        status: 'You Lost!'
                    });
                } else {
                    const { board } = this.state;
                    let newSnakePositions = [...this.state.snakePositions];
                    if(board[newHead[0]][newHead[1]] === "F") {
                        
                        newSnakePositions.unshift(newHead);
                        // newSnakePositions.pop();
                    } else {
                        newSnakePositions.unshift(newHead);
                        newSnakePositions.pop();
                    }

                    for(let i=0; i< newSnakePositions.length; i++) {
                        newBoard[newSnakePositions[i][0]][newSnakePositions[i][1]] = "S"
                    }

                    this.setState({
                        ...this.state,
                        snakePositions: newSnakePositions,
                        board: newBoard
                    });
                }
                this.setState({
                    ...this.state,
                    head: newHead
                });
                break;
            case 'down':
                newHead[1] =  newHead[1] + 1; 
                if(this.checkGameOver(newHead)) {
                    this.setState({
                        status: 'You Lost!'
                    });
                } else {
                    const { board } = this.state;
                    let newSnakePositions = [...this.state.snakePositions];
                    if(board[newHead[0]][newHead[1]] === "F") {
                        
                        newSnakePositions.unshift(newHead);
                        // newSnakePositions.pop();
                    } else {
                        newSnakePositions.unshift(newHead);
                        newSnakePositions.pop();
                    }
                    for(let i=0; i< newSnakePositions.length; i++) {
                        newBoard[newSnakePositions[i][0]][newSnakePositions[i][1]] = "S"
                    }

                    this.setState({
                        ...this.state,
                        snakePositions: newSnakePositions,
                        board: newBoard
                    });
                }
                this.setState({
                    ...this.state,
                    head: newHead
                });
                break;
            case 'right':
                // console.log("new head", newHead);
                newHead[0] =  newHead[0] + 1; 
                if(this.checkGameOver(newHead)) {
                    this.setState({
                        status: 'You Lost!'
                    });
                } else {
                    const { board } = this.state;
                    let newSnakePositions = [...this.state.snakePositions];
                    if(board[newHead[0]][newHead[1]] === "F") {
                        
                        newSnakePositions.unshift(newHead);
                        // newSnakePositions.pop();
                    } else {
                        newSnakePositions.unshift(newHead);
                        newSnakePositions.pop();
                    }
                    for(let i=0; i< newSnakePositions.length; i++) {
                        newBoard[newSnakePositions[i][0]][newSnakePositions[i][1]] = "S"
                    }

                    console.log("new boards", newBoard, newSnakePositions);

                    this.setState({
                        ...this.state,
                        snakePositions: newSnakePositions,
                        board: newBoard
                    });
                }
                this.setState({
                    ...this.state,
                    head: newHead
                });
                break;
            case 'left':
                newHead[0] =  newHead[0] - 1; 
                if(this.checkGameOver(newHead)) {
                    this.setState({
                        status: 'You Lost!'
                    });
                } else {
                    const { board } = this.state;
                    let newSnakePositions = [...this.state.snakePositions];
                    if(board[newHead[0]][newHead[1]] === "F") {
                        
                        newSnakePositions.unshift(newHead);
                        // newSnakePositions.pop();
                    } else {
                        newSnakePositions.unshift(newHead);
                        newSnakePositions.pop();
                    }

                    
                    for(let i=0; i< newSnakePositions.length; i++) {
                        newBoard[newSnakePositions[i][0]][newSnakePositions[i][1]] = "S"
                    }

                    this.setState({
                        ...this.state,
                        snakePositions: newSnakePositions,
                        board: newBoard
                    });
                }
                this.setState({
                    ...this.state,
                    head: newHead
                });
                break;
        
            default:
                break;
        }
    }

    checkGameOver = (head) => {
        const { board } =  this.state;
        if (board[head[0]][head[1]] === "B" || board[head[0]][head[1]] === undefined )  {
            return true;
        }
        return false;
    }

    findingAvailablePositions = (board, matrix) => {
        let availablePositions = [];

        // finding available positions
        for(let i=0; i < matrix; i++) {
            for(let j = 0; j < matrix; j++) {
                if(board[i][j] === "") {
                    availablePositions.push([i, j]);
                }
            }
        }

        return availablePositions;
    }

    randomFoodGenerator = () => {
        const { board, matrix } = this.state;
        let availablePositions =  this.findingAvailablePositions(board, matrix);
        let availablePositionsLength = availablePositions.length;
        let randomFoodPosition = Math.floor((Math.random()*availablePositionsLength - 1));
        randomFoodPosition = availablePositions[randomFoodPosition];
        board[randomFoodPosition[0]][randomFoodPosition[1]] = "F";

        this.setState({
            board: board,
        });
    }

    render() {
        console.log("state", this.state);
        const { board } =  this.state;
        return (
            <div className="page">
                <div className="board">
                    {board.map((row, i) => {
                        
                        return <div className="row" key={i}>{row.map((col, j) => {
                            
                            if (col === "") {
                                return <Cell key={i + " " + j}/>
                            } else if(col === "S") {
                                return <Snake key={i + " " + j}/>
                            } else if(col === "F") {
                                return <Food key={i + " " + j} />
                            } else if(col === "B") {
                                return <Block key={i + " " + j} />
                            }

                        })}
                        </div>
                    })}
                </div>

                <div>{this.state.status}</div>

                <button onClick={this.startGame}>Reset</button>
            </div>
        )
    }
}

export default Board;