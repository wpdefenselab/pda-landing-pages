/* campaigns/shared/js/tracking.js
  ---------------------------------
  This is your central tracking script for all landing pages.
  Add your Google Ads and GA4 tags here.
*/

// ==> ACTION REQUIRED: Replace the placeholder IDs below.

// 1. Find your Google Ads Tag ID (e.g., AW-XXXXXXXXX).
const GOOGLE_ADS_ID = 'AW-17372983038'; 

// 2. Find your Google Analytics 4 (GA4) Measurement ID (e.g., G-XXXXXXXXXX).
const GA4_MEASUREMENT_ID = 'G-K71ZC5HW20';


// --- Do not edit below this line ---

// Initialize Google Tag (gtag.js)
const gtagScript = document.createElement('script');
gtagScript.async = true;
gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`;
document.head.appendChild(gtagScript);

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

// Configure tags
gtag('config', GOOGLE_ADS_ID);
gtag('config', GA4_MEASUREMENT_ID);

console.log('Google Tracking Initialized for Ads and GA4.');

// You can add custom conversion tracking functions here later.
// Example:
// function trackScannerConversion() {
//     gtag('event', 'conversion', {
//         'send_to': `${GOOGLE_ADS_ID}/YOUR_CONVERSION_LABEL`,
//         'value': 1.0,
//         'currency': 'USD'
//     });
// }
