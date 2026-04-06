import React, { useState, useEffect, useRef } from 'react';
import { useFirebase } from '../context/FirebaseContext';
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType, uploadFile } from '../firebase';
import { Plus, Trash2, Edit, Save, X, Image as ImageIcon, Upload, Loader2 } from 'lucide-react';

type TabType = 'news' | 'gallery' | 'testimonials' | 'activities' | 'institutionalPrograms';

export default function AdminDashboard() {
  const { isAdmin, loading } = useFirebase();
  const [activeTab, setActiveTab] = useState<TabType>('news');
  const [items, setItems] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isAdmin) return;

    const q = query(collection(db, activeTab));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(data);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, activeTab);
    });

    return () => unsubscribe();
  }, [activeTab, isAdmin]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white">Učitavanje...</div>;
  if (!isAdmin) return <div className="min-h-screen flex items-center justify-center text-white">Pristup odbijen. Prijavite se kao administrator.</div>;

  const handleAdd = async () => {
    try {
      await addDoc(collection(db, activeTab), {
        ...formData,
        createdAt: new Date().toISOString()
      });
      setIsAdding(false);
      setFormData({});
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, activeTab);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Jeste li sigurni da želite obrisati ovu stavku?')) return;
    try {
      await deleteDoc(doc(db, activeTab, id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `${activeTab}/${id}`);
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      await updateDoc(doc(db, activeTab, id), formData);
      setEditingId(null);
      setFormData({});
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `${activeTab}/${id}`);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const fileName = `${Date.now()}_${file.name}`;
      const downloadURL = await uploadFile(file, `${activeTab}/${fileName}`);
      
      // Update the correct image field based on active tab
      const imageField = activeTab === 'gallery' ? 'src' : 'image';
      setFormData({ ...formData, [imageField]: downloadURL });
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Greška pri učitavanju fotografije.');
    } finally {
      setIsUploading(false);
    }
  };

  const renderImageInput = (field: string) => (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <ImageIcon size={18} className="text-gold-accent" />
        <input 
          type="text" 
          placeholder="URL slike" 
          className="admin-input" 
          value={formData[field] || ''} 
          onChange={e => setFormData({...formData, [field]: e.target.value})} 
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
          accept="image/*"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="w-full py-3 bg-white/5 border border-white/10 text-white rounded hover:bg-white/10 flex items-center justify-center gap-2 text-xs uppercase tracking-widest transition-colors"
        >
          {isUploading ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Upload size={14} />
          )}
          {isUploading ? 'Učitavanje...' : 'Učitaj sa računara'}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-anthracite pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-12">
          Admin <span className="text-gold-accent">Panel</span>
        </h1>

        <div className="flex flex-wrap gap-4 mb-12 border-b border-white/10 pb-4">
          {(['news', 'gallery', 'testimonials', 'activities', 'institutionalPrograms'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setIsAdding(false); setEditingId(null); }}
              className={`px-6 py-2 font-display font-bold text-xs uppercase tracking-widest transition-all ${
                activeTab === tab ? 'text-gold-accent border-b-2 border-gold-accent' : 'text-white/40 hover:text-white'
              }`}
            >
              {tab === 'news' ? 'Vijesti' : 
               tab === 'gallery' ? 'Galerija' : 
               tab === 'testimonials' ? 'Recenzije' : 
               tab === 'activities' ? 'Aktivnosti' : 'Programi'}
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-black uppercase tracking-tight">
            Upravljanje: <span className="text-gold-accent">{
              activeTab === 'news' ? 'Vijesti' : 
              activeTab === 'gallery' ? 'Galerija' : 
              activeTab === 'testimonials' ? 'Recenzije' : 
              activeTab === 'activities' ? 'Aktivnosti' : 'Programi'
            }</span>
          </h2>
          <button
            onClick={() => { setIsAdding(true); setFormData({}); }}
            className="btn-primary py-2 px-6 flex items-center gap-2"
          >
            <Plus size={18} /> Dodaj novo
          </button>
        </div>

        {/* Add/Edit Form */}
        {(isAdding || editingId) && (
          <div className="bg-white/5 border border-gold-accent/30 p-8 mb-12 rounded-lg">
            <h3 className="text-xl font-bold mb-6 uppercase tracking-widest">
              {isAdding ? 'Dodaj novu stavku' : 'Uredi stavku'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeTab === 'news' && (
                <>
                  <input type="text" placeholder="Naslov" className="admin-input" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} />
                  <input type="text" placeholder="Kategorija" className="admin-input" value={formData.category || ''} onChange={e => setFormData({...formData, category: e.target.value})} />
                  {renderImageInput('image')}
                  <input type="date" className="admin-input" value={formData.date || ''} onChange={e => setFormData({...formData, date: e.target.value})} />
                  <textarea placeholder="Citat/Izvučena rečenica (opcionalno)" className="admin-input md:col-span-2 h-20" value={formData.lead || ''} onChange={e => setFormData({...formData, lead: e.target.value})} />
                  <textarea placeholder="Sadržaj" className="admin-input md:col-span-2 h-32" value={formData.content || ''} onChange={e => setFormData({...formData, content: e.target.value})} />
                </>
              )}
              {activeTab === 'gallery' && (
                <>
                  <input type="text" placeholder="Naslov" className="admin-input" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} />
                  <input type="text" placeholder="Kategorija" className="admin-input" value={formData.category || ''} onChange={e => setFormData({...formData, category: e.target.value})} />
                  <div className="md:col-span-2">
                    {renderImageInput('src')}
                  </div>
                </>
              )}
              {activeTab === 'testimonials' && (
                <>
                  <input type="text" placeholder="Autor" className="admin-input" value={formData.author || ''} onChange={e => setFormData({...formData, author: e.target.value})} />
                  <input type="text" placeholder="Uloga" className="admin-input" value={formData.role || ''} onChange={e => setFormData({...formData, role: e.target.value})} />
                  {renderImageInput('image')}
                  <textarea placeholder="Citat" className="admin-input md:col-span-2 h-32" value={formData.quote || ''} onChange={e => setFormData({...formData, quote: e.target.value})} />
                </>
              )}
              {activeTab === 'activities' && (
                <>
                  <input type="text" placeholder="Naslov" className="admin-input" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} />
                  <input type="text" placeholder="Datum (npr. 15. April 2026)" className="admin-input" value={formData.date || ''} onChange={e => setFormData({...formData, date: e.target.value})} />
                  <input type="text" placeholder="Lokacija" className="admin-input" value={formData.location || ''} onChange={e => setFormData({...formData, location: e.target.value})} />
                  <input type="text" placeholder="Status (npr. Aktuelno)" className="admin-input" value={formData.status || ''} onChange={e => setFormData({...formData, status: e.target.value})} />
                  <div className="md:col-span-2">
                    {renderImageInput('image')}
                  </div>
                </>
              )}
              {activeTab === 'institutionalPrograms' && (
                <>
                  <input type="text" placeholder="Naslov" className="admin-input" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} />
                  <input type="text" placeholder="Kategorija" className="admin-input" value={formData.category || ''} onChange={e => setFormData({...formData, category: e.target.value})} />
                  <input type="text" placeholder="Trajanje" className="admin-input" value={formData.duration || ''} onChange={e => setFormData({...formData, duration: e.target.value})} />
                  {renderImageInput('image')}
                  <textarea placeholder="Cilj/Opis" className="admin-input md:col-span-2 h-32" value={formData.goal || ''} onChange={e => setFormData({...formData, goal: e.target.value})} />
                </>
              )}
            </div>
            <div className="flex gap-4 mt-8">
              <button
                onClick={isAdding ? handleAdd : () => handleUpdate(editingId!)}
                disabled={isUploading}
                className="btn-primary py-2 px-8 flex items-center gap-2 disabled:opacity-50"
              >
                <Save size={18} /> Sačuvaj
              </button>
              <button
                onClick={() => { setIsAdding(false); setEditingId(null); }}
                disabled={isUploading}
                className="btn-outline py-2 px-8 flex items-center gap-2 disabled:opacity-50"
              >
                <X size={18} /> Odustani
              </button>
            </div>
          </div>
        )}

        {/* List Items */}
        <div className="grid grid-cols-1 gap-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white/5 border border-white/10 p-6 flex justify-between items-center group hover:border-white/30 transition-all">
              <div className="flex items-center gap-6">
                {(item.image || item.src) && (
                  <img src={item.image || item.src || null} alt="" className="w-16 h-16 object-cover rounded grayscale group-hover:grayscale-0 transition-all" />
                )}
                <div>
                  <h4 className="font-bold uppercase tracking-widest">{item.title || item.author}</h4>
                  <p className="text-xs text-white/40 uppercase tracking-widest">{item.category || item.role || item.status}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => { setEditingId(item.id); setFormData(item); setIsAdding(false); }}
                  className="p-2 text-white/40 hover:text-gold-accent transition-colors"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-white/40 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
