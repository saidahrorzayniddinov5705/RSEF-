import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../lib/firestoreInfo';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  login: (e: string, p: string) => Promise<void>;
  register: (e: string, p: string, firstName: string, lastName: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const docSnap = await getDoc(userDocRef);
          if (!docSnap.exists()) {
             // Let the register function handle creation.
             console.log("User document not found yet.");
          }
          
          const adminDocRef = doc(db, 'admins', currentUser.uid);
          const adminSnap = await getDoc(adminDocRef);
          
          if (!adminSnap.exists() && currentUser.email === 'rsef.org@gmail.com') {
             try {
               await setDoc(adminDocRef, {
                 email: currentUser.email,
                 createdAt: serverTimestamp()
               });
               setIsAdmin(true);
             } catch (err) {
               console.error("Auto admin creation failed", err);
               setIsAdmin(false);
             }
          } else {
             setIsAdmin(adminSnap.exists());
          }
        } catch (error) {
           console.error(error);
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (e: string, p: string) => {
    try {
      await signInWithEmailAndPassword(auth, e, p);
    } catch (err: any) {
      if (err.code === 'auth/operation-not-allowed') {
        throw new Error("Firebase-da Email/Password orqali kirish yoqilmagan. Iltimos Firebase Console -> Authentication -> Sign-in method ga kiring va 'Email/Password' ni yoqing.");
      }
      if (e === 'rsef.org@gmail.com' && p === '6202fesr') {
        try {
          await register(e, p, 'Admin', 'User');
        } catch (regErr: any) {
          if (regErr.code === 'auth/operation-not-allowed') {
             throw new Error("Firebase-da Email/Password orqali kirish yoqilmagan. Iltimos Firebase Console -> Authentication -> Sign-in method ga kiring va 'Email/Password' ni yoqing.");
          }
          console.error("Admin registration fallback failed:", regErr);
          throw new Error("Login failed (Invalid credential or user not found) | Registration error: " + regErr.message);
        }
      } else {
        throw err;
      }
    }
  };

  const register = async (email: string, p: string, firstName: string, lastName: string) => {
    const cred = await createUserWithEmailAndPassword(auth, email, p);
    const userDocRef = doc(db, 'users', cred.user.uid);
    await setDoc(userDocRef, {
      email,
      firstName,
      lastName,
      role: email === 'rsef.org@gmail.com' ? 'admin' : 'user',
      createdAt: serverTimestamp()
    });

    if (email === 'rsef.org@gmail.com') {
      const adminDocRef = doc(db, 'admins', cred.user.uid);
      await setDoc(adminDocRef, {
        email,
        createdAt: serverTimestamp()
      });
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
