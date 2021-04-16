import "./start.scss";

import React from "react";

function Start(props) {
    return (
        <div className="start">
            <button
                className="start__button"
                onClick={(event) => {
                    props.clickHandler(event);
                }}
            >
                Start
            </button>
        </div>
    );
}

export default Start;
