import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Project from "../models/Project";

const RotatingImage: React.FC<{ project: Project; alt: string; paused: boolean }> = ({ project, alt, paused }) => {
  const allImages = useMemo(() => {
    const imgs = project.images.length > 0 ? project.images : [project.mainImage];
    return project.images.includes(project.mainImage)
      ? imgs
      : [project.mainImage, ...imgs];
  }, [project]);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (allImages.length <= 1 || paused) return;
    const id = setInterval(() => setIndex(i => (i + 1) % allImages.length), 5000);
    return () => clearInterval(id);
  }, [allImages.length, paused]);

  return (
    <AnimatePresence mode="wait">
      <motion.img
        key={allImages[index]}
        src={allImages[index]}
        alt={alt}
        className="w-full h-full object-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      />
    </AnimatePresence>
  );
};

export default RotatingImage;
