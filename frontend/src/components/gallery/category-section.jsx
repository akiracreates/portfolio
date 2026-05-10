"use client";

import { ArtworkRow } from "@/components/gallery/artwork-card";
import { Eyebrow } from "@/components/ui/eyebrow";
import { useEffect, useMemo, useRef, useState } from "react";

function categoryAnchorId(category) {
  return `category-${category.toLowerCase().replace(/\s+/g, "-")}`;
}

/**
 * Editorial category layout: image + content rows that alternate per index.
 * Replaces the previous 3-col grid per the spec.
 */
export function CategorySection({
  category,
  artworks,
  locale = "en",
  eyebrow = "collection",
  piecesLabel = "pieces",
  pieceLabel = "piece",
  startIndex = 0,
  enableSecretSpin = false,
}) {
  const id = categoryAnchorId(category);
  const count = artworks.length;
  const label = count === 1 ? pieceLabel : piecesLabel;
  const pairsRef = useRef(null);
  const [columnWidth, setColumnWidth] = useState(null);

  const categoryIntro = categoryIntroCopy[category] ?? categoryIntroCopy.default;
  const introText = locale === "ru" ? categoryIntro.ru : categoryIntro.en;

  const orderedArtworks = useMemo(() => {
    if (!columnWidth) return artworks;
    const scored = artworks.map((artwork, idx) => {
      const width = typeof artwork.width === "number" && artwork.width > 0 ? artwork.width : 4;
      const height =
        typeof artwork.height === "number" && artwork.height > 0 ? artwork.height : 5;
      const visualHeight = columnWidth * (height / width);
      return { artwork, idx, visualHeight };
    });
    scored.sort((a, b) => b.visualHeight - a.visualHeight || a.idx - b.idx);
    return scored.map((s) => s.artwork);
  }, [artworks, columnWidth]);

  const desktopColumns = useMemo(() => {
    const columns = [[], []];
    const heights = [0, 0];
    const noteFootprint = 168;

    for (let i = 0; i < orderedArtworks.length; i += 1) {
      const artwork = orderedArtworks[i];
      const width = typeof artwork.width === "number" && artwork.width > 0 ? artwork.width : 4;
      const height = typeof artwork.height === "number" && artwork.height > 0 ? artwork.height : 5;
      const visualHeight =
        (columnWidth || 360) * (height / width) + noteFootprint;
      const target = heights[0] <= heights[1] ? 0 : 1;
      columns[target].push({ artwork, index: i });
      heights[target] += visualHeight;
    }

    return columns;
  }, [orderedArtworks, columnWidth]);

  useEffect(() => {
    const root = pairsRef.current;
    if (!root) return undefined;

    const measure = () => {
      const sample = root.querySelector(".cascade-pair-item");
      const width = sample?.getBoundingClientRect().width ?? 0;
      if (width > 0) setColumnWidth(width);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [orderedArtworks.length]);

  return (
    <section id={id} className="scroll-mt-header space-y-5 md:space-y-8">
      <header className="category-banner corner-marks relative flex flex-col items-start gap-3 border border-dashed border-border-subtle p-5 max-md:border-border-subtle/55 md:flex-row md:items-baseline md:justify-between md:border-border-subtle md:gap-4 md:p-6">
        <div className="min-w-0 w-full space-y-2 md:max-w-[68ch] md:flex-none md:space-y-1.5">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h3 className="heading-h2 text-[1.9rem] leading-tight md:text-[2.15rem]">
            {category}
          </h3>
          <p className="body-sm max-md:leading-[1.68] md:leading-normal">{introText}</p>
        </div>
        <span className="tilt-chip caption w-full shrink-0 border-t border-dashed border-border-subtle/40 pt-3 text-left text-highlight max-md:text-[0.8125rem] md:ml-4 md:w-auto md:border-t-0 md:pt-2 md:text-right md:self-baseline">
          {count} {label}
        </span>
      </header>
      <div className="portfolio-mobile-list max-md:mt-3 md:mt-0">
        {orderedArtworks.map((artwork, index) => (
          <ArtworkRow
            key={artwork.id}
            artwork={artwork}
            index={startIndex + index}
            locale={locale}
            enableSecretSpin={
              enableSecretSpin &&
              category.toLowerCase() === "animals" &&
              artwork.path === "images/animals/silly_kitty"
            }
          />
        ))}
      </div>
      <div ref={pairsRef} className="portfolio-columns">
        {desktopColumns.map((column, columnIndex) => (
          <div key={`column-${columnIndex}`} className="portfolio-column">
            {column.map(({ artwork, index }) => (
              <ArtworkRow
                key={artwork.id}
                artwork={artwork}
                index={startIndex + index}
                locale={locale}
                enableSecretSpin={
                  enableSecretSpin &&
                  category.toLowerCase() === "animals" &&
                  artwork.path === "images/animals/silly_kitty"
                }
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

const categoryIntroCopy = {
  portraits: {
    en: "portraits were the first thing i became emotionally attached to drawing seriously. i like observing faces, expressions, awkward details, and the small things that make someone feel recognizable.",
    ru: "портреты — это первое, к чему я по-настоящему эмоционально привязалась в рисовании. мне нравится замечать лица, выражения, неловкие детали и маленькие вещи, из-за которых человек ощущается узнаваемым.",
  },
  animals: {
    en: "i've always loved painting animals, especially cats. they somehow feel expressive even when they're doing absolutely nothing.",
    ru: "я всегда очень любила рисовать животных, особенно котов. они почему-то выглядят выразительно, даже когда вообще ничего не делают.",
  },
  landscapes: {
    en: "i surprisingly find landscapes to be a harder subject to convey than portraits. i do like lack of strict proportions though.",
    ru: "как ни странно, пейзажи для меня сложнее, чем портреты. но мне нравится, что здесь нет такой жёсткой привязки к пропорциям.",
  },
  "still life": {
    en: "i like doing these exercises where you take the most boring object and you have to make it interesting. here are the results!",
    ru: "мне нравится делать такие упражнения: берёшь самый скучный предмет и пробуешь сделать его интересным. вот результаты!",
  },
  default: {
    en: "artwork in this category, with short notes on each piece.",
    ru: "работы в этой категории с короткими заметками к каждой.",
  },
};

export { categoryAnchorId };
