import React, { useContext, useEffect } from "react"
import { GiftListContext } from "./GiftListProvider"
import { Input } from "semantic-ui-react"

export const GiftSearch = () => {
    const { setSearchTerms } = useContext(GiftListContext)

    useEffect(() => {
        setSearchTerms("")
    }, [])
    
    return (
        <>
            <label htmlFor="giftSearch">Search gift lists: </label> 
            <Input type="text"
                className="input--wide"
                id="giftSearch"
                onKeyUp={
                    (keyEvent) => setSearchTerms(keyEvent.target.value)
                }
                placeholder="Search for a gift list... " />
        </>
    )
}