/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './i18n/config'; // Initialize i18n
import { LocaleLayout } from './components/LocaleLayout';
import { HomePage, AboutPage, TeamPage } from './pages/index';
import { AuthProvider } from './components/AuthProvider';
import { ApplyPage } from './pages/apply';
import { AdminPage } from './pages/admin';
import { RegistrationInfoPage } from './pages/registrationInfo';
import { RegisterFormPage } from './pages/registerForm';
import { LoginPage } from './pages/login';
import { NewsPage } from './pages/news';
import { ResultsPage } from './pages/results';
import { ContactPage } from './pages/contact';
import SearchPage from './pages/search';
import { ProfilePage } from './pages/profile';
import { SponsorsPage } from './pages/sponsors';
import { IntroVideo } from './components/IntroVideo';

export default function App() {
  return (
    <IntroVideo>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Base redirect to default locale based on browser or just EN */}
            <Route path="/" element={<Navigate to="/en" replace />} />
            
            {/* Locale wrapper which contains the Navbar, Main and Footer */}
            <Route path="/:locale" element={<LocaleLayout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="team" element={<TeamPage />} />
              <Route path="news" element={<NewsPage />} />
              <Route path="results" element={<ResultsPage />} />
              <Route path="apply" element={<ApplyPage />} />
              <Route path="registration" element={<RegistrationInfoPage />} />
              <Route path="register" element={<RegisterFormPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="admin" element={<AdminPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="search" element={<SearchPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="sponsors" element={<SponsorsPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </IntroVideo>
  );
}
