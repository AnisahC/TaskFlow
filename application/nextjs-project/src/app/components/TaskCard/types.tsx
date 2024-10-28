export type TaskStatus = "todo" | "inProgress" | "completed";

export interface Task {
  priority: string | string[];
  title: string;
  category: string;
  date: string;
  time?: string;
  description: string;
}
