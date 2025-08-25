async function runPasswordScan() {
    const urlInput = document.getElementById('siteUrl');
    let url = urlInput.value.trim();
    
    if (!url) {
        alert('Please enter your WordPress site URL');
        return;
    }
    
    // Ensure URL has protocol
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
    }
    
    // Show loading state
    const scanButton = event.target;
    scanButton.textContent = 'Scanning...';
    scanButton.disabled = true;
    
    // Update site info
    document.getElementById('scannedSite').textContent = url;
    document.getElementById('scanDate').textContent = new Date().toLocaleDateString();
    
    // Simulate password protection check
    setTimeout(() => {
        updatePasswordResults(url);
        
        // Show results
        document.getElementById('scanResults').style.display = 'block';
        
        // Smooth scroll to results
        document.getElementById('scanResults').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Reset button
        scanButton.textContent = 'Test Protection';
        scanButton.disabled = false;
        
        // Track for remarketing
        if (typeof gtag !== 'undefined') {
            gtag('event', 'password_protection_scan', {
                'event_category': 'engagement',
                'event_label': url
            });
        }
    }, 2000);
}

function updatePasswordResults(url) {
    const resultsContainer = document.querySelector('.vulnerability-list');
    
    // Clear existing results
    resultsContainer.innerHTML = '';
    
    // Password protection vulnerabilities
    const vulnerabilities = [
        {
            type: 'critical',
            title: 'Single Password Limitation',
            desc: 'Your site likely uses WordPress default protection allowing only ONE password per page. This makes sharing with multiple clients impossible.',
            badge: 'CRITICAL ISSUE'
        },
        {
            type: 'critical',
            title: 'No Password Expiration',
            desc: 'WordPress passwords never expire by default. Anyone with a password has permanent access until manually changed.',
            badge: 'SECURITY RISK'
        },
        {
            type: 'warning',
            title: 'No Access Tracking',
            desc: 'You cannot see who accessed protected content, when, or how often. Makes security audits impossible.',
            badge: 'VISIBILITY ISSUE'
        },
        {
            type: 'warning',
            title: 'Password Sharing Uncontrolled',
            desc: 'Once shared, passwords can be used unlimited times by unlimited people. No way to restrict usage.',
            badge: 'CONTROL ISSUE'
        },
        {
            type: 'warning',
            title: 'No Partial Protection',
            desc: 'Cannot protect specific sections of content. It\'s all or nothing with default WordPress protection.',
            badge: 'FLEXIBILITY ISSUE'
        }
    ];
    
    vulnerabilities.forEach(vuln => {
        const vulnElement = document.createElement('div');
        vulnElement.className = `vulnerability-item vulnerability-${vuln.type}`;
        vulnElement.innerHTML = `
            <div class="vulnerability-title">
                ${vuln.type === 'critical' ? '⚠️' : '⚡'} ${vuln.title} <span style="background: ${vuln.type === 'critical' ? '#dc2626' : '#f59e0b'}; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.8em; margin-left: 10px;">${vuln.badge}</span>
            </div>
            <p>${vuln.desc}</p>
        `;
        resultsContainer.appendChild(vulnElement);
    });
    
    // Add disclaimer
    const disclaimer = document.createElement('div');
    disclaimer.style.cssText = 'margin-top: 30px; padding: 20px; background: #eff6ff; border-radius: 8px; border: 1px solid #3b82f6;';
    disclaimer.innerHTML = `
        <p style="margin: 0; font-size: 0.95em;"><strong>Note:</strong> This assessment is based on WordPress default password protection limitations. Most WordPress sites suffer from these issues unless using advanced protection plugins. The vulnerabilities shown are inherent to WordPress core functionality.</p>
    `;
    resultsContainer.appendChild(disclaimer);
}

// Track scroll depth for engagement
let maxScroll = 0;
window.addEventListener('scroll', () => {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        if (maxScroll > 75 && typeof gtag !== 'undefined') {
            gtag('event', 'scroll_depth_75', {
                'event_category': 'engagement'
            });
        }
    }
});

// Track time on page
let timeOnPage = 0;
setInterval(() => {
    timeOnPage += 5;
    if (timeOnPage === 120 && typeof gtag !== 'undefined') {
        gtag('event', 'time_on_page_2min', {
            'event_category': 'engagement'
        });
    }
}, 5000);
