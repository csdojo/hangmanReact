import React from "react";
import "./style.css";

const Nav = props => (
    <div>
        <ul className="nav nav-pills nav-justified">
            <div className="container navC">
                <li><a href="/">HangMan Game</a></li>
                <li
                    // className={props.message.indexOf('incorrectly') !== -1 ?
                    //     "desc-incorrect" :
                    //     props.message.indexOf('correctly') !== -1 ?
                    //         "desc-correct" :
                    //         "desc-normal"}
                >
                    {props.message}
                </li>
                <li>Wins: <span style={{ color: "yellow" }}>{props.wins}</span></li>
            </div>
        </ul>
    </div >
);

export default Nav;

