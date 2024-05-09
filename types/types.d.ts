declare interface Task {
  id?: number;
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
  getSingleTask: (id: number) => Promise<Task>;
  createTask: (task: Task) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  completeTask: (id: number) => Promise<void>;
  markAsPending: (id: number) => Promise<void>;
  editTask: (task: Task) => Promise<void>;
}

// Props
declare interface TaskCardProps extends Task {}

declare interface TaskFormProps {
  task?: Task | null;
}
