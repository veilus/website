/** Cookie Policy translations – keyed by Lang code */
export const cookieTranslations: Record<string, {
    title: string;
    description: string;
    lastUpdated: string;
    content: string;
}> = {
    en: {
        title: "Cookie Policy",
        description: "How Veilus uses cookies and similar technologies on our website.",
        lastUpdated: "March 7, 2026",
        content: `
<h2>1. Introduction</h2>
<p>This Cookie Policy explains how Veilus ("we", "our", "us") uses cookies and similar technologies on our website <strong>veilus.io</strong> and related subdomains. By using our website, you consent to the use of cookies as described in this policy.</p>

<h2>2. What Are Cookies?</h2>
<p>Cookies are small text files stored on your device by your web browser when you visit a website. They help websites remember your preferences, understand how you use the site, and improve your experience.</p>

<h2>3. Types of Cookies We Use</h2>
<table><thead><tr><th>Type</th><th>Purpose</th><th>Duration</th><th>Required</th></tr></thead><tbody>
  <tr><td><strong>Essential</strong></td><td>Authentication, security, basic functionality</td><td>Session / 30 days</td><td>Yes</td></tr>
  <tr><td><strong>Preferences</strong></td><td>Language selection, theme preference, UI settings</td><td>1 year</td><td>No</td></tr>
  <tr><td><strong>Analytics</strong></td><td>Anonymized usage statistics (Google Analytics 4)</td><td>2 years</td><td>No</td></tr>
</tbody></table>

<h2>4. Essential Cookies</h2>
<p>These cookies are strictly necessary for the website to function. They cannot be disabled without breaking core functionality.</p>
<table><thead><tr><th>Cookie</th><th>Purpose</th><th>Duration</th></tr></thead><tbody>
  <tr><td><code>veilus_session</code></td><td>User authentication session</td><td>30 days</td></tr>
  <tr><td><code>csrf_token</code></td><td>Cross-site request forgery protection</td><td>Session</td></tr>
  <tr><td><code>cf_clearance</code></td><td>Cloudflare security verification</td><td>30 minutes</td></tr>
</tbody></table>

<h2>5. Preference Cookies</h2>
<p>These cookies remember your choices to provide a personalized experience.</p>
<table><thead><tr><th>Cookie</th><th>Purpose</th><th>Duration</th></tr></thead><tbody>
  <tr><td><code>veilus_lang</code></td><td>Preferred language</td><td>1 year</td></tr>
  <tr><td><code>veilus_theme</code></td><td>Dark/light mode preference</td><td>1 year</td></tr>
</tbody></table>

<h2>6. Analytics Cookies</h2>
<p>We use Google Analytics 4 (GA4) to understand how visitors use our website. GA4 collects anonymized data including:</p>
<ul>
  <li>Pages visited and time spent</li>
  <li>Referral sources (how you found us)</li>
  <li>Device type, browser, and operating system</li>
  <li>Geographic region (country-level only)</li>
</ul>
<p><strong>GA4 is configured with:</strong></p>
<ul>
  <li>IP anonymization enabled</li>
  <li>No cross-site tracking</li>
  <li>Data retention set to 14 months</li>
  <li>No advertising features enabled</li>
</ul>
<table><thead><tr><th>Cookie</th><th>Purpose</th><th>Duration</th></tr></thead><tbody>
  <tr><td><code>_ga</code></td><td>Distinguish unique users</td><td>2 years</td></tr>
  <tr><td><code>_ga_*</code></td><td>Session state persistence</td><td>2 years</td></tr>
</tbody></table>

<h2>7. Third-Party Cookies</h2>
<p>We <strong>do not</strong> use:</p>
<ul>
  <li>Advertising or remarketing cookies</li>
  <li>Social media tracking pixels</li>
  <li>Third-party analytics beyond GA4</li>
  <li>Any cookies that sell your data to third parties</li>
</ul>

<h2>8. The Veilus Desktop Application</h2>
<p>This Cookie Policy applies to the <strong>veilus.io website only</strong>. The Veilus desktop application does not use tracking cookies. Browser profiles within Veilus have their own isolated cookie stores that are entirely under your control.</p>

<h2>9. Managing Cookies</h2>
<h3>Browser Settings</h3>
<p>You can control cookies through your browser settings:</p>
<ul>
  <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies</li>
  <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies</li>
  <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
  <li><strong>Edge:</strong> Settings → Cookies and site permissions</li>
</ul>

<h3>Opt-Out of Analytics</h3>
<p>To opt out of Google Analytics tracking:</p>
<ul>
  <li>Install the <a href="https://tools.google.com/dlpage/gaoptout">Google Analytics Opt-out Browser Add-on</a></li>
  <li>Or enable "Do Not Track" in your browser settings</li>
</ul>

<h2>10. Changes to This Policy</h2>
<p>We may update this Cookie Policy periodically. Changes will be posted on this page with an updated "Last Updated" date. Continued use of the website after changes constitutes acceptance of the updated policy.</p>

<h2>11. Contact</h2>
<ul>
  <li><strong>Email:</strong> <a href="mailto:privacy@veilus.io">privacy@veilus.io</a></li>
  <li><strong>Website:</strong> <a href="https://veilus.io">veilus.io</a></li>
</ul>`
    },

    vi: {
        title: "Chính sách Cookie",
        description: "Cách Veilus sử dụng cookie và công nghệ tương tự trên website.",
        lastUpdated: "7 tháng 3, 2026",
        content: `
<h2>1. Giới thiệu</h2>
<p>Chính sách Cookie này giải thích cách Veilus ("chúng tôi") sử dụng cookie và công nghệ tương tự trên website <strong>veilus.io</strong> và các tên miền phụ liên quan.</p>

<h2>2. Cookie là gì?</h2>
<p>Cookie là các tệp văn bản nhỏ được lưu trữ trên thiết bị của bạn bởi trình duyệt khi bạn truy cập website. Chúng giúp website ghi nhớ tùy chọn của bạn và cải thiện trải nghiệm.</p>

<h2>3. Các loại Cookie chúng tôi sử dụng</h2>
<table><thead><tr><th>Loại</th><th>Mục đích</th><th>Thời hạn</th><th>Bắt buộc</th></tr></thead><tbody>
  <tr><td><strong>Thiết yếu</strong></td><td>Xác thực, bảo mật, chức năng cơ bản</td><td>Phiên / 30 ngày</td><td>Có</td></tr>
  <tr><td><strong>Tùy chọn</strong></td><td>Ngôn ngữ, giao diện, cài đặt UI</td><td>1 năm</td><td>Không</td></tr>
  <tr><td><strong>Phân tích</strong></td><td>Thống kê sử dụng ẩn danh (Google Analytics 4)</td><td>2 năm</td><td>Không</td></tr>
</tbody></table>

<h2>4. Cookie Thiết yếu</h2>
<p>Các cookie này cần thiết để website hoạt động. Không thể tắt mà không ảnh hưởng đến chức năng.</p>
<table><thead><tr><th>Cookie</th><th>Mục đích</th><th>Thời hạn</th></tr></thead><tbody>
  <tr><td><code>veilus_session</code></td><td>Phiên xác thực người dùng</td><td>30 ngày</td></tr>
  <tr><td><code>csrf_token</code></td><td>Bảo vệ chống tấn công CSRF</td><td>Phiên</td></tr>
  <tr><td><code>cf_clearance</code></td><td>Xác minh bảo mật Cloudflare</td><td>30 phút</td></tr>
</tbody></table>

<h2>5. Cookie Tùy chọn</h2>
<table><thead><tr><th>Cookie</th><th>Mục đích</th><th>Thời hạn</th></tr></thead><tbody>
  <tr><td><code>veilus_lang</code></td><td>Ngôn ngữ ưa thích</td><td>1 năm</td></tr>
  <tr><td><code>veilus_theme</code></td><td>Giao diện sáng/tối</td><td>1 năm</td></tr>
</tbody></table>

<h2>6. Cookie Phân tích</h2>
<p>Chúng tôi sử dụng Google Analytics 4 (GA4) để hiểu cách khách truy cập sử dụng website. GA4 thu thập dữ liệu ẩn danh bao gồm:</p>
<ul>
  <li>Trang đã truy cập và thời gian duyệt</li>
  <li>Nguồn truy cập (bạn tìm thấy chúng tôi từ đâu)</li>
  <li>Loại thiết bị, trình duyệt, hệ điều hành</li>
  <li>Khu vực địa lý (chỉ cấp quốc gia)</li>
</ul>
<p><strong>GA4 được cấu hình với:</strong> Ẩn danh IP, không theo dõi cross-site, lưu giữ dữ liệu 14 tháng, không bật tính năng quảng cáo.</p>

<h2>7. Cookie Bên thứ ba</h2>
<p>Chúng tôi <strong>không</strong> sử dụng cookie quảng cáo, pixel theo dõi mạng xã hội, hoặc bất kỳ cookie nào bán dữ liệu của bạn cho bên thứ ba.</p>

<h2>8. Ứng dụng Veilus Desktop</h2>
<p>Chính sách Cookie này chỉ áp dụng cho <strong>website veilus.io</strong>. Ứng dụng Veilus không sử dụng cookie theo dõi. Các browser profiles trong Veilus có kho cookie riêng biệt hoàn toàn do bạn kiểm soát.</p>

<h2>9. Quản lý Cookie</h2>
<p>Bạn có thể kiểm soát cookie thông qua cài đặt trình duyệt hoặc cài tiện ích <a href="https://tools.google.com/dlpage/gaoptout">Google Analytics Opt-out</a>.</p>

<h2>10. Thay đổi Chính sách</h2>
<p>Chúng tôi có thể cập nhật Chính sách Cookie định kỳ. Thay đổi sẽ được đăng trên trang này.</p>

<h2>11. Liên hệ</h2>
<ul>
  <li><strong>Email:</strong> <a href="mailto:privacy@veilus.io">privacy@veilus.io</a></li>
  <li><strong>Website:</strong> <a href="https://veilus.io">veilus.io</a></li>
</ul>`
    },

    zh: {
        title: "Cookie政策",
        description: "Veilus如何在网站上使用Cookie和类似技术。",
        lastUpdated: "2026年3月7日",
        content: `
<h2>1. 简介</h2><p>本Cookie政策说明Veilus如何在<strong>veilus.io</strong>网站上使用Cookie。</p>
<h2>2. Cookie类型</h2>
<table><thead><tr><th>类型</th><th>用途</th><th>时长</th><th>必需</th></tr></thead><tbody>
<tr><td><strong>必要</strong></td><td>身份验证、安全、基本功能</td><td>会话/30天</td><td>是</td></tr>
<tr><td><strong>偏好</strong></td><td>语言、主题偏好</td><td>1年</td><td>否</td></tr>
<tr><td><strong>分析</strong></td><td>匿名使用统计(GA4)</td><td>2年</td><td>否</td></tr>
</tbody></table>
<h2>3-7. 详细说明</h2>
<p>必要Cookie包括：<code>veilus_session</code>(认证)、<code>csrf_token</code>(安全)、<code>cf_clearance</code>(Cloudflare)。分析Cookie使用Google Analytics 4，启用IP匿名化，无广告功能。我们<strong>不</strong>使用广告Cookie、社交媒体追踪或向第三方出售数据。</p>
<h2>8. 桌面应用</h2><p>本政策仅适用于veilus.io网站。Veilus桌面应用不使用追踪Cookie。</p>
<h2>9-11. 管理与联系</h2>
<p>通过浏览器设置管理Cookie，或安装<a href="https://tools.google.com/dlpage/gaoptout">GA opt-out插件</a>。联系：<a href="mailto:privacy@veilus.io">privacy@veilus.io</a></p>`
    },

    ru: {
        title: "Политика файлов Cookie",
        description: "Как Veilus использует файлы cookie на своём сайте.",
        lastUpdated: "7 марта 2026",
        content: `
<h2>1. Введение</h2><p>Эта политика объясняет, как Veilus использует cookie на сайте <strong>veilus.io</strong>.</p>
<h2>2. Типы Cookie</h2>
<table><thead><tr><th>Тип</th><th>Назначение</th><th>Срок</th><th>Обязательно</th></tr></thead><tbody>
<tr><td><strong>Необходимые</strong></td><td>Аутентификация, безопасность</td><td>Сессия/30 дней</td><td>Да</td></tr>
<tr><td><strong>Настройки</strong></td><td>Язык, тема оформления</td><td>1 год</td><td>Нет</td></tr>
<tr><td><strong>Аналитика</strong></td><td>Анонимная статистика (GA4)</td><td>2 года</td><td>Нет</td></tr>
</tbody></table>
<h2>3-7. Подробности</h2>
<p>Мы <strong>не</strong> используем рекламные cookie или пиксели соцсетей. Google Analytics 4 настроен с анонимизацией IP.</p>
<h2>8-11. Приложение и контакты</h2>
<p>Эта политика касается только сайта. Приложение Veilus не использует отслеживающие cookie. Контакт: <a href="mailto:privacy@veilus.io">privacy@veilus.io</a></p>`
    },

    es: {
        title: "Política de Cookies",
        description: "Cómo Veilus utiliza cookies en nuestro sitio web.",
        lastUpdated: "7 de marzo de 2026",
        content: `
<h2>1. Introducción</h2><p>Esta política explica cómo Veilus usa cookies en <strong>veilus.io</strong>.</p>
<h2>2. Tipos de Cookies</h2>
<table><thead><tr><th>Tipo</th><th>Propósito</th><th>Duración</th><th>Requerido</th></tr></thead><tbody>
<tr><td><strong>Esenciales</strong></td><td>Autenticación, seguridad</td><td>Sesión/30 días</td><td>Sí</td></tr>
<tr><td><strong>Preferencias</strong></td><td>Idioma, tema</td><td>1 año</td><td>No</td></tr>
<tr><td><strong>Analíticas</strong></td><td>Estadísticas anónimas (GA4)</td><td>2 años</td><td>No</td></tr>
</tbody></table>
<h2>3-7. Detalles</h2>
<p><strong>No</strong> usamos cookies publicitarias ni píxeles de redes sociales. GA4 configurado con anonimización de IP.</p>
<h2>8-11. Aplicación y contacto</h2>
<p>Esta política aplica solo al sitio web. La app Veilus no usa cookies de rastreo. Contacto: <a href="mailto:privacy@veilus.io">privacy@veilus.io</a></p>`
    },

    pt: {
        title: "Política de Cookies",
        description: "Como a Veilus utiliza cookies no nosso site.",
        lastUpdated: "7 de março de 2026",
        content: `
<h2>1. Introdução</h2><p>Esta política explica como a Veilus usa cookies em <strong>veilus.io</strong>.</p>
<h2>2. Tipos de Cookies</h2>
<table><thead><tr><th>Tipo</th><th>Finalidade</th><th>Duração</th><th>Necessário</th></tr></thead><tbody>
<tr><td><strong>Essenciais</strong></td><td>Autenticação, segurança</td><td>Sessão/30 dias</td><td>Sim</td></tr>
<tr><td><strong>Preferências</strong></td><td>Idioma, tema</td><td>1 ano</td><td>Não</td></tr>
<tr><td><strong>Analíticos</strong></td><td>Estatísticas anônimas (GA4)</td><td>2 anos</td><td>Não</td></tr>
</tbody></table>
<h2>3-7. Detalhes</h2>
<p><strong>Não</strong> usamos cookies de publicidade ou pixels de redes sociais. GA4 com anonimização de IP.</p>
<h2>8-11. Aplicativo e contato</h2>
<p>Esta política aplica-se apenas ao site. O app Veilus não usa cookies de rastreamento. Contato: <a href="mailto:privacy@veilus.io">privacy@veilus.io</a></p>`
    },

    id: {
        title: "Kebijakan Cookie",
        description: "Bagaimana Veilus menggunakan cookie di situs web kami.",
        lastUpdated: "7 Maret 2026",
        content: `
<h2>1. Pendahuluan</h2><p>Kebijakan ini menjelaskan bagaimana Veilus menggunakan cookie di <strong>veilus.io</strong>.</p>
<h2>2. Jenis Cookie</h2>
<table><thead><tr><th>Jenis</th><th>Tujuan</th><th>Durasi</th><th>Wajib</th></tr></thead><tbody>
<tr><td><strong>Esensial</strong></td><td>Otentikasi, keamanan</td><td>Sesi/30 hari</td><td>Ya</td></tr>
<tr><td><strong>Preferensi</strong></td><td>Bahasa, tema</td><td>1 tahun</td><td>Tidak</td></tr>
<tr><td><strong>Analitik</strong></td><td>Statistik anonim (GA4)</td><td>2 tahun</td><td>Tidak</td></tr>
</tbody></table>
<h2>3-7. Detail</h2>
<p>Kami <strong>tidak</strong> menggunakan cookie iklan atau pixel media sosial. GA4 dengan anonimisasi IP.</p>
<h2>8-11. Aplikasi dan kontak</h2>
<p>Kebijakan ini hanya berlaku untuk situs web. Aplikasi Veilus tidak menggunakan cookie pelacakan. Kontak: <a href="mailto:privacy@veilus.io">privacy@veilus.io</a></p>`
    },

    tr: {
        title: "Çerez Politikası",
        description: "Veilus web sitesinde çerezleri nasıl kullanır.",
        lastUpdated: "7 Mart 2026",
        content: `
<h2>1. Giriş</h2><p>Bu politika, Veilus'un <strong>veilus.io</strong> web sitesinde çerezleri nasıl kullandığını açıklar.</p>
<h2>2. Çerez Türleri</h2>
<table><thead><tr><th>Tür</th><th>Amaç</th><th>Süre</th><th>Gerekli</th></tr></thead><tbody>
<tr><td><strong>Gerekli</strong></td><td>Kimlik doğrulama, güvenlik</td><td>Oturum/30 gün</td><td>Evet</td></tr>
<tr><td><strong>Tercihler</strong></td><td>Dil, tema</td><td>1 yıl</td><td>Hayır</td></tr>
<tr><td><strong>Analitik</strong></td><td>Anonim istatistikler (GA4)</td><td>2 yıl</td><td>Hayır</td></tr>
</tbody></table>
<h2>3-7. Detaylar</h2>
<p>Reklam çerezleri veya sosyal medya pikselleri <strong>kullanmıyoruz</strong>. GA4 IP anonimleştirme ile yapılandırılmıştır.</p>
<h2>8-11. Uygulama ve iletişim</h2>
<p>Bu politika yalnızca web sitesi için geçerlidir. Veilus uygulaması izleme çerezi kullanmaz. İletişim: <a href="mailto:privacy@veilus.io">privacy@veilus.io</a></p>`
    }
};
