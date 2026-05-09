/** Lightweight route-mount fade — avoids wrapping pages in Framer `AnimatePresence`. */
export default function LocaleRouteTemplate({ children }) {
  return <div className="route-template-enter">{children}</div>;
}
