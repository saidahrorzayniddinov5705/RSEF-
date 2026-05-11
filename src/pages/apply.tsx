import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthProvider';
import { db } from '../lib/firebase';
import { storage } from '../lib/firebase';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { handleFirestoreError, OperationType } from '../lib/firestoreInfo';
import { useNavigate, useParams } from 'react-router-dom';
import { applyTranslations } from '../data/applyTranslations';
import { cn } from '../lib/utils';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
  "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
  "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
  "Denmark", "Djibouti", "Dominica", "Dominican Republic",
  "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
  "Fiji", "Finland", "France",
  "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
  "Haiti", "Honduras", "Hungary",
  "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
  "Jamaica", "Japan", "Jordan",
  "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan",
  "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
  "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar",
  "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway",
  "Oman",
  "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
  "Qatar",
  "Romania", "Russia", "Rwanda",
  "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
  "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
  "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
  "Vanuatu", "Vatican City", "Venezuela", "Vietnam",
  "Yemen",
  "Zambia", "Zimbabwe"
];

const categories = [
  "Animal Sciences (ANIM)",
  "Behavioral and Social Sciences (BEHA)",
  "Biochemistry (BCHM)",
  "Biomedical and Health Sciences (BMED)",
  "Biomedical Engineering (ENBM)",
  "Cellular and Molecular Biology (CELL)",
  "Chemistry (CHEM)",
  "Computational Biology and Bioinformatics (CBIO)",
  "Earth and Environmental Sciences (EAEV)",
  "Embedded Systems (EBED)",
  "Energy: Sustainable Materials and Design (EGSD)",
  "Engineering Technology: Statics and Dynamics (ETSD)",
  "Environmental Engineering (ENEV)",
  "Materials Science (MATS)",
  "Mathematics (MATH)",
  "Microbiology (MCRO)",
  "Physics and Astronomy (PHYS)",
  "Plant Sciences (PLNT)",
  "Robotics and Intelligent Machines (ROBO)",
  "Software Design (SFTD)",
  "Technology Enhances the Arts (TECA)",
  "Translational Medical Science"
];

