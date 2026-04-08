import { motion } from 'motion/react';
import { Mic, BookOpen, Users, Coffee, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import EditableText from './EditableText';
import EditableImage from './EditableImage';

const benefits = [
  {
    slug: 'stvaraj',
    title: 'STVARAJ',
    description: 'Uđi u naš podcast studio i kreiraj sadržaj koji se čuje daleko.',
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop',
    icon: <Mic className="w-6 h-6" />,
    buttonText: 'Uđi u studio',
    color: 'bg-gold-accent',
  },
  {
    slug: 'uci',
    title: 'UČI',
    description: 'Usavrši svoje vještine kroz intenzivne glumačke i tehničke radionice.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop',
    icon: <BookOpen className="w-6 h-6" />,
    buttonText: 'Vidi radionice',
    color: 'bg-white',
  },
  {
    slug: 'volontiraj',
    title: 'VOLONTIRAJ',
    description: 'Budi dio tima koji organizuje najveće kulturne događaje u gradu.',
    image: 'https://images.unsplash.com/photo-1559027615-cd2671d19d81?q=80&w=800&auto=format&fit=crop',
    icon: <Users className="w-6 h-6" />,
    buttonText: 'Postani volonter',
    color: 'bg-gold-primary',
  },
  {
    slug: 'druzi-se',
    title: 'DRUŽI SE',
    description: 'Pronađi ekipu koja dijeli tvoju strast prema umjetnosti i zabavi.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop',
    icon: <Coffee className="w-6 h-6" />,
    buttonText: 'Pridruži se ekipi',
    color: 'bg-anthracite border border-white/20',
  },
];

import SectionHeader from './SectionHeader';

export default function YouthClub() {
  return (
    <section className="py-24 px-6 bg-white text-anthracite">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <SectionHeader
            subtitleKey="youth_club_subtitle"
            subtitleDefault="Omladinski klub"
            titleKey="youth_club_title"
            titleDefault="TVOJA SCENA, TVOJA PRAVILA"
            descriptionKey="youth_club_description"
            descriptionDefault="Pridruži se zajednici mladih kreativaca koji mijenjaju kulturnu sliku Tešnja."
            className="max-w-2xl mb-0"
          />
          <Link to="/omladinski-klub" className="btn-primary">
            Saznaj više
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative h-[500px] overflow-hidden flex flex-col justify-end p-8"
            >
              <Link to={`/omladinski-klub/${benefit.slug}`} className="absolute inset-0 z-20" />
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <EditableImage
                  contentKey={`youth_benefit_img_${benefit.slug}`}
                  defaultSrc={benefit.image}
                  alt={benefit.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-anthracite via-anthracite/40 to-transparent opacity-90" />
              </div>

              {/* Content */}
              <div className="relative z-10 text-white pointer-events-none">
                <div className="mb-4 inline-block p-3 bg-gold-accent text-anthracite rounded-full">
                  {benefit.icon}
                </div>
                <EditableText
                  contentKey={`youth_benefit_title_${benefit.slug}`}
                  defaultText={benefit.title}
                  as="h3"
                  className="text-3xl font-black mb-2 tracking-tight uppercase"
                />
                <EditableText
                  contentKey={`youth_benefit_desc_${benefit.slug}`}
                  defaultText={benefit.description}
                  as="div"
                  className="text-sm font-serif italic mb-6 line-clamp-2"
                />
                <div className="flex items-center gap-2 font-display font-bold text-xs uppercase tracking-widest text-gold-accent group-hover:text-white transition-colors">
                  <EditableText
                    contentKey={`youth_benefit_btn_${benefit.slug}`}
                    defaultText={benefit.buttonText}
                    as="span"
                  /> <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Decorative Border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold-accent/30 transition-colors duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
