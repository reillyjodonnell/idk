import ClientTab from './client';
import Recent from './recent';
import Popular from './popular';
import { capitalizeFirstLetter } from '@/lib/utils';

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  return (
    <div className="w-full flex flex-col justify-start items-center p-8 ">
      <span className="p-4 font-bold text-2xl">
        {capitalizeFirstLetter(slug)}
      </span>
      <ClientTab
        recent={<Recent slug={params.slug} />}
        popular={<Popular slug={params.slug} />}
      />
    </div>
  );
}
