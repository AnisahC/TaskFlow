export type TaskStatus = "todo" | "inProgress" | "completed";

export interface Task {
  _id: string;
  title: string;
  startDate: string;
  endDate: string;
  priority: string;
  category: string;
  description: string;
}
