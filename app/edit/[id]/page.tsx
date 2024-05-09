'use client';
import Loader from '@/components/loader';
import { TaskForm } from '@/components/task-form';
import { useTaskStore } from '@/store/taskStore';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function EditTaskPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { isFetching, getSingleTask } = useTaskStore();
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    if (!id) return;

    const getData = async () => {
      const fetchedTask = await getSingleTask(parseInt(id));

      if (!fetchedTask) {
        toast.error('Task not found');
        return router.push('/');
      }

      setTask(fetchedTask);
    };

    getData();
  }, [id, getSingleTask, router]);

  return (
    <div className='grid place-items-center'>
      {!isFetching ? <TaskForm task={task} /> : <Loader />}
    </div>
  );
}
