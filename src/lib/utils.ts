import { ClassValue, clsx } from 'clsx';
import { formatDistanceToNow } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatTime(time: string) {
  const postDate = new Date(time);

  return formatDistanceToNow(postDate, { addSuffix: true });
}

export function extractTextFromHTML(html: string): string {
  const regex = /<(?:p|h1|h2|h3|span)[^>]*>(.*?)<\/(?:p|h1|h2|h3|span)>/g;
  const matches = html.match(regex);

  if (!matches) {
    return html;
  }

  const text = matches
    .map((match) => match.replace(/<\/?[^>]+(>|$)/g, ''))
    .join(' ');

  return text;
}
