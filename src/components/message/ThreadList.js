import React, { useContext, useEffect, useState } from "react";
import { ThreadCard } from "./ThreadCard"
import { FriendContext } from "../friend/FriendProvider";

export const ThreadList = () => {
    const { getFriendsById } = useContext(FriendContext)
    
    const [myFriends, setMyFriends] = useState([])

    useEffect(() => {
        getFriendsById(localStorage.getItem("cs_user")).then(setMyFriends)
    }, [])

    return (
        <section className="threads">
            {
                myFriends.map(friend => {
                    return friend.threadExist ? <ThreadCard key={friend.id} friend={friend} /> : null
                })
            }
        </section>
    )
}