export function ApplyPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { locale } = useParams();
  const t = applyTranslations[(locale as keyof typeof applyTranslations) || 'en'] || applyTranslations.en;

  const [loadingData, setLoadingData] = useState(true);
  const [submissionExists, setSubmissionExists] = useState(false);
  const [status, setStatus] = useState<string>('pending');
  const [currentStep, setCurrentStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const totalSteps = 5;
  
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    country: '',
    city: '',
    schoolName: '',
    email: '',
    phone: '',
    personalStatement: '',
    projectTitle: '',
    category: categories[0],
    participationType: 'individual',
    teamMembers: '',
    abstract: '',
    fileUrl: '',
    fileName: '',
    heardAbout: 'Google',
    otherHeardAbout: '',
    competedBefore: 'No',
    travelSupport: 'No',
    blitz1: '',
    blitz2: '',
    blitz3: ''
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate(`/${locale}/register`);
    }
  }, [user, loading, navigate, locale]);

  useEffect(() => {
    if (user) {
      fetchSubmission();
    }
  }, [user]);

  const fetchSubmission = async () => {
    try {
      const docRef = doc(db, 'submissions', user!.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setSubmissionExists(true);
        setStatus(data.status);
        setFormData({
          fullName: data.fullName || '',
          age: data.age || '',
          country: data.country || '',
          city: data.city || '',
          schoolName: data.schoolName || '',
          email: data.email || '',
          phone: data.phone || '',
          personalStatement: data.personalStatement || '',
          projectTitle: data.projectTitle || '',
          category: data.category || categories[0],
          participationType: data.participationType || 'individual',
          teamMembers: data.teamMembers || '',
          abstract: data.abstract || '',
          fileUrl: data.fileUrl || '',
          fileName: data.fileName || '',
          heardAbout: data.heardAbout || 'Google',
          otherHeardAbout: data.otherHeardAbout || '',
          competedBefore: data.competedBefore || 'No',
          travelSupport: data.travelSupport || 'No',
          blitz1: data.blitz1 || '',
          blitz2: data.blitz2 || '',
          blitz3: data.blitz3 || '',
        });
      }
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, `submissions/${user!.uid}`);
    } finally {
      setLoadingData(false);
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!user) return;
    
    // Abstract is required but file upload is optional in UI (although currently required in previous code, let's keep it optional to match image "Upload PDF or presentation optional at this stage")
    // Wait, the user said "faqat majburiy degnlarimiz majburiy optional deganlarimiz optionalligicha qolishi kerak". So file upload is optional.

    try {
      setLoadingData(true);
      
      if (!file && !formData.fileUrl) {
        alert("Iltimos, PDF yoki taqdimot faylini yuklang.");
        setLoadingData(false);
        return;
      }

      let finalFileUrl = formData.fileUrl;
      let finalFileName = formData.fileName;

      if (file) {
         try {
           setUploadingFile(true);
           const fileRef = ref(storage, `applications/${user.uid}/${file.name}`);
           await uploadBytes(fileRef, file);
           finalFileUrl = await getDownloadURL(fileRef);
           finalFileName = file.name;
         } catch(uploadErr: any) {
           console.error("Upload error:", uploadErr);
           alert("Faylni yuklashda xatolik yuz berdi. Iltimos, Firebase Console'da 'Storage' yoqilganligini tekshiring.");
           setUploadingFile(false);
           setLoadingData(false);
           return;
         } finally {
           setUploadingFile(false);
         }
      }

      const docRef = doc(db, 'submissions', user.uid);

      const submissionData = {
        ...formData,
        fileUrl: finalFileUrl,
        fileName: finalFileName,
        userId: user.uid,
        updatedAt: serverTimestamp()
      };

      if (submissionExists) {
         alert("Updating submissions is not allowed.");
         setLoadingData(false);
         return;
      } else {
         await setDoc(docRef, { ...submissionData, status: 'pending', createdAt: serverTimestamp() });
         setSubmissionExists(true);
         setStatus('pending');
      }
      alert(t.form.success);
    } catch(err: any) {
       console.error("Submission error:", err);
       alert("Xatolik yuz berdi: " + err.message);
       // handleFirestoreError throws an error, so we call it after alerting the user
       try {
         handleFirestoreError(err, OperationType.WRITE, `submissions/${user.uid}`);
       } catch (e) {}
    } finally {
       setLoadingData(false);
       setUploadingFile(false);
    }
  };

  const handleNext = () => {
    // Validate current step fields before going next (optional simple validation)
    // We can rely on required attributes and native form validation if we use a <form onSubmit={handleNext}> for intermediate steps, or just manually check.
    // For simplicity, just increment step for now if not submitted.
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  if (loading || loadingData) {
    return <div className="w-full min-h-screen flex items-center justify-center p-12 text-slate-600 text-xl font-serif">Loading...</div>;
  }

  const stepTitles = [
    "ABOUT YOU",
    "YOUR PROJECT",
    "QUICK QUESTIONS",
    "SCIENCE PUZZLES",
    "PERSONAL STATEMENT"
  ];

  return (
    <div className="w-full min-h-screen bg-[#F7F5F0] py-24 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto w-full">
        
        {/* Header section matching design */}
        <div className="mb-12">
           <div className="uppercase tracking-widest text-xs font-bold text-slate-500 mb-4 border-b-2 border-slate-900 pb-2">
             RSEF 2026 · RESEARCH, SCIENCE & ENGINEERING FAIR
           </div>
           <h1 className="text-4xl sm:text-5xl font-serif text-[#0c182c] mb-4">Application Form</h1>
           <p className="text-[#5a6069] text-base leading-relaxed">
             This form takes about 15–20 minutes. There are no right answers — only honest ones.
           </p>
        </div>

        {submissionExists && (
           <div className="mb-10 p-5 rounded-lg border border-slate-200 bg-white shadow-sm">
              <h3 className="font-serif text-slate-800 text-lg mb-2">{t.statusTitle}</h3>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold tracking-wide
                ${status === 'pending' ? 'bg-amber-100 text-amber-800' : 
                  status === 'selected' ? 'bg-teal-100 text-teal-800' : 
                  'bg-rose-100 text-rose-800'}`}>
                {status === 'pending' ? t.labels.wait : status === 'selected' ? t.labels.selected : t.labels.declined}
              </span>
           </div>
        )}

        <form onSubmit={e => {
          e.preventDefault();
          if (currentStep === totalSteps) {
            handleSubmit();
          } else {
            handleNext();
          }
        }} className="space-y-10">
          
          {/* Progress Bar */}
          <div className="flex w-full gap-2 mb-8">
            {[1, 2, 3, 4, 5].map(step => (
              <div key={step} className={cn(
                "h-1.5 flex-1 rounded-full transition-colors duration-300",
                step <= currentStep ? "bg-[#0c182c]" : "bg-[#dfdbd1]"
              )} />
            ))}
          </div>

          <div className="text-xs font-bold tracking-widest text-[#8a867d] uppercase mb-8">
            STEP {currentStep} OF 5 — {stepTitles[currentStep - 1]}
          </div>

          {/* STEP 1: ABOUT YOU */}
          {currentStep === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
              <div>
                <h2 className="text-3xl font-serif text-[#0c182c] mb-2 cursor-text select-text hover:bg-slate-100 transition-colors">Tell us who you are.</h2>
                <p className="text-[#5a6069] cursor-text select-text hover:bg-slate-100 transition-colors">Just the basics. No pressure — this is just so we know how to reach you.</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-[13px] font-bold text-[#0c182c] mb-1.5">{t.form.name} <span className="text-red-500 ml-1">*</span></label>
                  <input type="text" required disabled={submissionExists} value={formData.fullName}
                    onChange={e => setFormData({...formData, fullName: e.target.value})}
                    placeholder="As it appears on your school ID"
                    className="w-full rounded-xl border-2 border-[#dfdbd1] bg-[#fdfdfc] px-4 py-3.5 placeholder:text-slate-400 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 disabled:bg-slate-50 transition-all font-medium text-[#0c182c] shadow-sm hover:border-[#cbd0d6]" />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[13px] font-bold text-[#0c182c] mb-1.5">{t.form.age} <span className="text-red-500 ml-1">*</span></label>
                    <input type="number" required disabled={submissionExists} value={formData.age}
                      onChange={e => setFormData({...formData, age: e.target.value})}
                      placeholder="e.g. 16"
                      className="w-full rounded-xl border-2 border-[#dfdbd1] bg-[#fdfdfc] px-4 py-3.5 placeholder:text-slate-400 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 disabled:bg-slate-50 transition-all font-medium text-[#0c182c] shadow-sm hover:border-[#cbd0d6]" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[13px] font-bold text-[#0c182c] mb-1.5">{t.form.country} <span className="text-red-500 ml-1">*</span></label>
                      <select required disabled={submissionExists} value={formData.country}
                        onChange={e => setFormData({...formData, country: e.target.value})}
                        className="w-full rounded-xl border-2 border-[#dfdbd1] bg-[#fdfdfc] px-4 py-3.5 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 disabled:bg-slate-50 transition-all font-medium text-[#0c182c] shadow-sm hover:border-[#cbd0d6]">
                        <option value="" disabled>Select...</option>
                        {countries.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[13px] font-bold text-[#0c182c] mb-1.5">{t.form.city} <span className="text-red-500 ml-1">*</span></label>
                      <input type="text" required disabled={submissionExists} value={formData.city}
                        onChange={e => setFormData({...formData, city: e.target.value})}
                        placeholder="City"
                        className="w-full rounded-xl border-2 border-[#dfdbd1] bg-[#fdfdfc] px-4 py-3.5 placeholder:text-slate-400 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 disabled:bg-slate-50 transition-all font-medium text-[#0c182c] shadow-sm hover:border-[#cbd0d6]" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-[#0c182c] mb-1.5">{t.form.schoolName} <span className="text-red-500 ml-1">*</span></label>
                  <input type="text" required disabled={submissionExists} value={formData.schoolName}
                    onChange={e => setFormData({...formData, schoolName: e.target.value})}
                    placeholder="Full official name"
                    className="w-full rounded-xl border-2 border-[#dfdbd1] bg-[#fdfdfc] px-4 py-3.5 placeholder:text-slate-400 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 disabled:bg-slate-50 transition-all font-medium text-[#0c182c] shadow-sm hover:border-[#cbd0d6]" />
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-[#0c182c] mb-1.5">{t.form.email} <span className="text-red-500 ml-1">*</span></label>
                  <input type="email" required disabled={submissionExists} value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    placeholder="You'll hear from us here"
                    className="w-full rounded-xl border-2 border-[#dfdbd1] bg-[#fdfdfc] px-4 py-3.5 placeholder:text-slate-400 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 disabled:bg-slate-50 transition-all font-medium text-[#0c182c] shadow-sm hover:border-[#cbd0d6]" />
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-[#0c182c] mb-1.5">Phone number <span className="text-red-500 ml-1">*</span></label>
                  <PhoneInput
                    international
                    defaultCountry="UZ"
                    disabled={submissionExists}
                    value={formData.phone}
                    onChange={(value) => setFormData({...formData, phone: value || ''})}
                    className="w-full rounded-xl border-2 border-[#dfdbd1] bg-[#fdfdfc] px-4 py-3.5 placeholder:text-slate-400 focus-within:bg-white focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-600/10 disabled:bg-slate-50 transition-all font-medium text-[#0c182c] shadow-sm hover:border-[#cbd0d6] apply-phone-input"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: YOUR PROJECT */}
          {currentStep === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
              <div>
                <h2 className="text-3xl font-serif text-[#0c182c] mb-2 cursor-text select-text hover:bg-slate-100 transition-colors">Your project.</h2>
                <p className="text-[#5a6069] cursor-text select-text hover:bg-slate-100 transition-colors">Tell us what you built, studied, or discovered. The abstract is the most important thing here — take your time with it.</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-[13px] font-bold text-[#0c182c] mb-1.5">{t.form.projectTitle} <span className="text-red-500 ml-1">*</span></label>
                  <input type="text" required disabled={submissionExists} value={formData.projectTitle}
                    onChange={e => setFormData({...formData, projectTitle: e.target.value})}
                    placeholder="Keep it clear — no need to be dramatic"
                    className="w-full rounded-xl border-2 border-[#dfdbd1] bg-[#fdfdfc] px-4 py-3.5 placeholder:text-slate-400 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 disabled:bg-slate-50 transition-all font-medium text-[#0c182c] shadow-sm hover:border-[#cbd0d6]" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[13px] font-bold text-[#0c182c] mb-1.5">{t.form.category} <span className="text-red-500 ml-1">*</span></label>
                    <select required disabled={submissionExists} value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                      className="w-full rounded-xl border-2 border-[#dfdbd1] bg-[#fdfdfc] px-4 py-3.5 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 disabled:bg-slate-50 transition-all font-medium text-[#0c182c] shadow-sm hover:border-[#cbd0d6]">
                      {categories.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-[#0c182c] mb-1.5">Individual or team? <span className="text-red-500 ml-1">*</span></label>
                    <div className="flex rounded-md border border-[#dfdbd1] overflow-hidden">
                       <button type="button" disabled={submissionExists}
                         onClick={() => setFormData({...formData, participationType: 'individual'})}
                         className={cn(
                           "flex-1 py-3 text-sm font-bold transition-colors",
                           formData.participationType === 'individual' ? "bg-[#0c182c] text-white" : "bg-white text-[#0c182c] hover:bg-slate-50"
                         )}>
                         Individual
                       </button>
                       <div className="w-[1px] bg-[#dfdbd1]"></div>
                       <button type="button" disabled={submissionExists}
                         onClick={() => setFormData({...formData, participationType: 'team'})}
                         className={cn(
                           "flex-1 py-3 text-sm font-bold transition-colors",
                           formData.participationType === 'team' ? "bg-[#0c182c] text-white" : "bg-white text-[#0c182c] hover:bg-slate-50"
                         )}>
                         Team
                       </button>
                    </div>
                  </div>
                </div>

                {formData.participationType === 'team' && (
                  <div>
                    <label className="block text-[13px] font-bold text-[#0c182c] mb-1.5">{t.form.teamMembers} <span className="text-red-500 ml-1">*</span></label>
                    <input type="text" required disabled={submissionExists} value={formData.teamMembers}
                      onChange={e => setFormData({...formData, teamMembers: e.target.value})}
                      placeholder={t.form.teamHint}
                      className="w-full rounded-xl border-2 border-[#dfdbd1] bg-[#fdfdfc] px-4 py-3.5 placeholder:text-slate-400 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 disabled:bg-slate-50 transition-all font-medium text-[#0c182c] shadow-sm hover:border-[#cbd0d6]" />
                  </div>
                )}

                <div>
                   <label className="block text-[13px] font-bold text-[#0c182c] mb-1.5">
                     Abstract <span className="text-red-500 ml-1">*</span> <span className="font-normal text-slate-400 ml-2">up to 300 words</span>
                   </label>
                   <textarea required rows={7} disabled={submissionExists} value={formData.abstract}
                     onChange={e => setFormData({...formData, abstract: e.target.value})}
                     placeholder="Describe your project — the question you asked, how you approached it, what you found, and why it matters. Write it so a smart person outside your field can follow it."
                     className="w-full rounded-xl border-2 border-[#dfdbd1] bg-[#fdfdfc] px-4 py-3.5 placeholder:text-slate-400 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 disabled:bg-slate-50 transition-all font-medium text-[#0c182c] shadow-sm hover:border-[#cbd0d6] resize-none" />
                   <div className="text-right text-xs text-slate-400 mt-1">
                     {formData.abstract.split(/\s+/).filter(w => w.length > 0).length} / 300 words
                   </div>
                </div>

                <div>
                   <label className="block text-[13px] font-bold text-[#0c182c] mb-1.5">
                     Upload PDF or presentation <span className="text-red-500 ml-1">*</span>
                   </label>
                   {!submissionExists && (
                     <input 
                       type="file" 
                       accept=".pdf,.ppt,.pptx" 
                       required={!file && !formData.fileUrl} 
                       onChange={e => {
                          if (e.target.files && e.target.files[0]) {
                             setFile(e.target.files[0]);
                          } else {
                             setFile(null);
                          }
                       }}
                       className="w-full rounded-xl border-2 border-[#dfdbd1] bg-[#fdfdfc] px-4 py-3.5 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 cursor-pointer shadow-sm hover:border-[#cbd0d6] file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#0c182c] file:text-white hover:file:opacity-90" 
                     />
                   )}
                   {(formData.fileUrl || file) && (
                     <div className="mt-3 text-sm font-medium text-[#0c182c] p-3 border border-slate-200 rounded-md bg-slate-50 overflow-hidden text-ellipsis whitespace-nowrap">
                        {file ? file.name : <a href={formData.fileUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline hover:text-blue-800 transition-colors">View uploaded file ({formData.fileName || "Link"})</a>}
                     </div>
                   )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: QUICK QUESTIONS */}
          {currentStep === 3 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
              <div>
                <h2 className="text-3xl font-serif text-[#0c182c] mb-2 cursor-text select-text hover:bg-slate-100 transition-colors">A few quick questions.</h2>
                <p className="text-[#5a6069] cursor-text select-text hover:bg-slate-100 transition-colors">Short answers are fine here.</p>
              </div>

              <div className="space-y-10 border-t border-[#dfdbd1] pt-8">
                 <div>
                    <label className="block text-[14px] font-bold text-[#0c182c] mb-4">How did you hear about RSEF? <span className="text-red-500 ml-1">*</span></label>
                    <div className="space-y-4">
                      {['From a friend', 'From a professor, mentor, or teacher', 'Google', 'Telegram or Instagram', 'Other'].map(opt => (
                        <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                          <input type="radio" required name="heardAbout" disabled={submissionExists} checked={formData.heardAbout === opt}
                            onChange={() => setFormData({...formData, heardAbout: opt})}
                            className="w-5 h-5 border-2 border-[#dfdbd1] text-blue-600 focus:ring-blue-600 transition-colors" />
                          <span className="text-[#0c182c] font-medium block mt-1 leading-none group-hover:text-amber-700 transition-colors">{opt}</span>
                        </label>
                      ))}
                    </div>
                    {formData.heardAbout === 'Other' && (
                       <div className="mt-4">
                          <input type="text" required disabled={submissionExists} value={formData.otherHeardAbout}
                             onChange={e => setFormData({...formData, otherHeardAbout: e.target.value})}
                             placeholder="Please specify..."
                             className="w-full rounded-xl border-2 border-[#dfdbd1] bg-[#fdfdfc] px-4 py-3.5 placeholder:text-slate-400 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 disabled:bg-slate-50 transition-all font-medium text-[#0c182c] shadow-sm hover:border-[#cbd0d6]" />
                       </div>
                    )}
                 </div>

                 <div className="border-t border-[#dfdbd1] pt-8">
                    <label className="block text-[14px] font-bold text-[#0c182c] mb-4">Have you participated in any science competitions before? <span className="text-red-500 ml-1">*</span></label>
                    <div className="grid grid-cols-2 gap-4">
                       <label className={cn(
                          "flex items-center justify-center p-4 border rounded-md cursor-pointer transition-colors font-medium",
                          formData.competedBefore === 'Yes' ? "border-[#0c182c] bg-white text-[#0c182c] shadow-[0_0_0_1px_#0c182c]" : "border-[#dfdbd1] bg-white hover:bg-slate-50 text-[#0c182c]"
                       )}>
                          <input type="radio" className="sr-only" name="competedBefore" value="Yes" checked={formData.competedBefore === 'Yes'} onChange={(e) => setFormData({...formData, competedBefore: e.target.value})} disabled={submissionExists} />
                          Yes
                       </label>
                       <label className={cn(
                          "flex items-center justify-center p-4 border rounded-md cursor-pointer transition-colors font-medium",
                          formData.competedBefore === 'No' ? "border-[#0c182c] bg-white text-[#0c182c] shadow-[0_0_0_1px_#0c182c]" : "border-[#dfdbd1] bg-white hover:bg-slate-50 text-[#0c182c]"
                       )}>
                          <input type="radio" className="sr-only" name="competedBefore" value="No" checked={formData.competedBefore === 'No'} onChange={(e) => setFormData({...formData, competedBefore: e.target.value})} disabled={submissionExists} />
                          No
                       </label>
                    </div>
                 </div>

                 <div className="border-t border-[#dfdbd1] pt-8">
                    <label className="block text-[14px] font-bold text-[#0c182c] mb-4">Do you need travel support to attend? <span className="text-red-500 ml-1">*</span></label>
                    <div className="grid grid-cols-2 gap-4">
                       <label className={cn(
                          "flex items-center justify-center p-4 border rounded-md cursor-pointer transition-colors font-medium",
                          formData.travelSupport === 'Yes' ? "border-[#0c182c] bg-white text-[#0c182c] shadow-[0_0_0_1px_#0c182c]" : "border-[#dfdbd1] bg-white hover:bg-slate-50 text-[#0c182c]"
                       )}>
                          <input type="radio" className="sr-only" name="travelSupport" value="Yes" checked={formData.travelSupport === 'Yes'} onChange={(e) => setFormData({...formData, travelSupport: e.target.value})} disabled={submissionExists} />
                          Yes
                       </label>
                       <label className={cn(
                          "flex items-center justify-center p-4 border rounded-md cursor-pointer transition-colors font-medium",
                          formData.travelSupport === 'No' ? "border-[#0c182c] bg-white text-[#0c182c] shadow-[0_0_0_1px_#0c182c]" : "border-[#dfdbd1] bg-white hover:bg-slate-50 text-[#0c182c]"
                       )}>
                          <input type="radio" className="sr-only" name="travelSupport" value="No" checked={formData.travelSupport === 'No'} onChange={(e) => setFormData({...formData, travelSupport: e.target.value})} disabled={submissionExists} />
                          No
                       </label>
                    </div>
                 </div>
              </div>
            </div>
          )}

          {/* STEP 4: SCIENCE PUZZLES */}
          {currentStep === 4 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
              <div>
                <h2 className="text-3xl font-serif text-[#0c182c] mb-2 cursor-text select-text hover:bg-slate-100 transition-colors">Three problems.</h2>
                <p className="text-[#5a6069] cursor-text select-text hover:bg-slate-100 transition-colors line-clamp-3">These are not knowledge tests. We're not checking your textbook. We want to see how you reason — how you break things apart, ask questions, and think under uncertainty. Write however feels natural.</p>
              </div>

              <div className="space-y-6">
                 {/* PUZZLE 1 */}
                 <div className="bg-white border-2 text-left border-[#dfdbd1] rounded-xl p-8 shadow-sm focus-within:ring-4 focus-within:ring-blue-600/10 focus-within:border-blue-600 transition-all hover:border-[#cbd0d6]">
                    <div className="text-[11px] font-bold tracking-widest text-[#8a867d] uppercase mb-4">PROBLEM 1 — REQUIRED</div>
                    <h3 className="text-xl font-serif text-[#0c182c] mb-4">The Cluster <span className="text-red-500 font-sans text-xl ml-1">*</span></h3>
                    <p className="italic text-[#5a6069] mb-4">A rural school of 200 students suddenly sees 12 cases of severe headaches in one week — all from the same classroom. No one is hospitalized, but the pattern is clear. You're asked to investigate.</p>
                    <p className="text-[#5a6069] mb-6">List the first three things you would look into, and explain your reasoning for each. There is no single right answer — we're interested in how you think.</p>
                    <div className="border-t border-[#dfdbd1] w-full my-6"></div>
                    <p className="text-sm font-medium text-[#5a6069] mb-4">Write freely. No format required.</p>
                    <textarea rows={4} required disabled={submissionExists} value={formData.blitz1}
                       onChange={e => setFormData({...formData, blitz1: e.target.value})}
                       placeholder="Type your answer here..."
                       className="w-full rounded-md border-0 bg-transparent px-0 py-0 focus:ring-0 disabled:bg-transparent resize-none placeholder:text-slate-400/50 font-serif text-lg text-[#0c182c]" />
                    <div className="text-right text-xs text-slate-400 mt-2">
                       {formData.blitz1.split(/\s+/).filter(w => w.length > 0).length} / 200 words
                    </div>
                 </div>

                 {/* PUZZLE 2 */}
                 <div className="bg-white border-2 text-left border-[#dfdbd1] rounded-xl p-8 shadow-sm focus-within:ring-4 focus-within:ring-blue-600/10 focus-within:border-blue-600 transition-all hover:border-[#cbd0d6]">
                    <div className="text-[11px] font-bold tracking-widest text-[#8a867d] uppercase mb-4">PROBLEM 2 — REQUIRED</div>
                    <h3 className="text-xl font-serif text-[#0c182c] mb-4">The Unknown Liquid <span className="text-red-500 font-sans text-xl ml-1">*</span></h3>
                    <p className="italic text-[#5a6069] mb-4">You're handed 50 ml of a clear, odorless liquid. You cannot taste it. You have access to a standard school lab.</p>
                    <p className="text-[#5a6069] mb-6">Describe how you would determine whether it is pure water. Walk us through your steps and why you chose them.</p>
                    <div className="border-t border-[#dfdbd1] w-full my-6"></div>
                    <p className="text-sm font-medium text-[#5a6069] mb-4">Write freely. No format required.</p>
                    <textarea rows={4} required disabled={submissionExists} value={formData.blitz2}
                       onChange={e => setFormData({...formData, blitz2: e.target.value})}
                       placeholder="Type your answer here..."
                       className="w-full rounded-md border-0 bg-transparent px-0 py-0 focus:ring-0 disabled:bg-transparent resize-none placeholder:text-slate-400/50 font-serif text-lg text-[#0c182c]" />
                    <div className="text-right text-xs text-slate-400 mt-2">
                       {formData.blitz2.split(/\s+/).filter(w => w.length > 0).length} / 200 words
                    </div>
                 </div>

                 {/* PUZZLE 3 */}
                 <div className="bg-white border-2 text-left border-[#dfdbd1] rounded-xl p-8 shadow-sm focus-within:ring-4 focus-within:ring-blue-600/10 focus-within:border-blue-600 transition-all hover:border-[#cbd0d6]">
                    <div className="text-[11px] font-bold tracking-widest text-[#8a867d] uppercase mb-4">PROBLEM 3 — OPTIONAL</div>
                    <h3 className="text-xl font-serif text-[#0c182c] mb-4">The Greenhouse</h3>
                    <p className="italic text-[#5a6069] mb-4">A student notices that their tomato plants grow taller when classical music plays in the greenhouse. After two weeks, they write in their notebook: "Music helps plant growth."</p>
                    <p className="text-[#5a6069] mb-6">What — if anything — is wrong with that conclusion? And if you wanted to test it properly, how would you design the study?</p>
                    <div className="border-t border-[#dfdbd1] w-full my-6"></div>
                    <p className="text-sm font-medium text-[#5a6069] mb-4">Write freely. No format required.</p>
                    <textarea rows={4} disabled={submissionExists} value={formData.blitz3}
                       onChange={e => setFormData({...formData, blitz3: e.target.value})}
                       placeholder="Type your answer here..."
                       className="w-full rounded-md border-0 bg-transparent px-0 py-0 focus:ring-0 disabled:bg-transparent resize-none placeholder:text-slate-400/50 font-serif text-lg text-[#0c182c]" />
                    <div className="text-right text-xs text-slate-400 mt-2">
                       {formData.blitz3.split(/\s+/).filter(w => w.length > 0).length} / 200 words
                    </div>
                 </div>
              </div>
            </div>
          )}

          {/* STEP 5: PERSONAL STATEMENT */}
          {currentStep === 5 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
              <div>
                <h2 className="text-3xl font-serif text-[#0c182c] mb-2 cursor-text select-text hover:bg-slate-100 transition-colors">Personal statement. <span className="text-red-500 font-sans text-2xl ml-1 align-middle">*</span></h2>
                <p className="text-[#5a6069] cursor-text select-text hover:bg-slate-100 transition-colors line-clamp-3">This is your chance to say something true. You don't need to answer every question below — they're prompts, not a checklist. Pick whatever feels most honest and write to that. One strong paragraph beats five generic ones.</p>
              </div>

              <div className="bg-white border text-left border-[#dfdbd1] rounded-xl p-8 shadow-sm text-sm text-[#5a6069] space-y-4">
                 <p className="flex items-start"><span className="text-[#8a867d] mr-3 font-mono">—</span> How would you describe yourself as a researcher or thinker? What makes the way you approach problems yours?</p>
                 <p className="flex items-start"><span className="text-[#8a867d] mr-3 font-mono">—</span> Walk us through your project — not just what it is, but how you actually built it. What worked, what didn't?</p>
                 <p className="flex items-start"><span className="text-[#8a867d] mr-3 font-mono">—</span> Has anyone — a teacher, a mentor, a book, or even a failure — changed the way you see your field?</p>
                 <p className="flex items-start"><span className="text-[#8a867d] mr-3 font-mono">—</span> What's a question you can't stop thinking about, even outside your project?</p>
                 <p className="flex items-start"><span className="text-[#8a867d] mr-3 font-mono">—</span> Was there a moment you almost gave up? What kept you going?</p>
                 <p className="flex items-start"><span className="text-[#8a867d] mr-3 font-mono">—</span> If you could change one thing about how science is taught or done in your country, what would it be?</p>
                 <p className="flex items-start"><span className="text-[#8a867d] mr-3 font-mono">—</span> What do you hope to take away from RSEF — not the award, but the experience?</p>
              </div>

              <div className="bg-white border-2 border-[#dfdbd1] rounded-xl p-6 shadow-sm focus-within:ring-4 focus-within:ring-blue-600/10 focus-within:border-blue-600 transition-all hover:border-[#cbd0d6]">
                 <textarea required rows={10} disabled={submissionExists} value={formData.personalStatement}
                    onChange={e => setFormData({...formData, personalStatement: e.target.value})}
                    placeholder="Write in whatever language feels most natural to you. Uzbek or English, both are welcome."
                    className="w-full border-0 bg-transparent px-0 py-0 focus:ring-0 disabled:bg-transparent resize-none font-medium text-[#0c182c]" />
                 <div className="text-right text-xs text-slate-400 mt-2 border-t border-slate-100 pt-2 flex justify-between items-center">
                    <span className="text-slate-300 italic">Be honest. Be yourself.</span>
                    <span>{formData.personalStatement.split(/\s+/).filter(w => w.length > 0).length} / 500 words</span>
                 </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="pt-8 flex items-center justify-between">
            {currentStep > 1 ? (
              <button type="button" onClick={handleBack}
                className="flex items-center gap-2 border border-[#dfdbd1] bg-[#F7F5F0] hover:bg-white text-[#5a6069] hover:text-[#0c182c] font-medium py-3 px-6 rounded-md transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : (
              <div></div>
            )}
            
            {currentStep < totalSteps ? (
              <button type={submissionExists ? "button" : "submit"} onClick={submissionExists ? handleNext : undefined}
                className="flex items-center gap-2 bg-[#0c182c] hover:bg-[#1a2b4b] text-white font-medium py-3 px-8 rounded-md transition-colors ml-auto shadow-md">
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            ) : !submissionExists ? (
              <button type="submit" disabled={loadingData || uploadingFile}
                className="flex items-center gap-2 bg-[#0c182c] hover:bg-[#1a2b4b] text-white font-medium py-3 px-8 rounded-md transition-colors disabled:opacity-50 ml-auto shadow-md">
                {uploadingFile ? 'Uploading...' : 'Submit application'}
              </button>
            ) : (
              <div className="text-[#8a867d] italic ml-auto font-medium">Your application has been submitted.</div>
            )}
          </div>
          
        </form>
      </div>
    </div>
  );
}

