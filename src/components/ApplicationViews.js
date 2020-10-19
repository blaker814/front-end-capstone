import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./home/Home"
import { CelebrationCalendar } from "./celebration/CelebrationCalendar"
import { GiftList } from "./gift/GiftList"
import { BudgetList } from "./budget/BudgetList"
import { MessageThreadList } from "./message/MessageThreadList"
import { FriendList } from "./friend/FriendList"
import { FriendProvider } from "./friend/FriendProvider"
import { UserProvider } from "./user/UserProvider"
import { FriendSearch } from "./friend/FriendSearch"

export const ApplicationViews = (props) => {
    return (
        <>
            <Route exact path="/">
                <Home />
            </Route>

            <Route exact path="/celebrations">
                <CelebrationCalendar />
            </Route>

            <Route exact path="/gifts">
                <GiftList />
            </Route>

            <Route exact path="/budgets">
                <BudgetList />
            </Route>

            <Route exact path="/messages">
                <MessageThreadList />
            </Route>

            <FriendProvider>
                <UserProvider>
                    <Route exact path="/friends">
                        <FriendSearch />
                        <FriendList />
                    </Route>
                </UserProvider>
            </FriendProvider>

         
        </>
    )
}