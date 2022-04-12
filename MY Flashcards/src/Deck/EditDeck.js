import React, {useState, useEffect} from 'react'
import {updateDeck, readDeck} from "../utils/api"
import {useNavigate, useParams, Link} from "react-router-dom"

function EditDeck () {

    const history = useNavigate()

    const {deckId} = useParams()

    const initialFormState = {
        name: "",
        description: ""
    }

    const [deck, setDeck] = useState({initialFormState})
    
    
    useEffect(() => {
        readDeck(deckId)
        .then(setDeck)
    }, [deckId])



const handleChange = ({target}) => {
    setDeck({
        ...deck,
        [target.name]: target.value
    })
}

const handleSubmit = async (e) => {
    e.preventDefault()
    await updateDeck(deck)
    history(-1)
}

    return  (
        <>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/"><span className="oi oi-home"/> Home</Link></li>
            <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}> {deck.name}</Link></li>
            <li className="breadcrumb-item active" aria-current="page"> Edit Deck</li>
            </ol>
        </nav>

        <h1>Edit Deck</h1>
        
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name">Name</label>
                <input 
                    className="form-control"
                    type="text"
                    name="name"
                    id="name" 
                    onChange={handleChange}
                    value={deck.name}
                    placeholder="Deck Name"
                    required={true}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="comment">Description</label>
                <textarea 
                    className="form-control"
                    id="description" 
                    name="description" 
                    rows="4"
                    onChange={handleChange}
                    value={deck.description}
                    placeholder="Brief description of the deck"
                    required={true}
                    >
                </textarea>
            </div>

            <button 
                type="button" 
                onClick={() => history(-1)} 
                className="btn btn-secondary mb-2 mr-2">Cancel
            </button>

            <button 
                type="submit" 
                className="btn btn-primary mb-2">Submit
            </button>

        </form>
    </>
)
}

export default EditDeck