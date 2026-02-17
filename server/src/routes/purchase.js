import express from 'express';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const purchaseRoutes = express.Router();

const PRICE_IDS = {
  professional: process.env.LICENSE_TIERS_PRICE_PROFESSIONAL,
  enterprise: process.env.LICENSE_TIERS_PRICE_ENTERPRISE
};

purchaseRoutes.post('/create-checkout-session', async (req, res) => {
  try {
    const { tier, success_url, cancel_url } = req.body;

    if (!tier || !PRICE_IDS[tier]) {
      return res.status(400).json({
        error: 'Invalid tier. Must be "professional" or "enterprise"'
      });
    }

    const priceId = PRICE_IDS[tier];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      mode: 'payment',
      customer_email: req.body.email,
      success_url: success_url || `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancel_url || `${process.env.FRONTEND_URL}/cancel`,
      metadata: {
        tier,
        customer_email: req.body.email
      }
    });

    return res.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Checkout session error:', error);
    return res.status(500).json({
      error: 'Failed to create checkout session'
    });
  }
});

purchaseRoutes.get('/session/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return res.json({
      id: session.id,
      status: session.status,
      customerEmail: session.customer_details?.email,
      tier: session.metadata?.tier,
      amountTotal: session.amount_total
    });
  } catch (error) {
    console.error('Session retrieval error:', error);
    return res.status(500).json({
      error: 'Failed to retrieve session'
    });
  }
});

purchaseRoutes.post('/create-portal-session', async (req, res) => {
  try {
    const { customerId, returnUrl } = req.body;

    if (!customerId) {
      return res.status(400).json({
        error: 'customerId is required'
      });
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl || process.env.FRONTEND_URL
    });

    return res.json({ url: session.url });
  } catch (error) {
    console.error('Portal session error:', error);
    return res.status(500).json({
      error: 'Failed to create portal session'
    });
  }
});
