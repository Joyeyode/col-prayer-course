import React from 'react';
import { courseContent } from '../data/courseContent';
import { useAppStore } from '../store/appStore';
import '../styles/components.css';

interface CourseLayoutProps {
  onSelectLesson: (weekNumber: number, dayNumber: number) => void;
}

export const CourseLayout: React.FC<CourseLayoutProps> = ({ onSelectLesson }) => {
  const { userProgress } = useAppStore();
  const [selectedWeek, setSelectedWeek] = React.useState(1);

  const week = courseContent.find(w => w.weekNumber === selectedWeek);
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

      {/* Main Content - Week Details */}
      <main>
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
                      border: isCompleted ? '2px solid var(--success-color)' : 'none',
                      backgroundColor: isCompleted ? '#f0fdf4' : 'var(--surface)',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                      <span className="badge badge-primary">Day {lesson.dayNumber}</span>
                      {isCompleted && <span className="badge badge-success">✓</span>}
                    </div>
                    <h4>{lesson.title}</h4>
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
