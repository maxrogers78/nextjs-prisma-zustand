import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const GET = async () => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: {
        id: 'desc',
      },
    });

    if (!tasks)
      return NextResponse.json({ message: 'Tasks not found' }, { status: 404 });

    return NextResponse.json({ tasks });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error });
  } finally {
    prisma.$disconnect();
  }
};

export const POST = async (req: Request) => {
  try {
    const { title, description, priority } = await req.json();

    if (!title || !priority)
      return NextResponse.json(
        { message: 'Title and priority are required' },
        { status: 400 },
      );

    const newTask = await prisma.task.create({
      data: {
        title,
        description: description.length > 0 ? description : null,
        priority,
        status: 'open',
      },
    });

    if (!newTask)
      return NextResponse.json(
        { message: 'Task was not created' },
        { status: 500 },
      );

    return NextResponse.json({ newTask });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error });
  } finally {
    prisma.$disconnect();
  }
};
