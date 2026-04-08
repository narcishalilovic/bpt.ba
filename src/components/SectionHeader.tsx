import React from 'react';
import EditableText from './EditableText';

interface SectionHeaderProps {
  subtitleKey: string;
  subtitleDefault: string;
  titleKey: string;
  titleDefault: string;
  descriptionKey?: string;
  descriptionDefault?: string;
  className?: string;
  titleTag?: 'h1' | 'h2' | 'h3';
  dark?: boolean;
  centered?: boolean;
}

export default function SectionHeader({
  subtitleKey,
  subtitleDefault,
  titleKey,
  titleDefault,
  descriptionKey,
  descriptionDefault,
  className = "mb-16",
  titleTag = 'h2',
  dark = false,
  centered = false
}: SectionHeaderProps) {
  return (
    <div className={`${className} ${centered ? 'text-center' : 'text-left'}`}>
      <EditableText
        contentKey={subtitleKey}
        defaultText={subtitleDefault}
        as="span"
        className="font-display font-bold text-gold-accent text-sm uppercase tracking-[0.3em] mb-4 block"
      />
      <EditableText
        contentKey={titleKey}
        defaultText={titleDefault}
        as={titleTag}
        className={`text-4xl md:text-7xl font-black leading-none tracking-tighter uppercase ${dark ? 'text-white' : 'text-anthracite'}`}
      />
      {descriptionKey && descriptionDefault && (
        <div className={`mt-6 ${centered ? 'mx-auto' : ''}`}>
          <EditableText
            contentKey={descriptionKey}
            defaultText={descriptionDefault}
            as="div"
            className={`text-xl font-serif italic text-white/60 max-w-2xl ${centered ? 'mx-auto' : ''}`}
          />
        </div>
      )}
    </div>
  );
}
