import React, { useState, createContext } from "react"

export const GiftListContext = createContext()

export const GiftListProvider = (props) => {
    const [giftLists, setGiftLists] = useState([])
    const [ searchTerms, setSearchTerms ] = useState("")
    const userId = parseInt(localStorage.getItem("cs_user"))

    const getGiftListsById = id => {
        return fetch(`http://localhost:8088/giftLists?userId=${id}&forSelf=false&_embed=links`)
            .then(res => res.json())
            .then(setGiftLists)
    }

    const getUsersGiftList = id => {
        return fetch(`http://localhost:8088/giftLists?userId=${id}&forSelf=true&_embed=links`)
            .then(res => res.json())
    }

    const getGiftListById = id => {
        return fetch(`http://localhost:8088/giftLists/${id}`)
            .then(res => res.json())
    }

    const addGiftList = giftList => {
        return fetch("http://localhost:8088/giftLists", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(giftList)
        })
        .then(() => getGiftListsById(userId))
    }

    const removeGiftList = id => {
        return fetch(`http://localhost:8088/giftLists/${id}`, {
            method: "DELETE"
        })
        .then(() => getGiftListsById(userId))
    }

    const updateGiftList = giftList => {
        return fetch(`http://localhost:8088/giftLists/${giftList.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(giftList)
        })
    }

    return (
        <GiftListContext.Provider value={{
            giftLists, getGiftListsById, getUsersGiftList, addGiftList, removeGiftList, updateGiftList, getGiftListById,searchTerms, setSearchTerms
        }}>
            {props.children}
        </GiftListContext.Provider>
    )
}