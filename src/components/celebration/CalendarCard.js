import React from "react"
import { Link } from "react-router-dom"

export const CalendarCard = ({ date }) => (
    <section className="date">
        <h3 className="active_date"><Link to={`/celebrations/list/${date}`}>{date}</Link></h3>
    </section>
)