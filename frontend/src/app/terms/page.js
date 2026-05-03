import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/layout/page-header";
import { termsItems } from "@/lib/content/terms";

export const metadata = {
  title: "terms | akira",
  description:
    "commission and usage terms placeholder page for future production policy.",
};

export default function TermsPage() {
  return (
    <>
      <PageHeader
        id="terms"
        eyebrow="terms"
        title="terms & conditions"
        description="please read these before submitting a commission request. they exist to make every collaboration smooth and fair."
      />

      <Container className="py-16 md:py-24">
        <article className="prose">
          {termsItems.map((item) => (
            <section key={item.id}>
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </section>
          ))}
        </article>
      </Container>
    </>
  );
}
