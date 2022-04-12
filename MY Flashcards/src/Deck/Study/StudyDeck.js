import React, { useState, useEffect } from "react";
import { readDeck } from "../../utils/api";
import { useParams, Link, useNavigate } from "react-router-dom";
import StudyCardView from "./StudyCardView"

function StudyDeck() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const history = useNavigate()

  useEffect(() => {
    readDeck(deckId).then(setDeck);
  }, [deckId]);

   
    return (
      <>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">
                <span className="oi oi-home" /> Home
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}> {deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {" "}
              Study
            </li>
          </ol>
        </nav>
        <h1>{deck.name}: Study</h1>


      {(() => {
        if (deck.cards && deck.cards.length > 2) {
          return (
            <StudyCardView />
          )
        } else {
          return (
            <>
                <h3>Not enough cards.</h3>
                <p>You need at least 3 cards to study. There are cards in this deck</p>
            </>
          )
        }
      })()}
      <br/>
      <button 
          type="button" 
          onClick={() => history(-1)} 
          className="btn btn-secondary mb-2 mr-2">Go Back
      </button>
      <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary mb-2">
                <span className="oi oi-plus" /> Add Cards </Link>
    </>
  )
        
}

export default StudyDeck;


