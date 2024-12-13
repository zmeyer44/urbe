export function formatMetadata({
  title,
  description,
  image,
  siteName = 'Urbe',
}: {
  title: string;
  description?: string | null;
  image?: string | null;
  siteName?: string | null;
}) {
  title = `${title} | ${siteName}`;
  image = `https://${process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? "blastoff.org"}/api/social/og${constructEventImage({ name: title, image: image })}`;
  return {
    title: title,
    openGraph: {
      title: title,
      description: description ?? undefined,
      images: [image],
    },
    twitter: {
      title: title,
      description: description ?? undefined,
      images: [image],
      card: "summary_large_image",
    },
  };
}

export const constructEventImage = (
  { name, image }: { name: string; image?: string | null },
  encodeUri = true,
): string => {
  const url = [
    `?type=event`,
    `&title=${encodeURIComponent(name)}`,
    image && `&image=${encodeURIComponent(image)}`,
  ].join("");
  return url;
  // return encodeUri ? encodeURIComponent(url) : url;
};
