import React, { useContext, useEffect } from "react"
import { BudgetContext } from "../budget/BudgetProvider"
import { Search } from "semantic-ui-react"

export const BudgetSearch = () => {
    const { setSearchTerms } = useContext(BudgetContext)

    useEffect(() => {
        setSearchTerms("")
    }, [])
    
    return (
        <div className="search-bar">
            <Search type="text"
                className="input--wide"
                id="budgetSearch"
                onKeyUp={
                    (keyEvent) => setSearchTerms(keyEvent.target.value)
                }
                placeholder="Search for a budget... " />
        </div>
    )
}