import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useFirebase } from '../context/FirebaseContext';
import { Edit2, Check, X, Image as ImageIcon, Upload, Loader2 } from 'lucide-react';
import { uploadFile } from '../firebase';

interface EditableImageProps {
  contentKey: string;
  defaultSrc: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  alwaysShowButton?: boolean;
  fixed?: boolean;
  referrerPolicy?: 'no-referrer' | 'origin' | 'unsafe-url';
}

export default function EditableImage({ 
  contentKey, 
  defaultSrc, 
  alt, 
  className, 
  containerClassName,
  alwaysShowButton = false,
  fixed = false,
  referrerPolicy = 'origin' 
}: EditableImageProps) {
  const { isAdmin, siteContent, updateSiteContent } = useFirebase();
  const [isEditing, setIsEditing] = useState(false);
  
  const rawSrc = siteContent[contentKey];
  const [src, setSrc] = useState(typeof rawSrc === 'string' && rawSrc ? rawSrc : defaultSrc);
  
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const currentRawSrc = siteContent[contentKey];
    if (typeof currentRawSrc === 'string' && currentRawSrc) {
      setSrc(currentRawSrc);
    } else if (!currentRawSrc) {
      setSrc(defaultSrc);
    }
  }, [siteContent, contentKey, defaultSrc]);

  const handleSave = async () => {
    await updateSiteContent(contentKey, src);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setSrc(siteContent[contentKey] || defaultSrc);
    setIsEditing(false);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const fileName = `${Date.now()}_${file.name}`;
      const downloadURL = await uploadFile(file, `site-content/${fileName}`);
      setSrc(downloadURL);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Greška pri učitavanju fotografije.');
    } finally {
      setIsUploading(false);
    }
  };

  const renderModal = () => {
    if (!isEditing) return null;

    return createPortal(
      <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center p-4 z-[9999] backdrop-blur-sm">
        <div className="bg-anthracite border border-gold-accent p-8 rounded-xl shadow-2xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
          <h3 className="text-xl font-display font-bold text-white mb-6 uppercase tracking-wider">Uredi fotografiju</h3>
          
          <div className="flex flex-col gap-4 mb-8 w-full">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold">URL Fotografije</label>
              <div className="flex items-center gap-2">
                <ImageIcon size={18} className="text-gold-accent shrink-0" />
                <input
                  type="text"
                  value={src}
                  onChange={(e) => setSrc(e.target.value)}
                  placeholder="Unesite URL slike..."
                  className="bg-black/40 border border-white/10 text-white p-3 rounded focus:outline-none focus:ring-1 focus:ring-gold-accent w-full text-sm"
                />
              </div>
            </div>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold">
                <span className="bg-anthracite px-2 text-white/30">ili</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Učitaj datoteku</label>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="w-full py-4 border-2 border-dashed border-white/10 text-white/60 rounded-xl hover:border-gold-accent hover:text-gold-accent flex flex-col items-center justify-center gap-2 transition-all group"
              >
                {isUploading ? (
                  <Loader2 size={24} className="animate-spin text-gold-accent" />
                ) : (
                  <Upload size={24} className="group-hover:scale-110 transition-transform" />
                )}
                <span className="text-xs font-bold uppercase tracking-widest">
                  {isUploading ? 'Učitavanje...' : 'Odaberi datoteku'}
                </span>
              </button>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-white/10">
            <button 
              onClick={handleSave} 
              disabled={isUploading} 
              className="flex-1 py-3 bg-gold-accent text-anthracite font-bold rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-2 text-xs uppercase tracking-widest disabled:opacity-50"
            >
              <Check size={16} /> Sačuvaj
            </button>
            <button 
              onClick={handleCancel} 
              disabled={isUploading} 
              className="flex-1 py-3 bg-white/5 text-white font-bold rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-xs uppercase tracking-widest disabled:opacity-50"
            >
              <X size={16} /> Odustani
            </button>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <div className={`group relative inline-block w-full h-full ${containerClassName}`}>
      <img src={src || null} alt={alt} className={`z-0 ${className}`} referrerPolicy={referrerPolicy} />
      {isAdmin && (
        <button
          onClick={() => setIsEditing(true)}
          className={`${fixed ? 'fixed top-32 right-10' : 'absolute bottom-4 right-4'} p-3 bg-gold-accent text-anthracite rounded-full transition-all z-50 shadow-2xl pointer-events-auto hover:scale-110 active:scale-95 ${alwaysShowButton ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`}
          title="Uredi fotografiju"
        >
          <Edit2 size={18} />
        </button>
      )}
      {renderModal()}
    </div>
  );
}
