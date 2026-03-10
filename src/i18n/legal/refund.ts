/** Refund Policy translations – keyed by Lang code */
export const refundTranslations: Record<string, {
    title: string;
    description: string;
    lastUpdated: string;
    content: string;
}> = {
    en: {
        title: "Refund Policy",
        description: "Veilus refund policy for subscription plans and lifetime deals.",
        lastUpdated: "March 6, 2026",
        content: `
<h2>1. Overview</h2>
<p>We want you to be satisfied with Veilus. If you're not happy with your purchase, we offer refunds under the following conditions.</p>

<h2>2. Free Tier</h2>
<p>The Veilus Free plan is free forever (5 profiles, no time limit). No payment is required, so no refund is applicable.</p>

<h2>3. Monthly Subscriptions</h2>
<table><thead><tr><th>Condition</th><th>Refund</th></tr></thead><tbody>
  <tr><td>Within 7 days of purchase (first billing cycle)</td><td>Full refund</td></tr>
  <tr><td>Within 7 days of renewal (subsequent cycles)</td><td>Prorated refund for unused days</td></tr>
  <tr><td>After 7 days</td><td>No refund; subscription active until end of billing period</td></tr>
</tbody></table>

<h2>4. Annual Subscriptions</h2>
<table><thead><tr><th>Condition</th><th>Refund</th></tr></thead><tbody>
  <tr><td>Within 14 days of purchase</td><td>Full refund</td></tr>
  <tr><td>After 14 days, before 3 months</td><td>Prorated refund minus 20% processing fee</td></tr>
  <tr><td>After 3 months</td><td>No refund; subscription active until end of annual period</td></tr>
</tbody></table>

<h2>5. Lifetime Deals (AppSumo / Promotions)</h2>
<ul>
  <li>Lifetime deals purchased through third-party platforms are subject to that platform's refund policy.</li>
  <li>Lifetime deals purchased directly from Veilus are <strong>non-refundable</strong> after 14 days.</li>
</ul>

<h2>6. Enterprise Plans</h2>
<p>Enterprise plans are subject to individual contract terms.</p>

<h2>7. How to Request a Refund</h2>
<ol>
  <li>Email <a href="mailto:billing@veilus.io">billing@veilus.io</a> with your account email and reason.</li>
  <li>We will review within <strong>2 business days</strong>.</li>
  <li>Approved refunds processed within <strong>5-10 business days</strong>.</li>
</ol>

<h2>8. Non-Refundable Situations</h2>
<ul>
  <li>Account suspended for Terms of Service violation.</li>
  <li>Previous refund already received.</li>
  <li>Request made after the refund window.</li>
  <li>Extensive use during the refund period.</li>
</ul>

<h2>9. Downgrades Instead of Cancellation</h2>
<p>Before requesting a refund, consider downgrading to the Free tier.</p>

<h2>10. Contact</h2>
<ul>
  <li><strong>Email:</strong> <a href="mailto:billing@veilus.io">billing@veilus.io</a></li>
  <li><strong>Response time:</strong> Within 2 business days</li>
</ul>`
    },

    vi: {
        title: "Chính sách Hoàn tiền",
        description: "Chính sách hoàn tiền cho các gói đăng ký và ưu đãi trọn đời của Veilus.",
        lastUpdated: "6 tháng 3, 2026",
        content: `
<h2>1. Tổng quan</h2>
<p>Chúng tôi muốn bạn hài lòng với Veilus. Nếu không hài lòng, chúng tôi cung cấp hoàn tiền theo các điều kiện sau.</p>

<h2>2. Gói miễn phí</h2>
<p>Gói Free miễn phí mãi mãi (5 profiles, không giới hạn thời gian). Không cần thanh toán nên không áp dụng hoàn tiền.</p>

<h2>3. Đăng ký hàng tháng</h2>
<table><thead><tr><th>Điều kiện</th><th>Hoàn tiền</th></tr></thead><tbody>
  <tr><td>Trong 7 ngày đầu (chu kỳ đầu tiên)</td><td>Hoàn tiền 100%</td></tr>
  <tr><td>Trong 7 ngày sau gia hạn</td><td>Hoàn tiền theo tỷ lệ ngày chưa dùng</td></tr>
  <tr><td>Sau 7 ngày</td><td>Không hoàn tiền; đăng ký hoạt động đến hết kỳ</td></tr>
</tbody></table>

<h2>4. Đăng ký hàng năm</h2>
<table><thead><tr><th>Điều kiện</th><th>Hoàn tiền</th></tr></thead><tbody>
  <tr><td>Trong 14 ngày đầu</td><td>Hoàn tiền 100%</td></tr>
  <tr><td>Sau 14 ngày, trước 3 tháng</td><td>Hoàn tiền theo tỷ lệ, trừ 20% phí xử lý</td></tr>
  <tr><td>Sau 3 tháng</td><td>Không hoàn tiền; đăng ký hoạt động đến hết năm</td></tr>
</tbody></table>

<h2>5. Ưu đãi trọn đời (AppSumo / Khuyến mãi)</h2>
<ul>
  <li>Ưu đãi trọn đời từ nền tảng thứ ba tuân theo chính sách hoàn tiền của nền tảng đó.</li>
  <li>Ưu đãi trực tiếp từ Veilus <strong>không hoàn tiền</strong> sau 14 ngày.</li>
</ul>

<h2>6. Gói Enterprise</h2>
<p>Theo điều khoản hợp đồng riêng.</p>

<h2>7. Cách yêu cầu hoàn tiền</h2>
<ol>
  <li>Email <a href="mailto:billing@veilus.io">billing@veilus.io</a> với email tài khoản và lý do.</li>
  <li>Xem xét trong <strong>2 ngày làm việc</strong>.</li>
  <li>Hoàn tiền được duyệt xử lý trong <strong>5-10 ngày làm việc</strong>.</li>
</ol>

<h2>8. Trường hợp không hoàn tiền</h2>
<ul>
  <li>Tài khoản bị đình chỉ do vi phạm Điều khoản.</li>
  <li>Đã nhận hoàn tiền trước đó.</li>
  <li>Yêu cầu sau thời hạn hoàn tiền.</li>
  <li>Sử dụng nhiều trong thời gian hoàn tiền (ví dụ: tạo 50+ profiles).</li>
</ul>

<h2>9. Hạ cấp thay vì hủy</h2>
<p>Trước khi yêu cầu hoàn tiền, cân nhắc hạ cấp xuống gói Free. Bạn giữ được profiles (tối đa 5) và có thể nâng cấp lại bất kỳ lúc nào.</p>

<h2>10. Liên hệ</h2>
<ul>
  <li><strong>Email:</strong> <a href="mailto:billing@veilus.io">billing@veilus.io</a></li>
  <li><strong>Thời gian phản hồi:</strong> Trong 2 ngày làm việc</li>
</ul>`
    },

    zh: {
        title: "退款政策",
        description: "Veilus订阅计划和终身优惠的退款政策。",
        lastUpdated: "2026年3月6日",
        content: `
<h2>1. 概述</h2>
<p>我们希望您对Veilus满意。如不满意，可按以下条件申请退款。</p>
<h2>2. 免费方案</h2><p>免费方案永久免费，无需退款。</p>
<h2>3. 月度订阅</h2>
<table><thead><tr><th>条件</th><th>退款</th></tr></thead><tbody><tr><td>购买后7天内</td><td>全额退款</td></tr><tr><td>续费后7天内</td><td>按比例退款</td></tr><tr><td>7天后</td><td>不退款</td></tr></tbody></table>
<h2>4. 年度订阅</h2>
<table><thead><tr><th>条件</th><th>退款</th></tr></thead><tbody><tr><td>购买后14天内</td><td>全额退款</td></tr><tr><td>14天至3个月</td><td>按比例退款，扣20%手续费</td></tr><tr><td>3个月后</td><td>不退款</td></tr></tbody></table>
<h2>5-10. 终身优惠、企业方案、申请流程、联系方式</h2>
<p>终身优惠14天后不可退款。企业方案按合同处理。退款请联系 <a href="mailto:billing@veilus.io">billing@veilus.io</a>（2个工作日内回复）。</p>`
    },

    ru: {
        title: "Политика возврата",
        description: "Политика возврата средств для подписок и пожизненных лицензий Veilus.",
        lastUpdated: "6 марта 2026",
        content: `
<h2>1. Обзор</h2><p>Мы предлагаем возврат средств при следующих условиях.</p>
<h2>2-3. Месячные подписки</h2>
<table><thead><tr><th>Условие</th><th>Возврат</th></tr></thead><tbody><tr><td>В течение 7 дней</td><td>Полный возврат</td></tr><tr><td>После 7 дней</td><td>Без возврата</td></tr></tbody></table>
<h2>4. Годовые подписки</h2>
<table><thead><tr><th>Условие</th><th>Возврат</th></tr></thead><tbody><tr><td>В течение 14 дней</td><td>Полный возврат</td></tr><tr><td>14 дней - 3 месяца</td><td>Пропорциональный, минус 20%</td></tr><tr><td>После 3 месяцев</td><td>Без возврата</td></tr></tbody></table>
<h2>5-10. Прочее</h2>
<p>Пожизненные лицензии — без возврата после 14 дней. Контакт: <a href="mailto:billing@veilus.io">billing@veilus.io</a></p>`
    },

    es: {
        title: "Política de Reembolso",
        description: "Política de reembolso para suscripciones y ofertas de por vida de Veilus.",
        lastUpdated: "6 de marzo de 2026",
        content: `
<h2>1. Resumen</h2><p>Ofrecemos reembolsos bajo las siguientes condiciones.</p>
<h2>2-3. Suscripciones mensuales</h2>
<table><thead><tr><th>Condición</th><th>Reembolso</th></tr></thead><tbody><tr><td>Dentro de 7 días</td><td>Reembolso total</td></tr><tr><td>Después de 7 días</td><td>Sin reembolso</td></tr></tbody></table>
<h2>4. Suscripciones anuales</h2>
<table><thead><tr><th>Condición</th><th>Reembolso</th></tr></thead><tbody><tr><td>Dentro de 14 días</td><td>Reembolso total</td></tr><tr><td>14 días - 3 meses</td><td>Proporcional menos 20%</td></tr><tr><td>Después de 3 meses</td><td>Sin reembolso</td></tr></tbody></table>
<h2>5-10. Otros</h2>
<p>Ofertas de por vida no reembolsables después de 14 días. Contacto: <a href="mailto:billing@veilus.io">billing@veilus.io</a></p>`
    },

    pt: {
        title: "Política de Reembolso",
        description: "Política de reembolso para assinaturas e ofertas vitalícias Veilus.",
        lastUpdated: "6 de março de 2026",
        content: `
<h2>1. Resumo</h2><p>Oferecemos reembolso nas seguintes condições.</p>
<h2>2-3. Assinaturas mensais</h2>
<table><thead><tr><th>Condição</th><th>Reembolso</th></tr></thead><tbody><tr><td>Em 7 dias</td><td>Reembolso total</td></tr><tr><td>Após 7 dias</td><td>Sem reembolso</td></tr></tbody></table>
<h2>4. Assinaturas anuais</h2>
<table><thead><tr><th>Condição</th><th>Reembolso</th></tr></thead><tbody><tr><td>Em 14 dias</td><td>Reembolso total</td></tr><tr><td>14 dias - 3 meses</td><td>Proporcional menos 20%</td></tr><tr><td>Após 3 meses</td><td>Sem reembolso</td></tr></tbody></table>
<h2>5-10. Outros</h2>
<p>Ofertas vitalícias não reembolsáveis após 14 dias. Contato: <a href="mailto:billing@veilus.io">billing@veilus.io</a></p>`
    },

    id: {
        title: "Kebijakan Pengembalian Dana",
        description: "Kebijakan pengembalian dana untuk langganan dan penawaran seumur hidup Veilus.",
        lastUpdated: "6 Maret 2026",
        content: `
<h2>1. Ringkasan</h2><p>Kami menawarkan pengembalian dana dengan ketentuan berikut.</p>
<h2>2-3. Langganan bulanan</h2>
<table><thead><tr><th>Ketentuan</th><th>Pengembalian</th></tr></thead><tbody><tr><td>Dalam 7 hari</td><td>Pengembalian penuh</td></tr><tr><td>Setelah 7 hari</td><td>Tidak ada pengembalian</td></tr></tbody></table>
<h2>4. Langganan tahunan</h2>
<table><thead><tr><th>Ketentuan</th><th>Pengembalian</th></tr></thead><tbody><tr><td>Dalam 14 hari</td><td>Pengembalian penuh</td></tr><tr><td>14 hari - 3 bulan</td><td>Proporsional minus 20%</td></tr><tr><td>Setelah 3 bulan</td><td>Tidak ada pengembalian</td></tr></tbody></table>
<h2>5-10. Lainnya</h2>
<p>Penawaran seumur hidup tidak dapat dikembalikan setelah 14 hari. Kontak: <a href="mailto:billing@veilus.io">billing@veilus.io</a></p>`
    },

    tr: {
        title: "İade Politikası",
        description: "Veilus abonelikleri ve ömür boyu fırsatları için iade politikası.",
        lastUpdated: "6 Mart 2026",
        content: `
<h2>1. Özet</h2><p>Aşağıdaki koşullarda iade sunuyoruz.</p>
<h2>2-3. Aylık abonelikler</h2>
<table><thead><tr><th>Koşul</th><th>İade</th></tr></thead><tbody><tr><td>7 gün içinde</td><td>Tam iade</td></tr><tr><td>7 gün sonra</td><td>İade yok</td></tr></tbody></table>
<h2>4. Yıllık abonelikler</h2>
<table><thead><tr><th>Koşul</th><th>İade</th></tr></thead><tbody><tr><td>14 gün içinde</td><td>Tam iade</td></tr><tr><td>14 gün - 3 ay</td><td>Oransal, %20 düşülür</td></tr><tr><td>3 ay sonra</td><td>İade yok</td></tr></tbody></table>
<h2>5-10. Diğer</h2>
<p>Ömür boyu fırsatlar 14 gün sonra iade edilemez. İletişim: <a href="mailto:billing@veilus.io">billing@veilus.io</a></p>`
    }
};
