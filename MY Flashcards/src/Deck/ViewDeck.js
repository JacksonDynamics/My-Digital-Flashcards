import React from "react"
import {Link, useNavigate, useParams} from  "react-router-dom"
import {useState,useEffect} from 'react'
import {readDeck, deleteDeck, deleteCard} from "../utils/api"

function ViewDeck () {

    const [deck, setDeck] = useState({})

    const history = useNavigate()
    const { deckId } = useParams();

    useEffect(() => {
        const getData = async () => {
            const response = await readDeck(deckId);
            setDeck(response);
        };
        getData();
    }, [deckId]);


    // handle deck deletion by triggering dialog box
    // await deleteDeck API call then redirect to home
    const handleDelete = async (id) => {
        const doesConfirm = window.confirm("Are you sure you want to delete?");
        if (!doesConfirm) return;
        await deleteDeck(id);
        history("/");
    };

    // helper function to be passed down to Card(s)
    // in order to set deck state "cards" prop array
    // as a filtered array without card to delete
    const onClickCardDelete = async (id) => {
        const newCards = deck.cards.filter((card) => card.id !== Number(id));
        setDeck({
        ...deck,
        cards: newCards,
        });
    };

        function handleCardDelete(id) {
            // display confirm dialog and allow cancel
            const doesConfirm = window.confirm("Are you sure you want to delete?");
            if (!doesConfirm) return;
            // call the delete API function
            deleteCard(id)
            .then(() => {
                // if success, delete from state by calling onClickDelete
                onClickCardDelete(id);
            })
            .catch(err => console.error(err));
        }



if(deck && deck.cards) {
    return (
        <>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
            <li className="breadcrumb-item">
                <Link to="/"><span className="oi oi-home"/>&nbsp;Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page"> {deck.name}</li>
            </ol>
        </nav>

        <h3>{deck.name}</h3>
        <p>{deck.description}</p>

        <div className="d-flex justify-content-between">
            <div>
                <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary mb-2 mr-2">
                <span className="oi oi-pencil" /> Edit</Link>
                <Link to={`/decks/${deckId}/study`} className="btn btn-primary mb-2 mr-2">
                <span className="oi oi-book" /> Study </Link>
                <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary mb-2">
                <span className="oi oi-plus" /> Add Cards </Link>
            </div>
            <div> 
                <button onClick={() => handleDelete(deck.id, history("/"))} className="btn btn-danger">         
                <span className="oi oi-trash"></span></button>      
            </div>
        </div>

        <h3 className="mt-3">Cards</h3>

        {deck.cards.map((card) => (
            <div className="card" key={card.id}>
                
                <div className="card-body">
                    <div className="container">
                        <div className="row">
                            <p className="col-5">
                                {card.front}
                            </p>          
                            <p className="col-5">
                                {card.back}
                            </p>
                            <span className="col-2 justify-content-right">
                                <Link to={`/decks/${deckId}/cards/${card.id}/edit`} className="btn btn-secondary mr-2">
                                <span className="oi oi-pencil" /> Edit</Link>
                                <button onClick={() => handleCardDelete(card.id, history(0))} className="btn btn-danger">
                                <span className="oi oi-trash"></span></button>
                            </span>    
                        </div>
                    </div>   
                </div>  
            </div>           
        ))}
     
        </>
        )
    } else {
        return <p>Loading... </p>
    }
}

export default ViewDeck