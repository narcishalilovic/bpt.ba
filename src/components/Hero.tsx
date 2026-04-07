import { motion } from 'motion/react';
import { ArrowRight, Users, Heart, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import EditableText from './EditableText';
import EditableImage from './EditableImage';

const features = [
  {
    title: 'Aktuelni projekti',
    icon: <Play className="w-6 h-6" />,
    description: 'Pogledajte šta trenutno pripremamo na daskama koje život znače.',
    link: '/aktivnosti',
  },
  {
    title: 'Postani član',
    icon: <Users className="w-6 h-6" />,
    description: 'Pridruži se našoj glumačkoj porodici i otkrij svoj talenat.',
    link: '/ukljuci-se',
  },
  {
    title: 'Podrži naš rad',
    icon: <Heart className="w-6 h-6" />,
    description: 'Tvoja podrška nam omogućava da stvaramo umjetnost bez granica.',
    link: '/podrzi-nas',
  },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden bg-anthracite">
      {/* Background Media with Overlay */}
      <div className="absolute inset-0 z-0">
        <EditableImage
          contentKey="hero_bg_new"
          defaultSrc="https://github.com/narcishalilovic/bpt.ba/blob/main/assets/Hero-bpt.webp?raw=true"
          alt="Pozorište Tešanj"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          alwaysShowButton={true}
          fixed={true}
        />
        {/* Simple dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-4xl"
        >
          <div className="font-display font-bold text-sm uppercase tracking-[0.3em] mb-4 block">
            <span className="text-[#F2F2F2]">R</span><EditableText
              contentKey="hero_subtitle"
              defaultText="EVOLUCIJA POZORIŠTA"
              as="span"
              className="text-gold-accent"
            />
          </div>
          <h1 className="text-5xl md:text-8xl font-black leading-[0.75] mb-12 tracking-tighter uppercase flex flex-col">
            <EditableText
              contentKey="hero_title_part1"
              defaultText="STVARAMO UMJETNOST KOJA "
              as="span"
              className="relative z-0"
            />
            <EditableText
              contentKey="hero_title_part2"
              defaultText="POKREĆE TEŠANJ"
              as="span"
              className="text-gold-accent -mt-[0.2em] relative z-10"
            />
          </h1>
          <EditableText
            contentKey="hero_description"
            defaultText='"Više od glume. Mjesto gdje stvaramo budućnost kulture."'
            as="div"
            className="text-xl md:text-2xl text-white/70 max-w-2xl mb-12 italic"
          />
        </motion.div>

        {/* Feature Grid - Minimalist Icons and Text */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
            >
              <Link
                to={feature.link}
                className="group block transition-all duration-500 hover:-translate-y-1"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-gold-accent transition-transform duration-300 group-hover:scale-110">
                    {feature.icon}
                  </div>
                  <EditableText
                    contentKey={`hero_feature_title_${index}`}
                    defaultText={feature.title}
                    as="h3"
                    className="text-xl font-black tracking-tight uppercase group-hover:text-gold-accent transition-colors text-white"
                  />
                </div>
                <EditableText
                  contentKey={`hero_feature_desc_${index}`}
                  defaultText={feature.description}
                  as="p"
                  className="text-sm text-white/50 font-serif leading-relaxed group-hover:text-white/80 transition-colors"
                />
                <div className="mt-4 flex items-center text-[10px] font-display font-bold uppercase tracking-widest text-gold-accent opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0">
                  Saznaj više <ArrowRight className="ml-2 w-3 h-3" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-gold-accent to-transparent" />
      </motion.div>
    </section>
  );
}
