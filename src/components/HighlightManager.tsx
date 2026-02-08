import React from 'react';
import { useAppStore } from '../store/appStore';

export interface Highlight {
  id: string;
  lessonId: string;
  text: string;
  color: string;
  annotation: string;
  createdAt: Date;
}

interface HighlightManagementProps {
  lessonId: string;
}

export const HighlightManager: React.FC<HighlightManagementProps> = ({ lessonId }) => {
  const { addHighlight, getHighlights, updateHighlight, deleteHighlight } = useAppStore();
  const [selectedText, setSelectedText] = React.useState('');
  const [showAnnotationForm, setShowAnnotationForm] = React.useState(false);
  const [annotationText, setAnnotationText] = React.useState('');
  const [selectedColor, setSelectedColor] = React.useState('yellow');
  const [editingId, setEditingId] = React.useState<string | null>(null);

  const highlights = getHighlights(lessonId);

  const highlightColors = [
    { name: 'yellow', hex: '#fef08a', label: '🟨 Yellow' },
    { name: 'green', hex: '#dcfce7', label: '🟩 Green' },
    { name: 'blue', hex: '#dbeafe', label: '🟦 Blue' },
    { name: 'pink', hex: '#fbcfe8', label: '🟥 Pink' },
    { name: 'purple', hex: '#e9d5ff', label: '🟪 Purple' },
  ];

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      setSelectedText(selection.toString());
      setShowAnnotationForm(true);
      setEditingId(null);
      setAnnotationText('');
      setSelectedColor('yellow');
    }
  };

  const handleAddHighlight = () => {
    if (selectedText.trim()) {
      addHighlight({
        lessonId,
        text: selectedText,
        color: selectedColor,
        annotation: annotationText,
      });
      setSelectedText('');
      setAnnotationText('');
      setShowAnnotationForm(false);
    }
  };

  const handleUpdateAnnotation = (id: string) => {
    updateHighlight(id, annotationText);
    setEditingId(null);
    setAnnotationText('');
  };

  const startEditing = (highlight: Highlight) => {
    setEditingId(highlight.id);
    setAnnotationText(highlight.annotation);
  };

  return (
    <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
      {/* Highlights List */}
      <div style={{ flex: 1, minWidth: '200px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          ✨ Highlights ({highlights.length})
        </h3>

        {highlights.length === 0 ? (
          <div style={{
            backgroundColor: 'var(--surface)',
            padding: '1rem',
            borderRadius: '6px',
            border: '1px dashed var(--border-color)',
            textAlign: 'center',
            color: 'var(--text-secondary)',
            fontSize: '0.9rem',
          }}>
            <p style={{ margin: '0' }}>
              Select text in the lesson to highlight important passages
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {highlights.map((highlight) => (
              <div
                key={highlight.id}
                style={{
                  backgroundColor: highlightColors.find(c => c.name === highlight.color)?.hex,
                  padding: '0.75rem',
                  borderRadius: '6px',
                  border: '1px solid var(--border-color)',
                }}
              >
                <p style={{
                  margin: '0 0 0.5rem 0',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  fontStyle: 'italic',
                }}>
                  "{highlight.text.substring(0, 60)}
                  {highlight.text.length > 60 ? '...' : ''}"
                </p>

                {editingId === highlight.id ? (
                  <div style={{ marginTop: '0.5rem' }}>
                    <textarea
                      value={annotationText}
                      onChange={(e) => setAnnotationText(e.target.value)}
                      placeholder="Add or edit your annotation..."
                      style={{
                        width: '100%',
                        padding: '0.5rem',
                        fontSize: '0.8rem',
                        borderRadius: '4px',
                        border: '1px solid var(--border-color)',
                        backgroundColor: 'var(--background)',
                        color: 'var(--text-primary)',
                        fontFamily: 'inherit',
                      }}
                      rows={3}
                    />
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                      <button
                        onClick={() => handleUpdateAnnotation(highlight.id)}
                        style={{
                          flex: 1,
                          padding: '0.4rem',
                          backgroundColor: 'var(--primary-color)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '0.8rem',
                          fontWeight: 'bold',
                        }}
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        style={{
                          flex: 1,
                          padding: '0.4rem',
                          backgroundColor: 'var(--border-color)',
                          color: 'var(--text-primary)',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '0.8rem',
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {highlight.annotation && (
                      <p style={{
                        margin: '0.5rem 0 0 0',
                        fontSize: '0.8rem',
                        color: 'var(--text-secondary)',
                        fontStyle: 'italic',
                      }}>
                        💬 {highlight.annotation}
                      </p>
                    )}
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                      <button
                        onClick={() => startEditing(highlight)}
                        style={{
                          flex: 1,
                          padding: '0.4rem',
                          backgroundColor: 'var(--text-secondary)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '0.7rem',
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteHighlight(highlight.id)}
                        style={{
                          flex: 1,
                          padding: '0.4rem',
                          backgroundColor: '#ef4444',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '0.7rem',
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Annotation Form (shown when text is selected) */}
      {showAnnotationForm && selectedText && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'var(--surface)',
          border: '2px solid var(--secondary-color)',
          borderRadius: '8px',
          padding: '1.5rem',
          boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
          zIndex: 1000,
          maxWidth: '400px',
          width: '90%',
        }}>
          <h3 style={{ margin: '0 0 1rem 0', color: 'var(--primary-color)' }}>
            Add Annotation
          </h3>

          <div style={{ marginBottom: '1rem' }}>
            <p style={{
              backgroundColor: 'var(--background)',
              padding: '0.75rem',
              borderRadius: '6px',
              fontStyle: 'italic',
              color: 'var(--text-secondary)',
              margin: '0 0 0.75rem 0',
              fontSize: '0.9rem',
            }}>
              "{selectedText}"
            </p>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>
              Color:
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {highlightColors.map(color => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  style={{
                    backgroundColor: color.hex,
                    border: selectedColor === color.name ? '3px solid black' : '1px solid var(--border-color)',
                    borderRadius: '6px',
                    padding: '0.5rem 1rem',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '0.8rem',
                  }}
                >
                  {color.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>
              Annotation (optional):
            </label>
            <textarea
              value={annotationText}
              onChange={(e) => setAnnotationText(e.target.value)}
              placeholder="Why is this passage important to you?"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '6px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--background)',
                color: 'var(--text-primary)',
                fontFamily: 'inherit',
                fontSize: '0.9rem',
                boxSizing: 'border-box',
              }}
              rows={4}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={handleAddHighlight}
              style={{
                flex: 1,
                padding: '0.75rem',
                backgroundColor: 'var(--primary-color)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              Save Highlight
            </button>
            <button
              onClick={() => {
                setShowAnnotationForm(false);
                setSelectedText('');
                setAnnotationText('');
              }}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: 'var(--border-color)',
                color: 'var(--text-primary)',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Instruction for text selection */}
      {!showAnnotationForm && highlights.length === 0 && (
        <div
          onMouseUp={handleTextSelection}
          style={{
            padding: '1rem',
            backgroundColor: 'var(--surface)',
            borderRadius: '6px',
            border: '2px dashed var(--secondary-color)',
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
            cursor: 'text',
            textAlign: 'center',
          }}
        >
          <p style={{ margin: '0' }}>Select text in the lesson content and release to highlight</p>
        </div>
      )}
    </div>
  );
};
