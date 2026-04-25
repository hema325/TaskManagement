
export interface Task {
  id: number;
  title: string;
  description: string;
  isDone: boolean;
  createdAt: string; // ISO string from backend (DateTime)
  userId: number;
  userName: string;
}