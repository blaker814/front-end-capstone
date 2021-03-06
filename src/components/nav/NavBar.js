import React from "react"
import { Link } from "react-router-dom"
import { Icon, Image } from "semantic-ui-react"
import logo from "../../img/logo.png"
import "./NavBar.css"

export const NavBar = (props) => {
    return (
        <section className="navbar__container">
            <ul className="navbar">
                <li className="navbar__item active logo-nav">
                    <Link className="navbar__link" to="/">
                        <Image src={logo} alt="Celebration Station logo" className="navbar-logo" />
                    </Link>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/celebrations"><Icon name="calendar alternate" />Celebrations</Link>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/gifts"><Icon name="gift" />Gifts</Link>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/budgets"><Icon name="dollar sign" />Budgets</Link>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/messages"><Icon name="comments" />Messages</Link>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/friends"><Icon name="address book" />Friends</Link>
                </li>
                <li className="logout navbar__item active">
                    <Link className="navbar__link" onClick={() => {
                        localStorage.removeItem("cs_user")
                    }}
                        to="/login"><Icon name="sign-out" />Logout</Link>
                </li>
            </ul>
        </section>
    )
}