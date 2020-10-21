import React, { useContext, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { Button } from "semantic-ui-react"
import { GiftListContext } from "./GiftListProvider"

export const GiftTable = () => {
    const { giftLists, getGiftListsById } = useContext(GiftListContext)

    const history = useHistory()
    const {tableId} = useParams({})

    useEffect(() => {
        getGiftListsById(localStorage.getItem("cs_user"))
    }, [])

    const list = giftLists.find(gl => gl.id === parseInt(tableId))

    return (
        <>
            <Button type="button" onClick={() => {
                history.push("/gifts")
            }}>Back to Gift Lists</Button>
            <h3>Gift Ideas for {list?.giftsFor}</h3>
            <Button type="button" onClick={() => {
                history.push(`/gifts/create/${tableId}`)
            }}>Add Gift</Button>
            <p>{tableId}</p>
            
        </>
    )
}