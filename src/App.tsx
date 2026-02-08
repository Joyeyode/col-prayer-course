import React from 'react';
import { useAppStore } from './store/appStore';
import { Dashboard } from './components/Dashboard';
import { ProgressDashboard } from './components/ProgressDashboard';
import { CourseLayout } from './components/CourseLayout';
import { LessonView } from './components/LessonView';
import { JournalView } from './components/JournalView';
import { ResourcesView } from './components/ResourcesView';
import { FavoritesView } from './components/FavoritesView';
import { languages } from './data/i18n';
import './styles/global.css';
import './styles/components.css';

type Page = 'dashboard' | 'progress' | 'course' | 'lesson' | 'journal' | 'resources' | 'favorites' | 'review';

interface LessonSelection {
  weekNumber: number;
  dayNumber: number;
}

export function App() {
  const [currentPage, setCurrentPage] = React.useState<Page>('dashboard');
  const [selectedLesson, setSelectedLesson] = React.useState<LessonSelection | null>(null);
  const [installPrompt, setInstallPrompt] = React.useState<any>(null);
  const [isInstalled, setIsInstalled] = React.useState(false);
  const { user, setUser, darkMode, setDarkMode, language, setLanguage } = useAppStore();

  React.useEffect(() => {
    // Apply dark mode class to html element
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }, [darkMode]);

  React.useEffect(() => {
    // Initialize user if not already set
    if (!user) {
      setUser({
        id: 'user-1',
        name: 'Prayer Intercessor',
        email: 'user@prayercourse.com',
        joinDate: new Date(),
        lastActive: new Date(),
      });
    }
  }, [user, setUser]);

  React.useEffect(() => {
    // Handle PWA install prompt
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setInstallPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;

    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    console.log(`User response to install prompt: ${outcome}`);
    
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    setInstallPrompt(null);
  };

  const handleSelectLesson = (weekNumber: number, dayNumber: number) => {
    setSelectedLesson({ weekNumber, dayNumber });
    setCurrentPage('lesson');
  };

  const handleBackToCourse = () => {
    setCurrentPage('course');
  };

  return (
    <div className="app" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Prayer Banner */}
      <div style={{ 
        position: 'relative',
        height: '160px',
        overflow: 'hidden',
        width: '100%',
        backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <h1 style={{
          color: 'white',
          fontSize: '2rem',
          textAlign: 'center',
          margin: 0
        }}>
          Prayer Ministry
        </h1>
      </div>

      {/* Navigation Bar */}
      <header style={{ 
        backgroundColor: 'var(--primary-color)',
        color: 'white', 
        padding: '1rem',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div className="container flex justify-between items-center">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img 
              src="/COL Logo.png" 
              alt="COL Prayer Course Logo" 
              style={{ height: '50px', width: 'auto', objectFit: 'contain' }}
            />
            <h1 style={{ fontSize: '1.5rem', margin: 0, fontWeight: 'bold' }}>COL Prayer Course</h1>
          </div>
          <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button
              onClick={() => setCurrentPage('dashboard')}
              className={`nav-link ${currentPage === 'dashboard' ? 'active' : ''}`}
              style={{
                color: currentPage === 'dashboard' ? 'white' : 'rgba(255,255,255,0.7)',
                backgroundColor: currentPage === 'dashboard' ? 'rgba(255,255,255,0.2)' : 'transparent',
              }}
            >
              Dashboard
            </button>
            <button
              onClick={() => setCurrentPage('progress')}
              className={`nav-link ${currentPage === 'progress' ? 'active' : ''}`}
              style={{
                color: currentPage === 'progress' ? 'white' : 'rgba(255,255,255,0.7)',
                backgroundColor: currentPage === 'progress' ? 'rgba(255,255,255,0.2)' : 'transparent',
              }}
            >
              📊 Progress
            </button>
            <button
              onClick={() => setCurrentPage('course')}
              className={`nav-link ${currentPage === 'course' || currentPage === 'lesson' ? 'active' : ''}`}
              style={{
                color: (currentPage === 'course' || currentPage === 'lesson') ? 'white' : 'rgba(255,255,255,0.7)',
                backgroundColor: (currentPage === 'course' || currentPage === 'lesson') ? 'rgba(255,255,255,0.2)' : 'transparent',
              }}
            >
              Course
            </button>
            <button
              onClick={() => setCurrentPage('favorites')}
              className={`nav-link ${currentPage === 'favorites' ? 'active' : ''}`}
              style={{
                color: currentPage === 'favorites' ? 'white' : 'rgba(255,255,255,0.7)',
                backgroundColor: currentPage === 'favorites' ? 'rgba(255,255,255,0.2)' : 'transparent',
              }}
            >
              ⭐ Favorites
            </button>
            <button
              onClick={() => setCurrentPage('journal')}
              className={`nav-link ${currentPage === 'journal' ? 'active' : ''}`}
              style={{
                color: currentPage === 'journal' ? 'white' : 'rgba(255,255,255,0.7)',
                backgroundColor: currentPage === 'journal' ? 'rgba(255,255,255,0.2)' : 'transparent',
              }}
            >
              Journal
            </button>
            <button
              onClick={() => setCurrentPage('resources')}
              className={`nav-link ${currentPage === 'resources' ? 'active' : ''}`}
              style={{
                color: currentPage === 'resources' ? 'white' : 'rgba(255,255,255,0.7)',
                backgroundColor: currentPage === 'resources' ? 'rgba(255,255,255,0.2)' : 'transparent',
              }}
            >
              Resources
            </button>
            {installPrompt && !isInstalled && (
              <button
                onClick={handleInstallClick}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: 'rgba(255,255,255,0.3)',
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.5)',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.4)'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)'}
              >
                📱 Install App
              </button>
            )}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              style={{
                padding: '0.5rem 0.75rem',
                backgroundColor: 'rgba(255,255,255,0.3)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.5)',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '500',
              }}
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code} style={{ color: 'black' }}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
            <button
              onClick={() => setDarkMode(!darkMode)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'rgba(255,255,255,0.3)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.5)',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '500',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.4)'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)'}
              title="Toggle dark mode"
            >
              {darkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '2rem 0' }}>
        <div className="container">
          {currentPage === 'dashboard' && <Dashboard />}
          {currentPage === 'progress' && <ProgressDashboard />}
          {currentPage === 'course' && <CourseLayout onSelectLesson={handleSelectLesson} />}
          {currentPage === 'lesson' && selectedLesson && (
            <>
              <button className="btn btn-secondary mb-4" onClick={handleBackToCourse}>
                ← Back to Course
              </button>
              <LessonView weekNumber={selectedLesson.weekNumber} dayNumber={selectedLesson.dayNumber} />
            </>
          )}
          {currentPage === 'favorites' && <FavoritesView onSelectLesson={handleSelectLesson} />}
          {currentPage === 'journal' && <JournalView />}
          {currentPage === 'resources' && <ResourcesView />}
        </div>
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: 'var(--text-primary)', color: 'white', padding: '2rem 1rem', textAlign: 'center', marginTop: 'auto' }}>
        <p>© 2026 Church of the Lord Prayer Ministry. All rights reserved.</p>
        <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
          10-Week Intercessory Prayer Course
        </p>
      </footer>
    </div>
  );
}

export default App;
