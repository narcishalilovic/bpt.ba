import { motion } from 'motion/react';
import { History as HistoryIcon, Award, Landmark, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import EditableText from './EditableText';
import EditableImage from './EditableImage';

export default function History() {
  return (
    <section className="py-24 px-6 bg-white text-anthracite relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <EditableText
              contentKey="history_subtitle"
              defaultText="Naša baština"
              as="span"
              className="font-display font-bold text-gold-accent text-sm uppercase tracking-[0.3em] mb-4 block"
            />
            <EditableText
              contentKey="history_title"
              defaultText="TRADICIJA KOJA TRAJE OD 1953."
              as="h2"
              className="text-4xl md:text-7xl font-black leading-none tracking-tighter uppercase mb-8"
            />
            <div className="space-y-6 text-xl font-serif italic text-anthracite/70 leading-relaxed">
              <EditableText
                contentKey="history_p1"
                defaultText="Pozorište u Tešnju nije samo kulturna ustanova, ono je čuvar historije. Jeste li znali da je upravo u našem gradu odigrana prva pozorišna predstava u Bosni i Hercegovini?"
                as="div"
              />
              <EditableText
                contentKey="history_p2"
                defaultText="Od zvaničnog osnivanja 23. maja 1953. godine, Bosansko pozorište Tešanj postalo je epicentar umjetničkog izražaja, preživjevši decenije i transformišući se u modernu scenu koja danas spaja generacije."
                as="div"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-8 mt-12">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gold-accent/10 rounded-lg text-gold-accent">
                  <Landmark className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-display font-black text-lg uppercase">Prva scena</h4>
                  <p className="text-sm text-anthracite/50 font-serif italic">Kolijevka bh. teatra</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gold-accent/10 rounded-lg text-gold-accent">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-display font-black text-lg uppercase">70+ Godina</h4>
                  <p className="text-sm text-anthracite/50 font-serif italic">Kontinuiranog rada</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <Link to="/historijat" className="btn-primary inline-flex items-center gap-3">
                Istraži historijat <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden border-8 border-white shadow-2xl relative z-10">
              <EditableImage
                contentKey="history_image"
                defaultSrc="https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?q=80&w=800&auto=format&fit=crop"
                alt="Historija pozorišta"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-gold-accent/10 -z-0 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-gold-accent/20 -z-0 rounded-full blur-2xl" />
            
            <div className="absolute -bottom-6 -right-6 bg-anthracite text-white p-8 z-20 max-w-xs">
              <p className="text-xs font-display font-bold uppercase tracking-widest text-gold-accent mb-2">Zanimljivost</p>
              <EditableText
                contentKey="history_fun_fact"
                defaultText='"Prva predstava u Tešnju odigrana je davne 1898. godine, postavljajući temelje za sve što smo danas."'
                as="div"
                className="font-serif italic text-sm"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] font-black text-anthracite/[0.02] select-none pointer-events-none leading-none uppercase whitespace-nowrap">
        <span className="text-[#F2F2F2]/[0.03]">R</span>evolucija Pozorišta
      </div>
    </section>
  );
}
