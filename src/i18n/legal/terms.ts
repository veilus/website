/** Terms of Service translations – keyed by Lang code */
export const termsTranslations: Record<string, {
    title: string;
    description: string;
    lastUpdated: string;
    content: string;
}> = {
    en: {
        title: "Terms of Service",
        description: "Terms and conditions for using the Veilus anti-detect browser and platform.",
        lastUpdated: "March 6, 2026",
        content: `
<h2>1. Agreement to Terms</h2>
<p>By downloading, installing, or using Veilus ("the Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree, do not use the Service.</p>
<p>Veilus is operated by Veilus ("we", "our", "us"). These Terms constitute a legally binding agreement between you and Veilus.</p>

<h2>2. Description of Service</h2>
<p>Veilus is an anti-detect browser application with integrated automation capabilities. The Service includes:</p>
<ul>
  <li>Desktop application (macOS, with Windows and Linux planned)</li>
  <li>Browser profile management with fingerprint customization</li>
  <li>Automation tools (Veilus Flow recorder, Visual Canvas, AI Agent)</li>
  <li>Profile synchronization (Veilus Sync)</li>
  <li>Script scheduling and batch execution</li>
  <li>Cloud API for account and license management</li>
</ul>

<h2>3. Account Registration</h2>
<ul>
  <li>You must be at least 16 years old to use the Service.</li>
  <li>You must provide a valid email address and accurate information.</li>
  <li>You are responsible for maintaining the security of your account credentials.</li>
  <li>You must notify us immediately of any unauthorized use of your account.</li>
  <li>One person or entity may not maintain more than one free account.</li>
</ul>

<h2>4. Subscription Plans & Payment</h2>
<h3>4.1 Plan Tiers</h3>
<table><thead><tr><th>Plan</th><th>Price</th><th>Profiles</th></tr></thead><tbody>
  <tr><td>Free</td><td>$0 forever</td><td>5</td></tr>
  <tr><td>Starter</td><td>$15/month</td><td>30</td></tr>
  <tr><td>Pro</td><td>$49/month</td><td>200</td></tr>
  <tr><td>Business</td><td>$99/month</td><td>1,000</td></tr>
  <tr><td>Enterprise</td><td>Custom</td><td>Unlimited</td></tr>
</tbody></table>
<h3>4.2 Billing</h3>
<ul>
  <li>Paid plans are billed monthly or annually (40% discount for annual plans).</li>
  <li>Payments are processed by Stripe. We do not store your payment card details.</li>
  <li>Subscriptions auto-renew unless canceled before the next billing cycle.</li>
  <li>Prices may change with 30 days' notice to existing subscribers.</li>
</ul>
<h3>4.3 Downgrades</h3>
<p>If you downgrade or cancel a paid plan, your account will revert to the Free tier at the end of the current billing period. Profiles exceeding the Free tier limit will become read-only (not deleted).</p>

<h2>5. Acceptable Use</h2>
<p>You agree <strong>not</strong> to use the Service to:</p>
<ul>
  <li>Violate any applicable laws or regulations</li>
  <li>Engage in fraud, identity theft, or phishing</li>
  <li>Access or scrape systems without authorization</li>
  <li>Distribute malware, viruses, or harmful code</li>
  <li>Harass, abuse, or threaten other individuals</li>
  <li>Violate the terms of service of third-party platforms in a way that is illegal</li>
  <li>Circumvent technological protection measures for illegal purposes</li>
  <li>Generate, distribute, or facilitate child sexual abuse material (CSAM)</li>
  <li>Facilitate terrorism, human trafficking, or other serious crimes</li>
</ul>
<p>We reserve the right to suspend or terminate accounts that violate this policy without prior notice.</p>

<h2>6. Intellectual Property</h2>
<ul>
  <li>The Veilus application, brand, and documentation are protected by copyright and intellectual property laws.</li>
  <li>You may not reverse-engineer, decompile, or modify the Veilus application except as permitted by law.</li>
  <li>Automation scripts and workflows you create using Veilus are your property.</li>
  <li>Community-shared templates are licensed under the terms specified at time of sharing.</li>
</ul>

<h2>7. Data Ownership & Privacy</h2>
<ul>
  <li>You retain full ownership of your browser profile data, automation scripts, and workflows.</li>
  <li>Profile data is stored locally on your device. We do not have access to it.</li>
  <li>Veilus Sync uses end-to-end encryption — we cannot read your synced data.</li>
  <li>See our <a href="/privacy">Privacy Policy</a> for details on data handling.</li>
</ul>

<h2>8. Disclaimers</h2>
<ul>
  <li>The Service is provided "as is" and "as available" without warranties of any kind.</li>
  <li>We do not guarantee that the Service will be uninterrupted, error-free, or secure.</li>
  <li>We do not guarantee that browser fingerprints will be undetectable by all detection systems.</li>
  <li>We are not responsible for actions taken by third-party platforms (e.g., account suspensions on social media).</li>
</ul>

<h2>9. Limitation of Liability</h2>
<p>To the maximum extent permitted by law:</p>
<ul>
  <li>Our total liability shall not exceed the amount you paid in the 12 months preceding the claim.</li>
  <li>We shall not be liable for indirect, incidental, special, consequential, or punitive damages.</li>
  <li>We shall not be liable for lost profits, data, business opportunities, or goodwill.</li>
</ul>

<h2>10. Indemnification</h2>
<p>You agree to indemnify and hold harmless Veilus from any claims arising from your use of the Service or violation of these Terms.</p>

<h2>11. Termination</h2>
<ul>
  <li><strong>By you:</strong> Cancel at any time from your account settings.</li>
  <li><strong>By us:</strong> We may suspend or terminate for Terms violations. Serious violations may result in immediate termination without refund.</li>
</ul>

<h2>12. Changes to Terms</h2>
<p>Material changes will be notified via email at least 30 days before taking effect.</p>

<h2>13. Governing Law</h2>
<p>These Terms are governed by the laws of the jurisdiction in which Veilus is incorporated.</p>

<h2>14. Contact</h2>
<ul>
  <li><strong>Email:</strong> <a href="mailto:legal@veilus.io">legal@veilus.io</a></li>
  <li><strong>Website:</strong> <a href="https://veilus.io">veilus.io</a></li>
</ul>`
    },

    vi: {
        title: "Điều khoản Dịch vụ",
        description: "Điều khoản và điều kiện sử dụng trình duyệt chống phát hiện Veilus.",
        lastUpdated: "6 tháng 3, 2026",
        content: `
<h2>1. Đồng ý với Điều khoản</h2>
<p>Bằng việc tải, cài đặt hoặc sử dụng Veilus ("Dịch vụ"), bạn đồng ý tuân theo các Điều khoản Dịch vụ này. Nếu bạn không đồng ý, vui lòng không sử dụng Dịch vụ.</p>

<h2>2. Mô tả Dịch vụ</h2>
<p>Veilus là ứng dụng trình duyệt chống phát hiện với khả năng automation tích hợp, bao gồm:</p>
<ul>
  <li>Ứng dụng desktop (macOS, Windows và Linux sẽ có sau)</li>
  <li>Quản lý browser profile với tùy chỉnh fingerprint</li>
  <li>Công cụ automation (Veilus Flow, Visual Canvas, AI Agent)</li>
  <li>Đồng bộ profile (Veilus Sync)</li>
  <li>Lập lịch script và thực thi hàng loạt</li>
  <li>Cloud API cho quản lý tài khoản và license</li>
</ul>

<h2>3. Đăng ký tài khoản</h2>
<ul>
  <li>Bạn phải từ 16 tuổi trở lên.</li>
  <li>Cung cấp email hợp lệ và thông tin chính xác.</li>
  <li>Bạn chịu trách nhiệm bảo mật thông tin đăng nhập.</li>
  <li>Thông báo ngay cho chúng tôi về bất kỳ truy cập trái phép nào.</li>
  <li>Mỗi người chỉ được duy trì một tài khoản miễn phí.</li>
</ul>

<h2>4. Gói đăng ký & Thanh toán</h2>
<h3>4.1 Các gói</h3>
<table><thead><tr><th>Gói</th><th>Giá</th><th>Profiles</th></tr></thead><tbody>
  <tr><td>Free</td><td>$0 mãi mãi</td><td>5</td></tr>
  <tr><td>Starter</td><td>$15/tháng</td><td>30</td></tr>
  <tr><td>Pro</td><td>$49/tháng</td><td>200</td></tr>
  <tr><td>Business</td><td>$99/tháng</td><td>1.000</td></tr>
  <tr><td>Enterprise</td><td>Tùy chỉnh</td><td>Không giới hạn</td></tr>
</tbody></table>
<h3>4.2 Thanh toán</h3>
<ul>
  <li>Gói trả phí tính theo tháng hoặc năm (giảm 40% cho gói năm).</li>
  <li>Thanh toán qua Stripe. Chúng tôi không lưu thông tin thẻ.</li>
  <li>Tự động gia hạn trừ khi hủy trước chu kỳ tiếp theo.</li>
  <li>Giá có thể thay đổi với thông báo trước 30 ngày.</li>
</ul>
<h3>4.3 Hạ cấp</h3>
<p>Khi hạ cấp hoặc hủy, tài khoản sẽ chuyển về gói Free cuối chu kỳ thanh toán. Profiles vượt giới hạn sẽ chỉ đọc (không bị xóa).</p>

<h2>5. Sử dụng được chấp nhận</h2>
<p>Bạn đồng ý <strong>không</strong> sử dụng Dịch vụ để:</p>
<ul>
  <li>Vi phạm pháp luật hiện hành</li>
  <li>Lừa đảo, đánh cắp danh tính, hoặc phishing</li>
  <li>Truy cập hoặc thu thập dữ liệu hệ thống trái phép</li>
  <li>Phát tán mã độc</li>
  <li>Quấy rối, đe dọa người khác</li>
  <li>Vi phạm điều khoản nền tảng thứ ba một cách bất hợp pháp</li>
  <li>Tạo hoặc phát tán nội dung CSAM</li>
  <li>Hỗ trợ khủng bố, buôn người hoặc tội phạm nghiêm trọng</li>
</ul>

<h2>6. Sở hữu trí tuệ</h2>
<ul>
  <li>Ứng dụng, thương hiệu và tài liệu Veilus được bảo vệ bởi luật bản quyền.</li>
  <li>Không được dịch ngược hoặc sửa đổi ứng dụng trừ khi luật cho phép.</li>
  <li>Script automation bạn tạo thuộc sở hữu của bạn.</li>
</ul>

<h2>7. Quyền sở hữu dữ liệu & Bảo mật</h2>
<ul>
  <li>Bạn giữ toàn quyền sở hữu dữ liệu profile, script và workflow.</li>
  <li>Dữ liệu profile lưu cục bộ. Chúng tôi không truy cập được.</li>
  <li>Veilus Sync sử dụng mã hóa đầu-cuối.</li>
  <li>Xem <a href="/vi/privacy">Chính sách Bảo mật</a> để biết chi tiết.</li>
</ul>

<h2>8. Tuyên bố từ chối</h2>
<ul>
  <li>Dịch vụ được cung cấp "nguyên trạng" không có bảo đảm.</li>
  <li>Không đảm bảo fingerprint không bị phát hiện bởi mọi hệ thống.</li>
  <li>Không chịu trách nhiệm cho hành động của nền tảng thứ ba.</li>
</ul>

<h2>9. Giới hạn trách nhiệm</h2>
<p>Trách nhiệm tối đa không vượt quá số tiền bạn đã thanh toán trong 12 tháng trước đó.</p>

<h2>10. Bồi thường</h2>
<p>Bạn đồng ý bồi thường Veilus khỏi mọi khiếu nại phát sinh từ việc sử dụng Dịch vụ hoặc vi phạm Điều khoản.</p>

<h2>11. Chấm dứt</h2>
<ul>
  <li><strong>Bởi bạn:</strong> Hủy bất kỳ lúc nào từ cài đặt tài khoản.</li>
  <li><strong>Bởi chúng tôi:</strong> Có thể đình chỉ hoặc chấm dứt nếu vi phạm Điều khoản.</li>
</ul>

<h2>12. Thay đổi Điều khoản</h2>
<p>Thay đổi quan trọng sẽ thông báo qua email trước 30 ngày.</p>

<h2>13. Luật áp dụng</h2>
<p>Các Điều khoản này tuân theo luật pháp nơi Veilus đăng ký hoạt động.</p>

<h2>14. Liên hệ</h2>
<ul>
  <li><strong>Email:</strong> <a href="mailto:legal@veilus.io">legal@veilus.io</a></li>
  <li><strong>Website:</strong> <a href="https://veilus.io">veilus.io</a></li>
</ul>`
    },

    zh: {
        title: "服务条款",
        description: "使用Veilus反检测浏览器的条款和条件。",
        lastUpdated: "2026年3月6日",
        content: `
<h2>1. 同意条款</h2>
<p>下载、安装或使用Veilus即表示您同意本服务条款。</p>
<h2>2. 服务描述</h2>
<p>Veilus是一款集成自动化功能的反检测浏览器，包括桌面应用、浏览器配置文件管理、自动化工具、配置文件同步和Cloud API。</p>
<h2>3. 账户注册</h2>
<p>年满16岁，提供有效邮箱，负责账户安全。每人限一个免费账户。</p>
<h2>4. 订阅计划</h2>
<table><thead><tr><th>计划</th><th>价格</th><th>配置文件</th></tr></thead><tbody><tr><td>Free</td><td>永久免费</td><td>5</td></tr><tr><td>Starter</td><td>$15/月</td><td>30</td></tr><tr><td>Pro</td><td>$49/月</td><td>200</td></tr><tr><td>Business</td><td>$99/月</td><td>1,000</td></tr><tr><td>Enterprise</td><td>定制</td><td>无限</td></tr></tbody></table>
<h2>5. 可接受使用</h2>
<p>禁止：违法、欺诈、未授权访问、恶意软件、骚扰、CSAM、恐怖主义等。</p>
<h2>6-7. 知识产权和数据所有权</h2>
<p>您的脚本和工作流归您所有。配置文件数据存储在本地。</p>
<h2>8-9. 免责声明和责任限制</h2>
<p>服务"按现状"提供。最大责任不超过前12个月付款金额。</p>
<h2>10-14. 赔偿、终止、变更、法律、联系</h2>
<p>变更提前30天通知。联系：<a href="mailto:legal@veilus.io">legal@veilus.io</a></p>`
    },

    ru: {
        title: "Условия использования",
        description: "Условия использования антидетект-браузера Veilus.",
        lastUpdated: "6 марта 2026",
        content: `
<h2>1. Согласие с условиями</h2>
<p>Скачивая или используя Veilus, вы соглашаетесь с настоящими Условиями.</p>
<h2>2. Описание сервиса</h2>
<p>Veilus — антидетект-браузер с автоматизацией, управлением профилями, синхронизацией и Cloud API.</p>
<h2>3. Регистрация</h2>
<p>Возраст от 16 лет. Один бесплатный аккаунт на человека.</p>
<h2>4. Подписки</h2>
<table><thead><tr><th>План</th><th>Цена</th><th>Профили</th></tr></thead><tbody><tr><td>Free</td><td>Бесплатно</td><td>5</td></tr><tr><td>Starter</td><td>$15/мес</td><td>30</td></tr><tr><td>Pro</td><td>$49/мес</td><td>200</td></tr><tr><td>Business</td><td>$99/мес</td><td>1 000</td></tr><tr><td>Enterprise</td><td>Индивидуально</td><td>Без ограничений</td></tr></tbody></table>
<h2>5. Допустимое использование</h2>
<p>Запрещено: нарушение законов, мошенничество, вредоносное ПО, CSAM, терроризм.</p>
<h2>6-14. Прочее</h2>
<p>Ваши скрипты — ваша собственность. Данные хранятся локально. Ответственность ограничена суммой оплаты за 12 месяцев. Изменения — уведомление за 30 дней. Контакт: <a href="mailto:legal@veilus.io">legal@veilus.io</a></p>`
    },

    es: {
        title: "Términos de Servicio",
        description: "Términos y condiciones de uso del navegador anti-detección Veilus.",
        lastUpdated: "6 de marzo de 2026",
        content: `
<h2>1. Aceptación</h2>
<p>Al usar Veilus, acepta estos Términos de Servicio.</p>
<h2>2. Descripción</h2>
<p>Veilus es un navegador anti-detección con automatización, gestión de perfiles, sincronización y API en la nube.</p>
<h2>3. Registro</h2>
<p>Mínimo 16 años. Una cuenta gratuita por persona.</p>
<h2>4. Planes</h2>
<table><thead><tr><th>Plan</th><th>Precio</th><th>Perfiles</th></tr></thead><tbody><tr><td>Free</td><td>$0</td><td>5</td></tr><tr><td>Starter</td><td>$15/mes</td><td>30</td></tr><tr><td>Pro</td><td>$49/mes</td><td>200</td></tr><tr><td>Business</td><td>$99/mes</td><td>1.000</td></tr><tr><td>Enterprise</td><td>Personalizado</td><td>Ilimitado</td></tr></tbody></table>
<h2>5. Uso aceptable</h2>
<p>Prohibido: fraude, malware, acoso, CSAM, terrorismo.</p>
<h2>6-14. Otros</h2>
<p>Sus scripts son su propiedad. Datos locales. Responsabilidad limitada a pagos de 12 meses. Cambios con 30 días de aviso. Contacto: <a href="mailto:legal@veilus.io">legal@veilus.io</a></p>`
    },

    pt: {
        title: "Termos de Serviço",
        description: "Termos e condições de uso do navegador anti-detecção Veilus.",
        lastUpdated: "6 de março de 2026",
        content: `
<h2>1. Aceitação</h2>
<p>Ao usar o Veilus, você concorda com estes Termos.</p>
<h2>2. Descrição</h2>
<p>Veilus é um navegador anti-detecção com automação, gerenciamento de perfis e API na nuvem.</p>
<h2>3-4. Registro e Planos</h2>
<table><thead><tr><th>Plano</th><th>Preço</th><th>Perfis</th></tr></thead><tbody><tr><td>Free</td><td>$0</td><td>5</td></tr><tr><td>Starter</td><td>$15/mês</td><td>30</td></tr><tr><td>Pro</td><td>$49/mês</td><td>200</td></tr><tr><td>Business</td><td>$99/mês</td><td>1.000</td></tr><tr><td>Enterprise</td><td>Personalizado</td><td>Ilimitado</td></tr></tbody></table>
<h2>5. Uso aceitável</h2>
<p>Proibido: fraude, malware, assédio, CSAM, terrorismo.</p>
<h2>6-14. Outros</h2>
<p>Seus scripts são sua propriedade. Dados locais. Alterações com 30 dias de aviso. Contato: <a href="mailto:legal@veilus.io">legal@veilus.io</a></p>`
    },

    id: {
        title: "Ketentuan Layanan",
        description: "Syarat dan ketentuan penggunaan browser anti-deteksi Veilus.",
        lastUpdated: "6 Maret 2026",
        content: `
<h2>1. Persetujuan</h2>
<p>Dengan menggunakan Veilus, Anda setuju dengan Ketentuan Layanan ini.</p>
<h2>2. Deskripsi</h2>
<p>Veilus adalah browser anti-deteksi dengan otomasi, manajemen profil, sinkronisasi, dan Cloud API.</p>
<h2>3-4. Registrasi dan Paket</h2>
<table><thead><tr><th>Paket</th><th>Harga</th><th>Profil</th></tr></thead><tbody><tr><td>Free</td><td>$0</td><td>5</td></tr><tr><td>Starter</td><td>$15/bulan</td><td>30</td></tr><tr><td>Pro</td><td>$49/bulan</td><td>200</td></tr><tr><td>Business</td><td>$99/bulan</td><td>1.000</td></tr><tr><td>Enterprise</td><td>Kustom</td><td>Tak terbatas</td></tr></tbody></table>
<h2>5. Penggunaan</h2>
<p>Dilarang: penipuan, malware, pelecehan, CSAM, terorisme.</p>
<h2>6-14. Lainnya</h2>
<p>Skrip Anda milik Anda. Data lokal. Perubahan dengan pemberitahuan 30 hari. Kontak: <a href="mailto:legal@veilus.io">legal@veilus.io</a></p>`
    },

    tr: {
        title: "Hizmet Şartları",
        description: "Veilus anti-detect tarayıcı kullanım şartları ve koşulları.",
        lastUpdated: "6 Mart 2026",
        content: `
<h2>1. Kabul</h2>
<p>Veilus'u kullanarak bu Hizmet Şartlarını kabul etmiş olursunuz.</p>
<h2>2. Hizmet</h2>
<p>Veilus, otomasyon, profil yönetimi, senkronizasyon ve Cloud API içeren bir anti-detect tarayıcısıdır.</p>
<h2>3-4. Kayıt ve Planlar</h2>
<table><thead><tr><th>Plan</th><th>Fiyat</th><th>Profiller</th></tr></thead><tbody><tr><td>Free</td><td>$0</td><td>5</td></tr><tr><td>Starter</td><td>$15/ay</td><td>30</td></tr><tr><td>Pro</td><td>$49/ay</td><td>200</td></tr><tr><td>Business</td><td>$99/ay</td><td>1.000</td></tr><tr><td>Enterprise</td><td>Özel</td><td>Sınırsız</td></tr></tbody></table>
<h2>5. Kabul Edilebilir Kullanım</h2>
<p>Yasak: dolandırıcılık, kötü amaçlı yazılım, taciz, CSAM, terörizm.</p>
<h2>6-14. Diğer</h2>
<p>Betikleriniz size aittir. Veriler yerel olarak saklanır. 30 gün önceden bildirimle değişiklik. İletişim: <a href="mailto:legal@veilus.io">legal@veilus.io</a></p>`
    }
};
