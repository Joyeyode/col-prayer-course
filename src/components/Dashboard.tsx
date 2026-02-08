import React from 'react';
import { useAppStore } from '../store/appStore';
import { getTranslations } from '../data/i18n';
import '../styles/components.css';

export const Dashboard: React.FC = () => {
  const language = useAppStore((state) => state.language);
  const userProgress = useAppStore((state) => state.userProgress);
  const getCompletionPercentage = useAppStore((state) => state.getCompletionPercentage);
  const journalEntries = useAppStore((state) => state.journalEntries);
  const t = getTranslations(language);
  
  const completionPercentage = getCompletionPercentage();
  const currentWeek = userProgress?.weekNumber || 1;

  return (
    <div className="dashboard-container">
      <section className="card mb-6">
        <h1>{t.welcomeIntercessor}</h1>
        <p className="text-secondary mt-2">{t.continueJourney}</p>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <div className="card">
          <div className="text-sm text-secondary mb-2">{t.currentWeek}</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
            {t.week} {currentWeek}
          </div>
          <p className="text-sm mt-2">{t.of10Weeks}</p>
        </div>

        <div className="card">
          <div className="text-sm text-secondary mb-2">{t.progress}</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--success-color)' }}>
            {completionPercentage}%
          </div>
          <div className="progress-bar mt-3">
            <div
              className="progress-bar-fill"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        <div className="card">
          <div className="text-sm text-secondary mb-2">{t.journalEntries}</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--secondary-color)' }}>
            {journalEntries.length}
          </div>
          <p className="text-sm mt-2">{t.reflectionsRecorded}</p>
        </div>
      </div>

      <section className="card">
        <h2 className="mb-4">{t.quickStats}</h2>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <span>{t.completedLessons}</span>
            <span className="badge badge-primary">
              {userProgress?.completedLessons.length || 0} / 70
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span>{t.journalEntries}</span>
            <span className="badge badge-success">{journalEntries.length}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>{t.courseStatus}</span>
            <span className={`badge ${completionPercentage === 100 ? 'badge-success' : 'badge-primary'}`}>
              {completionPercentage === 100 ? t.completedEmoji : t.inProgress}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
