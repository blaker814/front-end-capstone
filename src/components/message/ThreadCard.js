import React, { useContext, useEffect } from "react"
import { Button, Icon } from "semantic-ui-react"
import { MessageContext } from "./MessageProvider"
import { Link } from "react-router-dom"
import { FriendContext } from "../friend/FriendProvider"

export const ThreadCard = ({ friend }) => {
    const { messages, getMessages, updateMessage } = useContext(MessageContext)
    const { getFriends, updateFriend } = useContext(FriendContext)
    
    useEffect(() => {
        getMessages()
    }, [])

    const handleRemoveThread = () => {
        Promise.all(messages.map(message => {
            if (friend.id === message.threadOneId) {
                return updateMessage({
                    id: message.id,
                    userId: message.userId,
                    date: message.date,
                    message: message.message,
                    threadOneId: undefined,
                    threadTwoId: message.threadTwoId,
                    edited: message.edited
                })
            } else if (friend.id === message.threadTwoId) {
                return updateMessage({
                    id: message.id,
                    userId: message.userId,
                    date: message.date,
                    message: message.message,
                    threadOneId: message.threadOneId,
                    threadTwoId: undefined,
                    edited: message.edited
                })
            }
        }))
        .then(() => {
            updateFriend({
                id: friend.id,
                activeUserId: friend.activeUserId,
                userId: friend.userId,
                threadExist: false
            })
            getFriends()
        })
    }

    return (
        <section className="thread">
            <h3 className="thread__name">
                <Link to={`/messages/list/${friend.id}`}>
                    {friend.user.username}
                </Link>
            </h3>
            <p>{friend.user.name}</p>
            <Button icon negative type="button" style={{ marginLeft: 10 }} onClick={handleRemoveThread}><Icon name="trash" /></Button>
        </section>
    )
}