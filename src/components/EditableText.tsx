import React, { useState, useEffect, useRef } from 'react';
import { useFirebase } from '../context/FirebaseContext';
import { Edit2, Check, X, Bold, Italic, Type, MoveVertical } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface EditableTextProps {
  contentKey: string;
  defaultText: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

interface ContentData {
  text: string;
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
}

export default function EditableText({ contentKey, defaultText, className, as: Tag = 'span' }: EditableTextProps) {
  const { isAdmin, siteContent, updateSiteContent } = useFirebase();
  const [isEditing, setIsEditing] = useState(false);
  
  const rawContent = siteContent[contentKey];
  const initialData: ContentData = typeof rawContent === 'object' && rawContent !== null
    ? rawContent
    : { text: rawContent || defaultText };

  const [data, setData] = useState<ContentData>(initialData);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (siteContent[contentKey]) {
      const newRawContent = siteContent[contentKey];
      setData(typeof newRawContent === 'object' && newRawContent !== null
        ? newRawContent
        : { text: newRawContent }
      );
    }
  }, [siteContent, contentKey]);

  const handleSave = async () => {
    await updateSiteContent(contentKey, data);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setData(initialData);
    setIsEditing(false);
  };

  const insertText = (before: string, after: string = '') => {
    if (!textareaRef.current) return;
    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;
    const currentText = data.text;
    const selectedText = currentText.substring(start, end);
    const newText = currentText.substring(0, start) + before + selectedText + after + currentText.substring(end);
    setData({ ...data, text: newText });
    
    // Reset focus and selection
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(start + before.length, end + before.length);
      }
    }, 0);
  };

  const fontSizes = [
    { label: 'XS', value: '0.75rem' },
    { label: 'SM', value: '0.875rem' },
    { label: 'MD', value: '1rem' },
    { label: 'LG', value: '1.125rem' },
    { label: 'XL', value: '1.25rem' },
    { label: '2XL', value: '1.5rem' },
    { label: '3XL', value: '1.875rem' },
    { label: '4XL', value: '2.25rem' },
    { label: '5XL', value: '3rem' },
    { label: '6XL', value: '3.75rem' },
    { label: '7XL', value: '4.5rem' },
    { label: '8XL', value: '6rem' },
    { label: '9XL', value: '8rem' },
  ];

  const fontWeights = [
    { label: 'Thin', value: '100' },
    { label: 'Light', value: '300' },
    { label: 'Normal', value: '400' },
    { label: 'Medium', value: '500' },
    { label: 'Bold', value: '700' },
    { label: 'Black', value: '900' },
  ];

  const style: React.CSSProperties = {};
  if (data.fontSize) style.fontSize = data.fontSize;
  if (data.fontWeight) style.fontWeight = data.fontWeight;
  if (data.lineHeight) style.lineHeight = data.lineHeight;

  if (isAdmin && isEditing) {
    return (
      <div className="inline-block z-50 bg-anthracite border border-gold-accent p-4 rounded-lg shadow-2xl min-w-[300px]">
        {/* Toolbar */}
        <div className="flex flex-wrap gap-2 mb-3 pb-3 border-b border-white/10">
          <button onClick={() => insertText('**', '**')} className="p-1.5 hover:bg-white/10 rounded" title="Bold">
            <Bold size={16} />
          </button>
          <button onClick={() => insertText('*', '*')} className="p-1.5 hover:bg-white/10 rounded" title="Italic">
            <Italic size={16} />
          </button>
          <div className="h-6 w-px bg-white/10 mx-1" />
          
          <select 
            value={data.fontSize || ''} 
            onChange={(e) => setData({ ...data, fontSize: e.target.value })}
            className="bg-white/5 text-[10px] uppercase font-bold p-1 rounded border border-white/10"
          >
            <option value="">Veličina</option>
            {fontSizes.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
          </select>

          <select 
            value={data.fontWeight || ''} 
            onChange={(e) => setData({ ...data, fontWeight: e.target.value })}
            className="bg-white/5 text-[10px] uppercase font-bold p-1 rounded border border-white/10"
          >
            <option value="">Težina</option>
            {fontWeights.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
          </select>

          <div className="flex items-center gap-1 ml-auto">
            <button onClick={handleSave} className="p-1.5 bg-green-500/20 text-green-500 rounded hover:bg-green-500/30 transition-colors">
              <Check size={16} />
            </button>
            <button onClick={handleCancel} className="p-1.5 bg-red-500/20 text-red-500 rounded hover:bg-red-500/30 transition-colors">
              <X size={16} />
            </button>
          </div>
        </div>

        <textarea
          ref={textareaRef}
          value={data.text}
          onChange={(e) => setData({ ...data, text: e.target.value })}
          className="w-full bg-transparent text-white p-2 focus:outline-none min-h-[100px] font-mono text-sm"
          placeholder="Unesite tekst (podržava Markdown)..."
        />
        
        <div className="mt-2 text-[10px] text-white/30 uppercase tracking-widest flex justify-between">
          <span>Shift + Enter za novi red</span>
          <span>Markdown podržan</span>
        </div>
      </div>
    );
  }

  return (
    <span className="group relative inline-block max-w-full">
      <Tag className={`${className} whitespace-pre-wrap`} style={style}>
        <ReactMarkdown
          components={{
            p: ({ children }) => <span className="inline font-[inherit]">{children}</span>,
          }}
        >
          {data.text}
        </ReactMarkdown>
      </Tag>
      {isAdmin && (
        <button
          onClick={() => setIsEditing(true)}
          className="absolute -top-2 -right-2 p-1.5 bg-gold-accent text-anthracite rounded-full opacity-40 group-hover:opacity-100 transition-all z-40 shadow-lg hover:scale-110 active:scale-95"
          title="Uredi tekst"
        >
          <Edit2 size={10} />
        </button>
      )}
    </span>
  );
}
