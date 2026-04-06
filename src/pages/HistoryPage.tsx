import { motion } from 'motion/react';
import { Landmark, Calendar, Award, Users, ArrowLeft, History as HistoryIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const timeline = [
  {
    year: '1898.',
    title: 'Prva predstava u BiH',
    description: 'U Tešnju je odigrana prva pozorišna predstava u Bosni i Hercegovini, postavljajući temelje za razvoj teatra u cijeloj zemlji.',
    image: 'https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?q=80&w=800&auto=format&fit=crop',
  },
  {
    year: '1953.',
    title: 'Zvanično osnivanje',
    description: '23. maja 1953. godine zvanično je osnovano Bosansko pozorište Tešanj, čime je započela era institucionalnog teatra u gradu.',
    image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=800&auto=format&fit=crop',
  },
  {
    year: '1970-ih',
    title: 'Zlatno doba',
    description: 'Period intenzivnog rada, brojnih premijera i gostovanja širom bivše Jugoslavije.',
    image: 'https://images.unsplash.com/photo-1516307365426-bea591f05011?q=80&w=800&auto=format&fit=crop',
  },
  {
    year: 'Danas',
    title: 'Moderna scena',
    description: 'Pozorište nastavlja svoj rad njegujući kulturnu scenu grada, sa posebnim fokusom na mlade talente i multimedijalne projekte.',
    image: 'https://images.unsplash.com/photo-1503095396549-807a89010046?q=80&w=800&auto=format&fit=crop',
  }
];

export default function HistoryPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-white text-anthracite">
      <div className="max-w-7xl mx-auto px-6">
        <Link to="/" className="inline-flex items-center gap-2 font-display font-bold text-xs uppercase tracking-widest text-anthracite/40 hover:text-gold-accent transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" /> Povratak na početnu
        </Link>

        <div className="max-w-4xl mb-24">
          <span className="font-display font-bold text-gold-accent text-sm uppercase tracking-[0.3em] mb-4 block">
            Historijat pozorišta
          </span>
          <h1 className="text-5xl md:text-8xl font-black leading-none tracking-tighter uppercase mb-8">
            LEGAT KOJI <span className="text-gold-accent">ŽIVI</span> KROZ GENERACIJE
          </h1>
          <p className="text-2xl md:text-3xl font-serif italic text-anthracite/70 leading-relaxed">
            Od prve odigrane predstave u Bosni i Hercegovini do danas, Tešanj ostaje kolijevka umjetničkog izražaja i čuvar teatarske tradicije.
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-32 relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-anthracite/10 hidden lg:block" />

          {timeline.map((item, index) => (
            <motion.div
              key={item.year}
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
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              <div className="w-full lg:w-1/2 space-y-6">
                <span className="text-6xl md:text-8xl font-black text-gold-accent/20 leading-none block">
                  {item.year}
                </span>
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xl font-serif italic text-anthracite/70 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-32 p-12 md:p-24 bg-anthracite text-white text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black uppercase mb-8 tracking-tighter">
              POSTANI DIO NAŠE <span className="text-gold-accent">BUDUĆNOSTI</span>
            </h2>
            <p className="text-xl font-serif italic text-white/60 mb-12 max-w-2xl mx-auto">
              Historija se i dalje piše. Pridruži nam se i ostavi svoj trag na daskama koje život znače.
            </p>
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
