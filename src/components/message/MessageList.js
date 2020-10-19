import React, { useContext, useEffect } from "react"
import { ThreadContext } from "./MessageProvider"
import { useParams } from "react-router-dom"
import { MessageCard } from "./MessageCard"
import { Input } from "semantic-ui-react"

export const MessageList = () => {
    const { threads, getMessageThreads } = useContext(ThreadContext)

    const {threadId} = useParams()

    const foundThread = threads.find(thread => thread.id === parseInt(threadId))

    useEffect(() => {
        getMessageThreads()
    }, [])

    return (
        <section className="messages">
            {
                foundThread?.messages.map(message => {
                    return <MessageCard key={message.id} thread={foundThread} message={message} />
                })
            }
            <Input type="text" placeholder="Enter message..." />
        </section>
    )
}