import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const GET = async (
  req: Request,
  context: { params: { id: string } },
) => {
  try {
    const { id } = context.params;

    if (!id)
      return NextResponse.json(
        { message: 'Task ID is required' },
        { status: 400 },
      );

    const task = await prisma.task.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!task)
      return NextResponse.json({ message: 'Task not found' }, { status: 404 });

    return NextResponse.json({ task });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error });
  } finally {
    prisma.$disconnect();
  }
};

export const DELETE = async (
  req: Request,
  context: { params: { id: string } },
) => {
  try {
    const { id } = context.params;

    if (!id)
      return NextResponse.json(
        { message: 'Task ID is required' },
        { status: 400 },
      );

    const deletedTask = await prisma.task.delete({
      where: {
        id: parseInt(id),
      },
    });

    if (!deletedTask)
      return NextResponse.json(
        { message: 'Task was not deleted' },
        { status: 500 },
      );

    return NextResponse.json({ deletedTask });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error });
  } finally {
    prisma.$disconnect();
  }
};

export const PUT = async (req: Request) => {
  try {
    const { id, title, description, priority } = await req.json();

    if (!id || !title || !priority)
      return NextResponse.json(
        { message: 'Task ID, title and priority are required' },
        { status: 400 },
      );

    console.log(id, title, description, priority);

    const updatedTask = await prisma.task.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title,
        description,
        priority,
      },
    });

    if (!updatedTask)
      return NextResponse.json({ message: 'Task not found' }, { status: 404 });

    return NextResponse.json({ updatedTask });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error });
  } finally {
    prisma.$disconnect();
  }
};
