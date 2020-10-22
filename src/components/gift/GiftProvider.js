import React, { useState, createContext } from "react"

export const GiftContext = createContext()

export const GiftProvider = (props) => {
    const [gifts, setGifts] = useState([])

    const getGifts = () => {
        return fetch("http://localhost:8088/gifts?sort=id&order=desc")
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
        .then(() => fetch("http://localhost:8088/gifts?_sort=id&_order=desc&_limit=1"))
        .then(res => res.json())
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

    const getGiftsByTableId = id => {
        return fetch(`http://localhost:8088/gifts?giftListId=${id}`)
            .then(res => res.json())
    }

    return (
        <GiftContext.Provider value={{
            gifts, getGifts, addGift, removeGift, updateGift, getGiftById, getGiftsByTableId
        }}>
            {props.children}
        </GiftContext.Provider>
    )
}