'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/alert';
import { Button } from '@/components/button';
import { Icons } from '@/components/icons';
import { Input } from '@/components/input';
import { AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Comment({
  postId,
  authorId,
}: {
  postId: number;
  authorId: string | null;
}) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  async function createComment(e: any) {
    if (!authorId) {
      //redirect to login
      router.push('/login');
    }

    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/questions/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          authorId,
          comment: text,
        }),
      });

      if (!res.ok) throw new Error('🙃 Something went wrong.');

      if (res.ok) {
        setText('');
        setLoading(false);
        // reload the page
        router.refresh();
      }
    } catch (err) {
      setLoading(false);
      setError('🙃 Something went wrong.');
    }
  }

  return (
    <>
      {error ? (
        <Alert className="w- mb-8" variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription className="text-lg">{error}</AlertDescription>
        </Alert>
      ) : null}
      <div className="flex w-full my-12 items-center space-x-2">
        <Input
          value={text}
          onChange={(e) => {
            setError('');
            setText(e.target.value);
          }}
          type="text"
          className="py-6 text-base"
          placeholder="Write a response..."
        />
        <Button
          onClick={createComment}
          disabled={error !== '' || loading}
          className="px-8 py-6"
          type="submit"
        >
          {loading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            'Comment'
          )}
        </Button>
      </div>
    </>
  );
}
