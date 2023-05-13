import { Bot, UserIcon } from 'lucide-react';
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
  isAi = false,
  ...props
}: UserAvatarProps) {
  const heightAndWidth = sizeClasses[size];

  if (isAi)
    return (
      <Avatar className={`${heightAndWidth} mr-4 border-2 bg-color`}>
        <Bot
          className={`${heightAndWidth} stroke-primary ${
            size === 'sm' ? 'p-1' : 'p-2'
          } ${props.className}`}
        />
      </Avatar>
    );

  if (
    props.src === undefined ||
    props.src === '' ||
    typeof props.src !== 'string'
  ) {
    return (
      <Avatar className={`${heightAndWidth} mr-4 border-2 bg-color`}>
        <UserIcon
          className={`${heightAndWidth} stroke-white ${
            size === 'sm' ? 'p-1' : 'p-2'
          } ${props.className}`}
        />
        {/* <AvatarFallback>L</AvatarFallback> */}
      </Avatar>
    );
  }

  return (
    <Avatar className={`${heightAndWidth} mr-4 border-2 ${props.className}`}>
      <AvatarImage
        className="object-cover"
        src={props.src}
        alt="user's avatar"
      />
      {/* <AvatarFallback>L</AvatarFallback> */}
    </Avatar>
  );
}
