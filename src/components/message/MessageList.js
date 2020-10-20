import React, { useContext, useEffect, useState, useRef } from "react"
import { MessageContext } from "./MessageProvider"
import { useParams } from "react-router-dom"
import { MessageCard } from "./MessageCard"
import { Input, Button } from "semantic-ui-react"
import { FriendContext } from "../friend/FriendProvider"
import "./Message.css"
import { FriendSearch } from "../friend/FriendSearch"

export const MessageList = () => {
    const { messages, getMessages, addMessage } = useContext(MessageContext)
    const { friends, getFriends } = useContext(FriendContext)

    const {friendId} = useParams()
    const messageContent = useRef("")

    useEffect(() => {
        getMessages()
        getFriends()
    }, [])

    const threadMessages = messages.filter(message => {
        return message.threadOneId === parseInt(friendId) || message.threadTwoId === parseInt(friendId)
    })

    const myFriend = friends?.find(friend => friend.id === parseInt(friendId))
    const otherThread = friends?.find(friend => friend.activeUserId === myFriend.userId && friend.userId === myFriend.activeUserId)

    const handleInput = event => {
        event.preventDefault()

        addMessage({
            userId: parseInt(localStorage.getItem("cs_user")),
            date: new Date(Date.now()).toLocaleString("en-US"),
            message: messageContent.current.inputRef.current.value,
            threadOneId: myFriend.id,
            threadTwoId: otherThread.id
        })

        messageContent.current.inputRef.current.value = ""
    }

    return (
        <>
            <section className="messages--container">
                {
                    threadMessages.map(message => {
                        return <MessageCard key={message.id} thread={myFriend} message={message} />
                    })
                }
            </section>
            <form className="messageForm" onSubmit={handleInput}>
                <Input type="text" ref={messageContent} placeholder="Enter message..." required autoFocus />
                <Button primary type="submit">Send Message</Button>
            </form>
        </>
    )
}