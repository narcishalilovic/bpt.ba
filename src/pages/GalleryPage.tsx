import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Maximize2, Filter } from 'lucide-react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import EditableText from '../components/EditableText';

const categories = ['Sve', 'Predstave', 'Omladinski klub', 'Historija', 'Događaji'];

interface GalleryImage {
  id: string;
  category: string;
  title: string;
  src: string;
}

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('Sve');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [dynamicCategories, setDynamicCategories] = useState<string[]>(['Sve']);

  useEffect(() => {
    const q = query(collection(db, 'gallery'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as GalleryImage));
      setGalleryImages(data);
      
      // Extract unique categories
      const cats = Array.from(new Set(data.map(img => img.category))).filter(Boolean);
      setDynamicCategories(['Sve', ...cats.sort()]);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'gallery');
    });

    return () => unsubscribe();
  }, []);

  const filteredImages = activeCategory === 'Sve' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <div className="min-h-screen bg-anthracite pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <EditableText
            contentKey="gallery_subtitle"
            defaultText="Multimedija"
            as="span"
            className="font-display font-bold text-gold-accent text-sm uppercase tracking-[0.3em] mb-4 block"
          />
          <EditableText
            contentKey="gallery_title"
            defaultText="NAŠA GALERIJA"
            as="h1"
            className="text-6xl md:text-8xl font-black leading-none tracking-tighter uppercase mb-8"
          />
          <EditableText
            contentKey="gallery_description"
            defaultText="Zavirite u svijet iza zavjese. Od historijskih trenutaka do najnovijih premijera našeg Omladinskog kluba."
            as="div"
            className="text-xl font-serif italic text-white/60 max-w-2xl"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-12 items-center">
          <div className="flex items-center gap-2 text-gold-accent mr-4">
            <Filter size={18} />
            <span className="font-display font-bold text-xs uppercase tracking-widest">Filtriraj:</span>
          </div>
          {dynamicCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 font-display font-bold text-xs uppercase tracking-widest transition-all border-2 ${
                activeCategory === cat 
                  ? 'bg-gold-accent border-gold-accent text-anthracite' 
                  : 'border-white/10 text-white/60 hover:border-gold-accent/50 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredImages.length > 0 ? (
              filteredImages.map((image) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group relative aspect-[4/3] overflow-hidden cursor-pointer bg-white/5"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image.src || null}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <span className="text-gold-accent text-[10px] font-display font-bold uppercase tracking-widest mb-2 block">
                        {image.category}
                      </span>
                      <h3 className="text-xl font-display font-black uppercase tracking-tight text-white mb-4">
                        {image.title}
                      </h3>
                      <div className="flex items-center gap-2 text-white/60 text-xs font-display font-bold uppercase tracking-widest">
                        <Maximize2 size={14} />
                        <span>Uvećaj</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-white/40 italic col-span-full">Nema dostupnih slika u ovoj kategoriji.</p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-anthracite/95 backdrop-blur-xl flex items-center justify-center p-6 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-8 right-8 text-white hover:text-gold-accent transition-colors z-[110]"
              onClick={() => setSelectedImage(null)}
            >
              <X size={40} />
            </button>
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-6xl w-full max-h-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src || null}
                alt={selectedImage.title}
                className="max-w-full max-h-[80vh] object-contain shadow-2xl border border-white/10"
                referrerPolicy="no-referrer"
              />
              <div className="mt-8 text-center">
                <span className="text-gold-accent font-display font-bold text-sm uppercase tracking-widest mb-2 block">
                  {selectedImage.category}
                </span>
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">
                  {selectedImage.title}
                </h2>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
