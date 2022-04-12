import React from "react"
import {Link} from "react-router-dom"

function FormDeck ({ handleChange, formData, handleSubmit}) {
    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/"><span className="oi oi-home"/> Home</Link></li>
                <li className="breadcrumb-item active" aria-current="page"> Create Deck</li>
                </ol>
            </nav>

            <h1>Create Deck</h1>
            
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name">Name</label>
                    <input 
                        className="form-control"
                        type="text"
                        name="name"
                        id="name" 
                        onChange={handleChange}
                        value={formData.name}
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
                        value={formData.description}
                        placeholder="Brief description of the deck"
                        required={true}
                        >
                    </textarea>
                </div>

                <Link to="/" className="btn btn-secondary mb-2 mr-2">Cancel</Link>
                
                <button type="submit" className="btn btn-primary mb-2">Submit</button>

            </form>
        </>
    )
}

export default FormDeck