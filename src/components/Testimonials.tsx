import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import EditableText from './EditableText';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  image: string;
}

import SectionHeader from './SectionHeader';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'testimonials'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Testimonial));
      setTestimonials(data);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'testimonials');
    });

    return () => unsubscribe();
  }, []);

  return (
    <section className="py-24 px-6 bg-anthracite relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gold-accent/5 -skew-x-12 translate-x-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader
          subtitleKey="testimonials_subtitle"
          subtitleDefault="Riječ zajednice"
          titleKey="testimonials_title"
          titleDefault="ŠTA KAŽU NAŠI ČLANOVI I PRIJATELJI"
          dark={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.length > 0 ? (
            testimonials.map((t, index) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 border border-white/10 p-8 md:p-12 relative group hover:border-gold-accent/50 transition-colors"
              >
                <Quote className="absolute top-8 right-8 w-12 h-12 text-gold-accent/20 group-hover:text-gold-accent/40 transition-colors" />
                
                <p className="text-xl md:text-2xl font-serif italic mb-8 relative z-10 leading-relaxed">
                  "{t.quote}"
                </p>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gold-accent/30">
                    <img 
                      src={t.image || `https://picsum.photos/seed/${t.id}/200/200`} 
                      alt={t.author} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-white uppercase tracking-wider">
                      {t.author}
                    </h4>
                    <p className="text-xs text-gold-accent font-display font-medium uppercase tracking-widest">
                      {t.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-white/40 italic">Nema dostupnih recenzija. Dodajte ih u Admin Panelu.</p>
          )}
        </div>
      </div>
    </section>
  );
}

