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
import { MessageProvider } from "./message/MessageProvider"
import { MessageList } from "./message/MessageList"
import { CelebrationProvider } from "./celebration/CelebrationProvider"
import { CelebrationList } from "./celebration/CelebrationList"
import { CelebrationForm } from "./celebration/CelebrationForm"

export const ApplicationViews = (props) => {
    return (
        <>
            <Route exact path="/">
                <Home />
            </Route>

            <CelebrationProvider>
                <Route exact path="/celebrations">
                    <CelebrationCalendar />
                </Route>
            </CelebrationProvider>

            <CelebrationProvider>
                <Route exact path="/celebrations/list/:date">
                    <CelebrationList />
                </Route>
            </CelebrationProvider>

            <CelebrationProvider>
                <Route exact path="/celebrations/create">
                    <CelebrationForm />
                </Route>
            </CelebrationProvider>

            <CelebrationProvider>
                <Route exact path="/celebrations/create/:date">
                    <CelebrationForm />
                </Route>
            </CelebrationProvider>

            <CelebrationProvider>
                <Route exact path="/celebrations/edit/:celebrationId(\d+)">
                    <CelebrationForm />
                </Route>
            </CelebrationProvider>

            <Route exact path="/gifts">
                <GiftList />
            </Route>

            <Route exact path="/budgets">
                <BudgetList />
            </Route>

            <MessageProvider>
                <UserProvider>
                    <Route exact path="/messages">
                        <MessageThreadList />
                    </Route>
                </UserProvider>
            </MessageProvider>

            <MessageProvider>
                <UserProvider>
                    <Route exact path="/messages/list/:threadId(\d+)">
                        <MessageList />
                    </Route>
                </UserProvider>
            </MessageProvider>

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