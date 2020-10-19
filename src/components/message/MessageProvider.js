import React, { useState, createContext } from "react"

export const ThreadContext = createContext()

export const MessageProvider = (props) => {
    const [threads, setThreads] = useState([])

    const getMessageThreads = () => {
        return fetch("http://localhost:8088/threads?_embed=messages")
            .then(res => res.json())
            .then(setThreads)
    }

    const addMessage = message => {
        return fetch("http://localhost:8088/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(message)
        })
        .then(getMessageThreads)
    }

    const removeMessage = id => {
        return fetch(`http://localhost:8088/messages/${id}`, {
            method: "DELETE"
        })
        .then(getMessageThreads)
    }

    const removeThread = id => {
        return fetch(`http://localhost:8088/threads/${id}`, {
            method: "DELETE"
        })
        .then(getMessageThreads)
    }

    return (
        <ThreadContext.Provider value={{
            threads, getMessageThreads, addMessage, removeMessage, removeThread
        }}>
            {props.children}
        </ThreadContext.Provider>
    )
}