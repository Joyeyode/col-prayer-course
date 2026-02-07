import React from 'react';
import { useAppStore } from '../store/appStore';
import '../styles/components.css';

export const JournalView: React.FC = () => {
  const { journalEntries, addJournalEntry, updateJournalEntry, deleteJournalEntry } = useAppStore();
  const [showForm, setShowForm] = React.useState(false);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [formData, setFormData] = React.useState({
    weekNumber: 1,
    lessonId: '',
    content: '',
    prayerRequest: '',
    breakthrough: '',
  });

  const handleSubmit = () => {
    if (!formData.content.trim()) return;

    if (editingId) {
      updateJournalEntry(editingId, {
        userId: 'default-user',
        date: new Date(),
        weekNumber: formData.weekNumber,
        lessonId: formData.lessonId,
        content: formData.content,
        prayerRequest: formData.prayerRequest,
        breakthrough: formData.breakthrough,
      });
      setEditingId(null);
    } else {
      addJournalEntry({
        userId: 'default-user',
        date: new Date(),
        weekNumber: formData.weekNumber,
        lessonId: formData.lessonId,
        content: formData.content,
        prayerRequest: formData.prayerRequest,
        breakthrough: formData.breakthrough,
      });
    }

    setFormData({
      weekNumber: 1,
      lessonId: '',
      content: '',
      prayerRequest: '',
      breakthrough: '',
    });
    setShowForm(false);
  };

  const handleEdit = (entry) => {
    setFormData({
      weekNumber: entry.weekNumber,
      lessonId: entry.lessonId,
      content: entry.content,
      prayerRequest: entry.prayerRequest || '',
      breakthrough: entry.breakthrough || '',
    });
    setEditingId(entry.id);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      weekNumber: 1,
      lessonId: '',
      content: '',
      prayerRequest: '',
      breakthrough: '',
    });
  };

  const sortedEntries = [...journalEntries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="journal-container">
      <header className="card mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1>Prayer Journal</h1>
            <p className="text-secondary mt-2">Record your prayers, reflections, and breakthroughs</p>
          </div>
          {!showForm && (
            <button className="btn btn-primary" onClick={() => setShowForm(true)}>
              + New Entry
            </button>
          )}
        </div>
      </header>

      {showForm && (
        <section className="card mb-6">
          <h2 className="mb-4">{editingId ? 'Edit Entry' : 'New Journal Entry'}</h2>
          
          <div className="input-group">
            <label>Week Number</label>
            <input
              type="number"
              min="1"
              max="10"
              value={formData.weekNumber}
              onChange={(e) => setFormData({ ...formData, weekNumber: parseInt(e.target.value) })}
            />
          </div>

          <div className="input-group">
            <label>Your Reflection</label>
            <textarea
              placeholder="Write about today's lesson, your thoughts, and how it applies to your life..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            />
          </div>

          <div className="input-group">
            <label>Prayer Request</label>
            <textarea
              placeholder="What are you praying for? Share your intercession focus..."
              value={formData.prayerRequest}
              onChange={(e) => setFormData({ ...formData, prayerRequest: e.target.value })}
              style={{ minHeight: '80px' }}
            />
          </div>

          <div className="input-group">
            <label>Breakthrough/Answer to Prayer</label>
            <textarea
              placeholder="Record any breakthroughs, answered prayers, or victories God has given you..."
              value={formData.breakthrough}
              onChange={(e) => setFormData({ ...formData, breakthrough: e.target.value })}
              style={{ minHeight: '80px' }}
            />
          </div>

          <div className="flex gap-2 mt-4">
            <button className="btn btn-success" onClick={handleSubmit}>
              {editingId ? 'Update Entry' : 'Save Entry'}
            </button>
            <button className="btn btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </section>
      )}

      {sortedEntries.length > 0 ? (
        <div className="entries-list flex flex-col gap-4">
          {sortedEntries.map((entry) => (
            <article
              key={entry.id}
              className="card"
              style={{ borderLeft: '4px solid var(--secondary-color)' }}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="badge badge-primary mb-2">Week {entry.weekNumber}</span>
                  <p className="text-sm text-secondary">
                    {new Date(entry.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => handleEdit(entry)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteJournalEntry(entry.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="mb-2">Reflection</h3>
                <p>{entry.content}</p>
              </div>

              {entry.prayerRequest && (
                <div className="mt-4 p-3 bg-blue-50 rounded" style={{ backgroundColor: '#e8f2fa', borderLeft: '4px solid #20B2AA' }}>
                  <p className="font-bold text-sm mb-1">Prayer Request:</p>
                  <p className="text-sm">{entry.prayerRequest}</p>
                </div>
              )}

              {entry.breakthrough && (
                <div className="mt-4 p-3 bg-green-50 rounded" style={{ backgroundColor: '#e8f2fa', borderLeft: '4px solid #20B2AA' }}>
                  <p className="font-bold text-sm mb-1">Breakthrough:</p>
                  <p className="text-sm">{entry.breakthrough}</p>
                </div>
              )}
            </article>
          ))}
        </div>
      ) : (
        <section className="card text-center py-8">
          <p className="text-secondary mb-4">No journal entries yet.</p>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            Create Your First Entry
          </button>
        </section>
      )}
    </div>
  );
};
