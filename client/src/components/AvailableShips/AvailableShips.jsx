import React from 'react';
import './available-ships.scss';
import submarine from '../../assets/images/ShipSubMarineHull.png';
import patrol from '../../assets/images/ShipPatrolHull.png';
import destroyer from '../../assets/images/ShipDestroyerHull.png';
import carrier from '../../assets/images/ShipCarrierHull.png';
import battle from '../../assets/images/ShipBattleshipHull.png';

function AvailableShips() {
    return (
        <div className="available-ships">
            <img src={submarine} alt="submarine"/>
            <img src={patrol} alt="patrol ship"/>
            <img src={destroyer} alt="destroyer"/>
            <img src={carrier} alt="carrier ship"/>
            <img src={battle} alt="battleship"/>
        </div>
    )
}

export default AvailableShips
