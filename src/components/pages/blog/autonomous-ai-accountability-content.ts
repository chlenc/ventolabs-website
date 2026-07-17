import type { Locale } from "@/lib/i18n";
import type { Article } from "./types";

/**
 * "Autonomous AI without delegating accountability" — the one guide on the
 * blog that ships in all four locales rather than stubbing out. Governance is
 * not a market-specific subject the way 1C is, so every locale gets the body.
 *
 * Thesis, structure and the five requirements come from Vladislav Gaon's
 * original English draft; the worked example and FAQ are ours.
 */

const en: Article = {
  eyebrow: "AI governance",
  h1: "Autonomous AI without delegating accountability",
  lede: "Companies are giving AI agents access to email, CRMs, customer data and payment systems. Many still cannot answer a basic question: who is responsible when the agent gets it wrong? You can delegate tasks and decision-making authority to an agent. You cannot delegate accountability — and the teams that understand the difference ship faster, not slower.",
  meta: {
    author: "Vladislav Gaon",
    authorRole: "Vento Labs. Writes on AI governance and enterprise adoption",
    dateLabel: "Updated",
    dateValue: "17 July 2026",
    readingLabel: "Reading",
    readingValue: "6 minutes",
  },

  tldrTitle: "In short",
  tldr: [
    "**An autonomous agent is not a content generator.** It talks to customers, edits records, moves money and makes decisions with real consequences. It should be governed like a junior employee with system access, not like a text box.",
    "**Every agent needs five things:** a scope of authority, limits on data and spending, defined moments that require human approval, a complete record of what it did, and one named person who can switch it off.",
    "**\"There's a human in the loop\" is not a control.** It only counts if that person has the information, the time and the authority to stop the action before it becomes irreversible.",
    "**The line that matters:** tasks and decision-making authority are delegable. Accountability is not. It stays with a person and an organisation, whatever the vendor's marketing says.",
    "**This is an accelerator, not a brake.** Teams that know where the agent may act, where it must stop and who answers for it scale with confidence instead of piloting forever.",
  ],

  tocTitle: "Contents",

  sections: [
    {
      id: "what-an-agent-actually-does",
      title: "What an autonomous agent actually does",
      tocLabel: "What an agent actually does",
      blocks: [
        {
          kind: "p",
          text: "**An autonomous AI agent does more than generate content.** It can communicate with customers, update records, initiate transactions and make decisions with real business consequences. The moment it holds a credential, it is not a chatbot — it is an actor inside your systems.",
        },
        {
          kind: "p",
          text: "That distinction is where most governance goes wrong. A model that drafts text has a review step built in by default: a human reads the output before it goes anywhere. An agent with an API key has no such step unless you build one. The output *is* the action.",
        },
        {
          kind: "note",
          title: "The useful mental model",
          text: "Treat an agent like a new hire on their first week who has been handed production access. You would not hand that person the company card, the customer database and the send button with no scope, no limit and no supervisor. The agent is faster and more consistent than the new hire — and it is also more literal, and it does not know when to stop and ask.",
        },
      ],
    },

    {
      id: "five-requirements",
      title: "Five things every agent should have",
      tocLabel: "Five requirements",
      blocks: [
        {
          kind: "p",
          text: "This is the minimum. If you cannot name all five for an agent already running in your company, you do not have a governed agent — you have an outage waiting for a trigger.",
        },
        {
          kind: "table",
          head: ["Requirement", "What it means in practice", "The question it answers"],
          rows: [
            [
              "**A clear scope of authority**",
              "Written down: which systems, which objects, which operations. Read the CRM but not the payroll. Draft the invoice but not send it.",
              "What is this agent allowed to touch?",
            ],
            [
              "**Limits on data access and spending**",
              "Hard ceilings enforced by the system, not by the prompt. A per-transaction cap, a daily total, a scope of records it can read.",
              "How much damage fits through this door?",
            ],
            [
              "**Defined approval points**",
              "Named situations where the agent must stop and wait: above a threshold, outside business hours, anything irreversible, anything touching a regulated field.",
              "Where must a human say yes?",
            ],
            [
              "**A complete record of decisions and actions**",
              "Every action logged with its input, its reasoning, the data it saw and the result — readable later by someone who was not there.",
              "What did it do, and why?",
            ],
            [
              "**A specific business owner**",
              "One named person, not a committee and not \"IT\". They can suspend the agent today, without a ticket.",
              "Who switches it off?",
            ],
          ],
        },
        {
          kind: "p",
          text: "Note what these five have in common: none of them is a model capability. They are all organisational decisions, and they are all cheaper to make before deployment than after an incident.",
        },
      ],
    },

    {
      id: "human-in-the-loop",
      title: "Why \"human in the loop\" is not an answer",
      tocLabel: "\"Human in the loop\" is not an answer",
      blocks: [
        {
          kind: "p",
          text: "**Simply saying there is a human in the loop is not enough.** It is the most common answer to the accountability question and the least examined. The phrase describes a diagram, not a control.",
        },
        {
          kind: "p",
          text: "For the human to be a real control, three things must be true at the moment of the decision, not in the design document:",
        },
        {
          kind: "ol",
          items: [
            "**They have the information.** A prompt that says \"Approve?\" with no context is not a review — it is a rubber stamp with extra steps. The reviewer needs to see what the agent saw and what it intends to do.",
            "**They have the time.** Ten approvals a day get read. Four hundred get clicked. If the approval rate is 99%, the loop has already degraded into a formality, and the one case that mattered went through with the rest.",
            "**They have the authority.** The reviewer must be able to say no and have that stick — without escalating to the person whose quarterly target the agent is helping to hit.",
          ],
        },
        {
          kind: "p",
          text: "And one more, the one people forget: the intervention has to happen **before the action becomes irreversible**. An approval screen shown after the email is sent, the payment cleared or the record overwritten is not a control. It is a receipt.",
        },
        {
          kind: "note",
          title: "A cheap test",
          text: "Ask the person named as your human in the loop what the agent did yesterday. If they cannot tell you, and cannot find out in under a minute, they were never in the loop — they were in the org chart.",
        },
      ],
    },

    {
      id: "the-principle",
      title: "The principle: authority is delegable, accountability is not",
      tocLabel: "The principle",
      blocks: [
        {
          kind: "p",
          text: "**Companies can delegate tasks and decision-making authority to AI. They cannot delegate accountability.** That is the whole argument, and it is not a philosophical point — it is how the world already treats every other kind of automation and every other kind of agent.",
        },
        {
          kind: "p",
          text: "When a bank's system approves a loan it should not have, the bank answers for it. When a contractor's crew damages the building, the contractor answers for it. Nobody accepts \"the system decided\" as a defence, and nobody will accept \"the model decided\" either. Regulators will not, customers will not, and a court will not.",
        },
        {
          kind: "p",
          text: "So the question is never *whether* someone is accountable — someone always is. The question is whether your company has decided who, in advance and on purpose, or whether it will find out during the incident.",
        },
      ],
    },

    {
      id: "what-it-looks-like",
      title: "What this looks like when it is built properly",
      tocLabel: "What it looks like in practice",
      blocks: [
        {
          kind: "p",
          text: "This is not theory for us. The pattern below is what we ship — for example in [1C Agent](/cases/erp-agent), an AI layer over a company's ERP where managers ask for things in plain business language and the agent acts inside the accounting system.",
        },
        {
          kind: "p",
          text: "An ERP is a good stress test for the argument, because the blast radius is real: postings, registers, period close. The five requirements land as concrete mechanics:",
        },
        {
          kind: "ul",
          items: [
            "**Scope becomes role-based permissions.** The agent inherits the requester's rights. A manager asking for a report gets a report; the same request cannot quietly become a write to a register the person could not touch themselves.",
            "**Limits become a permission gate.** Read operations run. Writes and anything with financial consequence hit a boundary the prompt cannot argue its way past — because the check lives in the system, not in the instructions.",
            "**Approval becomes plan review.** The agent states what it intends to do, in business language, before it does it. The human approves the plan, not a yes/no popup — that is the difference between the reviewer having the information and not.",
            "**The record becomes a full audit log.** Every action is logged and reversible: who asked, what the agent proposed, what it read, what changed. Reconstructable months later by someone who was not in the room.",
            "**The owner becomes a named person with a kill switch.** Not a policy document. A person who can stop it now.",
          ],
        },
        {
          kind: "p",
          text: "The counter-intuitive result is that this is the part that lets you go faster. Once the boundary is real, you stop negotiating every single request. Managers get safe self-service instead of a ticket queue, and the core of the accounting system is never touched.",
        },
      ],
    },

    {
      id: "how-to-start",
      title: "Where to start if you already have agents running",
      tocLabel: "Where to start",
      blocks: [
        {
          kind: "p",
          text: "Most companies reading this are not at the design stage — they already have three or four agents in production that someone stood up quickly. That is fine. The retrofit is short:",
        },
        {
          kind: "ol",
          items: [
            "**Inventory.** List every agent with a credential. Include the ones a single team built without telling anyone; those are the ones that matter.",
            "**Name an owner per agent.** One person. If nobody will take it, that is your finding — an agent nobody will own is an agent nobody should be running.",
            "**Find the irreversible actions.** For each agent, list what it can do that cannot be undone: money out, messages to customers, deletions, anything filed with an authority. That list is where approval gates go. Everything else can stay automatic.",
            "**Check the log.** Try to reconstruct one real decision from last week using only the log. If you cannot, the log is telemetry, not an audit trail — fix it before scaling.",
            "**Cap it.** Put hard limits on spending and data scope, enforced by the system. Do this even where you trust the agent, because the limit protects you against the prompt injection and the bad update as much as against the model.",
          ],
        },
        {
          kind: "note",
          title: "The honest bit",
          text: "None of this requires a governance framework, a committee or a policy PDF. It requires five answers per agent, written down, and a person willing to put their name next to each one. Most teams can do the whole exercise in an afternoon — and most that do it find at least one agent that quietly has more authority than anyone intended.",
        },
      ],
    },

    {
      id: "controlled-autonomy",
      title: "Controlled autonomy, not unlimited autonomy",
      tocLabel: "Controlled autonomy",
      blocks: [
        {
          kind: "p",
          text: "**The organisations that get this right will not necessarily deploy AI more slowly.** They will scale it with greater confidence — because they know where the system can act, where it must stop and who remains responsible.",
        },
        {
          kind: "p",
          text: "That is worth being precise about, because governance is usually sold as a tax on speed. It is the opposite. The teams that stall are the ones stuck in permanent pilot: every expansion reopens the same unanswered question, so nothing ever leaves the sandbox. The teams that move have already answered it once, in a form they can reuse for the next agent and the one after.",
        },
        {
          kind: "p",
          text: "**The future is not unlimited AI autonomy. It is controlled autonomy that businesses can trust, audit and scale.**",
        },
      ],
    },
  ],

  faqTitle: "Frequently asked questions",
  faqLede: "Short answers to what comes up most.",
  faq: [
    {
      q: "Who is legally responsible when an AI agent makes a mistake?",
      a: "The company that deployed it, in every regime that has addressed the question so far. Accountability does not transfer to a model, a vendor or an API. Contracts can move some financial liability to a supplier, but they do not move responsibility to your customers and your regulator — that stays with you, which is exactly why a named internal owner per agent matters.",
    },
    {
      q: "What does \"human in the loop\" actually require?",
      a: "That the reviewer has the information, the time and the authority to intervene — before the action becomes irreversible. If they see a bare \"Approve?\" prompt, face hundreds a day, or cannot make a \"no\" stick, the loop exists on the diagram only. A useful test: ask them what the agent did yesterday and see how long the answer takes.",
    },
    {
      q: "Does AI governance slow down deployment?",
      a: "Usually the reverse. What slows companies down is the unanswered accountability question, which resurfaces at every expansion and keeps agents stuck in pilot. Once scope, limits, approval points, logging and ownership are settled, each new agent inherits the pattern and ships faster than the last.",
    },
    {
      q: "Which agent actions need human approval?",
      a: "The irreversible ones, and the ones with outsized consequence: money leaving the company, messages to customers, deletions, changes to regulated or financial records, anything above a threshold you set deliberately. Everything reversible and low-consequence should stay automatic — gating it too teaches reviewers to click through, which is how the real gates stop working.",
    },
    {
      q: "How is this different from ordinary access control?",
      a: "It builds on it rather than replacing it. The difference is that an agent acts continuously, at machine speed, and can be talked into things by its own input — so permissions must be enforced by the system rather than requested in a prompt, and the audit trail has to capture intent as well as the action. Role-based permissions are necessary here; they are just not sufficient on their own.",
    },
  ],

  cta: {
    eyebrow: "Vento Labs",
    title: "We build agents that know where to stop",
    text: "Vento Labs builds AI agents on top of business systems with role-based permissions, plan review before anything changes, and a complete audit trail. Managers get safe self-service, developers stop drowning in routine, and the core system stays untouched. The 1C Agent case shows how it works from the inside.",
    primaryLabel: "Case: 1C Agent",
    primaryHref: "/cases/erp-agent",
    secondaryLabel: "All cases",
    secondaryHref: "/cases",
  },

  stubs: {},
};

