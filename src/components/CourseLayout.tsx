import React from 'react';
import { courseContent, courseIntroduction } from '../data/courseContent';
import { useAppStore } from '../store/appStore';
import '../styles/components.css';

interface CourseLayoutProps {
  onSelectLesson: (weekNumber: number, dayNumber: number) => void;
}

export const CourseLayout: React.FC<CourseLayoutProps> = ({ onSelectLesson }) => {
  const { userProgress } = useAppStore();
  const [selectedWeek, setSelectedWeek] = React.useState(1);

  const week = selectedWeek === 0 ? null : courseContent.find(w => w.weekNumber === selectedWeek);
  const completedLessons = userProgress?.completedLessons || [];

  const calculateWeekCompletion = (weekNum: number) => {
    const weekContent = courseContent.find(w => w.weekNumber === weekNum);
    if (!weekContent) return 0;
    const completed = weekContent.lessons.filter(l =>
      completedLessons.includes(l.id)
    ).length;
    return Math.round((completed / weekContent.lessons.length) * 100);
  };

  return (
    <div className="course-layout" style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem' }}>
      {/* Sidebar - Week Navigation */}
      <aside className="card" style={{ height: 'fit-content', position: 'sticky', top: '1rem' }}>
        <h3 className="mb-4">Course Weeks</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button
            className={`nav-link ${selectedWeek === 0 ? 'active' : ''}`}
            onClick={() => setSelectedWeek(0)}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              textAlign: 'left',
              backgroundColor: selectedWeek === 0 ? 'var(--primary-color)' : 'transparent',
              color: selectedWeek === 0 ? 'white' : 'var(--text-primary)',
            }}
          >
            <span>📖 Overview</span>
          </button>
          {courseContent.map((w) => {
            const completion = calculateWeekCompletion(w.weekNumber);
            const isSelected = selectedWeek === w.weekNumber;
            return (
              <button
                key={w.weekNumber}
                className={`nav-link ${isSelected ? 'active' : ''}`}
                onClick={() => setSelectedWeek(w.weekNumber)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  textAlign: 'left',
                  backgroundColor: isSelected ? 'var(--primary-color)' : 'transparent',
                  color: isSelected ? 'white' : 'var(--text-primary)',
                }}
              >
                <span>Week {w.weekNumber}</span>
                <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>{completion}%</span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Main Content - Week Details or Course Introduction */}
      <main>
        {selectedWeek === 0 && (
          <div className="card mb-6">
            <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{courseIntroduction.title}</h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--primary-color)', fontWeight: '500', marginBottom: '2rem' }}>
              {courseIntroduction.subtitle}
            </p>
            
            <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.8, color: 'var(--text-primary)', marginBottom: '2rem' }}>
              {courseIntroduction.content}
            </div>

            <div className="card" style={{ backgroundColor: '#f5f3ff', borderLeft: '4px solid var(--primary-color)', padding: '1.5rem', marginTop: '2rem' }}>
              <h3 style={{ marginTop: 0 }}>Prayer to Start</h3>
              <p style={{ fontStyle: 'italic', lineHeight: 1.8 }}>{courseIntroduction.prayerToStart}</p>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
              <button
                className="btn btn-primary"
                onClick={() => setSelectedWeek(1)}
                style={{ fontSize: '1rem', padding: '0.75rem 2rem' }}
              >
                Begin Week 1
              </button>
              <p style={{ color: 'var(--text-secondary)', alignSelf: 'center' }}>
                Begin your 9-week journey into intercessory prayer
              </p>
            </div>
          </div>
        )}

        {week && (
          <>
            <div className="card mb-6">
              <h1>{week.title}</h1>
              <p className="text-secondary mt-2">{week.description}</p>
              <div className="mt-4">
                <p className="font-bold mb-2">Focus Area:</p>
                <p>{week.focusArea}</p>
              </div>
              <div className="mt-4">
                <p className="text-sm text-secondary">
                  Completion: {calculateWeekCompletion(week.weekNumber)}%
                </p>
                <div className="progress-bar mt-2">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${calculateWeekCompletion(week.weekNumber)}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="lessons-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
              {week.lessons.map((lesson) => {
                const isCompleted = completedLessons.includes(lesson.id);
                return (
                  <button
                    key={lesson.id}
                    className="card"
                    onClick={() => onSelectLesson(week.weekNumber, lesson.dayNumber)}
                    style={{
                      textAlign: 'left',
                      border: isCompleted ? '2px solid var(--success-color)' : '1px solid var(--border-color)',
                      backgroundColor: 'var(--surface)',
                      boxShadow: isCompleted ? '0 0 0 1px var(--success-color)' : 'none',
                      cursor: 'pointer',
                      color: 'var(--text-primary)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                      <span className="badge badge-primary">Day {lesson.dayNumber}</span>
                      {isCompleted && <span className="badge badge-success">✓</span>}
                    </div>
                    <h4 style={{ color: 'var(--text-primary)' }}>{lesson.title}</h4>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
};
