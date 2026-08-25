import React from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DeviceFrame } from './components/layout/DeviceFrame';
import { BottomNav } from './components/navigation/BottomNav';
import { SplashPage } from './pages/Splash';
import { OnboardingPage } from './pages/Onboarding';
import { HomePage } from './pages/Home';
import { TopicDetailPage } from './pages/TopicDetail';
import { RecipientPage } from './pages/Recipient';
import { MessagePage } from './pages/Message';
import { ReviewPage } from './pages/Review';
import { SuccessPage } from './pages/Success';
import { HistoryPage } from './pages/History';
import { SettingsPage } from './pages/Settings';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: 1 }
  }
});

const tabRoutes = ['/home', '/history', '/settings'];

function AppRoutes() {
  const location = useLocation();
  const showTabs = tabRoutes.includes(location.pathname);

  return (
    <div className="flex h-full flex-col">
      <div className="min-h-0 flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<SplashPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/topics/:id" element={<TopicDetailPage />} />
            <Route path="/send/recipient" element={<RecipientPage />} />
            <Route path="/send/message" element={<MessagePage />} />
            <Route path="/send/review" element={<ReviewPage />} />
            <Route path="/send/success" element={<SuccessPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </AnimatePresence>
      </div>
      {showTabs && <BottomNav />}
    </div>);

}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <DeviceFrame>
          <AppRoutes />
        </DeviceFrame>
      </BrowserRouter>
    </QueryClientProvider>);

}