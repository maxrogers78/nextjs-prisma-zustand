import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { useTaskStore } from '@/store/taskStore';
import Link from 'next/link';

export default function TaskCard({
  id,
  title,
  description,
  priority,
  status,
}: TaskCardProps) {
  const { isLoading, completeTask, markAsPending, deleteTask } = useTaskStore();

  return (
    <Card
      className={cn({
        'pointer-events-none opacity-70': isLoading,
      })}
    >
      <CardHeader>
        <CardTitle className='flex items-start justify-between gap-2'>
          {title}
          <span
            className={cn('text-lg font-bold uppercase leading-6', {
              'text-green-500': priority === 'low',
              'text-yellow-500': priority === 'medium',
              'text-red-500': priority === 'high',
              'text-purple-500': priority === 'urgent',
            })}
          >
            {priority}
          </span>
        </CardTitle>
      </CardHeader>
      {description && (
        <CardContent>
          <CardDescription>{description}</CardDescription>
        </CardContent>
      )}
      <CardFooter className='mt-auto flex justify-between gap-2'>
        {status === 'open' ? (
          <Button variant='default' onClick={() => completeTask(id!)}>
            Complete
          </Button>
        ) : (
          <Button variant='default' onClick={() => markAsPending(id!)}>
            Mark as pending
          </Button>
        )}

        <div className='ml-auto flex gap-2'>
          {status === 'open' && (
            <Button variant='ghost' asChild>
              <Link href={`/edit/${id!}`}>Edit</Link>
            </Button>
          )}
          <Button variant='destructive' onClick={() => deleteTask(id!)}>
            {status === 'open' ? 'Delete' : 'Remove'}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
