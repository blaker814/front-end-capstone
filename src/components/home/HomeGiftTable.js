import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { Button, Table } from "semantic-ui-react"
import { GiftListContext } from "../gift/GiftListProvider"
import { GiftContext } from "../gift/GiftProvider"
import { GiftCard } from "../gift/GiftCard"

export const HomeGiftTable = () => {
    const { getUsersGiftList } = useContext(GiftListContext)
    const { gifts, getGiftsByTableId } = useContext(GiftContext)

    const history = useHistory()
    const [list, setList] = useState({})
    const [tableGifts, setTableGifts] = useState([])

    useEffect(() => {
        getUsersGiftList(localStorage.getItem("cs_user")).then(res => setList(res[0]))
    }, [gifts])

    useEffect(() => {
        if (list.id) {
            getGiftsByTableId(list.id).then(res => setTableGifts(res))
        }
    }, [list])

    const header = ["", "gift", "price", "links", "celebration", "received?"]

    return (
        <>
            <h3>Gift Ideas for {list?.giftsFor}</h3>
            <Button type="button" onClick={() => {
                history.push(`/gifts/create/${list.id}`)
            }}>Add Gift</Button>
            <Table celled fixed color={"teal"} inverted style={{opacity: ".9"}}>
                <Table.Header>
                    <Table.Row>
                        {
                            header.map((item, i) => {
                                return <Table.HeaderCell key={`item--${i}`} >{item.toUpperCase()}</Table.HeaderCell>
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