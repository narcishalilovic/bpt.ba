import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { useFirebase } from '../context/FirebaseContext';
import EditableText from './EditableText';

const navLinks = [
  { name: 'Početna', path: '/' },
  { name: 'Pozorište', path: '/historijat' },
  { name: 'Novosti', path: '/hronika-utjecaja' },
  { name: 'Aktivnosti', path: '/aktivnosti' },
  { name: 'Mladi', path: '/omladinski-klub' },
  { name: 'Saradnja', path: '/institucionalna-saradnja' },
  { name: 'Galerija', path: '/galerija' },
  { name: 'Propisi i akti', path: '/propisi-i-akti' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 py-4',
        scrolled ? 'glass-nav py-3' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group">
          <img 
            src="https://github.com/narcishalilovic/bpt.ba/blob/main/logo-white-bpt.webp?raw=true" 
            alt="Bosansko Pozorište Tešanj" 
            className="h-12 w-auto transition-transform group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col leading-[0.6] tracking-tight">
            <EditableText 
              contentKey="logo_part0" 
              defaultText="Bosansko" 
              as="span" 
              className="font-display font-black text-xl tracking-tighter text-white uppercase" 
            />
            <span className="font-display font-black text-xl tracking-tighter uppercase flex items-center text-gold-accent -mt-3 relative z-10">
              <EditableText contentKey="logo_part1" defaultText="Pozorište" as="span" />
              <EditableText contentKey="logo_part2" defaultText="Tešanj" as="span" className="ml-1" />
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'font-display font-bold text-[10px] uppercase tracking-[0.2em] transition-all hover:text-gold-accent relative group/link',
                  location.pathname === link.path ? 'text-gold-accent' : 'text-white/70'
                )}
              >
                {link.name}
                <span className={cn(
                  "absolute -bottom-1 left-0 w-0 h-px bg-gold-accent transition-all duration-300 group-hover/link:w-full",
                  location.pathname === link.path && "w-full"
                )} />
              </Link>
            ))}
          </div>
          
          <Link to="/ukljuci-se" className="btn-primary py-2.5 px-8 text-[10px] tracking-[0.15em]">
            Postani član
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center lg:hidden">
          <button
            className="text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 top-0 left-0 w-full h-screen bg-anthracite z-50 flex flex-col p-12 gap-8 lg:hidden"
          >
            <div className="flex justify-end">
              <button onClick={() => setIsOpen(false)} className="text-white p-2">
                <X size={32} />
              </button>
            </div>
            <div className="flex flex-col gap-6 mt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'font-display font-black text-4xl uppercase tracking-tighter hover:text-gold-accent transition-colors',
                    location.pathname === link.path ? 'text-gold-accent' : 'text-white'
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <Link
              to="/ukljuci-se"
              onClick={() => setIsOpen(false)}
              className="btn-primary text-center mt-12 py-4 text-lg"
            >
              Postani član
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
