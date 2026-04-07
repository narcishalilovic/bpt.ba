import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Mail, User, MessageSquare, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import EditableText from '../components/EditableText';

export default function JoinUsPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    // Simulate email sending
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 bg-anthracite px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <EditableText
            contentKey="join_us_subtitle"
            defaultText="Postani dio tima"
            as="span"
            className="font-display font-bold text-gold-accent text-sm uppercase tracking-[0.3em] mb-4 block"
          />
          <EditableText
            contentKey="join_us_title"
            defaultText="UKLJUČI SE U RAD POZORIŠTA"
            as="h1"
            className="text-5xl md:text-7xl font-black leading-none tracking-tighter uppercase mb-8 text-white"
          />
          <EditableText
            contentKey="join_us_description"
            defaultText="Bilo da želiš biti na sceni, iza nje, ili nam pomoći u organizaciji - tvoja energija nam je potrebna. Piši nam i javi se!"
            as="div"
            className="text-xl font-serif italic text-white/60 max-w-2xl mx-auto"
          />
        </div>

        <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-lg relative overflow-hidden">
          {status === 'success' ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 bg-gold-accent/20 text-gold-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="text-3xl font-black uppercase tracking-tight text-white mb-4">Poruka poslana!</h2>
              <p className="text-white/60 font-serif italic mb-8">Hvala ti na interesovanju. Javićemo ti se u najkraćem mogućem roku.</p>
              <button 
                onClick={() => setStatus('idle')}
                className="btn-outline"
              >
                Pošalji novu poruku
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[10px] font-display font-bold uppercase tracking-widest text-gold-accent">
                    <User size={12} /> Ime i prezime
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Unesite vaše ime"
                    className="admin-input"
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[10px] font-display font-bold uppercase tracking-widest text-gold-accent">
                    <Mail size={12} /> Email adresa
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="vas@email.com"
                    className="admin-input"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-display font-bold uppercase tracking-widest text-gold-accent">
                  <Send size={12} /> Naslov poruke
                </label>
                <input
                  required
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Npr. Želim postati volonter"
                  className="admin-input"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-display font-bold uppercase tracking-widest text-gold-accent">
                  <MessageSquare size={12} /> Vaša poruka
                </label>
                <textarea
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Recite nam nešto o sebi i kako želite doprinijeti..."
                  className="admin-input h-32 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full btn-primary flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {status === 'sending' ? (
                  <>Slanje...</>
                ) : (
                  <>
                    <Send size={18} /> Pošalji poruku
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        <div className="mt-16 text-center">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 font-display font-bold text-xs uppercase tracking-widest text-white/40 hover:text-gold-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Povratak na početnu
          </Link>
        </div>
      </div>
    </div>
  );
}
