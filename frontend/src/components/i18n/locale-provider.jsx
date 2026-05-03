"use client";

import { createContext, useContext, useMemo } from "react";

const LocaleContext = createContext({ locale: "en", dict: null });

export function LocaleProvider({ locale, dict, children }) {
  const value = useMemo(() => ({ locale, dict }), [locale, dict]);
  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useDictionary() {
  return useContext(LocaleContext).dict;
}

export function useDictLocale() {
  return useContext(LocaleContext).locale;
}

/**
 * Resolve a dotted key path against the dictionary. Returns the key when missing
 * so dev never silently fails.
 */
export function useT() {
  const dict = useDictionary();
  return (path, fallback) => {
    if (!dict || !path) return fallback ?? path ?? "";
    const parts = path.split(".");
    let cursor = dict;
    for (const part of parts) {
      if (cursor && typeof cursor === "object" && part in cursor) {
        cursor = cursor[part];
      } else {
        return fallback ?? path;
      }
    }
    return typeof cursor === "string" ? cursor : (fallback ?? path);
  };
}
