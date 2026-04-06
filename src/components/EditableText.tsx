import React, { useState, useEffect } from 'react';
import { useFirebase } from '../context/FirebaseContext';
import { Edit2, Check, X } from 'lucide-react';

interface EditableTextProps {
  contentKey: string;
  defaultText: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

export default function EditableText({ contentKey, defaultText, className, as: Tag = 'span' }: EditableTextProps) {
  const { isAdmin, siteContent, updateSiteContent } = useFirebase();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(siteContent[contentKey] || defaultText);

  useEffect(() => {
    if (siteContent[contentKey]) {
      setText(siteContent[contentKey]);
    }
  }, [siteContent, contentKey]);

  const handleSave = async () => {
    await updateSiteContent(contentKey, text);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setText(siteContent[contentKey] || defaultText);
    setIsEditing(false);
  };

  if (isAdmin && isEditing) {
    return (
      <div className="inline-flex items-center gap-2 group relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={`bg-anthracite border border-gold-accent text-white p-2 rounded focus:outline-none focus:ring-1 focus:ring-gold-accent min-w-[200px] ${className}`}
          rows={3}
        />
        <div className="flex flex-col gap-1">
          <button onClick={handleSave} className="p-1 bg-green-500 text-white rounded hover:bg-green-600">
            <Check size={16} />
          </button>
          <button onClick={handleCancel} className="p-1 bg-red-500 text-white rounded hover:bg-red-600">
            <X size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <span className="group relative inline-block">
      <Tag className={className}>{text}</Tag>
      {isAdmin && (
        <button
          onClick={() => setIsEditing(true)}
          className="absolute top-0 -right-6 p-1 bg-gold-accent text-anthracite rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-40"
        >
          <Edit2 size={12} />
        </button>
      )}
    </span>
  );
}
