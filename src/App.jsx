import React from "react"
import Die from "./Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {

   const [dice , setDice] = React.useState(myDice())
    const  [tenzies , setTenzies] = React.useState(false)

    React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const sameDiceValue = dice.every(die => die.value === firstValue)
    if (allHeld && sameDiceValue){
    setTenzies(true)
    }
    },[dice])

    function generateNewDie() {
        return {
        value: Math.ceil(Math.random() * 6 ),
        isHeld: false,
        id: nanoid()
        }
    }

 
 function myDice(){
    const newDice = []
    for (let i = 0; i < 10; i ++) {
        newDice.push(
           generateNewDie())
        }
            return newDice
    }

           function rollDice (){
            if(!tenzies){
            setDice(oldDice => oldDice.map(die =>
                {
                    return die.isHeld?
                    die:
                    generateNewDie()
                }))}
                else {
                    setTenzies(false)
                    setDice(myDice)
                }
        }
        
        function holdDice(id){
            setDice(oldDice => oldDice.map(
                die => {
                  return  die.id === id ?
                    {...die, isHeld : !die.isHeld} :
                    die
                }
            ))
        }
  
        const diceBox = dice.map (die => (
            <Die value = {die.value}
            key = {die.id} 
           isHeld = {die.isHeld} 
           holdDice = {() => holdDice(die.id)}
          />)) 
            
return (
    <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceBox}
            </div>
            <button 
                className="roll-dice" 
                onClick={rollDice}>
                {tenzies ? "New Game" : "Roll"}
            </button>
</main>
)


    }