import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthProvider';
import { updatePassword } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useParams, Link } from 'react-router-dom';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { handleFirestoreError, OperationType } from '../lib/firestoreInfo';

export function ProfilePage() {
  const { user, loading: authLoading, logout } = useAuth();
  const { locale } = useParams();
  
  const [loadingData, setLoadingData] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [infoMessage, setInfoMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: ''
  });
  
  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  
  const [appStatus, setAppStatus] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    if (!user) return;
    try {
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const data = userSnap.data();
        setProfileData({
          firstName: data.firstName || '',
          lastName: data.lastName || ''
        });
      }
      
      const subRef = doc(db, 'submissions', user.uid);
      const subSnap = await getDoc(subRef);
      if (subSnap.exists()) {
         setAppStatus(subSnap.data().status.toUpperCase());
      }
    } catch (e: any) {
      handleFirestoreError(e, OperationType.GET, e.message?.includes('users') ? `users/${user.uid}` : `submissions/${user.uid}`);
    } finally {
      setLoadingData(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setUpdating(true);
    setInfoMessage('');
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        firstName: profileData.firstName,
        lastName: profileData.lastName
      });
      setInfoMessage('Profile updated successfully!');
    } catch (err: any) {
      setInfoMessage('Error updating profile: ' + err.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setInfoMessage('Passwords do not match');
      return;
    }
    if (passwordData.newPassword.length < 8) {
       setInfoMessage('Password must be at least 8 characters');
       return;
    }
    
    setUpdating(true);
    setInfoMessage('');
    try {
      await updatePassword(user, passwordData.newPassword);
      setInfoMessage('Password updated successfully!');
      setPasswordData({ newPassword: '', confirmPassword: '' });
    } catch (err: any) {
      if (err.code === 'auth/requires-recent-login') {
         setInfoMessage('Please log out and log in again to change your password.');
      } else {
         setInfoMessage('Error changing password: ' + err.message);
      }
    } finally {
      setUpdating(false);
    }
  };

  if (authLoading || loadingData) {
    return (
      <div className="w-full min-h-screen bg-slate-50 flex items-center justify-center p-12 text-slate-600">
         <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-full min-h-[calc(100vh-80px)] bg-slate-50 flex items-center justify-center">
         <div className="text-xl">Please log in to view your profile.</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-slate-50 py-24 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="max-w-3xl w-full flex flex-col gap-8">
        
        <h1 className="text-3xl font-bold text-slate-900">My Profile</h1>
        
        {infoMessage && (
           <div className="bg-emerald-50 text-emerald-700 p-4 rounded-lg font-medium border border-emerald-200">
              {infoMessage}
           </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
           <div className="p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-6">Application Status</h2>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                 <div className="font-medium text-slate-900">Current Status</div>
                 <div className={`px-4 py-1.5 rounded-full text-sm font-bold tracking-wide ${
                    appStatus === 'PENDING' ? 'bg-amber-100 text-amber-700' :
                    appStatus === 'SELECTED' ? 'bg-emerald-100 text-emerald-700' :
                    appStatus === 'DECLINED' ? 'bg-rose-100 text-rose-700' :
                    'bg-slate-200 text-slate-700'
                 }`}>
                    {appStatus || 'NOT STARTED'}
                 </div>
              </div>
              <div className="mt-4">
                 <Link to={`/${locale}/apply`} className="text-emerald-600 hover:text-emerald-700 font-medium hover:underline">
                    Go to my application &rarr;
                 </Link>
              </div>
           </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
           <div className="p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email <span className="text-xs text-slate-400 font-normal ml-2">(Cannot be changed)</span></label>
                    <input type="email" disabled value={user.email || ''} className="w-full bg-slate-100 border border-slate-300 rounded p-3 text-slate-500 cursor-not-allowed" />
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                       <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                       <input type="text" required value={profileData.firstName} onChange={e => setProfileData({...profileData, firstName: e.target.value})} className="w-full border border-slate-300 rounded p-3 focus:ring-emerald-500 focus:border-emerald-500" />
                    </div>
                    <div>
                       <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                       <input type="text" required value={profileData.lastName} onChange={e => setProfileData({...profileData, lastName: e.target.value})} className="w-full border border-slate-300 rounded p-3 focus:ring-emerald-500 focus:border-emerald-500" />
                    </div>
                 </div>
                 <button type="submit" disabled={updating} className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 px-6 rounded transition-colors disabled:opacity-50">
                    Save Changes
                 </button>
              </form>
           </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
           <div className="p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-6">Change Password</h2>
              <form onSubmit={handleChangePassword} className="space-y-6">
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
                    <input type="password" required value={passwordData.newPassword} onChange={e => setPasswordData({...passwordData, newPassword: e.target.value})} className="w-full border border-slate-300 rounded p-3 focus:ring-emerald-500 focus:border-emerald-500" placeholder="Min 8 characters" />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Confirm New Password</label>
                    <input type="password" required value={passwordData.confirmPassword} onChange={e => setPasswordData({...passwordData, confirmPassword: e.target.value})} className="w-full border border-slate-300 rounded p-3 focus:ring-emerald-500 focus:border-emerald-500" placeholder="Min 8 characters" />
                 </div>
                 <button type="submit" disabled={updating} className="bg-slate-800 hover:bg-slate-900 text-white font-medium py-2.5 px-6 rounded transition-colors disabled:opacity-50">
                    Update Password
                 </button>
              </form>
           </div>
        </div>
        
        <div className="py-4">
           <button onClick={() => { logout(); }} className="text-rose-600 font-medium hover:text-rose-700 hover:underline">
              Sign out of account
           </button>
        </div>

      </div>
    </div>
  );
}
