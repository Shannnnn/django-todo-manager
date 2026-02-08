import { TodoTask } from "@/types/todo";
import { CheckCircle, Circle, Clock } from "lucide-react";

interface Props {
  task: TodoTask;
  onToggle: (id: number) => void;
}

export function TaskCard({ task, onToggle }: Props) {
  return (
    <div className={`flex items-center justify-between p-4 mb-3 rounded-lg border bg-white transition-all ${task.is_completed ? 'opacity-60' : 'hover:shadow-md'}`}>
      <div className="flex items-center gap-4">
        <button onClick={() => onToggle(task.id)} className="text-blue-500 hover:scale-110 transition-transform">
          {task.is_completed ? <CheckCircle size={24} /> : <Circle size={24} />}
        </button>
        <div>
          <h3 className={`font-semibold ${task.is_completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
            {task.title}
          </h3>
          <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
            <Clock size={12} />
            <span>{new Date(task.due_date).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      {task.reminder_sent && (
        <span className="text-[10px] bg-red-100 text-red-600 px-2 py-1 rounded-full font-bold uppercase">
          Overdue Notified
        </span>
      )}
    </div>
  );
}
