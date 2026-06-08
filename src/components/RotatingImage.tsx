import { motion } from "framer-motion";

import Project from "../models/Project";

const RotatingImage: React.FC<{ project: Project; alt: string; paused: boolean }> = ({ project, alt }) => (
  <motion.img
    src={project.mainImage}
    alt={alt}
    className="w-full h-full object-cover"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.25 }}
  />
);

export default RotatingImage;
