import Link from 'next/link';
import { ModeToggle } from './theme-toggle-button';
import { Button } from './ui/button';

export default function Navbar() {
  return (
    <header className='w-full border-b py-5'>
      <nav className='container flex items-center justify-between'>
        <Link href='/'>
          <h1>Next Prisma CRUD</h1>
        </Link>

        <div className='flex items-center justify-end gap-2'>
          <Button asChild variant='link'>
            <Link href='/new'>Create task</Link>
          </Button>

          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
