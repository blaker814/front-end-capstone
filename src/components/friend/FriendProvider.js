import React, { useState, createContext } from "react"

export const FriendContext = createContext()

export const FriendProvider = (props) => {
    const [ friends, setFriends ] = useState([])
    const [ searchTerms, setSearchTerms ] = useState("")

    const getFriends = () => {
        return fetch("http://localhost:8088/friends?_expand=user")
            .then(res => res.json())
            .then(setFriends)
    }

    const getFriendsById = id => {
        return fetch(`http://localhost:8088/friends?activeUserId=${id}&_expand=user`)
            .then(res => res.json())
    }

    const addFriend = friend => {
        return fetch("http://localhost:8088/friends", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(friend)
        })
        .then(getFriends)
    }

    const removeFriend = id => {
        return fetch(`http://localhost:8088/friends/${id}`, {
            method: "DELETE"
        })
    }

    const updateFriend = friend => {
        return fetch(`http://localhost:8088/friends/${friend.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(friend)
        })
    }

    return (
        <FriendContext.Provider value={{
            friends, getFriends, addFriend, removeFriend, getFriendsById, searchTerms, setSearchTerms, updateFriend
        }}>
            {props.children}
        </FriendContext.Provider>
    )
}