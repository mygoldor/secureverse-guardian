
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.43.0'
import Stripe from 'https://esm.sh/stripe@13.17.0'

// Set up CORS headers for browser requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Create a Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
const supabase = createClient(supabaseUrl, supabaseKey)

// Create a Stripe client
const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY') || ''
const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2023-10-16',
})

// Define price IDs - in a real environment, these would be your actual Stripe price IDs
const PRICE_IDS = {
  monthly: 'price_monthly_test',
  yearly: 'price_yearly_test',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Get request body
    const { planType, successUrl, cancelUrl, customerEmail, testMode } = await req.json()
    
    console.log('Creating payment session for plan:', planType)
    console.log('Customer email:', customerEmail)
    console.log('Test mode:', testMode ? 'enabled' : 'disabled')

    // For testing purposes, we'll create a Payment Intent directly without redirecting to Stripe
    // In production, you would create a Checkout Session and redirect to Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: planType === 'yearly' ? 9900 : 999, // €9.99 or €99 in cents
      currency: 'eur',
      payment_method_types: ['card'],
      receipt_email: customerEmail,
      description: `Guardia ${planType === 'yearly' ? 'Yearly' : 'Monthly'} Subscription`,
      metadata: {
        plan: planType,
        customer_email: customerEmail,
        test_mode: testMode ? 'true' : 'false',
      },
    })

    console.log('Created payment intent:', paymentIntent.id)

    // Store the payment attempt in Supabase
    const { data, error } = await supabase
      .from('payment_attempts')
      .insert({
        stripe_payment_id: paymentIntent.id,
        customer_email: customerEmail,
        plan_type: planType,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        status: paymentIntent.status,
      })
      .select('id')

    if (error) {
      console.error('Error saving payment attempt to Supabase:', error)
      throw error
    }

    console.log('Saved payment attempt:', data[0].id)

    // Return the client secret for the frontend to confirm the payment
    return new Response(
      JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        paymentAttemptId: data[0].id,
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (error) {
    console.error('Error processing payment:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    )
  }
})
