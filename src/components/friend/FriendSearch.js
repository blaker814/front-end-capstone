import React, { useContext, useEffect } from "react"
import { FriendContext } from "./FriendProvider"
import "./Friend.css"

export const FriendSearch = () => {
    const { setSearchTerms } = useContext(FriendContext)

    useEffect(() => {
        setSearchTerms("")
    }, [])
    
    return (
        <>
            <label htmlFor="friendSearch">Search friends: </label> 
            <input type="text"
                className="input--wide"
                id="friendSearch"
                onKeyUp={
                    (keyEvent) => setSearchTerms(keyEvent.target.value)
                }
                placeholder="Search for an friend... " />
        </>
    )
}