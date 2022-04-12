import React, {useEffect} from "react"
import {Link, useNavigate} from 'react-router-dom'
import {listDecks, deleteDeck} from "../utils/api"

function DeckList ({decks, setDecks}) {
    const history = useNavigate()

    useEffect(()=> {
        listDecks().then(setDecks) 
    },[setDecks])

    function onClickDelete(id) {
        const newDecks = decks.filter((deck) => deck.id !== Number(id));
        setDecks(newDecks);
      }

      function handleDelete(id) {
        // display confirm dialog and allow cancel
        const doesConfirm = window.confirm("Are you sure you want to delete?");
        if (!doesConfirm) return;
        // call the delete API function
        deleteDeck(id)
          .then(() => {
            // if success, delete from state by calling onClickDelete
            onClickDelete(id)
            .then(history("/"))
          })
          .catch(err => console.error(err));
      }

    return (
        <>
            <Link to="/decks/new" 
                className="btn btn-secondary mb-2">
                <span className="oi oi-plus" /> Create Deck
            </Link>

            {decks.map((deck) => (
                <div className="card" key={deck.id}>
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <div>
                                <h3>{deck.name}</h3>
                            </div>
                            <div>
                                <span><h6>{deck.cards.length} cards</h6></span>
                            </div>
                        </div>
                        <p>{deck.description}</p>
                    
                        <div className="d-flex justify-content-between">
                            <div>
                                <Link to={`/decks/${deck.id}`} className="btn btn-secondary m-2">
                                    <span className="oi oi-eye"></span> View
                                </Link>
                                <Link to={`/decks/${deck.id}/study`} className="btn btn-primary m-2">
                                    <span className="oi oi-book"></span> study
                                </Link>
                            </div>
                            <div> 
                                <button onClick={() => handleDelete(deck.id)} className="btn btn-danger">
                                <span className="oi oi-trash"></span></button>   
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>    
    )
}

export default DeckList