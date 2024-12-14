import { TextRenderer } from '@/components/text/text-renderer';
import { DateSection } from '@/features/events/components/date-section';
// import { PinIcon } from "@repo/design-system/components/icons/pin-icon";
import { InfoSection } from '@/features/events/components/info-section';
import { LocationSection } from '@/features/events/components/location-section';
import {
  CalendarLink,
  PresentedBySection,
} from '@/features/events/components/presented-by-section';
import { PinIcon } from '@repo/design-system/icons/pin-icon';
import Image from 'next/image';
// import { getCurrentMember } from "@/actions/members";
export function EventDetailsPage() {
  const event = {
    title: 'Event Title',
    description: 'Event Description',
    image: 'https://via.placeholder.com/150',
    location: 'Event Location',
    geohash: '2853',
    hostedBy: 'Event Hosted By',
    pubkey: 'Event Hosted By',
    start: new Date().toISOString(),
    end: new Date().toISOString(),
  };

  return (
    <div className="mx-auto flex w-full max-w-5xl @2xl/main:flex-row flex-col @3xl/main:gap-x-7 gap-x-5 gap-y-3 p-4 md:p-10">
      <div className="mx-auto flex w-full @2xl/main:max-w-[300px] @3xl/main:max-w-[330px] max-w-[400px] flex-col gap-y-5">
        {event.image && (
          <div className="center relative overflow-hidden rounded-lg bg-gradient-to-t pb-[100%]">
            <div className="absolute inset-0 bg-muted">
              <Image
                src={event.image}
                alt={'banner image'}
                fill
                unoptimized
                objectFit="cover"
                className="object-cover"
              />
            </div>
          </div>
        )}
        {/* <PresentedBySection event={event} className="@2xl/main:block hidden" /> */}
      </div>
      {/* Info */}
      <div className="flex flex-1 flex-col gap-3">
        {/* Title Section */}
        <div className="flex flex-col gap-2">
          {/* Event Title */}
          <div className="@2xl/main:mb-2">
            <h1 className="font-accent font-semibold @3xl/main:text-5xl text-4xl">
              {event.title}
            </h1>
          </div>
          {/* Hosts */}
          <div className="mb-1 @2xl/main:hidden space-y-1">
            <div className="flex items-center">
              <h3 className="font-semibold text-muted-foreground">Hosted by</h3>
            </div>
            <CalendarLink event={event} />
          </div>
          {/* Date and Location */}
          <div className="">
            <div className="flex flex-col gap-3 pr-3">
              {/* Date Info */}
              <DateSection event={event} />
              {/* Location */}
              <div className="flex items-center gap-3">
                <PinIcon className="border-layer-1" />
                {/* Location Info */}
              </div>
            </div>
          </div>
        </div>
        {/* Registration */}
        {/* <RegistrationSection event={event} isRegistered={isRegistered} /> */}
        {/* Description Section */}
        <InfoSection title={'About Event'}>
          <TextRenderer text={event.description ?? ''} />
        </InfoSection>
        {/* Location Section */}
        {!!event.geohash && (
          <InfoSection title={'Location'}>
            <LocationSection
              geohash={event.geohash}
              address={event.location ?? ''}
            />
          </InfoSection>
        )}
        <PresentedBySection event={event} className="@2xl/main:hidden" />
      </div>
    </div>
  );
}
