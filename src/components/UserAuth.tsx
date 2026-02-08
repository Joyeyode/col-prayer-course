import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { syncUserProfile } from '../services/firebaseService';
import { User } from '../types';
import '../styles/components.css';

interface UserAuthProps {
  onAuthSuccess: (user: User) => void;
}

export const UserAuth: React.FC<UserAuthProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      let userCredential;

      if (isLogin) {
        // Sign in
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      } else {
        // Sign up
        if (!name.trim()) {
          setError('Please enter your name');
          setIsLoading(false);
          return;
        }
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      }

      const firebaseUser = userCredential.user;

      // Create/update user in Zustand and sync to Firebase
      const userData: User = {
        id: firebaseUser.uid,
        name: isLogin ? firebaseUser.displayName || 'Prayer Intercessor' : name,
        email: firebaseUser.email || email,
        joinDate: new Date(),
        lastActive: new Date(),
      };

      // Sync to Firebase
      await syncUserProfile(userData);

      // Success - call parent callback
      onAuthSuccess(userData);
    } catch (err: any) {
      const errorMessage = err.message || 'Authentication failed';
      
      // Map common Firebase errors to user-friendly messages
      if (errorMessage.includes('email-already-in-use')) {
        setError('📧 Email already registered. Please sign in instead.');
      } else if (errorMessage.includes('weak-password')) {
        setError('🔐 Password must be at least 6 characters.');
      } else if (errorMessage.includes('user-not-found')) {
        setError('👤 Email not found. Please sign up first.');
      } else if (errorMessage.includes('wrong-password')) {
        setError('🔑 Incorrect password.');
      } else if (errorMessage.includes('auth/invalid-email')) {
        setError('📧 Please enter a valid email address.');
      } else {
        setError(`❌ ${errorMessage}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '1rem',
      backgroundColor: 'var(--background)',
    }}>
      <div className="card" style={{ maxWidth: '400px', width: '100%' }}>
        <h1 style={{ marginTop: 0, textAlign: 'center', marginBottom: '0.5rem' }}>
          🙏 COL Prayer Course
        </h1>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          {isLogin ? 'Welcome back!' : 'Join our prayer community'}
        </p>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid var(--border-color)',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  backgroundColor: 'var(--surface)',
                  color: 'var(--text-primary)',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          )}

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid var(--border-color)',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                backgroundColor: 'var(--surface)',
                color: 'var(--text-primary)',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid var(--border-color)',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                backgroundColor: 'var(--surface)',
                color: 'var(--text-primary)',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {error && (
            <div style={{
              padding: '0.75rem',
              backgroundColor: '#fee',
              color: '#c00',
              borderRadius: '0.5rem',
              marginBottom: '1rem',
              fontSize: '0.9rem',
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !email || !password}
            className="btn btn-primary"
            style={{ width: '100%' }}
          >
            {isLoading ? '⏳ Processing...' : isLogin ? '🔓 Sign In' : '✨ Create Account'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
          </p>
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setEmail('');
              setPassword('');
              setName('');
            }}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--primary-color)',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500',
              textDecoration: 'underline',
            }}
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </div>

        <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '1.5rem' }}>
          Your data is securely stored and never shared.
        </p>
      </div>
    </div>
  );
};
