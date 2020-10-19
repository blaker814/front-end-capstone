import React, { useContext, useEffect, useState } from "react"
import { CelebrationContext } from "./CelebrationProvider"
import { useParams, useHistory } from "react-router-dom"
import { CelebrationCard } from "./CelebrationCard"
import "./Celebration.css"
import { Button } from "semantic-ui-react"

export const CelebrationList = () => {
    const { celebrations, getCelebrationsByDate } = useContext(CelebrationContext)
    const [dateCelebrations, setDateCelebrations] = useState([])

    const {date} = useParams()
    const history= useHistory()

    useEffect(() => {
        getCelebrationsByDate(date)
        .then(setDateCelebrations)
    }, [celebrations])

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
                    dateCelebrations?.map(celebration => {
                        return <CelebrationCard key={celebration.id} celebration={celebration} />
                    })
                }
            </section>
        </div>
    )
}