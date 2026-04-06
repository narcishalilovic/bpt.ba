/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedActivities from './components/FeaturedActivities';
import YouthClub from './components/YouthClub';
import InstitutionalPrograms from './components/InstitutionalPrograms';
import News from './components/News';
import History from './components/History';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';
import YouthClubDetail from './pages/YouthClubDetail';
import NewsList from './pages/NewsList';
import NewsDetail from './pages/NewsDetail';
import HistoryPage from './pages/HistoryPage';
import GalleryPage from './pages/GalleryPage';
import AdminDashboard from './pages/AdminDashboard';
import EditableText from './components/EditableText';
import EditableImage from './components/EditableImage';

import { FirebaseProvider } from './context/FirebaseContext';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function HomePage() {
  return (
    <main>
      <Hero />
      <FeaturedActivities />
      <News />
      <History />
      <YouthClub />
      <InstitutionalPrograms />
      <Testimonials />
      
      {/* Multimedia / Gallery Preview Section */}
      <section className="py-24 px-6 bg-anthracite border-t border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <EditableText
                contentKey="gallery_preview_subtitle"
                defaultText="Multimedija"
                as="span"
                className="font-display font-bold text-gold-accent text-sm uppercase tracking-widest mb-4 block"
              />
              <EditableText
                contentKey="gallery_preview_title"
                defaultText="NAŠ PORTFOLIO KROZ OBJEKTIV"
                as="h2"
                className="text-4xl md:text-6xl font-black leading-none tracking-tighter uppercase"
              />
            </div>
            <Link to="/galerija" className="btn-outline">
              Pogledaj galeriju
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square overflow-hidden group relative">
                <EditableImage
                  contentKey={`gallery_preview_img_${i}`}
                  defaultSrc={`https://picsum.photos/seed/gallery-${i}/800/800?grayscale`}
                  alt={`Gallery ${i}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gold-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
        {/* Decorative background text */}
        <div className="absolute -bottom-10 -left-10 text-[15rem] md:text-[20rem] font-black text-white/5 select-none pointer-events-none leading-none uppercase">
          Pozorište
        </div>
      </section>

      {/* Support Us / Impact Section */}
      <section className="py-24 px-6 bg-gold-accent text-anthracite overflow-hidden relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <EditableText
                contentKey="impact_title"
                defaultText="TVOJA PODRŠKA MIJENJA SVE"
                as="h2"
                className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter uppercase mb-8"
              />
              <EditableText
                contentKey="impact_description"
                defaultText="Svaka donacija, svako članstvo i svaka kupljena karta direktno podržavaju razvoj mladih talenata u Tešnju."
                as="p"
                className="text-xl font-serif italic mb-12 opacity-90"
              />
              <Link to="/podrzi-nas" className="px-8 py-3 bg-off-white text-anthracite font-display font-bold uppercase tracking-wider transition-all duration-300 hover:bg-white hover:scale-105 active:scale-95 inline-block">
                Saznaj više o donacijama
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="p-8 bg-anthracite/10 backdrop-blur-sm border border-anthracite/20">
                <EditableText contentKey="stat_1_val" defaultText="150+" as="div" className="text-4xl font-black mb-2" />
                <EditableText contentKey="stat_1_label" defaultText="Aktivnih članova" as="div" className="text-xs font-display font-bold uppercase tracking-widest opacity-70" />
              </div>
              <div className="p-8 bg-anthracite/10 backdrop-blur-sm border border-anthracite/20">
                <EditableText contentKey="stat_2_val" defaultText="20+" as="div" className="text-4xl font-black mb-2" />
                <EditableText contentKey="stat_2_label" defaultText="Godišnjih premijera" as="div" className="text-xs font-display font-bold uppercase tracking-widest opacity-70" />
              </div>
              <div className="p-8 bg-anthracite/10 backdrop-blur-sm border border-anthracite/20">
                <EditableText contentKey="stat_3_val" defaultText="5000+" as="div" className="text-4xl font-black mb-2" />
                <EditableText contentKey="stat_3_label" defaultText="Zadovoljnih gledalaca" as="div" className="text-xs font-display font-bold uppercase tracking-widest opacity-70" />
              </div>
              <div className="p-8 bg-anthracite/10 backdrop-blur-sm border border-anthracite/20">
                <EditableText contentKey="stat_4_val" defaultText="100%" as="div" className="text-4xl font-black mb-2" />
                <EditableText contentKey="stat_4_label" defaultText="Ljubav prema umjetnosti" as="div" className="text-xs font-display font-bold uppercase tracking-widest opacity-70" />
              </div>
            </div>
          </div>
        </div>
        {/* Decorative background text */}
        <div className="absolute -bottom-10 -right-10 text-[20rem] font-black text-anthracite/5 select-none pointer-events-none leading-none">
          TEŠANJ
        </div>
      </section>
    </main>
  );
}

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="min-h-screen pt-32 px-6 flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-8">{title}</h1>
      <p className="text-xl font-serif italic text-white/60 max-w-2xl">
        Ova stranica je trenutno u pripremi. Uskoro ćemo objaviti više informacija o našim aktivnostima i projektima.
      </p>
      <Link to="/" className="btn-primary mt-12">Povratak na početnu</Link>
    </div>
  );
}

export default function App() {
  return (
    <FirebaseProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/omladinski-klub" element={<PlaceholderPage title="Omladinski klub" />} />
            <Route path="/omladinski-klub/:id" element={<YouthClubDetail />} />
            <Route path="/hronika-utjecaja" element={<NewsList />} />
            <Route path="/vijesti/:id" element={<NewsDetail />} />
            <Route path="/historijat" element={<HistoryPage />} />
            <Route path="/institucionalna-saradnja" element={<PlaceholderPage title="Institucionalna saradnja" />} />
            <Route path="/aktivnosti" element={<PlaceholderPage title="Aktivnosti" />} />
            <Route path="/ukljuci-se" element={<PlaceholderPage title="Uključi se" />} />
            <Route path="/podrzi-nas" element={<PlaceholderPage title="Podrži nas" />} />
            <Route path="/galerija" element={<GalleryPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
          <Footer />
          <ScrollToTopButton />
        </div>
      </Router>
    </FirebaseProvider>
  );
}

