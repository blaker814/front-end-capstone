import React, { useContext, useEffect } from "react";
import { CelebrationContext } from "../celebration/CelebrationProvider";
import { ReminderCard } from "./RemindersCard";

export const HomeReminders = () => {
    const { celebrations, getCelebrationsByUserId } = useContext(CelebrationContext)
    const userId = parseInt(localStorage.getItem("cs_user"))

    useEffect(() => {
        getCelebrationsByUserId(userId)
    }, [])

    const reminders = celebrations?.filter(celebration => {
        if (celebration.reminderStartDate <= new Date(Date.now() - 18000000).toISOString().split("T")[0] && celebration.date >= new Date(Date.now() - 18000000).toISOString().split("T")[0]) {
            return true
        }
    })
 
    return (
        <>
            <section className="reminders">
                <h3>Celebration Reminders</h3>
                <div>
                {
                    reminders?.map(celebration => {
                        return <ReminderCard key={celebration.id} celebration={celebration} />
                    })
                }
                </div>
            </section>
        </>
    )
}