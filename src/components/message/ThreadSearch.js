import React, { useContext, useEffect } from "react"
import { FriendContext } from "../friend/FriendProvider"
import { Search } from "semantic-ui-react"

export const ThreadSearch = () => {
    const { setSearchTerms } = useContext(FriendContext)

    useEffect(() => {
        setSearchTerms("")
    }, [])
    
    return (
        <div className="search-bar">
            <Search hide results type="text"
                className="input--wide"
                id="friendSearch"
                onKeyUp={
                    (keyEvent) => setSearchTerms(keyEvent.target.value)
                }
                placeholder="Search for a thread... " />
        </div>
    )
}