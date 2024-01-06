'use client'
import { Button } from "./ui/button";
import axios from "axios"
import React from "react"

type Props = {isPro: boolean}

export const SubscriptionButton = (props: Props) => {
    const [loading, setLoading] = React.useState(false)
    const handleSubscription = async () => {
        try {
            setLoading(true)
            const response = await axios.get('/api/stripe')
            console.log(response.data)
            window.location.href = response.data.url
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }
    return (
        <Button onClick={handleSubscription} disabled={loading}>
            { props.isPro ? "Manage Subscriptions" : "Get Pro" }
        </Button>
    )
}