# Contact Form Setup - Formspree (Client-Side Only)

## Overview
The contact form uses **Formspree** - a free, serverless form backend that requires no setup or backend infrastructure.

**Features:**
- ✅ Receive emails for every submission
- ✅ Form submissions stored online
- ✅ Export data to CSV
- ✅ Spam protection included
- ✅ Works with pure HTML (no Node.js needed)
- ✅ Free tier includes up to 50 submissions/month

## Setup Instructions

### Step 1: Create Formspree Account
1. Go to [formspree.io](https://formspree.io)
2. Click "Sign Up"
3. Create account with your email
4. Verify email

### Step 2: Create a New Form
1. After login, click "New Form"
2. Enter a name: "Axxeler Lead Form"
3. Get your form endpoint (looks like: `https://formspree.io/f/xyzgeobr`)

### Step 3: Update Form Action
In `contact.html`, replace the form action with your endpoint:

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" id="contactForm">
```

Example:
```html
<form action="https://formspree.io/f/xyzgeobr" method="POST" id="contactForm">
```

### Step 4: Configure Email Notifications
1. In Formspree dashboard, go to form settings
2. Add your email for notifications
3. Toggle "Send me a copy" on
4. Save settings

Done! ✅ Form is now live and will send emails.

## How It Works

When someone submits the form:
1. Formspree receives the data
2. Email sent to your configured address
3. Data stored in Formspree dashboard
4. Optional: Redirect to thank you page

## Viewing Submissions

1. Log in to [formspree.io](https://formspree.io)
2. Click on your form
3. See all submissions
4. Export to CSV anytime

## Advanced Features (Optional)

### Add Thank You Page
Add to your HTML after form:
```html
<!-- Add this at the end of form section -->
<link rel="stylesheet" href="https://formspree.io/static/formspree.css">
```

### Redirect After Submit
Add hidden field to form:
```html
<input type="hidden" name="_next" value="https://yourdomain.com/thank-you.html">
```

### Customize Success Message
Formspree shows a default success message. For custom message, create `thank-you.html`:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Thank You!</title>
</head>
<body>
    <h1>Thank You for Your Submission!</h1>
    <p>We'll be in touch within 24 hours.</p>
</body>
</html>
```

Then add to form:
```html
<input type="hidden" name="_next" value="/thank-you.html">
```

### Add reCAPTCHA (Spam Protection)
1. Get free reCAPTCHA key from Google
2. Add to Formspree settings
3. Add to form HTML:
```html
<div class="g-recaptcha" data-sitekey="YOUR_SITE_KEY"></div>
<script src="https://www.google.com/recaptcha/api.js"></script>
```

## Deployment

### Vercel / Netlify / GitHub Pages
Simply deploy your HTML files - no backend needed!

```bash
# Vercel
vercel

# Netlify
netlify deploy --prod

# GitHub Pages
git push
```

Formspree handles all backend processing automatically.

## Pricing

**Free Plan:**
- 50 submissions/month
- Basic storage
- Email notifications

**Pro Plan ($25/month):**
- Unlimited submissions
- Advanced features
- Webhooks
- API access

## Data Privacy

- ✅ GDPR Compliant
- ✅ Your data is encrypted
- ✅ Never sold to third parties
- ✅ Data deletion on request

## Troubleshooting

### Form not submitting
- Verify form action URL is correct
- Check browser console for errors
- Ensure form has `method="POST"`
- Test at formspree.io directly

### Not receiving emails
- Check spam folder
- Verify email in Formspree settings
- Ensure form has correct field names
- Check Formspree notifications settings

### Too many submissions (quota)
- Upgrade to Pro plan ($25/month)
- Or reset plan next month

## Alternative Services

If you prefer other options:

1. **Basin** (basin.io) - Similar to Formspree
2. **Netlify Forms** - If hosting on Netlify
3. **Google Forms** - Free but less customizable
4. **Getform** (getform.io) - More advanced features

## Support

- Formspree: [help.formspree.io](https://help.formspree.io)
- Email: support@formspree.io
- Docs: [formspree.io/docs](https://formspree.io/docs)
