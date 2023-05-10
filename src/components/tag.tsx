import Link from 'next/link';
import { Button } from './button';

export default function Tag({ name }: { name: string }) {
  return (
    <Link href={`/questions/categories/${name}`}>
      <Button
        className="whitespace-nowrap mx-1 mb-1"
        variant="outline"
        size="sm"
      >
        {name}
      </Button>
    </Link>
  );
}
