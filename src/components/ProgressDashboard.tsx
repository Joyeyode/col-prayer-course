import React from 'react';
import { courseContent } from '../data/courseContent';
import { useAppStore } from '../store/appStore';
import { getTranslations } from '../data/i18n';

export const ProgressDashboard: React.FC = () => {
  const language = useAppStore((state) => state.language);
  const userProgress = useAppStore((state) => state.userProgress);
  const currentStreak = useAppStore((state) => state.currentStreak);
  const t = getTranslations(language);
  
  const completedLessons = userProgress?.completedLessons || [];
  const totalLessons = 63;
  const completionPercentage = Math.round((completedLessons.length / totalLessons) * 100);

  const getWeeklyCompletion = (weekNum: number) => {
    const weekContent = courseContent.find(w => w.weekNumber === weekNum);
    if (!weekContent) return 0;
    const completed = weekContent.lessons.filter(l => completedLessons.includes(l.id)).length;
    return Math.round((completed / weekContent.lessons.length) * 100);
  };

  const getMilestones = () => {
    const milestones = [];
    for (let i = 1; i <= 9; i++) {
      const weekCompletion = getWeeklyCompletion(i);
      if (weekCompletion === 100) {
        milestones.push(t.weekComplete.replace('{week}', i.toString()));
      }
    }
    return milestones;
  };

  const milestones = getMilestones();

  return (
    <div className="progress-dashboard" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="card">
        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>
          📊 {t.yourPrayerJourney}
        </h2>

        {/* Overall Progress */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
              {t.overallProgress}
            </h3>
            <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
              {completedLessons.length} / {totalLessons} {t.lessons}
            </span>
          </div>
          <div style={{
            width: '100%',
            height: '30px',
            backgroundColor: 'var(--border-color)',
            borderRadius: '15px',
            overflow: 'hidden',
            border: '2px solid var(--secondary-color)',
          }}>
            <div style={{
              width: `${completionPercentage}%`,
              height: '100%',
              backgroundColor: 'var(--success-color)',
              transition: 'width 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: completionPercentage > 50 ? 'white' : 'transparent',
              fontWeight: 'bold',
            }}>
              {completionPercentage}%
            </div>
          </div>
        </div>

        {/* Streak Counter */}
        <div style={{
          backgroundColor: 'var(--surface)',
          border: '2px solid var(--secondary-color)',
          borderRadius: '10px',
          padding: '1.5rem',
          marginBottom: '2rem',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
            🔥 {t.currentStreak}
          </p>
          <p style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            color: 'var(--secondary-color)',
            margin: '0',
          }} className="streak-info">
            {currentStreak}
          </p>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            {currentStreak === 1 ? t.dayOfConsistentPrayer : t.daysOfConsistentPrayer}
          </p>
        </div>

        {/* Milestones */}
        {milestones.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '1rem' }}>
              🏆 {t.milestonesAchieved}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {milestones.map((milestone, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#f0fdf4',
                    color: '#166534',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid #86efac',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <span>✅</span>
                  <span style={{ fontWeight: '500' }}>{milestone}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Weekly Breakdown */}
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '1rem' }}>
            📅 {t.weeklyProgress}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
            {courseContent.map((week) => {
              const weekCompletion = getWeeklyCompletion(week.weekNumber);
              return (
                <div
                  key={week.weekNumber}
                  style={{
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    padding: '1rem',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>
                      {t.week} {week.weekNumber}
                    </span>
                    <span style={{ fontSize: '0.9rem', color: 'var(--primary-color)', fontWeight: 'bold' }}>
                      {weekCompletion}%
                    </span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '8px',
                    backgroundColor: 'var(--border-color)',
                    borderRadius: '4px',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      width: `${weekCompletion}%`,
                      height: '100%',
                      backgroundColor: weekCompletion === 100 ? 'var(--success-color)' : 'var(--primary-color)',
                      transition: 'width 0.3s ease',
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
