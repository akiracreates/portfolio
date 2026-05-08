import { Fragment } from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Divider, SectionDividerBleed } from "@/components/ui/divider";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { ImageFrame } from "@/components/ui/image-frame";
import { SmartImage } from "@/components/ui/smart-image";
import { aboutStory } from "@/lib/content/about-story";
import { getImageMeta } from "@/lib/images/get-image-meta";

const FALLBACK_RATIO = "4 / 5";

function resolveAspectRatio(image) {
  if (!image) return FALLBACK_RATIO;
  if (image.ratio) return image.ratio;
  if (typeof image.width === "number" && typeof image.height === "number") {
    return `${image.width} / ${image.height}`;
  }
  if (image.path) {
    const meta = getImageMeta(image.path);
    if (meta?.width && meta?.height) {
      return `${meta.width} / ${meta.height}`;
    }
  }
  return FALLBACK_RATIO;
}

function ArtifactImage({
  image,
  alt,
  sizes,
  size = "origin",
  displayVariant = "chapterFeature",
  className = "",
  variant = "plain",
  imgClassName = "object-contain p-3 md:p-4",
  singleFrame = true,
}) {
  return (
    <ImageFrame
      variant={variant}
      singleFrame={singleFrame}
      className={`about-artifact-image about-artifact-image--${size} about-artifact-display--${displayVariant} relative ${className}`.trim()}
      style={{ aspectRatio: resolveAspectRatio(image) }}
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

function ChapterLabel({ children, tilt = "-1deg", tone = "pink" }) {
  return (
    <div className="about-chapter-label" style={{ "--chapter-tilt": tilt }}>
      <span className={`about-tab-label about-tab-label--${tone}`}>{children}</span>
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
  return <SectionDividerBleed className="about-chapter-divider" />;
}

function AboutHero({ t, locale, heroNote }) {
  return (
    <section className="about-spread about-hero">
      <div className="about-hero-card">
        <ChapterLabel tilt="-1.5deg">{t.pageEyebrow}</ChapterLabel>
        <Eyebrow>{t.pageEyebrow}</Eyebrow>
        <Heading level="h1" className="max-w-3xl">
          {t.pageTitle}
        </Heading>
        <Divider className="about-underline" />
        <p className="body-lg max-w-2xl">{t.pageDescription}</p>
      </div>

      <StickyNote
        title={locale === "ru" ? "заметка" : "sticky note"}
        body={heroNote}
        className="about-hero-note note-surface-warm"
      />
    </section>
  );
}

function OriginChapter({ chapter }) {
  const imageCluster = (
    <div className="about-origin-cluster" aria-label={chapter.title}>
      {chapter.images?.map((image, index) => (
        <figure
          key={image.id}
          className={`about-artifact about-origin-artifact about-origin-artifact--${index + 1}`}
        >
          <ArtifactImage
            image={image}
            alt={image.alt}
            size="origin"
            sizes="(max-width: 767px) 82vw, (max-width: 1199px) 28vw, 260px"
            className={`about-origin-frame ${index === 0 ? "deco-warm-corner" : ""}`.trim()}
            imgClassName="object-contain p-2.5 md:p-3"
          />
          <figcaption className="about-attached-caption about-origin-caption note-surface-warm">
            <p className="caption text-highlight deco-warm-label">{image.label}</p>
            <p className="body-sm text-text-primary">{image.caption}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
  return (
    <article className="about-spread about-origin">
      <div className="about-origin-story">
        <div className="about-origin-copy">
          <ChapterLabel tilt={chapter.tilt} tone="amber">
            {chapter.label}
          </ChapterLabel>
          <Heading level="h2" className="max-w-xl">
            {chapter.title}
          </Heading>
          <Divider className="about-underline" />
          <div className="about-origin-cluster-mobile">{imageCluster}</div>
          <div className="about-origin-prose">
            <div className="about-origin-cluster-desktop">{imageCluster}</div>
            {chapter.body?.map((paragraph) => (
              <p key={paragraph} className="body">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function BoardCluster({ items, locale, tabLabel }) {
  const fallbackTabLabel = locale === "ru" ? "память" : "memory";
  return (
    <aside className="about-board-cluster" aria-label={tabLabel || fallbackTabLabel}>
      <span className="about-board-cluster-tab caption text-highlight">
        {tabLabel || fallbackTabLabel}
      </span>
      <div className="about-board-cluster-inner">
        <div className="about-board-cluster-grid">
          {items.map((item) => (
            <figure key={item.id} className={item.boardClass}>
              <ArtifactImage
                image={item}
                alt={item.alt}
                size="board"
                displayVariant={
                  item.id === "doritos" ? "evidenceAnchor" : "evidenceSmall"
                }
                sizes="(max-width: 767px) 80vw, (max-width: 1199px) 36vw, 280px"
                className="about-board-frame"
                imgClassName="object-contain p-2.5 md:p-3"
              />
              <figcaption className="about-board-caption">
                <p className="caption text-highlight">{item.label}</p>
                <p className="body-sm text-text-primary">{item.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </aside>
  );
}

function DigitalArtChapter({ chapter, locale }) {
  const body = chapter.noteCard?.body ?? [];
  const wrappedParagraphs = body.slice(0, 4);
  const continuationParagraphs = body.slice(4);
  const boardCluster = (
    <BoardCluster
      items={chapter.images}
      locale={locale}
      tabLabel={chapter.noteCard?.label}
    />
  );
  return (
    <article className="about-spread about-board">
      <div className="about-board-flow">
        <div className="about-board-cluster-desktop">{boardCluster}</div>
        <div className="about-board-header">
          <ChapterLabel tilt={chapter.tilt} tone="purple">
            {chapter.label}
          </ChapterLabel>
          <Heading level="h2" className="about-board-title">
            {chapter.title}
          </Heading>
          <Divider className="about-underline" />
          {chapter.noteCard?.label ? (
            <p className="caption about-board-note-label text-highlight">
              {chapter.noteCard.label}
            </p>
          ) : null}
        </div>

        <div className="about-board-prose">
          {wrappedParagraphs.map((paragraph) => (
            <p key={paragraph} className="body about-board-paragraph">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="about-board-cluster-mobile">{boardCluster}</div>
        <div className="about-board-prose about-board-prose--continuation">
          {continuationParagraphs.map((paragraph) => (
            <p key={paragraph} className="body about-board-paragraph">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}

function SelfPortraitTimeline({ chapter, locale }) {
  return (
    <article className="about-spread about-timeline card-surface-warm">
      <div className="about-timeline-copy">
        <ChapterLabel tilt={chapter.tilt} tone="pink">
          {chapter.label}
        </ChapterLabel>
        <Heading level="h2" className="about-timeline-title">
          {chapter.title}
        </Heading>
        <Divider className="about-underline" />
        {chapter.body?.map((paragraph) => (
          <p key={paragraph} className="body about-timeline-paragraph">
            {paragraph}
          </p>
        ))}
        {chapter.note?.body ? (
          <p className="body about-timeline-reflection deco-warm-underline">{chapter.note.body}</p>
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
              }${item.sizeClass === "timeline-large-wide" ? " about-timeline-item--large-wide" : ""}`}
              style={{ gridColumn: index + 1 }}
            >
              <div className="about-timeline-meta">
                <span className={`about-year-chip ${index === 1 || index === 3 ? "deco-warm-pin" : ""}`}>
                  {item.year}
                </span>
                <span className="caption">{item.age}</span>
              </div>
              <div className="about-timeline-connector" aria-hidden />
              <div className="about-timeline-media">
                <ArtifactImage
                  image={item}
                  alt={item.alt}
                  size="timeline"
                  displayVariant="timeline"
                  sizes="(max-width: 767px) 72vw, 16vw"
                  className={`about-timeline-frame about-timeline-frame--${index + 1} ${item.sizeClass ?? ""}`.trim()}
                  imgClassName="object-contain p-2 md:p-3"
                />
              </div>
            </figure>
          ))}
        </div>
      </div>
    </article>
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
                  displayVariant="chapterFeature"
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
    <article className="about-spread about-comparison">
      <div className="about-chapter-copy about-comparison-copy">
        <ChapterLabel tilt={chapter.tilt} tone="amber">
          {chapter.label}
        </ChapterLabel>
        <Heading level="h2">{chapter.title}</Heading>
        <Divider className="about-underline" />
        {chapter.body?.map((paragraph) => (
          <p key={paragraph} className="body">
            {paragraph}
          </p>
        ))}
      </div>

      <PortraitComparison items={chapter.comparisonItems} locale={locale} />
      <div className="about-comparison-notes">
        {chapter.notes?.map((note, index) => (
          <StickyNote
            key={note}
            body={note}
            className={`about-comparison-note about-comparison-note--${index + 1} note-surface-warm`}
          />
        ))}
      </div>
    </article>
  );
}

function CurrentSelfSection({ chapter, locale }) {
  const body = chapter.body ?? [];
  return (
    <article className="about-spread about-current card-surface-warm">
      <div className="about-current-flow">
        <figure className="about-artifact about-current-artifact">
          <span className="about-current-tag">{chapter.image.label}</span>
          <ArtifactImage
            image={chapter.image}
            alt={chapter.image.alt}
            size="current"
            displayVariant="currentPortrait"
            sizes="(max-width: 767px) 86vw, (max-width: 1199px) 42vw, 420px"
            className="about-current-frame"
            imgClassName="object-contain p-3 md:p-5"
          />
        </figure>
        <div className="about-current-header">
          <ChapterLabel tilt={chapter.tilt} tone="purple">
            {chapter.label}
          </ChapterLabel>
          <Heading level="h2" className="about-current-title">
            {chapter.title}
          </Heading>
          <Divider className="about-underline" />
        </div>

        <div className="about-current-prose">
          {body.map((paragraph) => (
            <p key={paragraph} className="body about-current-paragraph">
              {paragraph}
            </p>
          ))}
        </div>
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
