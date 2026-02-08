import React from 'react';
import { useAppStore } from '../store/appStore';
import '../styles/components.css';

export const Dashboard: React.FC = () => {
  const { userProgress, getCompletionPercentage, journalEntries } = useAppStore();
  const completionPercentage = getCompletionPercentage();
  const currentWeek = userProgress?.weekNumber || 1;

  return (
    <div className="dashboard-container">
      <section className="card mb-6">
        <h1>Welcome, Intercessor!</h1>
        <p className="text-secondary mt-2">Continue your journey through the 10-week Intercessory Prayer Course</p>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <div className="card">
          <div className="text-sm text-secondary mb-2">Current Week</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
            Week {currentWeek}
          </div>
          <p className="text-sm mt-2">of 10 weeks</p>
        </div>

        <div className="card">
          <div className="text-sm text-secondary mb-2">Progress</div>
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
          <div className="text-sm text-secondary mb-2">Journal Entries</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--secondary-color)' }}>
            {journalEntries.length}
          </div>
          <p className="text-sm mt-2">reflections recorded</p>
        </div>
      </div>

      <section className="card">
        <h2 className="mb-4">Quick Stats</h2>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <span>Completed Lessons</span>
            <span className="badge badge-primary">
              {userProgress?.completedLessons.length || 0} / 70
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span>Journal Entries</span>
            <span className="badge badge-success">{journalEntries.length}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Course Status</span>
            <span className={`badge ${completionPercentage === 100 ? 'badge-success' : 'badge-primary'}`}>
              {completionPercentage === 100 ? 'Completed! 🎉' : 'In Progress'}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
