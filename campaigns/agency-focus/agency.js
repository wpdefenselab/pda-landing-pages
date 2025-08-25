// Agency ROI Calculator Functionality
function calculateROI() {
    // Get input values
    const numSites = parseInt(document.getElementById('numSites').value) || 25;
    const hourlyRate = parseInt(document.getElementById('hourlyRate').value) || 125;
    const securityTime = parseInt(document.getElementById('securityTime').value) || 8;
    
    // Calculate savings
    const monthlyTimeCost = securityTime * hourlyRate;
    const yearlyTimeCost = monthlyTimeCost * 12;
    
    // Determine plan cost based on number of sites
    let planCost;
    if (numSites <= 25) {
        planCost = 470; // Annual cost for 25 sites
    } else if (numSites <= 100) {
        planCost = 950; // Annual cost for 100 sites
    } else {
        planCost = 1910; // Annual cost for unlimited
    }
    
    // Calculate total savings
    const totalSavings = yearlyTimeCost - planCost;
    const timeSaved = securityTime * 12;
    const perSiteCost = (planCost / 12 / numSites).toFixed(2);
    const roi = ((totalSavings / planCost) * 100).toFixed(0);
    
    // Update display
    document.getElementById('totalSavings').textContent = `$${totalSavings.toLocaleString()}`;
    document.getElementById('timeSaved').textContent = `${timeSaved} hours`;
    document.getElementById('perSiteCost').textContent = `$${perSiteCost}`;
    document.getElementById('roiPercent').textContent = `${roi}%`;
    
    // Show results
    document.getElementById('roiResults').style.display = 'block';
    
    // Smooth scroll to results
    document.getElementById('roiResults').scrollIntoView({ behavior: 'smooth' });
    
    // Track for remarketing
    if (typeof gtag !== 'undefined') {
        gtag('event', 'roi_calculator_used', {
            'event_category': 'engagement',
            'event_label': 'agency_calculator',
            'num_sites': numSites,
            'hourly_rate': hourlyRate,
            'savings_amount': totalSavings,
            'roi_percentage': roi
        });
    }
}

// Track scroll depth for engagement
let maxScroll = 0;
window.addEventListener('scroll', () => {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        if (maxScroll > 75 && typeof gtag !== 'undefined') {
            gtag('event', 'scroll_depth_75', {
                'event_category': 'engagement',
                'page_type': 'agency_landing'
            });
        }
    }
});

// Add enter key support for calculator inputs
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('.calc-input input');
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calculateROI();
            }
        });
    });
    
    // Track pricing table views
    const pricingTable = document.querySelector('.pricing-table');
    if (pricingTable) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && typeof gtag !== 'undefined') {
                    gtag('event', 'view_pricing_table', {
                        'event_category': 'engagement',
                        'page_type': 'agency_landing'
                    });
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(pricingTable);
    }
    
    // Track case study engagement
    const caseStudy = document.querySelector('.case-study-section');
    if (caseStudy) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && typeof gtag !== 'undefined') {
                    gtag('event', 'view_case_study', {
                        'event_category': 'engagement',
                        'page_type': 'agency_landing'
                    });
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(caseStudy);
    }
});
