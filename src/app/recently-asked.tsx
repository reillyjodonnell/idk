import { AvatarImage } from '@/components/avatar';
import { Avatar } from '@/components/avatar';
import { Button } from '@/components/button';
import { AvatarFallback } from '@radix-ui/react-avatar';
import { Tags } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

interface Question {
  id: number;
  title: string;
  description: string;
  timePosted: string;
  numComments: number;
  voteScore: number;
  tags: string[];
  avatar: string;
}

const questions: Question[] = [
  {
    id: 0,
    title: 'How do I use the Playground?',
    description:
      "I went to the playground but I don't know what to do. Can someone help me? ",
    timePosted: '2 hours ago',
    numComments: 3,
    voteScore: 5,
    tags: ['playground'],
    avatar:
      'https://images.pexels.com/photos/5380635/pexels-photo-5380635.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 1,
    title:
      'How does this support a really long title where it seems to just go on and on forever? What will it do to support handling this?',
    description:
      'This is a really long description that will go on and on forever. I wonder what will happen to it? Heres a bunch of words. It just seems to keep going. And going. It will never stop. I dont know how much longer I can keep going for.',
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
    avatar:
      'https://images.pexels.com/photos/4904563/pexels-photo-4904563.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 2,
    title: 'How do I use Server Components?',
    description:
      'I want to use server components but I do not know how to. Can someone help me?',
    timePosted: '4 hours ago',
    numComments: 1,
    voteScore: 5,
    tags: ['react', 'server components'],
    avatar:
      'https://images.pexels.com/photos/4904408/pexels-photo-4904408.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 4,
    title: 'How do I use the Playground?',
    description:
      "I went to the playground but I don't know what to do. Can someone help me? ",
    timePosted: '2 hours ago',
    numComments: 3,
    voteScore: 5,
    tags: ['playground'],
    avatar:
      'https://images.pexels.com/photos/5380635/pexels-photo-5380635.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },

  {
    id: 6,
    title: 'How do I use Server Components?',
    description:
      'I want to use server components but I do not know how to. Can someone help me?',
    timePosted: '4 hours ago',
    numComments: 1,
    voteScore: 5,
    tags: ['react', 'server components'],
    avatar:
      'https://images.pexels.com/photos/4904408/pexels-photo-4904408.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 5,
    title:
      'How does this support a really long title where it seems to just go on and on forever? What will it do to support handling this?',
    description:
      'This is a really long description that will go on and on forever. I wonder what will happen to it? Heres a bunch of words. It just seems to keep going. And going. It will never stop. I dont know how much longer I can keep going for.',
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
    avatar:
      'https://images.pexels.com/photos/4904563/pexels-photo-4904563.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },

  // Add sample questions here
];

export default function RecentlyAsked() {
  const showMoreTags = true;
  function toggleShowAllTags() {}
  const id = 1;
  return (
    <div className="w-full flex flex-col justify-center items-center p-8 ">
      <h2 className="text-xl font-semibold mb-4">Recently Asked Questions</h2>
      <ul className="columns-1 md:columns-2 xl:columns-3 gap-x-6 gap-y-6 h-full">
        {questions.map((question) => (
          <li
            key={question.id}
            className="border p-4 flex flex-col w-full mb-6 break-inside-avoid-column"
          >
            <div className="flex items-start justify-start">
              <div className="mr-2  shrink-0 self-start">
                <Image
                  alt="profile"
                  src={question.avatar}
                  width={40}
                  height={40}
                  className=" w-10 h-10 rounded-full bg-green-500 object-cover "
                />
              </div>
              <Link href={`/questions/${id}`}>
                <h4 className=" font-medium hover:underline">
                  {question.title}
                </h4>
              </Link>
            </div>
            <div className="py-2">
              <span className="text-sm text-gray-600 line-clamp-4">
                {question.description}
              </span>
            </div>
            <div className="flex items-center space-x-4 mt-auto py-4">
              <span className="text-gray-600">{question.timePosted}</span>
            </div>
            <div className="col-span-3 w-fit flex justify-end items-center ">
              <Tags className="h-4 w-4 flex-shrink-0 mr-2" />
              <div
                className="flex flex-wrap justify-end items-center "
                style={{ justifyContent: showMoreTags ? 'flex-start' : 'end' }}
              >
                {question.tags.slice(0, 2).map((tag) => (
                  <Link key={tag} href={`/questions/categories/${tag}`}>
                    <Button
                      className="whitespace-nowrap mx-1 mb-1"
                      variant="outline"
                      size="sm"
                    >
                      {tag}
                    </Button>
                  </Link>
                ))}
                {showMoreTags && question.tags.length - 3 > 0 ? (
                  <Button
                    className="whitespace-nowrap mx-1 mb-1"
                    variant="outline"
                    size="sm"
                    // onClick={toggleShowAllTags}
                  >
                    +{question.tags.length - 3} more
                  </Button>
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
