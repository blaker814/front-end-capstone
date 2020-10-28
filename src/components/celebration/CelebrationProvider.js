import React, { useState, createContext } from "react"

export const CelebrationContext = createContext()

export const CelebrationProvider = (props) => {
    const [celebrations, setCelebrations] = useState([])
    const [ searchTerms, setSearchTerms ] = useState("")
    const userId = localStorage.getItem("cs_user")

    const getCelebrationsByUserId = id => {
        return fetch(`http://localhost:8088/celebrations?userId=${id}`)
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
        .then(() => getCelebrationsByUserId(userId))
    }

    const removeCelebration = id => {
        return fetch(`http://localhost:8088/celebrations/${id}`, {
            method: "DELETE"
        })
        .then(() => getCelebrationsByUserId(userId))
    }

    const getCelebrationsByDate = date => {
        return fetch(`http://localhost:8088/celebrations?date=${date}`)
            .then(res => res.json())
    }

    const getCelebrationById = id => {
        return fetch(`http://localhost:8088/celebrations/${id}?_embed=gifts`)
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
            celebrations, getCelebrationsByUserId, addCelebration, removeCelebration, getCelebrationsByDate, getCelebrationById, updateCelebration, searchTerms, setSearchTerms
        }}>
            {props.children}
        </CelebrationContext.Provider>
    )
}