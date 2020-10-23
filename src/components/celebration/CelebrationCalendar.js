import React, { useContext, useEffect } from "react";
import { CelebrationContext } from "./CelebrationProvider";
import { CalendarCard } from "./CalendarCard"
import { Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

export const CelebrationCalendar = () => {
    const { celebrations, getCelebrationsByUserId } = useContext(CelebrationContext)

    const history = useHistory()

    useEffect(() => {
        getCelebrationsByUserId(localStorage.getItem("cs_user"))
    }, [])

    const dates = [...new Set(celebrations.map(celebration => celebration.date))]

    return ( 
        <div>
            <Button type="button" onClick={() => {
                history.push("/celebrations/create")
            }}>Add Celebration</Button>
            <section>
                {
                    dates.sort().map(date => {
                        return <CalendarCard key={date} date={date} /> 
                    })
                }
            </section>
        </div>
    )
}