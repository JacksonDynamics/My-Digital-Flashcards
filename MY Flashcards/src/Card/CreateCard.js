import React, {useState} from 'react'
import FormCard from "./FormCard"
import {createCard} from "../utils/api"
import {useParams, useNavigate} from "react-router-dom"

function CreateCard () {

const history = useNavigate()

const initialFormState = {
    Front: "",
    Back: ""
}

const [formData, setFormData] = useState({initialFormState})

const {deckId} = useParams()


const handleDone = ({target}) => {
    setFormData({
        ...formData,
        [target.name]: target.value
    })
}

const handleSubmit = async (e) => {
    e.preventDefault()
    await createCard(deckId, formData)
    setFormData({initialFormState})
    history(-0)
}

    return  (
        <FormCard
            handleSubmit={handleSubmit}
            handleDone={handleDone}
            formData={formData}
            />
    )
}

export default CreateCard