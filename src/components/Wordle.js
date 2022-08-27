import React, { useEffect } from 'react'
import useWordle from '../hooks/useWordle'

export default function Wordle( { solution }) {
    const { currentGuess, handleKeyup } = useWordle(solution)

    useEffect(()=>{
        window.addEventListener('keyup',handleKeyup)
        console.log(currentGuess)
        return () => window.removeEventListener('keyup', handleKeyup)
    },[handleKeyup])

  return (
    <div>current - {currentGuess}</div>
  )
}
