/** Refund Policy translations – keyed by Lang code */
export const refundTranslations: Record<string, {
    title: string;
    description: string;
    lastUpdated: string;
    content: string;
}> = {
    en: {
        title: "Refund Policy",
        description: "Veilus refund policy for monthly and lifetime plans.",
        lastUpdated: "September 28, 2026",
        content: `
<h2>1. Overview</h2>
<p>We want you to be satisfied with Veilus. If you're not happy with your purchase, we offer refunds under the following conditions.</p>

<h2>2. Free Tier</h2>
<p>The Veilus Free plan is free forever (5 profiles, no time limit). No payment is required, so no refund is applicable.</p>

<h2>3. Monthly Plan</h2>
<table><thead><tr><th>Condition</th><th>Refund</th></tr></thead><tbody>
  <tr><td>Within 7 days of a payment (first purchase or any renewal)</td><td>Full refund</td></tr>
  <tr><td>After 7 days of that payment</td><td>No refund; the key stays active until the end of the paid period</td></tr>
</tbody></table>

<h2>4. Lifetime Plans</h2>
<p>Lifetime plans purchased directly from Veilus are <strong>non-refundable</strong> after 14 days.</p>

<h2>5. How Refunds Are Paid</h2>
<ul>
  <li><strong>Orders paid in VND (bank transfer):</strong> refunded manually. Email <a href="mailto:billing@veilus.io">billing@veilus.io</a> with the email used for the order and your order code or license key. When the refund is issued, the license key is disabled.</li>
  <li><strong>Orders paid in USD (card):</strong> LemonSqueezy is the merchant of record for card payments, so refunds are issued through LemonSqueezy according to its refund process, to the original payment method. You can start the request by emailing <a href="mailto:billing@veilus.io">billing@veilus.io</a>.</li>
</ul>
<p>We review refund requests within <strong>2 business days</strong>.</p>

<h2>6. Non-Refundable Situations</h2>
<p>Refunds are <strong>not</strong> available when:</p>
<ul>
  <li>Your key was suspended or terminated due to a violation of our Terms of Service.</li>
  <li>You have already received a refund for a previous purchase or billing cycle.</li>
  <li>The refund request is made after the applicable refund window.</li>
  <li>You have used the Service extensively during the refund period (e.g., created 50+ profiles, executed automation at scale).</li>
</ul>

<h2>7. Letting a Monthly Key Expire Instead</h2>
<p>If you don't renew a monthly key, the app falls back to the Free plan at the end of the paid period. Your profiles are kept, and you can renew again at any time.</p>

<h2>8. Contact</h2>
<ul>
  <li><strong>Email:</strong> <a href="mailto:billing@veilus.io">billing@veilus.io</a></li>
  <li><strong>Response time:</strong> Within 2 business days</li>
</ul>`
    },

    vi: {
        title: "Chính sách Hoàn tiền",
        description: "Chính sách hoàn tiền cho gói thuê tháng và gói trọn đời của Veilus.",
        lastUpdated: "28 tháng 9, 2026",
        content: `
<h2>1. Tổng quan</h2>
<p>Chúng tôi muốn bạn hài lòng với Veilus. Nếu không hài lòng, chúng tôi cung cấp hoàn tiền theo các điều kiện sau.</p>

<h2>2. Gói miễn phí</h2>
<p>Gói Free miễn phí mãi mãi (5 profiles, không giới hạn thời gian). Không cần thanh toán nên không áp dụng hoàn tiền.</p>

<h2>3. Gói thuê tháng</h2>
<table><thead><tr><th>Điều kiện</th><th>Hoàn tiền</th></tr></thead><tbody>
  <tr><td>Trong 7 ngày kể từ một lần thanh toán (lần đầu hoặc mỗi lần gia hạn)</td><td>Hoàn tiền 100%</td></tr>
  <tr><td>Sau 7 ngày kể từ lần thanh toán đó</td><td>Không hoàn tiền; key hoạt động đến hết kỳ đã trả</td></tr>
</tbody></table>

<h2>4. Gói trọn đời</h2>
<p>Gói trọn đời mua trực tiếp từ Veilus <strong>không hoàn tiền</strong> sau 14 ngày.</p>

<h2>5. Cách hoàn tiền</h2>
<ul>
  <li><strong>Đơn trả bằng VNĐ (chuyển khoản):</strong> hoàn tay. Gửi email tới <a href="mailto:billing@veilus.io">billing@veilus.io</a> kèm email đã dùng khi đặt đơn và mã đơn hoặc key license. Khi đã hoàn tiền, key license bị vô hiệu.</li>
  <li><strong>Đơn trả bằng USD (thẻ):</strong> LemonSqueezy là bên bán chính thức (merchant of record) cho thanh toán thẻ, nên tiền được hoàn qua LemonSqueezy theo quy trình hoàn tiền của họ, về phương thức thanh toán ban đầu. Bạn có thể bắt đầu yêu cầu bằng email tới <a href="mailto:billing@veilus.io">billing@veilus.io</a>.</li>
</ul>
<p>Chúng tôi xem xét yêu cầu hoàn tiền trong <strong>2 ngày làm việc</strong>.</p>

<h2>6. Trường hợp không hoàn tiền</h2>
<ul>
  <li>Key bị đình chỉ do vi phạm Điều khoản.</li>
  <li>Đã nhận hoàn tiền trước đó.</li>
  <li>Yêu cầu sau thời hạn hoàn tiền.</li>
  <li>Sử dụng nhiều trong thời gian hoàn tiền (ví dụ: tạo 50+ profiles).</li>
</ul>

<h2>7. Để key tháng hết hạn thay vì hoàn tiền</h2>
<p>Nếu bạn không gia hạn key thuê tháng, ứng dụng rơi về gói Free khi hết kỳ đã trả. Profiles của bạn được giữ nguyên và bạn có thể gia hạn lại bất kỳ lúc nào.</p>

<h2>8. Liên hệ</h2>
<ul>
  <li><strong>Email:</strong> <a href="mailto:billing@veilus.io">billing@veilus.io</a></li>
  <li><strong>Thời gian phản hồi:</strong> Trong 2 ngày làm việc</li>
</ul>`
    },

    zh: {
        title: "退款政策",
        description: "Veilus月付计划和终身计划的退款政策。",
        lastUpdated: "2026年9月28日",
        content: `
<h2>1. 概述</h2>
<p>我们希望您对Veilus满意。如不满意，可按以下条件申请退款。</p>
<h2>2. 免费方案</h2><p>免费方案永久免费，无需退款。</p>
<h2>3. 月付</h2>
<table><thead><tr><th>条件</th><th>退款</th></tr></thead><tbody><tr><td>任一次付款（首次购买或每次续费）后7天内</td><td>全额退款</td></tr><tr><td>该次付款7天后</td><td>不退款</td></tr></tbody></table>
<h2>4. 终身计划</h2>
<p>直接从Veilus购买的终身计划，14天后不可退款。</p>
<h2>5. 退款方式</h2>
<ul>
  <li><strong>越南盾（VND）银行转账订单：</strong>人工退款。请发送邮件至 <a href="mailto:billing@veilus.io">billing@veilus.io</a>，注明下单邮箱及订单号或许可证密钥。退款后，该许可证密钥将被停用。</li>
  <li><strong>美元（USD）银行卡订单：</strong>LemonSqueezy是银行卡付款的记录商家（merchant of record），退款通过LemonSqueezy按其退款流程退回原支付方式。</li>
</ul>
<h2>6. 联系方式</h2>
<p><a href="mailto:billing@veilus.io">billing@veilus.io</a>（2个工作日内回复）。</p>`
    },

    ru: {
        title: "Политика возврата",
        description: "Политика возврата средств для помесячного и бессрочного планов Veilus.",
        lastUpdated: "28 сентября 2026",
        content: `
<h2>1. Обзор</h2><p>Мы предлагаем возврат средств при следующих условиях.</p>
<h2>2-3. Помесячный план</h2>
<table><thead><tr><th>Условие</th><th>Возврат</th></tr></thead><tbody><tr><td>В течение 7 дней</td><td>Полный возврат</td></tr><tr><td>После 7 дней</td><td>Без возврата</td></tr></tbody></table>
<h2>4. Бессрочные планы</h2>
<p>Бессрочные планы, купленные напрямую у Veilus, не возвращаются после 14 дней.</p>
<h2>5. Как возвращаются деньги</h2>
<ul>
  <li><strong>Заказы в VND (банковский перевод):</strong> возврат выполняется вручную. Напишите на <a href="mailto:billing@veilus.io">billing@veilus.io</a>, указав email заказа и номер заказа или лицензионный ключ. После возврата лицензионный ключ отключается.</li>
  <li><strong>Заказы в USD (карта):</strong> LemonSqueezy выступает продавцом (merchant of record) по платежам картой, поэтому возврат выполняется через LemonSqueezy по его процедуре возврата на исходный способ оплаты.</li>
</ul>
<h2>6. Контакт</h2>
<p><a href="mailto:billing@veilus.io">billing@veilus.io</a></p>`
    },

    es: {
        title: "Política de Reembolso",
        description: "Política de reembolso para los planes mensual y de por vida de Veilus.",
        lastUpdated: "28 de septiembre de 2026",
        content: `
<h2>1. Resumen</h2><p>Ofrecemos reembolsos bajo las siguientes condiciones.</p>
<h2>2-3. Plan mensual</h2>
<table><thead><tr><th>Condición</th><th>Reembolso</th></tr></thead><tbody><tr><td>Dentro de 7 días</td><td>Reembolso total</td></tr><tr><td>Después de 7 días</td><td>Sin reembolso</td></tr></tbody></table>
<h2>4. Planes de por vida</h2>
<p>Los planes de por vida comprados directamente a Veilus no son reembolsables después de 14 días.</p>
<h2>5. Cómo se pagan los reembolsos</h2>
<ul>
  <li><strong>Pedidos en VND (transferencia bancaria):</strong> se reembolsan manualmente. Escriba a <a href="mailto:billing@veilus.io">billing@veilus.io</a> con el correo del pedido y su código de pedido o clave de licencia. Una vez emitido el reembolso, la clave de licencia se desactiva.</li>
  <li><strong>Pedidos en USD (tarjeta):</strong> LemonSqueezy actúa como comerciante registrado (merchant of record) de los pagos con tarjeta, por lo que los reembolsos se emiten a través de LemonSqueezy según su proceso de reembolso, al método de pago original.</li>
</ul>
<h2>6. Contacto</h2>
<p><a href="mailto:billing@veilus.io">billing@veilus.io</a></p>`
    },

    pt: {
        title: "Política de Reembolso",
        description: "Política de reembolso para os planos mensal e vitalício Veilus.",
        lastUpdated: "28 de setembro de 2026",
        content: `
<h2>1. Resumo</h2><p>Oferecemos reembolso nas seguintes condições.</p>
<h2>2-3. Plano mensal</h2>
<table><thead><tr><th>Condição</th><th>Reembolso</th></tr></thead><tbody><tr><td>Em 7 dias</td><td>Reembolso total</td></tr><tr><td>Após 7 dias</td><td>Sem reembolso</td></tr></tbody></table>
<h2>4. Planos vitalícios</h2>
<p>Planos vitalícios comprados diretamente da Veilus não são reembolsáveis após 14 dias.</p>
<h2>5. Como os reembolsos são pagos</h2>
<ul>
  <li><strong>Pedidos em VND (transferência bancária):</strong> reembolsados manualmente. Envie um e-mail para <a href="mailto:billing@veilus.io">billing@veilus.io</a> com o e-mail do pedido e o código do pedido ou a chave de licença. Após o reembolso, a chave de licença é desativada.</li>
  <li><strong>Pedidos em USD (cartão):</strong> o LemonSqueezy atua como comerciante registrado (merchant of record) dos pagamentos com cartão, então os reembolsos são feitos pelo LemonSqueezy conforme o processo de reembolso dele, para o método de pagamento original.</li>
</ul>
<h2>6. Contato</h2>
<p><a href="mailto:billing@veilus.io">billing@veilus.io</a></p>`
    },

    id: {
        title: "Kebijakan Pengembalian Dana",
        description: "Kebijakan pengembalian dana untuk paket bulanan dan seumur hidup Veilus.",
        lastUpdated: "28 September 2026",
        content: `
<h2>1. Ringkasan</h2><p>Kami menawarkan pengembalian dana dengan ketentuan berikut.</p>
<h2>2-3. Paket bulanan</h2>
<table><thead><tr><th>Ketentuan</th><th>Pengembalian</th></tr></thead><tbody><tr><td>Dalam 7 hari</td><td>Pengembalian penuh</td></tr><tr><td>Setelah 7 hari</td><td>Tidak ada pengembalian</td></tr></tbody></table>
<h2>4. Paket seumur hidup</h2>
<p>Paket seumur hidup yang dibeli langsung dari Veilus tidak dapat dikembalikan setelah 14 hari.</p>
<h2>5. Cara pengembalian dana</h2>
<ul>
  <li><strong>Pesanan VND (transfer bank):</strong> dikembalikan secara manual. Kirim email ke <a href="mailto:billing@veilus.io">billing@veilus.io</a> dengan email pesanan dan kode pesanan atau kunci lisensi Anda. Setelah dana dikembalikan, kunci lisensi dinonaktifkan.</li>
  <li><strong>Pesanan USD (kartu):</strong> LemonSqueezy adalah merchant of record untuk pembayaran kartu, sehingga pengembalian dana dilakukan melalui LemonSqueezy sesuai proses pengembalian dananya, ke metode pembayaran asli.</li>
</ul>
<h2>6. Kontak</h2>
<p><a href="mailto:billing@veilus.io">billing@veilus.io</a></p>`
    },

    tr: {
        title: "İade Politikası",
        description: "Veilus aylık ve ömür boyu planları için iade politikası.",
        lastUpdated: "28 Eylül 2026",
        content: `
<h2>1. Özet</h2><p>Aşağıdaki koşullarda iade sunuyoruz.</p>
<h2>2-3. Aylık plan</h2>
<table><thead><tr><th>Koşul</th><th>İade</th></tr></thead><tbody><tr><td>7 gün içinde</td><td>Tam iade</td></tr><tr><td>7 gün sonra</td><td>İade yok</td></tr></tbody></table>
<h2>4. Ömür boyu planlar</h2>
<p>Doğrudan Veilus'tan satın alınan ömür boyu planlar 14 gün sonra iade edilemez.</p>
<h2>5. İadeler nasıl ödenir</h2>
<ul>
  <li><strong>VND siparişleri (banka havalesi):</strong> elle iade edilir. Sipariş e-postanız ve sipariş kodunuz ya da lisans anahtarınızla <a href="mailto:billing@veilus.io">billing@veilus.io</a> adresine yazın. İade yapıldığında lisans anahtarı devre dışı bırakılır.</li>
  <li><strong>USD siparişleri (kart):</strong> kart ödemelerinde satıcı (merchant of record) LemonSqueezy'dir; bu nedenle iadeler LemonSqueezy üzerinden, onun iade sürecine göre, orijinal ödeme yöntemine yapılır.</li>
</ul>
<h2>6. İletişim</h2>
<p><a href="mailto:billing@veilus.io">billing@veilus.io</a></p>`
    }
};
