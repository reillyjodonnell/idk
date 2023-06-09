import { Button } from '@/components/button';
import { Tags } from 'lucide-react';
import Link from 'next/link';
import { db } from '../../prisma/prisma';
import UserAvatar from '@/components/user-avatar';
import { formatTime } from '@/lib/utils';
import { extractTextFromHTML } from '@/lib/utils';

export default async function RecentlyAsked() {
  const questions = await db.post.findMany({
    take: 12,
    orderBy: { createdAt: 'desc' },
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
  const showMoreTags = true;
  if (!questions || questions.length === 0) return null;
  return (
    <div className="w-full flex flex-col justify-center items-center p-8 ">
      <h2 className="text-xl font-semibold mb-4">Recently Asked Questions</h2>
      <ul className="columns-1 md:columns-2 xl:columns-3 gap-x-6 gap-y-6 h-full">
        {questions.map((question) => {
          const formattedBody = extractTextFromHTML(question.body);
          return (
            <li
              key={question.id}
              className="border p-4 flex flex-col w-full mb-6 break-inside-avoid-column"
            >
              <div className="flex items-center justify-start">
                <div className="shrink-0 self-start">
                  <UserAvatar
                    alt="profile"
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
                  {formattedBody}
                </span>
              </div>
              <div className="flex items-center space-x-4 mt-auto py-4">
                <span className="text-gray-600">
                  {formatTime(question.updatedAt.toISOString()) ??
                    formatTime(question.createdAt.toISOString())}
                </span>
              </div>
              {question.tags.length > 0 ? (
                <div className="col-span-3 w-fit flex justify-end items-center ">
                  <Tags className="h-4 w-4 flex-shrink-0 mr-2" />
                  <div
                    className="flex flex-wrap justify-end items-center "
                    style={{
                      justifyContent: showMoreTags ? 'flex-start' : 'end',
                    }}
                  >
                    {question.tags.slice(0, 3).map(({ name, id }) => (
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
                    {showMoreTags && question.tags.length - 3 > 0 ? (
                      <Button
                        className="whitespace-nowrap mx-1 mb-1"
                        variant="outline"
                        size="sm"
                      >
                        +{question.tags.length - 3} more
                      </Button>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