const ru: Article = {
  eyebrow: "Управление AI",
  h1: "Автономный AI без делегирования ответственности",
  lede: "Компании выдают AI-агентам доступ к почте, CRM, клиентским данным и платёжным системам. И при этом многие до сих пор не могут ответить на базовый вопрос: кто отвечает, когда агент ошибётся? Агенту можно делегировать задачи и право принимать решения. Ответственность делегировать нельзя — и команды, которые понимают разницу, внедряют быстрее, а не медленнее.",
  meta: {
    author: "Владислав Гаон",
    authorRole: "Vento Labs. Пишет про управление AI и внедрение в корпоративной среде",
    dateLabel: "Обновлено",
    dateValue: "17 июля 2026",
    readingLabel: "Чтение",
    readingValue: "6 минут",
  },

  tldrTitle: "Коротко",
  tldr: [
    "**Автономный агент — это не генератор текста.** Он общается с клиентами, правит записи, двигает деньги и принимает решения с реальными последствиями. Управлять им нужно как сотрудником с доступом к системам, а не как текстовым полем.",
    "**Каждому агенту нужны пять вещей:** описанная область полномочий, лимиты на данные и траты, названные ситуации, где нужно одобрение человека, полный след того, что он сделал, и один конкретный человек, который может его выключить.",
    "**«У нас человек в контуре» — это не контроль.** Это работает, только если у человека есть информация, время и полномочия остановить действие до того, как оно станет необратимым.",
    "**Граница, которая важна:** задачи и право решать — делегируются. Ответственность — нет. Она остаётся на человеке и на компании, что бы ни обещал маркетинг вендора.",
    "**Это ускоритель, а не тормоз.** Команды, которые знают, где агент может действовать, где обязан остановиться и кто за него отвечает, масштабируются уверенно — вместо того чтобы вечно сидеть в пилоте.",
  ],

  tocTitle: "Содержание",

  sections: [
    {
      id: "what-an-agent-actually-does",
      title: "Что автономный агент делает на самом деле",
      tocLabel: "Что агент делает на самом деле",
      blocks: [
        {
          kind: "p",
          text: "**Автономный AI-агент не просто генерирует контент.** Он может общаться с клиентами, обновлять записи, инициировать транзакции и принимать решения с реальными последствиями для бизнеса. В тот момент, когда у него появляется доступ, он перестаёт быть чат-ботом и становится действующим лицом внутри ваших систем.",
        },
        {
          kind: "p",
          text: "Именно здесь ломается большинство схем контроля. У модели, которая пишет текст, проверка встроена по умолчанию: человек читает результат прежде, чем тот куда-то уйдёт. У агента с ключом от API такого шага нет, пока вы его не построите. Результат и есть действие.",
        },
        {
          kind: "note",
          title: "Рабочая аналогия",
          text: "Относитесь к агенту как к новому сотруднику на первой неделе, которому выдали доступ в прод. Вы бы не вручили такому человеку корпоративную карту, базу клиентов и кнопку «отправить» без описания полномочий, без лимита и без руководителя. Агент быстрее и стабильнее новичка — но он же буквальнее и не понимает, когда надо остановиться и спросить.",
        },
      ],
    },

    {
      id: "five-requirements",
      title: "Пять вещей, которые должны быть у каждого агента",
      tocLabel: "Пять требований",
      blocks: [
        {
          kind: "p",
          text: "Это минимум. Если вы не можете назвать все пять для агента, который уже работает в компании, — у вас не управляемый агент, а инцидент, который ждёт повода.",
        },
        {
          kind: "table",
          head: ["Требование", "Что это значит на практике", "На какой вопрос отвечает"],
          rows: [
            [
              "**Описанная область полномочий**",
              "Зафиксировано письменно: какие системы, какие объекты, какие операции. Читать CRM, но не зарплату. Готовить счёт, но не отправлять.",
              "К чему агенту вообще разрешено прикасаться?",
            ],
            [
              "**Лимиты на данные и траты**",
              "Жёсткие потолки, которые держит система, а не промпт. Лимит на операцию, лимит в сутки, область записей, которые он может читать.",
              "Сколько ущерба пролезет в эту дверь?",
            ],
            [
              "**Названные точки одобрения**",
              "Конкретные ситуации, где агент обязан остановиться и ждать: выше порога, вне рабочих часов, всё необратимое, всё, что трогает регулируемые данные.",
              "Где человек должен сказать «да»?",
            ],
            [
              "**Полный след решений и действий**",
              "Каждое действие в логе: с чем пришёл, что предложил, какие данные видел, что получилось. Читаемо потом тем, кого при этом не было.",
              "Что он сделал и почему?",
            ],
            [
              "**Конкретный владелец со стороны бизнеса**",
              "Один человек, не комитет и не «айти». Может остановить агента сегодня, без заявки.",
              "Кто его выключит?",
            ],
          ],
        },
        {
          kind: "p",
          text: "Обратите внимание, что общего у этих пяти пунктов: ни один из них не про возможности модели. Это всё организационные решения — и все они дешевле до внедрения, чем после инцидента.",
        },
      ],
    },

    {
      id: "human-in-the-loop",
      title: "Почему «человек в контуре» — это не ответ",
      tocLabel: "«Человек в контуре» — не ответ",
      blocks: [
        {
          kind: "p",
          text: "**Просто сказать, что человек в контуре, недостаточно.** Это самый частый ответ на вопрос об ответственности и самый непроверяемый. Фраза описывает схему на слайде, а не механизм контроля.",
        },
        {
          kind: "p",
          text: "Чтобы человек был реальным контролем, в момент решения — а не в проектной документации — должны выполняться три условия:",
        },
        {
          kind: "ol",
          items: [
            "**У него есть информация.** Окно с вопросом «Одобрить?» без контекста — это не проверка, а штамп с лишними шагами. Проверяющий должен видеть, что видел агент и что он собирается сделать.",
            "**У него есть время.** Десять одобрений в день читают. Четыреста — прокликивают. Если доля одобрений 99%, контур уже выродился в формальность, и единственный важный случай уехал вместе со всеми остальными.",
            "**У него есть полномочия.** Проверяющий должен иметь возможность сказать «нет» так, чтобы это осталось в силе, — не эскалируя к человеку, чей квартальный план агент как раз помогает закрыть.",
          ],
        },
        {
          kind: "p",
          text: "И ещё одно, про что обычно забывают: вмешательство должно происходить **до того, как действие станет необратимым**. Экран одобрения после того, как письмо ушло, платёж прошёл, а запись перезаписана, — это не контроль. Это квитанция.",
        },
        {
          kind: "note",
          title: "Дешёвая проверка",
          text: "Спросите человека, который у вас назначен «в контуре», что агент делал вчера. Если он не может ответить и не может выяснить меньше чем за минуту — он был не в контуре, а в оргструктуре.",
        },
      ],
    },

    {
      id: "the-principle",
      title: "Принцип: полномочия делегируются, ответственность — нет",
      tocLabel: "Принцип",
      blocks: [
        {
          kind: "p",
          text: "**Компании могут делегировать AI задачи и право принимать решения. Ответственность делегировать они не могут.** Это весь тезис — и он не философский. Ровно так мир уже относится к любой другой автоматизации и к любым другим представителям.",
        },
        {
          kind: "p",
          text: "Когда система банка одобряет кредит, который не должна была одобрять, отвечает банк. Когда бригада подрядчика ломает здание, отвечает подрядчик. Никто не принимает «так решила система» как аргумент — и «так решила модель» не примет тоже. Ни регулятор, ни клиент, ни суд.",
        },
        {
          kind: "p",
          text: "Поэтому вопрос никогда не в том, *есть ли* ответственный, — он есть всегда. Вопрос в том, решила ли компания заранее и осознанно, кто это, или узнает по ходу инцидента.",
        },
      ],
    },

    {
      id: "what-it-looks-like",
      title: "Как это выглядит, когда построено нормально",
      tocLabel: "Как это выглядит на практике",
      blocks: [
        {
          kind: "p",
          text: "Для нас это не теория. Схема ниже — то, что мы собираем: например, в кейсе [1C Agent](/cases/erp-agent) — AI-слой над учётной системой компании, где менеджеры формулируют задачу обычным языком, а агент действует внутри 1С.",
        },
        {
          kind: "p",
          text: "ERP — хороший стресс-тест для этого тезиса, потому что радиус поражения реальный: проведение документов, движения по регистрам, закрытие периода. Пять требований превращаются в конкретную механику:",
        },
        {
          kind: "ul",
          items: [
            "**Полномочия становятся ролевыми правами.** Агент наследует права того, кто его попросил. Менеджер, запросивший отчёт, получает отчёт; тот же запрос не может тихо превратиться в запись в регистр, куда сам человек не дотянулся бы.",
            "**Лимиты становятся гейтом на права.** Чтение проходит. Запись и всё, что имеет финансовые последствия, упирается в границу, которую промпт не переспорит, — потому что проверка живёт в системе, а не в инструкции.",
            "**Одобрение становится ревью плана.** Агент сначала говорит, что собирается сделать, на языке бизнеса, и только потом делает. Человек одобряет план, а не всплывашку «да/нет» — в этом и разница между «у проверяющего есть информация» и «нет».",
            "**След становится полным аудит-логом.** Каждое действие залогировано и обратимо: кто попросил, что агент предложил, что прочитал, что изменилось. Разбирается через месяцы тем, кого рядом не было.",
            "**Владелец становится конкретным человеком с рубильником.** Не документом с политикой. Человеком, который может остановить это сейчас.",
          ],
        },
        {
          kind: "p",
          text: "Контринтуитивный итог: именно эта часть и позволяет ехать быстрее. Когда граница реальная, вы перестаёте согласовывать каждый запрос по отдельности. Менеджеры получают безопасный self-service вместо очереди заявок, а ядро учётной системы не трогается вообще.",
        },
      ],
    },

    {
      id: "how-to-start",
      title: "С чего начать, если агенты уже работают",
      tocLabel: "С чего начать",
      blocks: [
        {
          kind: "p",
          text: "Большинство компаний, которые это читают, не на стадии проектирования — у них уже крутятся три-четыре агента, которых кто-то быстро поднял. Это нормально. Дооснащение короткое:",
        },
        {
          kind: "ol",
          items: [
            "**Инвентаризация.** Выпишите всех агентов, у которых есть доступ. Включая тех, кого одна команда собрала, никому не сказав, — именно они и важны.",
            "**Владелец на каждого агента.** Один человек. Если никто не берёт — это и есть находка: агент, которого никто не хочет забирать, — это агент, которого не должно быть в проде.",
            "**Найдите необратимые действия.** По каждому агенту выпишите то, что нельзя откатить: деньги наружу, сообщения клиентам, удаления, всё, что уходит в госорганы. Этот список — и есть места для точек одобрения. Всё остальное пусть остаётся автоматическим.",
            "**Проверьте лог.** Попробуйте восстановить одно реальное решение прошлой недели по одному только логу. Не получилось — значит, это телеметрия, а не аудит-след. Чините до масштабирования.",
            "**Поставьте потолки.** Жёсткие лимиты на траты и объём данных, на стороне системы. Делайте это даже там, где агенту доверяете: лимит защищает не столько от модели, сколько от prompt injection и от кривого обновления.",
          ],
        },
        {
          kind: "note",
          title: "Честная часть",
          text: "Ничего из этого не требует фреймворка управления, комитета и PDF с политикой. Требуется пять ответов на каждого агента, записанных, и человек, готовый поставить своё имя рядом с каждым. Большинство команд проходит это упражнение за день — и большинство находит как минимум одного агента, у которого полномочий больше, чем кто-либо предполагал.",
        },
      ],
    },

    {
      id: "controlled-autonomy",
      title: "Управляемая автономия вместо неограниченной",
      tocLabel: "Управляемая автономия",
      blocks: [
        {
          kind: "p",
          text: "**Компании, которые сделают это правильно, не обязательно будут внедрять AI медленнее.** Они будут масштабировать его увереннее — потому что знают, где система может действовать, где обязана остановиться и кто остаётся ответственным.",
        },
        {
          kind: "p",
          text: "Это стоит проговорить точно, потому что управление обычно продают как налог на скорость. Всё наоборот. Застревают как раз те, кто сидит в вечном пилоте: каждое расширение снова упирается в тот же неотвеченный вопрос, и ничего не выходит из песочницы. Едут те, кто ответил на него один раз — в форме, которую можно переиспользовать для следующего агента и всех дальше.",
        },
        {
          kind: "p",
          text: "**Будущее — не неограниченная автономия AI. Будущее — управляемая автономия, которой бизнес может доверять, которую может аудировать и масштабировать.**",
        },
      ],
    },
  ],

  faqTitle: "Частые вопросы",
  faqLede: "Короткие ответы на то, что спрашивают чаще всего.",
  faq: [
    {
      q: "Кто юридически отвечает, когда AI-агент ошибается?",
      a: "Компания, которая его внедрила, — во всех правопорядках, которые пока успели этот вопрос затронуть. Ответственность не переходит ни на модель, ни на вендора, ни на API. Договором можно переложить часть финансовой ответственности на поставщика, но не ответственность перед вашими клиентами и регулятором: она остаётся у вас. Ровно поэтому и нужен названный внутренний владелец на каждого агента.",
    },
    {
      q: "Что на самом деле означает «человек в контуре»?",
      a: "Что у проверяющего есть информация, время и полномочия вмешаться — до того, как действие станет необратимым. Если он видит голую кнопку «Одобрить», получает сотни таких в день или не может настоять на «нет», контур существует только на схеме. Полезный тест: спросите его, что агент делал вчера, и засеките, сколько займёт ответ.",
    },
    {
      q: "Управление AI замедляет внедрение?",
      a: "Обычно наоборот. Замедляет как раз неотвеченный вопрос об ответственности: он всплывает при каждом расширении и держит агентов в пилоте. Когда полномочия, лимиты, точки одобрения, логирование и владелец определены, каждый следующий агент наследует схему и выходит быстрее предыдущего.",
    },
    {
      q: "Какие действия агента требуют одобрения человека?",
      a: "Необратимые и те, у которых непропорциональные последствия: деньги, уходящие из компании, сообщения клиентам, удаления, изменения в финансовых и регулируемых записях, всё выше порога, который вы установили осознанно. Всё обратимое и малозначимое должно оставаться автоматическим: если гейтить и это, проверяющие приучаются прокликивать — и настоящие гейты перестают работать.",
    },
    {
      q: "Чем это отличается от обычного разграничения доступа?",
      a: "Это на нём строится, а не заменяет его. Разница в том, что агент действует непрерывно, на машинной скорости, и его можно уговорить его же входными данными — поэтому права должен держать сам механизм, а не промпт, а аудит-след обязан фиксировать намерение, а не только действие. Ролевые права здесь необходимы — просто их одних недостаточно.",
    },
  ],

  cta: {
    eyebrow: "Vento Labs",
    title: "Мы строим агентов, которые знают, где остановиться",
    text: "Vento Labs собирает AI-агентов поверх учётных систем: ролевые права, ревью плана до любого изменения, полный аудит-лог. Менеджеры получают безопасный self-service, разработчики перестают тонуть в рутине, ядро системы остаётся нетронутым. В кейсе 1C Agent разобрано, как это устроено изнутри.",
    primaryLabel: "Кейс: 1C Agent",
    primaryHref: "/cases/erp-agent",
    secondaryLabel: "Все кейсы",
    secondaryHref: "/cases",
  },

  stubs: {},
};

