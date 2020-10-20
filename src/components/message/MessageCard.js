import React, { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { MessageContext } from "./MessageProvider"
import { Button, Container, Header, Icon, Message } from "semantic-ui-react"

export const MessageCard = ({ message, thread }) => {
    const { deleteMessage, updateMessage } = useContext(MessageContext)

    const handleRemoveMessage = () => {
        if (thread.id === message.threadOneId) {
            updateMessage({
                id: message.id,
                userId: message.userId,
                date: message.date,
                message: message.message,
                threadOneId: null,
                threadTwoId: message.threadTwoId
            })
        } else {
            updateMessage({
                id: message.id,
                userId: message.userId,
                date: message.date,
                message: message.message,
                threadOneId: message.threadOneId,
                threadTwoId: null
            })
        }
    }

    if (message.userId === parseInt(localStorage.getItem("cs_user"))) {
        // global chat for current user
        return (
            <Container className="message--container">
                <Message className="message" floating style={{ backgroundColor: "#fff" }}>
                    <Header as="h3" className="message--currentUser">Me</Header>

                    <p className="message--content">{message.message}</p>
                    <p className="message--date" style={{ fontSize: "x-small" }}>{message.date}</p>

                    <Button type="button" onClick={() => {
                        
                    }}>Edit</Button>
                    <Button negative type="button" onClick={() => {
                        deleteMessage(message.id)
                    }}>Delete</Button>
                </Message>
            </Container>
        )  
    } else {
        // renders global chat bubbles
        return (
            <Container className="message--container">
                <Message className="message" floating style={{ backgroundColor: "lightgreen" }}> 
                    <Header as="h3" className="message--notFriend">{thread?.user.username}</Header>
                    <p className="message--content">{message.message}</p>
                    <p className="message--date" style={{ fontSize: "x-small" }}>{message.date}</p>
                    <Button negative type="button" onClick={handleRemoveMessage}>Delete</Button>
                </Message>
                
            </Container>
        )
    }
}