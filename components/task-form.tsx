'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from './ui/textarea';
import { z } from 'zod';
import { newTaskFormSchema } from '@/schemas/new-task';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { useRouter } from 'next/navigation';
import { useTaskStore } from '@/store/taskStore';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

const NEW_TASK_INITIAL_VALUES: z.infer<typeof newTaskFormSchema> = {
  title: '',
  description: '',
  priority: 'low',
  status: 'open',
};

export function TaskForm({ task }: TaskFormProps) {
  const router = useRouter();
  const { isLoading, createTask, editTask } = useTaskStore();

  const form = useForm<z.infer<typeof newTaskFormSchema>>({
    resolver: zodResolver(newTaskFormSchema),
    defaultValues: NEW_TASK_INITIAL_VALUES,
  });

  useEffect(() => {
    if (!task) return;

    form.reset({
      title: task.title,
      description: task.description || '',
      priority: task.priority,
      status: task.status,
    });
  }, [task, form]);

  const onSubmit = async (values: z.infer<typeof newTaskFormSchema>) => {
    if (task) {
      await editTask({ ...values, id: task.id });
    } else {
      await createTask(values);
    }

    router.push('/');
  };

  const resetValues = () => {
    form.reset(NEW_TASK_INITIAL_VALUES);
  };

  return (
    <Card
      className={cn('w-[350px]', {
        'pointer-events-none opacity-70': isLoading,
      })}
    >
      <CardHeader>
        <CardTitle>{task ? 'Edit task' : 'Create task'}</CardTitle>
        <CardDescription>
          {task ? "Just... don't cheat, okay?" : 'Add a new task in one-click.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='grid w-full items-center gap-4'>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder='Title of your task' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Description of your task'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='priority'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger id='framework'>
                          <SelectValue placeholder='Select' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent position='popper'>
                        <SelectItem value='low'>Low</SelectItem>
                        <SelectItem value='medium'>Medium</SelectItem>
                        <SelectItem value='high'>High</SelectItem>
                        <SelectItem value='urgent'>Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='mt-8 flex justify-between'>
              <Button type='button' variant='outline' onClick={resetValues}>
                Reset
              </Button>
              <Button>{task ? 'Edit' : 'Add'}</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
