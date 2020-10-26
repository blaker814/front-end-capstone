import React, { useState, createContext } from "react"

export const BudgetContext = createContext()

export const BudgetProvider = (props) => {
    const [budgets, setBudgets] = useState([])
    const [ searchTerms, setSearchTerms ] = useState("")

    const getBudgets = () => {
        return fetch(`http://localhost:8088/budgets?_expand=celebration&_sort=id&_order=desc`)
            .then(res => res.json())
            .then(setBudgets)
    }

    const addBudget = budget => {
        return fetch("http://localhost:8088/budgets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(budget)
        })
        .then(getBudgets)
    }

    const removeBudget = id => {
        return fetch(`http://localhost:8088/budgets/${id}`, {
            method: "DELETE"
        })
        .then(getBudgets)
    }

    const getBudgetById = id => {
        return fetch(`http://localhost:8088/budgets/${id}?_expand=celebration`)
        .then(res => res.json())
    }

    const updateBudget = budget => {
        return fetch(`http://localhost:8088/budgets/${budget.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(budget)
        })
    }

    return (
        <BudgetContext.Provider value={{
            budgets, getBudgets, addBudget, removeBudget, getBudgetById, updateBudget, searchTerms, setSearchTerms
        }}>
            {props.children}
        </BudgetContext.Provider>
    )
}