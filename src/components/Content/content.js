import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import "./style.css";

class Content extends Component {
  render() {
    return (
      <div>
        <div className="d-flex align-items-center justify-content-center background">
          <div className="row justify-content-between infoBox">
            <div className="text-center card col col-4 picture">
              <ul className="list-group list-group-flush">
                <li className="list-group-item picture">
                  <p className="bandname">{this.props.isWin 
                  ? `${this.props.bandName}` : `Guess the band!`}
                    </p>
                  <img src={this.props.isWin 
                    ? `${this.props.bandPhoto}` : `https://www.pngmart.com/files/3/Band-PNG-Photos.png`} />
                  <div className="player">
                    <ReactPlayer url={this.props.isWin ? `${this.props.bandLink}` : ``} playing />
                  </div>
                </li>
              </ul>
            </div>
            <div className=" card col col-4 picture typeinBox">
              <ul className="list-group list-group-flush text-center ">
                <li className="list-group-item typein">
                  <p>Band Name</p>
                  <input className="inputBand text-center" onKeyPress={this.props.handleKeyPress} value={this.props.userGuess} autofocus="true"></input>
                </li>
                <li className="list-group-item typein">
                  <p>Guessed Letter</p>
                  <p className="guessed">{this.props.guessed}</p>
                </li>
                <li className="list-group-item typein">
                  <p>Guesses Left</p>
                  <p className="left">{this.props.left}</p>
                </li>
                <li>
                  <button className="btn" onClick={this.props.reset}>Reset</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )

  }
}
export default Content;