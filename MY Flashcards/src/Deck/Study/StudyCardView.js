import React, { useState, useEffect } from "react";
import { useNavigate, useParams, } from "react-router-dom";
import { readDeck } from "../../utils/api/index";


function StudyCardView() {
  const history = useNavigate();


  const [deck, setDeck] = useState({});

  const { deckId } = useParams();

  useEffect(() => {
    const getData = async () => {
      const response = await readDeck(deckId);
      setDeck(response);
    };
    getData();
  }, [deckId]);

  let cards;

  // if deck has been set in state, reassign cards to be
  // the cards array of the deck
  if (deck.id) {
    cards = deck.cards;
  }





  // set initialCardState to ensure first card shown is
  // first card in array and displaying front side
  const initialCardState = {
    index: 0,
    frontSide: true,
    flipped: false,
  };

  // set card state to initialCardState object
  const [card, setCard] = useState({ ...initialCardState });

  // function to handle flip button by toggling
  // frontSide and flipped props
  const handleFlipCard = () => {
    setCard({
      ...card,
      frontSide: !card.frontSide,
      flipped: !card.flipped,
    });
  };

  // function to handle next button
  const handleNextCard = () => {
    // if statement to handle moving past last card in array
    if (card.index === cards.length - 1) {
      const doesRestart = window.confirm(
        "Restart cards? Click 'cancel' to return to the home page."
      );
      // if restarting is confirmed, set card to initial state
      if (doesRestart) {
        setCard({ ...initialCardState });
        // if restarting is denied, redirect to home page
      } else {
        history("/");
      }
      // if card is not last card in array, ensure that
      // display moves to next card in array and displays
      // front side by using initialCardState
    } else {
      setCard({
        ...initialCardState,
        index: card.index + 1,
      });
    }
  };

  let sideText;

  // setting sideText based on frontSide prop of card state
  if (cards && cards.length > 0 && card.frontSide) {
    sideText = cards[card.index].front;
  } else if (cards && cards.length > 0) {
    sideText = cards[card.index].back;
  }

  let nextButton;

  // only display the next button if the card has been flipped
  if (cards && cards.length > 0 && card.flipped) {
    nextButton = (
      <button onClick={handleNextCard} className="btn btn-primary">
        Next
      </button>
    );
  }


  if (cards) {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            Card {card.index + 1} of {cards.length}
          </h5>
          <p className="card-text">{sideText}</p>
          <div>
            <button onClick={handleFlipCard} className="btn btn-secondary mr-2">
              Flip
            </button>
            {nextButton}
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default StudyCardView;