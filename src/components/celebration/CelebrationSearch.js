import React, { useContext, useEffect } from "react"
import { CelebrationContext } from "../celebration/CelebrationProvider"
import { Search } from "semantic-ui-react"

export const CelebrationSearch = () => {
    const { setSearchTerms } = useContext(CelebrationContext)

    useEffect(() => {
        setSearchTerms("")
    }, [])
    
    return (
        <div className="search-bar">
            <Search hide results type="text"
                className="input--wide"
                id="celebrationSearch"
                onKeyUp={
                    (keyEvent) => setSearchTerms(keyEvent.target.value)
                }
                placeholder="Search for a celebration " />
        </div>
    )
}