import { UserIcon } from 'lucide-react';
import type { ImageProps } from 'next/image';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';

const sizeClasses = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
  xl: 'h-16 w-16',
};
type UserAvatarProps = ImageProps & {
  size?: keyof typeof sizeClasses;
};
export default function UserAvatar({
  size = 'md',

  ...props
}: UserAvatarProps) {
  const heightAndWidth = sizeClasses[size];
  if (
    props.src === undefined ||
    props.src === '' ||
    typeof props.src !== 'string'
  ) {
    return (
      <Avatar className={`${heightAndWidth} mr-4 border-2`}>
        <UserIcon
          className={`${heightAndWidth} stroke-primary ${
            size === 'sm' ? 'p-1' : 'p-2'
          } `}
        />
        {/* <AvatarFallback>L</AvatarFallback> */}
      </Avatar>
    );
  }

  return (
    <Avatar className={`${heightAndWidth} mr-4 border-2`}>
      <AvatarImage
        className="object-cover"
        src={props.src}
        alt="user's avatar"
      />
      {/* <AvatarFallback>L</AvatarFallback> */}
    </Avatar>
  );
}
