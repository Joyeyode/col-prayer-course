import React from 'react';
import { courseContent } from '../data/courseContent';
import { useAppStore } from '../store/appStore';

interface FavoritesViewProps {
  onSelectLesson?: (weekNumber: number, dayNumber: number) => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({ onSelectLesson }) => {
  const { favorites } = useAppStore();

  // Get all favorite lessons
  const favoritesList = courseContent
    .flatMap(week =>
      week.lessons
        .filter(lesson => favorites.includes(lesson.id))
        .map(lesson => ({ ...lesson, weekNumber: week.weekNumber }))
    )
    .sort((a, b) => a.weekNumber - b.weekNumber || a.dayNumber - b.dayNumber);

  if (favoritesList.length === 0) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          ⭐ Favorites
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          No favorites yet. Mark lessons as favorites to revisit them later!
        </p>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          Click the ⭐ bookmark icon on any lesson to add it to your favorites.
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="card">
        <h2 style={{ fontSize: '1.8rem', color: 'var(--primary-color)', marginBottom: '1rem' }}>
          ⭐ My Favorite Lessons ({favoritesList.length})
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {favoritesList.map((lesson) => (
            <div
              key={lesson.id}
              className="card"
              style={{
                backgroundColor: 'var(--surface)',
                border: '2px solid var(--secondary-color)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              onClick={() => onSelectLesson?.(lesson.weekNumber, lesson.dayNumber)}
            >
              <div style={{ marginBottom: '0.75rem' }}>
                <span className="badge badge-primary">
                  Week {lesson.weekNumber} • Day {lesson.dayNumber}
                </span>
              </div>

              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: 'bold',
                color: 'var(--text-primary)',
                marginBottom: '0.75rem',
              }}>
                {lesson.title}
              </h3>

              <div style={{
                backgroundColor: 'var(--background)',
                padding: '0.75rem',
                borderRadius: '6px',
                marginBottom: '0.75rem',
              }}>
                <p style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                  margin: '0',
                  lineHeight: '1.4',
                }}>
                  📖 {lesson.scriptureReference}
                </p>
              </div>

              <div style={{
                backgroundColor: 'var(--background)',
                padding: '0.75rem',
                borderRadius: '6px',
              }}>
                <p style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                  margin: '0',
                  lineHeight: '1.4',
                }}>
                  🙏 {lesson.prayerFocus}
                </p>
              </div>

              <div style={{
                marginTop: '1rem',
                paddingTop: '1rem',
                borderTop: '1px solid var(--border-color)',
              }}>
                <button
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    backgroundColor: 'var(--primary-color)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectLesson?.(lesson.weekNumber, lesson.dayNumber);
                  }}
                >
                  Open Lesson →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
