/**
 * Veilus GA4 Custom Events — Analytics Helper
 * 
 * Standard events tracked:
 * - download_click: User clicks download button (windows/macos/linux)
 * - cta_click: User clicks any CTA button (hero, pricing, final, navbar)
 * - pricing_view: User scrolls to pricing section
 * - faq_expand: User opens an FAQ item
 * - legal_page_view: User visits privacy/terms/refund/cookies
 * - outbound_click: User clicks external link
 * - scroll_depth: User scrolls 25%, 50%, 75%, 100%
 */

(function () {
  'use strict';

  // Guard: only run if gtag is available
  if (typeof gtag !== 'function') return;

  // ── Download Clicks ──────────────────────────────────────────────
  document.querySelectorAll('[data-download]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var platform = this.getAttribute('data-download');
      gtag('event', 'download_click', {
        event_category: 'engagement',
        event_label: platform,
        platform: platform,
      });
    });
  });

  // ── CTA Button Clicks ────────────────────────────────────────────
  var ctaSelectors = [
    { selector: '.hero .btn-primary', label: 'hero_cta' },
    { selector: '.nav-cta', label: 'navbar_download' },
    { selector: '.final-cta .btn-primary', label: 'final_cta' },
    { selector: '.plan-cta', label: 'pricing_cta' },
  ];

  ctaSelectors.forEach(function (item) {
    document.querySelectorAll(item.selector).forEach(function (btn) {
      btn.addEventListener('click', function () {
        var planName = '';
        var planCard = this.closest('.plan-card');
        if (planCard) {
          var nameEl = planCard.querySelector('.plan-name');
          planName = nameEl ? nameEl.textContent.trim() : '';
        }
        gtag('event', 'cta_click', {
          event_category: 'engagement',
          event_label: item.label,
          cta_location: item.label,
          plan_name: planName || undefined,
        });
      });
    });
  });

  // ── Pricing Section View ──────────────────────────────────────────
  var pricingSection = document.getElementById('pricing');
  if (pricingSection) {
    var pricingObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            gtag('event', 'pricing_view', {
              event_category: 'engagement',
              event_label: 'pricing_section',
            });
            pricingObserver.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    pricingObserver.observe(pricingSection);
  }

  // ── FAQ Expand ────────────────────────────────────────────────────
  document.querySelectorAll('.faq-question').forEach(function (q) {
    q.addEventListener('click', function () {
      var questionText = this.textContent.trim().substring(0, 80);
      gtag('event', 'faq_expand', {
        event_category: 'engagement',
        event_label: questionText,
        question: questionText,
      });
    });
  });

  // ── Outbound Link Clicks ──────────────────────────────────────────
  document.querySelectorAll('a[href^="http"]').forEach(function (link) {
    if (link.hostname === window.location.hostname) return;
    link.addEventListener('click', function () {
      gtag('event', 'outbound_click', {
        event_category: 'outbound',
        event_label: this.href,
        url: this.href,
      });
    });
  });

  // ── Scroll Depth ──────────────────────────────────────────────────
  var scrollMarks = { 25: false, 50: false, 75: false, 100: false };

  function getScrollPercent() {
    var h = document.documentElement;
    var b = document.body;
    var scrollTop = h.scrollTop || b.scrollTop;
    var scrollHeight = (h.scrollHeight || b.scrollHeight) - h.clientHeight;
    return scrollHeight > 0 ? Math.round((scrollTop / scrollHeight) * 100) : 0;
  }

  var scrollTimer;
  window.addEventListener('scroll', function () {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(function () {
      var pct = getScrollPercent();
      [25, 50, 75, 100].forEach(function (mark) {
        if (pct >= mark && !scrollMarks[mark]) {
          scrollMarks[mark] = true;
          gtag('event', 'scroll_depth', {
            event_category: 'engagement',
            event_label: mark + '%',
            depth: mark,
          });
        }
      });
    }, 150);
  });

  // ── Legal Page View ───────────────────────────────────────────────
  var path = window.location.pathname;
  var legalPages = ['privacy', 'terms', 'refund', 'cookies'];
  legalPages.forEach(function (page) {
    if (path.includes('/' + page)) {
      gtag('event', 'legal_page_view', {
        event_category: 'engagement',
        event_label: page,
        page_type: page,
      });
    }
  });
})();
