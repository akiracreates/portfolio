import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/layout/page-header";

export const metadata = {
  title: "privacy | akira",
  description: "privacy placeholder page for future policy details.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        id="privacy"
        eyebrow="privacy"
        title="privacy policy"
        description="placeholder text. replace with approved legal text before launch."
      />

      <Container className="py-16 md:py-24">
        <article className="prose">
          <p>
            lorem ipsum privacy placeholder. this section will outline what
            information is collected when you use this site, how it is stored,
            and how to request its removal.
          </p>
          <h2>what we collect</h2>
          <p>
            lorem ipsum placeholder for the data collection summary, including
            form submissions and any analytics that may be added later.
          </p>
          <h2>how it is used</h2>
          <p>
            lorem ipsum placeholder for usage information. data is used solely
            to fulfil commission requests and improve the experience here.
          </p>
          <h2>contact</h2>
          <p>
            lorem ipsum placeholder for the contact channel relating to privacy
            requests.
          </p>
        </article>
      </Container>
    </>
  );
}
