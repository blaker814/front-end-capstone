import React, { useContext, useEffect, useState } from "react"
import { Table } from "semantic-ui-react"
import { CelebrationContext } from "../celebration/CelebrationProvider"
import { LinkContext } from "./LinkProvider"

export const GiftCard = ({ gift }) => {
    const { getCelebrationById } = useContext(CelebrationContext)
    const { getLinksByGiftId } = useContext(LinkContext)

    const [celebration, setCelebration] = useState({})
    const [links, setLinks] = useState([{}])

    useEffect(() => {
        getLinksByGiftId(gift.id)
        .then(setLinks)
        .then(() => {
            if (gift.celebrationId !== null) {
                getCelebrationById(gift.celebrationId).then(setCelebration)
            }
        })
    }, [])

    return (
        <Table.Row>      
            <Table.Cell>{gift.gift}</Table.Cell>
            <Table.Cell>${gift.price}</Table.Cell>
            <Table.Cell>
                {
                    (links === []) ? "N/A" : links.map(link => <div key={link.id}><a href={link.link}>{link.link}</a></div>)
                }
            </Table.Cell>
            <Table.Cell>{celebration.name}</Table.Cell>
            <Table.Cell>{gift.purchased ? "Yes" : "No"}</Table.Cell>
        </Table.Row>
    )
}