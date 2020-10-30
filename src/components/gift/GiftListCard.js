import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { Button } from "semantic-ui-react"
import { GiftListContext } from "./GiftListProvider"

export const GiftListCard = ({ giftList }) => {
    const { removeGiftList } = useContext(GiftListContext)

    return (
        <section className="gift-card">
            <h3><Link to={`/gifts/table/${giftList.id}`}>{giftList.giftsFor}</Link></h3>
            <Button type="button" onClick={() => {
                removeGiftList(giftList.id)
            }}>Delete</Button>
        </section>
    )
}