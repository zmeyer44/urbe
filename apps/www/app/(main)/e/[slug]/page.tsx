import { EventDetailsPage } from '@/features/events/pages/event-details';

export default async function EventDetailsRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const slug = (await params).slug;
  return <EventDetailsPage />;
}
