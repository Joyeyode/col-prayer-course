import React from 'react';
import { useAppStore } from './store/appStore';
import { Dashboard } from './components/Dashboard';
import { ProgressDashboard } from './components/ProgressDashboard';
import { CourseLayout } from './components/CourseLayout';
import { LessonView } from './components/LessonView';
import { JournalView } from './components/JournalView';
import { ResourcesView } from './components/ResourcesView';
import { FavoritesView } from './components/FavoritesView';
import { UserSettingsView } from './components/UserSettingsView';
import './styles/global.css';
import './styles/components.css';

// Lazy load AdminDashboard to prevent Firebase blocking initial load
const AdminDashboard = React.lazy(() => 
  import('./components/AdminDashboard').then(m => ({ default: m.AdminDashboard }))
);

type Page = 'dashboard' | 'progress' | 'course' | 'lesson' | 'journal' | 'resources' | 'favorites' | 'review' | 'settings' | 'admin';

interface LessonSelection {
  weekNumber: number;
  dayNumber: number;
}

export function App() {
  const [currentPage, setCurrentPage] = React.useState<Page>('dashboard');
  const [selectedLesson, setSelectedLesson] = React.useState<LessonSelection | null>(null);
  const [installPrompt, setInstallPrompt] = React.useState<any>(null);
  const [isInstalled, setIsInstalled] = React.useState(false);
  const user = useAppStore((state) => state.user);
  const setUser = useAppStore((state) => state.setUser);
  const darkMode = useAppStore((state) => state.darkMode);
  const setDarkMode = useAppStore((state) => state.setDarkMode);

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
      <div 
        className="prayer-banner"
        style={{ 
          position: 'relative',
          height: '160px',
          overflow: 'hidden',
          width: '100%',
          backgroundImage: 'url(/prayer-banner.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />


      {/* Navigation Bar */}
      <header style={{ 
        backgroundColor: 'var(--primary-color)',
        color: 'white', 
        padding: '1rem',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, justifyContent: 'center' }}>
              <img 
                src="/COL Logo.png" 
                alt="COL Prayer Course Logo" 
                style={{ height: '50px', width: 'auto', objectFit: 'contain' }}
              />
              <div>
                <h1 style={{ fontSize: '1.5rem', margin: 0, fontWeight: 'bold' }}>COL Prayer Course</h1>
                <p style={{ fontSize: '0.85rem', margin: '0.25rem 0 0 0', opacity: 0.9 }}>👤 {user?.name || 'Guest'}</p>
              </div>
            </div>
          </div>
          <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
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
            <button
              onClick={() => setCurrentPage('settings')}
              className={`nav-link ${currentPage === 'settings' ? 'active' : ''}`}
              style={{
                color: currentPage === 'settings' ? 'white' : 'rgba(255,255,255,0.7)',
                backgroundColor: currentPage === 'settings' ? 'rgba(255,255,255,0.2)' : 'transparent',
              }}
            >
              ⚙️ Settings
            </button>
            <button
              onClick={() => setCurrentPage('admin')}
              className={`nav-link ${currentPage === 'admin' ? 'active' : ''}`}
              style={{
                color: currentPage === 'admin' ? 'white' : 'rgba(255,255,255,0.7)',
                backgroundColor: currentPage === 'admin' ? 'rgba(255,255,255,0.2)' : 'transparent',
              }}
              title="Admin Dashboard"
            >
              👥 Admin
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
      <main style={{ flex: 1, padding: '1.5rem 0' }}>
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
          {currentPage === 'settings' && <UserSettingsView />}
          {currentPage === 'admin' && (
            <React.Suspense fallback={<div style={{ textAlign: 'center', padding: '2rem' }}>📊 Loading Admin Dashboard...</div>}>
              <AdminDashboard />
            </React.Suspense>
          )}
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
