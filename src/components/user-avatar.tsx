import { UserIcon } from 'lucide-react';
import type { ImageProps } from 'next/image';
import Image from 'next/image';

const sizeClasses = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
  xl: 'h-16 w-16',
};
type UserAvatarProps = ImageProps & {
  size?: keyof typeof sizeClasses;
};
export default function UserAvatar({ size = 'md', ...props }: UserAvatarProps) {
  const hClass = sizeClasses[size];
  const wClass = sizeClasses[size];
  if (props.src === undefined || props.src === '') {
    return (
      <div
        className={`rounded-full border bg-green-500 flex justify-center items-center ${hClass} ${wClass}`}
      >
        <UserIcon className=" stroke-gray-700" />
      </div>
    );
  }

  return (
    <div
      className={`rounded-full border bg-green-500 flex justify-center items-center ${hClass} ${wClass}`}
    >
      <Image {...props} />
    </div>
  );
}
