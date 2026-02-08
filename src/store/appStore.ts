import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProgress, JournalEntry, UserNotes, User } from '../types';
import { Language } from '../data/i18n';

interface AppState {
  // Theme state
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;

  // Language & Localization
  language: Language;
  setLanguage: (language: Language) => void;

  // User state
  user: User | null;
  setUser: (user: User) => void;

  // Progress tracking
  userProgress: UserProgress | null;
  markLessonComplete: (lessonId: string, weekNumber: number) => void;
  unmarkLessonComplete: (lessonId: string, weekNumber: number) => void;
  getCurrentWeek: () => number;
  getCompletionPercentage: () => number;
  currentStreak: number;
  lastCompletedDate: Date | null;
  calculateStreak: () => void;

  // Favorites/Bookmarks
  favorites: string[];
  toggleFavorite: (lessonId: string) => void;
  isFavorited: (lessonId: string) => boolean;

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
      darkMode: false,
      setDarkMode: (darkMode: boolean) => set({ darkMode }),

      language: 'en',
      setLanguage: (language: Language) => set({ language }),

      user: null,
      setUser: (user: User) => set({ user }),

      userProgress: null,
      currentStreak: 0,
      lastCompletedDate: null,

      calculateStreak: () => {
        const state = get();
        const progress = state.userProgress;
        if (!progress || progress.completedLessons.length === 0) {
          set({ currentStreak: 0 });
          return;
        }

        // For simplicity, track consecutive last completed dates
        // In a real app, you'd check daily completion records
        const today = new Date();
        const lastCompleted = state.lastCompletedDate ? new Date(state.lastCompletedDate) : null;
        
        if (!lastCompleted) {
          set({ currentStreak: 1 });
          return;
        }

        const daysDiff = Math.floor((today.getTime() - lastCompleted.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysDiff === 0) {
          // Same day - keep current streak
          return;
        } else if (daysDiff === 1) {
          // Consecutive day - increment streak
          set((state) => ({ currentStreak: state.currentStreak + 1 }));
        } else {
          // Streak broken - reset to 1
          set({ currentStreak: 1 });
        }
      },

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
          
          // Update last completed date and recalculate streak
          set({ lastCompletedDate: new Date() });
          get().calculateStreak();
          
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
        // 9 weeks * 7 days = 63 total lessons
        const totalLessons = 63;
        return Math.round((progress.completedLessons.length / totalLessons) * 100);
      },

      favorites: [],
      toggleFavorite: (lessonId: string) => {
        set((state) => ({
          favorites: state.favorites.includes(lessonId)
            ? state.favorites.filter(id => id !== lessonId)
            : [...state.favorites, lessonId],
        }));
      },

      isFavorited: (lessonId: string) => {
        return get().favorites.includes(lessonId);
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
      name: 'prayer-course-app-store-v4',
    }
  )
);
