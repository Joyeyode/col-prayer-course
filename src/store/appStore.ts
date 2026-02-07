import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProgress, Mark, JournalEntry, UserNotes, User } from '../types';

interface AppState {
  // User state
  user: User | null;
  setUser: (user: User) => void;

  // Progress tracking
  userProgress: UserProgress | null;
  markLessonComplete: (lessonId: string, weekNumber: number) => void;
  unmarkLessonComplete: (lessonId: string, weekNumber: number) => void;
  getCurrentWeek: () => number;
  getCompletionPercentage: () => number;

  // Journal entries
  journalEntries: JournalEntry[];
  addJournalEntry: (entry: Omit<JournalEntry, 'id'>) => void;
  updateJournalEntry: (id: string, entry: Omit<JournalEntry, 'id'>) => void;
  deleteJournalEntry: (id: string) => void;
  getJournalEntriesForWeek: (weekNumber: number) => JournalEntry[];

  // Notes
  userNotes: UserNotes[];
  addNote: (note: Omit<UserNotes, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (id: string, content: string) => void;
  deleteNote: (id: string) => void;
  getNotesForLesson: (lessonId: string) => UserNotes[];
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user: User) => set({ user }),

      userProgress: null,
      markLessonComplete: (lessonId: string, weekNumber: number) => {
        set((state) => {
          if (!state.userProgress) {
            state.userProgress = {
              userId: state.user?.id || 'default',
              weekNumber,
              completedLessons: [lessonId],
              marks: [{ lessonId, marked: true, markedAt: new Date() }],
            };
          } else {
            if (!state.userProgress.completedLessons.includes(lessonId)) {
              state.userProgress.completedLessons.push(lessonId);
            }
            const existingMark = state.userProgress.marks.find(m => m.lessonId === lessonId);
            if (!existingMark) {
              state.userProgress.marks.push({ lessonId, marked: true, markedAt: new Date() });
            }
          }
          return { userProgress: state.userProgress };
        });
      },

      unmarkLessonComplete: (lessonId: string) => {
        set((state) => {
          if (state.userProgress) {
            state.userProgress.completedLessons = state.userProgress.completedLessons.filter(
              id => id !== lessonId
            );
            state.userProgress.marks = state.userProgress.marks.map((mark) =>
              mark.lessonId === lessonId ? { ...mark, marked: false } : mark
            );
          }
          return { userProgress: state.userProgress };
        });
      },

      getCurrentWeek: () => {
        const progress = get().userProgress;
        return progress?.weekNumber || 1;
      },

      getCompletionPercentage: () => {
        const progress = get().userProgress;
        if (!progress) return 0;
        // 10 weeks * 7 days = 70 total lessons
        const totalLessons = 70;
        return Math.round((progress.completedLessons.length / totalLessons) * 100);
      },

      journalEntries: [],
      addJournalEntry: (entry: Omit<JournalEntry, 'id'>) => {
        const newEntry: JournalEntry = {
          ...entry,
          id: `journal-${Date.now()}`,
        };
        set((state) => ({
          journalEntries: [...state.journalEntries, newEntry],
        }));
      },

      updateJournalEntry: (id: string, entry: Omit<JournalEntry, 'id'>) => {
        set((state) => ({
          journalEntries: state.journalEntries.map((e) =>
            e.id === id ? { ...entry, id } : e
          ),
        }));
      },

      deleteJournalEntry: (id: string) => {
        set((state) => ({
          journalEntries: state.journalEntries.filter((e) => e.id !== id),
        }));
      },

      getJournalEntriesForWeek: (weekNumber: number) => {
        return get().journalEntries.filter((e) => e.weekNumber === weekNumber);
      },

      userNotes: [],
      addNote: (note: Omit<UserNotes, 'id' | 'createdAt' | 'updatedAt'>) => {
        const newNote: UserNotes = {
          ...note,
          id: `note-${Date.now()}`,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        set((state) => ({
          userNotes: [...state.userNotes, newNote],
        }));
      },

      updateNote: (id: string, content: string) => {
        set((state) => ({
          userNotes: state.userNotes.map((n) =>
            n.id === id ? { ...n, content, updatedAt: new Date() } : n
          ),
        }));
      },

      deleteNote: (id: string) => {
        set((state) => ({
          userNotes: state.userNotes.filter((n) => n.id !== id),
        }));
      },

      getNotesForLesson: (lessonId: string) => {
        return get().userNotes.filter((n) => n.lessonId === lessonId);
      },
    }),
    {
      name: 'prayer-course-app-store',
    }
  )
);
