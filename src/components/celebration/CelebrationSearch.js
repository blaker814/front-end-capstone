import React, { useContext, useEffect } from "react"
import { CelebrationContext } from "../celebration/CelebrationProvider"
import { Input } from "semantic-ui-react"

export const CelebrationSearch = () => {
    const { setSearchTerms } = useContext(CelebrationContext)

    useEffect(() => {
        setSearchTerms("")
    }, [])
    
    return (
        <>
            <label htmlFor="celebrationSearch">Search celebrations: </label> 
            <Input type="text"
                className="input--wide"
                id="celebrationSearch"
                onKeyUp={
                    (keyEvent) => setSearchTerms(keyEvent.target.value)
                }
                placeholder="Search for a celebration " />
        </>
    )
}