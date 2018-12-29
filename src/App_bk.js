import React, { Component } from "react";
import Nav from './components/Nav';
import bands from "./bands.json";
import letters from "./letters.json";
import "./App.css";

/*
---global variables what have to be updated
    bandPhoto
    bandName
    wins
    message
    guessed letters
    guesses left
    currentGuess

---functions
   -- computerPick
     --splice computer pick bands name
     --get the bands name length
   -- 


---render 

   --views
   --reload page || new game button, state initialized, computerPick 
   --onkeyup, store the event.key, if match write event.key to page, write rest of the letter with "_"
   --
*/
class App extends Component {

  state = {
    bandPhoto: "",
    bandName:"",
    message: "Type in any letter to begin!",
    wins: 0,
    guessed: [],
    left: 15,
    currentGuess: [],
    guessedDummy:[],
  };

  reset = () => {
    let index = Math.floor(Math.random() * bands.length)
    
    this.setState({
      bandPhoto:bands[index]["image"],
      bandName:bands[index]["name"],
      message: "Type in any letter to begin!",
      wins: 0,
      guessed: [],
      left: 15,
      currentGuess: ("_".repeat(bands[index]["name"].length)).split(""),
      guessedDummy:bands[index]["name"].split("")
    })
  }

  handleKeyPress = (event) => {

    
    if (event.key == 'p') {
      this.reset()
      console.log(this.state)
      // var joined = this.state.guessed.concat(event.key);
      // this.setState({

      //   message: "You guessed incorrectly!",
      //   wins: this.state.wins + 1,
      //   guessed: joined,
      //   left: this.state.left - 1,
      // });
    }

  }

  render() {
    return (

      <div>
        <Nav
          message={this.state.message}
          wins={this.state.wins}
        />
        <div className="text-center d-flex align-items-center justify-content-center background">

          <div className="row justify-content-between">
            <div className="card col col-4 picture">
              <ul className="list-group list-group-flush">
                <li className="list-group-item picture"></li>
              </ul>
            </div>

            <div className="card col col-4 picture">
              <ul className="list-group list-group-flush">
                <li className="list-group-item typein">
                  <p>Band Name</p>
                  <input onKeyPress={this.handleKeyPress}></input>
                </li>
                <li className="list-group-item typein">
                  <p>Guessed Letter</p>
                  <p>{this.state.guessed}</p>
                </li>
                <li className="list-group-item typein">
                  <p>Guesses Left</p>
                  <p>{this.state.left}</p>
                </li>
              </ul>
            </div>
          </div>

        </div>

      </div>

    )
  }
}

export default App;
