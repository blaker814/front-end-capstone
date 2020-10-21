import React, { useContext, useEffect, useState, useRef } from "react";
import { ThreadCard } from "./ThreadCard"
import { FriendContext, FriendProvider } from "../friend/FriendProvider";
import { Button, Modal, Input } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

export const ThreadList = () => {
    const { friends, getFriends, getFriendsById, updateFriend } = useContext(FriendContext)
    
    const [myFriends, setMyFriends] = useState([])
    const [open, setOpen] = useState(false)
    const friendName = useRef()
    const history = useHistory()

    useEffect(() => {
        getFriends()
        getFriendsById(localStorage.getItem("cs_user")).then(setMyFriends)
    }, [])

    const friendCheck = name => {
        const foundFriend = myFriends.find(friend => friend.user.username.toUpperCase() === name.toUpperCase())

        if (foundFriend && foundFriend.threadExist === false) {
            const otherFriend = friends.find(friend => {
                return friend.userId === foundFriend.activeUserId && friend.activeUserId === foundFriend.userId
            })
            updateFriend({
                id: foundFriend.id,
                activeUserId: foundFriend.activeUserId,
                userId: foundFriend.userId,
                threadExist: true
            })
            updateFriend({
                id: otherFriend.id,
                activeUserId: otherFriend.activeUserId,
                userId: otherFriend.userId,
                threadExist: true
            })
            return foundFriend
        } else if (foundFriend?.threadExist === true) {
            alert("You already have an existing thread with this user")
        } else {
            alert("You don't have a friend with that username")
        }
    }

    return (
        <>
            <h2>Threads</h2>
            <Modal
                size="mini"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<Button style={{ marginBottom: 25 }}>Add Thread</Button>}
            >
                <Modal.Content>
                    <Input type="text" ref={friendName} placeholder="Friend's name..." fluid />
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        primary
                        className="addBtn"
                        onClick={() => {
                            /* Checks if the current friend exists and is not the user. 
                            Only closes the modal if the friendship checks out */
                            const threadExist = friendCheck(friendName.current.inputRef.current.value)
                            threadExist ? history.push(`/messages/list/${threadExist.id}`) : setOpen(true)
                        }}
                    >
                        Add Thread
                    </Button>
                    <Button className="cancelBtn" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                </Modal.Actions>
            </Modal>
            <section className="threads">
                {
                    myFriends.map(friend => {
                        return friend.threadExist ? <ThreadCard key={friend.id} friend={friend} /> : null
                    })
                }
            </section>
        </>
    )
}