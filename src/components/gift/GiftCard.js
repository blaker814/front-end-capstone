import React, { useContext, useEffect, useState } from "react"
import { Table, Button } from "semantic-ui-react"
import { CelebrationContext } from "../celebration/CelebrationProvider"
import { LinkContext } from "./LinkProvider"
import { useHistory, useParams } from "react-router-dom"
import { GiftContext } from "./GiftProvider"

export const GiftCard = ({ gift }) => {
    const { getCelebrationById } = useContext(CelebrationContext)
    const { getLinksByGiftId, getLinks, links, removeLink } = useContext(LinkContext)
    const { removeGift } = useContext(GiftContext)

    const [celebration, setCelebration] = useState({})
    const [giftLinks, setGiftLinks] = useState([])
    const history = useHistory()
    const {tableId} = useParams()

    useEffect(() => {
        getLinksByGiftId(gift.id)
        .then(setGiftLinks)
        .then(() => {
            if (gift.celebrationId) {
                getCelebrationById(gift.celebrationId).then(setCelebration)
            }
        })
    }, [])

    return (
        <Table.Row>   
            <Table.Cell>
                <Button type="button" onClick={() => {
                    history.push(`/gifts/edit/${tableId}/${gift.id}`)
                }}>Edit</Button>
                <Button onClick={() => {
                    getLinks()
                    .then(() => {
                        links.forEach(link => {
                            if (link.giftId === gift.id) {
                                removeLink(link.id)
                            }
                        })
                        removeGift(gift.id)
                    })
                }}>Delete</Button>
            </Table.Cell>   
            <Table.Cell>{gift.gift}</Table.Cell>
            <Table.Cell>${gift.price}</Table.Cell>
            <Table.Cell>
                {
                    giftLinks.length > 0 ? giftLinks.map(gl=> <div key={gl.id}><a href={gl.link}>{gl.link}</a></div>) : "None"
                }
            </Table.Cell>
            <Table.Cell>{gift.celebrationId ? celebration.name : "Any"}</Table.Cell>
            <Table.Cell>{gift.purchased ? "Yes" : "No"}</Table.Cell>
        </Table.Row>
    )
}