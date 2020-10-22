import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { Button, Table } from "semantic-ui-react"
import { GiftListContext } from "./GiftListProvider"
import { GiftContext } from "./GiftProvider"
import { GiftCard } from "./GiftCard"

export const GiftTable = () => {
    const { getGiftListById } = useContext(GiftListContext)
    const { getGiftsByTableId } = useContext(GiftContext)

    const history = useHistory()
    const {tableId} = useParams({})
    const [list, setList] = useState({})
    const [gifts, setGifts] = useState([{}])

    useEffect(() => {
        getGiftListById(tableId)
        .then(setList)
        .then(() => getGiftsByTableId(tableId))
        .then(res => setGifts(res))
    }, [])

    const header = ["gift", "price", "links", "celebration", "purchased?"]

    return (
        <>
            <Button type="button" onClick={() => {
                history.push("/gifts")
            }}>Back to Gift Lists</Button>
            <h3>Gift Ideas for {list?.giftsFor}</h3>
            <Button type="button" onClick={() => {
                history.push(`/gifts/create/${tableId}`)
            }}>Add Gift</Button>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        {
                            header?.map((item, i) => {
                                return <Table.HeaderCell key={`item--${i}`} >{item.toUpperCase()}</Table.HeaderCell>   
                            })
                        }
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        gifts?.map(gift => {
                            return <GiftCard key={gift.id} gift={gift} />
                        })
                    }
                </Table.Body>
            </Table>   
        </>
    )
}