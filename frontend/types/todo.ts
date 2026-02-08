export interface TodoTask {
  id: number;
  title: string;
  description?: string;
  due_date: string;
  is_completed: boolean;
  reminder_sent: boolean;
}
