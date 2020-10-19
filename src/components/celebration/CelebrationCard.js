import React, { useContext } from "react"
import { Button } from "semantic-ui-react"
import { CelebrationContext } from "./CelebrationProvider"
import { useHistory } from "react-router-dom"

export const CelebrationCard = ({ celebration }) => {
    const { removeCelebration } = useContext(CelebrationContext)

    const history = useHistory()

    return (
        <section className="celebration">
            <h3 className="active_date">{celebration.name}</h3>
            <p>{celebration.about}</p>
            <Button type="button" onClick={() => {
                history.push(`/celebrations/edit/${celebration.id}`)
            }}>Edit</Button>
            <Button type="button" onClick={() => {
                removeCelebration(celebration.id)
            }}>Delete</Button>
        </section>
    )
}