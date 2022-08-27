import React, { useEffect } from 'react'
import useWordle from '../hooks/useWordle'

export default function Wordle( { solution }) {
    const { currentGuess, handleKeyup, guesses, isCorrect, turn } = useWordle(solution)

    useEffect(() => {
        console.log(guesses, turn, isCorrect)
    },[guesses, turn, isCorrect])

    useEffect(()=>{
        window.addEventListener('keyup',handleKeyup)

        //cleanup for event listener
        return () => window.removeEventListener('keyup', handleKeyup)
    },[handleKeyup])

  return (
    <div>
        <div>Solution {solution}</div>
        <div>current - {currentGuess}</div>
    </div>
  )
}
