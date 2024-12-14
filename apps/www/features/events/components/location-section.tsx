import LocationBoxRaw from '@/components/maps/raw-map';

type LocationSectionProps = {
  geohash: string;
  address: string;
};
export function LocationSection({ geohash, address }: LocationSectionProps) {
  return (
    <div className="@container">
      <div className="h-[150px] overflow-hidden rounded-lg">
        <LocationBoxRaw geohash={geohash} />
      </div>
      <div className="flex items-center @lg:px-2 @lg:pt-1">
        <p className="pt-1.5 text-muted-foreground text-xs">{address}</p>
      </div>
    </div>
  );
}
