import React, { useContext, useEffect } from "react"
import { FriendContext } from "./FriendProvider"
import "./Friend.css"
import { Input } from "semantic-ui-react"

export const FriendSearch = () => {
    const { setSearchTerms } = useContext(FriendContext)

    useEffect(() => {
        setSearchTerms("")
    }, [])
    
    return (
        <>
            <label htmlFor="friendSearch">Search friends: </label> 
            <Input type="text"
                className="input--wide"
                id="friendSearch"
                onKeyUp={
                    (keyEvent) => setSearchTerms(keyEvent.target.value)
                }
                placeholder="Search for a friend... " />
        </>
    )
}