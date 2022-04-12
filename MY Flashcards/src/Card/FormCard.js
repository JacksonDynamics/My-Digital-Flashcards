import React, {useEffect, useState} from "react"
import {Link, useNavigate, useParams} from "react-router-dom"
import {readDeck} from "../utils/api"

function FormCard ({ handleDone, formData, handleSubmit}) {
    const history = useNavigate()
    const {deckId} = useParams()
   
    const [deck, setDeck] = useState({})

    useEffect(() => {
        readDeck(deckId)
        .then(setDeck)
    }, [deckId])
 
    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/"><span className="oi oi-home"/>Home</Link></li>
                <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                <li className="breadcrumb-item active" aria-current="page"> Add Card</li>
                </ol>
            </nav>

            <h3>Add Card</h3>
            
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="front">Front</label>
                    <textarea 
                        className="form-control"
                        id="front" 
                        name="front" 
                        rows="2"
                        onChange={handleDone}
                        value={formData.front}
                        placeholder="Front side of card"
                        required={true}
                        >
                    </textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="back">Back</label>
                    <textarea 
                        className="form-control"
                        id="back" 
                        name="back" 
                        rows="2"
                        onChange={handleDone}
                        value={formData.back}
                        placeholder="Back side of card"
                        required={true}
                        >
                    </textarea>
                </div>
                <button 
                    type="button" 
                    onClick={() => history(-1)} 
                    className="btn btn-secondary mb-2 mr-2">Done
                </button>
                
                <button type="submit" className="btn btn-primary mb-2">Save</button>

            </form>
        </>
    )
}

export default FormCard