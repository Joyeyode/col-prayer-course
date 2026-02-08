import { db } from '../firebase';
import { doc, setDoc, updateDoc, serverTimestamp, collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { User, UserProgress } from '../types';

export interface UserActivity {
  userId: string;
  activityType: 'lesson_completed' | 'journal_entry' | 'quiz_taken' | 'login' | 'app_opened';
  lessonId?: string;
  weekNumber?: number;
  timestamp: Timestamp;
  deviceInfo?: string;
}

/**
 * Create or update user profile in Firestore
 */
export const syncUserProfile = async (user: User) => {
  try {
    if (!user.id) return;

    const userRef = doc(db, 'users', user.id);
    await setDoc(
      userRef,
      {
        id: user.id,
        name: user.name,
        email: user.email,
        joinDate: user.joinDate,
        lastActive: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error('Error syncing user profile:', error);
  }
};

/**
 * Sync user progress to Firestore
 */
export const syncUserProgress = async (userId: string, progress: UserProgress) => {
  try {
    if (!userId) return;

    const progressRef = doc(db, 'users', userId, 'data', 'progress');
    await setDoc(
      progressRef,
      {
        ...progress,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error('Error syncing progress:', error);
  }
};

/**
 * Log user activity
 */
export const logActivity = async (
  userId: string,
  activityType: UserActivity['activityType'],
  details?: Partial<UserActivity>
) => {
  try {
    if (!userId) return;

    const activitiesRef = collection(db, 'users', userId, 'activities');
    const activity: UserActivity = {
      userId,
      activityType,
      timestamp: serverTimestamp() as any,
      deviceInfo: `${navigator.userAgent.substring(0, 100)}`,
      ...details,
    };

    await setDoc(doc(activitiesRef), activity);
  } catch (error) {
    console.error('Error logging activity:', error);
  }
};

/**
 * Get user statistics
 */
export const getUserStats = async (userId: string) => {
  try {
    const userRef = doc(db, 'users', userId);
    const progressRef = doc(db, 'users', userId, 'data', 'progress');

    // You can fetch and aggregate stats here
    return { userId };
  } catch (error) {
    console.error('Error getting user stats:', error);
    return null;
  }
};

/**
 * Get all users (admin - requires authentication)
 */
export const getAllUsers = async () => {
  try {
    const usersRef = collection(db, 'users');
    const snapshot = await getDocs(usersRef);
    const users: any[] = [];

    snapshot.forEach((doc) => {
      users.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

/**
 * Get recently active users
 */
export const getActiveUsers = async (hoursAgo: number = 24) => {
  try {
    const usersRef = collection(db, 'users');
    const timestampThreshold = new Date(Date.now() - hoursAgo * 60 * 60 * 1000);

    const q = query(usersRef, where('lastActive', '>', timestampThreshold));
    const snapshot = await getDocs(q);
    const activeUsers: any[] = [];

    snapshot.forEach((doc) => {
      activeUsers.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return activeUsers;
  } catch (error) {
    console.error('Error fetching active users:', error);
    return [];
  }
};

/**
 * Send notification to user (future enhancement)
 */
export const notifyUser = async (userId: string, message: string, type: 'info' | 'success' | 'warning') => {
  try {
    const notificationsRef = collection(db, 'users', userId, 'notifications');
    await setDoc(doc(notificationsRef), {
      message,
      type,
      read: false,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};
