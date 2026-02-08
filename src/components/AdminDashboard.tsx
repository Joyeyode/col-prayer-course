import React, { useState, useEffect } from 'react';
import '../styles/components.css';

interface UserData {
  id: string;
  name: string;
  email: string;
  joinDate: any;
  lastActive: any;
  [key: string]: any;
}

export const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [activeUsers, setActiveUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active'>('all');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        // Dynamically import Firebase service to avoid blocking app on load
        const { getAllUsers, getActiveUsers } = await import('../services/firebaseService');
        const allUsers = await getAllUsers();
        const recentlyActive = await getActiveUsers(24);
        setUsers(allUsers);
        setActiveUsers(recentlyActive);
      } catch (error) {
        console.error('Error loading users:', error);
        setError(`Failed to load users: ${error instanceof Error ? error.message : 'Unknown error'}`);
        setUsers([]);
        setActiveUsers([]);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const displayUsers = filter === 'active' ? activeUsers : users;

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return 'N/A';
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <section className="card mb-6">
        <h1 style={{ marginTop: 0, marginBottom: '0.5rem' }}>👥 Admin Dashboard</h1>
        <p className="text-secondary">Track user engagement and course participation</p>
      </section>

      {/* Error Message */}
      {error && (
        <section className="card mb-6" style={{ backgroundColor: '#fee', borderLeft: '4px solid #c00' }}>
          <p style={{ margin: 0, color: '#c00' }}>⚠️ {error}</p>
        </section>
      )}

      {/* Statistics */}
      <section className="card mb-6">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1.5rem' }}>
          <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'var(--surface)', borderRadius: '8px' }}>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Total Users</p>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-color)', margin: 0 }}>
              {users.length}
            </p>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'var(--surface)', borderRadius: '8px' }}>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Active (24h)</p>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--success-color)', margin: 0 }}>
              {activeUsers.length}
            </p>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'var(--surface)', borderRadius: '8px' }}>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Activity Rate</p>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--secondary-color)', margin: 0 }}>
              {users.length > 0 ? Math.round((activeUsers.length / users.length) * 100) : 0}%
            </p>
          </div>
        </div>
      </section>

      {/* Filter & List */}
      <section className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ marginTop: 0 }}>Users</h2>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setFilter('all')}
            >
              All Users ({users.length})
            </button>
            <button
              className={`btn ${filter === 'active' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setFilter('active')}
            >
              Active (24h) ({activeUsers.length})
            </button>
          </div>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>Loading users...</p>
        ) : displayUsers.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>No users found</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              color: 'var(--text-primary)',
            }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Name</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Email</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Joined</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Last Active</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {displayUsers.map((user) => (
                  <tr key={user.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '1rem' }}>
                      <strong>{user.name}</strong>
                      <br />
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        ID: {user.id.substring(0, 8)}...
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>{user.email}</td>
                    <td style={{ padding: '1rem' }}>{formatDate(user.joinDate)}</td>
                    <td style={{ padding: '1rem' }}>{formatDate(user.lastActive)}</td>
                    <td style={{ padding: '1rem' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '12px',
                          fontSize: '0.85rem',
                          backgroundColor: activeUsers.some(u => u.id === user.id)
                            ? 'var(--success-color)'
                            : 'var(--border-color)',
                          color: activeUsers.some(u => u.id === user.id) ? 'white' : 'var(--text-primary)',
                        }}
                      >
                        {activeUsers.some(u => u.id === user.id) ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Info Box */}
      <section className="card mt-6" style={{ backgroundColor: 'var(--surface)', borderLeft: '4px solid var(--primary-color)' }}>
        <h3 style={{ marginTop: 0 }}>📌 Firebase Setup Status</h3>
        <p style={{ margin: 0, fontSize: '0.95rem' }}>
          {users.length > 0 ? (
            <>
              ✅ <strong>Connected to Firebase!</strong> {users.length} user(s) found in database.
            </>
          ) : (
            <>
              ⚠️ No users synced yet. Make sure Firebase credentials are configured in <code>.env.local</code>
            </>
          )}
        </p>
      </section>
    </div>
  );
};
