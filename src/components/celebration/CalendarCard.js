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
            <h3 className="active_date"><Link to={`/celebrations/list/${date}`}>{date}</Link></h3>
            <ul>
                {
                    dateCelebrations?.map(dc => <li key={dc.id}>{dc.name}</li>)
                }
            </ul>
        </section>
    )
}