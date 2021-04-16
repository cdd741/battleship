import React from 'react';
import './board.scss';

function Board() {
    let gridArray = [];
    for (let i=0; i<64;i++) {
        gridArray.push(i);
    }

    let grids = gridArray.map(grid => {
        return <div key={grid} className="board__grid"></div>
    });
    return (
        <div className="board">
            {grids}
        </div>
    )
}

export default Board
