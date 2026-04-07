import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Calendar, Link as LinkIcon, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import EditableText from './EditableText';
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

export default function News() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyLink = (id: string) => {
    const url = `${window.location.origin}/vijesti/${id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  useEffect(() => {
    const q = query(collection(db, 'news'), orderBy('date', 'desc'), limit(3));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as NewsItem));
      setNews(data);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'news');
    });

    return () => unsubscribe();
  }, []);

  return (
    <section className="py-24 px-6 bg-off-white text-anthracite border-t border-anthracite/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 border-b-2 border-anthracite pb-8">
          <div className="max-w-2xl">
            <EditableText
              contentKey="news_subtitle"
              defaultText="Novosti"
              as="span"
              className="font-display font-bold text-gold-accent text-sm uppercase tracking-[0.3em] mb-4 block"
            />
            <EditableText
              contentKey="news_title"
              defaultText="VIJESTI KOJE STVARAJU PROMJENU"
              as="h2"
              className="text-4xl md:text-7xl font-black leading-none tracking-tighter uppercase"
            />
          </div>
          <Link to="/hronika-utjecaja" className="btn-outline border-anthracite text-anthracite hover:bg-anthracite hover:text-white">
            Sve vijesti
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {news.length > 0 ? (
            news.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col group"
              >
                <Link to={`/vijesti/${item.id}`} className="block overflow-hidden mb-6 aspect-[16/10]">
                  <img
                    src={item.image || `https://picsum.photos/seed/${item.id}/800/600`}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                    referrerPolicy="no-referrer"
                  />
                </Link>

                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-gold-accent/10 text-gold-accent font-display font-bold text-[10px] uppercase tracking-widest">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] font-display font-bold text-anthracite/40 uppercase tracking-widest">
                    <Calendar className="w-3 h-3" /> {formatDate(item.date)}
                  </div>
                </div>

                <Link to={`/vijesti/${item.id}`}>
                  <h3 className="text-2xl md:text-3xl font-black leading-tight tracking-tight uppercase mb-4 hover:text-gold-accent transition-colors">
                    {item.title}
                  </h3>
                </Link>

                <p className="text-base font-serif italic text-anthracite/70 mb-6 line-clamp-3">
                  {item.lead || item.content}
                </p>

                <div className="mt-auto pt-6 border-t border-anthracite/10 flex justify-between items-center">
                  <Link 
                    to={`/vijesti/${item.id}`}
                    className="inline-flex items-center gap-2 font-display font-bold text-xs uppercase tracking-widest text-anthracite hover:text-gold-accent transition-colors"
                  >
                    Pročitaj više <ArrowRight className="w-4 h-4" />
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
            <p className="text-anthracite/40 italic col-span-full">Nema dostupnih vijesti. Dodajte ih u Admin Panelu.</p>
          )}
        </div>

        {/* Newsletter Signup Integrated in News Section */}
        <div className="mt-24 p-12 bg-gold-accent text-anthracite flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <h4 className="text-3xl font-black uppercase tracking-tight mb-2">Pratite naš utjecaj</h4>
            <p className="text-anthracite/70 font-serif italic">Prijavite se na naš mjesečni newsletter i budite prvi koji će saznati o novim projektima i uspjesima naših članova.</p>
          </div>
          <div className="flex w-full md:w-auto gap-2">
            <input 
              type="email" 
              placeholder="Vaša e-mail adresa" 
              className="bg-anthracite/5 border border-anthracite/10 px-6 py-3 font-serif italic focus:outline-none focus:border-anthracite w-full md:w-64 text-anthracite placeholder:text-anthracite/40"
            />
            <button className="btn-primary bg-anthracite text-white hover:bg-black whitespace-nowrap">Prijavi se</button>
          </div>
        </div>
      </div>
    </section>
  );
}
