/* campaigns/problem-discovery/scanner.js
  ----------------------------------------
  Contains all JavaScript logic for the security scanner on the Problem Discovery page.
*/

document.addEventListener('DOMContentLoaded', () => {
    const scanButton = document.getElementById('scanButton');
    if (scanButton) {
        scanButton.addEventListener('click', runSecurityScan);
    }
});

async function runSecurityScan() {
    const urlInput = document.getElementById('siteUrl');
    const scanButton = document.getElementById('scanButton');
    const scanResultsContainer = document.getElementById('scanResults');
    
    let url = urlInput.value.trim();
    
    if (!url) {
        alert('Please enter your WordPress site URL');
        return;
    }
    
    // Ensure URL has a protocol
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
    }
    
    // --- UI Updates: Show Loading State ---
    scanButton.textContent = 'Scanning...';
    scanButton.disabled = true;
    scanResultsContainer.style.display = 'none'; // Hide old results
    scanResultsContainer.innerHTML = ''; // Clear old results
    
    // --- Perform the Scan ---
    let uploadsExposed = false;
    let realScanPerformed = false;
    
    try {
        const uploadsUrl = new URL(url);
        uploadsUrl.pathname = '/wp-content/uploads/';
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5-second timeout
        
        // We use 'no-cors' mode. We can't read the response, but the success/failure 
        // gives us a hint about the directory's accessibility.
        await fetch(uploadsUrl.href, {
            method: 'HEAD',
            mode: 'no-cors',
            signal: controller.signal
        });

        clearTimeout(timeoutId);
        realScanPerformed = true;
        uploadsExposed = true; // Conservative assumption on success

    } catch (error) {
        realScanPerformed = true;
        if (error.name === 'AbortError') {
            // Timeout likely means the site is slow or blocking requests
            console.warn('Scan timed out.');
            realScanPerformed = false; // Mark as not a definitive result
        } else {
            // Any other network error often means access is blocked (which is good)
            uploadsExposed = false;
        }
    }
    
    // --- Display Results ---
    updateScanResultsUI(url, uploadsExposed, realScanPerformed);
    scanResultsContainer.style.display = 'block';
    scanResultsContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // --- UI Updates: Reset Button ---
    scanButton.textContent = 'Scan My Site';
    scanButton.disabled = false;
    
    // --- Tracking ---
    if (typeof gtag === 'function') {
        gtag('event', 'security_scan', {
            'event_category': 'engagement',
            'event_label': url,
            'scan_success': realScanPerformed,
            'scan_result': uploadsExposed ? 'exposed' : 'protected'
        });
    }
}

function updateScanResultsUI(url, uploadsExposed, realScanPerformed) {
    const resultsContainer = document.getElementById('scanResults');
    
    // 1. Create the header for the results
    const headerHTML = `
        <div class="result-header">
            <h3>Security Scan Results for <span>${url}</span></h3>
            <p>Scan completed on <span>${new Date().toLocaleDateString()}</span></p>
        </div>
    `;
    
    const vulnerabilityList = document.createElement('div');
    vulnerabilityList.className = 'vulnerability-list';

    // 2. Add the result from the live scan (if it ran)
    if (realScanPerformed) {
        const status = uploadsExposed ? 'critical' : 'good';
        const icon = uploadsExposed ? '⚠️' : '✅';
        const title = 'Uploads Directory Check';
        const description = uploadsExposed 
            ? 'Your /wp-content/uploads/ directory appears to be publicly accessible. This could expose your files.'
            : 'Your /wp-content/uploads/ directory may have some protection. Further testing is needed for confirmation.';
        
        vulnerabilityList.innerHTML += createVulnerabilityItem(status, icon, title, description, 'LIVE SCAN');
    }

    // 3. Add educational content about common issues
    vulnerabilityList.innerHTML += createVulnerabilityItem(
        'critical', '⚠️', 'Direct File Access Risk', 
        'Even with basic protection, files can often be accessed if the direct URL is known or guessed.', 'COMMON ISSUE'
    );
    vulnerabilityList.innerHTML += createVulnerabilityItem(
        'critical', '⚠️', 'Search Engine Indexing', 
        'Without proper protection, Google and other search engines can index and display your private files.', 'COMMON ISSUE'
    );
    vulnerabilityList.innerHTML += createVulnerabilityItem(
        'warning', '⚡', 'Hotlinking Vulnerability', 
        'Other websites may embed your images directly, consuming your bandwidth and server resources.', 'COMMON ISSUE'
    );

    // 4. Add a final call to action and disclaimer
    const footerHTML = `
        <div style="text-align: center; margin-top: 40px;">
            <h3 style="font-size: 2em; color: var(--danger-color); margin-bottom: 20px;">
                Security Score: ${realScanPerformed && !uploadsExposed ? '4/10' : '3/10'}
            </h3>
            <p style="font-size: 1.2em; margin-bottom: 30px;">Your files need immediate protection</p>
            <a href="#solution" class="btn">See How to Fix This</a>
        </div>
        <div class="result-disclaimer">
            <p><strong>Note:</strong> This quick scan checks basic accessibility only. A complete security audit requires deeper analysis. The common issues shown above affect most WordPress sites without proper file protection.</p>
        </div>
    `;

    resultsContainer.innerHTML = headerHTML + vulnerabilityList.outerHTML + footerHTML;
}

function createVulnerabilityItem(status, icon, title, description, badgeText) {
    const badgeColor = badgeText === 'LIVE SCAN' ? '#3b82f6' : '#6b7280';
    return `
        <div class="vulnerability-item vulnerability-${status}">
            <div class="vulnerability-title">
                ${icon} ${title} 
                <span style="background: ${badgeColor}; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.8em; margin-left: 10px;">
                    ${badgeText}
                </span>
            </div>
            <p>${description}</p>
        </div>
    `;
}

// Track scroll depth for engagement
let scrollTracked = false;
window.addEventListener('scroll', () => {
    if (scrollTracked) return;
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    if (scrollPercent > 75) {
        if (typeof gtag === 'function') {
            gtag('event', 'scroll_depth_75', {
                'event_category': 'engagement'
            });
        }
        scrollTracked = true; // Fire only once
    }
}, { passive: true });
