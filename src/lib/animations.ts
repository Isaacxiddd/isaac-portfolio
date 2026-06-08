export const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.28 } }
};

export const popIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.22 } }
};

export const staggerGrid = { visible: { transition: { staggerChildren: 0.1 } } };

export const staggerPills = { visible: { transition: { staggerChildren: 0.055 } } };
