# Setting Up Vercel Speed Insights for LynqIt

This guide will help you integrate Vercel Speed Insights into your LynqIt application to monitor and improve performance.

## What is Vercel Speed Insights?

Vercel Speed Insights provides real user performance monitoring for your site, giving you metrics on how your pages perform in the real world. It tracks Web Vitals metrics like LCP, FID, CLS, and more without impacting your site's performance.

## Setup Instructions

### 1. Add Speed Insights to your project

#### Option 1: Use the Vercel Dashboard

1. Deploy your project to Vercel if you haven't already
2. Go to your project dashboard on Vercel
3. Navigate to the "Speed Insights" tab
4. Click "Enable Speed Insights"

#### Option 2: Manual Installation (already completed)

The necessary script tags have been added to your project:

- In `index.html` (for the main HTML document)
- In `app.js` (for dynamically rendered content)

```html
<!-- Vercel Speed Insights -->
<script>
  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
</script>
<script defer src="/_vercel/insights/script.js"></script>
```

### 2. Deploy to Vercel

Make sure your project is deployed to Vercel:

```bash
# Install Vercel CLI if you haven't already
npm install -g vercel

# Deploy the project
vercel
```

### 3. Custom Configurations (Optional)

You can customize Speed Insights by modifying the script:

#### Track specific routes or events

```javascript
// Track a specific page view
va('page', { name: 'Home Page' });

// Track a custom event
va('event', { name: 'ButtonClick', data: { buttonId: 'signup' } });
```

#### Set up custom sampling rate

To reduce the amount of data collected (e.g., to 10% of page views):

```javascript
window.va('config', { sampleRate: 10 });
```

## Viewing the Results

1. Go to your Vercel dashboard
2. Navigate to your project
3. Click on the "Speed Insights" tab
4. You'll see metrics start to appear after your site gets traffic

## Key Metrics Tracked

- **LCP (Largest Contentful Paint)**: Measures loading performance
- **FID (First Input Delay)**: Measures interactivity
- **CLS (Cumulative Layout Shift)**: Measures visual stability
- **TTFB (Time to First Byte)**: Measures server response time
- **FCP (First Contentful Paint)**: Measures when first content appears

## Troubleshooting

- If metrics aren't appearing, make sure you're getting traffic to your site
- Verify the script is correctly loaded by checking network requests for `/_vercel/insights/script.js`
- Check the browser console for any errors related to Vercel Insights

## Additional Information

For more detailed information, visit the [Vercel Speed Insights documentation](https://vercel.com/docs/speed-insights). 