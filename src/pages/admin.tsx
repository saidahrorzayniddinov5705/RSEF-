import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthProvider';
import { db } from '../lib/firebase';
import { collection, getDocs, doc, updateDoc, serverTimestamp, setDoc, deleteDoc } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../lib/firestoreInfo';
import { useNavigate, useParams } from 'react-router-dom';
import * as Dialog from '@radix-ui/react-dialog';
import { FileText, Mail, Users, CheckCircle, XCircle, Clock, Trash2, PlusCircle, LayoutDashboard, Newspaper, Trophy } from 'lucide-react';

interface SubmissionData {
  id: string;
  userId: string;
  email: string;
  phone?: string;
  fullName: string;
  age?: string;
  country?: string;
  city?: string;
  schoolName?: string;
  abstract: string;
  personalStatement: string;
  projectTitle?: string;
  category?: string;
  participationType?: string;
  teamMembers?: string[];
  fileUrl?: string;
  fileName?: string;
  heardAbout?: string;
  otherHeardAbout?: string;
  competedBefore?: string;
  travelSupport?: string;
  blitz1?: string;
  blitz2?: string;
  blitz3?: string;
  status: string;
  createdAt: number;
}

interface NewsData {
  id: string;
  title: { en: string; uz: string; ru: string };
  description: { en: string; uz: string; ru: string };
  imageUrl: string;
  createdAt: number;
}

interface ResultData {
  id: string;
  year: string;
  title: { en: string; uz: string; ru: string };
  description: { en: string; uz: string; ru: string };
  imageUrl: string;
}

