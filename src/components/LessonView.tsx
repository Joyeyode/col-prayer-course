import React from 'react';
import { useAppStore } from '../store/appStore';
import { courseContent } from '../data/courseContent';
import '../styles/components.css';

interface LessonProps {
  weekNumber: number;
  dayNumber: number;
}

export const LessonView: React.FC<LessonProps> = ({ weekNumber, dayNumber }) => {
  const week = courseContent.find(w => w.weekNumber === weekNumber);
  const lesson = week?.lessons.find(l => l.dayNumber === dayNumber);
  
  const { userProgress, markLessonComplete, addNote, getNotesForLesson } = useAppStore();
  const [showNoteForm, setShowNoteForm] = React.useState(false);
  const [noteContent, setNoteContent] = React.useState('');
  
  if (!lesson) return <div>Lesson not found</div>;

  const isCompleted = userProgress?.completedLessons.includes(lesson.id) || false;
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
            <span className="badge badge-primary mb-2">Week {weekNumber} • Day {dayNumber}</span>
            <h1>{lesson.title}</h1>
            {week && (
              <p style={{ color: '#666', marginTop: '0.5rem', fontSize: '0.95rem' }}>
                <strong>Week Focus:</strong> {week.focusArea}
              </p>
            )}
          </div>
          <button
            className={isCompleted ? 'btn btn-success' : 'btn btn-primary'}
            onClick={handleMarkComplete}
          >
            {isCompleted ? '✓ Completed' : 'Mark Complete'}
          </button>
        </div>
      </header>

      <section className="card mb-6">
        <h2 className="mb-4">Today's Lesson</h2>
        <div className="lesson-content">
          <p style={{ fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>{lesson.content}</p>
          
          {lesson.scriptureReference && (
            <div className="mt-4 p-4 bg-blue-50 rounded" style={{ backgroundColor: '#e8f2fa', borderLeft: '4px solid #20B2AA' }}>
              <p className="font-bold text-sm mb-1" style={{ color: '#003d7a' }}>📖 Scripture Reference:</p>
              <p className="text-sm" style={{ fontSize: '1rem' }}>{lesson.scriptureReference}</p>
            </div>
          )}

          {lesson.prayerFocus && (
            <div className="mt-4 p-4 bg-purple-50 rounded" style={{ backgroundColor: '#e8f2fa', borderLeft: '4px solid #20B2AA' }}>
              <p className="font-bold text-sm mb-1" style={{ color: '#003d7a' }}>🙏 Prayer Focus:</p>
              <p className="text-sm" style={{ fontSize: '1rem' }}>{lesson.prayerFocus}</p>
            </div>
          )}

          {lesson.nextSteps && lesson.nextSteps.length > 0 && (
            <div className="mt-4 p-4 bg-green-50 rounded" style={{ backgroundColor: '#e8f2fa', borderLeft: '4px solid #20B2AA' }}>
              <p className="font-bold text-sm mb-2" style={{ color: '#003d7a' }}>✍️ Next Steps:</p>
              <ul className="text-sm" style={{ fontSize: '1rem' }}>
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
