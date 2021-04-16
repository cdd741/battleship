import React from "react";
import "./App.scss";
import AvailableShips from "./components/AvailableShips/AvailableShips";
import Board from "./components/Board/Board";
import Start from "./components/Start/Start";
import Title from "./components/Title/Title";
import { board } from "./util/board";
// import subscribeToGame from "./util/subscribeToGame";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:8080";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.socket = socketIOClient(ENDPOINT);

        this.state = {
            startGame: false,
            gridArray: board,
            currentShip: null,
            hoverPos:{}
        };
    }

    handlePlacementGridClick = (lat, lon) => {
        console.log(`Clicked on lat:${lat} & lon:${lon}`);

    };

    handleAttackGridClick = (lat, lon) => {
        console.log(`Clicked on lat:${lat} & lon:${lon}`);
    };

    handleShipSelect = (ship) => {
        this.setState({
            currentShip: ship,
        });
        // console.log("currentShip:", this.state.currentShip);
        // console.log("clicked on:", ship)
    };

    handleClickStart = (event) => {
        event.preventDefault();
        this.setState({
            startGame: true,
        });
        this.socket.on("game-start", data=> {
          console.log(data)
        } );
    };

    render() {
        let game = <Start clickHandler={this.handleClickStart} />;
        if (this.state.startGame) {
            game = (
                <div className="canvas">
                    <div className="canvas__boards">
                        <Board
                            gridArray={this.state.gridArray}
                            handleClick={this.handlePlacementGridClick}
                            handleMouseEnter = {this.handleMouseEnter}
                        />
                        <Board
                            gridArray={this.state.gridArray}
                            handleClick={this.handleAttackGridClick}
                        />
                    </div>
                    <h2>Your available ships</h2>
                    <AvailableShips handleClick={this.handleShipSelect} />
                </div>
            );
        }

        return (
            <div className="App">
                <header>
                    <Title title="Battleships" />
                </header>
                <main
                    onContextMenu={(event) => {
                        event.preventDefault();
                    }}
                >
                    {game}
                </main>
            </div>
        );
    }
}

export default App;