const de: Article = {
  eyebrow: "KI-Governance",
  h1: "Autonome KI, ohne Verantwortung zu delegieren",
  lede: "Unternehmen geben KI-Agenten Zugriff auf E-Mail, CRM, Kundendaten und Zahlungssysteme. Viele können eine einfache Frage trotzdem nicht beantworten: Wer haftet, wenn der Agent sich irrt? Aufgaben und Entscheidungsbefugnis lassen sich an einen Agenten delegieren. Verantwortung nicht — und Teams, die den Unterschied verstehen, liefern schneller, nicht langsamer.",
  meta: {
    author: "Vladislav Gaon",
    authorRole: "Vento Labs. Schreibt über KI-Governance und Einführung im Unternehmen",
    dateLabel: "Aktualisiert",
    dateValue: "17. Juli 2026",
    readingLabel: "Lesezeit",
    readingValue: "6 Minuten",
  },

  tldrTitle: "Kurz gefasst",
  tldr: [
    "**Ein autonomer Agent ist kein Textgenerator.** Er spricht mit Kunden, ändert Datensätze, bewegt Geld und trifft Entscheidungen mit realen Folgen. Er gehört geführt wie ein Mitarbeiter mit Systemzugang — nicht wie ein Eingabefeld.",
    "**Jeder Agent braucht fünf Dinge:** einen definierten Kompetenzrahmen, Limits für Daten und Ausgaben, benannte Situationen mit menschlicher Freigabe, eine lückenlose Aufzeichnung seiner Handlungen und eine konkrete Person, die ihn abschalten kann.",
    "**„Da ist ein Mensch im Loop\" ist keine Kontrolle.** Sie zählt nur, wenn diese Person die Informationen, die Zeit und die Befugnis hat, einzugreifen, bevor die Handlung unumkehrbar wird.",
    "**Die entscheidende Grenze:** Aufgaben und Entscheidungsbefugnis sind delegierbar. Verantwortung ist es nicht. Sie bleibt bei einer Person und einem Unternehmen — was das Marketing des Anbieters auch verspricht.",
    "**Das ist ein Beschleuniger, keine Bremse.** Teams, die wissen, wo der Agent handeln darf, wo er stoppen muss und wer für ihn geradesteht, skalieren mit Zuversicht, statt ewig im Pilotprojekt zu hängen.",
  ],

  tocTitle: "Inhalt",

  sections: [
    {
      id: "what-an-agent-actually-does",
      title: "Was ein autonomer Agent tatsächlich tut",
      tocLabel: "Was ein Agent tatsächlich tut",
      blocks: [
        {
          kind: "p",
          text: "**Ein autonomer KI-Agent erzeugt nicht nur Inhalte.** Er kann mit Kunden kommunizieren, Datensätze aktualisieren, Transaktionen auslösen und Entscheidungen mit realen geschäftlichen Folgen treffen. In dem Moment, in dem er Zugangsdaten hält, ist er kein Chatbot mehr, sondern ein Akteur in Ihren Systemen.",
        },
        {
          kind: "p",
          text: "Genau an dieser Unterscheidung scheitert die meiste Governance. Ein Modell, das Text verfasst, hat die Prüfung eingebaut: Ein Mensch liest das Ergebnis, bevor es irgendwohin geht. Ein Agent mit API-Schlüssel hat diesen Schritt nicht, solange Sie ihn nicht bauen. Das Ergebnis *ist* die Handlung.",
        },
        {
          kind: "note",
          title: "Das brauchbare Denkmodell",
          text: "Behandeln Sie den Agenten wie eine neue Kraft in ihrer ersten Woche, die Produktionszugriff bekommen hat. Dieser Person würden Sie nicht die Firmenkarte, die Kundendatenbank und den Senden-Knopf ohne Rahmen, ohne Limit und ohne Vorgesetzten in die Hand drücken. Der Agent ist schneller und konsistenter als der Neuzugang — und er ist zugleich wörtlicher und weiß nicht, wann er innehalten und nachfragen sollte.",
        },
      ],
    },

    {
      id: "five-requirements",
      title: "Fünf Dinge, die jeder Agent haben sollte",
      tocLabel: "Fünf Anforderungen",
      blocks: [
        {
          kind: "p",
          text: "Das ist das Minimum. Wer diese fünf Punkte für einen bereits laufenden Agenten nicht benennen kann, hat keinen kontrollierten Agenten, sondern einen Vorfall, der auf seinen Auslöser wartet.",
        },
        {
          kind: "table",
          head: ["Anforderung", "Was das praktisch heißt", "Welche Frage sie beantwortet"],
          rows: [
            [
              "**Definierter Kompetenzrahmen**",
              "Schriftlich festgehalten: welche Systeme, welche Objekte, welche Operationen. Das CRM lesen, aber nicht die Gehaltsabrechnung. Die Rechnung vorbereiten, aber nicht versenden.",
              "Was darf dieser Agent überhaupt anfassen?",
            ],
            [
              "**Limits für Daten und Ausgaben**",
              "Harte Obergrenzen, durchgesetzt vom System, nicht vom Prompt. Ein Limit je Transaktion, eine Tagessumme, ein Umfang lesbarer Datensätze.",
              "Wie viel Schaden passt durch diese Tür?",
            ],
            [
              "**Benannte Freigabepunkte**",
              "Konkrete Situationen, in denen der Agent stoppen und warten muss: oberhalb einer Schwelle, außerhalb der Geschäftszeiten, alles Unumkehrbare, alles in regulierten Feldern.",
              "Wo muss ein Mensch Ja sagen?",
            ],
            [
              "**Lückenlose Aufzeichnung von Entscheidungen und Handlungen**",
              "Jede Handlung protokolliert: Eingabe, Begründung, gesehene Daten, Ergebnis — später lesbar für jemanden, der nicht dabei war.",
              "Was hat er getan, und warum?",
            ],
            [
              "**Ein konkreter fachlicher Eigentümer**",
              "Eine benannte Person, kein Gremium und nicht „die IT\". Sie kann den Agenten heute stoppen, ohne Ticket.",
              "Wer schaltet ihn ab?",
            ],
          ],
        },
        {
          kind: "p",
          text: "Beachten Sie, was diese fünf gemeinsam haben: Keiner ist eine Fähigkeit des Modells. Es sind durchweg organisatorische Entscheidungen — und sie sind vor der Einführung allesamt billiger als nach einem Vorfall.",
        },
      ],
    },

    {
      id: "human-in-the-loop",
      title: "Warum „Mensch im Loop\" keine Antwort ist",
      tocLabel: "„Mensch im Loop\" ist keine Antwort",
      blocks: [
        {
          kind: "p",
          text: "**Zu sagen, es sei ein Mensch im Loop, genügt nicht.** Es ist die häufigste Antwort auf die Verantwortungsfrage und die am wenigsten geprüfte. Der Satz beschreibt ein Diagramm, keine Kontrolle.",
        },
        {
          kind: "p",
          text: "Damit der Mensch eine echte Kontrolle ist, müssen im Moment der Entscheidung drei Dinge zutreffen — nicht im Konzeptpapier:",
        },
        {
          kind: "ol",
          items: [
            "**Er hat die Informationen.** Ein Dialog mit „Freigeben?\" ohne Kontext ist keine Prüfung, sondern ein Stempel mit Zusatzschritten. Der Prüfer muss sehen, was der Agent gesehen hat und was er vorhat.",
            "**Er hat die Zeit.** Zehn Freigaben am Tag werden gelesen. Vierhundert werden weggeklickt. Liegt die Freigabequote bei 99%, ist der Loop längst zur Formalität verkommen — und der eine Fall, auf den es ankam, ging mit durch.",
            "**Er hat die Befugnis.** Der Prüfer muss Nein sagen können, und es muss halten — ohne Eskalation zu der Person, deren Quartalsziel der Agent gerade erreichen hilft.",
          ],
        },
        {
          kind: "p",
          text: "Und noch etwas, das gern vergessen wird: Der Eingriff muss erfolgen, **bevor die Handlung unumkehrbar wird**. Ein Freigabedialog, nachdem die E-Mail raus, die Zahlung durch und der Datensatz überschrieben ist, ist keine Kontrolle. Er ist eine Quittung.",
        },
        {
          kind: "note",
          title: "Ein billiger Test",
          text: "Fragen Sie die Person, die bei Ihnen als Mensch im Loop benannt ist, was der Agent gestern getan hat. Kann sie es nicht sagen und nicht in unter einer Minute herausfinden, war sie nie im Loop — sie stand nur im Organigramm.",
        },
      ],
    },

    {
      id: "the-principle",
      title: "Das Prinzip: Befugnis ist delegierbar, Verantwortung nicht",
      tocLabel: "Das Prinzip",
      blocks: [
        {
          kind: "p",
          text: "**Unternehmen können Aufgaben und Entscheidungsbefugnis an KI delegieren. Verantwortung können sie nicht delegieren.** Das ist das ganze Argument — und es ist kein philosophisches. So behandelt die Welt längst jede andere Form von Automatisierung und jede andere Form von Stellvertretung.",
        },
        {
          kind: "p",
          text: "Wenn das System einer Bank einen Kredit bewilligt, den es nicht hätte bewilligen dürfen, haftet die Bank. Wenn die Kolonne eines Subunternehmers das Gebäude beschädigt, haftet der Subunternehmer. Niemand akzeptiert „das System hat entschieden\" als Verteidigung, und „das Modell hat entschieden\" wird ebenso wenig akzeptiert — weder von Aufsichtsbehörden noch von Kunden noch vor Gericht.",
        },
        {
          kind: "p",
          text: "Die Frage ist also nie, *ob* jemand verantwortlich ist — jemand ist es immer. Die Frage ist, ob Ihr Unternehmen vorab und bewusst entschieden hat, wer das ist, oder ob es das während des Vorfalls herausfindet.",
        },
      ],
    },

    {
      id: "what-it-looks-like",
      title: "Wie das aussieht, wenn es sauber gebaut ist",
      tocLabel: "Wie es in der Praxis aussieht",
      blocks: [
        {
          kind: "p",
          text: "Für uns ist das keine Theorie. Das Muster unten ist das, was wir ausliefern — etwa in [1C Agent](/cases/erp-agent), einer KI-Schicht über dem ERP eines Unternehmens, in der Fachbereiche in normaler Geschäftssprache formulieren und der Agent im Buchhaltungssystem handelt.",
        },
        {
          kind: "p",
          text: "Ein ERP ist ein guter Stresstest für das Argument, weil der Wirkungsradius real ist: Buchungen, Register, Periodenabschluss. Die fünf Anforderungen werden zu konkreter Mechanik:",
        },
        {
          kind: "ul",
          items: [
            "**Der Rahmen wird zu rollenbasierten Rechten.** Der Agent erbt die Rechte des Anfragenden. Wer einen Bericht anfordert, bekommt einen Bericht; dieselbe Anfrage kann nicht stillschweigend zu einer Schreiboperation in einem Register werden, an das die Person selbst nicht herankäme.",
            "**Limits werden zu einem Berechtigungs-Gate.** Lesevorgänge laufen durch. Schreibvorgänge und alles mit finanzieller Folge treffen auf eine Grenze, die der Prompt nicht wegdiskutiert — weil die Prüfung im System sitzt, nicht in der Anweisung.",
            "**Freigabe wird zum Plan-Review.** Der Agent sagt zuerst in Geschäftssprache, was er vorhat, und tut es erst dann. Der Mensch gibt den Plan frei, nicht ein Ja/Nein-Popup — genau das ist der Unterschied zwischen „der Prüfer hat die Informationen\" und nicht.",
            "**Die Aufzeichnung wird zum vollständigen Audit-Log.** Jede Handlung protokolliert und umkehrbar: wer gefragt hat, was der Agent vorschlug, was er las, was sich änderte. Monate später rekonstruierbar von jemandem, der nicht dabei war.",
            "**Der Eigentümer wird zu einer benannten Person mit Not-Aus.** Kein Richtliniendokument. Ein Mensch, der es jetzt stoppen kann.",
          ],
        },
        {
          kind: "p",
          text: "Das kontraintuitive Ergebnis: Genau dieser Teil erlaubt das schnellere Tempo. Sobald die Grenze real ist, verhandeln Sie nicht mehr jede einzelne Anfrage. Fachbereiche bekommen sicheren Self-Service statt einer Ticket-Warteschlange, und der Kern des Buchhaltungssystems wird nie angefasst.",
        },
      ],
    },

    {
      id: "how-to-start",
      title: "Wo anfangen, wenn schon Agenten laufen",
      tocLabel: "Wo anfangen",
      blocks: [
        {
          kind: "p",
          text: "Die meisten Unternehmen, die das lesen, sind nicht in der Konzeptphase — bei ihnen laufen längst drei oder vier Agenten, die jemand schnell aufgesetzt hat. Das ist in Ordnung. Das Nachrüsten ist kurz:",
        },
        {
          kind: "ol",
          items: [
            "**Inventar.** Listen Sie jeden Agenten mit Zugangsdaten auf. Auch die, die ein einzelnes Team gebaut hat, ohne jemandem Bescheid zu sagen — auf die kommt es an.",
            "**Ein Eigentümer je Agent.** Eine Person. Will niemand übernehmen, ist genau das Ihr Befund: Ein Agent, den niemand besitzen will, ist ein Agent, der nicht laufen sollte.",
            "**Finden Sie die unumkehrbaren Handlungen.** Listen Sie je Agent auf, was sich nicht rückgängig machen lässt: Geld raus, Nachrichten an Kunden, Löschungen, alles, was bei einer Behörde eingeht. Diese Liste ist der Ort für Freigabe-Gates. Alles andere darf automatisch bleiben.",
            "**Prüfen Sie das Log.** Versuchen Sie, eine echte Entscheidung der letzten Woche allein aus dem Log zu rekonstruieren. Geht das nicht, ist das Log Telemetrie und kein Audit-Trail — reparieren Sie es vor dem Skalieren.",
            "**Deckeln Sie es.** Harte Limits für Ausgaben und Datenumfang, durchgesetzt vom System. Tun Sie das auch dort, wo Sie dem Agenten vertrauen: Das Limit schützt ebenso gegen Prompt Injection und ein fehlerhaftes Update wie gegen das Modell.",
          ],
        },
        {
          kind: "note",
          title: "Der ehrliche Teil",
          text: "Nichts davon braucht ein Governance-Framework, ein Gremium oder ein Richtlinien-PDF. Es braucht fünf Antworten je Agent, aufgeschrieben, und eine Person, die bereit ist, ihren Namen daneben zu setzen. Die meisten Teams schaffen die ganze Übung an einem Nachmittag — und die meisten finden dabei mindestens einen Agenten, der stillschweigend mehr Befugnisse hat, als irgendjemand vorgesehen hatte.",
        },
      ],
    },

    {
      id: "controlled-autonomy",
      title: "Kontrollierte statt unbegrenzter Autonomie",
      tocLabel: "Kontrollierte Autonomie",
      blocks: [
        {
          kind: "p",
          text: "**Die Organisationen, die das richtig machen, werden KI nicht zwangsläufig langsamer einführen.** Sie werden sie mit größerer Zuversicht skalieren — weil sie wissen, wo das System handeln darf, wo es stoppen muss und wer verantwortlich bleibt.",
        },
        {
          kind: "p",
          text: "Das lohnt eine genaue Formulierung, denn Governance wird meist als Steuer auf Tempo verkauft. Es ist das Gegenteil. Stehen bleiben die Teams im Dauerpilot: Jede Ausweitung reißt dieselbe unbeantwortete Frage wieder auf, also verlässt nie etwas die Sandbox. Vorwärts kommen die, die sie einmal beantwortet haben — in einer Form, die für den nächsten Agenten wiederverwendbar ist.",
        },
        {
          kind: "p",
          text: "**Die Zukunft ist nicht unbegrenzte KI-Autonomie. Sie ist kontrollierte Autonomie, der Unternehmen vertrauen können, die sie auditieren und skalieren können.**",
        },
      ],
    },
  ],

  faqTitle: "Häufige Fragen",
  faqLede: "Kurze Antworten auf das, was am häufigsten kommt.",
  faq: [
    {
      q: "Wer haftet rechtlich, wenn ein KI-Agent einen Fehler macht?",
      a: "Das Unternehmen, das ihn eingeführt hat — in jeder Rechtsordnung, die sich der Frage bisher gewidmet hat. Verantwortung geht nicht auf ein Modell, einen Anbieter oder eine API über. Verträge können einen Teil der finanziellen Haftung zum Lieferanten verschieben, aber nicht die Verantwortung gegenüber Ihren Kunden und Ihrer Aufsicht: Die bleibt bei Ihnen. Genau deshalb zählt ein benannter interner Eigentümer je Agent.",
    },
    {
      q: "Was verlangt „Mensch im Loop\" tatsächlich?",
      a: "Dass der Prüfer die Informationen, die Zeit und die Befugnis zum Eingreifen hat — bevor die Handlung unumkehrbar wird. Sieht er nur ein nacktes „Freigeben?\", bekommt er Hunderte am Tag oder kann er ein Nein nicht durchsetzen, existiert der Loop nur im Diagramm. Ein brauchbarer Test: Fragen Sie ihn, was der Agent gestern getan hat, und messen Sie, wie lange die Antwort dauert.",
    },
    {
      q: "Bremst KI-Governance die Einführung?",
      a: "Meist ist es umgekehrt. Was Unternehmen bremst, ist die unbeantwortete Verantwortungsfrage: Sie taucht bei jeder Ausweitung wieder auf und hält Agenten im Pilotstatus. Sind Rahmen, Limits, Freigabepunkte, Protokollierung und Eigentümerschaft geklärt, erbt jeder neue Agent das Muster und geht schneller live als der vorige.",
    },
    {
      q: "Welche Handlungen eines Agenten brauchen menschliche Freigabe?",
      a: "Die unumkehrbaren und die mit übergroßer Konsequenz: Geld, das das Unternehmen verlässt, Nachrichten an Kunden, Löschungen, Änderungen an regulierten oder finanziellen Datensätzen, alles oberhalb einer bewusst gesetzten Schwelle. Alles Umkehrbare und Folgenarme sollte automatisch bleiben — auch das zu gaten, erzieht Prüfer zum Wegklicken, und genau so hören die echten Gates auf zu wirken.",
    },
    {
      q: "Worin unterscheidet sich das von gewöhnlicher Zugriffskontrolle?",
      a: "Es baut darauf auf, statt sie zu ersetzen. Der Unterschied: Ein Agent handelt dauerhaft, in Maschinengeschwindigkeit, und lässt sich von seinen eigenen Eingaben zu Dingen überreden — deshalb müssen Rechte vom System durchgesetzt und nicht im Prompt erbeten werden, und der Audit-Trail muss die Absicht erfassen, nicht nur die Handlung. Rollenbasierte Rechte sind hier notwendig; sie genügen nur nicht allein.",
    },
  ],

  cta: {
    eyebrow: "Vento Labs",
    title: "Wir bauen Agenten, die wissen, wo sie aufhören",
    text: "Vento Labs baut KI-Agenten auf Geschäftssystemen: rollenbasierte Rechte, Plan-Review vor jeder Änderung, lückenloses Audit-Log. Fachbereiche bekommen sicheren Self-Service, Entwickler ertrinken nicht mehr in Routine, das Kernsystem bleibt unangetastet. Der Case 1C Agent zeigt, wie das von innen funktioniert.",
    primaryLabel: "Case: 1C Agent",
    primaryHref: "/cases/erp-agent",
    secondaryLabel: "Alle Cases",
    secondaryHref: "/cases",
  },

  stubs: {},
};

