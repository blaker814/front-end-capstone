import React, { useState, createContext } from "react"

export const LinkContext = createContext()

export const LinkProvider = (props) => {
    const [links, setLinks] = useState([])

    const getLinks = () => {
        return fetch("http://localhost:8088/links")
            .then(res => res.json())
            .then(setLinks)
    }

    const addLink = link => {
        return fetch("http://localhost:8088/links", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(link)
        })
        .then(getLinks)
    }

    const removeLink = id => {
        return fetch(`http://localhost:8088/links/${id}`, {
            method: "DELETE"
        })
        .then(getLinks)
    }

    const updateLink = link => {
        return fetch(`http://localhost:8088/Links/${link.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(link)
        })
    }

    const getLinksByGiftId = id => {
        return fetch(`http://localhost:8088/links?giftId=${id}`)
            .then(res => res.json()) 
    }

    return (
        <LinkContext.Provider value={{
            links, getLinks, addLink, removeLink, updateLink, getLinksByGiftId
        }}>
            {props.children}
        </LinkContext.Provider>
    )
}