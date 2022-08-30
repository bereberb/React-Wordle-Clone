import React, { useEffect } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid'
import Keypad from './Keypad'

export default function Wordle( { solution }) {
    const { currentGuess, handleKeyup, guesses,useKeys, isCorrect, turn } = useWordle(solution)

    useEffect(()=>{
        window.addEventListener('keyup',handleKeyup)
        if (isCorrect) {
          console.log("congrats you win!")
          window.removeEventListener('keyup', handleKeyup)
        }

        if (turn > 5 ) {
          console.log("Looks like you lose, Try again.")
          window.removeEventListener('keyup', handleKeyup)
        }
        //cleanup for event listener
        return () => window.removeEventListener('keyup', handleKeyup)
    },[handleKeyup, isCorrect])

  return (
    <div>
        <div>Solution {solution}</div>
        <div>current - {currentGuess}</div>
        <Grid currentGuess={currentGuess} guesses={guesses} turn={turn}/>
        <Keypad useKeys={useKeys}/>
    </div>
  )
}
