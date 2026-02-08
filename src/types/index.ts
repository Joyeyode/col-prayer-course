// Course content data - 10 weeks of intercessory prayer course
export interface CourseWeek {
  weekNumber: number;
  title: string;
  description: string;
  lessons: Lesson[];
  focusArea: string;
}

export interface Lesson {
  id: string;
  dayNumber: number;
  title: string;
  content: string;
  scriptureReference?: string;
  prayerFocus?: string;
  nextSteps?: string[];
}

export interface UserProgress {
  userId: string;
  weekNumber: number;
  completedLessons: string[]; // lesson IDs
  marks: Mark[];
}

export interface Mark {
  lessonId: string;
  marked: boolean;
  markedAt: Date;
}

export interface JournalEntry {
  id: string;
  userId: string;
  date: Date;
  weekNumber: number;
  lessonId: string;
  content: string;
  prayerRequest?: string;
  breakthrough?: string;
}

export interface UserNotes {
  id: string;
  userId: string;
  lessonId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Highlight {
  id: string;
  lessonId: string;
  text: string;
  color: string;
  annotation: string;
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  joinDate: Date;
  lastActive: Date;
}
