import React, { useState, createContext } from "react"

export const CelebrationContext = createContext()

export const CelebrationProvider = (props) => {
    const [celebrations, setCelebrations] = useState([])

    const getCelebrations = () => {
        return fetch("http://localhost:8088/celebrations")
            .then(res => res.json())
            .then(setCelebrations)
    }

    const addCelebration = celebration => {
        return fetch("http://localhost:8088/celebrations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(celebration)
        })
        .then(getCelebrations)
    }

    const removeCelebration = id => {
        return fetch(`http://localhost:8088/celebrations/${id}`, {
            method: "DELETE"
        })
        .then(getCelebrationsByDate)
    }

    const getCelebrationsByDate = date => {
        return fetch(`http://localhost:8088/celebrations?date=${date}`)
            .then(res => res.json())
    }

    const getCelebrationById = id => {
        return fetch(`http://localhost:8088/celebrations/${id}`)
        .then(res => res.json())
    }

    const updateCelebration = celebration => {
        return fetch(`http://localhost:8088/celebrations/${celebration.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(celebration)
        })
    }

    return (
        <CelebrationContext.Provider value={{
            celebrations, getCelebrations, addCelebration, removeCelebration, getCelebrationsByDate, getCelebrationById, updateCelebration
        }}>
            {props.children}
        </CelebrationContext.Provider>
    )
}