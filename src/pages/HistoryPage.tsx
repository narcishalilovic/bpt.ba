import { motion } from 'motion/react';
import { Landmark, Calendar, Award, Users, ArrowLeft, History as HistoryIcon, Target, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import EditableText from '../components/EditableText';
import EditableImage from '../components/EditableImage';

const timeline = [
  {
    id: '1898',
    year: '1898.',
    title: 'Prva predstava u BiH',
    description: 'U Tešnju je odigrana prva pozorišna predstava u Bosni i Hercegovini, postavljajući temelje za razvoj teatra u cijeloj zemlji.',
    image: 'https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '1953',
    year: '1953.',
    title: 'Zvanično osnivanje',
    description: '23.05.1953. godine zvanično je osnovano Bosansko pozorište Tešanj, čime je započela era institucionalnog teatra u gradu.',
    image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '1970',
    year: '1970-ih',
    title: 'Zlatno doba',
    description: 'Period intenzivnih rada, brojnih premijera i gostovanja širom bivše Jugoslavije.',
    image: 'https://images.unsplash.com/photo-1516307365426-bea591f05011?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'today',
    year: 'Danas',
    title: 'Moderna scena',
    description: 'Pozorište nastavlja svoj rad njegujući kulturnu scenu grada, sa posebnim fokusom na mlade talente i multimedijalne projekte.',
    image: 'https://images.unsplash.com/photo-1503095396549-807a89010046?q=80&w=800&auto=format&fit=crop',
  }
];

import SectionHeader from '../components/SectionHeader';

export default function HistoryPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-white text-anthracite">
      <div className="max-w-7xl mx-auto px-6">
        <Link to="/" className="inline-flex items-center gap-2 font-display font-bold text-xs uppercase tracking-widest text-anthracite/40 hover:text-gold-accent transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" /> Povratak na početnu
        </Link>

        <SectionHeader
          subtitleKey="history_page_subtitle"
          subtitleDefault="Historijat pozorišta"
          titleKey="history_page_title"
          titleDefault="LEGAT KOJI ŽIVI KROZ GENERACIJE"
          descriptionKey="history_page_description"
          descriptionDefault="Od prve odigrane predstave u Bosni i Hercegovini do danas, Tešanj ostaje kolijevka umjetničkog izražaja i čuvar teatarske tradicije."
          titleTag="h1"
          className="max-w-4xl mb-24"
        />

        {/* Mission & Vision Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-12 bg-anthracite text-white relative group overflow-hidden"
          >
            <Target className="w-12 h-12 text-gold-accent mb-8 relative z-10" />
            <EditableText
              contentKey="mission_title"
              defaultText="MISIJA"
              as="h2"
              className="text-4xl font-black uppercase tracking-tighter mb-6 relative z-10"
            />
            <EditableText
              contentKey="mission_text"
              defaultText="Misija Bosanskog pozorišta Tešanj je da kroz umjetnost, edukaciju i zajedničko stvaranje razvija kulturu, potiče kreativnost djece i mladih te gradi prostor susreta, izražavanja i društvene odgovornosti u lokalnoj zajednici."
              as="p"
              className="text-xl font-serif italic text-white/70 leading-relaxed relative z-10"
            />
            <div className="absolute -bottom-10 -right-10 text-8xl font-black text-white/[0.03] select-none pointer-events-none uppercase">
              Misija
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-12 bg-gold-accent text-anthracite relative group overflow-hidden"
          >
            <Eye className="w-12 h-12 text-anthracite mb-8 relative z-10" />
            <EditableText
              contentKey="vision_title"
              defaultText="VIZIJA"
              as="h2"
              className="text-4xl font-black uppercase tracking-tighter mb-6 relative z-10"
            />
            <EditableText
              contentKey="vision_text"
              defaultText="Vizija Bosanskog pozorišta Tešanj je da postane prepoznatljiv i snažan centar kulturnog i kreativnog razvoja djece i mladih, mjesto koje inspiriše, povezuje zajednicu i aktivno doprinosi razvoju savremenog pozorišta i društva."
              as="p"
              className="text-xl font-serif italic text-anthracite/70 leading-relaxed relative z-10"
            />
            <div className="absolute -bottom-10 -right-10 text-8xl font-black text-anthracite/[0.05] select-none pointer-events-none uppercase">
              Vizija
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="space-y-32 relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-anthracite/10 hidden lg:block" />

          {timeline.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center relative`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-gold-accent rounded-full hidden lg:block z-10" />

              <div className="w-full lg:w-1/2">
                <div className="aspect-video overflow-hidden border-8 border-white shadow-xl">
                  <EditableImage
                    contentKey={`history_timeline_img_${item.id}`}
                    defaultSrc={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  />
                </div>
              </div>

              <div className="w-full lg:w-1/2 space-y-6">
                <EditableText
                  contentKey={`history_timeline_year_${item.id}`}
                  defaultText={item.year}
                  as="span"
                  className="text-6xl md:text-8xl font-black text-gold-accent/20 leading-none block"
                />
                <EditableText
                  contentKey={`history_timeline_title_${item.id}`}
                  defaultText={item.title}
                  as="h3"
                  className="text-3xl md:text-4xl font-black uppercase tracking-tight"
                />
                <EditableText
                  contentKey={`history_timeline_desc_${item.id}`}
                  defaultText={item.description}
                  as="p"
                  className="text-xl font-serif italic text-anthracite/70 leading-relaxed"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-32 p-12 md:p-24 bg-anthracite text-white text-center relative overflow-hidden">
          <div className="relative z-10">
            <EditableText
              contentKey="history_cta_title"
              defaultText="POSTANI DIO NAŠE BUDUĆNOSTI"
              as="h2"
              className="text-4xl md:text-6xl font-black uppercase mb-8 tracking-tighter"
            />
            <EditableText
              contentKey="history_cta_desc"
              defaultText="Historija se i dalje piše. Pridruži nam se i ostavi svoj trag na daskama koje život znače."
              as="p"
              className="text-xl font-serif italic text-white/60 mb-12 max-w-2xl mx-auto"
            />
            <Link to="/ukljuci-se" className="btn-primary">
              Uključi se u rad
            </Link>
          </div>
          {/* Background Text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] font-black text-white/[0.03] select-none pointer-events-none leading-none uppercase whitespace-nowrap">
            Tešanj
          </div>
        </div>
      </div>
    </div>
  );
}
