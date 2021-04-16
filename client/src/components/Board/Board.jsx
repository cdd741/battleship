import React from "react";
import "./board.scss";

function Board(props) {
    let grids = props.gridArray.map((grid, index) => {
        return (
            <div
                key={index}
                className="board__grid"
                onClick={() => {
                    props.handleClick(grid.lat, grid.lon);
                }}
            ></div>
        );
    });

    return <div className="board">{grids}</div>;
}

export default Board;
