import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { ImageFrame } from "@/components/ui/image-frame";
import { SmartImage } from "@/components/ui/smart-image";
import { getArtworkById } from "@/lib/content/artworks";
import { pickLocale } from "@/lib/i18n/config";

const FALLBACK_IMAGE_ID = "portrait-01";

const ABOUT_STORY = {
  en: {
    intro: {
      label: "opening note",
      chips: ["20 years old", "commissions open", "still learning on purpose"],
      summary:
        "this page is the slower version of my story: how i started, how digital art changed things, how self portraits became a way of measuring time, and how the current work came out of persistence more than talent mythology.",
    },
    chapters: [
      {
        id: "started",
        eyebrow: "chapter 1",
        title: "how it started",
        layoutType: "origin",
        side: "right",
        paragraphs: [
          "it started in the ordinary way: paper, pencils, and the kind of drawings kids make because they cannot help it. i was not magically good. i was just very willing to keep trying.",
          "what i love about the beginning is that it was sincere. the early work was messy, stubborn, and full of effort, which feels more useful to me now than pretending the story began already polished.",
        ],
        image: {
          id: "portrait-04",
          label: "first evidence",
          caption:
            "placeholder for the kindergarten drawing folder and the earliest sketchbook pages that still feel important.",
        },
      },
      {
        id: "digital",
        eyebrow: "chapter 2",
        title: "digital art",
        layoutType: "evidence-board",
        side: "left",
        paragraphs: [
          "moving into digital art did not suddenly make the work better. it made experimentation easier. i could make mistakes faster, repaint things, test color more boldly, and slowly figure out what kind of image actually felt like mine.",
          "those early digital pieces are important because they look like practice. they look like someone building the muscles in real time.",
        ],
        images: [
          {
            id: "portrait-05",
            label: "first digital face",
            caption: "trying to paint carefully without freezing the whole image.",
          },
          {
            id: "landscape-04",
            label: "first skies",
            caption: "realising atmosphere also has structure and weight.",
          },
          {
            id: "still-02",
            label: "first still life",
            caption: "the point where ordinary objects started holding mood.",
          },
        ],
      },
      {
        id: "timeline",
        eyebrow: "chapter 3",
        title: "how i see myself: timeline",
        layoutType: "portrait-timeline",
        side: "right",
        intro:
          "self portraits became the clearest record of change. they show what i was learning, what i was hiding, and what i could finally look at directly.",
        portraits: [
          {
            id: "portrait-04",
            year: "2018",
            era: "age 12",
            note: "the first version of me i remember trying to study on purpose.",
          },
          {
            id: "portrait-05",
            year: "2020",
            era: "age 14",
            note: "still awkward, but starting to understand that a face can carry mood.",
          },
          {
            id: "portrait-03",
            year: "2022",
            era: "age 16",
            note: "the point where repetition started turning into a language.",
          },
          {
            id: "portrait-02",
            year: "2024",
            era: "age 18",
            note: "less interested in pretty, more interested in truthful.",
          },
          {
            id: "portrait-01",
            year: "2026",
            era: "age 20",
            note: "current me, still unfinished, but finally standing still long enough to be seen.",
          },
        ],
        compareTitle: "then vs now",
        compareBody:
          "the face changes a little. the bigger shift is confidence: less hiding behind style, more intention inside it.",
      },
      {
        id: "ups-downs",
        eyebrow: "chapter 4",
        title: "my ups and downs",
        layoutType: "reflection",
        side: "left",
        paragraphs: [
          "none of this happened in a straight line. there were awkward stretches, style changes, long pauses, and periods where i felt unsure of everything i was making.",
          "i do not read those years as failure anymore. they are part of the work's shape. learning how to come back after frustration is also part of learning how to make art at all.",
        ],
        aside:
          "i am much better now at surviving a bad phase without treating it like proof that i should stop.",
        image: {
          id: "portrait-03",
          label: "one of the in-between years",
          caption:
            "some work came out warm and certain. some came out uncertain. both still count as growth.",
        },
      },
      {
        id: "now",
        eyebrow: "chapter 5",
        title: "where i am now",
        layoutType: "arrival",
        side: "right",
        paragraphs: [
          "i'm 20. i make portraits, animals, landscapes, and still life, and i finally feel like those interests belong to one practice instead of pulling me in different directions.",
          "commissions are open, personal work still matters a lot to me, and outside art i am usually collecting references, walking, listening, or quietly storing ideas for later.",
          "the work is moving toward more confidence without losing softness. i want it to stay careful, personal, and a little curious.",
        ],
        facts: [
          "portraits, animals, landscapes, still life",
          "commissions open",
          "still building the next version of the work",
        ],
        image: {
          id: "portrait-01",
          label: "current self portrait",
          caption: "not a final version of me. just the most current honest one.",
        },
      },
    ],
    ending: {
      title: "thanks for reading.",
      body: "the story keeps going. the present tense lives in the work itself.",
      ctaArt: "see my work in the present",
      ctaHome: "back home",
    },
  },
  ru: {
    intro: {
      label: "начало истории",
      chips: ["20 лет", "заказы открыты", "я учусь намеренно"],
      summary:
        "эта страница — более медленная версия моей истории: как всё началось, что изменилось с переходом в цифру, как автопортреты стали способом замечать время и как нынешняя работа выросла скорее из упорства, чем из мифа о врождённом таланте.",
    },
    chapters: [
      {
        id: "started",
        eyebrow: "глава 1",
        title: "как всё началось",
        layoutType: "origin",
        side: "right",
        paragraphs: [
          "всё началось самым обычным способом: бумага, карандаши и рисунки, которые дети делают просто потому, что не могут не рисовать. я не была магически хороша. я просто очень охотно пробовала снова.",
          "мне нравится в начале именно его искренность. ранние работы были неровными, упрямыми и полными усилия — и сейчас это кажется мне полезнее, чем делать вид, будто история началась уже с хорошего уровня.",
        ],
        image: {
          id: "portrait-04",
          label: "первое доказательство",
          caption:
            "плейсхолдер для папки рисунков из детского сада и самых ранних страниц скетчбука, которые до сих пор кажутся важными.",
        },
      },
      {
        id: "digital",
        eyebrow: "глава 2",
        title: "цифровое искусство",
        layoutType: "evidence-board",
        side: "left",
        paragraphs: [
          "переход в цифру не сделал работу автоматически лучше. он сделал эксперимент проще. я смогла быстрее ошибаться, переписывать куски, смелее проверять цвет и постепенно понимать, какой образ вообще ощущается моим.",
          "эти ранние цифровые работы важны именно потому, что в них видно практику. в них видно, как человек наращивает мышцы прямо на глазах.",
        ],
        images: [
          {
            id: "portrait-05",
            label: "первое цифровое лицо",
            caption: "попытка писать внимательно и при этом не замораживать всю работу.",
          },
          {
            id: "landscape-04",
            label: "первые небеса",
            caption: "момент, когда я поняла, что атмосфера тоже имеет форму и вес.",
          },
          {
            id: "still-02",
            label: "первый натюрморт",
            caption: "момент, когда обычные предметы начали держать настроение.",
          },
        ],
      },
      {
        id: "timeline",
        eyebrow: "глава 3",
        title: "как я вижу себя: таймлайн",
        layoutType: "portrait-timeline",
        side: "right",
        intro:
          "автопортреты стали самым ясным следом изменений. в них видно, чему я училась, что прятала и на что наконец смогла смотреть прямо.",
        portraits: [
          {
            id: "portrait-04",
            year: "2018",
            era: "12 лет",
            note: "самая ранняя версия меня, которую я помню как попытку смотреть на себя всерьёз.",
          },
          {
            id: "portrait-05",
            year: "2020",
            era: "14 лет",
            note: "ещё неловко, но уже видно, что лицо может держать настроение.",
          },
          {
            id: "portrait-03",
            year: "2022",
            era: "16 лет",
            note: "момент, когда повторение начало превращаться в язык.",
          },
          {
            id: "portrait-02",
            year: "2024",
            era: "18 лет",
            note: "меньше интереса к просто красивому, больше — к правдивому.",
          },
          {
            id: "portrait-01",
            year: "2026",
            era: "20 лет",
            note: "текущая я, всё ещё незавершённая, но уже достаточно спокойная, чтобы быть увиденной.",
          },
        ],
        compareTitle: "тогда и сейчас",
        compareBody:
          "лицо меняется понемногу. главная разница — уверенность: меньше прятаться за стилем, больше намерения внутри него.",
      },
      {
        id: "ups-downs",
        eyebrow: "глава 4",
        title: "мои взлёты и спады",
        layoutType: "reflection",
        side: "left",
        paragraphs: [
          "ничего из этого не происходило по прямой. были неуклюжие периоды, смены стиля, долгие паузы и отрезки, когда я сомневалась почти во всём, что делаю.",
          "сейчас я больше не читаю эти годы как провал. они тоже придали работе форму. умение вернуться после раздражения — это тоже часть умения вообще делать искусство.",
        ],
        aside:
          "сейчас я намного лучше умею проживать плохой этап, не принимая его за знак, что надо остановиться насовсем.",
        image: {
          id: "portrait-03",
          label: "один из промежуточных лет",
          caption:
            "какие-то работы выходили тёплыми и уверенными. какие-то — неуверенными. обе версии всё равно важны.",
        },
      },
      {
        id: "now",
        eyebrow: "глава 5",
        title: "где я сейчас",
        layoutType: "arrival",
        side: "right",
        paragraphs: [
          "мне 20. я делаю портреты, животных, пейзажи и натюрморты, и наконец чувствую, что эти интересы принадлежат одной практике, а не тянут меня в разные стороны.",
          "заказы открыты, личная работа для меня всё ещё очень важна, а вне искусства я чаще всего собираю референсы, гуляю, слушаю что-то или тихо откладываю идеи на потом.",
          "дальше работа движется к большей уверенности без потери мягкости. мне хочется, чтобы она оставалась внимательной, личной и немного любопытной.",
        ],
        facts: [
          "портреты, животные, пейзажи, натюрморты",
          "заказы открыты",
          "я всё ещё строю следующую версию этой работы",
        ],
        image: {
          id: "portrait-01",
          label: "текущий автопортрет",
          caption: "не финальная версия меня. просто самая честная на сейчас.",
        },
      },
    ],
    ending: {
      title: "спасибо, что прочитали.",
      body: "история продолжается. настоящее время уже живёт в самих работах.",
      ctaArt: "смотреть нынешние работы",
      ctaHome: "на главную",
    },
  },
};

