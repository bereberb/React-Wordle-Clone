import React, { useEffect, useState } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid'
import Keypad from './Keypad'
import Modal from './Modal'

export default function Wordle( { solution }) {
    const { currentGuess, handleKeyup, guesses,useKeys, isCorrect, turn } = useWordle(solution)
    const [showModal, setShowModal] = useState(false)
    useEffect(()=>{
        window.addEventListener('keyup',handleKeyup)
        if (isCorrect) {
          setTimeout(() => setShowModal(true), 2000)
          window.removeEventListener('keyup', handleKeyup) //detach handleKey
        }
        
        if (turn > 5 ) {
          setTimeout(() => setShowModal(true), 2000)
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
        {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution}/>}
    </div>
  )
}
