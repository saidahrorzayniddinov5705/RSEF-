import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export function ContactPage() {
  const { locale } = useParams();
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  const translations = {
    en: {
      title: 'Contact Us',
      desc: 'Have questions about the RSEF? Get in touch with our team.',
      name: 'Full Name',
      email: 'Email Address',
      message: 'Your Message',
      btn: 'Send Message',
      success: 'Message sent successfully! We will get back to you soon.',
    },
    uz: {
      title: 'Biz bilan bog\'lanish',
      desc: 'RSEF haqida savollaringiz bormi? Jamoamiz bilan bog\'laning.',
      name: 'To\'liq ism',
      email: 'Elektron pochta',
      message: 'Xabaringiz',
      btn: 'Xabarni yuborish',
      success: 'Xabar muvaffaqiyatli yuborildi! Tez orada siz bilan bog\'lanamiz.',
    },
    ru: {
      title: 'Связаться с нами',
      desc: 'Есть вопросы о RSEF? Свяжитесь с нашей командой.',
      name: 'Полное имя',
      email: 'Электронная почта',
      message: 'Ваше сообщение',
      btn: 'Отправить сообщение',
      success: 'Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.',
    }
  };

  const t = translations[locale as keyof typeof translations] || translations.en;

  return (
    <div className="pt-24 pb-16 min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-slate-900 mb-4">{t.title}</h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">{t.desc}</p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row">
          
          {/* Contact Details */}
          <div className="bg-[#0A1931] p-8 md:p-12 text-white md:w-2/5 flex flex-col justify-between relative overflow-hidden">
             
             {/* Decorative blob */}
             <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl" />
             <div className="absolute top-12 left-12 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl z-0" />
             
             <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
                
                <div className="space-y-6">
                   <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                         <Phone className="w-5 h-5 text-brand-400" />
                      </div>
                      <div>
                         <p className="font-bold text-sm text-slate-300 mb-1">Phone Number</p>
                         <p className="text-sm">+998 88-936-03-65</p>
                      </div>
                   </div>
                   
                   <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                         <Mail className="w-5 h-5 text-brand-400" />
                      </div>
                      <div>
                         <p className="font-bold text-sm text-slate-300 mb-1">Email Address</p>
                         <p className="text-sm">rsef.org@gmail.com</p>
                      </div>
                   </div>
                </div>
             </div>
             
             <div className="mt-12 relative z-10">
                <p className="text-xs text-slate-400">Response time: usually within 24-48 hours during business days.</p>
             </div>
          </div>
          
          {/* Contact Form */}
          <div className="p-8 md:p-12 md:w-3/5">
             {sent ? (
                <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in py-12">
                   <div className="w-16 h-16 bg-mist-100 rounded-full flex items-center justify-center mb-6">
                      <Send className="w-8 h-8 text-brand-600 ml-1" />
                   </div>
                   <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent</h3>
                   <p className="text-slate-600">{t.success}</p>
                </div>
             ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                   <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">{t.name}</label>
                      <input 
                         required
                         type="text" 
                         className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-colors"
                         placeholder="John Doe"
                      />
                   </div>
                   <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">{t.email}</label>
                      <input 
                         required
                         type="email" 
                         className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-colors"
                         placeholder="john@example.com"
                      />
                   </div>
                   <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">{t.message}</label>
                      <textarea 
                         required
                         rows={5}
                         className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-colors resize-none"
                         placeholder="How can we help you?"
                      />
                   </div>
                   <button 
                      type="submit"
                      className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                   >
                      <Send className="w-5 h-5" /> {t.btn}
                   </button>
                </form>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
