'use client';
import {
  GoogleMap,
  type Libraries,
  useLoadScript,
} from '@react-google-maps/api';
import { env } from '@repo/env';
import Geohash from 'latlon-geohash';
import { Loader } from 'lucide-react';
import { useMemo } from 'react';

type LocationPreviewProps = {
  geohash: string;
};
export default function LocationBoxRaw({ geohash }: LocationPreviewProps) {
  const { lat, lon } = Geohash.decode(geohash);
  const libraries = useMemo(() => ['places'], []);
  const mapCenter = useMemo(() => ({ lat, lng: lon }), [lat, lon]);

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: false,
    }),
    []
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
    libraries: libraries as Libraries,
  });

  if (!isLoaded) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-muted">
        <Loader className="animate-spin" />
      </div>
    );
  }
  return (
    <GoogleMap
      options={mapOptions}
      zoom={14}
      center={mapCenter}
      mapTypeId={google.maps.MapTypeId.ROADMAP}
      mapContainerStyle={{ width: '100%', height: '100%' }}
      onLoad={() => console.log('Map Component Loaded...')}
    />
  );
}
