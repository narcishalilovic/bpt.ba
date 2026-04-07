import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { FileText, Download, Search, Filter, ChevronRight } from 'lucide-react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import EditableText from '../components/EditableText';

interface Document {
  id: string;
  title: string;
  categoryId: string;
  url: string;
  createdAt: string;
}

interface Category {
  id: string;
  name: string;
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Sve');

  useEffect(() => {
    // Fetch Categories
    const qCat = query(collection(db, 'documentCategories'), orderBy('name', 'asc'));
    const unsubCat = onSnapshot(qCat, (snapshot) => {
      setCategories(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Category)));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'documentCategories');
    });

    // Fetch Documents
    const qDoc = query(collection(db, 'documents'), orderBy('createdAt', 'desc'));
    const unsubDoc = onSnapshot(qDoc, (snapshot) => {
      setDocuments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Document)));
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'documents');
      setLoading(false);
    });

    return () => {
      unsubCat();
      unsubDoc();
    };
  }, []);

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'Sve' || doc.categoryId === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-anthracite pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <EditableText
            contentKey="docs_subtitle"
            defaultText="Transparentnost"
            as="span"
            className="font-display font-bold text-gold-accent text-sm uppercase tracking-[0.3em] mb-4 block"
          />
          <EditableText
            contentKey="docs_title"
            defaultText="PROPISI I AKTI"
            as="h1"
            className="text-6xl md:text-8xl font-black leading-none tracking-tighter uppercase mb-8"
          />
          <EditableText
            contentKey="docs_description"
            defaultText="Pristupite zvaničnim dokumentima, pravilnicima i izvještajima o radu Bosanskog pozorišta Tešanj."
            as="div"
            className="text-xl font-serif italic text-white/60 max-w-2xl"
          />
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-start md:items-center justify-between">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveCategory('Sve')}
              className={`px-6 py-2 font-display font-bold text-[10px] uppercase tracking-widest transition-all border-2 ${
                activeCategory === 'Sve' 
                  ? 'bg-gold-accent border-gold-accent text-anthracite' 
                  : 'border-white/10 text-white/60 hover:border-gold-accent/50 hover:text-white'
              }`}
            >
              Sve
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-2 font-display font-bold text-[10px] uppercase tracking-widest transition-all border-2 ${
                  activeCategory === cat.id 
                    ? 'bg-gold-accent border-gold-accent text-anthracite' 
                    : 'border-white/10 text-white/60 hover:border-gold-accent/50 hover:text-white'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
            <input
              type="text"
              placeholder="Pretraži dokumente..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 text-white pl-12 pr-4 py-3 rounded focus:outline-none focus:ring-1 focus:ring-gold-accent font-display font-bold text-xs uppercase tracking-widest"
            />
          </div>
        </div>

        {/* Documents List */}
        {loading ? (
          <div className="text-center py-24 text-white/40">Učitavanje dokumenata...</div>
        ) : filteredDocuments.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {filteredDocuments.map((doc, index) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group bg-white/5 border border-white/10 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:border-gold-accent/50 transition-all"
              >
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-gold-accent/10 rounded flex items-center justify-center text-gold-accent group-hover:bg-gold-accent group-hover:text-anthracite transition-all">
                    <FileText size={24} />
                  </div>
                  <div>
                    <span className="text-[10px] font-display font-bold uppercase tracking-widest text-gold-accent mb-1 block">
                      {categories.find(c => c.id === doc.categoryId)?.name || 'Opšte'}
                    </span>
                    <h3 className="text-xl font-display font-black uppercase tracking-tight text-white group-hover:text-gold-accent transition-colors">
                      {doc.title}
                    </h3>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 md:flex-none btn-outline py-2 px-6 flex items-center justify-center gap-2 text-xs"
                  >
                    <Download size={14} /> Preuzmi PDF
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 border-2 border-dashed border-white/5 rounded-xl">
            <FileText className="w-12 h-12 text-white/10 mx-auto mb-4" />
            <p className="text-white/40 italic">Nema pronađenih dokumenata koji odgovaraju vašoj pretrazi.</p>
          </div>
        )}
      </div>
    </div>
  );
}
