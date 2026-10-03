import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EditableImage from './EditableImage';

// Reusable image slot — real image when the path resolves,
// clean neutral placeholder when it doesn't. No emojis.
const ImageSlot = ({ src, alt, label, number }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="flex-1 min-w-[280px] rounded-2xl overflow-hidden border border-[#E4DED7] bg-white/80 shadow-sm flex flex-col"
    >
      <div className="relative aspect-[16/10] bg-[#EEE8F0] overflow-hidden flex items-center justify-center border-b border-[#E4DED7]">
        <EditableImage
          src={src}
          alt={alt || label || `Gallery Image ${number}`}
          placeholder={number || 'IMAGE 01'}
          tone="light"
        />
      </div>

      <div className="px-4 py-2.5 bg-white/90 border-t border-[#E4DED7] flex items-center justify-between text-xs">
        <span className="font-mono text-[#706B68] font-semibold">{number}</span>
        <span className="font-medium text-[#171717] truncate">{label}</span>
      </div>
    </motion.div>
  );
};

const DetailCard = ({ item, index, galleryLabel = "VIEW GALLERY" }) => {
  const [galleryOpen, setGalleryOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.15 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white/[0.88] backdrop-blur-sm rounded-3xl border border-[#E4DED7] p-7 sm:p-10 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Header Row: Title + Achievement Badge */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 pb-6 border-b border-[#E4DED7]">
          <div className="flex items-start gap-4">
            <span className="text-sm font-mono font-bold text-[#706B68] pt-1">
              {item.number}
            </span>
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight leading-tight">
                {item.title || item.organization}
              </h3>
              {item.subtitle && (
                <p className="text-sm font-medium text-[#706B68] mt-1">
                  {item.subtitle}
                </p>
              )}
              {item.role && (
                <p className="text-base font-semibold text-[#382347] mt-1">
                  {item.role}
                </p>
              )}
            </div>
          </div>

          {/* Metadata pill container */}
          <div className="flex flex-wrap items-center gap-2.5 lg:self-start">
            {item.achievement && (
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-[#E8D5F9] text-[#382347] border border-[#E4DED7]">
                {item.achievement}
              </span>
            )}
            {item.timeline && (
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-mono font-medium text-[#706B68] bg-white/80 border border-[#E4DED7]">
                {item.timeline}
              </span>
            )}
          </div>
        </div>

        {/* Venue / Context */}
        {item.venue && (
          <div className="pt-4 flex items-center gap-2 text-xs font-medium text-[#706B68]">
            <span>{item.venue}</span>
            {item.code && (
              <span className="px-2 py-0.5 rounded bg-[#EEE8F0] font-mono font-semibold text-[#382347]">
                Code: {item.code}
              </span>
            )}
          </div>
        )}

        {/* Description */}
        <p className="text-base text-[#171717] leading-relaxed mt-4 font-normal">
          {item.description}
        </p>

        {/* Responsibilities if club role */}
        {item.responsibilities && (
          <div className="mt-4 p-4 rounded-2xl bg-[#EEE8F0] border border-[#E4DED7]">
            <span className="text-xs font-bold font-mono tracking-wider text-[#382347] uppercase block mb-1">
              Key Contributions &amp; Scope:
            </span>
            <p className="text-sm text-[#171717] leading-relaxed">
              {item.responsibilities}
            </p>
          </div>
        )}

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6">
            {item.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-lg text-xs font-semibold bg-[#EEE8F0] border border-[#E4DED7] text-[#382347]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action Row */}
      <div className="mt-8 pt-6 border-t border-[#E4DED7] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => setGalleryOpen(!galleryOpen)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer shadow-xs border border-[#E4DED7] bg-white text-[#171717] hover:bg-[#E8D5F9] hover:text-[#382347] hover:border-[#E8D5F9] active:scale-98"
        >
          <span>{galleryOpen ? "HIDE GALLERY" : `${galleryLabel} →`}</span>
          <motion.span
            animate={{ rotate: galleryOpen ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="text-xs"
          >
            ▼
          </motion.span>
        </button>

        <span className="text-xs font-mono text-[#706B68]">
          2 Gallery Slots Available
        </span>
      </div>

      {/* Expandable 2-Image Gallery */}
      <AnimatePresence>
        {galleryOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden mt-6"
          >
            <div className="p-4 sm:p-6 rounded-2xl bg-white/80 border border-[#E4DED7]">
              <div className="flex flex-col sm:flex-row gap-4">
                <ImageSlot
                  src={item.image1}
                  alt={item.image1Label}
                  label={item.image1Label || "Image 01"}
                  number="IMAGE 01"
                />
                <ImageSlot
                  src={item.image2}
                  alt={item.image2Label}
                  label={item.image2Label || "Image 02"}
                  number="IMAGE 02"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DetailCard;
