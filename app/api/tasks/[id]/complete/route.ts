import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const PUT = async (
  req: Request,
  context: { params: { id: string } },
) => {
  try {
    const { id } = context.params;
    const updatedTask = await prisma.task.update({
      where: {
        id: parseInt(id),
      },
      data: {
        status: 'completed',
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
