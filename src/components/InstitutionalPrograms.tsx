import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { School, GraduationCap, Baby, Clock, Target, Send, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { collection, onSnapshot, query, limit, orderBy } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import EditableText from './EditableText';

import SectionHeader from './SectionHeader';

export default function InstitutionalPrograms() {
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'institutionalPrograms'), orderBy('createdAt', 'desc'), limit(3));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPrograms(data);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'institutionalPrograms');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const getIcon = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('vrtić') || cat.includes('predškol')) return <Baby className="w-8 h-8 text-gold-accent" />;
    if (cat.includes('osnovn')) return <School className="w-8 h-8 text-gold-accent" />;
    if (cat.includes('srednj')) return <GraduationCap className="w-8 h-8 text-gold-accent" />;
    return <BookOpen className="w-8 h-8 text-gold-accent" />;
  };

  return (
    <section className="py-24 px-6 bg-anthracite text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <SectionHeader
            subtitleKey="inst_programs_subtitle"
            subtitleDefault="Institucionalna saradnja"
            titleKey="inst_programs_title"
            titleDefault="PROGRAMI ZA OBRAZOVNE USTANOVE"
            descriptionKey="inst_programs_description"
            descriptionDefault="Pozorište nije samo zgrada, već učionica bez zidova. Naši programi su pažljivo kreirani da dopune školski plan i program kroz umjetnost."
            className="max-w-2xl mb-0"
            dark={true}
          />
          <Link to="/institucionalna-saradnja" className="btn-outline">
            Saznaj više
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12">Učitavanje programa...</div>
        ) : programs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative h-[450px] overflow-hidden flex flex-col justify-end p-8 border border-white/10 hover:border-gold-accent/50 transition-all duration-500"
              >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={program.image || null}
                    alt={program.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-anthracite via-anthracite/80 to-anthracite/40 transition-opacity duration-500 group-hover:opacity-90" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="mb-6 flex justify-between items-start">
                    <div className="p-3 bg-gold-accent text-anthracite rounded-lg">
                      {getIcon(program.category)}
                    </div>
                    <Send className="w-5 h-5 text-gold-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  
                  <span className="font-display font-bold text-gold-accent text-[10px] uppercase tracking-[0.2em] mb-2 block">
                    {program.category}
                  </span>
                  <h3 className="text-2xl font-black tracking-tight uppercase mb-4 group-hover:text-gold-accent transition-colors leading-none">
                    {program.title}
                  </h3>
                  
                  <p className="text-sm text-white/70 font-serif italic leading-relaxed mb-8 line-clamp-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    {program.goal}
                  </p>

                  <div className="flex flex-col gap-3 pt-6 border-t border-white/20">
                    <div className="flex items-center gap-2 text-[10px] font-display font-bold uppercase tracking-widest text-white/60">
                      <Clock className="w-3 h-3 text-gold-accent" /> {program.duration}
                    </div>
                    <Link 
                      to="/institucionalna-saradnja" 
                      className="text-[10px] font-display font-bold uppercase tracking-widest text-gold-accent hover:text-white transition-colors inline-flex items-center gap-2"
                    >
                      Detalji programa <Target className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-white/40">Trenutno nema objavljenih programa.</div>
        )}
      </div>
    </section>
  );
}