export function AdminPage() {
  const { isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const { locale } = useParams();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'submissions' | 'news' | 'results'>('dashboard');

  const [submissions, setSubmissions] = useState<SubmissionData[]>([]);
  const [news, setNews] = useState<NewsData[]>([]);
  const [resultsList, setResultsList] = useState<ResultData[]>([]);
  
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [selectedSub, setSelectedSub] = useState<SubmissionData | null>(null);

  // News form
  const [newsForm, setNewsForm] = useState({
    titleEn: '', titleUz: '', titleRu: '',
    descEn: '', descUz: '', descRu: '',
    imageUrl: ''
  });

  // Results form
  const [resultsForm, setResultsForm] = useState({
    year: '2025',
    titleEn: '', titleUz: '', titleRu: '',
    descEn: '', descUz: '', descRu: '',
    imageUrl: ''
  });

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate(`/${locale}`);
    }
  }, [isAdmin, loading, navigate, locale]);

  useEffect(() => {
    if (isAdmin) {
      // Always fetch all data for dashboard metrics
      fetchSubmissions();
      fetchNews();
      fetchResults();
    }
  }, [isAdmin]);

  const fetchResults = async () => {
    try {
      setLoadingData(true);
      const querySnapshot = await getDocs(collection(db, 'results'));
      const list: ResultData[] = [];
      querySnapshot.forEach((docSnap) => {
        list.push({ id: docSnap.id, ...docSnap.data() } as ResultData);
      });
      list.sort((a, b) => parseInt(b.year) - parseInt(a.year));
      setResultsList(list);
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, 'results');
    } finally {
      setLoadingData(false);
    }
  };

  const fetchSubmissions = async () => {
    try {
      setLoadingData(true);
      const querySnapshot = await getDocs(collection(db, 'submissions'));
      const subs: SubmissionData[] = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        subs.push({ 
          id: docSnap.id, 
          ...data,
          createdAt: data.createdAt?.toMillis ? data.createdAt.toMillis() : (typeof data.createdAt === 'number' ? data.createdAt : Date.now())
        } as SubmissionData);
      });
      subs.sort((a, b) => b.createdAt - a.createdAt);
      setSubmissions(subs);
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, 'submissions');
    } finally {
      setLoadingData(false);
    }
  };

  const fetchNews = async () => {
    try {
      setLoadingData(true);
      const querySnapshot = await getDocs(collection(db, 'news'));
      const list: NewsData[] = [];
      querySnapshot.forEach((docSnap) => {
        list.push({ id: docSnap.id, ...docSnap.data() } as NewsData);
      });
      list.sort((a, b) => b.createdAt - a.createdAt);
      setNews(list);
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, 'news');
    } finally {
      setLoadingData(false);
    }
  };

  const handleDeleteSubmission = async (subId: string) => {
    try {
      await deleteDoc(doc(db, 'submissions', subId));
      setSubmissions(subs => subs.filter(s => s.id !== subId));
      if (selectedSub && selectedSub.id === subId) {
        setSelectedSub(null);
      }
      setShowDeleteConfirm(false);
      setIsDetailsModalOpen(false);
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `submissions/${subId}`);
    }
  };

  const handleUpdateStatus = async (subId: string, newStatus: string) => {
    try {
      const docRef = doc(db, 'submissions', subId);
      await updateDoc(docRef, {
        status: newStatus,
        updatedAt: serverTimestamp()
      });
      setSubmissions(subs => subs.map(s => s.id === subId ? { ...s, status: newStatus } : s));
      
      const updatedSub = submissions.find(s => s.id === subId);
      
      if (selectedSub && selectedSub.id === subId) {
        setSelectedSub({ ...selectedSub, status: newStatus });
      }

      if (updatedSub) {
        if (newStatus === 'selected') {
           const subject = encodeURIComponent("RSEF 2026: Application Accepted / Arizangiz qabul qilindi");
           const body = encodeURIComponent(`Hurmatli ${updatedSub.fullName},\n\nSizning RSEF 2026 uchun arizangiz qabul qilinganligini e'lon qilishdan mamnunmiz!\n\nDear ${updatedSub.fullName},\n\nWe are pleased to announce that your application for RSEF 2026 has been accepted!\n\n-- RSEF Team`);
           window.location.href = `mailto:${updatedSub.email}?subject=${subject}&body=${body}`;
        } else if (newStatus === 'rejected') {
           const subject = encodeURIComponent("RSEF 2026: Application Status / Ariza holati");
           const body = encodeURIComponent(`Hurmatli ${updatedSub.fullName},\n\nAfsuski, sizning arizangiz keyingi bosqichga o'ta olmasligini ma'lum qilamiz. Kelgusi ishlaringizda muvaffaqiyat tilaymiz.\n\nDear ${updatedSub.fullName},\n\nWe regret to inform you that your application will not proceed to the next stage. We wish you the best in your future endeavors.\n\n-- RSEF Team`);
           window.location.href = `mailto:${updatedSub.email}?subject=${subject}&body=${body}`;
        }
      }
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `submissions/${subId}`);
    }
  };

  const handleCreateNews = async (e: React.FormEvent) => {
     e.preventDefault();
     try {
       const id = Date.now().toString();
       await setDoc(doc(db, 'news', id), {
         title: { en: newsForm.titleEn, uz: newsForm.titleUz, ru: newsForm.titleRu },
         description: { en: newsForm.descEn, uz: newsForm.descUz, ru: newsForm.descRu },
         imageUrl: newsForm.imageUrl,
         createdAt: Date.now()
       });
       setNewsForm({ titleEn: '', titleUz: '', titleRu: '', descEn: '', descUz: '', descRu: '', imageUrl: '' });
       fetchNews();
     } catch (err) {
       handleFirestoreError(err, OperationType.WRITE, 'news');
     }
  };

  const handleDeleteNews = async (id: string) => {
     try {
       await deleteDoc(doc(db, 'news', id));
       setNews(news.filter(n => n.id !== id));
     } catch (err) {
       handleFirestoreError(err, OperationType.DELETE, `news/${id}`);
     }
  };

  const handleCreateResult = async (e: React.FormEvent) => {
     e.preventDefault();
     try {
       const id = Date.now().toString();
       await setDoc(doc(db, 'results', id), {
         year: resultsForm.year,
         title: { en: resultsForm.titleEn, uz: resultsForm.titleUz, ru: resultsForm.titleRu },
         description: { en: resultsForm.descEn, uz: resultsForm.descUz, ru: resultsForm.descRu },
         imageUrl: resultsForm.imageUrl
       });
       setResultsForm({ 
         year: '2025', 
         titleEn: '', titleUz: '', titleRu: '', 
         descEn: '', descUz: '', descRu: '', 
         imageUrl: '' 
       });
       fetchResults();
     } catch (err) {
       handleFirestoreError(err, OperationType.WRITE, 'results');
     }
  };

  const handleDeleteResult = async (id: string) => {
     try {
       await deleteDoc(doc(db, 'results', id));
       setResultsList(resultsList.filter(n => n.id !== id));
     } catch (err) {
       handleFirestoreError(err, OperationType.DELETE, `results/${id}`);
     }
  };

  if (loading) {
    return <div className="p-12 text-center text-slate-500">Loading admin portal...</div>;
  }

  const pendingCount = submissions.filter(s => s.status === 'pending').length;
  const selectedCount = submissions.filter(s => s.status === 'selected').length;
  const rejectedCount = submissions.filter(s => s.status === 'rejected').length;

  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 py-8 px-4">
      
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 shrink-0 flex flex-col gap-2">
         <h2 className="text-xl font-bold text-slate-900 mb-4 px-3">Admin Panel</h2>
         
         <button 
           onClick={() => setActiveTab('dashboard')}
           className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-100'}`}
         >
            <LayoutDashboard className="w-5 h-5" /> Dashboard
         </button>
         
         <button 
           onClick={() => setActiveTab('submissions')}
           className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'submissions' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-100'}`}
         >
            <Users className="w-5 h-5" /> Submissions
         </button>
         
         <button 
           onClick={() => setActiveTab('news')}
           className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'news' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-100'}`}
         >
            <Newspaper className="w-5 h-5" /> News
         </button>

         <button 
           onClick={() => setActiveTab('results')}
           className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'results' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-100'}`}
         >
            <Trophy className="w-5 h-5" /> Results
         </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 min-h-[600px] overflow-hidden">
         
         {activeTab === 'dashboard' && (
            <div className="p-8">
               <h3 className="text-2xl font-bold text-slate-900 mb-8">System Dashboard</h3>
               
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                     <div className="flex justify-between items-start mb-4">
                        <div className="bg-blue-100 text-blue-600 p-3 rounded-xl"><Users className="w-6 h-6" /></div>
                     </div>
                     <h4 className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">Total Submissions</h4>
                     <p className="text-4xl font-black text-slate-900">{submissions.length}</p>
                  </div>
                  
                  <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
                     <div className="flex justify-between items-start mb-4">
                        <div className="bg-amber-100 text-amber-600 p-3 rounded-xl"><Clock className="w-6 h-6" /></div>
                     </div>
                     <h4 className="text-amber-700/70 text-sm font-bold uppercase tracking-wider mb-1">Pending Review</h4>
                     <p className="text-4xl font-black text-amber-900">{pendingCount}</p>
                  </div>

                  <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                     <div className="flex justify-between items-start mb-4">
                        <div className="bg-emerald-100 text-emerald-600 p-3 rounded-xl"><CheckCircle className="w-6 h-6" /></div>
                     </div>
                     <h4 className="text-emerald-700/70 text-sm font-bold uppercase tracking-wider mb-1">Accepted</h4>
                     <p className="text-4xl font-black text-emerald-900">{selectedCount}</p>
                  </div>

                  <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                     <div className="flex justify-between items-start mb-4">
                        <div className="bg-indigo-100 text-indigo-600 p-3 rounded-xl"><Newspaper className="w-6 h-6" /></div>
                     </div>
                     <h4 className="text-indigo-700/70 text-sm font-bold uppercase tracking-wider mb-1">News Articles</h4>
                     <p className="text-4xl font-black text-indigo-900">{news.length}</p>
                  </div>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Recent Submissions Snippet */}
                  <div className="border border-slate-100 rounded-2xl p-6">
                     <h4 className="font-bold text-slate-800 mb-4 flex items-center justify-between">
                        Recent Submissions
                        <button onClick={() => setActiveTab('submissions')} className="text-xs text-emerald-600 font-bold hover:underline py-1 px-2">View All</button>
                     </h4>
                     <div className="space-y-3">
                        {submissions.slice(0, 5).map(sub => (
                           <div key={sub.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                              <div>
                                 <p className="font-bold text-sm text-slate-900">{sub.fullName}</p>
                                 <p className="text-xs text-slate-500">{new Intl.DateTimeFormat('uz-UZ', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(new Date(sub.createdAt))}</p>
                              </div>
                              <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider
                               ${sub.status === 'pending' ? 'bg-amber-100 text-amber-800' : 
                                 sub.status === 'selected' ? 'bg-emerald-100 text-emerald-800' : 
                                 'bg-rose-100 text-rose-800'}`}>
                                {sub.status}
                              </span>
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="border border-slate-100 rounded-2xl p-6">
                     <h4 className="font-bold text-slate-800 mb-4 flex items-center justify-between">
                        Quick Actions
                     </h4>
                     <div className="grid grid-cols-2 gap-4">
                         <button onClick={() => setActiveTab('submissions')} className="flex flex-col items-center justify-center p-6 bg-slate-50 hover:bg-slate-100 transition-colors rounded-xl border border-slate-200 gap-3 text-center">
                            <Users className="w-6 h-6 text-slate-600" />
                            <span className="text-sm font-bold text-slate-700">Review Applications</span>
                         </button>
                         <button onClick={() => setActiveTab('news')} className="flex flex-col items-center justify-center p-6 bg-slate-50 hover:bg-slate-100 transition-colors rounded-xl border border-slate-200 gap-3 text-center">
                            <Newspaper className="w-6 h-6 text-slate-600" />
                            <span className="text-sm font-bold text-slate-700">Publish News</span>
                         </button>
                         <button onClick={() => setActiveTab('results')} className="flex flex-col items-center justify-center p-6 bg-slate-50 hover:bg-slate-100 transition-colors rounded-xl border border-slate-200 gap-3 text-center">
                            <Trophy className="w-6 h-6 text-slate-600" />
                            <span className="text-sm font-bold text-slate-700">Post Results</span>
                         </button>
                     </div>
                  </div>
               </div>
            </div>
         )}
         
         {activeTab === 'submissions' && (
            <div className="flex flex-col md:flex-row h-full">
               <div className="w-full md:w-1/3 border-r border-slate-200 flex flex-col overflow-hidden h-full">
                  <div className="p-4 border-b border-slate-200">
                     <div className="flex flex-wrap gap-2 text-[11px] font-bold uppercase tracking-wider">
                        <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md">Total: {submissions.length}</span>
                        <span className="bg-amber-100 text-amber-800 px-2.5 py-1 rounded-md">Wait: {pendingCount}</span>
                        <span className="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-md">Pass: {selectedCount}</span>
                     </div>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-2 space-y-2">
                     {loadingData ? <div className="p-4 text-center text-sm text-slate-500">Loading...</div> : null}
                     {submissions.map(sub => (
                       <button 
                          key={sub.id}
                          onClick={() => {
                            setSelectedSub(sub);
                            setShowDeleteConfirm(false);
                          }}
                          className={`w-full text-left p-4 rounded-xl border transition-all ${selectedSub?.id === sub.id ? 'border-emerald-500 bg-emerald-50 shadow-sm' : 'border-slate-100 bg-white hover:border-emerald-200'}`}
                       >
                         <div className="flex justify-between items-start mb-1.5">
                            <h4 className="font-bold text-slate-800 line-clamp-1">{sub.fullName}</h4>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex-shrink-0 ml-2
                               ${sub.status === 'pending' ? 'bg-amber-100 text-amber-800' : 
                                 sub.status === 'selected' ? 'bg-emerald-100 text-emerald-800' : 
                                 'bg-rose-100 text-rose-800'}`}>
                               {sub.status}
                             </span>
                         </div>
                         <div className="flex justify-between items-center mt-1">
                            <p className="text-xs text-slate-500 truncate">{sub.email}</p>
                            <p className="text-[10px] text-slate-400 font-medium whitespace-nowrap ml-2">{new Intl.DateTimeFormat('uz-UZ', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(sub.createdAt))}</p>
                         </div>
                       </button>
                     ))}
                     {!loadingData && submissions.length === 0 && (
                        <p className="text-sm text-slate-500 italic p-4 text-center">No submissions yet.</p>
                     )}
                  </div>
               </div>

               <div className="w-full md:w-2/3 p-8 overflow-y-auto max-h-[800px]">
                  {selectedSub ? (
                    <div className="space-y-8">
                       <div className="flex items-start justify-between border-b border-slate-100 pb-6">
                          <div>
                             <h3 className="text-2xl font-bold text-slate-900 mb-2">{selectedSub.fullName}</h3>
                             <div className="flex items-center gap-4 text-sm text-slate-500">
                                <span className="flex items-center gap-1"><Mail className="w-4 h-4" /> {selectedSub.email}</span>
                                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {new Intl.DateTimeFormat('uz-UZ', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(new Date(selectedSub.createdAt))}</span>
                             </div>
                          </div>
                          <div>
                             <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                               ${selectedSub.status === 'pending' ? 'bg-amber-100 text-amber-800' : 
                                 selectedSub.status === 'selected' ? 'bg-emerald-100 text-emerald-800' : 
                                 'bg-rose-100 text-rose-800'}`}>
                               {selectedSub.status}
                             </span>
                          </div>
                       </div>

                       {(selectedSub.teamMembers && selectedSub.teamMembers.length > 0) && (
                          <div>
                             <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-700 uppercase tracking-wide mb-3">
                                <Users className="w-4 h-4" /> Team Members
                             </h4>
                             <div className="flex flex-wrap gap-2">
                                {Array.isArray(selectedSub.teamMembers) ? selectedSub.teamMembers.map((tm, idx) => (
                                   <span key={idx} className="bg-slate-100 text-slate-700 px-3 py-1 text-sm rounded-md border border-slate-200">
                                      {tm}
                                   </span>
                                )) : (
                                   <span className="bg-slate-100 text-slate-700 px-3 py-1 text-sm rounded-md border border-slate-200">
                                      {selectedSub.teamMembers}
                                   </span>
                                )}
                             </div>
                          </div>
                       )}

                       <div className="space-y-6">
                          <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                             <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-700 uppercase tracking-wide mb-4">
                                <FileText className="w-4 h-4" /> Project Abstract
                             </h4>
                             <p className="text-slate-700 whitespace-pre-wrap leading-relaxed text-sm">
                                {selectedSub.abstract}
                             </p>
                          </div>

                          <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                             <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-700 uppercase tracking-wide mb-4">
                                <FileText className="w-4 h-4" /> Personal Statement
                             </h4>
                             <p className="text-slate-700 whitespace-pre-wrap leading-relaxed text-sm">
                                {selectedSub.personalStatement}
                             </p>
                          </div>
                       </div>

                       <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-4">
                          <button 
                            onClick={() => setIsDetailsModalOpen(true)}
                            className="text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors mr-auto border border-teal-200 bg-teal-50 px-4 py-2 rounded-md"
                          >
                            View Full Details
                          </button>

                          {showDeleteConfirm ? (
                             <div className="mr-auto flex items-center gap-2 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-md">
                                <span className="text-xs font-semibold text-rose-700">Are you sure?</span>
                                <button 
                                  onClick={() => setShowDeleteConfirm(false)}
                                  className="text-[10px] font-bold text-slate-500 hover:text-slate-700 uppercase tracking-wider"
                                >
                                  Cancel
                                </button>
                                <button 
                                  onClick={() => handleDeleteSubmission(selectedSub.id)}
                                  className="text-[10px] font-bold text-rose-600 hover:text-rose-800 uppercase tracking-wider"
                                >
                                  Delete
                                </button>
                             </div>
                          ) : (
                            <button 
                              onClick={() => setShowDeleteConfirm(true)}
                              className="text-sm font-medium text-rose-500 hover:text-rose-700 transition-colors mr-auto flex items-center gap-1"
                            >
                              <Trash2 className="w-4 h-4" /> Delete
                            </button>
                          )}

                          <a 
                            href={`mailto:${selectedSub.email}?subject=RSEF 2026 Application`}
                            className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors"
                          >
                             Send Email
                          </a>

                          {selectedSub.status !== 'rejected' && (
                             <button 
                               onClick={() => handleUpdateStatus(selectedSub.id, 'rejected')}
                               className="px-6 py-2 rounded-md font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 transition-colors border border-rose-200"
                             >
                                Reject
                             </button>
                          )}
                          {selectedSub.status !== 'selected' && (
                             <button 
                               onClick={() => handleUpdateStatus(selectedSub.id, 'selected')}
                               className="px-6 py-2 rounded-md font-medium text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
                             >
                                Mark as Selected
                             </button>
                          )}
                       </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400">
                       <FileText className="w-16 h-16 mb-4 text-slate-200" />
                       <p>Select a submission to review</p>
                    </div>
                  )}
               </div>
            </div>
         )}

         {activeTab === 'news' && (
            <div className="p-8">
               <div className="flex justify-between items-end mb-8 border-b border-slate-100 pb-4">
                  <h3 className="text-2xl font-bold text-slate-900">Manage News</h3>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div>
                     <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><PlusCircle className="w-5 h-5 text-emerald-500" /> Add New Post</h4>
                     <form onSubmit={handleCreateNews} className="space-y-4 bg-slate-50 p-6 rounded-xl border border-slate-200">
                        
                        <div className="space-y-4">
                           <h5 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-2">Titles</h5>
                           
                           <div>
                             <label className="block text-xs font-medium text-slate-500 mb-1">English Title</label>
                             <input required placeholder="Enter English title" value={newsForm.titleEn} onChange={e => setNewsForm({...newsForm, titleEn: e.target.value})} className="w-full text-sm p-2.5 border rounded-lg border-slate-300 focus:ring-emerald-500 focus:border-emerald-500" />
                           </div>

                           <div>
                             <label className="block text-xs font-medium text-slate-500 mb-1">Uzbek Title</label>
                             <input required placeholder="Enter Uzbek title" value={newsForm.titleUz} onChange={e => setNewsForm({...newsForm, titleUz: e.target.value})} className="w-full text-sm p-2.5 border rounded-lg border-slate-300 focus:ring-emerald-500 focus:border-emerald-500" />
                           </div>

                           <div>
                             <label className="block text-xs font-medium text-slate-500 mb-1">Russian Title</label>
                             <input required placeholder="Enter Russian title" value={newsForm.titleRu} onChange={e => setNewsForm({...newsForm, titleRu: e.target.value})} className="w-full text-sm p-2.5 border rounded-lg border-slate-300 focus:ring-emerald-500 focus:border-emerald-500" />
                           </div>
                        </div>

                        <div className="space-y-4 pt-4 mt-4 border-t border-slate-200">
                           <h5 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-2">Descriptions</h5>
                           
                           <div>
                             <label className="block text-xs font-medium text-slate-500 mb-1">English Content</label>
                             <textarea required placeholder="Enter English content" value={newsForm.descEn} onChange={e => setNewsForm({...newsForm, descEn: e.target.value})} className="w-full text-sm p-2.5 border rounded-lg border-slate-300 focus:ring-emerald-500 focus:border-emerald-500 h-24" />
                           </div>

                           <div>
                             <label className="block text-xs font-medium text-slate-500 mb-1">Uzbek Content</label>
                             <textarea required placeholder="Enter Uzbek content" value={newsForm.descUz} onChange={e => setNewsForm({...newsForm, descUz: e.target.value})} className="w-full text-sm p-2.5 border rounded-lg border-slate-300 focus:ring-emerald-500 focus:border-emerald-500 h-24" />
                           </div>

                           <div>
                             <label className="block text-xs font-medium text-slate-500 mb-1">Russian Content</label>
                             <textarea required placeholder="Enter Russian content" value={newsForm.descRu} onChange={e => setNewsForm({...newsForm, descRu: e.target.value})} className="w-full text-sm p-2.5 border rounded-lg border-slate-300 focus:ring-emerald-500 focus:border-emerald-500 h-24" />
                           </div>
                        </div>

                        <div className="pt-2">
                           <label className="text-sm font-bold text-slate-700 block mb-2">Image or Video URL</label>
                           <input placeholder="https://..." value={newsForm.imageUrl} onChange={e => setNewsForm({...newsForm, imageUrl: e.target.value})} className="w-full text-sm p-2 border rounded border-slate-300" />
                           <p className="text-xs text-slate-500 mt-1">Provide a direct URL to an image. (Ideally hosted on Unsplash or imgur)</p>
                        </div>

                        <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-lg transition-colors mt-4">
                           Publish News
                        </button>
                     </form>
                  </div>

                  <div>
                     <h4 className="font-bold text-slate-800 mb-4">Published News</h4>
                     <div className="space-y-4">
                        {loadingData ? <p className="text-sm text-slate-500">Loading...</p> : null}
                        {news.map(n => (
                           <div key={n.id} className="flex gap-4 p-4 border border-slate-200 rounded-xl hover:border-slate-300 transition-colors">
                              {n.imageUrl && (n.imageUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/) ? <div className="w-20 h-20 bg-slate-200 rounded-lg shrink-0 flex items-center justify-center text-[10px] text-slate-500 font-bold p-2 text-center border">YouTube Video</div> : <img src={n.imageUrl} alt="" className="w-20 h-20 object-cover rounded-lg bg-slate-100 shrink-0" />)}
                              <div className="flex-1">
                                 <h5 className="font-bold text-sm text-slate-900 mb-1">{n.title.en}</h5>
                                 <p className="text-xs text-slate-500 line-clamp-2 mb-2">{n.description.en}</p>
                                 <div className="flex justify-between items-center">
                                    <span className="text-[10px] text-slate-400 font-medium uppercase">{new Date(n.createdAt).toLocaleDateString()}</span>
                                    <button onClick={() => handleDeleteNews(n.id)} className="text-rose-500 hover:text-rose-700 text-xs font-medium flex items-center gap-1">
                                       <Trash2 className="w-3 h-3" /> Delete
                                    </button>
                                 </div>
                              </div>
                           </div>
                        ))}
                        {news.length === 0 && !loadingData && (
                           <div className="text-sm text-slate-500 italic p-4 bg-slate-50 rounded-lg border border-slate-100 text-center">No news items available. Add one to get started.</div>
                        )}
                     </div>
                  </div>
               </div>
            </div>
         )}
         
         {activeTab === 'results' && (
            <div className="p-8">
               <div className="flex justify-between items-end mb-8 border-b border-slate-100 pb-4">
                  <h3 className="text-2xl font-bold text-slate-900">Manage Results</h3>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div>
                     <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><PlusCircle className="w-5 h-5 text-emerald-500" /> Add New Result</h4>
                     <form onSubmit={handleCreateResult} className="space-y-4 bg-slate-50 p-6 rounded-xl border border-slate-200">
                        
                        <div className="space-y-3">
                           <label className="text-sm font-bold text-slate-700 block mb-2">Year</label>
                           <input type="number" required value={resultsForm.year} onChange={e => setResultsForm({...resultsForm, year: e.target.value})} className="w-full text-sm p-2 border rounded border-slate-300" />
                        </div>

                        <div className="space-y-3">
                           <label className="text-sm font-bold text-slate-700 block mb-2">Titles</label>
                           <input required placeholder="English Title" value={resultsForm.titleEn} onChange={e => setResultsForm({...resultsForm, titleEn: e.target.value})} className="w-full text-sm p-2 border rounded border-slate-300" />
                           <input required placeholder="Uzbek Title" value={resultsForm.titleUz} onChange={e => setResultsForm({...resultsForm, titleUz: e.target.value})} className="w-full text-sm p-2 border rounded border-slate-300" />
                           <input required placeholder="Russian Title" value={resultsForm.titleRu} onChange={e => setResultsForm({...resultsForm, titleRu: e.target.value})} className="w-full text-sm p-2 border rounded border-slate-300" />
                        </div>

                        <div className="space-y-3 pt-2">
                           <label className="text-sm font-bold text-slate-700">Descriptions</label>
                           <textarea required placeholder="English Content" value={resultsForm.descEn} onChange={e => setResultsForm({...resultsForm, descEn: e.target.value})} className="w-full text-sm p-2 border rounded border-slate-300 h-20" />
                           <textarea required placeholder="Uzbek Content" value={resultsForm.descUz} onChange={e => setResultsForm({...resultsForm, descUz: e.target.value})} className="w-full text-sm p-2 border rounded border-slate-300 h-20" />
                           <textarea required placeholder="Russian Content" value={resultsForm.descRu} onChange={e => setResultsForm({...resultsForm, descRu: e.target.value})} className="w-full text-sm p-2 border rounded border-slate-300 h-20" />
                        </div>

                        <div className="pt-2">
                           <label className="text-sm font-bold text-slate-700 block mb-2">Image URL</label>
                           <input placeholder="https://..." value={resultsForm.imageUrl} onChange={e => setResultsForm({...resultsForm, imageUrl: e.target.value})} className="w-full text-sm p-2 border rounded border-slate-300" />
                        </div>

                        <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-lg transition-colors mt-4">
                           Publish Result
                        </button>
                     </form>
                  </div>

                  <div>
                     <h4 className="font-bold text-slate-800 mb-4">Published Results</h4>
                     <div className="space-y-4">
                        {loadingData ? <p className="text-sm text-slate-500">Loading...</p> : null}
                        {resultsList.map(r => (
                           <div key={r.id} className="flex gap-4 p-4 border border-slate-200 rounded-xl hover:border-slate-300 transition-colors">
                              {r.imageUrl && (r.imageUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/) ? <div className="w-20 h-20 bg-slate-200 rounded-lg shrink-0 flex items-center justify-center text-[10px] text-slate-500 font-bold p-2 text-center border">YouTube Video</div> : <img src={r.imageUrl} alt="" className="w-20 h-20 object-cover rounded-lg bg-slate-100 shrink-0" />)}
                              <div className="flex-1">
                                 <h5 className="font-bold text-sm text-slate-900 mb-1">{r.title.en}</h5>
                                 <p className="text-xs text-slate-500 line-clamp-2 mb-2">{r.description.en}</p>
                                 <div className="flex justify-between items-center">
                                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold uppercase">Year: {r.year}</span>
                                    <button onClick={() => handleDeleteResult(r.id)} className="text-rose-500 hover:text-rose-700 text-xs font-medium flex items-center gap-1">
                                       <Trash2 className="w-3 h-3" /> Delete
                                    </button>
                                 </div>
                              </div>
                           </div>
                        ))}
                        {resultsList.length === 0 && !loadingData && (
                           <div className="text-sm text-slate-500 italic p-4 bg-slate-50 rounded-lg border border-slate-100 text-center">No results have been published yet. Add some to get started.</div>
                        )}
                     </div>
                  </div>
               </div>
            </div>
         )}

      </div>

      {isDetailsModalOpen && selectedSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
               <h2 className="text-xl font-bold text-slate-900">Application Details</h2>
               <button 
                 onClick={() => setIsDetailsModalOpen(false)}
                 className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
               >
                 <XCircle className="w-5 h-5" />
               </button>
            </div>
            
            <div className="p-6 space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                   <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Applicant Name</h3>
                   <p className="text-lg font-medium text-slate-900">{selectedSub.fullName}</p>
                 </div>
                 <div>
                   <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Email</h3>
                   <p className="text-base text-slate-700">{selectedSub.email}</p>
                 </div>
                 <div>
                   <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Phone</h3>
                   <p className="text-base text-slate-700">{selectedSub.phone || '-'}</p>
                 </div>
                 <div>
                   <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Age</h3>
                   <p className="text-base text-slate-700">{selectedSub.age || '-'}</p>
                 </div>
                 <div>
                   <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Country</h3>
                   <p className="text-base text-slate-700">{selectedSub.country || '-'}</p>
                 </div>
                 <div>
                   <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">City</h3>
                   <p className="text-base text-slate-700">{selectedSub.city || '-'}</p>
                 </div>
                 <div>
                   <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">School Name</h3>
                   <p className="text-base text-slate-700">{selectedSub.schoolName || '-'}</p>
                 </div>
                 <div>
                   <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Status</h3>
                   <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                     ${selectedSub.status === 'pending' ? 'bg-amber-100 text-amber-800' : 
                       selectedSub.status === 'selected' ? 'bg-emerald-100 text-emerald-800' : 
                       'bg-rose-100 text-rose-800'}`}>
                     {selectedSub.status}
                   </span>
                 </div>
                 <div>
                   <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Project Title</h3>
                   <p className="text-base text-slate-700">{selectedSub.projectTitle || '-'}</p>
                 </div>
                 <div>
                   <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Category & Type</h3>
                   <p className="text-base text-slate-700">{(selectedSub.category || '-') + " / " + (selectedSub.participationType || '-')}</p>
                 </div>
                 <div>
                   <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">File</h3>
                   {selectedSub.fileUrl ? (
                     <a href={selectedSub.fileUrl} target="_blank" rel="noreferrer" className="text-teal-600 hover:text-teal-800 font-medium underline break-all">
                       {selectedSub.fileName || "View Presentation/PDF"}
                     </a>
                   ) : <p className="text-base text-slate-700">-</p>}
                 </div>
               </div>

               <div>
                 <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Team Members</h3>
                 <p className="text-slate-700">{Array.isArray(selectedSub.teamMembers) ? selectedSub.teamMembers.join(', ') : selectedSub.teamMembers || '-'}</p>
               </div>

               <div>
                 <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Project Abstract</h3>
                 <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                    <p className="text-slate-700 whitespace-pre-wrap leading-relaxed text-sm">{selectedSub.abstract}</p>
                 </div>
               </div>

               <div>
                 <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Personal Statement</h3>
                 <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                    <p className="text-slate-700 whitespace-pre-wrap leading-relaxed text-sm">{selectedSub.personalStatement}</p>
                 </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                 <div>
                   <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Heard About RSEF via</h3>
                   <p className="text-base text-slate-700">{selectedSub.heardAbout === 'Other' ? `Other (${selectedSub.otherHeardAbout})` : selectedSub.heardAbout || '-'}</p>
                 </div>
                 <div>
                   <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Competed Before?</h3>
                   <p className="text-base text-slate-700">{selectedSub.competedBefore || '-'}</p>
                 </div>
                 <div>
                   <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Need Travel Support?</h3>
                   <p className="text-base text-slate-700">{selectedSub.travelSupport || '-'}</p>
                 </div>
               </div>

               <div className="pt-4 border-t border-slate-100">
                 <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Blitz Questions</h3>
                 <div className="space-y-4">
                   {selectedSub.blitz1 && (
                     <div>
                       <p className="text-sm font-semibold text-slate-800 mb-1">1. Can an ecosystem become dependent on pollution to function?</p>
                       <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-md border border-slate-100">{selectedSub.blitz1}</p>
                     </div>
                   )}
                   {selectedSub.blitz2 && (
                     <div>
                       <p className="text-sm font-semibold text-slate-800 mb-1">2. Can consciousness exist without a body?</p>
                       <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-md border border-slate-100">{selectedSub.blitz2}</p>
                     </div>
                   )}
                   {selectedSub.blitz3 && (
                     <div>
                       <p className="text-sm font-semibold text-slate-800 mb-1">3. If atoms are mostly empty space, why do objects feel solid?</p>
                       <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-md border border-slate-100">{selectedSub.blitz3}</p>
                     </div>
                   )}
                 </div>
               </div>
            </div>
            
            <div className="p-6 border-t border-slate-100 bg-slate-50 rounded-b-2xl flex justify-end">
               <button 
                 onClick={() => setIsDetailsModalOpen(false)}
                 className="px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-medium rounded-lg transition-colors"
               >
                 Close
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