const es: Article = {
  eyebrow: "Gobernanza de IA",
  h1: "IA autónoma sin delegar la responsabilidad",
  lede: "Las empresas dan a los agentes de IA acceso al correo, al CRM, a los datos de clientes y a los sistemas de pago. Y muchas siguen sin poder responder a una pregunta básica: ¿quién responde cuando el agente se equivoca? A un agente se le pueden delegar tareas y capacidad de decisión. La responsabilidad no — y los equipos que entienden la diferencia despliegan más rápido, no más despacio.",
  meta: {
    author: "Vladislav Gaon",
    authorRole: "Vento Labs. Escribe sobre gobernanza de IA y adopción empresarial",
    dateLabel: "Actualizado",
    dateValue: "17 de julio de 2026",
    readingLabel: "Lectura",
    readingValue: "6 minutos",
  },

  tldrTitle: "En resumen",
  tldr: [
    "**Un agente autónomo no es un generador de texto.** Habla con clientes, modifica registros, mueve dinero y toma decisiones con consecuencias reales. Hay que gobernarlo como a un empleado con acceso a los sistemas, no como a un campo de texto.",
    "**Todo agente necesita cinco cosas:** un ámbito de autoridad definido, límites de datos y de gasto, situaciones concretas que exigen aprobación humana, un registro completo de lo que hizo y una persona concreta que pueda apagarlo.",
    "**«Hay un humano en el bucle» no es un control.** Solo cuenta si esa persona tiene la información, el tiempo y la autoridad para intervenir antes de que la acción sea irreversible.",
    "**La frontera que importa:** las tareas y la capacidad de decidir se delegan. La responsabilidad no. Se queda en una persona y en una empresa, diga lo que diga el marketing del proveedor.",
    "**Esto acelera, no frena.** Los equipos que saben dónde puede actuar el agente, dónde debe detenerse y quién responde por él escalan con confianza en lugar de vivir en un piloto eterno.",
  ],

  tocTitle: "Contenido",

  sections: [
    {
      id: "what-an-agent-actually-does",
      title: "Qué hace realmente un agente autónomo",
      tocLabel: "Qué hace realmente un agente",
      blocks: [
        {
          kind: "p",
          text: "**Un agente de IA autónomo hace algo más que generar contenido.** Puede comunicarse con clientes, actualizar registros, iniciar transacciones y tomar decisiones con consecuencias reales para el negocio. En el momento en que tiene credenciales, deja de ser un chatbot: es un actor dentro de tus sistemas.",
        },
        {
          kind: "p",
          text: "Ahí es donde falla la mayoría de los esquemas de control. Un modelo que redacta texto lleva la revisión incorporada por defecto: alguien lee el resultado antes de que salga a ningún sitio. Un agente con una clave de API no tiene ese paso salvo que lo construyas. El resultado *es* la acción.",
        },
        {
          kind: "note",
          title: "El modelo mental útil",
          text: "Trata al agente como a una persona recién incorporada, en su primera semana, a la que le han dado acceso a producción. A esa persona no le entregarías la tarjeta de empresa, la base de clientes y el botón de enviar sin ámbito, sin límite y sin responsable. El agente es más rápido y más consistente que el novato — y también más literal, y no sabe cuándo parar y preguntar.",
        },
      ],
    },

    {
      id: "five-requirements",
      title: "Cinco cosas que todo agente debería tener",
      tocLabel: "Cinco requisitos",
      blocks: [
        {
          kind: "p",
          text: "Esto es el mínimo. Si no puedes nombrar los cinco para un agente que ya está funcionando en tu empresa, no tienes un agente gobernado: tienes un incidente esperando su detonante.",
        },
        {
          kind: "table",
          head: ["Requisito", "Qué significa en la práctica", "A qué pregunta responde"],
          rows: [
            [
              "**Ámbito de autoridad definido**",
              "Por escrito: qué sistemas, qué objetos, qué operaciones. Leer el CRM pero no las nóminas. Preparar la factura pero no enviarla.",
              "¿Qué puede tocar este agente?",
            ],
            [
              "**Límites de datos y de gasto**",
              "Topes duros que aplica el sistema, no el prompt. Un límite por operación, un total diario, un alcance de registros que puede leer.",
              "¿Cuánto daño cabe por esa puerta?",
            ],
            [
              "**Puntos de aprobación definidos**",
              "Situaciones concretas en las que el agente debe parar y esperar: por encima de un umbral, fuera del horario, todo lo irreversible, todo lo que toca campos regulados.",
              "¿Dónde tiene que decir «sí» un humano?",
            ],
            [
              "**Registro completo de decisiones y acciones**",
              "Cada acción registrada con su entrada, su razonamiento, los datos que vio y el resultado — legible después por alguien que no estaba.",
              "¿Qué hizo, y por qué?",
            ],
            [
              "**Un responsable de negocio concreto**",
              "Una persona con nombre, no un comité ni «sistemas». Puede suspender el agente hoy, sin abrir un ticket.",
              "¿Quién lo apaga?",
            ],
          ],
        },
        {
          kind: "p",
          text: "Fíjate en lo que tienen en común los cinco: ninguno es una capacidad del modelo. Todos son decisiones organizativas — y todos salen más baratos antes del despliegue que después de un incidente.",
        },
      ],
    },

    {
      id: "human-in-the-loop",
      title: "Por qué «un humano en el bucle» no es una respuesta",
      tocLabel: "«Humano en el bucle» no es respuesta",
      blocks: [
        {
          kind: "p",
          text: "**Decir que hay un humano en el bucle no basta.** Es la respuesta más frecuente a la pregunta de la responsabilidad y la menos examinada. La frase describe un diagrama, no un control.",
        },
        {
          kind: "p",
          text: "Para que el humano sea un control real, en el momento de la decisión — no en el documento de diseño — deben cumplirse tres cosas:",
        },
        {
          kind: "ol",
          items: [
            "**Tiene la información.** Un aviso que dice «¿Aprobar?» sin contexto no es una revisión: es un sello con pasos extra. Quien revisa necesita ver lo que vio el agente y lo que pretende hacer.",
            "**Tiene el tiempo.** Diez aprobaciones al día se leen. Cuatrocientas se clican. Si la tasa de aprobación es del 99%, el bucle ya degeneró en formalidad, y el único caso que importaba pasó con todos los demás.",
            "**Tiene la autoridad.** Quien revisa debe poder decir que no y que eso se sostenga — sin escalar a la persona cuyo objetivo trimestral está ayudando a cumplir el agente.",
          ],
        },
        {
          kind: "p",
          text: "Y una más, la que se olvida: la intervención tiene que ocurrir **antes de que la acción sea irreversible**. Una pantalla de aprobación mostrada después de que el correo salió, el pago se ejecutó o el registro se sobrescribió no es un control. Es un recibo.",
        },
        {
          kind: "note",
          title: "Una prueba barata",
          text: "Pregunta a la persona designada como humano en el bucle qué hizo el agente ayer. Si no sabe decirlo y no puede averiguarlo en menos de un minuto, nunca estuvo en el bucle: estaba en el organigrama.",
        },
      ],
    },

    {
      id: "the-principle",
      title: "El principio: la autoridad se delega, la responsabilidad no",
      tocLabel: "El principio",
      blocks: [
        {
          kind: "p",
          text: "**Las empresas pueden delegar tareas y capacidad de decisión a la IA. No pueden delegar la responsabilidad.** Ese es todo el argumento, y no es filosófico: es como el mundo ya trata cualquier otra automatización y cualquier otra forma de representación.",
        },
        {
          kind: "p",
          text: "Cuando el sistema de un banco aprueba un préstamo que no debía aprobar, responde el banco. Cuando la cuadrilla de un contratista daña el edificio, responde el contratista. Nadie acepta «lo decidió el sistema» como defensa, y tampoco aceptará «lo decidió el modelo». Ni el regulador, ni el cliente, ni un juez.",
        },
        {
          kind: "p",
          text: "Así que la pregunta nunca es *si* hay alguien responsable — siempre lo hay. La pregunta es si tu empresa ha decidido quién, por adelantado y a propósito, o si lo va a descubrir durante el incidente.",
        },
      ],
    },

    {
      id: "what-it-looks-like",
      title: "Cómo se ve cuando está bien construido",
      tocLabel: "Cómo se ve en la práctica",
      blocks: [
        {
          kind: "p",
          text: "Para nosotros esto no es teoría. El patrón de abajo es lo que entregamos — por ejemplo en [1C Agent](/cases/erp-agent), una capa de IA sobre el ERP de una empresa donde los responsables piden cosas en lenguaje de negocio y el agente actúa dentro del sistema contable.",
        },
        {
          kind: "p",
          text: "Un ERP es una buena prueba de esfuerzo para el argumento, porque el radio de impacto es real: asientos, registros, cierre de periodo. Los cinco requisitos aterrizan como mecánica concreta:",
        },
        {
          kind: "ul",
          items: [
            "**El ámbito se convierte en permisos por rol.** El agente hereda los derechos de quien pide. Quien solicita un informe obtiene un informe; la misma petición no puede convertirse en silencio en una escritura en un registro que esa persona no podría tocar.",
            "**Los límites se convierten en una barrera de permisos.** Las lecturas pasan. Las escrituras y todo lo que tenga consecuencia financiera chocan con una frontera que el prompt no puede rebatir — porque la comprobación vive en el sistema, no en las instrucciones.",
            "**La aprobación se convierte en revisión del plan.** El agente declara qué pretende hacer, en lenguaje de negocio, antes de hacerlo. La persona aprueba el plan, no un popup de sí/no — esa es la diferencia entre que quien revisa tenga la información o no.",
            "**El registro se convierte en un audit log completo.** Cada acción registrada y reversible: quién pidió, qué propuso el agente, qué leyó, qué cambió. Reconstruible meses después por alguien que no estaba.",
            "**El responsable se convierte en una persona con un interruptor.** No un documento de política. Una persona que puede pararlo ahora.",
          ],
        },
        {
          kind: "p",
          text: "El resultado contraintuitivo es que justo esta parte es la que te deja ir más rápido. Cuando la frontera es real, dejas de negociar cada petición. Los responsables obtienen self-service seguro en vez de una cola de tickets, y el núcleo del sistema contable no se toca nunca.",
        },
      ],
    },

    {
      id: "how-to-start",
      title: "Por dónde empezar si ya tienes agentes en marcha",
      tocLabel: "Por dónde empezar",
      blocks: [
        {
          kind: "p",
          text: "La mayoría de las empresas que leen esto no están en fase de diseño: ya tienen tres o cuatro agentes en producción que alguien levantó rápido. No pasa nada. La adaptación es corta:",
        },
        {
          kind: "ol",
          items: [
            "**Inventario.** Lista todos los agentes con credenciales. Incluidos los que montó un equipo sin decírselo a nadie: esos son los que importan.",
            "**Un responsable por agente.** Una persona. Si nadie lo quiere, ese es tu hallazgo: un agente que nadie quiere asumir es un agente que no debería estar funcionando.",
            "**Encuentra las acciones irreversibles.** Por cada agente, lista lo que no se puede deshacer: dinero que sale, mensajes a clientes, borrados, cualquier cosa presentada ante una autoridad. Esa lista es donde van las aprobaciones. El resto puede seguir siendo automático.",
            "**Revisa el log.** Intenta reconstruir una decisión real de la semana pasada usando solo el log. Si no puedes, el log es telemetría, no una pista de auditoría: arréglalo antes de escalar.",
            "**Pon topes.** Límites duros de gasto y de alcance de datos, aplicados por el sistema. Hazlo incluso donde confías en el agente: el límite te protege tanto de la inyección de prompts y de una actualización defectuosa como del modelo.",
          ],
        },
        {
          kind: "note",
          title: "La parte honesta",
          text: "Nada de esto exige un marco de gobernanza, un comité ni un PDF de políticas. Exige cinco respuestas por agente, escritas, y una persona dispuesta a poner su nombre junto a cada una. La mayoría de los equipos hace el ejercicio completo en una tarde — y la mayoría encuentra al menos un agente que tiene, sin que nadie lo pretendiera, más autoridad de la prevista.",
        },
      ],
    },

    {
      id: "controlled-autonomy",
      title: "Autonomía controlada, no autonomía ilimitada",
      tocLabel: "Autonomía controlada",
      blocks: [
        {
          kind: "p",
          text: "**Las organizaciones que acierten con esto no desplegarán IA necesariamente más despacio.** La escalarán con más confianza — porque saben dónde puede actuar el sistema, dónde debe detenerse y quién sigue siendo responsable.",
        },
        {
          kind: "p",
          text: "Conviene decirlo con precisión, porque la gobernanza suele venderse como un impuesto sobre la velocidad. Es lo contrario. Los que se atascan son los que viven en piloto permanente: cada ampliación reabre la misma pregunta sin responder, así que nada sale nunca del sandbox. Los que avanzan ya la respondieron una vez, en un formato reutilizable para el siguiente agente y el de después.",
        },
        {
          kind: "p",
          text: "**El futuro no es la autonomía ilimitada de la IA. Es una autonomía controlada en la que el negocio pueda confiar, que pueda auditar y escalar.**",
        },
      ],
    },
  ],

  faqTitle: "Preguntas frecuentes",
  faqLede: "Respuestas breves a lo que más se pregunta.",
  faq: [
    {
      q: "¿Quién responde legalmente cuando un agente de IA se equivoca?",
      a: "La empresa que lo desplegó, en todos los regímenes que han abordado la cuestión hasta ahora. La responsabilidad no se transfiere a un modelo, un proveedor ni una API. Los contratos pueden mover parte de la responsabilidad económica al proveedor, pero no la responsabilidad ante tus clientes y tu regulador: esa se queda contigo, y por eso importa tener un responsable interno con nombre por cada agente.",
    },
    {
      q: "¿Qué exige realmente «un humano en el bucle»?",
      a: "Que quien revisa tenga la información, el tiempo y la autoridad para intervenir, antes de que la acción sea irreversible. Si solo ve un «¿Aprobar?» pelado, recibe cientos al día o no puede sostener un «no», el bucle existe únicamente en el diagrama. Una prueba útil: pregúntale qué hizo el agente ayer y mide cuánto tarda la respuesta.",
    },
    {
      q: "¿La gobernanza de IA ralentiza el despliegue?",
      a: "Normalmente es al revés. Lo que ralentiza a las empresas es la pregunta sin responder sobre la responsabilidad, que reaparece en cada ampliación y mantiene a los agentes en piloto. Una vez fijados ámbito, límites, puntos de aprobación, registro y propiedad, cada agente nuevo hereda el patrón y sale antes que el anterior.",
    },
    {
      q: "¿Qué acciones del agente necesitan aprobación humana?",
      a: "Las irreversibles y las de consecuencia desproporcionada: dinero que sale de la empresa, mensajes a clientes, borrados, cambios en registros financieros o regulados, cualquier cosa por encima de un umbral que fijes a propósito. Todo lo reversible y de bajo impacto debería seguir siendo automático: poner barreras también ahí enseña a quien revisa a clicar sin mirar, y así es como dejan de funcionar las barreras de verdad.",
    },
    {
      q: "¿En qué se diferencia esto del control de acceso de siempre?",
      a: "Se apoya en él, no lo sustituye. La diferencia es que un agente actúa de forma continua, a velocidad de máquina, y sus propias entradas pueden convencerlo de hacer cosas — así que los permisos debe aplicarlos el sistema en lugar de pedirse en el prompt, y la pista de auditoría tiene que capturar la intención además de la acción. Los permisos por rol aquí son necesarios; simplemente no bastan por sí solos.",
    },
  ],

  cta: {
    eyebrow: "Vento Labs",
    title: "Construimos agentes que saben dónde parar",
    text: "Vento Labs construye agentes de IA sobre sistemas de gestión: permisos por rol, revisión del plan antes de cambiar nada y un audit log completo. Los responsables obtienen self-service seguro, los desarrolladores dejan de ahogarse en rutina y el núcleo del sistema queda intacto. El caso 1C Agent muestra cómo funciona por dentro.",
    primaryLabel: "Caso: 1C Agent",
    primaryHref: "/cases/erp-agent",
    secondaryLabel: "Todos los casos",
    secondaryHref: "/cases",
  },

  stubs: {},
};

export const accountabilityArticles: Partial<Record<Locale, Article>> = { en, ru, de, es };
