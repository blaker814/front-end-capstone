import React, { useContext, useEffect, useState } from "react"
import { BudgetContext } from "./BudgetProvider"
import { BudgetCard } from "./BudgetCard"
import { Button } from "semantic-ui-react"
import { useHistory } from "react-router-dom"
import "./Budget.css"
import { CelebrationContext } from "../celebration/CelebrationProvider"

export const BudgetList = () => {
    const { getBudgets, budgets, searchTerms } = useContext(BudgetContext)
    const { getCelebrationsByUserId, celebrations } = useContext(CelebrationContext)
    const history = useHistory()

    const [filtered, setFiltered] = useState([])

    useEffect(() => {
        getCelebrationsByUserId(localStorage.getItem("cs_user"))
        .then(getBudgets)
    }, [])

    useEffect(() => {
        if (searchTerms !== "") {
            // If the search field is not blank, display matching friends
            const subset = userBudgets.filter(budget => {
                return budget.name.toLowerCase().includes(searchTerms) || budget.celebration.name.toLowerCase().includes(searchTerms)
            })
            setFiltered(subset)
        } else {
            // If the search field is blank, display all user friends
            setFiltered(userBudgets)
        }
    }, [searchTerms, budgets])

    const userBudgets = budgets?.filter(budget => {
        return celebrations.find(celebration => celebration.id === budget.celebrationId)
    })

    return (
        <section>
            <h2>Budgets</h2>
            <Button type="button" onClick={() => {
                return history.push("/budgets/create")
            }}>Add Budget</Button>
            <div className="budgets">
                {
                    filtered.map(budget => {
                        return <BudgetCard key={budget.id} budget={budget} />
                    })
                }
            </div>
        </section>
    )
}