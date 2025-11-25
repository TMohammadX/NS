"use server";

import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const getURL = () => {
    let url =
        process.env.NEXT_PUBLIC_APP_URL ??
        process.env.NEXT_PUBLIC_VERCEL_URL ??
        'http://localhost:3000/';
    url = url.includes('http') ? url : `https://${url}`;
    url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
    return url;
};

export async function createCheckoutSession(priceId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("User not authenticated");
    }

    // Get user profile to check if they already have a customer ID
    const { data: profile } = await supabase
        .from("profiles")
        .select("stripe_customer_id")
        .eq("id", user.id)
        .single();

    let customerId = profile?.stripe_customer_id;

    if (!customerId) {
        // Create a new customer in Stripe
        const customer = await stripe.customers.create({
            email: user.email,
            metadata: {
                supabaseUserId: user.id,
            },
        });
        customerId = customer.id;

        // Update profile with customer ID
        await supabase
            .from("profiles")
            .update({ stripe_customer_id: customerId })
            .eq("id", user.id);
    }

    const appUrl = getURL();

    const session = await stripe.checkout.sessions.create({
        customer: customerId,
        line_items: [
            {
                price: priceId,
                quantity: 1,
            },
        ],
        mode: "subscription",
        subscription_data: {
            trial_period_days: 7, // 7-day free trial
            metadata: {
                supabaseUserId: user.id,
            },
        },
        success_url: `${appUrl}dashboard?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${appUrl}payment`,
        metadata: {
            supabaseUserId: user.id,
        },
    });

    if (!session.url) {
        throw new Error("Failed to create checkout session");
    }

    redirect(session.url);
}

export async function createPortalSession() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("User not authenticated");
    }

    const { data: profile } = await supabase
        .from("profiles")
        .select("stripe_customer_id")
        .eq("id", user.id)
        .single();

    if (!profile?.stripe_customer_id) {
        throw new Error("No billing profile found");
    }

    const appUrl = getURL();

    const session = await stripe.billingPortal.sessions.create({
        customer: profile.stripe_customer_id,
        return_url: `${appUrl}dashboard`,
    });

    redirect(session.url);
}
