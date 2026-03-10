/** Privacy Policy translations – keyed by Lang code */
export const privacyTranslations: Record<string, {
    title: string;
    description: string;
    lastUpdated: string;
    content: string;
}> = {
    en: {
        title: "Privacy Policy",
        description: "How Veilus collects, uses, and protects your data.",
        lastUpdated: "March 6, 2026",
        content: `
<h2>1. Introduction</h2>
<p>Veilus ("we", "our", "us") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you use the Veilus application and website (collectively, the "Service").</p>

<h2>2. Data We Collect</h2>
<h3>2.1 Account Data</h3>
<p>When you create an account, we collect:</p>
<ul>
  <li><strong>Email address</strong> — for authentication and communication</li>
  <li><strong>Payment information</strong> — processed securely by Stripe; we do not store credit card numbers</li>
</ul>
<h3>2.2 Usage Data (Opt-in Only)</h3>
<p>If you opt in to telemetry, we collect <strong>aggregate, anonymized</strong> usage statistics:</p>
<ul>
  <li>Feature usage frequency (e.g., how often automation is used)</li>
  <li>Application performance metrics (startup time, error rates)</li>
  <li>Operating system and Veilus version</li>
</ul>
<p><strong>We never collect:</strong></p>
<ul>
  <li>Browsing history or visited URLs</li>
  <li>Profile contents or fingerprint configurations</li>
  <li>Automation scripts or workflow data</li>
  <li>IP addresses for tracking purposes</li>
  <li>Any personally identifiable information (PII) through telemetry</li>
</ul>
<h3>2.3 Browser Profile Data</h3>
<p>All browser profile data (fingerprints, cookies, sessions, automation scripts) is stored <strong>locally on your device</strong>. If you use Veilus Sync, data is encrypted end-to-end before transmission — <strong>we cannot read your synced data</strong>.</p>

<h2>3. How We Use Your Data</h2>
<table><thead><tr><th>Purpose</th><th>Legal Basis</th></tr></thead><tbody>
  <tr><td>Provide and maintain the Service</td><td>Contract performance</td></tr>
  <tr><td>Process payments</td><td>Contract performance</td></tr>
  <tr><td>Send important service updates</td><td>Legitimate interest</td></tr>
  <tr><td>Improve the product (if telemetry opted in)</td><td>Consent</td></tr>
  <tr><td>Respond to support requests</td><td>Legitimate interest</td></tr>
</tbody></table>

<h2>4. Data Storage & Security</h2>
<ul>
  <li><strong>Local storage:</strong> Profile data, scripts, and settings are stored on your local machine.</li>
  <li><strong>Cloud infrastructure:</strong> Account data is stored on Supabase (PostgreSQL) with encryption at rest.</li>
  <li><strong>Sync encryption:</strong> Veilus Sync uses hierarchical end-to-end encryption (AES-256-GCM). Encryption keys are derived locally and never transmitted to our servers.</li>
  <li><strong>Edge hosting:</strong> Our website and API run on Cloudflare Workers/Pages with global edge distribution.</li>
</ul>

<h2>5. Third-Party Services</h2>
<p>We use the following third-party services:</p>
<table><thead><tr><th>Service</th><th>Purpose</th><th>Data Shared</th></tr></thead><tbody>
  <tr><td>Stripe</td><td>Payment processing</td><td>Payment details (handled by Stripe directly)</td></tr>
  <tr><td>Supabase</td><td>Authentication & database</td><td>Email, account metadata</td></tr>
  <tr><td>Resend</td><td>Transactional email</td><td>Email address</td></tr>
  <tr><td>Plausible Analytics</td><td>Website analytics</td><td>Aggregated, cookieless page views (no PII)</td></tr>
  <tr><td>Cloudflare</td><td>Hosting & CDN</td><td>Standard web request data</td></tr>
</tbody></table>
<p>We do not sell, rent, or share your personal data with third parties for advertising purposes.</p>

<h2>6. Your Rights (GDPR & Global)</h2>
<p>You have the right to:</p>
<ul>
  <li><strong>Access</strong> your personal data</li>
  <li><strong>Correct</strong> inaccurate information</li>
  <li><strong>Delete</strong> your account and associated data</li>
  <li><strong>Export</strong> your data in a portable format</li>
  <li><strong>Withdraw consent</strong> for telemetry at any time</li>
  <li><strong>Object</strong> to processing based on legitimate interest</li>
</ul>
<p>To exercise any of these rights, contact us at <a href="mailto:privacy@veilus.io">privacy@veilus.io</a>.</p>

<h2>7. Data Retention</h2>
<ul>
  <li><strong>Active accounts:</strong> Data is retained while your account is active.</li>
  <li><strong>Deleted accounts:</strong> All personal data is deleted within 30 days of account deletion. Payment records may be retained for up to 7 years for legal and tax compliance.</li>
  <li><strong>Telemetry data:</strong> Aggregate analytics are retained for 24 months.</li>
</ul>

<h2>8. Cookies</h2>
<p>The Veilus website uses <strong>minimal cookies</strong>:</p>
<ul>
  <li><strong>Essential cookies:</strong> Session authentication only</li>
  <li><strong>Analytics:</strong> We use Plausible Analytics, which is cookieless and GDPR-compliant by design</li>
</ul>
<p>We do not use advertising cookies or third-party tracking cookies.</p>

<h2>9. Children's Privacy</h2>
<p>Veilus is not intended for use by individuals under 16 years of age. We do not knowingly collect personal data from children.</p>

<h2>10. Changes to This Policy</h2>
<p>We may update this Privacy Policy from time to time. We will notify registered users via email of any material changes at least 14 days before they take effect.</p>

<h2>11. Contact</h2>
<p>If you have questions about this Privacy Policy:</p>
<ul>
  <li><strong>Email:</strong> <a href="mailto:privacy@veilus.io">privacy@veilus.io</a></li>
  <li><strong>Website:</strong> <a href="https://veilus.io">veilus.io</a></li>
</ul>`
    },

    vi: {
        title: "Chính sách Bảo mật",
        description: "Cách Veilus thu thập, sử dụng và bảo vệ dữ liệu của bạn.",
        lastUpdated: "6 tháng 3, 2026",
        content: `
<h2>1. Giới thiệu</h2>
<p>Veilus ("chúng tôi") tôn trọng quyền riêng tư của bạn và cam kết bảo vệ dữ liệu cá nhân. Chính sách Bảo mật này giải thích cách chúng tôi thu thập, sử dụng và bảo vệ thông tin khi bạn sử dụng ứng dụng và website Veilus (gọi chung là "Dịch vụ").</p>

<h2>2. Dữ liệu chúng tôi thu thập</h2>
<h3>2.1 Dữ liệu tài khoản</h3>
<p>Khi bạn tạo tài khoản, chúng tôi thu thập:</p>
<ul>
  <li><strong>Địa chỉ email</strong> — để xác thực và liên lạc</li>
  <li><strong>Thông tin thanh toán</strong> — được xử lý bảo mật bởi Stripe; chúng tôi không lưu trữ số thẻ tín dụng</li>
</ul>
<h3>2.2 Dữ liệu sử dụng (Chỉ khi bạn đồng ý)</h3>
<p>Nếu bạn bật telemetry, chúng tôi thu thập thống kê sử dụng <strong>tổng hợp, ẩn danh</strong>:</p>
<ul>
  <li>Tần suất sử dụng tính năng (ví dụ: tần suất dùng automation)</li>
  <li>Chỉ số hiệu suất ứng dụng (thời gian khởi động, tỷ lệ lỗi)</li>
  <li>Hệ điều hành và phiên bản Veilus</li>
</ul>
<p><strong>Chúng tôi không bao giờ thu thập:</strong></p>
<ul>
  <li>Lịch sử duyệt web hoặc URL đã truy cập</li>
  <li>Nội dung profile hoặc cấu hình fingerprint</li>
  <li>Script automation hoặc dữ liệu workflow</li>
  <li>Địa chỉ IP cho mục đích theo dõi</li>
  <li>Bất kỳ thông tin nhận dạng cá nhân (PII) nào qua telemetry</li>
</ul>
<h3>2.3 Dữ liệu Browser Profile</h3>
<p>Tất cả dữ liệu browser profile (fingerprint, cookie, session, script automation) được lưu <strong>cục bộ trên thiết bị của bạn</strong>. Nếu bạn sử dụng Veilus Sync, dữ liệu được mã hóa đầu-cuối trước khi truyền — <strong>chúng tôi không thể đọc dữ liệu đồng bộ của bạn</strong>.</p>

<h2>3. Cách chúng tôi sử dụng dữ liệu</h2>
<table><thead><tr><th>Mục đích</th><th>Cơ sở pháp lý</th></tr></thead><tbody>
  <tr><td>Cung cấp và duy trì Dịch vụ</td><td>Thực hiện hợp đồng</td></tr>
  <tr><td>Xử lý thanh toán</td><td>Thực hiện hợp đồng</td></tr>
  <tr><td>Gửi cập nhật dịch vụ quan trọng</td><td>Lợi ích hợp pháp</td></tr>
  <tr><td>Cải thiện sản phẩm (nếu bật telemetry)</td><td>Sự đồng ý</td></tr>
  <tr><td>Phản hồi yêu cầu hỗ trợ</td><td>Lợi ích hợp pháp</td></tr>
</tbody></table>

<h2>4. Lưu trữ & Bảo mật dữ liệu</h2>
<ul>
  <li><strong>Lưu trữ cục bộ:</strong> Dữ liệu profile, script và cài đặt được lưu trên máy tính của bạn.</li>
  <li><strong>Hạ tầng đám mây:</strong> Dữ liệu tài khoản được lưu trên Supabase (PostgreSQL) với mã hóa dữ liệu nghỉ.</li>
  <li><strong>Mã hóa đồng bộ:</strong> Veilus Sync sử dụng mã hóa đầu-cuối theo cấp bậc (AES-256-GCM). Khóa mã hóa được tạo cục bộ và không bao giờ truyền đến máy chủ.</li>
  <li><strong>Hosting biên:</strong> Website và API chạy trên Cloudflare Workers/Pages với phân phối biên toàn cầu.</li>
</ul>

<h2>5. Dịch vụ bên thứ ba</h2>
<p>Chúng tôi sử dụng các dịch vụ bên thứ ba sau:</p>
<table><thead><tr><th>Dịch vụ</th><th>Mục đích</th><th>Dữ liệu chia sẻ</th></tr></thead><tbody>
  <tr><td>Stripe</td><td>Xử lý thanh toán</td><td>Chi tiết thanh toán (do Stripe xử lý trực tiếp)</td></tr>
  <tr><td>Supabase</td><td>Xác thực & cơ sở dữ liệu</td><td>Email, metadata tài khoản</td></tr>
  <tr><td>Resend</td><td>Email giao dịch</td><td>Địa chỉ email</td></tr>
  <tr><td>Plausible Analytics</td><td>Phân tích website</td><td>Lượt xem tổng hợp, không cookie (không PII)</td></tr>
  <tr><td>Cloudflare</td><td>Hosting & CDN</td><td>Dữ liệu yêu cầu web tiêu chuẩn</td></tr>
</tbody></table>
<p>Chúng tôi không bán, cho thuê hoặc chia sẻ dữ liệu cá nhân với bên thứ ba cho mục đích quảng cáo.</p>

<h2>6. Quyền của bạn (GDPR & Toàn cầu)</h2>
<p>Bạn có quyền:</p>
<ul>
  <li><strong>Truy cập</strong> dữ liệu cá nhân</li>
  <li><strong>Sửa</strong> thông tin không chính xác</li>
  <li><strong>Xóa</strong> tài khoản và dữ liệu liên quan</li>
  <li><strong>Xuất</strong> dữ liệu ở định dạng di động</li>
  <li><strong>Rút lại sự đồng ý</strong> cho telemetry bất cứ lúc nào</li>
  <li><strong>Phản đối</strong> xử lý dựa trên lợi ích hợp pháp</li>
</ul>
<p>Để thực hiện bất kỳ quyền nào, liên hệ <a href="mailto:privacy@veilus.io">privacy@veilus.io</a>.</p>

<h2>7. Lưu giữ dữ liệu</h2>
<ul>
  <li><strong>Tài khoản đang hoạt động:</strong> Dữ liệu được lưu giữ khi tài khoản còn hoạt động.</li>
  <li><strong>Tài khoản đã xóa:</strong> Tất cả dữ liệu cá nhân sẽ bị xóa trong vòng 30 ngày. Hồ sơ thanh toán có thể được lưu đến 7 năm để tuân thủ pháp luật và thuế.</li>
  <li><strong>Dữ liệu telemetry:</strong> Phân tích tổng hợp được lưu giữ 24 tháng.</li>
</ul>

<h2>8. Cookie</h2>
<p>Website Veilus sử dụng <strong>cookie tối thiểu</strong>:</p>
<ul>
  <li><strong>Cookie thiết yếu:</strong> Chỉ xác thực phiên</li>
  <li><strong>Phân tích:</strong> Chúng tôi sử dụng Plausible Analytics, không cookie và tuân thủ GDPR</li>
</ul>
<p>Chúng tôi không sử dụng cookie quảng cáo hoặc cookie theo dõi bên thứ ba.</p>

<h2>9. Quyền riêng tư trẻ em</h2>
<p>Veilus không dành cho người dưới 16 tuổi. Chúng tôi không cố ý thu thập dữ liệu cá nhân từ trẻ em.</p>

<h2>10. Thay đổi chính sách</h2>
<p>Chúng tôi có thể cập nhật Chính sách Bảo mật này. Chúng tôi sẽ thông báo cho người dùng đã đăng ký qua email về bất kỳ thay đổi quan trọng nào ít nhất 14 ngày trước khi có hiệu lực.</p>

<h2>11. Liên hệ</h2>
<p>Nếu bạn có câu hỏi về Chính sách Bảo mật:</p>
<ul>
  <li><strong>Email:</strong> <a href="mailto:privacy@veilus.io">privacy@veilus.io</a></li>
  <li><strong>Website:</strong> <a href="https://veilus.io">veilus.io</a></li>
</ul>`
    },

    zh: {
        title: "隐私政策",
        description: "Veilus如何收集、使用和保护您的数据。",
        lastUpdated: "2026年3月6日",
        content: `
<h2>1. 简介</h2>
<p>Veilus（"我们"）尊重您的隐私，并致力于保护您的个人数据。本隐私政策说明了当您使用Veilus应用程序和网站（统称"服务"）时，我们如何收集、使用和保护您的信息。</p>

<h2>2. 我们收集的数据</h2>
<h3>2.1 账户数据</h3>
<p>创建账户时，我们收集：</p>
<ul><li><strong>电子邮件地址</strong> — 用于身份验证和通信</li><li><strong>付款信息</strong> — 由Stripe安全处理；我们不存储信用卡号</li></ul>
<h3>2.2 使用数据（仅限选择加入）</h3>
<p>如果您选择加入遥测，我们收集<strong>汇总的匿名</strong>使用统计数据。</p>
<p><strong>我们从不收集：</strong>浏览历史、配置文件内容、自动化脚本、IP地址或任何个人身份信息。</p>
<h3>2.3 浏览器配置文件数据</h3>
<p>所有浏览器配置文件数据存储在<strong>您的本地设备</strong>上。Veilus Sync使用端到端加密 — <strong>我们无法读取您的同步数据</strong>。</p>

<h2>3. 数据使用方式</h2>
<table><thead><tr><th>目的</th><th>法律依据</th></tr></thead><tbody><tr><td>提供和维护服务</td><td>合同履行</td></tr><tr><td>处理付款</td><td>合同履行</td></tr><tr><td>发送重要服务更新</td><td>合法利益</td></tr><tr><td>改进产品</td><td>同意</td></tr></tbody></table>

<h2>4. 数据存储与安全</h2>
<ul><li><strong>本地存储：</strong>配置文件数据存储在您的本地计算机上。</li><li><strong>云基础设施：</strong>账户数据存储在Supabase（PostgreSQL），具有静态加密。</li><li><strong>同步加密：</strong>Veilus Sync使用AES-256-GCM端到端加密。</li></ul>

<h2>5. 第三方服务</h2>
<p>我们使用Stripe（支付）、Supabase（认证）、Resend（邮件）、Plausible Analytics（分析）和Cloudflare（托管）。我们不出售或分享您的个人数据用于广告目的。</p>

<h2>6. 您的权利（GDPR及全球）</h2>
<p>您有权：访问、更正、删除、导出您的数据，撤回同意，以及反对处理。联系 <a href="mailto:privacy@veilus.io">privacy@veilus.io</a>。</p>

<h2>7. 数据保留</h2>
<ul><li>活跃账户：在账户活跃期间保留。</li><li>已删除账户：30天内删除所有个人数据。</li></ul>

<h2>8. Cookie</h2>
<p>我们仅使用必要的会话Cookie。Plausible Analytics无Cookie且符合GDPR。</p>

<h2>9. 儿童隐私</h2>
<p>Veilus不面向16岁以下用户。</p>

<h2>10. 政策变更</h2>
<p>重大变更将提前14天通过电子邮件通知。</p>

<h2>11. 联系方式</h2>
<ul><li><strong>邮箱：</strong><a href="mailto:privacy@veilus.io">privacy@veilus.io</a></li><li><strong>网站：</strong><a href="https://veilus.io">veilus.io</a></li></ul>`
    },

    ru: {
        title: "Политика конфиденциальности",
        description: "Как Veilus собирает, использует и защищает ваши данные.",
        lastUpdated: "6 марта 2026",
        content: `
<h2>1. Введение</h2>
<p>Veilus ("мы") уважает вашу конфиденциальность и стремится защитить ваши персональные данные. Эта Политика конфиденциальности описывает, как мы собираем, используем и защищаем вашу информацию при использовании приложения и веб-сайта Veilus (далее "Сервис").</p>

<h2>2. Данные, которые мы собираем</h2>
<h3>2.1 Данные аккаунта</h3>
<ul><li><strong>Адрес электронной почты</strong> — для аутентификации и связи</li><li><strong>Платёжная информация</strong> — обрабатывается Stripe; мы не храним номера карт</li></ul>
<h3>2.2 Данные использования (только по согласию)</h3>
<p>Анонимная агрегированная статистика. <strong>Мы никогда не собираем:</strong> историю посещений, содержимое профилей, скрипты автоматизации, IP-адреса.</p>
<h3>2.3 Данные профилей браузера</h3>
<p>Все данные хранятся <strong>локально на вашем устройстве</strong>. Veilus Sync использует сквозное шифрование — <strong>мы не можем прочитать ваши синхронизированные данные</strong>.</p>

<h2>3. Использование данных</h2>
<table><thead><tr><th>Цель</th><th>Правовое основание</th></tr></thead><tbody><tr><td>Предоставление Сервиса</td><td>Исполнение договора</td></tr><tr><td>Обработка платежей</td><td>Исполнение договора</td></tr><tr><td>Обновления сервиса</td><td>Законный интерес</td></tr><tr><td>Улучшение продукта</td><td>Согласие</td></tr></tbody></table>

<h2>4. Хранение и безопасность</h2>
<ul><li>Локальное хранение данных профилей</li><li>Облако: Supabase с шифрованием</li><li>Синхронизация: AES-256-GCM</li></ul>

<h2>5. Сторонние сервисы</h2>
<p>Stripe, Supabase, Resend, Plausible Analytics, Cloudflare. Мы не продаём ваши данные.</p>

<h2>6. Ваши права (GDPR)</h2>
<p>Доступ, исправление, удаление, экспорт, отзыв согласия. Контакт: <a href="mailto:privacy@veilus.io">privacy@veilus.io</a>.</p>

<h2>7. Хранение данных</h2>
<p>Удалённые аккаунты: данные удаляются в течение 30 дней.</p>

<h2>8. Файлы cookie</h2>
<p>Только необходимые сессионные cookie. Plausible Analytics без cookie.</p>

<h2>9. Конфиденциальность детей</h2>
<p>Сервис не предназначен для лиц младше 16 лет.</p>

<h2>10. Изменения</h2>
<p>Уведомление за 14 дней по электронной почте.</p>

<h2>11. Контакты</h2>
<ul><li><strong>Email:</strong> <a href="mailto:privacy@veilus.io">privacy@veilus.io</a></li><li><strong>Сайт:</strong> <a href="https://veilus.io">veilus.io</a></li></ul>`
    },

    es: {
        title: "Política de Privacidad",
        description: "Cómo Veilus recopila, utiliza y protege sus datos.",
        lastUpdated: "6 de marzo de 2026",
        content: `
<h2>1. Introducción</h2>
<p>Veilus ("nosotros") respeta su privacidad y se compromete a proteger sus datos personales. Esta Política de Privacidad explica cómo recopilamos, utilizamos y protegemos su información al usar la aplicación y el sitio web de Veilus (el "Servicio").</p>

<h2>2. Datos que recopilamos</h2>
<h3>2.1 Datos de cuenta</h3>
<ul><li><strong>Correo electrónico</strong> — para autenticación y comunicación</li><li><strong>Información de pago</strong> — procesada por Stripe; no almacenamos números de tarjetas</li></ul>
<h3>2.2 Datos de uso (solo con consentimiento)</h3>
<p>Estadísticas anónimas agregadas. <strong>Nunca recopilamos:</strong> historial de navegación, contenido de perfiles, scripts de automatización, direcciones IP.</p>
<h3>2.3 Datos de perfiles del navegador</h3>
<p>Todos los datos se almacenan <strong>localmente en su dispositivo</strong>. Veilus Sync usa cifrado de extremo a extremo.</p>

<h2>3-5. Uso de datos, Almacenamiento y Terceros</h2>
<p>Usamos sus datos para operar el servicio y procesar pagos. Utilizamos Stripe, Supabase, Resend, Plausible Analytics y Cloudflare. No vendemos sus datos.</p>

<h2>6. Sus derechos (GDPR)</h2>
<p>Acceso, corrección, eliminación, exportación, retiro de consentimiento. Contacto: <a href="mailto:privacy@veilus.io">privacy@veilus.io</a>.</p>

<h2>7-8. Retención y Cookies</h2>
<p>Cuentas eliminadas: datos borrados en 30 días. Solo cookies de sesión esenciales.</p>

<h2>9-11. Menores, Cambios y Contacto</h2>
<p>No apto para menores de 16 años. Cambios notificados con 14 días de anticipación. Email: <a href="mailto:privacy@veilus.io">privacy@veilus.io</a></p>`
    },

    pt: {
        title: "Política de Privacidade",
        description: "Como a Veilus coleta, usa e protege seus dados.",
        lastUpdated: "6 de março de 2026",
        content: `
<h2>1. Introdução</h2>
<p>Veilus ("nós") respeita sua privacidade e compromete-se a proteger seus dados pessoais. Esta Política de Privacidade explica como coletamos, usamos e protegemos suas informações ao usar o aplicativo e website Veilus (o "Serviço").</p>

<h2>2. Dados que coletamos</h2>
<ul><li><strong>Email</strong> — autenticação e comunicação</li><li><strong>Pagamento</strong> — processado pelo Stripe</li></ul>
<p>Dados de perfil armazenados <strong>localmente</strong>. Veilus Sync com criptografia ponta a ponta.</p>
<p><strong>Nunca coletamos:</strong> histórico de navegação, conteúdo de perfis, scripts, endereços IP.</p>

<h2>3-5. Uso, Armazenamento e Terceiros</h2>
<p>Stripe, Supabase, Resend, Plausible, Cloudflare. Não vendemos seus dados.</p>

<h2>6. Seus direitos (GDPR)</h2>
<p>Acesso, correção, exclusão, exportação. Contato: <a href="mailto:privacy@veilus.io">privacy@veilus.io</a>.</p>

<h2>7-11. Retenção, Cookies, Menores, Alterações, Contato</h2>
<p>Contas excluídas: dados removidos em 30 dias. Apenas cookies essenciais. Não indicado para menores de 16 anos. Email: <a href="mailto:privacy@veilus.io">privacy@veilus.io</a></p>`
    },

    id: {
        title: "Kebijakan Privasi",
        description: "Bagaimana Veilus mengumpulkan, menggunakan, dan melindungi data Anda.",
        lastUpdated: "6 Maret 2026",
        content: `
<h2>1. Pendahuluan</h2>
<p>Veilus ("kami") menghormati privasi Anda dan berkomitmen melindungi data pribadi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda saat menggunakan aplikasi dan situs web Veilus ("Layanan").</p>

<h2>2. Data yang Kami Kumpulkan</h2>
<ul><li><strong>Alamat email</strong> — untuk autentikasi dan komunikasi</li><li><strong>Informasi pembayaran</strong> — diproses oleh Stripe</li></ul>
<p>Data profil browser disimpan <strong>secara lokal</strong>. Veilus Sync menggunakan enkripsi end-to-end.</p>
<p><strong>Tidak pernah mengumpulkan:</strong> riwayat browsing, konten profil, skrip, alamat IP.</p>

<h2>3-5. Penggunaan, Penyimpanan, dan Pihak Ketiga</h2>
<p>Stripe, Supabase, Resend, Plausible, Cloudflare. Kami tidak menjual data Anda.</p>

<h2>6. Hak Anda (GDPR)</h2>
<p>Akses, koreksi, hapus, ekspor data. Hubungi: <a href="mailto:privacy@veilus.io">privacy@veilus.io</a>.</p>

<h2>7-11. Retensi, Cookie, Anak, Perubahan, Kontak</h2>
<p>Akun dihapus: data dihapus dalam 30 hari. Hanya cookie sesi penting. Tidak untuk di bawah 16 tahun. Email: <a href="mailto:privacy@veilus.io">privacy@veilus.io</a></p>`
    },

    tr: {
        title: "Gizlilik Politikası",
        description: "Veilus verilerinizi nasıl toplar, kullanır ve korur.",
        lastUpdated: "6 Mart 2026",
        content: `
<h2>1. Giriş</h2>
<p>Veilus ("biz") gizliliğinize saygı duyar ve kişisel verilerinizi korumaya kararlıdır. Bu Gizlilik Politikası, Veilus uygulamasını ve web sitesini ("Hizmet") kullandığınızda bilgilerinizi nasıl topladığımızı, kullandığımızı ve koruduğumuzu açıklar.</p>

<h2>2. Topladığımız Veriler</h2>
<ul><li><strong>E-posta adresi</strong> — kimlik doğrulama ve iletişim</li><li><strong>Ödeme bilgileri</strong> — Stripe tarafından işlenir</li></ul>
<p>Profil verileri <strong>yerel olarak</strong> saklanır. Veilus Sync uçtan uca şifreleme kullanır.</p>
<p><strong>Asla toplamayız:</strong> tarama geçmişi, profil içeriği, otomasyon betikleri, IP adresleri.</p>

<h2>3-5. Kullanım, Depolama ve Üçüncü Taraflar</h2>
<p>Stripe, Supabase, Resend, Plausible, Cloudflare. Verilerinizi satmıyoruz.</p>

<h2>6. Haklarınız (GDPR)</h2>
<p>Erişim, düzeltme, silme, dışa aktarma. İletişim: <a href="mailto:privacy@veilus.io">privacy@veilus.io</a>.</p>

<h2>7-11. Saklama, Çerezler, Çocuklar, Değişiklikler, İletişim</h2>
<p>Silinen hesaplar: 30 gün içinde veri silinir. Sadece oturum çerezleri. 16 yaş altı için uygun değil. E-posta: <a href="mailto:privacy@veilus.io">privacy@veilus.io</a></p>`
    }
};
