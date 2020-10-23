import React from "react"

export const ReminderCard = ({ celebration }) => {
    return (
        <p>{celebration.name} - {new Date(`${celebration.date}T01:00:00`).toLocaleString("en-US").split(",")[0]}</p>
    )
}