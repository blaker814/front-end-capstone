import React, { useContext, useEffect, useState } from "react"
import { CelebrationContext } from "./CelebrationProvider"
import { useParams, useHistory } from "react-router-dom"
import { CelebrationCard } from "./CelebrationCard"
import "./Celebration.css"
import { Button } from "semantic-ui-react"

export const CelebrationList = () => {
    const { getCelebrationsByDate } = useContext(CelebrationContext)
    const [celebrations, setCelebrations] = useState([])

    const {date} = useParams()
    const history= useHistory()

    useEffect(() => {
        getCelebrationsByDate(date)
        .then(setCelebrations)
    }, [])

    return (
        <div>
            <Button type="button" onClick={() => {
                history.push(`/celebrations/create/${date}`)
            }}>Add Celebration</Button>
            <Button type="button" onClick={() => {
                history.push("/celebrations")
            }}>Back to Calendar</Button>
            <section className="celebrations">
                {
                    celebrations.map(celebration => {
                        return <CelebrationCard key={celebration.id} celebration={celebration} />
                    })
                }
            </section>
        </div>
    )
}