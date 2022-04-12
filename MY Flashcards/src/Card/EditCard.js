import React, {useState, useEffect} from 'react'
import {updateCard, readDeck, readCard} from "../utils/api"
import {useNavigate, useParams, Link} from "react-router-dom"

function EditCard () {

    const history = useNavigate()

    const {cardId} = useParams()
    const {deckId} = useParams()

    const initialFormState = {
        name: "",
        description: ""
    }

    const [card, setCard] = useState({initialFormState})
    const [deck, setDeck] = useState({});
    
    
    useEffect(() => {
        readCard(cardId)
        .then(setCard)
    }, [cardId])

    // await deck to be returned from readDeck API call then set deck state as response
    useEffect(() => {
        const getDeck = async () => {
        const response = await readDeck(deckId);
        setDeck(response);
        };
        getDeck();
    }, [deckId]);



const handleChange = ({target}) => {
    setCard({
        ...card,
        [target.name]: target.value
    })
}

const handleSubmit = async (e) => {
    e.preventDefault()
    await updateCard(card)
    history(-1)
}

    return  (
        <>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/"><span className="oi oi-home"/> Home</Link></li>
            <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name} Deck</Link></li>
            <li className="breadcrumb-item active" aria-current="page"> Edit Card {cardId}</li>
            </ol>
        </nav>

        <h1>Edit Card</h1>
        
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="front">Front</label>
                <textarea
                    className="form-control"
                    type="text"
                    name="front"
                    id="front" 
                    onChange={handleChange}
                    value={card.front}
                    placeholder="Front side of card"
                    required={true}
                ></textarea>
            </div>
            <div className="mb-3">
                <label htmlFor="back">Back</label>
                <textarea 
                    className="form-control"
                    id="back" 
                    name="back" 
                    onChange={handleChange}
                    value={card.back}
                    placeholder="Card Back"
                    required={true}
                    >
                </textarea>
            </div>

            <button 
                    type="button" 
                    onClick={() => history(-1)} 
                    className="btn btn-secondary mb-2 mr-2">Cancel
            </button>

            <button type="submit" className="btn btn-primary mb-2">Submit</button>

        </form>
    </>
)
}

export default EditCard