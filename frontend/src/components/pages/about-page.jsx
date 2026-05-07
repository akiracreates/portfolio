import { Fragment } from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { ImageFrame } from "@/components/ui/image-frame";
import { SmartImage } from "@/components/ui/smart-image";
import { aboutStory } from "@/lib/content/about-story";

function imageAspect(image) {
  return { aspectRatio: image?.ratio ?? "4 / 5" };
}

function ArtifactImage({
  image,
  alt,
  sizes,
  size = "origin",
  className = "",
  variant = "plain",
  imgClassName = "object-contain p-3 md:p-4",
}) {
  return (
    <ImageFrame
      variant={variant}
      className={`about-artifact-image about-artifact-image--${size} relative ${className}`.trim()}
      style={imageAspect(image)}
    >
      <SmartImage
        src={image.src}
        alt={alt || image.alt}
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

function AboutHero({ t, locale, heroNote }) {
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
        title={locale === "ru" ? "заметка" : "sticky note"}
        body={heroNote}
        className="about-hero-note"
      />
    </section>
  );
}

function OriginChapter({ chapter }) {
  return (
    <article className="about-spread about-origin">
      <div className="about-origin-story">
        <div className="about-origin-copy">
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

        {chapter.images?.map((image) => (
          <figure key={image.id} className="about-artifact about-origin-artifact">
            <ArtifactImage
              image={image}
              alt={image.alt}
              size="origin"
              sizes="(max-width: 767px) 72vw, 300px"
              className="about-origin-frame"
              imgClassName="object-contain p-2.5 md:p-3"
            />
            <figcaption className="about-attached-caption about-origin-caption">
              <p className="caption text-highlight">{image.label}</p>
              <p className="body-sm text-text-primary">{image.caption}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </article>
  );
}

function AboutChapterEvidenceBoard({ items, locale, tabLabel }) {
  const fallbackTabLabel = locale === "ru" ? "память" : "memory";

  return (
    <section className="about-evidence-board" aria-label={tabLabel || fallbackTabLabel}>
      <span className="about-evidence-tab caption text-highlight">
        {tabLabel || fallbackTabLabel}
      </span>
      <div className="about-board-connector" aria-hidden />
      <div className="about-grid-patch" aria-hidden />
      <div className="about-board-stage">
        {items.map((item) => (
          <figure key={item.id} className={item.boardClass}>
            <ArtifactImage
              image={item}
              alt={item.alt}
              size="board"
              sizes="(max-width: 767px) 72vw, (max-width: 1199px) 24vw, 220px"
              className="about-board-frame"
              imgClassName="object-contain p-2 md:p-2.5"
            />
            <figcaption className="about-board-caption">
              <p className="caption text-highlight">{item.label}</p>
              <p className="body-sm text-text-primary">{item.caption}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function DigitalArtChapter({ chapter, locale }) {
  return (
    <article className="about-spread about-board">
      <div className="about-chapter-copy about-board-copy">
        <ChapterLabel tilt={chapter.tilt}>{chapter.label}</ChapterLabel>
        <Heading level="h2" className="max-w-sm">
          {chapter.title}
        </Heading>
        <div className="about-underline" aria-hidden />
      </div>

      <div className="about-board-layout">
        <section className="about-board-main-note">
          <p className="caption about-board-note-label text-highlight">
            {chapter.noteCard?.label}
          </p>
          {chapter.noteCard?.body?.map((paragraph) => (
            <p key={paragraph} className="body-sm text-text-primary">
              {paragraph}
            </p>
          ))}
        </section>

        <AboutChapterEvidenceBoard
          items={chapter.images}
          locale={locale}
          tabLabel={chapter.noteCard?.label}
        />
      </div>
    </article>
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
                  image={item}
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
                  image={item}
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
            image={chapter.image}
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

const ABOUT_SECTION_ANCHORS = {
  started: "how-it-started",
  digital: "digital-art",
  timeline: "timeline",
  "ups-downs": "ups-and-downs",
  now: "where-i-am-now",
};

export function AboutPage({ dict, locale = "en" }) {
  const t = dict.about;
  const story = aboutStory[locale] ?? aboutStory.en;

  return (
    <section id="about" className="section-scrap">
      <Container className="py-12 md:py-14" style={{ maxWidth: "1280px" }}>
        <div className="about-storybook">
          <div id="overview" className="scroll-mt-header">
            <AboutHero t={t} locale={locale} heroNote={story.heroNote} />
          </div>

          {story.chapters.map((chapter, index) => (
            <div
              key={chapter.id}
              id={ABOUT_SECTION_ANCHORS[chapter.id] ?? chapter.id}
              className="scroll-mt-header"
            >
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
