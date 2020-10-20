import React, { useContext, useEffect } from "react"
import { Button, Icon } from "semantic-ui-react"
import { MessageContext } from "./MessageProvider"
import { Link } from "react-router-dom"

export const ThreadCard = ({ friend }) => {
    const { removeMessage } = useContext(MessageContext)

    return (
        <section className="thread">
            <h3 className="thread__name">
                <Link to={`/messages/list/${friend.id}`}>
                    {friend.user.username}
                </Link>
            </h3>
            <Button icon negative type="button" style={{ marginLeft: 10 }} onClick={() => {
                removeMessage(friend.id)
            }}><Icon name="trash" /></Button>
        </section>
    )
}