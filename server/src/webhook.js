import Stripe from 'stripe';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const pendingPurchases = new Map();

export async function stripeWebhook(req, res) {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      await handleCheckoutComplete(session);
      break;
    }
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent succeeded: ${paymentIntent.id}`);
      break;
    }
    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object;
      console.log(`Payment failed: ${paymentIntent.id}`);
      break;
    }
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
}

async function handleCheckoutComplete(session) {
  const customerEmail = session.customer_details?.email;
  const customerName = session.customer_details?.name;
  const priceId = session.price_id;
  const paymentIntentId = session.payment_intent;

  if (!customerEmail) {
    console.error('No customer email in session');
    return;
  }

  let tier = 'professional';
  if (priceId === process.env.LICENSE_TIERS_PRICE_ENTERPRISE) {
    tier = 'enterprise';
  }

  const purchaseId = uuidv4();
  pendingPurchases.set(purchaseId, {
    email: customerEmail,
    name: customerName,
    tier,
    paymentIntentId,
    createdAt: new Date().toISOString(),
    status: 'pending_license_generation'
  });

  console.log(`Purchase completed: ${purchaseId} - ${tier} for ${customerEmail}`);

  try {
    const licenseKey = await generateLicenseKey(tier, customerEmail);
    
    if (licenseKey) {
      pendingPurchases.set(purchaseId, {
        ...pendingPurchases.get(purchaseId),
        licenseKey,
        status: 'completed'
      });

      await sendLicenseEmail(customerEmail, customerName, licenseKey, tier);
      
      console.log(`License generated and sent: ${licenseKey} for ${customerEmail}`);
    }
  } catch (error) {
    console.error('Error generating license:', error);
    pendingPurchases.set(purchaseId, {
      ...pendingPurchases.get(purchaseId),
      status: 'error',
      error: error.message
    });
  }
}

async function generateLicenseKey(tier, customerEmail) {
  const apiKey = process.env.SIMPLE_LICENSE_API_KEY;
  const baseUrl = process.env.SIMPLE_LICENSE_BASE_URL;

  if (!apiKey) {
    console.error('SimpleLicense API key not configured');
    return null;
  }

  const productName = tier === 'enterprise' 
    ? 'Planning Board Enterprise' 
    : 'Planning Board Professional';

  try {
    const response = await fetch(`${baseUrl}/keys/`, {
      method: 'POST',
      headers: {
        'Authorization': `ApiKey ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        key: {
          name: `${customerEmail} - ${tier}`,
          product_id: productName,
          expires_at: null,
          max_activations: 5,
          fingerprint_enabled: true
        }
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`SimpleLicense API error: ${error}`);
    }

    const data = await response.json();
    return data.key?.key;
  } catch (error) {
    console.error('Failed to generate license key:', error);
    throw error;
  }
}

async function sendLicenseEmail(email, name, licenseKey, tier) {
  const transporter = require('nodemailer').createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const tierName = tier === 'enterprise' ? 'Enterprise' : 'Professional';
  const expiryInfo = tier === 'enterprise' 
    ? 'lifetime' 
    : '1 year';

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: `Your Planning Board ${tierName} License Key`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Thank you for your purchase!</h2>
        <p>Hello ${name || 'there'},</p>
        <p>Thank you for purchasing Planning Board ${tierName}.</p>
        
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Your License Key</h3>
          <code style="font-size: 18px; word-break: break-all; background: #fff; padding: 10px; display: block; border-radius: 4px;">
            ${licenseKey}
          </code>
        </div>
        
        <h3>License Details</h3>
        <ul>
          <li><strong>Tier:</strong> ${tierName}</li>
          <li><strong>Duration:</strong> ${expiryInfo}</li>
          <li><strong>Max Activations:</strong> 5 devices</li>
        </ul>
        
        <h3>How to Activate</h3>
        <ol>
          <li>Download and install Planning Board</li>
          <li>Open Settings > License</li>
          <li>Enter your license key above</li>
          <li>Click Activate</li>
        </ol>
        
        <p>If you have any questions, reply to this email.</p>
        <p>Best regards,<br>The Planning Board Team</p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
}

export { pendingPurchases };
