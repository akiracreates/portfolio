import { describe, expect, it } from "vitest";
import {
  commissionsPageUrl,
  isValidSpinEmail,
  normalizeSpinEmail,
} from "@/lib/server/spin-utils";

describe("spin-utils", () => {
  it("normalizes spin email", () => {
    expect(normalizeSpinEmail("  User+A@Example.COM ")).toBe("user+a@example.com");
  });

  it("validates spin email", () => {
    expect(isValidSpinEmail("user@example.com")).toBe(true);
    expect(isValidSpinEmail("invalid-email")).toBe(false);
    expect(isValidSpinEmail("")).toBe(false);
  });

  it("builds commissions URL from base", () => {
    expect(commissionsPageUrl("en", "https://example.com/")).toBe(
      "https://example.com/en/commissions",
    );
    expect(commissionsPageUrl("ru", "https://example.com")).toBe(
      "https://example.com/ru/commissions",
    );
  });
});

