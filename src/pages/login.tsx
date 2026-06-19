import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../components/AuthProvider';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../lib/firebase';

export function LoginPage() {
  const { locale } = useParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errorInfo, setErrorInfo] = useState('');
  const [successInfo, setSuccessInfo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);

  const t = {
    en: { title: "Sign In to Your Account", invalid: "Invalid credentials", email: "Email Address", pass: "Password", btn: "Log In", noAcc: "Don't have an account?", create: "Create one", forgot: "Forgot password?", resetTitle: "Reset Password", resetBtn: "Send Reset Link", resetSuccess: "Password reset email sent. Please check your inbox.", backToLogin: "Back to login" },
    uz: { title: "Hisobingizga kiring", invalid: "Noto'g'ri ma'lumotlar", email: "Elektron pochta manzili", pass: "Parol", btn: "Tizimga kirish", noAcc: "Hisobingiz yo'qmi?", create: "Yaratish", forgot: "Parolni unutdingizmi?", resetTitle: "Parolni tiklash", resetBtn: "Hovolani yuborish", resetSuccess: "Parolni tiklash xati yuborildi. Pochtani tekshiring.", backToLogin: "Kirishga qaytish" },
    ru: { title: "Войдите в свою учетную запись", invalid: "Неверные учетные данные", email: "Адрес электронной почты", pass: "Пароль", btn: "Войти", noAcc: "Нет аккаунта?", create: "Создать", forgot: "Забыли пароль?", resetTitle: "Сброс пароля", resetBtn: "Отправить ссылку уброса", resetSuccess: "Электронное письмо для сброса пароля отправлено. Пожалуйста, проверьте свой почтовый ящик.", backToLogin: "Вернуться ко входу" }
  }[(locale as 'en'|'uz'|'ru')] || { title: "Sign In to Your Account", invalid: "Invalid credentials", email: "Email Address", pass: "Password", btn: "Log In", noAcc: "Don't have an account?", create: "Create one", forgot: "Forgot password?", resetTitle: "Reset Password", resetBtn: "Send Reset Link", resetSuccess: "Password reset email sent. Please check your inbox.", backToLogin: "Back to login" };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorInfo('');
    setSuccessInfo('');
    setLoading(true);

    if (isResetMode) {
      try {
        await sendPasswordResetEmail(auth, email);
        setSuccessInfo(t.resetSuccess);
      } catch (error: any) {
        setErrorInfo(error.message || t.invalid);
      } finally {
        setLoading(false);
      }
      return;
    }

    try {
      await login(email, password);
      navigate(`/${locale}/apply`);
    } catch (error: any) {
      setErrorInfo(error.message || t.invalid);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[100vw] ml-[calc(-50vw+50%)] bg-[#f3f4f6] min-h-[calc(100vh-100px)] py-20 flex items-center justify-center">
       <div className="w-full max-w-[480px] bg-white rounded-xl shadow-sm border border-slate-200 p-8 md:p-10">
          
          <div className="flex flex-col items-center gap-4 mb-8">
             <div className="flex items-center text-slate-800 text-4xl font-black tracking-tighter">
                RSEF
             </div>
             <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{isResetMode ? t.resetTitle : t.title}</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
             {errorInfo && (
                <div className="bg-rose-50 text-rose-600 p-3 rounded-lg text-sm font-medium border border-rose-200">
                   {errorInfo}
                </div>
             )}
             {successInfo && (
                <div className="bg-emerald-50 text-emerald-600 p-3 rounded-lg text-sm font-medium border border-emerald-200">
                   {successInfo}
                </div>
             )}

             <div>
                <label className="block text-sm font-medium text-slate-800 mb-1.5">{t.email}</label>
                <input 
                  type="email" 
                  required 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:ring-[#10b981] focus:border-[#10b981]" 
                  placeholder="name@example.com"
                />
             </div>

             {!isResetMode && (
               <div>
                  <div className="flex justify-between items-center mb-1.5">
                     <label className="block text-sm font-medium text-slate-800">{t.pass}</label>
                     <button type="button" onClick={() => setIsResetMode(true)} className="text-sm text-[#10b981] hover:underline font-medium">
                        {t.forgot}
                     </button>
                  </div>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      required 
                      value={password} 
                      onChange={e => setPassword(e.target.value)} 
                      className="w-full border border-slate-300 rounded-lg p-3 pr-10 text-sm focus:ring-[#10b981] focus:border-[#10b981]" 
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
             )}

             <div className="pt-2">
                <button disabled={loading} type="submit" className="w-full bg-[#10b981] hover:bg-[#059669] text-white font-bold py-3.5 px-6 rounded-lg transition-colors text-base flex justify-center items-center">
                   {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isResetMode ? t.resetBtn : t.btn)}
                </button>
             </div>
          </form>

          {isResetMode ? (
            <p className="text-center text-slate-600 mt-8 text-sm">
               <button onClick={() => { setIsResetMode(false); setErrorInfo(''); setSuccessInfo(''); }} className="text-[#10b981] font-bold hover:underline">{t.backToLogin}</button>
            </p>
          ) : (
            <p className="text-center text-slate-600 mt-8 text-sm">
               {t.noAcc} <Link to={`/${locale}/register`} className="text-[#10b981] font-bold hover:underline">{t.create}</Link>
            </p>
          )}
       </div>
    </div>
  );
}
