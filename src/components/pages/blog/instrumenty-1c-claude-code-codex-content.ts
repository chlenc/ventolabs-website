import type { Article } from "./types";

const GH = "https://github.com";

/**
 * Russian-language field guide to the AI tooling around 1C:Enterprise.
 *
 * Volatile numbers (GitHub stars, exact skill counts) are deliberately absent:
 * they change weekly, they were the one thing the source research openly
 * disagreed with itself about, and an evergreen page that never lies beats a
 * precise one that rots. Versions and dates are stamped "на момент публикации"
 * where they matter.
 */
export const oneCToolsArticle: Article = {
  eyebrow: "1С · AI-инструменты",
  h1: "Инструменты для 1С:Предприятие в Claude Code и OpenAI Codex",
  lede: "Вокруг разработки на 1С сложилась зрелая, преимущественно русскоязычная экосистема AI-инструментов: три десятка MCP-серверов, наборы скиллов на десятки навыков, официальный плагин BSL Language Server для Claude Code и Codex-плагин Unica. Разбираем весь ландшафт: что ставить первым, что переносится между агентами и почему без MCP-контекста LLM уверенно пишет неработающий BSL.",
  meta: {
    author: "Алексей Нагорный",
    authorRole: "Основатель Vento Labs. Строит AI-агентов поверх учётных систем",
    dateLabel: "Обновлено",
    dateValue: "16 июля 2026",
    readingLabel: "Чтение",
    readingValue: "16 минут",
  },

  tldrTitle: "Коротко",
  tldr: [
    "**Инструментов уже много.** Каталог [Untru/1c-mcp](https://github.com/Untru/1c-mcp) перечисляет 33 проекта: 28 open source и 5 коммерческих. Плюс несколько наборов Claude Code Skills, официальный плагин BSL Language Server и Codex-плагин Unica.",
    "**Минимальный стек — два инструмента.** `mcp-1c` (метаданные и код живой базы) плюс BSL Language Server (статический анализ и навигация). Ставится за час и работает в обоих агентах.",
    "**Инструменты переносимы.** MCP поддерживают и Claude Code, и Codex, а формат Agent Skills (`SKILL.md`) стал кроссплатформенным стандартом — один навык обычно работает в обоих.",
    "**Различается только подключение.** Claude Code — `claude mcp add` и плагины через `/plugin`; Codex — блок `[mcp_servers]` в `~/.codex/config.toml`.",
    "**Зачем всё это.** Без внешнего контекста модель не знает ни специфики BSL, ни вашей конфигурации и пишет правдоподобный, но неработающий код. MCP снижает долю таких ошибок — но не отменяет ревью.",
  ],

  tocTitle: "Содержание",

  sections: [
    {
      id: "chto-takoe-mcp-dlya-1c",
      title: "Что такое MCP-сервер для 1С и зачем он нужен",
      tocLabel: "Что такое MCP-сервер для 1С",
      blocks: [
        {
          kind: "p",
          text: "**MCP-сервер для 1С — это адаптер между AI-агентом и вашей информационной базой.** Он отдаёт агенту метаданные конфигурации, исходники модулей, справку платформы и результаты запросов через Model Context Protocol — открытый протокол, которым Claude Code и OpenAI Codex подключают внешние инструменты и источники данных.",
        },
        {
          kind: "p",
          text: "Проблема, которую он решает, простая. Языковая модель обучена преимущественно на англоязычном коде: BSL в её выборке занимает доли процента, а вашей конфигурации в ней нет вообще. Без внешнего контекста агент выдаёт код, который выглядит как 1С, но не работает: выдуманные методы, несуществующие реквизиты, синтаксис на стыке 1С и Python. Русскоязычное сообщество формулирует это одинаково: без MCP модель пишет уверенно и неправильно.",
        },
        { kind: "p", text: "MCP-сервер закрывает четыре типа контекста:" },
        {
          kind: "ul",
          items: [
            "**Метаданные конфигурации** — какие справочники, документы, регистры и реквизиты есть именно у вас, а не «вообще в 1С».",
            "**Исходный код** — поиск по модулям BSL: точный, по регулярному выражению или семантический.",
            "**Справка платформы** — синтакс-помощник и документация, чтобы агент не выдумывал сигнатуры методов.",
            "**Обратная связь** — выполнение запросов, чтение журнала регистрации, проверка синтаксиса. Агент видит результат, а не гадает.",
          ],
        },
        {
          kind: "note",
          title: "Почему один сервер работает в обоих агентах",
          text: "MCP — не фича Claude. Это открытый протокол, который поддерживают Claude Code, OpenAI Codex, Cursor и Windsurf. Один и тот же сервер для 1С подключается ко всем: различается только формат конфигурационного файла.",
        },
      ],
    },

    {
      id: "bystryy-start",
      title: "Быстрый старт: минимальная связка за один день",
      tocLabel: "Быстрый старт за один день",
      blocks: [
        {
          kind: "p",
          text: "**Рабочий минимум — два инструмента, и оба ставятся за час.** Всё остальное из этого обзора — расширение, а не замена: если эти два не стоят, добавлять поверх нечего.",
        },
        { kind: "h3", text: "Шаг 1. BSL Language Server — статический анализ и навигация" },
        {
          kind: "p",
          text: `[BSL Language Server](${GH}/1c-syntax/bsl-language-server) — эталонная LSP-реализация для BSL и OneScript: автодополнение, go to definition, find references, hover, 186 диагностик, форматирование. Агент получает те же подсказки, что и человек в IDE, и видит свои ошибки сразу — а не после выгрузки в конфигуратор.`,
        },
        {
          kind: "p",
          text: `В Claude Code ставится официальным плагином от команды 1c-syntax — [claude-code-bsl-lsp](${GH}/1c-syntax/claude-code-bsl-lsp):`,
        },
        {
          kind: "code",
          caption: "Claude Code",
          code: `/plugin marketplace add 1c-syntax/claude-code-bsl-lsp
/plugin install bsl-language-server@bsl-language-server`,
        },
        {
          kind: "p",
          text: "Плагин сам скачивает BSL LS при первом запуске и включает диагностику для файлов `.bsl` и `.os`. Нужна версия Claude Code с поддержкой LSP: сам инструмент появился в 2.0.74, на более ранних сборках плагину не за что зацепиться. В Codex и VS Code ту же роль играет расширение Language 1C (BSL) или MCP-обёртка `bsl-mcp`.",
        },
        { kind: "h3", text: "Шаг 2. mcp-1c — доступ к живой базе" },
        {
          kind: "p",
          text: `[feenlace/mcp-1c](${GH}/feenlace/mcp-1c) — самый простой вход в тему: один Go-бинарник без зависимостей, лицензия MIT. Open-версия даёт десять инструментов для работы с живой базой: метаданные, поиск по BSL-коду (смысловой, по регулярке и точный), выполнение запросов, журнал регистрации и встроенную справку BSL. Расширение в базу ставится одной командой:`,
        },
        {
          kind: "code",
          caption: "Автоустановка расширения",
          code: `mcp-1c --install "C:\\путь\\к\\базе"`,
        },
        {
          kind: "p",
          text: "Дальше сервер подключается к любому агенту — Claude Code, Codex, Cursor, Windsurf. Минимальная версия платформы — 8.3.10. Open-версия бесплатна и покрывает базовые сценарии; платные тарифы — 1 990 ₽ и 4 990 ₽ в месяц — снимают ограничения. Проект релизится по несколько раз в неделю, так что за номером версии гнаться бессмысленно: ставьте последний.",
        },
        {
          kind: "table",
          head: ["Что меняется", "Без инструментов", "С mcp-1c и BSL LS"],
          rows: [
            [
              "Знание конфигурации",
              "Агент выдумывает имена объектов и реквизитов",
              "Видит реальные метаданные вашей базы",
            ],
            [
              "Обратная связь",
              "Ошибки всплывают после выгрузки в конфигуратор",
              "Диагностика приходит прямо в диалог",
            ],
            [
              "Проверка гипотез",
              "Правки «по описанию», без выполнения",
              "Запрос выполняется, агент видит результат",
            ],
            [
              "Опора на существующий код",
              "Каждая задача решается с нуля",
              "Поиск по модулям: где в базе уже делали так же",
            ],
          ],
        },
      ],
    },

    {
      id: "claude-code-skilly-plaginy",
      title: "Claude Code: скиллы и плагины для 1С",
      tocLabel: "Claude Code: скиллы и плагины",
      blocks: [
        {
          kind: "p",
          text: "**В Claude Code для 1С есть два типа расширений — скиллы и плагины.** Скилл (Agent Skill) — это папка с markdown-инструкцией, которую агент подгружает, когда задача ей соответствует. Плагин упаковывает LSP-серверы, MCP-подключения и команды, устанавливается через `/plugin`.",
        },
        { kind: "h3", text: "Наборы скиллов" },
        {
          kind: "p",
          text: "Скилл для 1С — это, по сути, записанная процедура: как собрать обработку, как описать форму через JSON DSL, как опубликовать базу. Готовых наборов несколько, и они заметно пересекаются — брать имеет смысл один.",
        },
        {
          kind: "table",
          head: ["Набор", "Чем интересен", "Где работает"],
          rows: [
            [
              `**[Desko77/claude-code-skills-1c](${GH}/Desko77/claude-code-skills-1c)**`,
              "Самый крупный набор — 95 скиллов плюс правила и команды. Покрывает конфигурации, объекты метаданных (23 типа через JSON DSL), формы, расширения, обработки и отчёты, подсистемы, макеты, роли, СКД, веб-публикацию и веб-тестирование, БСП. Лицензия MIT.",
              "Claude Code",
            ],
            [
              `**[Nikolay-Shirokov/cc-1c-skills](${GH}/Nikolay-Shirokov/cc-1c-skills)**`,
              "72 скилла на открытом стандарте Agent Skills. Полный цикл: EPF/ERF, формы, макеты, публикация, веб-тестирование через браузер (нужен Node.js 18+). Есть готовые ветки-сборки под каждую платформу (`port-codex`, `port-cursor`, `port-gemini`) и версии со скриптами на PowerShell и Python. MIT.",
              "Claude Code, Cursor, Codex",
            ],
            [
              `**[Arman-Kudaibergenov/1c-ai-development-kit](${GH}/Arman-Kudaibergenov/1c-ai-development-kit)**`,
              "Портативная конфигурация «под ключ»: скиллы, набор агентов, правила, шаблоны `CLAUDE.md` и `mcp.json`. Собран на работе сообщества — в том числе на cc-1c-skills и cursor_rules_1c.",
              "Claude Code, Cursor",
            ],
            [
              `**[RooLee10/1c-web-session](${GH}/RooLee10/1c-web-session)**`,
              "Узкоспециализированный скилл: управление 1С:Предприятие в веб-клиенте через Playwright MCP — навигация, справочники, документы, сценарное тестирование. Использует вставку из буфера вместо `fill()` и `type()`, потому что стандартный Playwright в вебе 1С не работает.",
              "Claude Code",
            ],
          ],
          note: "Числа приведены на момент публикации: наборы пополняются от релиза к релизу.",
        },
        {
          kind: "code",
          caption: "Desko77 — в Claude Code",
          code: `cp -r skills/* ~/.claude/skills/`,
        },
        {
          kind: "code",
          caption: "cc-1c-skills — в Codex",
          code: `codex plugin marketplace add Nikolay-Shirokov/cc-1c-skills`,
        },
        {
          kind: "p",
          text: "Зависимости у наборов разные, но сходятся на одном: на Windows обязателен PowerShell 5.1+, опционально нужны Python 3.8+, `v8unpack` и, разумеется, сама платформа 1С:Предприятие 8.3.",
        },
        { kind: "h3", text: "Плагины" },
        {
          kind: "ul",
          items: [
            `**[1c-syntax/claude-code-bsl-lsp](${GH}/1c-syntax/claude-code-bsl-lsp)** — официальный плагин от команды 1c-syntax: подключает BSL Language Server как LSP для \`.bsl\` и \`.os\`. Диагностика, go to definition, find references, hover, форматирование, code actions. Требует свежую версию Claude Code с поддержкой LSP.`,
            `**[Piebald-AI/claude-code-lsps](${GH}/Piebald-AI/claude-code-lsps)** — community-маркетплейс LSP-плагинов, где BSL идёт наряду с двумя десятками других языков. Вариант, если LSP нужен не только для 1С.`,
            "**Официальные плагины Anthropic** (`/plugin marketplace add anthropics/claude-plugins-official`) — `mcp-server-dev`, `code-review`, `pr-review-toolkit`, `security-guidance`. К 1С отношения не имеют, но полезны как обвязка вокруг проекта.",
          ],
        },
      ],
    },

    {
      id: "openai-codex-1c",
      title: "OpenAI Codex: плагин Unica и подключение MCP",
      tocLabel: "OpenAI Codex: Unica и MCP",
      blocks: [
        {
          kind: "p",
          text: "**Специализированных инструментов под Codex меньше — но это не изоляция.** MCP-серверы работают в нём ровно так же, как в Claude Code, а `SKILL.md` кроссплатформенный. Codex-специфичного здесь по сути два пункта: плагин Unica и способ подключения MCP.",
        },
        {
          kind: "note",
          title: "Почему скиллы переносятся между агентами",
          text: "18 декабря 2025 года Anthropic опубликовала Agent Skills как открытый стандарт ([agentskills.io](https://agentskills.io)). Формат подхватили быстро: сейчас в официальном showcase больше сорока совместимых продуктов, включая OpenAI Codex, VS Code, Cursor и Gemini CLI. Практический итог для 1С — один и тот же `SKILL.md` обычно работает и в Claude Code, и в Codex, и наборы скиллов пишут сразу под оба.",
        },
        { kind: "h3", text: "Плагин Unica" },
        {
          kind: "p",
          text: `[IngvarConsulting/unica](${GH}/IngvarConsulting/unica) — специализированный плагин Codex под 1С. Внутри: прикладные навыки (формы, метаданные, EPF/ERF, базы, роли, СКД, веб-публикация), файл \`.mcp.json\` с MCP-подключениями и безопасные запускатели инструментов. Ставится одной командой:`,
        },
        {
          kind: "code",
          caption: "Установка Unica",
          code: `curl -fsSL https://github.com/IngvarConsulting/unica/releases/latest/download/install-unica.sh | sh`,
        },
        {
          kind: "p",
          text: "Инсталлятор сам выбирает архив под платформу (darwin-arm64, linux-x64, win-x64), регистрирует marketplace `unica-local` и включает `unica@unica-local`. Проверить установку: `codex debug prompt-input 'test'` — в выводе должны появиться плагин `Unica` и навыки вида `unica:meta-compile`, `unica:v8-runner`, `unica:epf-bsp-init`. Для реальных операций, само собой, нужна платформа 1С.",
        },
        { kind: "h3", text: "Как подключить MCP-сервер 1С к Codex" },
        {
          kind: "p",
          text: "Codex CLI хранит конфигурацию MCP в TOML — файл `~/.codex/config.toml`, блок `[mcp_servers]`. **Обратите внимание на подчёркивание: `mcp_servers`, а не `mcp-servers`.** При дефисе Codex молча игнорирует запись — без ошибки и без предупреждения.",
        },
        {
          kind: "code",
          caption: "~/.codex/config.toml",
          code: `[mcp_servers.1c]
command = "/path/to/mcp-1c"
args = ["--base", "http://localhost:8080/hs/mcp-1c"]`,
        },
        {
          kind: "note",
          title: "Частая ловушка",
          text: 'Документация MCP-серверов для 1С обычно приводит generic JSON-конфиг в стиле Claude Desktop и Cursor — с ключом `"mcpServers"`. Для Codex его нужно переложить в TOML, как выше. Для первой настройки удобнее интерактивная команда `codex mcp add`: она пишет только в user-scope, зато не даёт ошибиться в синтаксисе.',
        },
        { kind: "h3", text: "Правила и субагенты" },
        {
          kind: "p",
          text: `[comol/ai_rules_1c](${GH}/comol/ai_rules_1c) — переносимый набор правил, субагентов и on-demand инструкций для BSL. Есть адаптеры под разные инструменты, включая Codex (\`.codex/rules/\`, \`.codex/agents/\`, \`.codex/skills/\`, \`.codex/config.toml\`; slash-команды в \`~/.codex/prompts/\`), а также под Cursor, Claude Code, OpenCode и KiloCode. Использует \`AGENTS.md\` как always-on контекст и включает SKILL-пакеты, каталог MCP-серверов и OpenSpec-воркспейс.`,
        },
      ],
    },

    {
      id: "katalog-mcp-serverov",
      title: "Каталог MCP-серверов для 1С",
      tocLabel: "Каталог MCP-серверов",
      blocks: [
        {
          kind: "p",
          text: `**Единая точка входа — репозиторий [Untru/1c-mcp](${GH}/Untru/1c-mcp)** («Awesome 1C MCP Servers», в README заявлена лицензия CC0). На момент публикации он каталогизирует 33 проекта — 28 open source и 5 коммерческих — по категориям: IDE-интеграции, фреймворки, метаданные и анализ кода, справка платформы, тестирование, интеграция с 1С:Напарник, учётные системы, графовый анализ, DevOps, наборы скиллов и коммерческие продукты. Ниже — выжимка по тому, что берут чаще всего. Все эти серверы работают и в Claude Code, и в Codex.`,
        },
        { kind: "h3", text: "Живая база и метаданные" },
        {
          kind: "table",
          head: ["Сервер", "Что делает", "Стек и особенности"],
          rows: [
            [
              `[feenlace/mcp-1c](${GH}/feenlace/mcp-1c)`,
              "Метаданные, поиск по BSL-коду, выполнение запросов, журнал регистрации, встроенная справка. Автоустановка расширения в базу одной командой.",
              "Один Go-бинарник, MIT. Платформа от 8.3.10. Есть платные тарифы",
            ],
            [
              `[vladimir-kharin/1c_mcp](${GH}/vladimir-kharin/1c_mcp)`,
              "Фреймворк: MCP-сервер создаётся внутри 1С через расширение конфигурации. Разработчик реализует только `ДобавитьИнструменты()` и `ВыполнитьИнструмент()`.",
              "Три режима: прямой HTTP, Python-прокси (stdio + OAuth2), Docker",
            ],
            [
              `[ROCTUP/1c-mcp-toolkit](${GH}/ROCTUP/1c-mcp-toolkit)`,
              "MCP и REST со встроенным HTTP-сервером прямо в обработке `.epf` — без изменения конфигурации и без COM.",
              "Платформа от 8.2.13. Идёт с готовыми скиллами",
            ],
            [
              `[FSerg/mcp-1c-v1](${GH}/FSerg/mcp-1c-v1)`,
              "Семантический поиск по коду и метаданным через RAG — для конфигураций, где обычный поиск уже не тянет.",
              "Qdrant. Beta",
            ],
            [
              `[ROCTUP/1c-mcp-metacode](${GH}/ROCTUP/1c-mcp-metacode)`,
              "Графовый анализ конфигурации: связи объектов и иерархия вызовов как граф.",
              "Neo4j",
            ],
            [
              `[DitriXNew/MCP-DB-Client](${GH}/DitriXNew/MCP-DB-Client)`,
              "Прямой доступ к базе плюс шаблон обработки. Рядом — `http1c` от того же автора.",
              "Нативная DLL",
            ],
          ],
        },
        { kind: "h3", text: "Интеграции с IDE" },
        {
          kind: "table",
          head: ["Сервер", "Что делает", "Стек и особенности"],
          rows: [
            [
              `[DitriXNew/EDT-MCP](${GH}/DitriXNew/EDT-MCP)`,
              "Самая глубокая интеграция с 1C:EDT: навигация по метаданным, анализ BSL (структура модулей, иерархия вызовов, чтение и запись методов), валидация запросов с проверкой синтаксиса и семантики и режимом СКД, PNG-скриншоты форм из WYSIWYG, обновление базы и запуск в отладке.",
              "Java, AGPL-3.0. Около восьмидесяти инструментов, сгруппированных по тулсетам. Ставится через update site `ditrixnew.github.io/EDT-MCP`",
            ],
            [
              `[ondysss/codepilot1c-edt](${GH}/ondysss/codepilot1c-edt)`,
              "CodePilot1C: AI-плагин для 1C:EDT с чатом, агентным режимом и ролью MCP Host.",
              "1C:EDT",
            ],
            [
              `[yellow-hammer/mcp-1c-platform-tools](${GH}/yellow-hammer/mcp-1c-platform-tools)`,
              "Вызов команд VS Code-расширения «1C: Platform Tools» из Cursor и VS Code. Идёт вместе с устанавливаемыми скиллами.",
              "VS Code, Cursor",
            ],
          ],
        },
        { kind: "h3", text: "Справка платформы и синтаксис BSL" },
        {
          kind: "p",
          text: "Эта категория напрямую бьёт по галлюцинациям: агент перестаёт выдумывать сигнатуры методов, потому что может их посмотреть.",
        },
        {
          kind: "table",
          head: ["Сервер", "Что делает", "Стек и особенности"],
          rows: [
            [
              `[alkoleft/mcp-bsl-platform-context](${GH}/alkoleft/mcp-bsl-platform-context)`,
              "Интерактивный синтакс-помощник для агента: нечёткий поиск по функциям, методам, свойствам и типам платформы.",
              "Kotlin, JDK 17+, платформа от 8.3.20",
            ],
            [
              `[rzateev/onec-help-mcp](${GH}/rzateev/onec-help-mcp)`,
              "RAG-поиск по официальной справке: BM25 плюс семантика.",
              "Qdrant, Docker",
            ],
            [
              `[Antonio1C/1c-syntax-helper-mcp](${GH}/Antonio1C/1c-syntax-helper-mcp)`,
              "Поиск по `.hbk`-файлу справки платформы.",
              "Elasticsearch",
            ],
          ],
        },
        { kind: "h3", text: "Тестирование и проверка кода" },
        {
          kind: "table",
          head: ["Сервер", "Что делает", "Стек и особенности"],
          rows: [
            [
              `[phsin/mcp-bsl-ls](${GH}/phsin/mcp-bsl-ls)`,
              "MCP-обёртка над BSL Language Server: анализ и форматирование `.bsl` и `.os`, вывод ошибок в JSON. Проверку синтаксиса самой платформой не делает.",
              "JRE 8+ и JAR самого BSL LS. Похоже, заброшен: последний коммит — ноябрь 2025",
            ],
            [
              `[SteelMorgan/mcp-bsl-lsp-bridge](${GH}/SteelMorgan/mcp-bsl-lsp-bridge)`,
              "Транслятор LSP → MCP: навигация, диагностика, hover, рефакторинг.",
              "Beta",
            ],
            [
              `[alkoleft/mcp-onec-test-runner](${GH}/alkoleft/mcp-onec-test-runner)`,
              "METR: запуск тестов YaXUnit и сборка проектов — агент может прогнать регресс сам.",
              "Kotlin, JDK 17+, платформа от 8.3.10",
            ],
          ],
        },
        { kind: "h3", text: "Учётные системы, 1С-Битрикс и DevOps" },
        {
          kind: "table",
          head: ["Сервер", "Что делает", "Стек и особенности"],
          rows: [
            [
              `[theYahia/1c-rest-mcp](${GH}/theYahia/1c-rest-mcp)`,
              "Работа с опубликованным REST/OData API 1С: каталоги, документы, регистры, отчёты.",
              "Запуск через `npx`, 9 инструментов",
            ],
            [
              `[Technique102/ade.boostrix](${GH}/Technique102/ade.boostrix)`,
              "MCP-модуль для экосистемы 1С-Битрикс: инструменты и контекст для генерации кода под Битрикс. Ставится в `/local/modules/`.",
              "PHP 8.2+, 1С-Битрикс 24.0+, Docker",
            ],
            [
              `[gunnit/bitrix24-mcp-server](${GH}/gunnit/bitrix24-mcp-server)`,
              "MCP для Bitrix24 CRM: контакты, сделки, задачи.",
              "TypeScript",
            ],
            [
              `[pravets/compose4mcp](${GH}/pravets/compose4mcp)`,
              "Docker Compose для оркестрации нескольких MCP-серверов 1С разом.",
              "Docker",
            ],
            [
              `[SteelMorgan/1c-log-checker](${GH}/SteelMorgan/1c-log-checker)`,
              "Разбор журнала регистрации и технологического журнала.",
              "ClickHouse + Grafana. Beta",
            ],
          ],
          note: "У самого Bitrix24 есть встроенная поддержка MCP: Настройки → MCP Servers.",
        },
      ],
    },

    {
      id: "bsl-language-server-onescript",
      title: "Фундамент: BSL Language Server и OneScript",
      tocLabel: "Фундамент: BSL LS и OneScript",
      blocks: [
        {
          kind: "p",
          text: "**Два инструмента здесь старше всей AI-темы и к ней прямого отношения не имеют — но на них стоит половина остального.** Стоит понимать, что вы ставите, когда ставите плагин или обёртку.",
        },
        { kind: "h3", text: "BSL Language Server" },
        {
          kind: "p",
          text: `[1c-syntax/bsl-language-server](${GH}/1c-syntax/bsl-language-server) — эталонная LSP-реализация для BSL и OneScript (Java, лицензия LGPL 3). Автодополнение, go to definition, find references, hover, 186 диагностик, форматирование, расчёт когнитивной и цикломатической сложности. Запускается как \`java -jar bsl-language-server.jar\`, умеет режимы LSP, websocket, analyze и format. Летом 2026 проект наконец вышел из нулевых версий: актуальная линейка — 1.x.`,
        },
        {
          kind: "p",
          text: "Именно её оборачивают и плагин `claude-code-bsl-lsp`, и серверы `bsl-mcp` и `mcp-bsl-lsp-bridge`. То есть, ставя любой из них, вы ставите BSL LS — просто с разным способом доставки в агента.",
        },
        { kind: "h3", text: "OneScript" },
        {
          kind: "p",
          text: `[EvilBeaver/OneScript](${GH}/EvilBeaver/OneScript) (oscript.io) — кроссплатформенная реализация виртуальной машины языка 1С без самой платформы. Вокруг него выросла вся DevOps-экосистема 1С: vanessa-runner, vanessa-automation, gitsync, precommit1c и больше сотни библиотек. Для агента полезен как исполнитель скриптов: сценарий на знакомом синтаксисе запускается там, где платформы нет — например, в CI.`,
        },
        {
          kind: "p",
          text: `Рядом стоит [1c-syntax/vsc-language-1c-bsl](${GH}/1c-syntax/vsc-language-1c-bsl) — расширение VS Code с подсветкой BSL и языка запросов, навигацией и автодополнением для OneScript. Пакет \`yellow-hammer/vscode-1c-platform-extension-pack\` собирает вместе 1C Platform Tools, MCP и Language 1C (BSL).`,
        },
      ],
    },

    {
      id: "1s-naparnik",
      title: "1С:Напарник — официальный AI от фирмы «1С»",
      tocLabel: "1С:Напарник",
      blocks: [
        {
          kind: "p",
          text: "**1С:Напарник (code.1c.ai) — официальный ИИ-ассистент фирмы «1С», встроенный в 1C:EDT.** Автодополнение, генерация кода по описанию, объяснение и ревью кода, документирующие комментарии, автономный агент в чате. Обучен на стандартах разработки «1С» — там, где сторонние модели угадывают канон, он его знает.",
        },
        {
          kind: "p",
          text: "По официальной странице Портала ИТС, до 1 октября 2026 «1С:Напарник для разработки» предоставляется без дополнительной оплаты любому пользователю с активной учётной записью на портале 1С:ИТС; на одну учётную запись выдаётся не более 100 ключей активации. Требуется 1C:EDT версии 2023.3.6 или новее; плагин ставится из репозитория `https://code.1c.ai/plugin/` через Справка → Установить новое ПО → раздел «AI». На странице подключения отдельно предупреждают о баге в свежих сборках Zulu OpenJDK и советуют взять предыдущую стабильную — `zulu17.48.15-ca-fx-jdk17.0.10`.",
        },
        {
          kind: "p",
          text: "**Два ограничения определяют его место в стеке.** Напарник работает только в 1C:EDT — в Конфигураторе его нет. И он не позволяет менять системный промпт, то есть не превращается в универсального агента под ваш регламент. Практический вывод: это сильный ассистент внутри EDT, но он не заменяет Claude Code или Codex с MCP там, где нужна автоматизация по вашим правилам и за пределами IDE.",
        },
        {
          kind: "p",
          text: `Между мирами есть мосты: [ROCTUP/1c-buddy](${GH}/ROCTUP/1c-buddy) и [SteelMorgan/spring-mcp-1c-copilot](${GH}/SteelMorgan/spring-mcp-1c-copilot) — MCP-обёртки над API Напарника (нужен токен code.1c.ai).`,
        },
      ],
    },

    {
      id: "kommercheskie-resheniya",
      title: "Коммерческие продукты",
      blocks: [
        {
          kind: "p",
          text: "Платные решения закрывают то же, что и open source, но с поддержкой, командной работой и готовыми контейнерами. Имеет смысл, если некому обслуживать связку самостоятельно.",
        },
        {
          kind: "table",
          head: ["Продукт", "Что даёт", "Модель"],
          rows: [
            [
              "OneMCP (onemcp.ru)",
              "SaaS с семантическим поиском и командной работой.",
              "Подписка, бета бесплатна",
            ],
            [
              "Infostart MCP",
              "Готовые Docker-контейнеры от Инфостарт: проверка синтаксиса, поиск по справке и метаданным. Совместим с Claude Code, Codex и другими.",
              "Коммерческий",
            ],
            [
              "VibeCoding1C (vibecoding1c.ru)",
              "Конструктор MCP-серверов плюс обучение.",
              "Коммерческий",
            ],
            [
              "ARQA MCP Server (arqa.cc)",
              "Бизнес-операции в типовых: Бухгалтерия 3.0, УТ 11, ERP, ЗУП.",
              "Коммерческий",
            ],
          ],
        },
      ],
    },

    {
      id: "kak-vybrat",
      title: "Как собрать стек под свой проект",
      tocLabel: "Как собрать стек",
      blocks: [
        {
          kind: "p",
          text: "**Порядок важнее набора.** Слои имеет смысл добавлять по одному: следующий работает, только когда предыдущий уже приносит пользу.",
        },
        {
          kind: "ol",
          items: [
            "**День 1 — фундамент.** BSL Language Server (в Claude Code — плагином `1c-syntax/claude-code-bsl-lsp`; в Codex и VS Code — расширением Language 1C (BSL) или `bsl-mcp`) плюс `mcp-1c` для доступа к метаданным живой базы. Это минимальный must-have: статический анализ и реальный контекст конфигурации.",
            "**Неделя 1 — прикладные скиллы.** В Claude Code — `Desko77/claude-code-skills-1c` или `Nikolay-Shirokov/cc-1c-skills`: генерация форм, обработок, отчётов, ролей и СКД из JSON DSL. В Codex — плагин Unica и/или `comol/ai_rules_1c` через `AGENTS.md`.",
            "**Дальше — по потребности.** Справочные MCP против галлюцинаций, тест-раннер под YaXUnit, EDT-MCP при работе в EDT, RAG или граф на большой конфигурации.",
          ],
        },
        {
          kind: "table",
          head: ["Ситуация", "Что добавить"],
          rows: [
            ["Малый проект, одна база", "`mcp-1c` плюс набор скиллов. Больше ничего не нужно"],
            [
              "Большая конфигурация — ERP, БСП",
              "RAG или граф: `mcp-1c-v1` на Qdrant либо `1c-mcp-metacode` на Neo4j. Обычный поиск по коду на таком объёме перестаёт работать",
            ],
            [
              "Модель путается в синтаксисе платформы",
              "Справочные MCP: `mcp-bsl-platform-context`, `onec-help-mcp`",
            ],
            [
              "Работаете в 1C:EDT",
              "`EDT-MCP` — валидация запросов, скриншоты форм, управление базой. Плюс 1С:Напарник, если есть аккаунт ИТС",
            ],
            ["Нужен регресс", "`mcp-onec-test-runner` и тесты YaXUnit"],
            [
              "Закрытый контур, требования по ИБ",
              "Локальные бинарники и песочница `1c-ai-sandbox`; облачные SaaS отпадают",
            ],
          ],
        },
      ],
    },

    {
      id: "ogranicheniya",
      title: "Ограничения, о которых стоит знать заранее",
      tocLabel: "Ограничения и риски",
      blocks: [
        {
          kind: "p",
          text: "**Экосистема молодая, и это видно.** Четыре вещи, которые честно стоит учесть до того, как ставить это на поток.",
        },
        {
          kind: "ul",
          items: [
            "**Много beta и экспериментов.** В каталоге `Untru/1c-mcp` статусы проставлены явно: часть серверов помечена как beta, часть — как экспериментальные. Проверяйте статус до продакшена, а не после.",
            "**Экосистема Codex моложе.** Codex-плагины появились только в 2026 году, self-serve публикация в официальный каталог OpenAI пока не открыта — распространение идёт через Git-backed и локальные marketplace. Специализированных 1С-плагинов немного: по сути Unica и адаптации существующих наборов. Но MCP и `SKILL.md` переносимы, так что тупика здесь нет.",
            "**Качество упирается в контекст, а не в модель.** MCP снижает долю галлюцинаций, но не устраняет их. Ревью опытного разработчика остаётся обязательным этапом — особенно там, где агент трогает проведение документов, движения по регистрам и закрытие периода.",
            "**Цифры в описаниях плывут.** Количество скиллов в наборах и инструментов в серверах меняется от релиза к релизу, а обзоры (включая этот) отстают. Ориентируйтесь на README на момент установки.",
            "**Доступ.** Часть инструментов завязана на российские сервисы — code.1c.ai, Портал ИТС, Инфостарт — со всеми вытекающими ограничениями доступа из-за рубежа.",
          ],
        },
      ],
    },

    {
      id: "svoy-instrument",
      title: "Как сделать свой скилл или MCP-сервер",
      tocLabel: "Свой скилл или MCP-сервер",
      blocks: [
        {
          kind: "p",
          text: "**Порог входа ниже, чем кажется.** Скилл — это папка с файлом `SKILL.md`: markdown с YAML-фронтматтером, где описано, когда навык применять и что делать. Формат открытый и кроссплатформенный, поэтому один и тот же скилл обычно работает и в Claude Code, и в Codex, и в Cursor.",
        },
        {
          kind: "p",
          text: `Для MCP-сервера писать протокол с нуля не нужно — возьмите фреймворк. [vladimir-kharin/1c_mcp](${GH}/vladimir-kharin/1c_mcp) даёт расширение конфигурации, в котором вы реализуете только \`ДобавитьИнструменты()\` и \`ВыполнитьИнструмент()\`: транспорт, протокол и авторизация уже внутри. Альтернатива — \`http1c\` и \`MCP-DB-Client\` от DitriX. В Claude Code для генерации серверов есть официальный плагин \`mcp-server-dev\`.`,
        },
        {
          kind: "note",
          title: "Что писать самому имеет смысл",
          text: "Универсальные вещи — метаданные, справку, синтаксис — уже написали. Свой инструмент оправдан там, где логика ваша: специфичные бизнес-проверки, внутренние регламенты, доступ к смежным системам, правила выкладки. Именно там агент выигрывает больше всего, и именно этого в чужих репозиториях никогда не будет.",
        },
      ],
    },
  ],

  faqTitle: "Частые вопросы",
  faqLede: "Короткие ответы на то, что спрашивают чаще всего.",
  faq: [
    {
      q: "Что такое MCP-сервер для 1С?",
      a: "Это адаптер между AI-агентом и информационной базой 1С. Он отдаёт агенту метаданные конфигурации, исходный код модулей, справку платформы и результаты запросов через Model Context Protocol — открытый протокол подключения инструментов, который поддерживают Claude Code, OpenAI Codex, Cursor и Windsurf. Без него модель не знает ни специфики BSL, ни вашей конфигурации и выдумывает несуществующие методы и реквизиты.",
    },
    {
      q: "Какой MCP-сервер для 1С выбрать первым?",
      a: "mcp-1c от feenlace: один Go-бинарник без зависимостей, лицензия MIT, расширение в базу ставится одной командой. Даёт метаданные, поиск по коду, выполнение запросов, журнал регистрации и справку BSL; работает и в Claude Code, и в Codex. Для большинства команд этого достаточно на старте — остальное добавляется по мере необходимости.",
    },
    {
      q: "Работают ли инструменты для 1С одновременно в Claude Code и OpenAI Codex?",
      a: "MCP-серверы — да, все: оба агента поддерживают протокол, различается только формат конфига (Claude Code — `claude mcp add`, Codex — блок `[mcp_servers]` в `~/.codex/config.toml`). Скиллы — в большинстве случаев да, потому что формат Agent Skills кроссплатформенный. Плагины — нет: claude-code-bsl-lsp работает только в Claude Code, Unica — только в Codex.",
    },
    {
      q: "Чем 1С:Напарник отличается от Claude Code с MCP?",
      a: "Напарник — официальный ассистент фирмы «1С», обученный на её стандартах разработки и встроенный в 1C:EDT. Он лучше знает канон, но работает только в EDT и не позволяет менять системный промпт. Claude Code и Codex универсальнее: работают с любым окружением, настраиваются под ваш регламент и закрывают полный цикл — но требуют MCP-контекста, чтобы не выдумывать синтаксис. На практике это дополняющие инструменты, а не альтернативы.",
    },
    {
      q: "Можно ли использовать AI-агентов для 1С в закрытом контуре?",
      a: "Да, если отказаться от облачных SaaS. Базовый стек — локальные бинарники: mcp-1c (один Go-файл), BSL Language Server (JAR), справочные MCP в Docker. Для изоляции есть экспериментальный 1c-ai-sandbox. Главный вопрос обычно не в инструментах, а в самой модели: её вызов уходит наружу, если не разворачивать модель локально — это и нужно согласовывать с ИБ в первую очередь.",
    },
    {
      q: "Нужен ли 1C:EDT или хватит Конфигуратора?",
      a: "Для базового стека Конфигуратора достаточно: mcp-1c работает с информационной базой напрямую, а BSL Language Server — с выгруженными исходниками. EDT нужен ровно для двух вещей: 1С:Напарника, которого больше нигде нет, и EDT-MCP от DitriXNew — с валидацией запросов, скриншотами форм из WYSIWYG и управлением приложениями.",
    },
    {
      q: "Сколько это стоит?",
      a: "Базовый стек бесплатен: BSL Language Server (LGPL 3), open-версия mcp-1c (MIT), наборы скиллов, плагин Unica и сам каталог Untru/1c-mcp — всё open source. Платить нужно за подписку на агента (Claude Code или Codex) и, по желанию, за расширенные тарифы mcp-1c либо коммерческие SaaS вроде OneMCP и ARQA. 1С:Напарник до 1 октября 2026 доступен без доплаты пользователям с аккаунтом ИТС.",
    },
  ],

  cta: {
    eyebrow: "Vento Labs",
    title: "Мы строим AI-агентов поверх 1С — и знаем, где они ломаются",
    text: "Этот обзор — побочный продукт работы. Vento Labs собирает AI-слой над 1С:Предприятие: ролевые права, ревью планов перед изменением данных, полный аудит-лог. Менеджеры получают безопасный self-service, разработчики перестают тонуть в рутине, ядро конфигурации остаётся нетронутым. В кейсе 1C Agent разобрано, как это устроено внутри.",
    primaryLabel: "Кейс: 1C Agent",
    primaryHref: "/cases/erp-agent",
    secondaryLabel: "Все кейсы",
    secondaryHref: "/cases",
  },

  stubs: {
    en: {
      eyebrow: "Guide · 1C AI tooling",
      h1: "AI tooling for 1C:Enterprise in Claude Code and OpenAI Codex",
      paragraphs: [
        "1C:Enterprise is the dominant ERP platform in the Russian-speaking market, and a substantial AI tooling ecosystem has grown around it: three dozen MCP servers, several large Claude Code skill packs, an official BSL Language Server plugin, and Unica — a dedicated plugin for OpenAI Codex. The full guide walks the whole landscape: what to install first, what carries over between agents, and why an LLM without MCP context writes confident, non-working BSL.",
        "It is published in Russian, because that is the language of every tool, repository and community it covers.",
      ],
      ctaPrimary: "Read the guide (in Russian)",
      ctaSecondary: "All guides",
    },
    de: {
      eyebrow: "Guide · KI-Tools für 1C",
      h1: "KI-Tools für 1C:Enterprise in Claude Code und OpenAI Codex",
      paragraphs: [
        "1C:Enterprise ist die dominierende ERP-Plattform im russischsprachigen Markt, und darum herum ist ein umfangreiches KI-Ökosystem entstanden: drei Dutzend MCP-Server, mehrere große Claude-Code-Skill-Pakete, ein offizielles BSL-Language-Server-Plugin und Unica — ein eigenes Plugin für OpenAI Codex. Der vollständige Guide geht das gesamte Feld durch: was zuerst installiert wird, was zwischen den Agenten portierbar ist und warum ein LLM ohne MCP-Kontext überzeugenden, aber funktionsunfähigen BSL-Code schreibt.",
        "Er erscheint auf Russisch — in der Sprache aller Tools, Repositories und Communities, die er behandelt.",
      ],
      ctaPrimary: "Guide lesen (auf Russisch)",
      ctaSecondary: "Alle Guides",
    },
    es: {
      eyebrow: "Guía · Herramientas de IA para 1C",
      h1: "Herramientas de IA para 1C:Enterprise en Claude Code y OpenAI Codex",
      paragraphs: [
        "1C:Enterprise es la plataforma ERP dominante en el mercado ruso, y a su alrededor ha crecido un ecosistema de IA considerable: tres decenas de servidores MCP, varios paquetes grandes de skills para Claude Code, un plugin oficial de BSL Language Server y Unica, un plugin dedicado para OpenAI Codex. La guía completa recorre todo el panorama: qué instalar primero, qué es portable entre agentes y por qué un LLM sin contexto MCP escribe código BSL convincente pero inservible.",
        "Está publicada en ruso, el idioma de todas las herramientas, repositorios y comunidades que cubre.",
      ],
      ctaPrimary: "Leer la guía (en ruso)",
      ctaSecondary: "Todas las guías",
    },
  },
};
