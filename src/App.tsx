import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Auth } from './components/Auth';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { HomeFeed } from './components/HomeFeed';
import { CourseCatalog } from './components/CourseCatalog';
import { CoursePlayer } from './components/CoursePlayer';
import { ManagerDashboard } from './components/ManagerDashboard';
import { TrainerHub } from './components/TrainerHub';
import { MistakeGame } from './components/MistakeGame';
import { UserProfile } from './components/UserProfile';
import { AnalyticsAndChat } from './components/AnalyticsAndChat';
import { AdminPanel } from './components/AdminPanel';
import { AccessDeniedView } from './components/AccessDeniedView';
import { ApplianceCheatSheet } from './components/ApplianceCheatSheet';
import { StoreAuditChecklist } from './components/StoreAuditChecklist';
import { DailyQuizAndRewards } from './components/DailyQuizAndRewards';
import { SalesSimulator } from './components/SalesSimulator';
import { SmartPDP } from './components/SmartPDP';
import { OnboardingRoadmap } from './components/OnboardingRoadmap';
import { ObjectionBuster } from './components/ObjectionBuster';
import { SmartProductMatcher } from './components/SmartProductMatcher';

function MainApp() {
  const { currentUser, authLoading } = useApp();
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-emerald-500 font-medium animate-pulse">Avtorizatsiya tekshirilmoqda...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <Auth />;
  }

  const handleSelectCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    setActiveTab('courses');
  };

  const handleBackToCatalog = () => {
    setSelectedCourseId(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Navigation */}
      <Header
        onSearchChange={(term) => {
          setSearchTerm(term);
          if (term && activeTab !== 'courses') {
            setActiveTab('courses');
          }
        }}
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'courses') {
            setSelectedCourseId(null);
          }
        }}
        onSelectCourse={handleSelectCourse}
      />

      {/* Body Workspace */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex flex-col lg:flex-row min-w-0">
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            if (tab !== 'courses') {
              setSelectedCourseId(null);
            }
          }}
        />

        {/* Main Content Workspace */}
        <main className="flex-1 min-w-0 w-full max-w-full p-4 sm:p-6 bg-slate-100 text-slate-900 min-h-[calc(100vh-4rem)] overflow-x-hidden">
          {activeTab === 'home' && (
            <HomeFeed
              onSelectCourse={handleSelectCourse}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'courses' && (
            <>
              {selectedCourseId ? (
                <CoursePlayer
                  courseId={selectedCourseId}
                  onBack={handleBackToCatalog}
                />
              ) : (
                <CourseCatalog
                  onSelectCourse={handleSelectCourse}
                  searchTerm={searchTerm}
                />
              )}
            </>
          )}

          {activeTab === 'manager' && (
            ['manager', 'admin'].includes(currentUser.role) ? (
              <ManagerDashboard />
            ) : (
              <AccessDeniedView requiredRole="Do'kon Rahbari (Menejer)" setActiveTab={setActiveTab} />
            )
          )}

          {activeTab === 'trainer' && (
            ['trainer', 'admin'].includes(currentUser.role) ? (
              <TrainerHub />
            ) : (
              <AccessDeniedView requiredRole="O'quv Bo'limi (L&D Trener)" setActiveTab={setActiveTab} />
            )
          )}

          {activeTab === 'cheat_sheet' && <ApplianceCheatSheet />}
          {activeTab === 'sales_sim' && <SalesSimulator />}
          {activeTab === 'objections' && <ObjectionBuster />}
          {activeTab === 'matcher' && <SmartProductMatcher />}
          {activeTab === 'pdp' && <SmartPDP onNavigateTab={setActiveTab} />}
          {activeTab === 'onboarding' && <OnboardingRoadmap onNavigateTab={setActiveTab} />}
          {activeTab === 'store_audit' && <StoreAuditChecklist />}
          {activeTab === 'rewards_store' && <DailyQuizAndRewards />}

          {activeTab === 'mistakes' && <MistakeGame />}

          {activeTab === 'chat' && <AnalyticsAndChat initialTab="chat" />}
          {activeTab === 'analytics' && <AnalyticsAndChat initialTab="analytics" />}

          {activeTab === 'admin' && (
            currentUser.role === 'admin' ? (
              <AdminPanel />
            ) : (
              <AccessDeniedView requiredRole="Admin (Tizim Boshqaruvchisi)" setActiveTab={setActiveTab} />
            )
          )}

          {activeTab === 'profile' && <UserProfile />}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
