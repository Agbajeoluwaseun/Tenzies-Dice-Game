import React from "react"


export default function Die(props) {
     const styles = {
        backgroundColor: props.isHeld ? "black" : "white",
        color: props.isHeld ? "white" : "black"
     }
    return (
        <div className="die-face" style = {styles}  onClick = {props.holdDice} >
      <h2 className="die-num" > {props.value} </h2>
    </div>
    )
}