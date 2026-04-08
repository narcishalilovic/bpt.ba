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
import DocumentsPage from './pages/DocumentsPage';
import AdminDashboard from './pages/AdminDashboard';
import JoinUsPage from './pages/JoinUsPage';
import EditableText from './components/EditableText';
import EditableImage from './components/EditableImage';

import { FirebaseProvider } from './context/FirebaseContext';

import SectionHeader from './components/SectionHeader';

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
      
      {/* Support Us / Impact Section */}
      <section className="py-24 px-6 bg-gold-accent text-anthracite overflow-hidden relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <SectionHeader
              subtitleKey="impact_subtitle"
              subtitleDefault="Podrži naš rad"
              titleKey="impact_title"
              titleDefault="TVOJA PODRŠKA MIJENJA SVE"
              descriptionKey="impact_description"
              descriptionDefault="Svaka donacija, svako članstvo i svaka kupljena karta direktno podržavaju razvoj mladih talenata u Tešnju."
              titleTag="h2"
              centered={true}
              className="mb-8"
            />
            <Link to="/podrzi-nas" className="px-8 py-3 bg-off-white text-anthracite font-display font-bold uppercase tracking-wider transition-all duration-300 hover:bg-white hover:scale-105 active:scale-95 inline-block">
              Saznaj više o donacijama
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-8 bg-anthracite/10 backdrop-blur-sm border border-anthracite/20 flex flex-col items-center text-center gap-2">
              <EditableText contentKey="stat_1_val" defaultText="150+" as="div" className="text-4xl font-black" />
              <EditableText contentKey="stat_1_label" defaultText="Aktivnih članova" as="div" className="text-xs font-display font-bold uppercase tracking-widest opacity-70" />
            </div>
            <div className="p-8 bg-anthracite/10 backdrop-blur-sm border border-anthracite/20 flex flex-col items-center text-center gap-2">
              <EditableText contentKey="stat_2_val" defaultText="20+" as="div" className="text-4xl font-black" />
              <EditableText contentKey="stat_2_label" defaultText="Godišnjih premijera" as="div" className="text-xs font-display font-bold uppercase tracking-widest opacity-70" />
            </div>
            <div className="p-8 bg-anthracite/10 backdrop-blur-sm border border-anthracite/20 flex flex-col items-center text-center gap-2">
              <EditableText contentKey="stat_3_val" defaultText="5000+" as="div" className="text-4xl font-black" />
              <EditableText contentKey="stat_3_label" defaultText="Zadovoljnih gledalaca" as="div" className="text-xs font-display font-bold uppercase tracking-widest opacity-70" />
            </div>
            <div className="p-8 bg-anthracite/10 backdrop-blur-sm border border-anthracite/20 flex flex-col items-center text-center gap-2">
              <EditableText contentKey="stat_4_val" defaultText="100%" as="div" className="text-4xl font-black" />
              <EditableText contentKey="stat_4_label" defaultText="Ljubav prema umjetnosti" as="div" className="text-xs font-display font-bold uppercase tracking-widest opacity-70" />
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
            <Route path="/ukljuci-se" element={<JoinUsPage />} />
            <Route path="/podrzi-nas" element={<PlaceholderPage title="Podrži nas" />} />
            <Route path="/propisi-i-akti" element={<DocumentsPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
          <Footer />
          <ScrollToTopButton />
        </div>
      </Router>
    </FirebaseProvider>
  );
}

