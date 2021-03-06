import React, { useContext, useEffect, useState, useRef } from "react"
import { FriendContext } from "./FriendProvider"
import { FriendCard } from "./FriendCard"
import { UserContext } from "../user/UserProvider"
import { Button, Modal, Input, Icon } from "semantic-ui-react"
import "./Friend.css"

export const FriendList = () => {
    const { friends, getFriends, addFriend, searchTerms } = useContext(FriendContext)
    const { users, getUsers } = useContext(UserContext)

    const [filteredFriends, setFiltered] = useState([])
    const [open, setOpen] = useState(false)

    const friendName = useRef("")

    //Gets friends and users on load
    useEffect(() => {
        getFriends().then(getUsers)
    }, [])

    useEffect(() => {
        if (searchTerms !== "") {
            // If the search field is not blank, display matching friends
            const subset = userFriends.filter(friend => {
                return friend.user.firstName.toLowerCase().includes(searchTerms.toLowerCase()) || friend.user.lastName.toLowerCase().includes(searchTerms.toLowerCase()) || friend.user.username.toLowerCase().includes(searchTerms.toLowerCase())
            })
            setFiltered(subset)
        } else {
            // If the search field is blank, display all user friends
            setFiltered(userFriends)
        }
    }, [searchTerms, friends])

    const friendCheck = name => {
        //Checks if the user exists
        const foundFriend = users.find(user => user.username.toUpperCase() === name.toUpperCase())

        //Checks if the friendship already exists and is not the user
        if (foundFriend && foundFriend.id !== parseInt(localStorage.getItem("cs_user"))) {
            const friendshipExist = friends.find(friend => {
                if (friend.activeUserId === parseInt(localStorage.getItem("cs_user"))
                    && friend.userId === foundFriend.id) {
                    return true
                } else {
                    return false
                }
            })

            if (friendshipExist) {
                alert("You are already friends!")
            } else {
                //When everything checks out, creates new friendship
                addFriend({
                    activeUserId: parseInt(localStorage.getItem("cs_user")),
                    userId: foundFriend.id,
                    threadExist: false
                })
                addFriend({
                    activeUserId: foundFriend.id,
                    userId: parseInt(localStorage.getItem("cs_user")),
                    threadExist: false
                })
                return foundFriend
            }
        } else if (foundFriend?.id === parseInt(localStorage.getItem("cs_user"))) {
            alert("Can't add yourself as a friend")
        } else {
            alert("User does not exist!")
        }
    }

    //returns only the friendships where the activeUserId matches the current users
    const userFriends = friends.filter(friend => friend.activeUserId === parseInt(localStorage.getItem("cs_user")))

    return (
        <>
            <section className="friendsContainer">
                <h2><Icon name="address book" />Friends</h2>
                

                <Modal
                    size="mini"
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}
                    trigger={<Button style={{ marginTop: "1em", marginBottom: "2em", marginLeft: "1em" }}>Add Friend</Button>}
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
                                const friendExist = friendCheck(friendName.current.inputRef.current.value)
                                friendExist ? setOpen(false) : setOpen(true)
                            }}
                        >
                            Add Friend
                        </Button>
                        <Button className="cancelBtn" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                    </Modal.Actions>
                </Modal>
                <div className="friends">
                    {
                        filteredFriends.map(friend => {
                            return <FriendCard key={friend.id} friend={friend} />
                        })
                    }
                </div>
            </section>
        </>
    )
}