import React, { useContext, useEffect, useState } from "react"
import { BudgetContext } from "./BudgetProvider"
import { useParams, useHistory } from "react-router-dom"
import { CelebrationContext } from "../celebration/CelebrationProvider"
import { Button } from "semantic-ui-react"
import { BudgetPie } from "./BudgetPie"
import { GiftContext } from "../gift/GiftProvider"
import { BudgetBar } from "./BudgetBar"

export const BudgetTable = () => {
    const { getBudgetById, updateBudget } = useContext(BudgetContext)
    const { getCelebrationById } = useContext(CelebrationContext)
    const { getGiftsByCelebrationId } = useContext(GiftContext)

    const [budget, setBudget] = useState({})
    const [celebration, setCelebration] = useState({})
    const [celebrationGifts, setCelebrationGifts] = useState([])
    const [purchasedFor, setPurchasedFor] = useState([])
    const [amountSpent, setAmountSpent] = useState(null)
    const {budgetId} = useParams()
    const history = useHistory()

    useEffect(() => {
        getBudgetById(budgetId).then(setBudget)
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
            const boughtGifts = celebrationGifts.map(cg => {
                if (cg.giftList.forSelf === false) {
                    return cg.price
                } else {
                    return 0
                }
            })
            setAmountSpent(boughtGifts.length > 0 ? boughtGifts.reduce((a,b) => a + b) : 0)
            
        }
    }, [celebrationGifts])

    useEffect(() => {
        if (amountSpent !== null) {
            budget.spent = amountSpent
            setBudget(budget)
            updateBudget({
                id: budget.id,
                name: budget.name,
                total: budget.total,
                spent: budget.spent,
                celebrationId: budget.celebrationId
            }) 
        }
    }, [amountSpent])

    return (
        <>
            <div className="budget-buttons">
                <Button type="button" onClick={() => {
                    history.push("/budgets")
                }}>Back to Budgets</Button>
                <Button type="button" onClick={() => {
                        history.push(`/budgets/edit/${budget.id}`)
                }}>Edit Budget</Button>
            </div>
            <section>
                <h2 style={{textAlign: "center", marginBottom: "2em"}}>{budget.name}</h2>
                <div className="budget-amounts">
                    <p style={{marginBottom: "10em", marginRight: "2em"}}>{`Total budget: $${budget.total}`}</p>
                    <p>{`Remaining budget: $${budget.total - amountSpent}`}</p>
                </div>
                <div className="budget-tables">
                    {
                        amountSpent === null ? undefined : budget.total - amountSpent < 0 ? 
                            <h4>You are over budget by ${amountSpent-budget.total}!</h4>
                            :
                            <BudgetPie key={budget.id} total={budget.total} spent={amountSpent} />
                    }
                    {
                        purchasedFor.length > 0 ? <BudgetBar key={"barGraph"} names={purchasedFor} gifts={celebrationGifts} /> : undefined
                    }
                </div>
            </section>
        </>
    )
}