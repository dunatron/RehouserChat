import React from 'react'
import {useSubscription} from "@apollo/react-hooks"
import MessageCreatedSub from "./MessageCreatedSub"
import {useCurrentUser} from "../components/User"

/**
 * SHould probably hoist useCurrentUser to app.js and pass me to screens and ionto here etc
 */
const SubscriptionsProvider = () => {
    console.log("Subscriptions provider")
    const {data, error, loading} = useCurrentUser()
    if (loading) return null
    if (error) return null
    console.log("Subscriptions user data => ", data)
    return null
    return (
        <MessageCreatedSub />
    )
}

export default SubscriptionsProvider