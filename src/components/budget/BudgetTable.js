import React, { useContext, useEffect, useState } from "react"
import { BudgetContext } from "./BudgetProvider"
import { useParams, useHistory } from "react-router-dom"
import { CelebrationContext } from "../celebration/CelebrationProvider"
import { Button } from "semantic-ui-react"
import { BudgetPie } from "./BudgetPie"

export const BudgetTable = () => {
    const { getBudgetById } = useContext(BudgetContext)
    const { getCelebrationById } = useContext(CelebrationContext)

    const [budget, setBudget] = useState({})
    const [celebration, setCelebration] = useState({})
    const {budgetId} = useParams()
    const history = useHistory()

    useEffect(() => {
        getBudgetById(budgetId)
        .then(setBudget)
    }, [])

    useEffect(() => {
        if(budget.id) {
            getCelebrationById(budget.celebrationId).then(setCelebration)
        }
    }, [budget])

    return (
        <>
            <Button type="button" onClick={() => {
                history.push("/budgets")
            }}>Back to Budgets</Button>
            <section>
                <h2>{budget.name}</h2>
                <p>{`Total budget: $${budget.total}`}</p>
                <p>{`Total spent: $${budget.spent}`}</p>
                <h3>Purchases</h3>
                <ul>
                {
                    celebration.gifts?.map(gift => {
                        if(gift.purchased === true) {
                            return <li key={gift.id}>{`${gift.gift} - $${gift.price}`}</li>
                        }
                    })
                }
                </ul>
                {
                    <BudgetPie key={budget.id} total={budget.total} spent={budget.spent} />
                }
                <Button type="button" onClick={() => {
                    history.push(`/budgets/edit/${budget.id}`)
                }}>Edit Budget</Button>
            </section>
        </>
    )
}