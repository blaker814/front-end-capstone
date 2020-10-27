import React, { useRef } from "react"
import { useHistory } from "react-router-dom"
import { Button } from "semantic-ui-react"
import "./Login.css"

export const Register = (props) => {
    const firstName = useRef()
    const lastName = useRef()
    const username = useRef()
    const email = useRef()
    const birthday = useRef()
    let emailExist = false
    const conflictDialog = useRef()
    const history = useHistory()

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?email=${email.current.value}`)
            .then(res => res.json())
            .then(user => user.length ? emailExist = true : emailExist = false)
            .then(existingNameCheck)
    }

    const existingNameCheck = () => {
        return fetch(`http://localhost:8088/users`)
            .then(res => res.json())
            .then(users => users.find(user => user.username.toUpperCase() === username.current.value.toUpperCase()))
    }

    const handleRegister = (e) => {
        e.preventDefault()

        existingUserCheck()
            .then((userExists) => {
                if (!userExists && !emailExist) {
                    fetch("http://localhost:8088/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email: email.current.value,
                            firstName: firstName.current.value,
                            lastName: lastName.current.value,
                            username: username.current.value,
                            birthday: new Date(`${birthday.current.value}T07:00:00Z`).toLocaleString("en-US").split(",")[0]
                        })
                    })
                        .then(_ => _.json())
                        .then(createdUser => {
                            if (createdUser.hasOwnProperty("id")) {
                                localStorage.setItem("cs_user", createdUser.id)
                            }
                        })
                        .then(() => {
                            fetch("http://localhost:8088/giftLists", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    giftsFor: "me",
                                    forSelf: true,
                                    userId: parseInt(localStorage.getItem("cs_user"))
                                })
                            })
                        })
                        .then(() => history.push("/"))
                }
                else {
                    conflictDialog.current.showModal()
                }
            })

    }

    return (
        <>
            <div className="mainContainer">
                <main className="container--login" style={{ textAlign: "center" }}>

                    <dialog className="dialog dialog--password" ref={conflictDialog}>
                        <div>Account with that email address or username already exists</div>
                        <button className="button--close" onClick={e => conflictDialog.current.close()}>Close</button>
                    </dialog>

                    <form className="form--login" onSubmit={handleRegister}>
                        <h1 className="h3 mb-3 font-weight-normal">Please Register for IBS</h1>
                        <fieldset>
                            <label htmlFor="firstName"> First Name </label>
                            <input ref={firstName} type="text" name="firstName" className="form-control" placeholder="First name" required autoFocus />
                        </fieldset>

                        <fieldset>
                            <label htmlFor="lastName"> Last Name </label>
                            <input ref={lastName} type="text" name="lastName" className="form-control" placeholder="Last name" required />
                        </fieldset>

                        <fieldset>
                            <label htmlFor="username"> Username </label>
                            <input ref={username} type="text" name="username" className="form-control" placeholder="Username" required />
                        </fieldset>

                        <fieldset>
                            <label htmlFor="inputEmail"> Email address </label>
                            <input ref={email} type="email" name="email" className="form-control" placeholder="Email address" required />
                        </fieldset>

                        <fieldset>
                            <label htmlFor="inputBirthday"> Date of birth </label>
                            <input ref={birthday} type="date" name="birthday" className="form-control" placeholder="Date of birth" required />
                        </fieldset>

                        <div className="registerBtns">
                            <fieldset>
                                <Button primary type="submit"> Register </Button>
                            </fieldset>

                            <fieldset>
                                <Button type="button" onClick={() => {
                                    history.push("/login")
                                }}> Cancel </Button>
                            </fieldset>
                        </div>
                    </form>
                </main>

                {/* <video className="videoTag" autoPlay loop muted>
                    <source src={video} type="video/mp4" />
                </video> */}
            </div>
        </>
    )
}