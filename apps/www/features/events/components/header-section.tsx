'use client';
import { BannerImage } from '@/components/images/banner-image';
import { TextRenderer } from '@/components/text/text-renderer';
// import type { Event } from "@prisma/client";
import { Button } from '@repo/design-system/components/ui/button';
import { DateIcon } from '@repo/design-system/icons/date-icon';
import { PinIcon } from '@repo/design-system/icons/pin-icon';
import { formatDate } from '@repo/design-system/lib/utils';

type EventHeaderProps = {
  event: {
    name: string;
    description: string;
    startDateTime: Date;
    endDateTime: Date | undefined;
    location: string;
    geohash: string;
    image: string;
  };
};

export function HeaderSection({
  event: {
    name,
    description,
    startDateTime,
    endDateTime,
    location,
    geohash,
    image,
  },
}: EventHeaderProps) {
  return (
    <div className="relative overflow-hidden">
      <div className="overflow-hidden rounded-[0.5rem] p-0">
        <div className="relative w-full overflow-hidden rounded-lg bg-muted pb-[calc(clamp(75px,40%,300px))]">
          {!!image && <BannerImage src={image} />}
        </div>
      </div>

      <div className="space-y-1 @sm/main:pt-5 pt-3 @sm/main:pb-2">
        <div className="flex items-start justify-between @lg/main:gap-x-2.5 gap-x-1.5 overflow-hidden">
          <div className="@sm/main:space-y-2 space-y-1">
            <h2 className="font-accent font-bold font-condensed @2xl/main:text-5xl @lg/main:text-4xl text-3xl leading-7">
              {name}
            </h2>
            <div className="flex items-center">
              {/* <CalendarInfo eventReference={eventReference} /> */}
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-3">
            <Button>Register</Button>

            {/* {!isMember &&
              (hasValidPayment ? (
                <Button variant={"outline"}>Pending Sync</Button>
              ) : (
                <Button
                  onClick={() =>
                    modal?.show(
                      <ConfirmModal
                        title={`Subscribe to ${title}`}
                        onConfirm={handleSendZap}
                        ctaBody={
                          <>
                            <span>Zap to Subscribe</span>
                            <HiOutlineLightningBolt className="h-4 w-4" />
                          </>
                        }
                      >
                        <p className="text-muted-forground">
                          {`Pay ${priceInBTC} BTC (${formatNumber(
                            btcToSats(priceInBTC),
                          )} sats) for year long access until ${formatDate(
                            new Date(
                              new Date().setFullYear(
                                new Date().getFullYear() + 1,
                              ),
                            ),
                            "MMM Do, YYYY",
                          )}`}
                        </p>
                      </ConfirmModal>,
                    )
                  }
                >
                  RSVP
                </Button>
              ))} */}
          </div>
        </div>
        <div className="flex @2xl/main:flex-row flex-col gap-x-6 gap-y-3 @md/main:pt-2 pt-1">
          <div
            className="flex-2"
            style={{
              flex: '2 2 0%',
            }}
          >
            <TextRenderer text={description} />
          </div>
          <div className="flex flex-1 @2xl/main:justify-end @2xl/main:pt-0 pt-3">
            <div className="flex flex-col gap-3 pr-3">
              {/* Date Info */}
              <div className="flex items-center gap-3">
                <DateIcon date={startDateTime} />
                <div className="">
                  <p className="@xl/main:text-base text-bold text-sm">
                    {formatDate(startDateTime, 'dddd, MMMM Do')}
                  </p>
                  {endDateTime && (
                    <p className="@xl/main:text-sm text-muted-foreground text-xs">{`${formatDate(
                      startDateTime,
                      'h:mm a'
                    )} to ${formatDate(new Date(endDateTime), 'h:mm a')}`}</p>
                  )}
                </div>
              </div>

              {/* Location */}

              <div className="flex items-center gap-3">
                <PinIcon />
                <div className="overflow-hidden">
                  <p className="line-clamp-2 @xl/main:text-base text-bold text-sm">
                    {location}
                  </p>
                  {/* <p className="@xl:text-sm text-muted-foreground line-clamp-2 text-xs">
                    {address}
                  </p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
