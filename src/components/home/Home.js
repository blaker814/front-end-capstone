import React, { useContext, useEffect, useState } from "react"
import { UserContext } from "../user/UserProvider"
import "./Home.css"
import video from "../../video/confetti.mp4"

export const Home = () => {
    const { getUserById } = useContext(UserContext)
    const [user, setUser] = useState({})

    useEffect(() => {
        getUserById(localStorage.getItem("cs_user")).then(setUser)
    }, [])

    return (
        <>
            <h1>Welcome {user.firstName}! You've arrived at Celebration Station!</h1>
            <video className="videoTag" autoPlay loop muted>
                <source src={video} type="video/mp4" />
            </video>
        </>
    )
}