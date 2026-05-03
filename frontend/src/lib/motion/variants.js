/** Shared motion presets — durations align with CSS tokens in globals.css */

export const motionEase = [0.22, 1, 0.36, 1];

export const fadeSlideUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: motionEase },
  },
};

export const fadeSlideSmall = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: motionEase },
  },
};

export const staggerChildren = {
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.06 },
  },
};

export const pageEaseTransition = {
  duration: 0.35,
  ease: motionEase,
};

export const pageEaseExit = {
  duration: 0.22,
  ease: motionEase,
};
