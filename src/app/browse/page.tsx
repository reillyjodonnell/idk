import { Metadata } from 'next';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/card';
import { db } from '../../../prisma/prisma';
import Search from './search';
import Link from 'next/link';
import { extractTextFromHTML } from '@/lib/utils';
import { Suspense } from 'react';

export default async function DashboardPage({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) {
  const search = searchParams?.search ?? '';
  const page = Number(searchParams?.page ?? 1);
  const limit = 20;
  const offset = (page - 1) * limit;

  const posts =
    search !== ''
      ? await db.post.findMany({
          where: {
            OR: [
              { title: { contains: search, mode: 'insensitive' } },
              { body: { contains: search, mode: 'insensitive' } },
            ],
          },
          take: limit,
        })
      : [];

  const totalPosts = Math.ceil(posts.length / limit);
  const hasNextPage = page < totalPosts;
  const hasPreviousPage = page > 1;

  const recents = await db.post.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
  });

  const popular = await db.post.findMany({
    orderBy: { thumbsUp: 'desc' },
    take: 5,
  });

  return (
    <>
      <div className=" flex-col md:flex w-full">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <div className="ml-auto flex items-center space-x-4"></div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6 w-full">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Browse</h2>
          </div>

          <div className="flex flex-col justify-center items-center relative">
            <h1 className="my-4">{`Find what you're looking for`}</h1>
            <Suspense fallback={<span>Loading...</span>}>
              <Search />
            </Suspense>
            {search !== '' ? (
              <div className="absolute max-h-80 h-fit w-full lg:w-[450px] z-20 overflow-y-scroll top-[100%] flex flex-col bg-background border p-4">
                {posts.length > 0 ? (
                  posts.map((post) => {
                    const body = extractTextFromHTML(post.body);
                    return (
                      <Link key={post.id} href={`/questions/${post.id}`}>
                        <div className="my-1 p-2 hover:bg-secondary rounded-md">
                          <div>
                            <span className="font-semibold text-base">
                              {post.title}
                            </span>
                          </div>
                          <span className="text-md text-overflow-ellipsis overflow-hidden">
                            {body}
                          </span>
                        </div>
                      </Link>
                    );
                  })
                ) : (
                  <span>No results</span>
                )}
              </div>
            ) : null}
          </div>
          <div className="mt-6 grid items-start justify-center gap-6 rounded-lg md:p-8 md:grid lg:grid-cols-2 ">
            <Card>
              <CardHeader>
                <CardTitle>Most Recent</CardTitle>
                <CardDescription>{`These just posted`}</CardDescription>
              </CardHeader>
              <CardContent className="grid ">
                {recents.map((post) => {
                  const formattedBody = extractTextFromHTML(post.body);

                  return (
                    <Link
                      key={post.id}
                      className="hover:bg-secondary rounded-md p-2"
                      href={`questions/${post.id}`}
                    >
                      <div className="flex flex-col justify-start items-start ">
                        <span>{post.title}</span>

                        <span className="text-sm leading-snug text-muted-foreground line-clamp-2 overflow-hidden">
                          {formattedBody}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Popular Posts</CardTitle>
                <CardDescription>{`What's trending?`}</CardDescription>
              </CardHeader>
              <CardContent className="grid ">
                {popular.map((post) => {
                  const formattedBody = extractTextFromHTML(post.body);
                  return (
                    <Link
                      key={post.id}
                      className="hover:bg-secondary rounded-md p-2"
                      href={`questions/${post.id}`}
                    >
                      <div className="flex flex-col justify-start items-start ">
                        <div className="flex justify-start items-center">
                          <span>{post.title}</span>
                        </div>
                        <span className="text-sm leading-snug text-muted-foreground line-clamp-2 overflow-hidden">
                          {formattedBody}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
