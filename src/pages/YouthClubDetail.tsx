import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Mic, BookOpen, Users, Coffee, CheckCircle2 } from 'lucide-react';
import EditableText from '../components/EditableText';
import EditableImage from '../components/EditableImage';

const detailContent = {
  stvaraj: {
    title: 'STVARAJ - Podcast Studio',
    subtitle: 'Tvoj glas, tvoja priča, tvoja publika.',
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1200&auto=format&fit=crop',
    icon: <Mic className="w-12 h-12 text-gold-accent" />,
    description: 'Naš omladinski podcast studio opremljen je vrhunskom audio opremom koja ti omogućava da snimaš emisije, intervjue ili audio drame. Bez obzira jesi li početnik ili već imaš iskustva, naš tim je tu da ti pomogne u tehničkoj realizaciji tvojih ideja.',
    benefits: [
      'Besplatno korištenje profesionalne opreme',
      'Edukacija o audio montaži i produkciji',
      'Pomoć u distribuciji na streaming platforme',
      'Mogućnost ugošćavanja zanimljivih sagovornika'
    ]
  },
  uci: {
    title: 'UČI - Radionice i Edukacija',
    subtitle: 'Otkrij talente za koje nisi ni znao da ih imaš.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop',
    icon: <BookOpen className="w-12 h-12 text-gold-accent" />,
    description: 'Kroz naše radionice prolazimo sve aspekte teatra i moderne produkcije. Od glumačkih tehnika, scenskog pokreta i govora, pa sve do dizajna svjetla, zvuka i scenografije. Naši mentori su iskusni profesionalci koji vole prenositi znanje.',
    benefits: [
      'Glumačke radionice za sve uzraste',
      'Tehnička obuka (svjetlo, zvuk, video)',
      'Pisanje dramskih tekstova i scenarija',
      'Certifikati o završenim edukacijama'
    ]
  },
  volontiraj: {
    title: 'VOLONTIRAJ - Budi dio tima',
    subtitle: 'Iskustvo koje se ne uči u školi.',
    image: 'https://images.unsplash.com/photo-1559027615-cd2671d19d81?q=80&w=1200&auto=format&fit=crop',
    icon: <Users className="w-12 h-12 text-gold-accent" />,
    description: 'Volonteri su srce našeg pozorišta. Kao volonter, imaš priliku vidjeti kako funkcioniše institucija kulture iznutra, učestvovati u organizaciji festivala, premijera i gostovanja, te steći neprocjenjivo iskustvo u radu s ljudima.',
    benefits: [
      'Organizacija velikih kulturnih događaja',
      'Rad u dinamičnom i kreativnom okruženju',
      'Besplatan ulaz na sve predstave i događaje',
      'Preporuke za buduće zaposlenje'
    ]
  },
  'druzi-se': {
    title: 'DRUŽI SE - Omladinski klub',
    subtitle: 'Mjesto gdje ideje postaju stvarnost uz kafu.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop',
    icon: <Coffee className="w-12 h-12 text-gold-accent" />,
    description: 'Naš klub nije samo prostor, to je zajednica. Mjesto gdje se mladi okupljaju da razmijene ideje, planiraju nove projekte ili se jednostavno opuste nakon škole. Ovdje su nastale neke od naših najboljih predstava.',
    benefits: [
      'Otvoren prostor za rad i druženje',
      'Tematske večeri, kvizovi i filmske projekcije',
      'Podrška za tvoje samostalne projekte',
      'Nova prijateljstva i networking'
    ]
  }
};

export default function YouthClubDetail() {
  const { id } = useParams<{ id: string }>();
  const content = detailContent[id as keyof typeof detailContent];

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-anthracite text-white">
        <div className="text-center">
          <h2 className="text-4xl font-black mb-4">STRANICA NIJE PRONAĐENA</h2>
          <Link to="/" className="btn-primary">Povratak na početnu</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-anthracite text-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-gold-accent hover:text-white transition-colors mb-12 font-display font-bold text-xs uppercase tracking-widest">
          <ArrowLeft className="w-4 h-4" /> Nazad na početnu
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8">{content.icon}</div>
            <EditableText
              contentKey={`youth_detail_title_${id}`}
              defaultText={content.title}
              as="h1"
              className="text-5xl md:text-7xl font-black leading-none tracking-tighter uppercase mb-6"
            />
            <EditableText
              contentKey={`youth_detail_subtitle_${id}`}
              defaultText={content.subtitle}
              as="p"
              className="text-2xl font-serif italic text-gold-accent mb-8"
            />
            <EditableText
              contentKey={`youth_detail_desc_${id}`}
              defaultText={content.description}
              as="p"
              className="text-lg text-white/70 font-serif leading-relaxed mb-12"
            />

            <div className="space-y-6">
              <h3 className="font-display font-bold text-sm uppercase tracking-widest text-gold-accent">Šta dobijaš:</h3>
              <ul className="space-y-4">
                {content.benefits.map((benefit, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-3 text-white/80 font-serif italic"
                  >
                    <CheckCircle2 className="w-5 h-5 text-gold-accent shrink-0" />
                    <EditableText
                      contentKey={`youth_detail_benefit_${id}_${i}`}
                      defaultText={benefit}
                      as="span"
                    />
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="mt-16">
              <button className="btn-primary">Prijavi se odmah</button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/5] lg:aspect-square"
          >
            <EditableImage
              contentKey={`youth_detail_img_${id}`}
              defaultSrc={content.image}
              alt={content.title}
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 border-2 border-gold-accent/20 -m-4 -z-10" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
