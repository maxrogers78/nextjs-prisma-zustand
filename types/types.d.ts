declare interface Task {
  id?: string;
  title: string;
  description?: string;
  priority: string;
  status: string;
}

// Store
declare interface TaskStore {
  tasks: Task[];
  isFetching: boolean;
  isLoading: boolean;
  getTasks: () => void;
  getSingleTask: (id: string) => Promise<Task>;
  createTask: (task: Task) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  completeTask: (id: string) => Promise<void>;
  markAsPending: (id: string) => Promise<void>;
  editTask: (task: Task) => Promise<void>;
}

// Props
declare interface TaskCardProps extends Task {}

declare interface TaskFormProps {
  task?: Task | null;
}
