import React, { useState } from 'react';
import { quizQuestions, intercessorTypeProfiles, calculateResults, IntercessorType } from '../data/intercessorQuiz';
import '../styles/components.css';

export const IntercessorPersonalityQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, IntercessorType>>({});
  const [showResults, setShowResults] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleAnswer = (type: IntercessorType) => {
    const question = quizQuestions[currentQuestion];
    const newAnswers = { ...answers, [question.id]: type };
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setCopied(false);
  };

  const handleShare = () => {
    const results = calculateResults(answers);
    const primaryProfile = results.primary ? intercessorTypeProfiles[results.primary] : null;
    const secondaryProfile = results.secondary ? intercessorTypeProfiles[results.secondary] : null;

    let shareText = `🎯 I discovered my intercessor personality type!\n\n`;
    shareText += `Primary Type: ${primaryProfile?.name}\n`;
    shareText += `${primaryProfile?.title}\n\n`;
    
    if (secondaryProfile && results.primary !== results.secondary) {
      shareText += `Secondary Type: ${secondaryProfile.name}\n`;
      shareText += `${secondaryProfile.title}\n\n`;
    }

    shareText += `Join me and take the Intercessor Personality Quiz!\n`;
    shareText += `Learn your unique prayer style and how God has wired you for intercession.\n`;
    shareText += `https://col-prayer-course.vercel.app`;

    navigator.clipboard.writeText(shareText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const results = calculateResults(answers);
  const primaryProfile = results.primary ? intercessorTypeProfiles[results.primary] : null;
  const secondaryProfile = results.secondary ? intercessorTypeProfiles[results.secondary] : null;

  return (
    <div className="card" style={{ maxWidth: '900px', margin: '0 auto' }}>
      {!showResults ? (
        <>
          <div style={{ marginBottom: '2rem' }}>
            <h2>🎯 What's Your Intercessor Personality Type?</h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              Discover your unique intercessor profile by answering these questions. There are no right or wrong answers—just reflect honestly about yourself.
            </p>
          </div>

          {/* Progress Bar */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span className="text-secondary">Question {currentQuestion + 1} of {quizQuestions.length}</span>
              <span className="text-secondary">{Math.round(((currentQuestion + 1) / quizQuestions.length) * 100)}%</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Current Question */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>
              {quizQuestions[currentQuestion].question}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {quizQuestions[currentQuestion].answers.map((answer, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(answer.type)}
                  style={{
                    padding: '1rem',
                    backgroundColor: 'var(--surface)',
                    border: '2px solid var(--border-color)',
                    borderRadius: '8px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontSize: '1rem',
                    color: 'var(--text-primary)',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--primary-color)';
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.borderColor = 'var(--primary-color)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--surface)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                  }}
                >
                  {answer.text}
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Results */}
          <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <h2 style={{ color: 'var(--primary-color)', marginBottom: '0.5rem' }}>Your Intercessor Personality</h2>
            <p className="text-secondary">Based on your answers, here's your profile:</p>
          </div>

          {/* Primary Type */}
          {primaryProfile && (
            <div className="card" style={{ backgroundColor: '#f5f3ff', borderLeft: '4px solid var(--primary-color)', marginBottom: '2rem' }}>
              <h3 style={{ color: 'var(--primary-color)', marginTop: 0 }}>{primaryProfile.name}</h3>
              <p style={{ fontStyle: 'italic', fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                {primaryProfile.title}
              </p>
              <p style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>{primaryProfile.description}</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <h4 style={{ marginTop: 0, color: 'var(--primary-color)' }}>✅ Your Strengths</h4>
                  <ul style={{ marginBottom: 0 }}>
                    {primaryProfile.strengths.map((strength, i) => (
                      <li key={i}>{strength}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 style={{ marginTop: 0, color: '#e85d75' }}>⚠️ Challenges to Watch</h4>
                  <ul style={{ marginBottom: 0 }}>
                    {primaryProfile.challenges.map((challenge, i) => (
                      <li key={i}>{challenge}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ marginTop: 0, color: 'var(--primary-color)' }}>🎯 You Pray Best For:</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {primaryProfile.bestPrayerFor.map((prayer, i) => (
                    <span key={i} className="badge badge-primary">{prayer}</span>
                  ))}
                </div>
              </div>

              <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '6px', marginBottom: '1rem' }}>
                <p style={{ marginTop: 0 }}>
                  <strong>Biblical Example:</strong> {primaryProfile.biblicalExample}
                </p>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Scripture: {primaryProfile.scriptureReference}
                </p>
              </div>

              <div className="card" style={{ backgroundColor: '#fffbeb', borderLeft: '4px solid #f59e0b', marginBottom: 0 }}>
                <h4 style={{ marginTop: 0, color: '#d97706' }}>💡 Advice for Your Intercession</h4>
                <p style={{ margin: 0, lineHeight: 1.6 }}>{primaryProfile.advice}</p>
              </div>
            </div>
          )}

          {/* Secondary Type */}
          {secondaryProfile && results.primary !== results.secondary && (
            <div className="card" style={{ backgroundColor: '#f9fafb', borderLeft: '4px solid #9333ea', marginBottom: '2rem' }}>
              <h3 style={{ color: '#9333ea', marginTop: 0 }}>Your Secondary Type: {secondaryProfile.name}</h3>
              <p style={{ marginBottom: '1rem', lineHeight: 1.6 }}>{secondaryProfile.description}</p>
              <p style={{ marginBottom: 0, color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                <strong>Note:</strong> You likely blend characteristics of your primary and secondary types. Your intercession may shift between these styles depending on the situation and what God is calling you to in that moment.
              </p>
            </div>
          )}

          {/* Actions */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center', marginTop: '2rem' }}>
            <button className="btn btn-primary" onClick={handleRestart}>
              Retake Quiz
            </button>
            <button
              className="btn"
              style={{
                backgroundColor: copied ? 'var(--success-color)' : '#0891b2',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onClick={handleShare}
            >
              {copied ? '✓ Copied!' : '📤 Share Results'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};
