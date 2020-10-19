import React, { useContext, useEffect } from "react"
import { Button, Icon } from "semantic-ui-react"
import { ThreadContext } from "./MessageProvider"
import { UserContext } from "../user/UserProvider"
import { Link } from "react-router-dom"

export const ThreadCard = ({ thread }) => {
    const { removeThread } = useContext(ThreadContext)
    const { users, getUsers } = useContext(UserContext)

    useEffect(() => {
        getUsers()
    }, [])

    const threadUser = users.find(user => user.id === thread.userId)

    return (
        <section className="thread">
            <h3 className="thread__name">
                <Link to={`/messages/list/${thread.id}`}>
                    {threadUser?.username}
                </Link>
            </h3>
            <p>{thread.messages[0].message}</p>
            <Button icon negative type="button" style={{ marginLeft: 10 }} onClick={() => {
                removeThread(thread.id)
            }}><Icon name="trash" /></Button>
        </section>
    )
}