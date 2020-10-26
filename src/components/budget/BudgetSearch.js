import React, { useContext, useEffect } from "react"
import { BudgetContext } from "../budget/BudgetProvider"
import { Input } from "semantic-ui-react"

export const BudgetSearch = () => {
    const { setSearchTerms } = useContext(BudgetContext)

    useEffect(() => {
        setSearchTerms("")
    }, [])
    
    return (
        <>
            <label htmlFor="budgetSearch">Search budgets: </label> 
            <Input type="text"
                className="input--wide"
                id="budgetSearch"
                onKeyUp={
                    (keyEvent) => setSearchTerms(keyEvent.target.value)
                }
                placeholder="Search for a budget... " />
        </>
    )
}