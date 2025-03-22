
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

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Get request body
    const { paymentIntentId, paymentAttemptId, testMode, simulatedStatus } = await req.json()
    
    console.log('Updating payment status for intent:', paymentIntentId)
    console.log('Test mode:', testMode ? 'enabled' : 'disabled')

    let paymentStatus

    if (testMode && simulatedStatus) {
      // Use the simulated status for test mode
      paymentStatus = simulatedStatus
      console.log('Using simulated status:', paymentStatus)
    } else {
      // Retrieve the payment intent from Stripe to get its latest status
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
      paymentStatus = paymentIntent.status
      console.log('Retrieved Stripe status:', paymentStatus)
    }

    // Update the payment attempt in Supabase
    const { data, error } = await supabase
      .from('payment_attempts')
      .update({
        status: paymentStatus,
        updated_at: new Date().toISOString(),
      })
      .eq('id', paymentAttemptId)
      .select()

    if (error) {
      console.error('Error updating payment status in Supabase:', error)
      throw error
    }

    console.log('Payment status updated in Supabase:', paymentStatus)

    // Return the updated payment attempt
    return new Response(
      JSON.stringify({ 
        success: true, 
        status: paymentStatus,
        paymentAttempt: data[0] 
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (error) {
    console.error('Error updating payment status:', error)
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
