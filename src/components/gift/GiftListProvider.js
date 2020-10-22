import React, { useState, createContext } from "react"

export const GiftListContext = createContext()

export const GiftListProvider = (props) => {
    const [giftLists, setGiftLists] = useState([])
    const [ searchTerms, setSearchTerms ] = useState("")

    // const getGiftLists = () => {
    //     return fetch("http://localhost:8088/giftLists")
    //         .then(res => res.json())
    // }

    const getGiftListsById = id => {
        return fetch(`http://localhost:8088/giftLists?userId=${id}&_embed=links`)
            .then(res => res.json())
            .then(setGiftLists)
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
        .then(getGiftListsById)
    }

    const removeGiftList = id => {
        return fetch(`http://localhost:8088/giftLists/${id}`, {
            method: "DELETE"
        })
        .then(getGiftListsById)
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
            giftLists, getGiftListsById, addGiftList, removeGiftList, updateGiftList, getGiftListById, searchTerms, setSearchTerms
        }}>
            {props.children}
        </GiftListContext.Provider>
    )
}