import React, { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { ThreadContext } from "./MessageProvider"
import { Button, Container, Header, Icon, Message } from "semantic-ui-react"
import { UserContext } from "../user/UserProvider"

export const MessageCard = ({ message, thread }) => {
    const { deleteMessage } = useContext(ThreadContext)
    const { users, getUsers } = useContext(UserContext)

    const currentUser = parseInt(localStorage.getItem("cs_user"))
    const [modal, showModal] = useState(false)
    const history = useHistory()

    const sendingUser = users.find(user => user.id === currentUser)
    const receivingUser = users.find(user => user.id === thread.userId)

    useEffect(() => {
        getUsers()
    }, [])

    if (thread.sendingUserId === currentUser) {
        // global chat for current user
        return (
            <Container className="message--container">
                <Message className="message" floating style={{ backgroundColor: "#fff" }}>
                    <Header as="h3" className="message--currentUser">{sendingUser?.username}</Header>

                    <p className="message--content">{message.message}</p>
                    <p className="message--date" style={{ fontSize: "x-small" }}>{new Date(message.date).toLocaleString("en-US")}</p>

                </Message>
            </Container>
        )  
    } else {
        // renders global chat bubbles
        return (
            <Container className="message--container">
                <Message className="message" floating style={{ backgroundColor: "lightgreen" }}> 
                    <Header as="h3" className="message--notFriend">{receivingUser?.username}</Header>
                    <p className="message--content">{message.message}</p>
                    <p className="message--date" style={{ fontSize: "x-small" }}>{message.date}</p>
                </Message>
            </Container>
        )
    }
}