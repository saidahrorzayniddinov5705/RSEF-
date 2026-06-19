import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Info, X, Check, Loader2, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../components/AuthProvider';

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

export function RegisterFormPage() {
  const { locale } = useParams();
  const navigate = useNavigate();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errorInfo, setErrorInfo] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    dob: '',
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: '',
    primaryEmail: '',
    secondaryEmail: '',
    displayName: '',
    gender: '',
    affiliation: '',
    institution: '',
    jobTitle: '',
    country: ''
  });

  const pwReqs = [
    { text: "At least 8 characters", met: formData.password.length >= 8 },
    { text: "One uppercase letter", met: /[A-Z]/.test(formData.password) },
    { text: "One lowercase letter", met: /[a-z]/.test(formData.password) },
    { text: "One number", met: /[0-9]/.test(formData.password) }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrorInfo("Passwords do not match");
      return;
    }
    
    const allMet = pwReqs.every(r => r.met);
    if (!allMet) {
      setErrorInfo("Please meet all password requirements");
      return;
    }

    try {
      setLoading(true);
      setErrorInfo('');
      await register(formData.primaryEmail, formData.password, formData.firstName, formData.lastName);
      navigate(`/${locale}/apply`);
    } catch (error: any) {
      setErrorInfo(error.message || 'Error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[100vw] ml-[calc(-50vw+50%)] bg-[#f3f4f6] min-h-screen py-16">
       <div className="max-w-[760px] mx-auto bg-white rounded-xl shadow-sm border border-slate-200 p-8 md:p-12">
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center text-teal-600 font-bold text-xl">
                  RSEF
               </div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Create Your RSEF Account</h1>
          </div>

          <p className="text-slate-600 mb-10">Already have an account? <Link to={`/${locale}`} className="text-[#10b981] font-bold hover:underline">Sign In</Link></p>

          <form onSubmit={handleSubmit} className="space-y-12">
            
            {/* Official Information */}
            <div>
               <h2 className="text-xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-100">Official Information</h2>
               
               <div className="mb-5">
                  <label className="block text-sm font-medium text-slate-800 mb-1">Date of Birth <span className="text-rose-500">*</span></label>
                  <p className="text-xs text-slate-500 mb-2">Used for age verification and account security</p>
                  <input type="date" required value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} className="w-full border border-slate-300 rounded p-2.5 text-sm focus:ring-[#10b981] focus:border-[#10b981]" />
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                 <div>
                    <label className="block text-sm font-medium text-slate-800 mb-2">First Name / Given Name <span className="text-rose-500">*</span></label>
                    <input type="text" required value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} className="w-full border border-slate-300 rounded p-2.5 text-sm focus:ring-[#10b981] focus:border-[#10b981]" />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-800 mb-2">Last Name / Surname / Family Name <span className="text-rose-500">*</span></label>
                    <input type="text" required value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} className="w-full border border-slate-300 rounded p-2.5 text-sm focus:ring-[#10b981] focus:border-[#10b981]" />
                 </div>
               </div>

               <div className="bg-[#f0f9ff] border border-[#bae6fd] rounded-lg p-5 flex gap-4 text-sm text-slate-700">
                 <Info className="w-5 h-5 text-[#0284c7] shrink-0 mt-0.5" />
                 <div>
                    <p className="font-bold text-slate-900 mb-2">Important Notice</p>
                    <ul className="list-disc pl-5 space-y-1.5 marker:text-slate-400">
                      <li>Please note that it is not possible to change official information later.</li>
                      <li>Your official name will appear on <strong>certificates</strong> and <strong>visa invitation letters</strong></li>
                      <li>Must match your <strong>official form of ID or passport</strong></li>
                      <li>This information is <strong>private</strong> and not shown to other users</li>
                    </ul>
                 </div>
               </div>
            </div>

            {/* Account Credentials */}
            <div>
               <h2 className="text-xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-100">Account Credentials</h2>
               
               <div className="mb-5">
                  <label className="block text-sm font-medium text-slate-800 mb-1">Username <span className="text-rose-500">*</span></label>
                  <p className="text-xs text-slate-500 mb-2">This will be your unique identifier on RSEF</p>
                  <input type="text" required value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} className="w-full border border-slate-300 rounded p-2.5 text-sm focus:ring-[#10b981] focus:border-[#10b981]" />
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-2">
                 <div>
                    <label className="block text-sm font-medium text-slate-800 mb-2">Password <span className="text-rose-500">*</span></label>
                    <div className="relative">
                        <input 
                           type={showPassword ? "text" : "password"} 
                           required 
                           value={formData.password} 
                           onChange={e => setFormData({...formData, password: e.target.value})} 
                           className="w-full border border-slate-300 rounded p-2.5 pr-10 text-sm focus:ring-[#10b981] focus:border-[#10b981]" 
                        />
                        <button
                           type="button"
                           onClick={() => setShowPassword(!showPassword)}
                           className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                        >
                           {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                     </div>
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-800 mb-2">Confirm Password <span className="text-rose-500">*</span></label>
                    <div className="relative">
                        <input 
                           type={showPassword ? "text" : "password"} 
                           required 
                           value={formData.confirmPassword} 
                           onChange={e => setFormData({...formData, confirmPassword: e.target.value})} 
                           className="w-full border border-slate-300 rounded p-2.5 pr-10 text-sm focus:ring-[#10b981] focus:border-[#10b981]" 
                        />
                     </div>
                 </div>
               </div>
               
               <div className="mb-6 space-y-1">
                 {pwReqs.map((req, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      {req.met ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <X className="w-3.5 h-3.5 text-slate-400" />}
                      <span className={req.met ? "text-slate-700" : "text-slate-500"}>{req.text}</span>
                    </div>
                 ))}
               </div>

               <div className="mb-5">
                  <label className="block text-sm font-medium text-slate-800 mb-1">Primary Email <span className="text-rose-500">*</span></label>
                  <p className="text-xs text-slate-500 mb-2">Usually your institutional (University/College/Company) email</p>
                  <input type="email" required value={formData.primaryEmail} onChange={e => setFormData({...formData, primaryEmail: e.target.value})} className="w-full border border-slate-300 rounded p-2.5 text-sm focus:ring-[#10b981] focus:border-[#10b981]" />
               </div>

               <div>
                  <label className="block text-sm font-medium text-slate-800 mb-1">Secondary Email</label>
                  <p className="text-xs text-slate-500 mb-2">Personal email for account recovery</p>
                  <input type="email" value={formData.secondaryEmail} onChange={e => setFormData({...formData, secondaryEmail: e.target.value})} className="w-full border border-slate-300 rounded p-2.5 text-sm focus:ring-[#10b981] focus:border-[#10b981]" />
               </div>
            </div>

            {/* User Profile */}
            <div>
               <h2 className="text-xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-100">User Profile</h2>
               
               <div className="mb-5">
                  <label className="block text-sm font-medium text-slate-800 mb-1">Public Display Name <span className="text-rose-500">*</span></label>
                  <p className="text-xs text-slate-500 mb-2">This name appears on team rosters, Jamboree badges, and is visible to other users. You can use nicknames or a preferred name while keeping it formal.</p>
                  <input type="text" required value={formData.displayName} onChange={e => setFormData({...formData, displayName: e.target.value})} className="w-full border border-slate-300 rounded p-2.5 text-sm focus:ring-[#10b981] focus:border-[#10b981]" />
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                 <div>
                    <label className="block text-sm font-medium text-slate-800 mb-2">Gender <span className="text-rose-500">*</span></label>
                    <select required value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})} className="w-full border border-slate-300 rounded p-2.5 text-sm bg-white focus:ring-[#10b981] focus:border-[#10b981]">
                      <option value="">Select...</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="nonbinary">Non-binary</option>
                      <option value="prefer_not">Prefer not to say</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-800 mb-2">Affiliation Type <span className="text-rose-500">*</span></label>
                    <select required value={formData.affiliation} onChange={e => setFormData({...formData, affiliation: e.target.value})} className="w-full border border-slate-300 rounded p-2.5 text-sm bg-white focus:ring-[#10b981] focus:border-[#10b981]">
                      <option value="">Select...</option>
                      <option value="student_highschool">High School Student</option>
                      <option value="student_undergrad">Undergrad Student</option>
                      <option value="student_overgrad">Postgrad/Overgrad Student</option>
                      <option value="pi">Primary Investigator</option>
                      <option value="instructor">Instructor/Advisor</option>
                      <option value="other">Other</option>
                    </select>
                 </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                 <div>
                    <label className="block text-sm font-medium text-slate-800 mb-2">Institution / Organization <span className="text-rose-500">*</span></label>
                    <input type="text" required value={formData.institution} onChange={e => setFormData({...formData, institution: e.target.value})} className="w-full border border-slate-300 rounded p-2.5 text-sm focus:ring-[#10b981] focus:border-[#10b981]" />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-800 mb-2">Job Title / Position <span className="text-rose-500">*</span></label>
                    <input type="text" required value={formData.jobTitle} onChange={e => setFormData({...formData, jobTitle: e.target.value})} className="w-full border border-slate-300 rounded p-2.5 text-sm focus:ring-[#10b981] focus:border-[#10b981]" />
                 </div>
               </div>

               <div className="mb-8">
                  <label className="block text-sm font-medium text-slate-800 mb-2 flex items-center gap-1.5">
                     Country of Residence <span className="text-rose-500">*</span> <Info className="w-3.5 h-3.5 text-slate-400" />
                  </label>
                  <select required value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} className="w-full border border-slate-300 rounded p-2.5 text-sm bg-white focus:ring-[#10b981] focus:border-[#10b981]">
                    <option value="">Select a country</option>
                    {countries.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
               </div>

               <div className="flex flex-col items-center">
                  {errorInfo && <p className="text-rose-500 text-sm mb-4">{errorInfo}</p>}
                  <button disabled={loading} type="submit" className="bg-[#10b981] hover:bg-[#059669] text-white font-bold py-3.5 px-12 rounded transition-colors tracking-wide text-lg flex items-center justify-center min-w-[200px]">
                     {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Sign Up'}
                  </button>
               </div>
            </div>

          </form>
       </div>
    </div>
  );
}
