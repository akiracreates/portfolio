import { Fragment } from "react";

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
    hero: {
      label: "opening note",
      note: {
        title: "longer version",
        body:
          "placeholder note for the slower story. this can become a short personal aside later.",
      },
    },
    chapters: [
      {
        id: "started",
        label: "chapter 1",
        title: "how it started",
        layoutVariant: "origin",
        tilt: "-2deg",
        body: [
          "it started with paper, pencils, and the kind of drawings that happen before anyone calls them serious.",
          "this part should stay small, a little funny, and easy to replace later.",
        ],
        note: {
          body: "tiny origin artifact: the first attempt still matters.",
        },
        image: {
          id: "portrait-04",
          label: "early evidence",
          caption: "placeholder for the earliest sketchbook page or drawing.",
          alt: "early drawing placeholder",
        },
      },
      {
        id: "digital",
        label: "chapter 2",
        title: "digital art",
        layoutVariant: "board",
        tilt: "1.5deg",
        body: [
          "moving into digital art made experiments easier, not cleaner. i could repaint, compare, and notice what actually felt like mine.",
          "these pieces should read like practice and proof, not polished milestones.",
        ],
        images: [
          {
            id: "portrait-05",
            label: "early face study",
            caption: "placeholder note about learning to paint slowly.",
            alt: "early digital portrait placeholder",
            boardClass: "about-board-item about-board-item--one",
          },
          {
            id: "landscape-04",
            label: "color test",
            caption: "placeholder note about skies and atmosphere.",
            alt: "early landscape study placeholder",
            boardClass: "about-board-item about-board-item--two",
          },
          {
            id: "still-02",
            label: "ordinary objects",
            caption: "placeholder note about mood showing up in simple things.",
            alt: "early still life placeholder",
            boardClass: "about-board-item about-board-item--three",
          },
        ],
      },
      {
        id: "timeline",
        label: "chapter 3",
        title: "how i see myself: timeline",
        layoutVariant: "timeline",
        tilt: "-1deg",
        body: [
          "self portraits became the cleanest way to track change. the face stayed familiar, but the way i looked at it kept shifting.",
        ],
        note: {
          body:
            "the timeline is the record. it should stay compact, reflective, and easy to update later.",
        },
        timelineItems: [
          {
            id: "portrait-04",
            year: "2018",
            age: "age 12",
            alt: "self portrait from 2018 placeholder",
          },
          {
            id: "portrait-05",
            year: "2020",
            age: "age 14",
            alt: "self portrait from 2020 placeholder",
          },
          {
            id: "portrait-03",
            year: "2022",
            age: "age 16",
            alt: "self portrait from 2022 placeholder",
          },
          {
            id: "portrait-02",
            year: "2024",
            age: "age 18",
            alt: "self portrait from 2024 placeholder",
          },
          {
            id: "portrait-01",
            year: "2026",
            age: "age 20",
            alt: "current self portrait placeholder",
          },
        ],
      },
      {
        id: "ups-downs",
        label: "chapter 4",
        title: "my ups and downs",
        layoutVariant: "comparison",
        tilt: "2deg",
        body: [
          "growth was not a straight line. some years felt sharp and certain, some felt quieter and harder to read.",
          "this chapter should hold the messy middle without turning it into a dramatic speech.",
          "some stretches looked clear from the outside and confusing from the inside. some felt productive, some felt stalled, and most of them were probably both at once.",
          "the comparison below is here to show change directly: what became more intentional, what stayed familiar, and what kept moving even when the process felt uneven.",
        ],
        comparisonItems: [
          {
            id: "portrait-04",
            year: "2018",
            age: "age 12",
            alt: "earlier self portrait placeholder",
          },
          {
            id: "portrait-03",
            year: "2022",
            age: "age 16",
            alt: "middle self portrait placeholder",
          },
          {
            id: "portrait-01",
            year: "2026",
            age: "age 20",
            alt: "recent self portrait placeholder",
          },
        ],
        notes: ["some changes were technical.", "some were emotional."],
      },
      {
        id: "now",
        label: "chapter 5",
        title: "where i am now",
        layoutVariant: "current",
        tilt: "-1.5deg",
        body: [
          "this is the current version: more deliberate, more patient, and still open to change.",
          "this section will later hold the real present-tense text about what i make now, what i care about, and where the work is going next.",
          "for now, it should feel settled without feeling finished. the work is clearer, the process is steadier, and there is still room for the next version to appear slowly.",
          "the story lands here for the moment, then continues forward into the portfolio itself.",
        ],
        image: {
          id: "portrait-01",
          label: "current",
          caption: "most recent self portrait placeholder.",
          alt: "current self portrait placeholder",
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
    hero: {
      label: "начальная заметка",
      note: {
        title: "длинная версия",
        body:
          "плейсхолдер для более медленной истории. позже сюда можно вставить короткую личную ремарку.",
      },
    },
    chapters: [
      {
        id: "started",
        label: "глава 1",
        title: "как всё началось",
        layoutVariant: "origin",
        tilt: "-2deg",
        body: [
          "всё началось с бумаги, карандашей и рисунков, которые появляются раньше, чем кто-то называет их серьёзными.",
          "эта часть должна оставаться маленькой, чуть смешной и легко заменяемой позже.",
        ],
        note: {
          body: "маленький артефакт начала: первая попытка всё ещё важна.",
        },
        image: {
          id: "portrait-04",
          label: "раннее доказательство",
          caption: "плейсхолдер для самой ранней страницы скетчбука или рисунка.",
          alt: "плейсхолдер раннего рисунка",
        },
      },
      {
        id: "digital",
        label: "глава 2",
        title: "цифровое искусство",
        layoutVariant: "board",
        tilt: "1.5deg",
        body: [
          "переход в цифру сделал эксперименты проще, а не чище. я могла переписывать, сравнивать и замечать, что вообще ощущается моим.",
          "эти работы должны читаться как практика и доказательство, а не как отполированные вехи.",
        ],
        images: [
          {
            id: "portrait-05",
            label: "ранний этюд лица",
            caption: "плейсхолдер заметки о медленном освоении живописи.",
            alt: "плейсхолдер раннего цифрового портрета",
            boardClass: "about-board-item about-board-item--one",
          },
          {
            id: "landscape-04",
            label: "цветовой тест",
            caption: "плейсхолдер заметки о небе и атмосфере.",
            alt: "плейсхолдер раннего пейзажного этюда",
            boardClass: "about-board-item about-board-item--two",
          },
          {
            id: "still-02",
            label: "обычные предметы",
            caption: "плейсхолдер заметки о том, как настроение появилось в простых вещах.",
            alt: "плейсхолдер раннего натюрморта",
            boardClass: "about-board-item about-board-item--three",
          },
        ],
      },
      {
        id: "timeline",
        label: "глава 3",
        title: "как я вижу себя: таймлайн",
        layoutVariant: "timeline",
        tilt: "-1deg",
        body: [
          "автопортреты стали самым понятным способом замечать перемены. лицо оставалось знакомым, а взгляд на него всё время менялся.",
        ],
        note: {
          body:
            "таймлайн остаётся записью. он должен быть компактным, рефлексивным и удобным для замены позже.",
        },
        timelineItems: [
          {
            id: "portrait-04",
            year: "2018",
            age: "12 лет",
            alt: "плейсхолдер автопортрета 2018 года",
          },
          {
            id: "portrait-05",
            year: "2020",
            age: "14 лет",
            alt: "плейсхолдер автопортрета 2020 года",
          },
          {
            id: "portrait-03",
            year: "2022",
            age: "16 лет",
            alt: "плейсхолдер автопортрета 2022 года",
          },
          {
            id: "portrait-02",
            year: "2024",
            age: "18 лет",
            alt: "плейсхолдер автопортрета 2024 года",
          },
          {
            id: "portrait-01",
            year: "2026",
            age: "20 лет",
            alt: "плейсхолдер текущего автопортрета",
          },
        ],
      },
      {
        id: "ups-downs",
        label: "глава 4",
        title: "мои взлёты и спады",
        layoutVariant: "comparison",
        tilt: "2deg",
        body: [
          "рост не шёл по прямой. одни годы были резкими и уверенными, другие казались тише и сложнее для чтения.",
          "эта глава должна держать сложную середину без превращения в драматическую речь.",
          "какие-то отрезки выглядели ясными снаружи и запутанными изнутри. какие-то казались продуктивными, какие-то застойными, и чаще всего это было сразу и то и другое.",
          "сравнение ниже нужно, чтобы показать перемены напрямую: что стало более намеренным, что осталось знакомым и что продолжало двигаться, даже когда сам процесс ощущался неровным.",
        ],
        comparisonItems: [
          {
            id: "portrait-04",
            year: "2018",
            age: "12 лет",
            alt: "плейсхолдер раннего автопортрета",
          },
          {
            id: "portrait-03",
            year: "2022",
            age: "16 лет",
            alt: "плейсхолдер среднего автопортрета",
          },
          {
            id: "portrait-01",
            year: "2026",
            age: "20 лет",
            alt: "плейсхолдер недавнего автопортрета",
          },
        ],
        notes: ["какие-то перемены были техническими.", "какие-то были эмоциональными."],
      },
      {
        id: "now",
        label: "глава 5",
        title: "где я сейчас",
        layoutVariant: "current",
        tilt: "-1.5deg",
        body: [
          "это текущая версия: более намеренная, более терпеливая и всё ещё открытая переменам.",
          "позже здесь будет настоящий текст в настоящем времени о том, что я делаю сейчас, что для меня важно и куда работа движется дальше.",
          "пока эта часть должна ощущаться собранной, но не окончательной. работа стала яснее, сам процесс спокойнее, и у следующей версии всё ещё есть место появиться постепенно.",
          "история пока останавливается здесь, а затем продолжается уже внутри самого портфолио.",
        ],
        image: {
          id: "portrait-01",
          label: "сейчас",
          caption: "плейсхолдер самого недавнего автопортрета.",
          alt: "плейсхолдер текущего автопортрета",
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

function ArtifactImage({
  imageId,
  locale,
  alt,
  sizes,
  size = "origin",
  className = "",
  variant = "plain",
  imgClassName = "object-contain p-3 md:p-4",
}) {
  const art = artworkImage(imageId);

  return (
    <ImageFrame
      variant={variant}
      className={`about-artifact-image about-artifact-image--${size} relative ${className}`.trim()}
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

function ChapterLabel({ children, tilt = "-1deg" }) {
  return (
    <div className="about-chapter-label" style={{ "--chapter-tilt": tilt }}>
      <span className="about-tab-label">{children}</span>
    </div>
  );
}

function StickyNote({ title, body, className = "" }) {
  return (
    <aside className={`about-sticky-note ${className}`.trim()}>
      {title ? <p className="caption text-highlight">{title}</p> : null}
      <p className="body-sm text-text-primary">{body}</p>
    </aside>
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

function AboutChapterShell({
  chapter,
  className = "",
  children,
  headingClassName = "",
  copyClassName = "",
}) {
  return (
    <article className={`about-spread ${className}`.trim()}>
      <div className={`about-chapter-copy ${copyClassName}`.trim()}>
        <ChapterLabel tilt={chapter.tilt}>{chapter.label}</ChapterLabel>
        <Heading level="h2" className={headingClassName}>
          {chapter.title}
        </Heading>
        <div className="about-underline" aria-hidden />
        {chapter.body?.map((paragraph) => (
          <p key={paragraph} className="body">
            {paragraph}
          </p>
        ))}
      </div>
      {children}
    </article>
  );
}

function AboutHero({ t, hero }) {
  return (
    <section className="about-spread about-hero">
      <div className="about-hero-card">
        <ChapterLabel tilt="-1.5deg">{hero.label}</ChapterLabel>
        <Eyebrow>{t.pageEyebrow}</Eyebrow>
        <Heading level="h1" className="max-w-3xl">
          {t.pageTitle}
        </Heading>
        <div className="about-underline" aria-hidden />
        <p className="body-lg max-w-2xl">{t.pageDescription}</p>
      </div>

      <StickyNote
        title={hero.note.title}
        body={hero.note.body}
        className="about-hero-note"
      />
    </section>
  );
}

function OriginChapter({ chapter, locale }) {
  const [leadParagraph, ...remainingParagraphs] = chapter.body ?? [];

  return (
    <article className="about-spread about-origin">
      <div className="about-chapter-copy about-origin-copy">
        <ChapterLabel tilt={chapter.tilt}>{chapter.label}</ChapterLabel>
        <Heading level="h2">
          {chapter.title}
        </Heading>
        <div className="about-underline" aria-hidden />
        <div className="about-origin-layout">
          {leadParagraph ? <p className="body">{leadParagraph}</p> : null}
          <figure className="about-artifact about-origin-artifact">
            <div className="about-origin-arrow" aria-hidden>
              <span />
              <span />
            </div>
            <ArtifactImage
              imageId={chapter.image.id}
              locale={locale}
              alt={chapter.image.alt}
              size="origin"
              sizes="(max-width: 767px) 78vw, 300px"
              className="about-origin-frame"
              imgClassName="object-contain p-2.5 md:p-3"
            />
            <figcaption className="about-attached-caption">
              <p className="caption text-highlight">{chapter.image.label}</p>
              <p className="body-sm text-text-primary">{chapter.image.caption}</p>
            </figcaption>
          </figure>
          {remainingParagraphs.map((paragraph) => (
            <p key={paragraph} className="body">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}

function EvidenceBoard({ items, locale }) {
  return (
    <div className="about-evidence-board">
      <div className="about-grid-patch" aria-hidden />
      <div className="about-board-grid">
        {items.map((item) => (
          <figure key={item.id} className={item.boardClass}>
            <ArtifactImage
              imageId={item.id}
              locale={locale}
              alt={item.alt}
              size="board"
              sizes="(max-width: 767px) 78vw, (max-width: 1199px) 28vw, 220px"
              className="about-board-frame"
              imgClassName="object-contain p-2 md:p-2.5"
            />
            <figcaption className="about-board-caption">
              <p className="caption text-highlight">{item.label}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

function DigitalArtChapter({ chapter, locale }) {
  return (
    <AboutChapterShell chapter={chapter} className="about-board">
      <EvidenceBoard items={chapter.images} locale={locale} />
    </AboutChapterShell>
  );
}

function SelfPortraitTimeline({ chapter, locale }) {
  return (
    <AboutChapterShell chapter={chapter} className="about-timeline">
      <div className="about-timeline-intro">
        {chapter.note ? (
          <StickyNote body={chapter.note.body} className="about-timeline-note" />
        ) : null}
      </div>

      <div className="about-timeline-stage">
        <div className="about-timeline-rail" aria-hidden>
          {chapter.timelineItems.map((item, index) => (
            <span
              key={item.year}
              className="about-timeline-node"
              style={{ gridColumn: index + 1 }}
            />
          ))}
        </div>

        <div className="about-timeline-grid">
          {chapter.timelineItems.map((item, index) => (
            <figure
              key={item.year}
              className={`about-timeline-item ${
                index % 2 === 0
                  ? "about-timeline-item--bottom"
                  : "about-timeline-item--top"
              }`}
              style={{ gridColumn: index + 1 }}
            >
              <div className="about-timeline-meta">
                <span className="about-year-chip">{item.year}</span>
                <span className="caption">{item.age}</span>
              </div>
              <div className="about-timeline-connector" aria-hidden />
              <div className="about-timeline-media">
                <ArtifactImage
                  imageId={item.id}
                  locale={locale}
                  alt={item.alt}
                  size="timeline"
                  sizes="(max-width: 767px) 72vw, 16vw"
                  className={`about-timeline-frame about-timeline-frame--${index + 1}`}
                  imgClassName="object-contain p-2 md:p-3"
                />
              </div>
            </figure>
          ))}
        </div>
      </div>
    </AboutChapterShell>
  );
}

function PortraitComparison({ items, locale }) {
  return (
    <div className="about-comparison-artifact">
      <div className="about-grid-patch about-grid-patch--comparison" aria-hidden />
      <div className="about-comparison-grid">
        {items.map((item, index) => (
          <Fragment key={item.year}>
            {index > 0 ? (
              <span className="about-comparison-vs" aria-hidden>
                vs
              </span>
            ) : null}
            <figure
              className={`about-comparison-item about-comparison-item--${index + 1}`}
            >
              <div className="about-comparison-media">
                <ArtifactImage
                  imageId={item.id}
                  locale={locale}
                  alt={item.alt}
                  size="comparison"
                  sizes="(max-width: 767px) 74vw, 18vw"
                  className="about-comparison-frame"
                  imgClassName="object-contain p-2.5 md:p-3"
                />
              </div>
              <figcaption className="about-comparison-meta">
                <span className="about-year-chip">{item.year}</span>
                <span className="caption">{item.age}</span>
              </figcaption>
            </figure>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

function UpsAndDownsChapter({ chapter, locale }) {
  return (
    <AboutChapterShell chapter={chapter} className="about-comparison">
      <PortraitComparison items={chapter.comparisonItems} locale={locale} />
      <div className="about-comparison-notes">
        {chapter.notes?.map((note, index) => (
          <StickyNote
            key={note}
            body={note}
            className={`about-comparison-note about-comparison-note--${index + 1}`}
          />
        ))}
      </div>
    </AboutChapterShell>
  );
}

function CurrentSelfSection({ chapter, locale }) {
  return (
    <article className="about-spread about-current">
      <div className="about-current-layout">
        <div className="about-current-copy">
          <ChapterLabel tilt={chapter.tilt}>{chapter.label}</ChapterLabel>
          <Heading level="h2" className="max-w-xl">
            {chapter.title}
          </Heading>
          <div className="about-underline" aria-hidden />
          {chapter.body?.map((paragraph) => (
            <p key={paragraph} className="body">
              {paragraph}
            </p>
          ))}
        </div>

        <figure className="about-artifact about-current-artifact">
          <span className="about-current-tag">{chapter.image.label}</span>
          <ArtifactImage
            imageId={chapter.image.id}
            locale={locale}
            alt={chapter.image.alt}
            size="current"
            sizes="(max-width: 767px) 82vw, 360px"
            className="about-current-frame"
            imgClassName="object-contain p-3 md:p-5"
          />
        </figure>
      </div>
    </article>
  );
}

function AboutPageEnding({ ending, locale }) {
  return (
    <section className="about-ending-card">
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
  switch (chapter.layoutVariant) {
    case "origin":
      return <OriginChapter chapter={chapter} locale={locale} />;
    case "board":
      return <DigitalArtChapter chapter={chapter} locale={locale} />;
    case "timeline":
      return <SelfPortraitTimeline chapter={chapter} locale={locale} />;
    case "comparison":
      return <UpsAndDownsChapter chapter={chapter} locale={locale} />;
    case "current":
      return <CurrentSelfSection chapter={chapter} locale={locale} />;
    default:
      return null;
  }
}

export function AboutPage({ dict, locale = "en" }) {
  const t = dict.about;
  const story = ABOUT_STORY[locale] ?? ABOUT_STORY.en;

  return (
    <section id="about" className="section-scrap">
      <Container className="py-12 md:py-14" style={{ maxWidth: "1280px" }}>
        <div className="about-storybook">
          <AboutHero t={t} hero={story.hero} />

          {story.chapters.map((chapter, index) => (
            <div key={chapter.id}>
              {index > 0 ? <ChapterDivider /> : null}
              {renderChapter(chapter, locale)}
            </div>
          ))}

          <ChapterDivider />
          <AboutPageEnding ending={story.ending} locale={locale} />
        </div>
      </Container>
    </section>
  );
}
