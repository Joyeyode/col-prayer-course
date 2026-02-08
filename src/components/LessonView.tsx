import React from 'react';
import { useAppStore } from '../store/appStore';
import { courseContent } from '../data/courseContent';
import { IntercessorPersonalityQuiz } from './IntercessorPersonalityQuiz';
import { getTranslations } from '../data/i18n';
import '../styles/components.css';

interface LessonProps {
  weekNumber: number;
  dayNumber: number;
}

export const LessonView: React.FC<LessonProps> = ({ weekNumber, dayNumber }) => {
  const week = courseContent.find(w => w.weekNumber === weekNumber);
  const lesson = week?.lessons.find(l => l.dayNumber === dayNumber);
  
  const language = useAppStore((state) => state.language);
  const userProgress = useAppStore((state) => state.userProgress);
  const markLessonComplete = useAppStore((state) => state.markLessonComplete);
  const addNote = useAppStore((state) => state.addNote);
  const getNotesForLesson = useAppStore((state) => state.getNotesForLesson);
  const toggleFavorite = useAppStore((state) => state.toggleFavorite);
  const isFavorited = useAppStore((state) => state.isFavorited);
  const [showNoteForm, setShowNoteForm] = React.useState(false);
  const [noteContent, setNoteContent] = React.useState('');
  const [showQuiz, setShowQuiz] = React.useState(false);

  const t = getTranslations(language);
  
  if (!lesson) return <div>Lesson not found</div>;

  const isCompleted = userProgress?.completedLessons.includes(lesson.id) || false;
  const isFav = isFavorited(lesson.id);
  const notes = getNotesForLesson(lesson.id);

  const handleMarkComplete = () => {
    markLessonComplete(lesson.id, weekNumber);
  };

  const handleAddNote = () => {
    if (noteContent.trim()) {
      addNote({
        userId: 'default-user',
        lessonId: lesson.id,
        content: noteContent,
      });
      setNoteContent('');
      setShowNoteForm(false);
    }
  };

  return (
    <div className="lesson-container">
      <header className="lesson-header card mb-6">
        <div className="flex justify-between items-center">
          <div>
            <span className="badge badge-primary mb-2">{t.week} {weekNumber} • {t.day} {dayNumber}</span>
            <h1>{lesson.title}</h1>
            {week && (
              <p style={{ color: '#666', marginTop: '0.5rem', fontSize: '0.95rem' }}>
                <strong>{t.weekFocus}:</strong> {week.focusArea}
              </p>
            )}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <button
              onClick={() => toggleFavorite(lesson.id)}
              title={isFav ? 'Remove from favorites' : 'Add to favorites'}
              style={{
                backgroundColor: 'transparent',
                border: '2px solid var(--secondary-color)',
                color: isFav ? 'var(--secondary-color)' : 'var(--text-secondary)',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--secondary-color)';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = isFav ? 'var(--secondary-color)' : 'transparent';
                e.currentTarget.style.color = isFav ? 'white' : 'var(--text-secondary)';
              }}
            >
              {isFav ? '⭐' : '☆'}
            </button>
            <button
              className={isCompleted ? 'btn btn-success' : 'btn btn-primary'}
              onClick={handleMarkComplete}
            >
              {isCompleted ? '✓ Completed' : 'Mark Complete'}
            </button>
          </div>
        </div>
      </header>

      <section className="card mb-6">
        <h2 className="mb-4">{t.lesson}</h2>
        <div className="lesson-content">
          <p style={{ fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>{lesson.content}</p>
          
          {lesson.scriptureReference && (
            <div className="mt-4 p-4 bg-blue-50 rounded" style={{ 
              backgroundColor: 'var(--surface)',
              borderLeft: '4px solid var(--secondary-color)',
              border: '1px solid var(--border-color)'
            }}>
              <p className="font-bold text-sm mb-1" style={{ color: 'var(--primary-color)' }}>📖 Scripture Reference:</p>
              <p className="text-sm" style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>{lesson.scriptureReference}</p>
            </div>
          )}

          {lesson.prayerFocus && (
            <div className="mt-4 p-4 bg-purple-50 rounded" style={{ 
              backgroundColor: 'var(--surface)',
              borderLeft: '4px solid #9333ea',
              border: '1px solid var(--border-color)'
            }}>
              <p className="font-bold text-sm mb-1" style={{ color: 'var(--primary-color)' }}>🙏 Prayer Focus:</p>
              <p className="text-sm" style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>{lesson.prayerFocus}</p>
            </div>
          )}

          {lesson.nextSteps && lesson.nextSteps.length > 0 && (
            <div className="mt-4 p-4 bg-green-50 rounded" style={{ 
              backgroundColor: 'var(--surface)',
              borderLeft: '4px solid #22c55e',
              border: '1px solid var(--border-color)'
            }}>
              <p className="font-bold text-sm mb-2" style={{ color: 'var(--primary-color)' }}>✍️ Next Steps:</p>
              <ul className="text-sm" style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>
                {lesson.nextSteps.map((step, index) => (
                  <li key={index} className="mb-1">
                    • {step}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {weekNumber === 3 && !showQuiz && (
        <section className="card mb-6" style={{ backgroundColor: '#ede9fe', borderLeft: '4px solid #9333ea' }}>
          <h2 style={{ color: '#7c3aed', marginTop: 0 }}>🎯 Discover Your Intercessor Personality</h2>
          <p>
            As part of Week 3 - "Called to Intercession," take our personality quiz to discover your unique intercessor type. This will help you understand how God has wired you for intercession and reveal your specific strengths, challenges, and prayer focuses.
          </p>
          <button
            className="btn"
            style={{
              backgroundColor: '#7c3aed',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              fontSize: '1rem'
            }}
            onClick={() => setShowQuiz(true)}
          >
            Take the Quiz →
          </button>
        </section>
      )}

      {weekNumber === 3 && showQuiz && (
        <>
          <button className="btn btn-secondary mb-4" onClick={() => setShowQuiz(false)}>
            ← Back to Lesson
          </button>
          <IntercessorPersonalityQuiz />
        </>
      )}

      <section className="card">
        <div className="flex justify-between items-center mb-4">
          <h2>My Notes</h2>
          <button className="btn btn-sm btn-primary" onClick={() => setShowNoteForm(!showNoteForm)}>
            + Add Note
          </button>
        </div>

        {showNoteForm && (
          <div className="mb-4 p-4 bg-gray-50 rounded">
            <div className="input-group">
              <textarea
                placeholder="Write your notes here..."
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
              />
              <div className="flex gap-2">
                <button className="btn btn-sm btn-success" onClick={handleAddNote}>
                  Save Note
                </button>
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => setShowNoteForm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {notes.length > 0 ? (
          <div className="notes-list space-y-2">
            {notes.map((note) => (
              <div key={note.id} className="p-3 bg-gray-50 rounded border-l-4 border-primary">
                <p className="text-sm text-gray-600 mb-1">
                  {new Date(note.updatedAt).toLocaleDateString()}
                </p>
                <p>{note.content}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No notes yet. Add your first note to get started!</p>
        )}
      </section>
    </div>
  );
};
