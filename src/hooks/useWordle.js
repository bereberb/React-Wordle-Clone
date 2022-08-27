import { useState } from "react"

const useWordle = (solution) => {
    const [turn, setTurn] = useState(0) 
    const [currentGuess, setCurrentGuess] = useState('')
    const [guesses, setGuesses] = useState([...Array(6)]) // each guess is an array
    const [history, setHistory] = useState([]) // each guess is a string
    const [isCorrect, setIsCorrect] = useState(false)
    
    //format a guess into an array of letter objects
    //[{key: 'a', color: 'yellow'}]
    const formatGuess = () => {
        let solutionArray = [...solution]
        let formattedGuess = [...currentGuess].map((letter) => {
            return { key:letter, color: 'grey' }
        })

        //find any green letters
        formattedGuess.forEach((letter, i) =>{
            if (solutionArray[i] === letter.key ) {
                formattedGuess[i].color = 'green'
                solutionArray[i] = null
            }
        })

        //find any yellow colors
        formattedGuess.forEach((letter, i) =>{
            if (solutionArray.includes(letter.key) && letter.color !== 'green') {
                formattedGuess[i].color = 'yellow'
                solutionArray[solutionArray.indexOf(letter.key)] = null
            }
        })

        return formattedGuess

    }

    //add a new guess to the guesses state
    //update the isCorrect state if guess is correct
    // add one to the turn state
    const addNewGuess = (formattedGuess) => {
        if (currentGuess === solution) {
            setIsCorrect(true)
        }
        setGuesses((prevGuesses) => {
            let newGuesses = [...prevGuesses]
            newGuesses[turn] = formattedGuess
            return newGuesses
        })
        setHistory((prevHistory) => {
            return [...prevHistory, currentGuess]
        })
        setTurn((prevTurn) => {
            return prevTurn + 1
        })
        setCurrentGuess('')

    }

    //handle keyup event & track current guess
    //if user press enter, add new guess
    const handleKeyup = ( {key} ) => {
        if (key=== "Enter") {
            //conditions
            //only add guess is less the 5
            if (turn > 5) { 
                console.log('you use all your guesses')
                return
            }
            //do not allow duplicate words
            if (history.includes(currentGuess)) {
                console.log('you already tried that word')
                return
            }
            // check word is 5 characters long
            if (currentGuess.length !== 5 ) {
                console.log('words must be 5 chars long')
                return
            }
            const formatted = formatGuess()
            addNewGuess(formatted)
        }

        //removing last letter from current guess
        if ( key === "Backspace" ) {
            setCurrentGuess((prev) =>{
                return prev.slice(0,-1)
            })
        }

        //to check if keypress are valid 
        if (/^[A-Za-z]$/.test(key)) { 
            if (currentGuess.length < 5 ) {
                setCurrentGuess((prev) => {
                    return prev + key
                })
            }
        }

    }

    return {turn, currentGuess, guesses, isCorrect, handleKeyup}
    
}

export default useWordle;