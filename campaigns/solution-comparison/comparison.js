// Comparison Tool Functionality
function showRecommendations() {
    const protectType = document.getElementById('protectType').value;
    const siteCount = document.getElementById('siteCount').value;
    const skillLevel = document.getElementById('skillLevel').value;
    const priority = document.getElementById('priority').value;
    
    if (!protectType || !siteCount || !skillLevel || !priority) {
        alert('Please answer all questions to get personalized recommendations');
        return;
    }
    
    // Show results
    document.getElementById('comparisonResults').style.display = 'block';
    
    // Build recommendations based on answers
    const resultsGrid = document.getElementById('resultsGrid');
    resultsGrid.innerHTML = '';
    
    // Logic for recommendations
    if (protectType === 'files' || protectType === 'both') {
        resultsGrid.innerHTML += `
            <div class="plugin-card recommended">
                <h3 class="plugin-name">Prevent Direct Access</h3>
                <div class="plugin-score">95/100</div>
                <p>Best for file & media protection</p>
                <ul class="plugin-features">
                    <li>0.03s load time impact</li>
                    <li>Blocks direct file access</li>
                    <li>S3 integration available</li>
                    <li>${siteCount === 'agency' ? 'Agency bulk licensing' : 'Affordable pricing'}</li>
                </ul>
                <a href="https://preventdirectaccess.com/" class="btn" style="width: 100%; margin-top: 20px;">Learn More</a>
            </div>
        `;
    }
    
    if (protectType === 'content' || protectType === 'both') {
        resultsGrid.innerHTML += `
            <div class="plugin-card ${protectType === 'content' ? 'recommended' : ''}">
                <h3 class="plugin-name">Password Protect WordPress</h3>
                <div class="plugin-score">93/100</div>
                <p>Best for content access control</p>
                <ul class="plugin-features">
                    <li>No user accounts needed</li>
                    <li>Partial content protection</li>
                    <li>Multiple passwords per page</li>
                    <li>${priority === 'ease' ? 'Perfect for your needs' : 'Advanced features available'}</li>
                </ul>
                <a href="https://passwordprotectwp.com/" class="btn" style="width: 100%; margin-top: 20px;">Learn More</a>
            </div>
        `;
    }
    
    // Show alternatives
    if (skillLevel === 'advanced') {
        resultsGrid.innerHTML += `
            <div class="plugin-card">
                <h3 class="plugin-name">Manual Methods</h3>
                <div class="plugin-score">45/100</div>
                <p>For advanced users only</p>
                <ul class="plugin-features">
                    <li>Free but time-consuming</li>
                    <li>High maintenance</li>
                    <li>No support available</li>
                    <li>Risk of breaking site</li>
                </ul>
                <button class="btn" style="width: 100%; margin-top: 20px; background: #6b7280;">See Guide</button>
            </div>
        `;
    }
    
    // Smooth scroll to results
    document.getElementById('comparisonResults').scrollIntoView({ behavior: 'smooth' });
    
    // Track for remarketing
    if (typeof gtag !== 'undefined') {
        gtag('event', 'comparison_tool_used', {
            'protect_type': protectType,
            'site_count': siteCount,
            'skill_level': skillLevel,
            'priority': priority
        });
    }
}

function runSecurityTest() {
    const url = document.getElementById('scanUrl').value;
    if (!url) {
        alert('Please enter your WordPress site URL');
        return;
    }
    
    // Show loading state
    event.target.textContent = 'Testing...';
    event.target.disabled = true;
    
    // Simulate test and redirect to results
    setTimeout(() => {
        // In real implementation, this would run actual tests
        window.location.href = '#migration';
        event.target.textContent = 'Run Security Test';
        event.target.disabled = false;
    }, 2000);
}

// Animate performance bars on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.width = entry.target.dataset.width;
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.performance-fill').forEach(bar => {
        bar.dataset.width = bar.style.width;
        bar.style.width = '0';
        observer.observe(bar);
    });
});