function artworkImage(id) {
  return getArtworkById(id) ?? getArtworkById(FALLBACK_IMAGE_ID);
}

function imageAspect(artwork) {
  if (!artwork) return undefined;
  return { aspectRatio: `${artwork.width ?? 4} / ${artwork.height ?? 5}` };
}

function StoryChip({ children }) {
  return (
    <span className="tilt-chip inline-flex items-center rounded-[10px] border border-dashed border-border-accent bg-highlight-soft px-3 py-1 text-[0.72rem] font-medium text-highlight shadow-sm">
      {children}
    </span>
  );
}

function StoryArtwork({
  imageId,
  locale,
  alt,
  sizes,
  className = "",
  variant = "art",
  imgClassName = "object-contain p-3 md:p-4",
}) {
  const art = artworkImage(imageId);
  return (
    <ImageFrame
      variant={variant}
      className={`relative w-full ${className}`.trim()}
      style={imageAspect(art)}
    >
      <SmartImage
        src={art.imageSrc}
        alt={alt || pickLocale(art.alt, locale)}
        fill
        sizes={sizes}
        imgClassName={imgClassName}
      />
    </ImageFrame>
  );
}

function ChapterLabel({ children }) {
  return (
    <div className="about-chapter-label">
      <StoryChip>{children}</StoryChip>
    </div>
  );
}

