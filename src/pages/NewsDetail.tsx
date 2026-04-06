import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Facebook, Twitter, Link as LinkIcon, Check } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';

interface NewsItem {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
  content: string;
  lead?: string;
  author?: string;
}

export default function NewsDetail() {
  const { id } = useParams();
  const [item, setItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = item?.title || 'Bosansko Pozorište Tešanj';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (!id) return;

    const fetchItem = async () => {
      try {
        const docRef = doc(db, 'news', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setItem({ id: docSnap.id, ...docSnap.data() } as NewsItem);
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, `news/${id}`);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 px-6 flex items-center justify-center">
        <div className="animate-pulse text-gold-accent font-display font-bold uppercase tracking-widest">Učitavanje...</div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen pt-32 px-6 flex flex-col items-center justify-center text-center">
        <h1 className="text-6xl font-black uppercase mb-8">Vijest nije pronađena</h1>
        <Link to="/hronika-utjecaja" className="btn-primary">Povratak na sve vijesti</Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen pt-32 pb-24 bg-white text-anthracite">
      <div className="max-w-4xl mx-auto px-6">
        <Link to="/hronika-utjecaja" className="inline-flex items-center gap-2 font-display font-bold text-xs uppercase tracking-widest text-anthracite/40 hover:text-gold-accent transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" /> Povratak na hroniku utjecaja
        </Link>

        <div className="mb-12">
          <span className="px-4 py-1 bg-gold-accent/10 text-gold-accent font-display font-bold text-xs uppercase tracking-widest mb-6 inline-block">
            {item.category}
          </span>
          <h1 className="text-4xl md:text-7xl font-black leading-none tracking-tighter uppercase mb-8">
            {item.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-8 border-y border-anthracite/10 py-6">
            <div className="flex items-center gap-2 text-xs font-display font-bold uppercase tracking-widest text-anthracite/60">
              <Calendar className="w-4 h-4 text-gold-accent" /> {item.date}
            </div>
            <div className="flex items-center gap-2 text-xs font-display font-bold uppercase tracking-widest text-anthracite/60">
              <User className="w-4 h-4 text-gold-accent" /> {item.author || 'Redakcija'}
            </div>
            <div className="flex flex-wrap items-center gap-6 ml-auto">
              <span className="text-[10px] font-display font-bold uppercase tracking-widest text-anthracite/30">Podijeli:</span>
              <div className="flex items-center gap-4">
                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-anthracite/40 hover:text-blue-600 transition-colors"
                  title="Podijeli na Facebooku"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a 
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-anthracite/40 hover:text-black transition-colors"
                  title="Podijeli na X (Twitter)"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <button 
                  onClick={copyToClipboard}
                  className="text-anthracite/40 hover:text-gold-accent transition-colors relative"
                  title="Kopiraj link"
                >
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <LinkIcon className="w-4 h-4" />}
                  {copied && (
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-anthracite text-white text-[8px] py-1 px-2 rounded whitespace-nowrap">
                      Kopirano!
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16 aspect-video overflow-hidden">
          <img
            src={item.image || `https://picsum.photos/seed/${item.id}/1200/800`}
            alt={item.title}
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="max-w-2xl mx-auto">
          {(item.lead || item.content) && (
            <p className="text-2xl md:text-3xl font-serif italic text-anthracite/80 leading-relaxed mb-12 border-l-4 border-gold-accent pl-8">
              {item.lead || item.content.substring(0, 150) + '...'}
            </p>
          )}
          
          <div className="prose prose-lg font-serif text-anthracite/70 leading-relaxed space-y-8 whitespace-pre-wrap">
            {item.content}
          </div>

          <div className="mt-24 p-12 bg-gold-accent text-anthracite text-center">
            <h4 className="text-3xl font-black uppercase mb-4 tracking-tighter">Postani i ti dio priče</h4>
            <p className="text-lg font-serif italic mb-8 opacity-80">Pridruži se našem omladinskom klubu i počni stvarati promjenu već danas.</p>
            <Link to="/ukljuci-se" className="btn-outline border-anthracite text-anthracite hover:bg-anthracite hover:text-white">Učlani se</Link>
          </div>
        </div>
      </div>
    </article>
  );
}
