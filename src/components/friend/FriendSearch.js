import React, { useContext, useEffect } from "react"
import { FriendContext } from "./FriendProvider"
import "./Friend.css"
import { Search } from "semantic-ui-react"

export const FriendSearch = () => {
    const { setSearchTerms } = useContext(FriendContext)

    useEffect(() => {
        setSearchTerms("")
    }, [])
    
    return (
        <div className="search-bar">
            <Search type="text"
                className="input--wide"
                id="friendSearch"
                onKeyUp={
                    (keyEvent) => setSearchTerms(keyEvent.target.value)
                }
                placeholder="Search for a friend... " />
        </div>
    )
}