import { toast } from 'sonner';
import { create } from 'zustand';

const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  isFetching: true,
  isLoading: false,
  getTasks: async () => {
    set({ isFetching: true });
    const response = await fetch('/api/tasks', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const { tasks } = await response.json();
    set({ tasks, isFetching: false });
  },
  getSingleTask: async (id: string) => {
    set({ isFetching: true });
    const response = await fetch(`/api/tasks/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const { task } = await response.json();
    set({ isFetching: false });
    return task;
  },
  createTask: async (task: Task) => {
    set({ isLoading: true });
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    const { newTask } = await response.json();
    set((state) => ({
      tasks: [...state.tasks, newTask],
      isLoading: false,
    }));
    toast.success('Task created successfully');
  },
  deleteTask: async (id: string) => {
    set({ isLoading: true });
    const response = await fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    const { deletedTask } = await response.json();
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== deletedTask.id),
      isLoading: false,
    }));
    toast.success('Task deleted successfully');
  },
  completeTask: async (id: string) => {
    set({ isLoading: true });
    const response = await fetch(`/api/tasks/${id}/complete`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    });
    const { updatedTask } = await response.json();
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task,
      ),
      isLoading: false,
    }));
    toast.success('Task completed successfully');
  },
  markAsPending: async (id: string) => {
    set({ isLoading: true });
    const response = await fetch(`/api/tasks/${id}/pending`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    });
    const { updatedTask } = await response.json();
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task,
      ),
      isLoading: false,
    }));
    toast.success('Task marked as pending successfully');
  },
  editTask: async (task: Task) => {
    set({ isLoading: true });
    const response = await fetch(`/api/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    const { updatedTask } = await response.json();
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task,
      ),
      isLoading: false,
    }));
    toast.success('Task edited successfully');
  },
}));

export { useTaskStore };
