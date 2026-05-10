import { imagekitUrl } from "@/lib/images/imagekit";

function aboutImage(name) {
  const path = `images/about me/${name}`;
  return { path, src: imagekitUrl(path) };
}

function portfolioImage(name) {
  const path = `images/portraits/${name}`;
  return { path, src: imagekitUrl(path) };
}

export const aboutStory = {
  en: {
    heroNote:
      "i accidentally found out i cared about art way more seriously than i expected to, and it became my passion in life.",
    chapters: [
      {
        id: "started",
        label: "chapter 1",
        title: "how it started",
        layoutVariant: "origin",
        tilt: "-2deg",
        body: [
          "drawing was always around me in some form. even in kindergarten, i would ask classmates if they wanted me to draw them, then take the whole thing much more seriously than i probably needed to.",
          "one of the earliest moments i still remember clearly was a school assignment in grade 4: drawing a portrait of my mom.",
          "while most kids treated it like a normal classroom task, i became completely obsessed with getting it right. i redrew parts of it multiple times, got frustrated constantly, and probably put way too much emotional energy into a fourth grade portrait assignment.",
          "my mom is also an artist, so i admired her work a lot growing up. i think that portrait was the first time i realized how much i genuinely loved drawing people.",
          "even back then, art already felt natural, exciting, and sometimes frustrating enough to make me cry over details that barely mattered to anyone else.",
        ],
        images: [
          {
            id: "kindergarten",
            label: "kindergarten",
            caption: "an early memory of taking drawing very seriously.",
            alt: "kindergarten drawing memory",
            ...aboutImage("kindergarten"),
          },
          {
            id: "mom",
            label: "mom portrait assignment",
            caption: "the grade 4 portrait assignment that stayed with me.",
            alt: "portrait assignment of mom from childhood",
            ...aboutImage("mom"),
          },
        ],
      },
      {
        id: "digital",
        label: "chapter 2",
        title: "digital art",
        layoutVariant: "board",
        tilt: "1.5deg",
        noteCard: {
          label: "transition",
          body: [
            "i discovered digital art when i was around 8 years old, after getting my first ipad air. before i ever owned a stylus, i drew directly with my finger for years because i simply didn't have anything else.",
            "i started with random kids drawing apps before eventually moving to ibis paint, and later procreate. over the next few years, i became completely absorbed in experimenting with brushes, colors, rendering, and every new technique i came across online.",
            "a lot of my earlier digital paintings were honestly a mess. muddy shading, aggressive airbrush use, far too much smudge tool, and dramatic neon colors everywhere. i loved portraits from the beginning, but i also painted animals constantly -especially cats.",
            "i was heavily inspired by artists i found online, especially on instagram. i also went through a massive billie eilish phase, which probably explains some of the color palettes from that time.",
            "by the age of 11, i sold my first commission after searching for customers through reddit. someone commissioned me to paint their cat through a private pet-related subreddit, and i still keep the painting around today.",
            "it felt exciting, validating, and strangely serious - like art had suddenly turned into something more real than just a hobby.",
            "i also became heavily attached to social media validation during those years. i constantly checked notifications, compared myself to other artists online, and tied a lot of my self-worth to engagement and improvement.",
            "i eventually became curious about coding too, partly because of my boyfriend azeem, and partly because it started feeling similar to art in a way. frustrating, creative, technical, and satisfying once things finally worked.",
          ],
        },
        images: [
          {
            id: "doritos",
            label: "doritos era",
            caption: "messy, bright, and very experimental.",
            alt: "early digital painting named doritos",
            ...aboutImage("doritos"),
            boardClass: "about-board-item about-board-item--one",
          },
          {
            id: "apple",
            label: "apple study",
            caption: "learning form, color, and patience.",
            alt: "digital apple study",
            ...aboutImage("apple"),
            boardClass: "about-board-item about-board-item--two",
          },
          {
            id: "ket",
            label: "cat practice",
            caption: "because i was always painting cats.",
            alt: "early digital cat practice painting",
            ...aboutImage("ket"),
            boardClass: "about-board-item about-board-item--three",
          },
        ],
      },
      {
        id: "timeline",
        label: "chapter 3",
        title: "timeline of self interpretation",
        layoutVariant: "timeline",
        tilt: "-1deg",
        body: [
          "self portraits unintentionally became the easiest way to track change. not necessarily how i actually looked, but how i saw myself at the time.",
          "sometimes, it feels strange looking back at them. the mindset shift is insane.",
        ],
        note: {
          body: "every portrait here felt accurate at the time. i still find that difficult to comprehend somehow.",
        },
        timelineItems: [
          { year: "2015", age: "age 8", alt: "self portrait from 2015 age 8", ...aboutImage("y2015age8") },
          { year: "2020", age: "age 14", alt: "self portrait from 2020 age 14", ...aboutImage("y2020age14") },
          { year: "2021", age: "age 15", alt: "self portrait from 2021 age 15", ...aboutImage("y2021age15") },
          {
            year: "2023",
            age: "age 17",
            alt: "self portrait from 2023 age 17",
            sizeClass: "timeline-large-wide",
            ...aboutImage("y2023age17"),
          },
          { year: "2024", age: "age 18", alt: "self portrait from 2024 age 18", ...aboutImage("y2024age18") },
        ],
      },
      {
        id: "ups-downs",
        label: "chapter 4",
        title: "my ups and downs",
        layoutVariant: "comparison",
        tilt: "2deg",
        body: [
          "growing up as a self-taught artist on the internet made consistency difficult sometimes. there was always another artist to compare myself to, another style to try, another technique i thought would finally \"fix\" my work.",
          "i experimented constantly - digital painting, watercolor, oils, acrylics, gouache, clay, knitting, resin - mostly because i genuinely loved creating things, but also because i was always searching for improvement somewhere.",
          "for a long time, i thought stylization was something you had to intentionally invent. ironically, it only started appearing naturally after i stopped forcing it.",
          "accepting imperfections helped me improve more than perfectionism ever did.",
        ],
        comparisonItems: [
          { year: "2020", age: "age 14", alt: "self portrait from 2020", ...aboutImage("y2020") },
          { year: "2022", age: "age 16", alt: "self portrait from 2022", ...aboutImage("y2022") },
          { year: "2024", age: "age 18", alt: "self portrait from 2024", ...aboutImage("y2024") },
        ],
        notes: ['"figuring it out" usually meant repainting something four times'],
      },
      {
        id: "now",
        label: "chapter 5",
        title: "where i am now",
        layoutVariant: "current",
        tilt: "-1.5deg",
        body: [
          "this is the version of my art i understand the clearest so far. still chaotic, but more intentional and confident.",
          "i still experiment constantly. i just panic about it less now.",
          "i think i have a distinct style by now, but it's not something i developed by actively searching for it. it's something that's a result of long term experimentations and learning, research and practice, motivation and persistence. and i think my style will keep constantly growing with me.",
        ],
        image: {
          label: "current",
          alt: "most recent self portrait",
          ...portfolioImage("self"),
        },
      },
    ],
    ending: {
      title: "thanks for reading",
      body: "the story keeps going in my portfolio.",
      ctaArt: "full portfolio",
      ctaHome: "back home",
    },
  },
  ru: {
    heroNote:
      "я как-то случайно поняла, что отношусь к искусству намного серьезнее, чем ожидала, и в итоге это стало моей главной страстью.",
    chapters: [
      {
        id: "started",
        label: "глава 1",
        title: "как всё началось",
        layoutVariant: "origin",
        tilt: "-2deg",
        body: [
          "рисование всегда было где-то рядом. даже в садике я спрашивала одноклассников, хотят ли они, чтобы я их нарисовала, и относилась к этому куда серьёзнее, чем, наверное, стоило.",
          "один из самых ранних моментов, который я до сих пор хорошо помню, — школьное задание в 4 классе: портрет моей мамы.",
          "пока большинство детей воспринимали это как обычное задание, я буквально зациклилась на том, чтобы получилось идеально. перерисовывала куски по несколько раз, постоянно злилась и, кажется, вложила слишком много эмоций в портрет для четвёртого класса.",
          "моя мама тоже художница, и я очень восхищалась её работами, когда росла. думаю, именно этот портрет стал первым моментом, когда я поняла, как сильно люблю рисовать людей.",
          "даже тогда искусство уже ощущалось естественным, захватывающим и иногда настолько выматывающим, что я могла расплакаться из-за деталей, которые никому особо не были важны.",
        ],
        images: [
          {
            id: "kindergarten",
            label: "садик",
            caption: "самое раннее воспоминание о том, как я отношусь к рисованию.",
            alt: "детский рисунок из садика",
            ...aboutImage("kindergarten"),
          },
          {
            id: "mom",
            label: "портрет мамы",
            caption: "то самое школьное задание из 4 класса.",
            alt: "детский портрет мамы",
            ...aboutImage("mom"),
          },
        ],
      },
      {
        id: "digital",
        label: "глава 2",
        title: "цифровое искусство",
        layoutVariant: "board",
        tilt: "1.5deg",
        noteCard: {
          label: "переход",
          body: [
            "с цифровым рисованием я познакомилась примерно в 8 лет, когда получила свой первый ipad air. до стилуса я ещё долго рисовала просто пальцем — потому что другого варианта у меня не было.",
            "начала со случайных детских приложений для рисования, потом перешла в ibis paint, а позже в procreate. в следующие годы я буквально утонула в экспериментах с кистями, цветами, рендером и всем новым, что находила в интернете.",
            "многие мои ранние цифровые работы были, честно, полным хаосом: грязные тени, агрессивный аэрограф, слишком много размытия и неон везде. портреты я полюбила с самого начала, но животных тоже рисовала постоянно — особенно котов.",
            "на меня сильно влияли художники из соцсетей, особенно из instagram. ещё у меня была огромная фаза billie eilish, что, наверное, многое объясняет в палитрах того периода.",
            "в 11 лет я продала свой первый заказ, когда искала клиентов через reddit. кто-то заказал у меня портрет кота через закрытый сабреддит про домашних животных, и я до сих пор храню эту работу.",
            "это ощущалось одновременно волнительно, очень поддерживающе и как-то по-взрослому — будто искусство вдруг стало чем-то более реальным, чем просто хобби.",
            "в те годы я ещё сильно зависела от одобрения в соцсетях: постоянно проверяла уведомления, сравнивала себя с другими художниками и завязывала самооценку на охватах и прогрессе.",
            "потом мне стало интересно и программирование — отчасти из-за моего парня азима, отчасти потому что оно в каком-то смысле похоже на искусство: бесит, требует креатива и техники, но очень радует, когда наконец всё работает.",
          ],
        },
        images: [
          {
            id: "doritos",
            label: "doritos-период",
            caption: "ярко, шумно и максимально экспериментально.",
            alt: "ранняя цифровая работа doritos",
            ...aboutImage("doritos"),
            boardClass: "about-board-item about-board-item--one",
          },
          {
            id: "apple",
            label: "этюд яблока",
            caption: "про форму, цвет и терпение.",
            alt: "цифровой этюд яблока",
            ...aboutImage("apple"),
            boardClass: "about-board-item about-board-item--two",
          },
          {
            id: "ket",
            label: "котопрактика",
            caption: "потому что котов я рисовала постоянно.",
            alt: "ранняя цифровая работа с котом",
            ...aboutImage("ket"),
            boardClass: "about-board-item about-board-item--three",
          },
        ],
      },
      {
        id: "timeline",
        label: "глава 3",
        title: "хронология самовосприятия",
        layoutVariant: "timeline",
        tilt: "-1deg",
        body: [
          "автопортреты неожиданно стали самым простым способом отслеживать изменения. не столько то, как я реально выглядела, сколько то, как я видела себя в тот момент.",
          "иногда странно смотреть на них спустя время. сдвиг в мышлении — просто огромный.",
        ],
        note: {
          body: "каждый портрет здесь в тот момент казался мне абсолютно точным. и это до сих пор трудно осознать.",
        },
        timelineItems: [
          { year: "2015", age: "8 лет", alt: "автопортрет 2015 года в 8 лет", ...aboutImage("y2015age8") },
          { year: "2020", age: "14 лет", alt: "автопортрет 2020 года в 14 лет", ...aboutImage("y2020age14") },
          { year: "2021", age: "15 лет", alt: "автопортрет 2021 года в 15 лет", ...aboutImage("y2021age15") },
          {
            year: "2023",
            age: "17 лет",
            alt: "автопортрет 2023 года в 17 лет",
            sizeClass: "timeline-large-wide",
            ...aboutImage("y2023age17"),
          },
          { year: "2024", age: "18 лет", alt: "автопортрет 2024 года в 18 лет", ...aboutImage("y2024age18") },
        ],
      },
      {
        id: "ups-downs",
        label: "глава 4",
        title: "мои взлёты и спады",
        layoutVariant: "comparison",
        tilt: "2deg",
        body: [
          "взрослеть как художница-самоучка в интернете — это не всегда про стабильность. всегда находился кто-то, с кем сравнить себя, новый стиль, который хотелось попробовать, и техника, которая \"точно должна была исправить\" мои работы.",
          "я постоянно экспериментировала: цифровая живопись, акварель, масло, акрил, гуашь, глина, вязание, эпоксидная смола — в основном потому что мне правда нравится создавать вещи, но ещё и потому что я всё время искала, где можно вырасти.",
          "долгое время мне казалось, что стилизацию нужно специально придумывать. иронично, но она начала появляться сама только тогда, когда я перестала её насильно выжимать.",
          "принятие несовершенств помогло мне вырасти куда сильнее, чем перфекционизм.",
        ],
        comparisonItems: [
          { year: "2020", age: "14 лет", alt: "автопортрет 2020", ...aboutImage("y2020") },
          { year: "2022", age: "16 лет", alt: "автопортрет 2022", ...aboutImage("y2022") },
          { year: "2024", age: "18 лет", alt: "автопортрет 2024", ...aboutImage("y2024") },
        ],
        notes: ['"разобраться" обычно означало перерисовать одну и ту же работу четыре раза'],
      },
      {
        id: "now",
        label: "глава 5",
        title: "где я сейчас",
        layoutVariant: "current",
        tilt: "-1.5deg",
        body: [
          "это версия моего искусства, которую я пока понимаю яснее всего. всё ещё хаотично, но уже более осознанно и уверенно.",
          "я всё ещё постоянно экспериментирую. просто паникую из-за этого заметно меньше.",
          "мне кажется, у меня уже есть узнаваемый стиль, но я не искала его специально. он вырос из долгих экспериментов и обучения, исследований и практики, мотивации и настойчивости. и мне нравится мысль, что он будет дальше меняться вместе со мной.",
        ],
        image: {
          label: "сейчас",
          alt: "самый недавний автопортрет",
          ...portfolioImage("self"),
        },
      },
    ],
    ending: {
      title: "спасибо за внимание",
      body: "история продолжается в моих работах.",
      ctaArt: "полное портфолио",
      ctaHome: "на главную",
    },
  },
};
