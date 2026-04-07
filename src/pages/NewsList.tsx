import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Search, ArrowRight, Link as LinkIcon, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { formatDate } from '../lib/dateUtils';

interface NewsItem {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
  content: string;
  lead?: string;
}

export default function NewsList() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyLink = (id: string) => {
    const url = `${window.location.origin}/vijesti/${id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  useEffect(() => {
    const q = query(collection(db, 'news'), orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as NewsItem));
      setNews(data);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'news');
    });

    return () => unsubscribe();
  }, []);

  const filteredNews = news.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-32 pb-24 bg-white text-anthracite">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 border-b-2 border-anthracite pb-12">
          <div className="max-w-2xl">
            <span className="font-display font-bold text-gold-accent text-sm uppercase tracking-[0.3em] mb-4 block">
              Novosti
            </span>
            <h1 className="text-5xl md:text-8xl font-black leading-none tracking-tighter uppercase">
              MAGAZIN <span className="text-gold-accent">POZORIŠTA</span> TEŠANJ
            </h1>
          </div>
          <div className="relative w-full md:w-80">
            <input 
              type="text" 
              placeholder="Pretraži npr. radionice 2025" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-anthracite/5 border-b-2 border-anthracite/20 px-4 py-3 font-serif italic focus:outline-none focus:border-gold-accent"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-anthracite/40" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {filteredNews.length > 0 ? (
            filteredNews.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col group"
              >
                <Link to={`/vijesti/${item.id}`} className="block overflow-hidden mb-8 aspect-[16/10]">
                  <img
                    src={item.image || `https://picsum.photos/seed/${item.id}/800/600`}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                    referrerPolicy="no-referrer"
                  />
                </Link>

                <div className="flex items-center gap-4 mb-6">
                  <span className="px-4 py-1 bg-gold-accent/10 text-gold-accent font-display font-bold text-[10px] uppercase tracking-widest">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] font-display font-bold text-anthracite/40 uppercase tracking-widest">
                    <Calendar className="w-3 h-3" /> {formatDate(item.date)}
                  </div>
                </div>

                <Link to={`/vijesti/${item.id}`}>
                  <h2 className="text-3xl font-black leading-tight tracking-tight uppercase mb-6 hover:text-gold-accent transition-colors">
                    {item.title}
                  </h2>
                </Link>

                <p className="text-lg font-serif italic text-anthracite/70 mb-8 line-clamp-3 leading-relaxed">
                  {item.lead || item.content}
                </p>

                <div className="mt-auto pt-8 border-t border-anthracite/10 flex justify-between items-center">
                  <Link 
                    to={`/vijesti/${item.id}`}
                    className="inline-flex items-center gap-3 font-display font-bold text-xs uppercase tracking-widest text-anthracite hover:text-gold-accent transition-colors"
                  >
                    Pročitaj cijelu priču <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button 
                    onClick={() => copyLink(item.id)}
                    className="text-anthracite/30 hover:text-gold-accent transition-colors relative"
                    title="Kopiraj link"
                  >
                    {copiedId === item.id ? <Check className="w-4 h-4 text-green-500" /> : <LinkIcon className="w-4 h-4" />}
                    {copiedId === item.id && (
                      <span className="absolute -top-8 right-0 bg-anthracite text-white text-[8px] py-1 px-2 rounded whitespace-nowrap">
                        Kopirano!
                      </span>
                    )}
                  </button>
                </div>
              </motion.article>
            ))
          ) : (
            <p className="text-anthracite/40 italic col-span-full">Nema pronađenih vijesti.</p>
          )}
        </div>
      </div>
    </div>
  );
}
