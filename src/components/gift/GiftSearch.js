import React, { useContext, useEffect } from "react"
import { GiftListContext } from "./GiftListProvider"
import { Search } from "semantic-ui-react"

export const GiftSearch = () => {
    const { setSearchTerms } = useContext(GiftListContext)

    useEffect(() => {
        setSearchTerms("")
    }, [])
    
    return (
        <div className="search-bar">
            <Search empty hide type="text"
                className="input--wide"
                id="giftSearch"
                onKeyUp={
                    (keyEvent) => setSearchTerms(keyEvent.target.value)
                }
                placeholder="Search for a gift list... " />
        </div>
    )
}