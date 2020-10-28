import React, { useContext, useEffect, useState } from "react";
import { CelebrationContext } from "./CelebrationProvider";
import { CalendarCard } from "./CalendarCard"
import { Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

const todaysDate = new Date(Date.now() - 18000000).toISOString().split("T")[0]

const handleDate = date => {
    let futureYear = (parseInt(todaysDate.split("-")[0]) + 1).toString()
    date = date.split("-").splice(1)
    date.unshift(futureYear)
    date = date.join("-")
    return date
}

export const CelebrationCalendar = () => {
    const { celebrations, getCelebrationsByUserId, updateCelebration, searchTerms } = useContext(CelebrationContext)
  
    const [filtered, setFiltered] = useState([])
    const history = useHistory()

    useEffect(() => {
        getCelebrationsByUserId(localStorage.getItem("cs_user"))
    }, [])

    useEffect(() => {
        if (searchTerms !== "") {
            // If the search field is not blank, display matching friends
            const subset = celebrations.filter(celebration => {
                return celebration.name.toLowerCase().includes(searchTerms)
            })
            setFiltered(subset)
        } else {
            // If the search field is blank, display all user friends
            setFiltered(celebrations)
        }
    }, [searchTerms, celebrations])
    
    const futureDate = handleDate(todaysDate)

    const dates = [...new Set(filtered.map(celebration => {
        if (celebration.date < todaysDate && celebration.isYearly === true) {
            celebration.date = handleDate(celebration.date)
            celebration.reminderStartDate = handleDate(celebration.reminderStartDate)
            updateCelebration(celebration)
        }
        return celebration.date
    }))]

    return ( 
        <div>
            <h2>Celebrations Calendar</h2>
            <Button type="button" onClick={() => {
                history.push("/celebrations/create")
            }}>Add Celebration</Button>
            <section>
                {
                    dates?.sort().map(date => {
                        if (date >= todaysDate && date < futureDate) {
                            return <CalendarCard key={date} date={date} /> 
                        }
                    })
                }
            </section>
        </div>
    )
}