import React from 'react';
import './available-ships.scss';
import submarine from '../../assets/images/ShipSubMarineHull.png';
import patrol from '../../assets/images/ShipPatrolHull.png';
import destroyer from '../../assets/images/ShipDestroyerHull.png';
import carrier from '../../assets/images/ShipCarrierHull.png';
import battle from '../../assets/images/ShipBattleshipHull.png';

function AvailableShips(props) {
    return (
        <div className="available-ships">
            <img src={submarine} alt="submarine" onClick={() => {props.handleClick(1)}}/>
            <img src={patrol} alt="patrol ship" onClick={() => {props.handleClick(2)}}/>
            <img src={destroyer} alt="destroyer" onClick={() => {props.handleClick(3)}}/>
            <img src={carrier} alt="carrier ship" onClick={() => {props.handleClick(4)}}/>
            <img src={battle} alt="battleship" onClick={() => {props.handleClick(5)}}/>
        </div>
    )
}

export default AvailableShips
