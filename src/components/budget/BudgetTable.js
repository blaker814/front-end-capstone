import React, { useContext, useEffect, useState } from "react"
import { BudgetContext } from "./BudgetProvider"
import { useParams, useHistory } from "react-router-dom"
import { CelebrationContext } from "../celebration/CelebrationProvider"
import { Button } from "semantic-ui-react"
import { BudgetPie } from "./BudgetPie"
import { GiftContext } from "../gift/GiftProvider"
import { BudgetBar } from "./BudgetBar"

export const BudgetTable = () => {
    const { getBudgetById } = useContext(BudgetContext)
    const { getCelebrationById } = useContext(CelebrationContext)
    const { getGiftsByCelebrationId } = useContext(GiftContext)

    const [budget, setBudget] = useState({})
    const [celebration, setCelebration] = useState({})
    const [celebrationGifts, setCelebrationGifts] = useState([])
    const [purchasedFor, setPurchasedFor] = useState([])
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

    useEffect(() => {
        if (celebration.id) {
            getGiftsByCelebrationId(celebration.id).then(setCelebrationGifts)
        }
    }, [celebration])

    useEffect(() => {
        if(celebrationGifts.length > 0) {
            const forSomeone = [...new Set(celebrationGifts.map(cg => {
                if (cg.giftList.forSelf === false) {
                    return cg.giftList.giftsFor
                }
            }))]
            const shoppedFor = forSomeone.filter(name => name !== undefined)
            setPurchasedFor(shoppedFor)
        }
    }, [celebrationGifts])

    return (
        <>
            <Button type="button" onClick={() => {
                history.push("/budgets")
            }}>Back to Budgets</Button>
            <section>
                <h2 style={{textAlign: "center"}}>{budget.name}</h2>
                <div className="budget-amounts">
                    <p style={{marginRight: "1em"}}>{`Total budget: $${budget.total}`}</p>
                    <p>{`Total spent: $${budget.spent}`}</p>
                </div>
                <div className="budget-tables">
                    {
                        budget.total - budget.spent < 0 ? 
                            <h4>You are over budget by ${budget.spent-budget.total}!</h4>
                            :
                            <BudgetPie key={budget.id} total={budget.total} spent={budget.spent} />
                    }
                    {
                        purchasedFor.length > 0 ? <BudgetBar key={"barGraph"} names={purchasedFor} gifts={celebrationGifts} /> : undefined
                    }
                </div>
                <Button type="button" onClick={() => {
                    history.push(`/budgets/edit/${budget.id}`)
                }}>Edit Budget</Button>
            </section>
        </>
    )
}