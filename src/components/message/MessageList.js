import React, { useContext, useEffect, useState, useRef } from "react"
import { MessageContext } from "./MessageProvider"
import { useParams, useHistory } from "react-router-dom"
import { MessageCard } from "./MessageCard"
import { Input, Button, Checkbox, Icon, Header } from "semantic-ui-react"
import { FriendContext } from "../friend/FriendProvider"
import "./Message.css"
import { useInterval } from "../useInterval"

export const MessageList = () => {
    const { messages, getMessages, addMessage } = useContext(MessageContext)
    const { friends, getFriends } = useContext(FriendContext)

    const [update, setUpdate] = useState(false)
    const {friendId} = useParams()
    const messageContent = useRef("")
    const history = useHistory()

    useInterval(getMessages, update ? 3000 : null)

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
            threadTwoId: otherThread.id,
            edited: false
        })

        messageContent.current.inputRef.current.value = ""
    }

    return (
        <>
            <Button type="button" onClick={() => {
                history.push("/messages")
            }}>Back to Threads</Button>
            <div className="messages--header">
                    <Header as='h2'><Icon name="comments" />Messages</Header>
                    <Checkbox toggle
                        onChange={() => setUpdate(!update)}
                        label={update ? "Disable real-time updates" : "Allow real-time updates"}
                    />
            </div>
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