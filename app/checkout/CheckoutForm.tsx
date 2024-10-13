'use client'
import React, { useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout,
} from "@stripe/react-stripe-js";

import { postStripeSession } from "@/server-actions/stripeSession";

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
);

export const CheckoutForm = ({ priceId }: { priceId: string }) => {
    const fetchClientSecret = useCallback(async () => {
        const stripeResponse = await postStripeSession({ priceId });
        return stripeResponse.clientSecret;
    }, [priceId]);

    const options = { fetchClientSecret };

    return (
        <div id="checkout">
            <EmbeddedCheckoutProvider stripe={stripePromise} options={options} >
                <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
        </div>
    )
}