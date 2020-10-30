import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { CelebrationContext } from "./CelebrationProvider"

export const CalendarCard = ({ date }) => {
    const { getCelebrationsByDate } = useContext(CelebrationContext)

    const [dateCelebrations, setDateCelebrations] = useState([])

    useEffect(() => {
        getCelebrationsByDate(date).then(setDateCelebrations)
    }, [])
    
    return (
        <section className="date">
            <h3 className="active_date"><Link to={`/celebrations/list/${date}`}>{new Date(`${date}T07:00:00Z`).toLocaleString("en-US").split(",")[0]}</Link></h3>
            <ul>
                {
                    dateCelebrations?.map(dc => <li key={dc.id}>{dc.name}</li>)
                }
            </ul>
        </section>
    )
}