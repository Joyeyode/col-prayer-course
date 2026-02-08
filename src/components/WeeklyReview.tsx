import React from 'react';
import { courseContent } from '../data/courseContent';
import { useAppStore } from '../store/appStore';

interface WeeklyReviewProps {
  weekNumber: number;
}

export const WeeklyReview: React.FC<WeeklyReviewProps> = ({ weekNumber }) => {
  const { userProgress } = useAppStore();
  const completedLessons = userProgress?.completedLessons || [];
  const week = courseContent.find(w => w.weekNumber === weekNumber);

  if (!week) {
    return <div>Week not found</div>;
  }

  const completedWeekLessons = week.lessons.filter(l => completedLessons.includes(l.id));
  const weekCompletion = Math.round((completedWeekLessons.length / week.lessons.length) * 100);
  const weekTitle = week.title || `Week ${weekNumber}`;

  // Collect key scriptures and prayer focuses
  const keyScriptures = week.lessons
    .slice(0, 7)
    .map(l => l.scriptureReference)
    .filter(Boolean);

  const keyPrayerFocuses = week.lessons
    .slice(0, 7)
    .map(l => l.prayerFocus)
    .filter(Boolean);

  const reflectionPrompts = [
    'What was the most meaningful lesson this week?',
    'How has your intercession style changed or deepened?',
    'What specific answers to prayer have you seen?',
    'How will you apply this week\'s focus to your prayer life going forward?',
  ];

  return (
    <div className="weekly-review" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="card">
        <h2 style={{
          fontSize: '1.8rem',
          color: 'var(--primary-color)',
          marginBottom: '1rem',
        }}>
          📋 {weekTitle} Summary
        </h2>

        {/* Week Completion Progress */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>
              Lessons Completed
            </span>
            <span style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>
              {completedWeekLessons.length} / {week.lessons.length}
            </span>
          </div>
          <div style={{
            width: '100%',
            height: '20px',
            backgroundColor: 'var(--border-color)',
            borderRadius: '10px',
            overflow: 'hidden',
          }}>
            <div style={{
              width: `${weekCompletion}%`,
              height: '100%',
              backgroundColor: 'var(--success-color)',
              transition: 'width 0.3s ease',
            }} />
          </div>
        </div>

        {/* Daily Lessons */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '1rem' }}>
            📖 Daily Lessons
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '0.5rem' }}>
            {week.lessons.map((lesson) => {
              const isCompleted = completedLessons.includes(lesson.id);
              return (
                <div
                  key={lesson.id}
                  style={{
                    padding: '0.75rem',
                    backgroundColor: isCompleted ? '#f0fdf4' : 'var(--surface)',
                    border: isCompleted ? '2px solid var(--success-color)' : '1px solid var(--border-color)',
                    borderRadius: '6px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    color: isCompleted ? 'var(--success-color)' : 'var(--text-secondary)',
                  }}>
                    Day {lesson.dayNumber}
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-secondary)',
                    marginTop: '0.25rem',
                  }}>
                    {isCompleted ? '✓ Complete' : 'Not started'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Key Scriptures */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '1rem' }}>
            📕 Key Scriptures
          </h3>
          <div style={{
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border-color)',
            borderLeft: '4px solid var(--secondary-color)',
            borderRadius: '8px',
            padding: '1rem',
          }}>
            <ul style={{ margin: '0', paddingLeft: '1.5rem', color: 'var(--text-primary)' }}>
              {keyScriptures.map((scripture, idx) => (
                <li key={idx} style={{ marginBottom: '0.5rem' }}>
                  {scripture}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Prayer Focus Summary */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '1rem' }}>
            🙏 Weekly Prayer Focus
          </h3>
          <div style={{
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border-color)',
            borderLeft: '4px solid #9333ea',
            borderRadius: '8px',
            padding: '1rem',
          }}>
            <ul style={{ margin: '0', paddingLeft: '1.5rem', color: 'var(--text-primary)' }}>
              {keyPrayerFocuses.slice(0, 3).map((focus, idx) => (
                <li key={idx} style={{ marginBottom: '0.5rem' }}>
                  {focus}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Reflection Section */}
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '1rem' }}>
            ✍️ Week Reflection
          </h3>
          <div style={{
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            padding: '1.5rem',
          }}>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.95rem' }}>
              Take time to reflect on this week's journey:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {reflectionPrompts.map((prompt, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'var(--background)',
                    padding: '0.75rem 1rem',
                    borderRadius: '6px',
                    borderLeft: '3px solid var(--primary-color)',
                  }}
                >
                  <p style={{ color: 'var(--text-primary)', margin: '0', fontSize: '0.9rem' }}>
                    {idx + 1}. {prompt}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
