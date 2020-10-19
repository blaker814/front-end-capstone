import React, { useContext, useEffect } from "react";
import { ThreadContext } from "./MessageProvider"
import { ThreadCard } from "./MessageThreadCard"

export const MessageThreadList = () => {
    const { threads, getMessageThreads } = useContext(ThreadContext)

    useEffect(() => {
        getMessageThreads()
    }, [])

    return (
        <section className="threads">
            {
                threads.map(thread => {
                    return <ThreadCard key={thread.id} thread={thread} />
                })
            }
        </section>
    )
}