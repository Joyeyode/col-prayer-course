import React, { useState } from 'react';
import { useAppStore } from '../store/appStore';
import { getTranslations } from '../data/i18n';
import '../styles/components.css';

export const UserSettingsView: React.FC = () => {
  const language = useAppStore((state) => state.language);
  const user = useAppStore((state) => state.user);
  const setUser = useAppStore((state) => state.setUser);
  const userProgress = useAppStore((state) => state.userProgress);
  const getCompletionPercentage = useAppStore((state) => state.getCompletionPercentage);
  const journalEntries = useAppStore((state) => state.journalEntries);
  const currentStreak = useAppStore((state) => state.currentStreak);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editEmail, setEditEmail] = useState(user?.email || '');
  const [saveMessage, setSaveMessage] = useState('');
  
  const t = getTranslations(language);
  const completionPercentage = getCompletionPercentage();
  const completedLessons = userProgress?.completedLessons.length || 0;

  const handleSaveProfile = () => {
    if (user && editName.trim()) {
      setUser({
        ...user,
        name: editName.trim(),
        email: editEmail.trim(),
        lastActive: new Date(),
      });
      setSaveMessage('Profile updated successfully!');
      setIsEditing(false);
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const handleCancel = () => {
    setEditName(user?.name || '');
    setEditEmail(user?.email || '');
    setIsEditing(false);
  };

  const enrollmentDate = user?.joinDate 
    ? new Date(user.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'N/A';

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      {/* User Profile Card */}
      <section className="card mb-6">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ marginTop: 0, marginBottom: '0.5rem' }}>👤 My Profile</h1>
            <p className="text-secondary">Manage your account and settings</p>
          </div>
          <button
            className={isEditing ? 'btn btn-secondary' : 'btn btn-primary'}
            onClick={() => isEditing ? handleCancel() : setIsEditing(true)}
          >
            {isEditing ? 'Cancel' : '✏️ Edit Profile'}
          </button>
        </div>

        {saveMessage && (
          <div style={{ 
            backgroundColor: 'var(--success-color)', 
            color: 'white', 
            padding: '0.75rem 1rem', 
            borderRadius: '6px', 
            marginBottom: '1rem' 
          }}>
            ✓ {saveMessage}
          </div>
        )}

        {!isEditing ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
              <p className="text-secondary" style={{ marginBottom: '0.25rem' }}>Full Name</p>
              <p style={{ fontSize: '1.1rem', fontWeight: '500', margin: 0 }}>{user?.name}</p>
            </div>
            <div>
              <p className="text-secondary" style={{ marginBottom: '0.25rem' }}>Email Address</p>
              <p style={{ fontSize: '1.1rem', fontWeight: '500', margin: 0 }}>{user?.email}</p>
            </div>
            <div>
              <p className="text-secondary" style={{ marginBottom: '0.25rem' }}>Joined</p>
              <p style={{ fontSize: '1.1rem', fontWeight: '500', margin: 0 }}>{enrollmentDate}</p>
            </div>
            <div>
              <p className="text-secondary" style={{ marginBottom: '0.25rem' }}>Member Since</p>
              <p style={{ fontSize: '1.1rem', fontWeight: '500', margin: 0 }}>
                {user?.joinDate ? new Date(user.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'N/A'}
              </p>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Full Name</label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  backgroundColor: 'var(--surface)',
                  color: 'var(--text-primary)',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email Address</label>
              <input
                type="email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  backgroundColor: 'var(--surface)',
                  color: 'var(--text-primary)',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn btn-success" onClick={handleSaveProfile}>
                💾 Save Changes
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Statistics */}
      <section className="card mb-6">
        <h2 style={{ marginTop: 0, marginBottom: '1.5rem' }}>📊 Your Statistics</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1.5rem' }}>
          <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'var(--surface)', borderRadius: '8px' }}>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Lessons Completed</p>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-color)', margin: 0 }}>
              {completedLessons}
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0.5rem 0 0 0' }}>out of 63</p>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'var(--surface)', borderRadius: '8px' }}>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Overall Progress</p>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--success-color)', margin: 0 }}>
              {completionPercentage}%
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0.5rem 0 0 0' }}>course completion</p>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'var(--surface)', borderRadius: '8px' }}>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Current Streak</p>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--secondary-color)', margin: 0 }}>
              {currentStreak}
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0.5rem 0 0 0' }}>consecutive days</p>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'var(--surface)', borderRadius: '8px' }}>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Journal Entries</p>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-color)', margin: 0 }}>
              {journalEntries.length}
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0.5rem 0 0 0' }}>reflections recorded</p>
          </div>
        </div>
      </section>

      {/* Quick Tips */}
      <section className="card">
        <h2 style={{ marginTop: 0, marginBottom: '1rem' }}>💡 Tips for Success</h2>
        <ul style={{ lineHeight: '1.8', color: 'var(--text-primary)' }}>
          <li>✓ Complete one lesson daily to maintain your streak</li>
          <li>✓ Use the journal to record prayer insights and answered prayers</li>
          <li>✓ Review previous weeks when you need refreshment or deeper study</li>
          <li>✓ Take the Intercessor Personality Quiz to understand your prayer style</li>
          <li>✓ Share your progress with your prayer community for encouragement</li>
        </ul>
      </section>
    </div>
  );
};
