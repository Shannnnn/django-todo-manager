"use client";

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import api from "@/lib/axios";
import { TodoTask } from "@/types/todo";
import { TaskCard } from "@/components/TaskCard";
import { LayoutDashboard, Plus, X } from "lucide-react";

export default function Dashboard() {
  const [tasks, setTasks] = useState<TodoTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const router = useRouter();

  const fetchTasks = async () => {
    console.log("🧐 Dashboard is attempting to fetch tasks...");
    try {
      const res = await api.get("/tasks/");
      console.log("🎉 Tasks fetched successfully!");
      setTasks(res.data);
    } catch (err: any) {
      console.error("❌ Fetch failed with status:", err.response?.status);
      // REMOVE OR COMMENT OUT THIS LINE TEMPORARILY:
      // router.push('/login'); 
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle) return;
    try {
      const res = await api.post("/tasks/", { 
        title: newTaskTitle,
        due_date: new Date(Date.now() + 86400000).toISOString() 
      });
      setTasks([res.data, ...tasks]);
      setNewTaskTitle("");
      setIsAdding(false);
    } catch (err) {
      alert("Failed to create task");
    }
  };

  const handleToggle = async (id: number) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    setTasks(tasks.map(t => t.id === id ? { ...t, is_completed: !t.is_completed } : t));
    try {
      await api.patch(`/tasks/${id}/`, { is_completed: !task.is_completed });
    } catch (err) {
      fetchTasks();
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
          </div>
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-all"
          >
            {isAdding ? <X size={20} /> : <Plus size={20} />}
            {isAdding ? "Cancel" : "Add Task"}
          </button>
        </header>

        {isAdding && (
          <form onSubmit={handleAddTask} className="mb-6 p-4 bg-white rounded-xl border-2 border-blue-100 shadow-sm animate-in fade-in slide-in-from-top-2">
            <input 
              autoFocus
              type="text" 
              placeholder="What needs to be done?"
              className="w-full p-2 text-lg outline-none"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
            />
            <div className="flex justify-end mt-2">
              <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded-md text-sm">Save Task</button>
            </div>
          </form>
        )}

        {loading ? (
          <div className="text-center py-10 text-gray-400">Loading...</div>
        ) : (
          <div className="space-y-3">
            {tasks.map(task => (
              <TaskCard key={task.id} task={task} onToggle={handleToggle} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
