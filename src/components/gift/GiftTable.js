import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { Button, Table } from "semantic-ui-react"
import { GiftListContext } from "./GiftListProvider"
import { GiftContext } from "./GiftProvider"
import { GiftCard } from "./GiftCard"

export const GiftTable = () => {
    const { getGiftListById, getUsersGiftList } = useContext(GiftListContext)
    const { gifts, getGiftsByTableId } = useContext(GiftContext)

    const history = useHistory()
    const params = useParams({})
    const [list, setList] = useState({})
    const [tableGifts, setTableGifts] = useState([])

    useEffect(() => {
        if (params.tableId) {
            getGiftListById(params.tableId)
            .then(setList)
            .then(() => getGiftsByTableId(params.tableId))
            .then(res => setTableGifts(res))
        } else {
            getUsersGiftList(params.friendId).then(res => setList(res[0]))
        }
    }, [gifts])

    useEffect(() => {
        if (params.friendId && list.id) {
            getGiftsByTableId(list.id).then(setTableGifts)
        }
    }, [list])

    const header = ["", "gift", "price", "links", "celebration", "purchased?"]

    return (
        <>
            {params.tableId ? 
                <>
                    <Button type="button" onClick={() => {
                        history.push("/gifts")
                    }}>Back to Gift Lists</Button>
                    <h3>Gift Ideas for {list?.giftsFor}</h3>
                    <Button type="button" onClick={() => {
                        history.push(`/gifts/create/${params.tableId}`)
                    }}>Add Gift</Button>
                </>
                :
                <Button type="button" onClick={() => {
                    history.push("/friends")
                }}>Back to Friends List</Button>
            }
            <Table celled fixed single line color={"teal"} inverted style={{opacity: ".9"}}>
                <Table.Header>
                    <Table.Row>
                        {params.tableId ?
                            header.map((item, i) => {
                                return <Table.HeaderCell key={`item--${i}`} >{item.toUpperCase()}</Table.HeaderCell>   
                            })
                            :
                            header.map((item, i) => {
                                if (i !== 0) {
                                    return <Table.HeaderCell key={`item--${i}`}>{item.toUpperCase()}</Table.HeaderCell>   
                                }
                            })
                        }
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        tableGifts?.map(gift => {
                            return <GiftCard key={gift.id} gift={gift} />
                        })
                    }
                </Table.Body>
            </Table>
        </>
    )
}