import React, { useContext, useEffect, useState, useRef } from "react";
import { ThreadCard } from "./ThreadCard"
import { FriendContext } from "../friend/FriendProvider";
import { Button, Modal, Input, Icon } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

export const ThreadList = () => {
    const { friends, getFriends, getFriendsById, updateFriend, searchTerms } = useContext(FriendContext)
    
    const [myFriends, setMyFriends] = useState([])
    const [filteredThreads, setFiltered] = useState([])
    const [open, setOpen] = useState(false)
    const friendName = useRef()
    const history = useHistory()

    useEffect(() => {
        getFriends()
    }, [])

    useEffect(() => {
        getFriendsById(localStorage.getItem("cs_user")).then(setMyFriends)
    }, [friends])

    useEffect(() => {
        if (searchTerms !== "") {
            // If the search field is not blank, display matching friends
            const subset = myFriends.filter(friend => {
                return friend.user.firstName.toLowerCase().includes(searchTerms.toLowerCase()) || friend.user.lastName.toLowerCase().includes(searchTerms.toLowerCase()) || friend.user.username.toLowerCase().includes(searchTerms.toLowerCase())
            })
            setFiltered(subset)
        } else {
            // If the search field is blank, display all user friends
            setFiltered(myFriends)
        }
    }, [searchTerms, myFriends])

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
        <section>
            <h2><Icon name="comments" />Threads</h2>
            <Modal
                size="mini"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<Button style={{ marginTop: "1em", marginBottom: "2em", marginLeft: "1em" }}>Add Thread</Button>}
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
            <div className="threads">
                {
                    filteredThreads.map(friend => {
                        return friend.threadExist ? <ThreadCard key={friend.id} friend={friend} /> : null
                    })
                }
            </div>
        </section>
    )
}