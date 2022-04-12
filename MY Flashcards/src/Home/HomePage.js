import React, {useState} from "react"
import DeckList from "../Deck/DeckList"

function Home () {
    const [decks, setDecks] = useState([])
    
    if (decks) {
      return (
        <>
          <DeckList decks={decks} setDecks={setDecks} />
        </>
      )
    } else {
      return <h1> Loading... </h1>
    }    
}

export default Home