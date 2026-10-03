import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function SectionHeader({ title, className = '' }) {
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  return (
    <motion.h2
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6 }}
      className={`font-body text-3xl md:text-4xl lg:text-5xl font-extrabold text-charcoal text-center mb-16 tracking-tight ${className}`.trim()}
    >
      {title}
    </motion.h2>
  );
}
