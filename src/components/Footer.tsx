import { Facebook, Instagram, Youtube, Music2, Mail, Phone, MapPin, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFirebase } from '../context/FirebaseContext';
import EditableText from './EditableText';

export default function Footer() {
  const { user, isAdmin, login, logout } = useFirebase();
  const isStudioEnvironment = typeof window !== 'undefined' && 
    (window.location.hostname.includes('ais-dev') || window.location.hostname.includes('localhost'));

  return (
    <footer className="bg-anthracite text-white pt-24 pb-12 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-8 group">
              <img 
                src="https://github.com/narcishalilovic/bpt.ba/blob/main/logo-white-bpt.webp?raw=true" 
                alt="Bosansko Pozorište Tešanj" 
                className="h-16 w-auto transition-transform group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col leading-[0.6] tracking-tight">
                <span className="font-display font-black text-2xl tracking-tighter text-white uppercase">Bosansko</span>
                <span className="font-display font-black text-2xl tracking-tighter uppercase flex items-center text-gold-accent -mt-4 relative z-10">
                  Pozorište <span className="ml-1.5">Tešanj</span>
                </span>
              </div>
            </Link>
            <EditableText
              contentKey="footer_slogan"
              defaultText='"Više od glume. Mjesto gdje stvaramo budućnost kulture."'
              as="div"
              className="text-lg text-white/60 max-w-md italic font-serif mb-8"
            />
            <div className="flex gap-4">
              <a href="https://www.facebook.com/pozoriste.tesanj/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-gold-accent hover:border-gold-accent transition-all" title="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/pozoriste.tesanj/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-gold-accent hover:border-gold-accent transition-all" title="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.tiktok.com/@pozoriste.tesanj" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-gold-accent hover:border-gold-accent transition-all" title="TikTok">
                <Music2 className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com/@pozoriste.tesanj" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-gold-accent hover:border-gold-accent transition-all" title="YouTube">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <EditableText
              contentKey="footer_nav_heading"
              defaultText="Navigacija"
              as="h4"
              className="font-display font-bold text-sm uppercase tracking-widest mb-8 text-gold-accent"
            />
            <ul className="space-y-4 font-display font-bold text-xs uppercase tracking-widest">
              <li><Link to="/" className="hover-gold transition-colors">Početna</Link></li>
              <li><Link to="/historijat" className="hover-gold transition-colors">Pozorište</Link></li>
              <li><Link to="/hronika-utjecaja" className="hover-gold transition-colors">Novosti</Link></li>
              <li><Link to="/aktivnosti" className="hover-gold transition-colors">Aktivnosti</Link></li>
              <li><Link to="/omladinski-klub" className="hover-gold transition-colors">Mladi</Link></li>
              <li><Link to="/institucionalna-saradnja" className="hover-gold transition-colors">Saradnja</Link></li>
              <li><Link to="/galerija" className="hover-gold transition-colors">Galerija</Link></li>
              
              {isStudioEnvironment && (
                <li className="pt-4 border-t border-white/5">
                  {user ? (
                    <div className="flex flex-col gap-2">
                      {isAdmin && (
                        <Link to="/admin" className="text-gold-accent hover:underline flex items-center gap-2">
                          <Lock size={12} />
                          ADMIN PANEL
                        </Link>
                      )}
                      <button 
                        onClick={logout}
                        className="text-white/40 hover:text-white transition-colors text-left uppercase"
                      >
                        ODJAVI SE
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={login}
                      className="text-white/40 hover:text-gold-accent transition-colors uppercase flex items-center gap-2"
                    >
                      <Lock size={12} />
                      ADMINISTRACIJA
                    </button>
                  )}
                </li>
              )}
            </ul>
          </div>

          <div>
            <EditableText
              contentKey="footer_contact_heading"
              defaultText="Kontakt"
              as="h4"
              className="font-display font-bold text-sm uppercase tracking-widest mb-8 text-gold-accent"
            />
            <ul className="space-y-6 font-serif italic text-white/60">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold-accent shrink-0" />
                <EditableText
                  contentKey="footer_address"
                  defaultText="Trg Alije Izetbegovića bb, 74260 Tešanj, BiH"
                  as="span"
                />
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold-accent shrink-0" />
                <EditableText
                  contentKey="footer_phone"
                  defaultText="+387 32 650 000"
                  as="span"
                />
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold-accent shrink-0" />
                <EditableText
                  contentKey="footer_email"
                  defaultText="info@pozoristetesanj.ba"
                  as="span"
                />
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-display font-bold uppercase tracking-widest text-white/40">
          <p>© {new Date().getFullYear()} <EditableText contentKey="footer_copyright_name" defaultText="Bosansko Pozorište Tešanj" as="span" />. <EditableText contentKey="footer_copyright_rights" defaultText="Sva prava zadržana." as="span" /></p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">
              <EditableText contentKey="footer_privacy" defaultText="Privatnost" as="span" />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <EditableText contentKey="footer_terms" defaultText="Uslovi korištenja" as="span" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
