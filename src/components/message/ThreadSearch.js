import React, { useContext, useEffect } from "react"
import { FriendContext } from "../friend/FriendProvider"
import { Input } from "semantic-ui-react"

export const ThreadSearch = () => {
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
                placeholder="Search for an friend... " />
        </>
    )
}