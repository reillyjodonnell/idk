import { AvatarImage } from '@/components/avatar';
import { Avatar } from '@/components/avatar';
import { Button } from '@/components/button';
import { AvatarFallback } from '@radix-ui/react-avatar';
import { Tags } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Question {
  id: number;
  title: string;
  timePosted: string;
  numComments: number;
  voteScore: number;
  tags: string[];
}

const questions: Question[] = [
  {
    id: 0,
    title: 'How do I use the Playground?',
    timePosted: '2 hours ago',
    numComments: 3,
    voteScore: 5,
    tags: ['playground'],
  },
  {
    id: 1,
    title:
      'How does this support a really long title where it seems to just go on and on forever? What will it do to support handling this?',
    timePosted: '2 hours ago',
    numComments: 3,
    voteScore: 5,
    tags: [
      'playground',
      'test',
      'react',
      'css',
      'html',
      'javascript',
      'typescript',
    ],
  },
  {
    id: 2,
    title: 'How do I use Server Components?',
    timePosted: '4 hours ago',
    numComments: 1,
    voteScore: 5,
    tags: ['react', 'server components'],
  },

  // Add sample questions here
];

export default function RecentlyAsked() {
  const id = 1;
  return (
    <div className="w-full flex flex-col justify-center items-center p-8 ">
      <h2 className="text-xl font-semibold mb-4">Recently Asked Questions</h2>
      <ul className="">
        {questions.map((question) => (
          <li
            key={question.id}
            className="w-full border-b border p-6 my-2 grid grid-cols-8 gap-4"
          >
            <div className="col-span-5">
              <Link href={`/questions/${id}`}>
                <h4 className=" font-medium hover:underline">
                  {question.title}
                </h4>
              </Link>

              <div className="flex items-center space-x-4 mt-2">
                <span className="text-gray-600">{question.timePosted}</span>
              </div>
            </div>
            <div className="col-span-3 w-fit flex justify-end items-center">
              <Tags className="h-4 w-4 flex-shrink-0 mr-2" />
              <div className="flex flex-wrap justify-end">
                {question.tags.map((tag) => (
                  <Link key={tag} href={`/questions/categories/${tag}`}>
                    <Button
                      className="whitespace-nowrap mx-1 mb-1"
                      variant="outline"
                    >
                      {tag}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
