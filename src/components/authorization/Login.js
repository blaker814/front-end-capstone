import React, { useRef } from "react"
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom"
import { Button, Divider } from "semantic-ui-react"
import logo from "../../img/landing-logo.png"
import "./Login.css"


export const Login = props => {
    const email = useRef()
    const existDialog = useRef()
    const history = useHistory()

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?email=${email.current.value}`)
            .then(res => res.json())
            .then(user => user.length ? user[0] : false)
    }

    const handleLogin = (e) => {
        e.preventDefault()

        existingUserCheck()
            .then(exists => {
                if (exists) {
                    localStorage.setItem("cs_user", exists.id)
                    history.push("/")
                } else {
                    existDialog.current.showModal()
                }
            })
    }

    return (
        <>
            <div className="mainContainer">
                <main className="container--login">
                    <dialog className="dialog dialog--auth" ref={existDialog}>
                        <div>User does not exist</div>
                        <button className="button--close" onClick={e => existDialog.current.close()}>Close</button>
                    </dialog>

                    <section>
                        <form className="form--login" onSubmit={handleLogin}>
                            <img src={logo} alt="Celebration Station logo" className="logo" />
                            
                            <Divider style={{zIndex: 5}}/>

                            <p className="about">Celebration Station is a place for all of the
                            organized planning of celebratory events in your life. Registered 
                            users are provided with all of the tools they need to get organized 
                            and stay organized in regards to their celebrations.</p>

                            <Divider />

                            <h2>Please sign in</h2>
                            <fieldset>
                                <label htmlFor="inputEmail"> Email address </label>
                                <input ref={email} type="email"
                                    id="email"
                                    className="form-control"
                                    placeholder="Email address"
                                    required autoFocus />
                            </fieldset>
                            <fieldset>
                                <Button primary type="submit">
                                    Sign in
                                </Button>
                            </fieldset>
                        </form>
                    </section>
                    <section className="link--register">
                        <Link to="/register">Not a member yet?</Link>
                    </section>
                </main>
            </div>
        </>
    )
}