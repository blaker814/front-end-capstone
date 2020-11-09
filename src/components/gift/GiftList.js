import React, { useContext, useEffect, useState, useRef } from "react";
import { GiftListContext } from "./GiftListProvider";
import { GiftListCard } from "./GiftListCard";
import "./Gift.css"
import { Button, Modal, Input, Icon } from "semantic-ui-react";

export const GiftList = () => {
    const { searchTerms, giftLists, getGiftListsById, addGiftList } = useContext(GiftListContext)

    const [filteredGifts, setFiltered] = useState([])
    const [open, setOpen] = useState(false)
    const giftsFor = useRef()

    useEffect(() => {
        getGiftListsById(localStorage.getItem("cs_user"))
    }, [])

    useEffect(() => {
        if (searchTerms !== "") {
            // If the search field is not blank, display matching friends
            const subset = giftLists.filter(gl => {
                return gl.giftsFor.toLowerCase().includes(searchTerms.toLowerCase())
            })
            setFiltered(subset)
        } else {
            // If the search field is blank, display all user friends
            setFiltered(giftLists)
        }
    }, [searchTerms, giftLists])

    const listCheck = name => {
        const foundList = giftLists.find(gl => gl.giftsFor.toLowerCase() === name.toLowerCase())

        if (foundList) {
            alert("You already have an existing list with that name")
            return foundList
        } else {
            addGiftList({
                giftsFor: name,
                forSelf: false,
                userId: parseInt(localStorage.getItem("cs_user")),
            })
        }
    }

    return ( 
        <section>
            <h2><Icon name="gift" />Gift Lists</h2>
            <Modal
                size="mini"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<Button type="button" style={{ marginTop: "1em", marginBottom: "2em", marginLeft: "1em" }}>New Gift List</Button>}
            >
                <Modal.Content>
                    <Input type="text" ref={giftsFor} placeholder="Gift recipient..." fluid />
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        primary
                        className="addBtn"
                        onClick={() => {
                            const listExist = listCheck(giftsFor.current.inputRef.current.value)
                            listExist ? setOpen(true) : setOpen(false) 
                        }}
                    >
                        Create Gift List
                    </Button>
                    <Button className="cancelBtn" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                </Modal.Actions>
            </Modal>
            <div className="gifts">
                {
                    filteredGifts?.map(gl => {
                        return <GiftListCard key={gl.id} giftList={gl} />
                    })
                }
            </div>
        </section>
    )
}