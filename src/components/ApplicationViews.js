import React from "react"
import { Route } from "react-router-dom"
import { HomeReminders } from "./home/HomeReminders"
import { HomeGiftTable } from "./home/HomeGiftTable"
import { CelebrationCalendar } from "./celebration/CelebrationCalendar"
import { GiftList } from "./gift/GiftList"
import { BudgetList } from "./budget/BudgetList"
import { ThreadList } from "./message/ThreadList"
import { ThreadSearch } from "./message/ThreadSearch"
import { FriendList } from "./friend/FriendList"
import { FriendProvider } from "./friend/FriendProvider"
import { UserProvider } from "./user/UserProvider"
import { FriendSearch } from "./friend/FriendSearch"
import { MessageProvider } from "./message/MessageProvider"
import { MessageList } from "./message/MessageList"
import { CelebrationProvider } from "./celebration/CelebrationProvider"
import { CelebrationList } from "./celebration/CelebrationList"
import { CelebrationForm } from "./celebration/CelebrationForm"
import { GiftListProvider } from "./gift/GiftListProvider"
import { GiftProvider } from "./gift/GiftProvider"
import { LinkProvider } from "./gift/LinkProvider"
import { GiftTable } from "./gift/GiftTable"
import { GiftSearch } from "./gift/GiftSearch"
import { GiftForm } from "./gift/GiftForm"
import { BudgetProvider } from "./budget/BudgetProvider"
import { BudgetForm } from "./budget/BudgetForm"
import { BudgetTable } from "./budget/BudgetTable"
import { BudgetSearch } from "./budget/BudgetSearch"

export const ApplicationViews = (props) => {
    return (
        <>
            <CelebrationProvider>
                <GiftListProvider>
                    <GiftProvider>
                        <LinkProvider>
                            <Route exact path="/">
                                <HomeReminders />
                                <HomeGiftTable />
                            </Route>
                        </LinkProvider>
                    </GiftProvider>
                </GiftListProvider>
            </CelebrationProvider>

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

            <GiftListProvider>
                <GiftProvider>
                    <LinkProvider>
                        <Route exact path="/gifts">
                            <GiftSearch />
                            <GiftList />
                        </Route>
                    </LinkProvider>
                </GiftProvider>
            </GiftListProvider>

            <GiftListProvider>
                <GiftProvider>
                    <LinkProvider>
                        <CelebrationProvider>
                            <Route exact path="/gifts/table/:tableId(\d+)">
                                <GiftTable />
                            </Route>
                        </CelebrationProvider>
                    </LinkProvider>
                </GiftProvider>
            </GiftListProvider>

            <GiftListProvider>
                <GiftProvider>
                    <LinkProvider>
                        <CelebrationProvider>
                            <Route exact path="/gifts/create/:tableId(\d+)">
                                <GiftForm />
                            </Route>
                        </CelebrationProvider>
                    </LinkProvider>
                </GiftProvider>
            </GiftListProvider>

            <GiftListProvider>
                <GiftProvider>
                    <LinkProvider>
                        <CelebrationProvider>
                            <Route exact path="/gifts/edit/:tableId(\d+)/:giftId(\d+)">
                                <GiftForm />
                            </Route>
                        </CelebrationProvider>
                    </LinkProvider>
                </GiftProvider>
            </GiftListProvider>

            <BudgetProvider>
                <CelebrationProvider>
                    <Route exact path="/budgets">
                        <BudgetSearch />
                        <BudgetList />
                    </Route>
                </CelebrationProvider>
            </BudgetProvider>

            <BudgetProvider>
                <CelebrationProvider>
                    <Route exact path="/budgets/table/:budgetId(\d+)">
                        <BudgetTable />
                    </Route>
                </CelebrationProvider>
            </BudgetProvider>

            <BudgetProvider>
                <CelebrationProvider>
                    <Route exact path="/budgets/create">
                        <BudgetForm />
                    </Route>
                </CelebrationProvider>
            </BudgetProvider>

            <BudgetProvider>
                <CelebrationProvider>
                    <Route exact path="/budgets/edit/:budgetId(\d+)">
                        <BudgetForm />
                    </Route>
                </CelebrationProvider>
            </BudgetProvider>

            <MessageProvider>
                <FriendProvider>
                    <Route exact path="/messages">
                        <ThreadSearch />
                        <ThreadList />
                    </Route>
                </FriendProvider>
            </MessageProvider>

            <MessageProvider>
                <FriendProvider>
                    <Route exact path="/messages/list/:friendId(\d+)">
                        <MessageList />
                    </Route>
                </FriendProvider>
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