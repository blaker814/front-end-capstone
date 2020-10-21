import React, { useState, createContext } from "react"

export const GiftContext = createContext()

export const GiftProvider = (props) => {
    const [gifts, setGifts] = useState([])

    const getGifts = () => {
        return fetch("http://localhost:8088/gifts")
            .then(res => res.json())
            .then(setGifts)
    }

    const addGift = gift => {
        return fetch("http://localhost:8088/gifts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(gift)
        })
        .then(getGifts)
    }

    const removeGift = id => {
        return fetch(`http://localhost:8088/gifts/${id}`, {
            method: "DELETE"
        })
        .then(getGifts)
    }

    const updateGift = gift => {
        return fetch(`http://localhost:8088/gifts/${gift.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(gift)
        })
    }

    const getGiftById = id => {
        return fetch(`http://localhost:8088/gifts/${id}`)
            .then(res => res.json())
    }

    return (
        <GiftContext.Provider value={{
            gifts, getGifts, addGift, removeGift, updateGift, getGiftById
        }}>
            {props.children}
        </GiftContext.Provider>
    )
}