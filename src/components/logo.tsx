import Link from 'next/link';

export default function Logo() {
  return (
    <Link href={'/'} className="flex justify-center items-center mr-6">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="mx-1"
      >
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
      <span className="font-bold text-lg  dark:text-white">idk</span>
    </Link>
  );
}