function ChapterDivider() {
  return (
    <div className="about-chapter-divider" aria-hidden>
      <span />
      <span />
      <span />
    </div>
  );
}

function IntroLead({ t, intro }) {
  return (
    <section className="about-opening about-spread">
      <div className="about-opening-layout">
        <div className="about-opening-copy">
          <ChapterLabel>{intro.label}</ChapterLabel>
          <Eyebrow>{t.pageEyebrow}</Eyebrow>
          <Heading level="h1" className="max-w-3xl">
            {t.pageTitle}
          </Heading>
          <div className="about-underline" aria-hidden />
          <p className="body-lg max-w-2xl">{t.pageDescription}</p>
        </div>
        <aside className="about-intro-note">
          <div className="about-intro-tags">
            {intro.chips.map((chip) => (
              <StoryChip key={chip}>{chip}</StoryChip>
            ))}
          </div>
          <p className="body-sm text-text-primary">{intro.summary}</p>
        </aside>
      </div>
    </section>
  );
}

function OriginChapter({ chapter, locale }) {
  return (
    <article className="about-spread about-spread--origin">
      <div className="about-origin-layout">
        <div className="about-copy-block">
          <ChapterLabel>{chapter.eyebrow}</ChapterLabel>
          <Heading level="h2" className="max-w-xl">
            {chapter.title}
          </Heading>
          <div className="about-underline" aria-hidden />
          {chapter.paragraphs.map((paragraph) => (
            <p key={paragraph} className="body">
              {paragraph}
            </p>
          ))}
        </div>
        <figure className="about-evidence about-origin-proof">
          <StoryArtwork
            imageId={chapter.image.id}
            locale={locale}
            alt={chapter.image.caption}
            sizes="(max-width: 768px) 74vw, 220px"
            className="md:rotate-[-0.22deg]"
          />
          <figcaption className="about-caption about-caption--attached">
            <p className="caption text-highlight">{chapter.image.label}</p>
            <p className="body-sm text-text-primary">{chapter.image.caption}</p>
          </figcaption>
        </figure>
      </div>
    </article>
  );
}

