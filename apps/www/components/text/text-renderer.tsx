'use client';
import {
  cleanUrl,
  eventPrefixRegex,
  hashtagRegex,
  imageFileRegex,
  urlRegex,
  videoFileRegex,
} from '@repo/design-system/lib/utils';
import Link from 'next/link';
import { Image } from './components/image';
import { Video } from './components/video';

export function TextRenderer({
  text,
  controls = { hideImages: false, hideVideos: false },
}: {
  text?: string | null;
  controls?: {
    hideImages?: boolean;
    hideVideos?: boolean;
  };
}) {
  if (!text) return null;
  const Elements: React.ReactNode[] = [];
  // const usernameRegex = /(?:^|\s)\@(\w+)\b/g;
  const combinedRegexString = `(${urlRegex.source}|${hashtagRegex.source}|${eventPrefixRegex.source})`;
  const combinedRegex = new RegExp(combinedRegexString, 'g');
  // Get Array of URLs
  const specialValuesArray = text.match(combinedRegex);
  const formattedText = text.replace(combinedRegex, '##[link]##');

  const cleanTextArray = formattedText.split('##[link]##');

  cleanTextArray.forEach((string, index) => {
    const jsxElement = <span key={index}>{string}</span>;
    Elements.push(jsxElement);
    let specialElement: React.ReactNode | null = null;
    if (specialValuesArray?.length && specialValuesArray.length > index) {
      const currentValue = specialValuesArray[index];
      if (currentValue?.match(urlRegex)) {
        if (currentValue.match(imageFileRegex)) {
          specialElement = <Image className="my-1" url={currentValue} />;
        } else if (currentValue.match(videoFileRegex)) {
          specialElement = <Video className="my-1" url={currentValue} />;
        } else {
          specialElement = (
            <a
              className="relative z-10 text-accent hover:underline"
              href={cleanUrl(currentValue)}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              {cleanUrl(currentValue)}
            </a>
          );
        }
        // specialElement = <ContentRendering url={specialValuesArray[index]} />;
        // specialElement = <span>{cleanUrl(specialValuesArray[index])}</span>;
      } else if (specialValuesArray[index]?.match(hashtagRegex)) {
        specialElement = (
          <Link
            href={`/?t=${specialValuesArray[index]?.substring(1)}`}
            className="z-10"
          >
            <span className="break-words text-primary hover:underline">
              {specialValuesArray[index]}
            </span>
          </Link>
        );
        // specialElement = <span className="">{specialValuesArray[index]}</span>;
      }
      if (specialElement) {
        Elements.push(specialElement);
      }
    }
  });

  return (
    <>
      {Elements.map((el, index) => (
        <span key={index}>{el}</span>
      ))}
    </>
  );
}
