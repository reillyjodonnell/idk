import ClientTab from './client';
import Recent from './recent';
import Popular from './popular';
import { capitalizeFirstLetter } from '@/lib/utils';
import { removeSpacesFromSlug } from '@/lib/server-utils';

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const formatted = removeSpacesFromSlug(slug);
  return (
    <div className="w-full flex flex-col justify-start items-center p-8 ">
      <span className="p-4 font-bold text-2xl">
        {capitalizeFirstLetter(formatted)}
      </span>
      <ClientTab
        /* @ts-expect-error Server Component */
        recent={<Recent slug={formatted} />}
        /* @ts-expect-error Server Component */
        popular={<Popular slug={formatted} />}
      />
    </div>
  );
}