function DigitalBoardChapter({ chapter, locale }) {
  return (
    <article className="about-spread about-spread--board">
      <div className="about-board-layout">
        <div className="about-board-copy">
          <ChapterLabel>{chapter.eyebrow}</ChapterLabel>
          <Heading level="h2" className="max-w-xl">
            {chapter.title}
          </Heading>
          <div className="about-underline" aria-hidden />
          <div className="about-board-paragraphs">
            {chapter.paragraphs.map((paragraph) => (
              <p key={paragraph} className="body">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="about-memory-board">
          <div className="about-memory-grid">
            {chapter.images.map((item, index) => (
              <figure
                key={item.id}
                className={`about-evidence about-evidence--digital about-evidence--pin-${index + 1}`}
              >
                <StoryArtwork
                  imageId={item.id}
                  locale={locale}
                  alt={item.caption}
                  sizes={
                    index === 2
                      ? "(max-width: 640px) 100vw, 48vw"
                      : "(max-width: 640px) 100vw, 24vw"
                  }
                  className={
                    index === 0
                      ? "md:rotate-[-0.18deg]"
                      : index === 1
                        ? "md:rotate-[0.22deg]"
                        : "md:rotate-[-0.35deg]"
                  }
                />
                <figcaption className="about-caption about-caption--attached">
                  <p className="caption text-highlight">{item.label}</p>
                  <p className="body-sm">{item.caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function PortraitTimelineChapter({ chapter, locale }) {
  return (
    <article className="about-spread about-spread--timeline">
      <div className="about-copy-block about-copy-block--wide">
        <ChapterLabel>{chapter.eyebrow}</ChapterLabel>
        <Heading level="h2" className="max-w-lg">
          {chapter.title}
        </Heading>
        <div className="about-underline" aria-hidden />
        <p className="body max-w-3xl">{chapter.intro}</p>
      </div>

      <div className="about-portrait-artifact about-timeline-artifact">
        <div className="about-timeline-track" aria-hidden>
          {chapter.portraits.map((portrait) => (
            <span key={portrait.year} className="about-timeline-node" />
          ))}
        </div>

        <div className="about-timeline-grid">
          {chapter.portraits.map((portrait, index) => (
            <figure
              key={portrait.year}
              className={`about-timeline-item ${
                index % 2 === 0
                  ? "about-timeline-item--bottom"
                  : "about-timeline-item--top"
              }`}
              style={{ gridColumn: index + 1 }}
            >
              <div className="about-portrait-year">
                <StoryChip>{portrait.year}</StoryChip>
                <span className="caption">{portrait.era}</span>
              </div>
              <StoryArtwork
                imageId={portrait.id}
                locale={locale}
                alt={portrait.note}
                sizes="(max-width: 768px) 100vw, 18vw"
                className={
                  index === 1
                    ? "md:rotate-[0.15deg]"
                    : index === 2
                      ? "md:rotate-[-0.18deg]"
                      : index === 3
                        ? "md:rotate-[0.12deg]"
                        : "md:rotate-[0.08deg]"
                }
              />
              <figcaption className="about-caption about-caption--timeline">
                <p className="body-sm text-text-primary">{portrait.note}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="about-compare-note">
          <p className="caption text-highlight">{chapter.compareTitle}</p>
          <p className="body-sm mt-2 text-text-primary">
            {chapter.compareBody}
          </p>
        </div>
      </div>
    </article>
  );
}

function ReflectionChapter({ chapter, locale }) {
  return (
    <article className="about-spread about-spread--reflection">
      <div className="about-reflection-layout">
        <div className="about-reflection-copy">
          <ChapterLabel>{chapter.eyebrow}</ChapterLabel>
          <Heading level="h2" className="max-w-xl">
            {chapter.title}
          </Heading>
          <div className="about-underline" aria-hidden />
          {chapter.paragraphs.map((paragraph) => (
            <p key={paragraph} className="body">
              {paragraph}
            </p>
          ))}
          <div className="about-side-note max-w-xl">
            <p className="body-sm text-text-primary">{chapter.aside}</p>
          </div>
        </div>

        <figure className="about-evidence about-reflection-proof">
          <StoryArtwork
            imageId={chapter.image.id}
            locale={locale}
            alt={chapter.image.caption}
            sizes="(max-width: 1024px) 72vw, 260px"
            className="md:rotate-[0.18deg]"
          />
          <figcaption className="about-caption about-caption--attached">
            <p className="caption text-highlight">{chapter.image.label}</p>
            <p className="body-sm mt-2">{chapter.image.caption}</p>
          </figcaption>
        </figure>
      </div>
    </article>
  );
}

function ArrivalChapter({ chapter, locale }) {
  return (
    <article className="about-spread about-spread--arrival">
      <div className="about-arrival-layout">
        <div className="about-arrival-copy">
          <ChapterLabel>{chapter.eyebrow}</ChapterLabel>
          <Heading level="h2" className="max-w-xl">
            {chapter.title}
          </Heading>
          <div className="about-underline" aria-hidden />
          {chapter.paragraphs.map((paragraph) => (
            <p key={paragraph} className="body">
              {paragraph}
            </p>
          ))}

          <ul className="about-fact-list">
            {chapter.facts.map((fact) => (
              <li key={fact} className="about-fact">
                <p className="body-sm text-text-primary">{fact}</p>
              </li>
            ))}
          </ul>
        </div>

        <figure className="about-evidence about-evidence--current">
          <StoryArtwork
            imageId={chapter.image.id}
            locale={locale}
            alt={chapter.image.caption}
            sizes="(max-width: 1280px) 85vw, 320px"
            variant="featured"
            className="md:rotate-[-0.2deg]"
            imgClassName="object-contain p-3 md:p-5"
          />
          <figcaption className="about-caption about-caption--arrival">
            <p className="caption text-highlight">{chapter.image.label}</p>
            <p className="body-sm mt-2">{chapter.image.caption}</p>
          </figcaption>
        </figure>
      </div>
    </article>
  );
}

function AboutEnding({ ending, locale }) {
  return (
    <section className="about-ending">
      <Heading level="h2">{ending.title}</Heading>
      <p className="body-lg">{ending.body}</p>
      <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
        <Button
          as="link"
          href={`/${locale}/portfolio`}
          variant="primary"
          size="md"
        >
          {ending.ctaArt}
        </Button>
        <Button as="link" href={`/${locale}`} variant="outline" size="md">
          {ending.ctaHome}
        </Button>
      </div>
    </section>
  );
}

function renderChapter(chapter, locale) {
  switch (chapter.layoutType) {
    case "origin":
      return <OriginChapter chapter={chapter} locale={locale} />;
    case "evidence-board":
      return <DigitalBoardChapter chapter={chapter} locale={locale} />;
    case "portrait-timeline":
      return <PortraitTimelineChapter chapter={chapter} locale={locale} />;
    case "reflection":
      return <ReflectionChapter chapter={chapter} locale={locale} />;
    case "arrival":
      return <ArrivalChapter chapter={chapter} locale={locale} />;
    default:
      return null;
  }
}

export function AboutPage({ dict, locale = "en" }) {
  const t = dict.about;
  const story = ABOUT_STORY[locale] ?? ABOUT_STORY.en;

  return (
    <section id="about" className="section-scrap">
      <Container className="py-12 md:py-14" style={{ maxWidth: "1240px" }}>
        <div className="about-story-spreads">
          <IntroLead t={t} intro={story.intro} />

          {story.chapters.map((chapter, index) => (
            <div key={chapter.id}>
              {index > 0 ? <ChapterDivider /> : null}
              {renderChapter(chapter, locale)}
            </div>
          ))}

          <ChapterDivider />
          <AboutEnding ending={story.ending} locale={locale} />
        </div>
      </Container>
    </section>
  );
}
