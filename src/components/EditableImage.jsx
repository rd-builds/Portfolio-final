import React, { useState, useEffect } from 'react';

// ─── EditableImage ──────────────────────────────────────────────
// Image slot used across the achievement pages.
//   • src resolves  → renders the real image
//   • src missing/fails → renders a clean, same-size placeholder
// Never renders an emoji, a broken-image icon, or empty blank space.
// The placeholder occupies the exact same box as the image, so adding
// a real file later never changes the layout.
//
// `tone="light"` applies the detail-page placeholder palette (#EEE8F0).
// The default keeps the homepage's black Achievements section unchanged.

const EditableImage = ({
  src,
  alt = '',
  placeholder = 'ADD IMAGE',
  className = '',
  showSlotTag = true,
  tone = 'default',
}) => {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  const hasImage = Boolean(src) && !failed;

  const isLight = tone === 'light';

  const toneClasses = isLight
    ? {
        root: 'bg-[#EEE8F0] border-[#E4DED7]',
        tag: 'text-[#706B68]',
        label: 'text-[#382347]',
        path: 'text-[#706B68] bg-[#F6F3EE] border border-[#E4DED7]',
      }
    : {
        root: 'bg-[#ffffeb] border-dashed border-black/20',
        tag: 'text-black/40',
        label: 'text-black/60',
        path: 'text-black/35 bg-black/5',
      };

  return (
    <div className={`w-full h-full overflow-hidden ${className}`}>
      {hasImage ? (
        <img
          src={src}
          alt={alt || placeholder}
          loading="lazy"
          onError={() => setFailed(true)}
          className="w-full h-full object-cover"
        />
      ) : (
        <div
          className={`w-full h-full flex flex-col items-center justify-center gap-2 px-3 text-center border select-none ${toneClasses.root}`}
        >
          {showSlotTag && (
            <span className={`font-mono text-[10px] uppercase tracking-[0.22em] ${toneClasses.tag}`}>
              Image Slot
            </span>
          )}
          <span className={`text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] ${toneClasses.label}`}>
            {placeholder}
          </span>
          {src && (
            <span className={`font-mono text-[10px] max-w-full truncate px-2 py-0.5 rounded ${toneClasses.path}`}>
              {src}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default EditableImage;
