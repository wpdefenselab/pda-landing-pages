// Competitor Conquest Page JavaScript

// Track scroll depth
let maxScroll = 0;
window.addEventListener('scroll', () => {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        if (maxScroll > 75 && typeof gtag !== 'undefined') {
            gtag('event', 'scroll_depth_75', {
                'event_category': 'engagement',
                'event_label': 'competitor_page',
                'competitor': 'passster'
            });
        }
    }
});

// Track comparison table views
document.addEventListener('DOMContentLoaded', function() {
    const comparisonTable = document.querySelector('.comparison-table');
    if (comparisonTable) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && typeof gtag !== 'undefined') {
                    gtag('event', 'view_comparison', {
                        'event_category': 'engagement',
                        'event_label': 'comparison_table',
                        'competitor': 'passster'
                    });
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(comparisonTable);
    }
    
    // Track offer section views
    const offerSection = document.querySelector('.offer-section');
    if (offerSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && typeof gtag !== 'undefined') {
                    gtag('event', 'view_switcher_offer', {
                        'event_category': 'conversions',
                        'event_label': '40_percent_offer',
                        'competitor': 'passster'
                    });
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(offerSection);
    }
    
    // Track migration steps views
    const migrationSection = document.querySelector('.migration-section');
    if (migrationSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && typeof gtag !== 'undefined') {
                    gtag('event', 'view_migration_steps', {
                        'event_category': 'engagement',
                        'event_label': 'migration_process',
                        'competitor': 'passster'
                    });
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(migrationSection);
    }
    
    // Track testimonials engagement
    const testimonials = document.querySelectorAll('.testimonial-card');
    testimonials.forEach((testimonial, index) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && typeof gtag !== 'undefined') {
                    gtag('event', 'view_testimonial', {
                        'event_category': 'social_proof',
                        'event_label': `testimonial_${index + 1}`,
                        'competitor': 'passster'
                    });
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(testimonial);
    });
    
    // Track CTA button clicks
    const ctaButtons = document.querySelectorAll('.btn');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (typeof gtag !== 'undefined') {
                const buttonText = this.textContent.trim();
                const section = this.closest('section')?.className || 'unknown';
                
                gtag('event', 'cta_click', {
                    'event_category': 'conversions',
                    'event_label': buttonText,
                    'button_location': section,
                    'competitor': 'passster'
                });
            }
        });
    });
    
    // Track problems card hover interactions
    const problemCards = document.querySelectorAll('.problem-card');
    problemCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            if (typeof gtag !== 'undefined') {
                const problemTitle = this.querySelector('.problem-title').textContent;
                gtag('event', 'problem_card_hover', {
                    'event_category': 'engagement',
                    'event_label': problemTitle,
                    'card_index': index + 1,
                    'competitor': 'passster'
                });
            }
        });
    });
    
    // Track FAQ interactions
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                const question = this.querySelector('.faq-question').textContent;
                gtag('event', 'faq_interaction', {
                    'event_category': 'engagement',
                    'event_label': question,
                    'faq_index': index + 1,
                    'competitor': 'passster'
                });
            }
        });
    });
});
