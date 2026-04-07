import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, Ticket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { collection, onSnapshot, query, limit, orderBy } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import EditableText from './EditableText';
import { formatDate } from '../lib/dateUtils';

export default function FeaturedActivities() {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'activities'), orderBy('createdAt', 'desc'), limit(3));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setActivities(data);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'activities');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section className="py-24 px-6 bg-white text-anthracite">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <EditableText
              contentKey="featured_subtitle"
              defaultText="Naše aktivnosti"
              as="span"
              className="font-display font-bold text-gold-accent text-sm uppercase tracking-widest mb-4 block"
            />
            <EditableText
              contentKey="featured_title"
              defaultText="PREGLED TEKUĆIH I NADOLAZEĆIH PROJEKATA"
              as="h2"
              className="text-4xl md:text-6xl font-black leading-none tracking-tighter uppercase"
            />
          </div>
          <Link to="/aktivnosti" className="btn-primary">
            Svi projekti
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12">Učitavanje aktivnosti...</div>
        ) : activities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-anthracite/5">
                  {/* Blurred background */}
                  <img
                    src={activity.image || null}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-50 scale-110 transition-transform duration-700 group-hover:scale-125"
                    referrerPolicy="no-referrer"
                  />
                  {/* Main image */}
                  <img
                    src={activity.image || null}
                    alt={activity.title}
                    className="relative z-10 w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 drop-shadow-2xl"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-gold-accent text-anthracite px-4 py-1 font-display font-bold text-xs uppercase tracking-widest z-20">
                    {activity.status}
                  </div>
                  <div className="absolute inset-0 bg-anthracite/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-30">
                    <button className="btn-primary flex items-center gap-2">
                      <Ticket className="w-4 h-4" /> Rezerviši kartu
                    </button>
                  </div>
                </div>
                <h3 className="text-2xl font-black mb-4 tracking-tight uppercase group-hover:text-gold-accent transition-colors">
                  {activity.title}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-anthracite/60 font-serif italic">
                    <Calendar className="w-4 h-4" /> {formatDate(activity.date)}
                  </div>
                  <div className="flex items-center gap-2 text-anthracite/60 font-serif italic">
                    <MapPin className="w-4 h-4" /> {activity.location}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-anthracite/40">Trenutno nema aktivnih projekata.</div>
        )}
      </div>
    </section>
  );
}
