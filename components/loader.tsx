import { Loader2 } from 'lucide-react';

export default function Loader() {
  return (
    <p className='flex items-center justify-center gap-2 text-center'>
      <Loader2 className='animate-spin' />
      Loading...
    </p>
  );
}
