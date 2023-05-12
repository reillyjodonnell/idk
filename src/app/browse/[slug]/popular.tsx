import { db } from '../../../../prisma/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/button';
import { Tags } from 'lucide-react';
import {
  capitalizeFirstLetter,
  extractTextFromHTML,
  formatTime,
} from '@/lib/utils';
import UserAvatar from '@/components/user-avatar';

export default async function Popular({ slug }: { slug: string }) {
  const questions = await db.post.findMany({
    take: 12,
    where: {
      tags: {
        some: {
          name: slug,
        },
      },
    },
    orderBy: [
      {
        fire: 'desc',
      },
      {
        thumbsUp: 'desc',
      },
    ],
    select: {
      id: true,
      title: true,
      body: true,
      createdAt: true,
      updatedAt: true,
      tags: true,
      author: {
        select: {
          name: true,
          avatar: true,
          username: true,
        },
      },
    },
  });
  if (!questions || questions.length === 0) {
    return (
      <div className="w-full flex flex-col justify-center items-center p-8 ">
        <h2 className="text-xl font-semibold mb-4">No results 🙃</h2>
      </div>
    );
  }
  return (
    <>
      <h2 className="text-xl font-semibold my-6">
        Popular Questions for {capitalizeFirstLetter(slug)}
      </h2>
      <ul className="columns-1 md:columns-2 xl:columns-3 gap-x-6 gap-y-6 h-full">
        {questions.map((question) => {
          const formattedBody = extractTextFromHTML(question.body);
          return (
            <li
              key={question.id}
              className="border p-4 flex flex-col w-full mb-6 break-inside-avoid-column"
            >
              <div className="flex items-start justify-start">
                <div className="mr-2  shrink-0 self-start">
                  <UserAvatar
                    size="md"
                    alt="user's profile"
                    src={question.author.avatar ?? ''}
                    className="p-[4px]"
                  />
                </div>
                <Link href={`/questions/${question.id}`}>
                  <h4 className=" font-medium hover:underline">
                    {question.title}
                  </h4>
                </Link>
              </div>
              <div className="py-2">
                <span className="text-sm text-gray-600 line-clamp-4">
                  {question.body}
                </span>
              </div>
              <div className="flex items-center space-x-4 mt-auto py-4">
                <span className="text-gray-600">
                  {formatTime(question.updatedAt.toISOString()) ??
                    formatTime(question.createdAt.toISOString())}
                </span>
              </div>
              <div className="col-span-3 w-fit flex justify-end items-center ">
                <Tags className="h-4 w-4 flex-shrink-0 mr-2" />
                <div
                  className="flex flex-wrap justify-end items-center "
                  style={{
                    justifyContent: 'end',
                  }}
                >
                  {question.tags.slice(0, 2).map(({ name, id }) => (
                    <Link key={id} href={`/browse/${name}`}>
                      <Button
                        className="whitespace-nowrap mx-1 mb-1"
                        variant="outline"
                        size="sm"
                      >
                        {name}
                      </Button>
                    </Link>
                  ))}
                  {question.tags.length - 3 > 0 ? (
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
          );
        })}
      </ul>
    </>
  );
}
