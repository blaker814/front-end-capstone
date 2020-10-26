import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { Button } from "semantic-ui-react"
import { BudgetContext } from "./BudgetProvider"

export const BudgetCard = ({ budget }) => {
    const { removeBudget } = useContext(BudgetContext)

    return (
        <div className="budget">
            <h3><Link to={`/budgets/table/${budget.id}`}>{budget.name}</Link></h3>
            <p>{budget.celebration.name}</p>
            <Button type="button" onClick={() => {
                removeBudget(budget.id)
            }}>Delete</Button>
        </div>
    )
}