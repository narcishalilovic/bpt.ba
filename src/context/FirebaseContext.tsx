import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot, collection, query, orderBy, limit } from 'firebase/firestore';
import { auth, db, googleProvider, handleFirestoreError, OperationType } from '../firebase';

interface FirebaseContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  siteContent: Record<string, any>;
  updateSiteContent: (key: string, value: any) => Promise<void>;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [siteContent, setSiteContent] = useState<Record<string, any>>({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        // Check if user is admin
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setIsAdmin(userDoc.data().role === 'admin');
        } else {
          // Default admin check from rules (narcis@bpt.ba)
          if (user.email === 'narcis@bpt.ba' && user.emailVerified) {
            setIsAdmin(true);
            // Auto-create user doc if it doesn't exist
            await setDoc(doc(db, 'users', user.uid), {
              email: user.email,
              role: 'admin',
              displayName: user.displayName
            });
          } else {
            setIsAdmin(false);
          }
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Listen to site content
  useEffect(() => {
    const q = query(collection(db, 'siteContent'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const content: Record<string, any> = {};
      snapshot.forEach((doc) => {
        content[doc.id] = doc.data().value;
      });
      setSiteContent(content);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'siteContent');
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user') {
        // User closed the popup, no need to log as error
        return;
      }
      console.error('Login error:', error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateSiteContent = async (key: string, value: any) => {
    if (!isAdmin) return;
    try {
      await setDoc(doc(db, 'siteContent', key), {
        key,
        value,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `siteContent/${key}`);
    }
  };

  return (
    <FirebaseContext.Provider value={{ user, isAdmin, loading, login, logout, siteContent, updateSiteContent }}>
      {children}
    </FirebaseContext.Provider>
  );
}

export function useFirebase() {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
}
