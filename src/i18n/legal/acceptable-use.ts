/** Acceptable Use Policy translations – keyed by Lang code (VEIL-1313). Mở rộng Terms §5; Terms vẫn là văn bản ràng buộc. */
export const acceptableUseTranslations: Record<string, {
    title: string;
    description: string;
    lastUpdated: string;
    content: string;
}> = {
    en: {
        title: "Acceptable Use Policy",
        description: "What you may and may not do with Veilus, how to report abuse, and what happens when this policy is broken.",
        lastUpdated: "October 8, 2026",
        content: `
<h2>1. Purpose</h2>
<p>Veilus gives each browser profile its own fingerprint, storage and proxy so that separate accounts stay separate. This policy explains what you may use that for and what you may not. It is part of our <a href="/terms/">Terms of Service</a> and applies to every plan, including Free.</p>

<h2>2. Permitted use</h2>
<p>Typical, legitimate uses of Veilus include:</p>
<ul>
  <li>Agencies managing advertising or social media accounts for clients, with the clients' permission</li>
  <li>Sellers keeping each storefront or marketplace account in its own browser</li>
  <li>Social media managers working with several brand accounts side by side</li>
  <li>QA engineers and developers checking how a site behaves on different devices, languages and locations</li>
  <li>Researchers collecting publicly available data with real browser profiles</li>
  <li>Anyone who wants to limit cross-site tracking of their own browsing</li>
</ul>
<p>In every case, the accounts you manage must be yours or managed with the explicit permission of their owner, and your use of each platform must follow that platform's own rules.</p>

<h2>3. Prohibited use</h2>
<p>You may not use Veilus to:</p>
<ul>
  <li>Break any law or regulation that applies to you</li>
  <li>Commit fraud, identity theft or phishing, or deceive people for money</li>
  <li>Access, take over or trade accounts that do not belong to you</li>
  <li>Evade a suspension or ban that a platform imposed on you for fraud or abuse, or create replacement accounts to get around it</li>
  <li>Run fake engagement: fake reviews, fake votes, fake followers, bulk fake sign-ups or spam</li>
  <li>Abuse promotions, referral programs, airdrops, giveaways or free trials by pretending to be many different people (so-called Sybil attacks)</li>
  <li>Scrape or access systems without authorization, or against a site's technical restrictions for illegal purposes</li>
  <li>Distribute malware or harmful code, or attack other systems</li>
  <li>Harass, threaten or stalk other people</li>
  <li>Produce or distribute child sexual abuse material, or facilitate terrorism, human trafficking or other serious crimes</li>
  <li>Resell, share or publish license keys, or interfere with the license and device checks of the Service</li>
</ul>

<h2>4. Third-party platforms</h2>
<p>You are solely responsible for complying with the terms of service of every website and platform you access through Veilus. A separate browser profile does not make a prohibited activity allowed. Veilus does not promise that any platform will accept your accounts, and we do not help anyone get around a platform's enforcement actions.</p>

<h2>5. Reporting abuse</h2>
<p>If you believe someone is using Veilus in a way that breaks this policy, email <a href="mailto:legal@veilus.io">legal@veilus.io</a>. Include what you observed, where, and when, and any evidence you can share. We review every report; we may not be able to reply to each one individually.</p>

<h2>6. Enforcement</h2>
<p>Depending on how serious a violation is, we may:</p>
<ul>
  <li>Warn you and ask you to stop</li>
  <li>Suspend your license key until the issue is resolved</li>
  <li>Terminate your license without refund, as described in the <a href="/terms/">Terms</a> and the <a href="/refund/">Refund Policy</a></li>
  <li>Cooperate with lawful requests from authorities</li>
</ul>
<p>Veilus stores profile data on your own machine and cannot see what you do inside a profile. Enforcement is based on reports, payment disputes and information you give us, not on monitoring your browsing.</p>

<h2>7. Changes</h2>
<p>We may update this policy as the product and the law change. The date at the top shows the latest revision. Continued use after a change means you accept the updated policy.</p>

<h2>8. Contact</h2>
<ul>
  <li><strong>Email:</strong> <a href="mailto:legal@veilus.io">legal@veilus.io</a></li>
  <li><strong>Website:</strong> <a href="https://veilus.io">veilus.io</a></li>
</ul>`
    },

    vi: {
        title: "Chính sách Sử dụng Chấp nhận được",
        description: "Bạn được và không được dùng Veilus vào việc gì, cách báo cáo lạm dụng, và điều gì xảy ra khi vi phạm.",
        lastUpdated: "8 tháng 10, 2026",
        content: `
<h2>1. Mục đích</h2>
<p>Veilus cho mỗi profile trình duyệt một fingerprint, bộ nhớ và proxy riêng để các tài khoản tách biệt nhau. Chính sách này nói rõ bạn được dùng điều đó vào việc gì và không được vào việc gì. Nó là một phần của <a href="/vi/terms/">Điều khoản Dịch vụ</a> và áp dụng cho mọi gói, kể cả gói Free.</p>

<h2>2. Việc được phép</h2>
<p>Những cách dùng Veilus hợp lệ và phổ biến:</p>
<ul>
  <li>Agency quản lý tài khoản quảng cáo hoặc mạng xã hội cho khách hàng, có sự cho phép của khách</li>
  <li>Người bán giữ mỗi gian hàng hoặc tài khoản sàn trong một trình duyệt riêng</li>
  <li>Người quản lý mạng xã hội làm việc với nhiều tài khoản thương hiệu cạnh nhau</li>
  <li>Kỹ sư QA và lập trình viên kiểm tra website trên nhiều thiết bị, ngôn ngữ và vị trí</li>
  <li>Người nghiên cứu thu thập dữ liệu công khai bằng profile trình duyệt thật</li>
  <li>Bất kỳ ai muốn hạn chế việc bị theo dõi chéo trang khi tự duyệt web</li>
</ul>
<p>Trong mọi trường hợp, tài khoản bạn quản lý phải là của bạn hoặc được chủ tài khoản cho phép rõ ràng, và cách bạn dùng mỗi nền tảng phải tuân theo quy định của chính nền tảng đó.</p>

<h2>3. Việc bị cấm</h2>
<p>Bạn không được dùng Veilus để:</p>
<ul>
  <li>Vi phạm bất kỳ luật hay quy định nào áp dụng với bạn</li>
  <li>Lừa đảo, đánh cắp danh tính, phishing, hoặc lừa người khác để lấy tiền</li>
  <li>Truy cập, chiếm đoạt hoặc mua bán tài khoản không thuộc về bạn</li>
  <li>Lách lệnh đình chỉ hoặc khoá mà một nền tảng đã áp cho bạn vì gian lận hoặc lạm dụng, hoặc tạo tài khoản thay thế để vượt qua lệnh đó</li>
  <li>Tạo tương tác giả: đánh giá giả, bình chọn giả, người theo dõi giả, đăng ký hàng loạt giả hoặc spam</li>
  <li>Lạm dụng khuyến mãi, chương trình giới thiệu, airdrop, quà tặng hoặc bản dùng thử bằng cách giả làm nhiều người khác nhau (tấn công Sybil)</li>
  <li>Thu thập dữ liệu hoặc truy cập hệ thống trái phép, hoặc vượt rào kỹ thuật của một trang vì mục đích bất hợp pháp</li>
  <li>Phát tán mã độc, hoặc tấn công hệ thống khác</li>
  <li>Quấy rối, đe doạ hoặc theo dõi người khác</li>
  <li>Tạo hoặc phát tán nội dung xâm hại tình dục trẻ em, hoặc hỗ trợ khủng bố, buôn người và các tội nghiêm trọng khác</li>
  <li>Bán lại, chia sẻ hoặc công bố license key, hoặc can thiệp vào cơ chế kiểm tra license và thiết bị của Dịch vụ</li>
</ul>

<h2>4. Nền tảng bên thứ ba</h2>
<p>Bạn tự chịu toàn bộ trách nhiệm tuân thủ điều khoản dịch vụ của mọi trang web và nền tảng bạn truy cập qua Veilus. Một profile trình duyệt riêng không biến việc bị cấm thành việc được phép. Veilus không hứa rằng nền tảng nào sẽ chấp nhận tài khoản của bạn, và chúng tôi không giúp ai vượt qua biện pháp xử lý của một nền tảng.</p>

<h2>5. Báo cáo lạm dụng</h2>
<p>Nếu bạn cho rằng ai đó đang dùng Veilus trái với chính sách này, gửi email tới <a href="mailto:legal@veilus.io">legal@veilus.io</a>. Hãy nêu bạn thấy gì, ở đâu, khi nào, kèm bằng chứng bạn có thể chia sẻ. Chúng tôi xem xét mọi báo cáo, nhưng có thể không trả lời riêng từng báo cáo.</p>

<h2>6. Xử lý vi phạm</h2>
<p>Tuỳ mức độ nghiêm trọng, chúng tôi có thể:</p>
<ul>
  <li>Cảnh báo và yêu cầu bạn dừng lại</li>
  <li>Tạm khoá license key cho tới khi vấn đề được giải quyết</li>
  <li>Chấm dứt license mà không hoàn tiền, theo <a href="/vi/terms/">Điều khoản</a> và <a href="/vi/refund/">Chính sách hoàn tiền</a></li>
  <li>Hợp tác với yêu cầu hợp pháp của cơ quan chức năng</li>
</ul>
<p>Veilus lưu dữ liệu profile trên máy của bạn và không thấy bạn làm gì bên trong profile. Việc xử lý dựa trên báo cáo, tranh chấp thanh toán và thông tin bạn cung cấp, không dựa trên việc theo dõi bạn duyệt web.</p>

<h2>7. Thay đổi</h2>
<p>Chúng tôi có thể cập nhật chính sách này khi sản phẩm và pháp luật thay đổi. Ngày ở đầu trang là lần sửa gần nhất. Tiếp tục dùng sau khi thay đổi nghĩa là bạn chấp nhận chính sách mới.</p>

<h2>8. Liên hệ</h2>
<ul>
  <li><strong>Email:</strong> <a href="mailto:legal@veilus.io">legal@veilus.io</a></li>
  <li><strong>Website:</strong> <a href="https://veilus.io">veilus.io</a></li>
</ul>`
    },

    zh: {
        title: "可接受使用政策",
        description: "你可以和不可以用 Veilus 做什么、如何举报滥用，以及违反本政策的后果。",
        lastUpdated: "2026 年 10 月 8 日",
        content: `
<h2>1. 目的</h2>
<p>Veilus 为每个浏览器配置文件提供独立的指纹、存储和代理，让不同账号彼此隔离。本政策说明你可以将其用于什么、不可以用于什么。它是<a href="/zh/terms/">服务条款</a>的一部分，适用于包括 Free 在内的所有套餐。</p>

<h2>2. 允许的用途</h2>
<p>Veilus 常见且合法的用途包括：</p>
<ul>
  <li>代理机构在客户许可下管理客户的广告或社交媒体账号</li>
  <li>卖家将每个店铺或平台账号放在各自独立的浏览器中</li>
  <li>社交媒体运营人员并排管理多个品牌账号</li>
  <li>QA 工程师和开发者检查网站在不同设备、语言和地区下的表现</li>
  <li>研究人员用真实的浏览器配置文件收集公开数据</li>
  <li>任何希望减少自己浏览被跨站追踪的人</li>
</ul>
<p>在任何情况下，你管理的账号必须属于你本人，或已获得账号所有者的明确许可；你对每个平台的使用都必须遵守该平台自身的规则。</p>

<h2>3. 禁止的用途</h2>
<p>你不得使用 Veilus：</p>
<ul>
  <li>违反适用于你的任何法律或法规</li>
  <li>实施欺诈、身份盗用或钓鱼，或为获利欺骗他人</li>
  <li>访问、接管或买卖不属于你的账号</li>
  <li>规避平台因欺诈或滥用而对你施加的封禁或限制，或注册替代账号绕过该处罚</li>
  <li>制造虚假互动：刷评论、刷票、刷粉丝、批量虚假注册或垃圾信息</li>
  <li>通过冒充多个不同的人来滥用促销、推荐计划、空投、赠品或免费试用（即所谓的女巫攻击）</li>
  <li>未经授权抓取或访问系统，或出于非法目的绕过网站的技术限制</li>
  <li>传播恶意软件或有害代码，或攻击其他系统</li>
  <li>骚扰、威胁或跟踪他人</li>
  <li>制作或传播儿童性虐待内容，或为恐怖主义、人口贩运及其他严重犯罪提供便利</li>
  <li>转售、共享或公开许可证密钥，或干扰服务的许可证与设备校验</li>
</ul>

<h2>4. 第三方平台</h2>
<p>你需自行负责遵守通过 Veilus 访问的每个网站和平台的服务条款。独立的浏览器配置文件不会让被禁止的行为变成被允许的行为。Veilus 不承诺任何平台会接受你的账号，也不会帮助任何人规避平台的处置措施。</p>

<h2>5. 举报滥用</h2>
<p>如果你认为有人以违反本政策的方式使用 Veilus，请发送邮件至 <a href="mailto:legal@veilus.io">legal@veilus.io</a>，说明你看到了什么、在哪里、何时发生，并附上可以提供的证据。我们会审阅每一份举报，但可能无法逐一回复。</p>

<h2>6. 处理措施</h2>
<p>视违规严重程度，我们可能会：</p>
<ul>
  <li>向你发出警告并要求停止</li>
  <li>暂停你的许可证密钥，直至问题解决</li>
  <li>终止你的许可证且不予退款，详见<a href="/zh/terms/">服务条款</a>和<a href="/zh/refund/">退款政策</a></li>
  <li>配合执法机关的合法要求</li>
</ul>
<p>Veilus 将配置文件数据存储在你自己的电脑上，无法看到你在配置文件内做了什么。处理依据是举报、支付争议以及你提供的信息，而不是对你浏览行为的监控。</p>

<h2>7. 变更</h2>
<p>随着产品和法律的变化，我们可能更新本政策。页面顶部的日期为最近一次修订。变更后继续使用即表示你接受更新后的政策。</p>

<h2>8. 联系方式</h2>
<ul>
  <li><strong>邮箱：</strong><a href="mailto:legal@veilus.io">legal@veilus.io</a></li>
  <li><strong>网站：</strong><a href="https://veilus.io">veilus.io</a></li>
</ul>`
    },

    ru: {
        title: "Политика допустимого использования",
        description: "Что можно и чего нельзя делать с Veilus, как сообщить о злоупотреблении и что происходит при нарушении.",
        lastUpdated: "8 октября 2026 г.",
        content: `
<h2>1. Назначение</h2>
<p>Veilus даёт каждому профилю браузера собственный отпечаток, хранилище и прокси, чтобы разные аккаунты оставались изолированными. Эта политика объясняет, для чего это можно использовать, а для чего нельзя. Она является частью <a href="/ru/terms/">Условий использования</a> и действует для всех тарифов, включая Free.</p>

<h2>2. Разрешённое использование</h2>
<p>Типичные и законные сценарии использования Veilus:</p>
<ul>
  <li>Агентства ведут рекламные аккаунты и аккаунты в соцсетях для клиентов с их разрешения</li>
  <li>Продавцы держат каждый магазин или аккаунт на маркетплейсе в отдельном браузере</li>
  <li>SMM-специалисты работают с несколькими аккаунтами брендов одновременно</li>
  <li>QA-инженеры и разработчики проверяют, как сайт ведёт себя на разных устройствах, языках и в разных регионах</li>
  <li>Исследователи собирают общедоступные данные с помощью настоящих профилей браузера</li>
  <li>Все, кто хочет ограничить межсайтовое отслеживание собственного сёрфинга</li>
</ul>
<p>В любом случае аккаунты, которыми вы управляете, должны принадлежать вам или использоваться с явного разрешения их владельца, а работа с каждой платформой должна соответствовать правилам самой платформы.</p>

<h2>3. Запрещённое использование</h2>
<p>Запрещается использовать Veilus, чтобы:</p>
<ul>
  <li>Нарушать применимые к вам законы и нормативные акты</li>
  <li>Совершать мошенничество, кражу личности или фишинг, обманывать людей ради денег</li>
  <li>Получать доступ к чужим аккаунтам, захватывать их или торговать ими</li>
  <li>Обходить блокировку или ограничение, наложенные платформой за мошенничество или злоупотребления, или создавать для этого новые аккаунты</li>
  <li>Создавать фальшивую активность: поддельные отзывы, голоса, подписчиков, массовые фиктивные регистрации или спам</li>
  <li>Злоупотреблять акциями, реферальными программами, аирдропами, розыгрышами или пробными периодами, выдавая себя за множество разных людей (так называемые атаки Сивиллы)</li>
  <li>Собирать данные или получать доступ к системам без разрешения либо в обход технических ограничений сайта в незаконных целях</li>
  <li>Распространять вредоносный код или атаковать другие системы</li>
  <li>Преследовать, запугивать других людей или следить за ними</li>
  <li>Создавать или распространять материалы с сексуальным насилием над детьми, содействовать терроризму, торговле людьми и другим тяжким преступлениям</li>
  <li>Перепродавать, передавать или публиковать лицензионные ключи, вмешиваться в проверку лицензии и устройств в Сервисе</li>
</ul>

<h2>4. Сторонние платформы</h2>
<p>Вы несёте полную ответственность за соблюдение условий использования каждого сайта и платформы, к которым обращаетесь через Veilus. Отдельный профиль браузера не превращает запрещённое действие в разрешённое. Veilus не обещает, что какая-либо платформа примет ваши аккаунты, и мы никому не помогаем обходить меры, принятые платформой.</p>

<h2>5. Сообщить о злоупотреблении</h2>
<p>Если вы считаете, что кто-то использует Veilus с нарушением этой политики, напишите на <a href="mailto:legal@veilus.io">legal@veilus.io</a>. Укажите, что, где и когда вы наблюдали, и приложите доказательства, которыми можете поделиться. Мы рассматриваем каждое сообщение, но не всегда можем ответить на каждое лично.</p>

<h2>6. Меры</h2>
<p>В зависимости от серьёзности нарушения мы можем:</p>
<ul>
  <li>Предупредить вас и попросить прекратить</li>
  <li>Приостановить действие лицензионного ключа до устранения проблемы</li>
  <li>Прекратить лицензию без возврата средств, как описано в <a href="/ru/terms/">Условиях</a> и <a href="/ru/refund/">Политике возврата</a></li>
  <li>Выполнять законные запросы государственных органов</li>
</ul>
<p>Veilus хранит данные профилей на вашем компьютере и не видит, что вы делаете внутри профиля. Меры принимаются на основании сообщений, платёжных споров и информации, которую вы нам предоставляете, а не на основании слежки за вашим сёрфингом.</p>

<h2>7. Изменения</h2>
<p>Мы можем обновлять эту политику по мере развития продукта и изменения законодательства. Дата вверху страницы соответствует последней редакции. Продолжая пользоваться сервисом после изменений, вы принимаете обновлённую политику.</p>

<h2>8. Контакты</h2>
<ul>
  <li><strong>Email:</strong> <a href="mailto:legal@veilus.io">legal@veilus.io</a></li>
  <li><strong>Сайт:</strong> <a href="https://veilus.io">veilus.io</a></li>
</ul>`
    },

    es: {
        title: "Política de uso aceptable",
        description: "Qué puede y qué no puede hacer con Veilus, cómo denunciar abusos y qué ocurre si se incumple esta política.",
        lastUpdated: "8 de octubre de 2026",
        content: `
<h2>1. Finalidad</h2>
<p>Veilus da a cada perfil de navegador su propia huella digital, su propio almacenamiento y su propio proxy para que las cuentas se mantengan separadas. Esta política explica para qué puede usarlo y para qué no. Forma parte de los <a href="/es/terms/">Términos del servicio</a> y se aplica a todos los planes, incluido Free.</p>

<h2>2. Uso permitido</h2>
<p>Usos habituales y legítimos de Veilus:</p>
<ul>
  <li>Agencias que gestionan cuentas publicitarias o de redes sociales de sus clientes, con el permiso de estos</li>
  <li>Vendedores que mantienen cada tienda o cuenta de marketplace en su propio navegador</li>
  <li>Gestores de redes sociales que trabajan con varias cuentas de marca a la vez</li>
  <li>Ingenieros de QA y desarrolladores que comprueban cómo se comporta un sitio en distintos dispositivos, idiomas y ubicaciones</li>
  <li>Investigadores que recopilan datos públicos con perfiles de navegador reales</li>
  <li>Cualquier persona que quiera limitar el rastreo entre sitios de su propia navegación</li>
</ul>
<p>En todos los casos, las cuentas que gestione deben ser suyas o gestionarse con el permiso explícito de su titular, y su uso de cada plataforma debe respetar las normas de esa plataforma.</p>

<h2>3. Uso prohibido</h2>
<p>No puede usar Veilus para:</p>
<ul>
  <li>Infringir cualquier ley o normativa que le sea aplicable</li>
  <li>Cometer fraude, suplantación de identidad o phishing, o engañar a personas para obtener dinero</li>
  <li>Acceder a cuentas que no le pertenecen, apropiarse de ellas o comerciar con ellas</li>
  <li>Eludir una suspensión o un bloqueo que una plataforma le impuso por fraude o abuso, o crear cuentas de reemplazo para saltárselo</li>
  <li>Generar interacción falsa: reseñas, votos o seguidores falsos, registros masivos falsos o spam</li>
  <li>Abusar de promociones, programas de referidos, airdrops, sorteos o pruebas gratuitas haciéndose pasar por muchas personas distintas (los llamados ataques Sybil)</li>
  <li>Extraer datos o acceder a sistemas sin autorización, o saltarse las restricciones técnicas de un sitio con fines ilegales</li>
  <li>Distribuir malware o código dañino, o atacar otros sistemas</li>
  <li>Acosar, amenazar o vigilar a otras personas</li>
  <li>Producir o distribuir material de abuso sexual infantil, o facilitar el terrorismo, la trata de personas u otros delitos graves</li>
  <li>Revender, compartir o publicar claves de licencia, o interferir en las comprobaciones de licencia y dispositivo del Servicio</li>
</ul>

<h2>4. Plataformas de terceros</h2>
<p>Usted es el único responsable de cumplir los términos de servicio de cada sitio web y plataforma a los que acceda a través de Veilus. Un perfil de navegador separado no convierte una actividad prohibida en permitida. Veilus no promete que ninguna plataforma vaya a aceptar sus cuentas, y no ayudamos a nadie a eludir las medidas que aplica una plataforma.</p>

<h2>5. Denunciar abusos</h2>
<p>Si cree que alguien está usando Veilus de forma contraria a esta política, escriba a <a href="mailto:legal@veilus.io">legal@veilus.io</a>. Indique qué observó, dónde y cuándo, y adjunte las pruebas que pueda compartir. Revisamos todas las denuncias, aunque quizá no podamos responder a cada una individualmente.</p>

<h2>6. Medidas</h2>
<p>Según la gravedad de la infracción, podemos:</p>
<ul>
  <li>Advertirle y pedirle que cese</li>
  <li>Suspender su clave de licencia hasta que se resuelva el problema</li>
  <li>Cancelar su licencia sin reembolso, según los <a href="/es/terms/">Términos</a> y la <a href="/es/refund/">Política de reembolso</a></li>
  <li>Colaborar con las solicitudes legales de las autoridades</li>
</ul>
<p>Veilus guarda los datos de los perfiles en su propio equipo y no puede ver lo que hace dentro de un perfil. Las medidas se basan en denuncias, disputas de pago y la información que usted nos facilita, no en la vigilancia de su navegación.</p>

<h2>7. Cambios</h2>
<p>Podemos actualizar esta política a medida que cambien el producto y la legislación. La fecha de la parte superior indica la última revisión. Seguir usando el servicio tras un cambio implica aceptar la política actualizada.</p>

<h2>8. Contacto</h2>
<ul>
  <li><strong>Correo:</strong> <a href="mailto:legal@veilus.io">legal@veilus.io</a></li>
  <li><strong>Sitio web:</strong> <a href="https://veilus.io">veilus.io</a></li>
</ul>`
    },

    pt: {
        title: "Política de uso aceitável",
        description: "O que você pode e não pode fazer com o Veilus, como denunciar abusos e o que acontece quando esta política é violada.",
        lastUpdated: "8 de outubro de 2026",
        content: `
<h2>1. Finalidade</h2>
<p>O Veilus dá a cada perfil de navegador sua própria impressão digital, seu próprio armazenamento e seu próprio proxy, para que contas distintas permaneçam separadas. Esta política explica para que você pode usar isso e para que não pode. Ela faz parte dos <a href="/pt/terms/">Termos de Serviço</a> e vale para todos os planos, inclusive o Free.</p>

<h2>2. Uso permitido</h2>
<p>Usos comuns e legítimos do Veilus:</p>
<ul>
  <li>Agências que gerenciam contas de anúncios ou de redes sociais de clientes, com a permissão deles</li>
  <li>Vendedores que mantêm cada loja ou conta de marketplace em seu próprio navegador</li>
  <li>Gestores de redes sociais que trabalham com várias contas de marca lado a lado</li>
  <li>Engenheiros de QA e desenvolvedores que verificam como um site se comporta em diferentes dispositivos, idiomas e localizações</li>
  <li>Pesquisadores que coletam dados públicos com perfis de navegador reais</li>
  <li>Qualquer pessoa que queira limitar o rastreamento entre sites da própria navegação</li>
</ul>
<p>Em todos os casos, as contas que você gerencia devem ser suas ou gerenciadas com a permissão explícita do titular, e o uso de cada plataforma deve seguir as regras da própria plataforma.</p>

<h2>3. Uso proibido</h2>
<p>Você não pode usar o Veilus para:</p>
<ul>
  <li>Violar qualquer lei ou regulamento aplicável a você</li>
  <li>Cometer fraude, roubo de identidade ou phishing, ou enganar pessoas para obter dinheiro</li>
  <li>Acessar, assumir ou negociar contas que não lhe pertencem</li>
  <li>Contornar uma suspensão ou um banimento que uma plataforma aplicou a você por fraude ou abuso, ou criar contas substitutas para escapar dele</li>
  <li>Gerar engajamento falso: avaliações, votos ou seguidores falsos, cadastros falsos em massa ou spam</li>
  <li>Abusar de promoções, programas de indicação, airdrops, sorteios ou testes gratuitos fingindo ser várias pessoas diferentes (os chamados ataques Sybil)</li>
  <li>Extrair dados ou acessar sistemas sem autorização, ou burlar as restrições técnicas de um site para fins ilegais</li>
  <li>Distribuir malware ou código nocivo, ou atacar outros sistemas</li>
  <li>Assediar, ameaçar ou perseguir outras pessoas</li>
  <li>Produzir ou distribuir material de abuso sexual infantil, ou facilitar terrorismo, tráfico de pessoas ou outros crimes graves</li>
  <li>Revender, compartilhar ou publicar chaves de licença, ou interferir nas verificações de licença e dispositivo do Serviço</li>
</ul>

<h2>4. Plataformas de terceiros</h2>
<p>Você é o único responsável por cumprir os termos de serviço de cada site e plataforma que acessa pelo Veilus. Um perfil de navegador separado não transforma uma atividade proibida em permitida. O Veilus não promete que alguma plataforma aceitará suas contas, e não ajudamos ninguém a contornar as medidas aplicadas por uma plataforma.</p>

<h2>5. Denunciar abusos</h2>
<p>Se você acredita que alguém está usando o Veilus de forma contrária a esta política, escreva para <a href="mailto:legal@veilus.io">legal@veilus.io</a>. Informe o que observou, onde e quando, e inclua as provas que puder compartilhar. Analisamos todas as denúncias, mas talvez não consigamos responder a cada uma individualmente.</p>

<h2>6. Medidas</h2>
<p>Dependendo da gravidade da violação, podemos:</p>
<ul>
  <li>Avisar você e pedir que pare</li>
  <li>Suspender sua chave de licença até que o problema seja resolvido</li>
  <li>Encerrar sua licença sem reembolso, conforme os <a href="/pt/terms/">Termos</a> e a <a href="/pt/refund/">Política de reembolso</a></li>
  <li>Cooperar com solicitações legais das autoridades</li>
</ul>
<p>O Veilus guarda os dados dos perfis no seu próprio computador e não vê o que você faz dentro de um perfil. As medidas se baseiam em denúncias, disputas de pagamento e nas informações que você nos fornece, não no monitoramento da sua navegação.</p>

<h2>7. Alterações</h2>
<p>Podemos atualizar esta política conforme o produto e a legislação mudam. A data no topo indica a revisão mais recente. Continuar usando após uma alteração significa aceitar a política atualizada.</p>

<h2>8. Contato</h2>
<ul>
  <li><strong>E-mail:</strong> <a href="mailto:legal@veilus.io">legal@veilus.io</a></li>
  <li><strong>Site:</strong> <a href="https://veilus.io">veilus.io</a></li>
</ul>`
    },

    id: {
        title: "Kebijakan Penggunaan yang Dapat Diterima",
        description: "Apa yang boleh dan tidak boleh Anda lakukan dengan Veilus, cara melaporkan penyalahgunaan, dan apa yang terjadi jika kebijakan ini dilanggar.",
        lastUpdated: "8 Oktober 2026",
        content: `
<h2>1. Tujuan</h2>
<p>Veilus memberi setiap profil browser sidik jari, penyimpanan, dan proxy sendiri agar akun yang berbeda tetap terpisah. Kebijakan ini menjelaskan untuk apa Anda boleh memakainya dan untuk apa tidak. Kebijakan ini adalah bagian dari <a href="/id/terms/">Ketentuan Layanan</a> dan berlaku untuk semua paket, termasuk Free.</p>

<h2>2. Penggunaan yang diizinkan</h2>
<p>Penggunaan Veilus yang umum dan sah antara lain:</p>
<ul>
  <li>Agensi yang mengelola akun iklan atau media sosial milik klien, dengan izin klien</li>
  <li>Penjual yang menempatkan setiap toko atau akun marketplace di browser tersendiri</li>
  <li>Pengelola media sosial yang menangani beberapa akun merek secara berdampingan</li>
  <li>Insinyur QA dan pengembang yang memeriksa perilaku situs pada berbagai perangkat, bahasa, dan lokasi</li>
  <li>Peneliti yang mengumpulkan data publik dengan profil browser sungguhan</li>
  <li>Siapa pun yang ingin membatasi pelacakan lintas situs atas aktivitas browsingnya sendiri</li>
</ul>
<p>Dalam setiap kasus, akun yang Anda kelola harus milik Anda sendiri atau dikelola dengan izin tegas dari pemiliknya, dan penggunaan Anda di setiap platform harus mengikuti aturan platform tersebut.</p>

<h2>3. Penggunaan yang dilarang</h2>
<p>Anda tidak boleh menggunakan Veilus untuk:</p>
<ul>
  <li>Melanggar hukum atau peraturan apa pun yang berlaku bagi Anda</li>
  <li>Melakukan penipuan, pencurian identitas, atau phishing, atau menipu orang demi uang</li>
  <li>Mengakses, mengambil alih, atau memperjualbelikan akun yang bukan milik Anda</li>
  <li>Menghindari penangguhan atau pemblokiran yang dijatuhkan platform kepada Anda karena penipuan atau penyalahgunaan, atau membuat akun pengganti untuk mengakalinya</li>
  <li>Membuat interaksi palsu: ulasan, suara, atau pengikut palsu, pendaftaran massal palsu, atau spam</li>
  <li>Menyalahgunakan promosi, program referral, airdrop, giveaway, atau uji coba gratis dengan berpura-pura menjadi banyak orang berbeda (yang disebut serangan Sybil)</li>
  <li>Mengambil data atau mengakses sistem tanpa izin, atau menerobos pembatasan teknis sebuah situs untuk tujuan ilegal</li>
  <li>Menyebarkan malware atau kode berbahaya, atau menyerang sistem lain</li>
  <li>Melecehkan, mengancam, atau menguntit orang lain</li>
  <li>Membuat atau menyebarkan materi pelecehan seksual anak, atau memfasilitasi terorisme, perdagangan manusia, atau kejahatan berat lainnya</li>
  <li>Menjual kembali, membagikan, atau mempublikasikan kunci lisensi, atau mengganggu pemeriksaan lisensi dan perangkat pada Layanan</li>
</ul>

<h2>4. Platform pihak ketiga</h2>
<p>Anda sepenuhnya bertanggung jawab untuk mematuhi ketentuan layanan setiap situs web dan platform yang Anda akses melalui Veilus. Profil browser yang terpisah tidak mengubah aktivitas terlarang menjadi diizinkan. Veilus tidak menjanjikan bahwa platform mana pun akan menerima akun Anda, dan kami tidak membantu siapa pun mengakali tindakan penegakan suatu platform.</p>

<h2>5. Melaporkan penyalahgunaan</h2>
<p>Jika Anda yakin seseorang menggunakan Veilus dengan cara yang melanggar kebijakan ini, kirim email ke <a href="mailto:legal@veilus.io">legal@veilus.io</a>. Sebutkan apa yang Anda amati, di mana, dan kapan, serta lampirkan bukti yang bisa Anda bagikan. Kami meninjau setiap laporan, meski mungkin tidak dapat membalas satu per satu.</p>

<h2>6. Penegakan</h2>
<p>Tergantung seberapa serius pelanggarannya, kami dapat:</p>
<ul>
  <li>Memperingatkan Anda dan meminta Anda berhenti</li>
  <li>Menangguhkan kunci lisensi Anda sampai masalah terselesaikan</li>
  <li>Mengakhiri lisensi Anda tanpa pengembalian dana, sebagaimana dijelaskan dalam <a href="/id/terms/">Ketentuan</a> dan <a href="/id/refund/">Kebijakan Pengembalian Dana</a></li>
  <li>Bekerja sama dengan permintaan sah dari pihak berwenang</li>
</ul>
<p>Veilus menyimpan data profil di komputer Anda sendiri dan tidak dapat melihat apa yang Anda lakukan di dalam profil. Penegakan didasarkan pada laporan, sengketa pembayaran, dan informasi yang Anda berikan, bukan pada pemantauan aktivitas browsing Anda.</p>

<h2>7. Perubahan</h2>
<p>Kami dapat memperbarui kebijakan ini seiring perubahan produk dan hukum. Tanggal di bagian atas menunjukkan revisi terbaru. Terus menggunakan layanan setelah perubahan berarti Anda menerima kebijakan yang diperbarui.</p>

<h2>8. Kontak</h2>
<ul>
  <li><strong>Email:</strong> <a href="mailto:legal@veilus.io">legal@veilus.io</a></li>
  <li><strong>Situs web:</strong> <a href="https://veilus.io">veilus.io</a></li>
</ul>`
    },

    tr: {
        title: "Kabul Edilebilir Kullanım Politikası",
        description: "Veilus ile neleri yapıp neleri yapamayacağınız, kötüye kullanımı nasıl bildireceğiniz ve bu politika ihlal edildiğinde ne olacağı.",
        lastUpdated: "8 Ekim 2026",
        content: `
<h2>1. Amaç</h2>
<p>Veilus, farklı hesapların birbirinden ayrı kalması için her tarayıcı profiline kendi parmak izini, depolamasını ve proxy'sini verir. Bu politika, bunu ne için kullanabileceğinizi ve ne için kullanamayacağınızı açıklar. <a href="/tr/terms/">Hizmet Şartları</a>'nın bir parçasıdır ve Free dahil tüm planlar için geçerlidir.</p>

<h2>2. İzin verilen kullanım</h2>
<p>Veilus'un yaygın ve meşru kullanımları:</p>
<ul>
  <li>Müşterilerinin izniyle onların reklam veya sosyal medya hesaplarını yöneten ajanslar</li>
  <li>Her mağazayı veya pazar yeri hesabını kendi tarayıcısında tutan satıcılar</li>
  <li>Birden fazla marka hesabıyla yan yana çalışan sosyal medya yöneticileri</li>
  <li>Bir sitenin farklı cihaz, dil ve konumlarda nasıl davrandığını kontrol eden QA mühendisleri ve geliştiriciler</li>
  <li>Gerçek tarayıcı profilleriyle herkese açık veri toplayan araştırmacılar</li>
  <li>Kendi gezintisinin siteler arası izlenmesini sınırlamak isteyen herkes</li>
</ul>
<p>Her durumda, yönettiğiniz hesaplar size ait olmalı veya sahibinin açık izniyle yönetilmelidir; her platformu kullanımınız o platformun kendi kurallarına uymalıdır.</p>

<h2>3. Yasak kullanım</h2>
<p>Veilus'u şunlar için kullanamazsınız:</p>
<ul>
  <li>Sizin için geçerli herhangi bir yasayı veya düzenlemeyi ihlal etmek</li>
  <li>Dolandırıcılık, kimlik hırsızlığı veya oltalama yapmak ya da para için insanları kandırmak</li>
  <li>Size ait olmayan hesaplara erişmek, onları ele geçirmek veya alıp satmak</li>
  <li>Bir platformun dolandırıcılık veya kötüye kullanım nedeniyle size uyguladığı askıya alma ya da yasağı atlatmak veya bunun için yedek hesaplar açmak</li>
  <li>Sahte etkileşim üretmek: sahte yorumlar, sahte oylar, sahte takipçiler, toplu sahte kayıtlar veya spam</li>
  <li>Birçok farklı kişiymiş gibi davranarak promosyonları, referans programlarını, airdrop'ları, çekilişleri veya ücretsiz denemeleri kötüye kullanmak (Sybil saldırıları)</li>
  <li>İzinsiz veri kazımak veya sistemlere erişmek ya da yasa dışı amaçlarla bir sitenin teknik kısıtlamalarını aşmak</li>
  <li>Kötü amaçlı yazılım veya zararlı kod dağıtmak ya da başka sistemlere saldırmak</li>
  <li>Başkalarını taciz etmek, tehdit etmek veya takip etmek</li>
  <li>Çocuk cinsel istismarı materyali üretmek veya dağıtmak ya da terörizmi, insan ticaretini veya diğer ağır suçları kolaylaştırmak</li>
  <li>Lisans anahtarlarını yeniden satmak, paylaşmak veya yayımlamak ya da Hizmet'in lisans ve cihaz denetimlerine müdahale etmek</li>
</ul>

<h2>4. Üçüncü taraf platformlar</h2>
<p>Veilus üzerinden eriştiğiniz her web sitesinin ve platformun hizmet şartlarına uymaktan yalnızca siz sorumlusunuz. Ayrı bir tarayıcı profili, yasak bir etkinliği izinli hale getirmez. Veilus, herhangi bir platformun hesaplarınızı kabul edeceğine dair söz vermez ve bir platformun yaptırımlarını atlatması için kimseye yardım etmeyiz.</p>

<h2>5. Kötüye kullanımı bildirme</h2>
<p>Birinin Veilus'u bu politikaya aykırı biçimde kullandığını düşünüyorsanız <a href="mailto:legal@veilus.io">legal@veilus.io</a> adresine yazın. Ne gördüğünüzü, nerede ve ne zaman olduğunu belirtin ve paylaşabileceğiniz kanıtları ekleyin. Her bildirimi inceleriz; ancak her birine ayrı ayrı yanıt veremeyebiliriz.</p>

<h2>6. Yaptırımlar</h2>
<p>İhlalin ağırlığına göre şunları yapabiliriz:</p>
<ul>
  <li>Sizi uyarmak ve durmanızı istemek</li>
  <li>Sorun çözülene kadar lisans anahtarınızı askıya almak</li>
  <li><a href="/tr/terms/">Şartlar</a> ve <a href="/tr/refund/">İade Politikası</a>'nda açıklandığı üzere lisansınızı iade yapmadan sonlandırmak</li>
  <li>Yetkili makamların yasal taleplerine uymak</li>
</ul>
<p>Veilus profil verilerini kendi bilgisayarınızda saklar ve bir profilin içinde ne yaptığınızı göremez. Yaptırımlar, bildirimlere, ödeme itirazlarına ve bize verdiğiniz bilgilere dayanır; gezintinizin izlenmesine değil.</p>

<h2>7. Değişiklikler</h2>
<p>Ürün ve mevzuat değiştikçe bu politikayı güncelleyebiliriz. Sayfanın üstündeki tarih son revizyonu gösterir. Bir değişiklikten sonra kullanmaya devam etmeniz, güncellenmiş politikayı kabul ettiğiniz anlamına gelir.</p>

<h2>8. İletişim</h2>
<ul>
  <li><strong>E-posta:</strong> <a href="mailto:legal@veilus.io">legal@veilus.io</a></li>
  <li><strong>Web sitesi:</strong> <a href="https://veilus.io">veilus.io</a></li>
</ul>`
    },
};
