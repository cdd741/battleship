import React from "react";
import "./App.scss";
import AvailableShips from "./components/AvailableShips/AvailableShips";
import Board from "./components/Board/Board";
import Start from "./components/Start/Start";
import Title from "./components/Title/Title";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            startGame: false,
        };
    }

    handleClickStart = (event) => {
        event.preventDefault();
        this.setState({
            startGame: true,
        });
    };

    render() {
        let game = <Start clickHandler={this.handleClickStart} />;
        if (this.state.startGame) {
            game = (
                <div className="canvas">
                  <div className="canvas__boards">
                    <Board />
                    <Board />
                  </div>
                  <h2>Your available ships</h2>
                    <AvailableShips />
                </div>
            );
        }

        return (
            <div className="App">
                <header>
                    <Title title="Battleships" />
                </header>
                <main>{game}</main>
            </div>
        );
    }
}

export default App;
