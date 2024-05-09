'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTaskStore } from '@/store/taskStore';
import Loader from '@/components/loader';
import TaskCard from '@/components/task-card';

export default function HomePage() {
  const { tasks, isFetching, getTasks } = useTaskStore();
  const [pendingTasks, setPendingTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  useEffect(() => {
    setPendingTasks(tasks.filter((task) => task.status === 'open'));
    setCompletedTasks(tasks.filter((task) => task.status === 'completed'));
  }, [tasks]);

  return (
    <section className='relative grid grid-cols-1 gap-24 lg:grid-cols-2 lg:gap-8'>
      {!isFetching ? (
        <>
          <div>
            <h1 className='mb-12 text-center text-3xl font-semibold underline'>
              Pending tasks
            </h1>

            {pendingTasks.length > 0 ? (
              <div className='flex flex-col gap-6'>
                {pendingTasks.map((task) => (
                  <TaskCard key={task.id} {...task} />
                ))}
              </div>
            ) : (
              <p className='max-lg:text-center'>
                There are not pending tasks, click{' '}
                <Link
                  href='/new'
                  className='font-semibold text-sky-500 underline'
                >
                  here
                </Link>{' '}
                to create a new one
              </p>
            )}
          </div>

          <div>
            <h1 className='mb-12 text-center text-3xl font-semibold underline'>
              Completed tasks
            </h1>

            {completedTasks.length > 0 ? (
              <div className='flex flex-col gap-6'>
                {completedTasks.map((task) => (
                  <TaskCard key={task.id} {...task} />
                ))}
              </div>
            ) : (
              <p className='max-lg:text-center'>
                No task has been completed yet, try to complete one by clicking{' '}
                <strong>Complete</strong> on one of your pending tasks
              </p>
            )}
          </div>
        </>
      ) : (
        <div className='absolute left-1/2 top-0 -translate-x-1/2'>
          <Loader />
        </div>
      )}
    </section>
  );
}
