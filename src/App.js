import React, { Component } from "react";
import PropTypes from 'prop-types';
import Nav from './components/Nav';
import Content from './components/Content';
import bands from "./bands.json";
import letters from "./letters.json";


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

  constructor(props) {
    super(props);

    let index = Math.floor(Math.random() * bands.length);
    this.state = {
      bandPhoto: this.props.bands[index]["image"],
      bandName: this.props.bands[index]["name"],
      bandLink: this.props.bands[index]["link"],
      message: "Type in any letter to begin!",
      wins: 0,
      guessed: [],
      left: 15,
      currentGuess: ("_".repeat(this.props.bands[index]["name"].length)).split(""),
      guessedDummy: this.props.bands[index]["name"].split(""),
      isWin: false,
    };
    this.reset = this.reset.bind(this);
    this.restart = this.restart.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  // restart is similar to reset, but keep the wins
  restart() {
    let index = Math.floor(Math.random() * bands.length);
    this.setState({
      bandPhoto: this.props.bands[index]["image"],
      bandName: this.props.bands[index]["name"],
      bandLink: this.props.bands[index]["link"],
      message: "Type in any letter to begin!",
      guessed: [],
      left: 15,
      currentGuess: ("_".repeat(this.props.bands[index]["name"].length)).split(""),
      guessedDummy: this.props.bands[index]["name"].split(""),
      isWin: false
    });
    
  }

  
  // reset is to clear all states to the original form
  reset() {
    // this.setState({wins: 0});
    this.setState({
      wins: 0
    });
    this.restart();
  }

  handleKeyPress(event) {
    // this.reset()
    // get key stroke, and enforce it to be a-z, not case sensitive

    var userGuessed = event.key.toLowerCase();


    if (!(this.props.letters.includes(userGuessed))) {
      this.setState({
        message: "Please type in an alphabetic letter!"
      })
      return false;
    }

    const indexOfLetter = this.state.guessedDummy.indexOf(userGuessed);
    var newLeft = this.state.left - 1;
    if (indexOfLetter >= 0) {
      // if guessed correctly

      var newCurrentGuess = this.state.currentGuess;
      newCurrentGuess.splice(indexOfLetter, 1, userGuessed);
      var newGuessedDummy = this.state.guessedDummy
      newGuessedDummy.splice(indexOfLetter, 1, '_');
      this.setState({
        message: "Great, you get one more letter correctly!",
        guessed: [...this.state.guessed, userGuessed],
        left: newLeft,
        currentGuess: newCurrentGuess,
        guessedDummy: newGuessedDummy
      })

      // if guessedDummy is all '_', then win
      if (newGuessedDummy.join('') === '_'.repeat(this.state.bandName.length)) {
        this.setState({
          wins: this.state.wins + 1,
          isWin: true,
          message:"You win!"
        });


        setTimeout(function () { alert("You win!"); }, 2000);
        const restart = () => this.restart()
        setTimeout(restart, 2000);
      }

    } else {
      // if guessed incorrectly

      this.setState({
        message: `Sorry, ${userGuessed} is not in the band name, try again!`,
        guessed: [...this.state.guessed, userGuessed],
        left: newLeft,
        isWin: false
      })

      // if left reaches zero
      if (newLeft === 0) {
        setTimeout(function () { alert("You lose!"); }, 500);
        this.restart();
      }
    }

  }

  render() {
    // this.reset()
    return (
      <div>
        <Nav
          message={this.state.message}
          wins={this.state.wins}
        />
        <Content
          userGuess={this.state.currentGuess.join(' ')}
          guessed={this.state.guessed.join(',')}
          handleKeyPress={this.handleKeyPress}
          left={this.state.left}
          reset={this.reset}
          bandName={this.state.bandName}
          bandPhoto={this.state.bandPhoto}
          bandLink={this.state.bandLink}
          isWin={this.state.isWin}
          
        />
  

      </div>
    )
  }
}
App.defaultProps = { bands: bands, letters: letters }
App.propTypes = { bands: PropTypes.array, letters: PropTypes.array }
export default App;