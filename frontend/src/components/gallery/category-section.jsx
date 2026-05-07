import { ArtworkRow } from "@/components/gallery/artwork-card";
import { Eyebrow } from "@/components/ui/eyebrow";

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

  const categoryIntro = categoryIntroCopy[category] ?? categoryIntroCopy.default;
  const introText = locale === "ru" ? categoryIntro.ru : categoryIntro.en;

  return (
    <section id={id} className="scroll-mt-header space-y-6 md:space-y-8">
      <header className="category-banner corner-marks relative flex items-baseline justify-between gap-4 border border-dashed border-border-subtle p-5 md:p-6">
        <div className="space-y-1.5">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h3 className="heading-h2 text-[1.9rem] leading-tight md:text-[2.15rem]">
            {category}
          </h3>
          <p className="body-sm max-w-[52ch]">{introText}</p>
        </div>
        <span className="tilt-chip caption shrink-0 pt-2 text-highlight">
          {count} {label}
        </span>
      </header>
      <div className="cascade-artworks">
        {artworks.map((artwork, index) => (
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
    en: "notes under art are still under construction.",
    ru: "заметки под работами пока в разработке.",
  },
};

export { categoryAnchorId };
