import React, { useContext, useState } from "react"
import { Button, Icon, Modal } from "semantic-ui-react"
import { FriendContext } from "./FriendProvider"
import { Link } from "react-router-dom"

export const FriendCard = ({ friend }) => {
    const { friends, removeFriend, getFriends } = useContext(FriendContext)

    const [open, setOpen] = useState(false)

    return (
        <section className="friend">
            <div className="card-header">
                <Icon className="big user square" style={{marginTop: "auto", marginBottom: "auto"}}></Icon> 
                <h3 className="friend-name">{friend.user.username}</h3>
            </div>
            <p>Name: {friend.user.firstName} {friend.user.lastName}</p>
            <p>Birthday: {friend.user.birthday.split("/").splice(0, 2).join("/")}</p>
            <h4 style={{textAlign: "center"}}><Link to={`/friends/table/${friend.userId}`}>Gift List</Link></h4>
            <Modal
                    size="mini"
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}
                    trigger={<Icon style={{position: "absolute", top: "0px", right: "0px"}} className="remove link inverted icon" />}
                >
                    <Modal.Content>
                        <p>Are you sure you want to remove this friend?</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                            negative
                            className="deleteBtn"
                            onClick={() => {
                                const foundFriendship = friends.find(friendship => {
                                    return (friendship.activeUserId === friend.userId && friendship.userId === parseInt(localStorage.getItem("cs_user")))
                                })

                                //removes both friendship ids from the database
                                Promise.all([removeFriend(friend.id),removeFriend(foundFriendship.id)])
                                .then(getFriends)
                            }}
                        >
                            Remove Friend
                        </Button>
                        <Button className="cancelBtn" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                    </Modal.Actions>
                </Modal>
        </section>
    )
}