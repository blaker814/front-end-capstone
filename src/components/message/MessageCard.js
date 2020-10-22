import React, { useContext, useState, useRef } from "react"
import { MessageContext } from "./MessageProvider"
import { Button, Container, Header, Message, Input, Modal } from "semantic-ui-react"

export const MessageCard = ({ message, thread }) => {
    const { deleteMessage, updateMessage, getMessages } = useContext(MessageContext)

    const messageContent = useRef(`${message.message}`)
    const [open, setOpen] = useState(false)

    const handleRemoveMessage = () => {
        if (thread.id === message.threadOneId) {
            updateMessage({
                id: message.id,
                userId: message.userId,
                date: message.date,
                message: message.message,
                threadOneId: null,
                threadTwoId: message.threadTwoId,
                edited: message.edited
            })
        } else {
            updateMessage({
                id: message.id,
                userId: message.userId,
                date: message.date,
                message: message.message,
                threadOneId: message.threadOneId,
                threadTwoId: null,
                edited: message.edited
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
                    <p className="message--edited" style={{ fontSize: "x-small" }}>{message.edited ? "Edited" : undefined}</p>
                    <Modal
                        size="mini"
                        onClose={() => setOpen(false)}
                        onOpen={() => setOpen(true)}
                        open={open}
                        trigger={<Button type="button" style={{ marginBottom: 25 }}>Edit</Button>}
                    >
                        <Modal.Content>
                            <Input type="text" ref={messageContent} defaultValue={message.message} fluid />
                        </Modal.Content>
                        <Modal.Actions>
                            <Button
                                primary
                                className="addBtn"
                                onClick={() => {
                                    updateMessage({
                                        id: message.id,
                                        userId: message.userId,
                                        date: message.date,
                                        message: messageContent.current.inputRef.current.value,
                                        threadOneId: message.threadOneId,
                                        threadTwoId: message.threadTwoId,
                                        edited: true      
                                    })
                                    setOpen(false)
                                }}
                            >
                                Save Changes
                            </Button>
                            <Button className="cancelBtn" onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                        </Modal.Actions>
                    </Modal>
                    <Button negative type="button" onClick={() => {
                        deleteMessage(message.id)
                        getMessages()
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