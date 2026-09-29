/**
 * Veilus GA4 Custom Events — Analytics Helper
 * 
 * Standard events tracked:
 * - download_click: User clicks download button (windows/macos)
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
  // Mỗi nút cần đếm gắn data-cta="<nhãn>" (hero_cta, navbar_download, final_cta, pricing_cta,
  // footer_download); nút trong bảng giá gắn thêm data-plan="<mã gói>" — mã không dịch (free, monthly,
  // solo, team5…), để plan_name không tách thành 8 giá trị theo ngôn ngữ. Không dựa vào tên lớp CSS.
  document.querySelectorAll('[data-cta]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var label = this.getAttribute('data-cta');
      gtag('event', 'cta_click', {
        event_category: 'engagement',
        event_label: label,
        cta_location: label,
        plan_name: this.getAttribute('data-plan') || undefined,
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
      // Lúc click, <details> chưa đổi trạng thái: đang mở nghĩa là cú bấm này ĐÓNG câu hỏi — không đếm.
      if (this.parentElement.open) return;
      // Chỉ lấy chữ câu hỏi: <summary> còn chứa số thứ tự (<em>) và icon ligature (.ms, chữ "add").
      var questionEl = this.querySelector('span:not(.ms)') || this;
      var questionText = questionEl.textContent.trim().substring(0, 80);
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
