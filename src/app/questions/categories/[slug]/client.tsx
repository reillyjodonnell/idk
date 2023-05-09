'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/tabs';
export default function ClientTab({
  recent,
  popular,
}: {
  recent: JSX.Element;
  popular: JSX.Element;
}) {
  return (
    <>
      <Tabs defaultValue="recent">
        <TabsList>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
        </TabsList>
        <TabsContent value="recent">{recent}</TabsContent>
        <TabsContent value="popular">{popular}</TabsContent>
      </Tabs>
    </>
  );
}
