import React, {useState} from 'react'
import FormDeck from "./FormDeck"
import {createDeck} from "../utils/api"
import {useNavigate} from "react-router-dom"

function CreateDeck () {

const initialFormState = {
    name: "",
    description: ""
}

const [formData, setFormData] = useState({initialFormState})

const history = useNavigate()


const handleChange = ({target}) => {
    setFormData({
        ...formData,
        [target.name]: target.value
    })
}

const handleSubmit = async (e) => {
    e.preventDefault()
    const {id} = await createDeck(formData)
    history(`/decks/${id}`)
}

    return  (
        <FormDeck 
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            formData={formData}
            />
    )
}

export default CreateDeck