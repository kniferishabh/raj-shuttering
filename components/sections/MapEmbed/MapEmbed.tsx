import { MapPin, Navigation } from 'lucide-react';
import styles from './MapEmbed.module.css';

interface MapEmbedProps {
  label?: string;
  /** Exact destination coordinates used for Google Maps navigation */
  lat?: number;
  lng?: number;
}

export function MapEmbed({
  label = 'Pandeypur, Varanasi',
  lat = 25.3472813,
  lng = 83.0149135,
}: MapEmbedProps) {
  // OpenStreetMap embed centered tightly around the pinned location
  const dLat = 0.006;
  const dLng = 0.009;
  const bbox = `${(lng - dLng).toFixed(5)}%2C${(lat - dLat).toFixed(5)}%2C${(lng + dLng).toFixed(5)}%2C${(lat + dLat).toFixed(5)}`;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;

  // Opens Google Maps with turn-by-turn directions to the exact location
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  return (
    <div className={styles.mapWrap}>
      <iframe
        src={src}
        title={`Map showing ${label}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

      <a
        className={styles.clickLayer}
        href={directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open Google Maps directions to ${label}`}
      />

      <span className={styles.overlay}>
        <MapPin size={14} />
        <span>{label}</span>
      </span>

      <a
        className={styles.directionsBtn}
        href={directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Navigation size={14} />
        Get Directions
      </a>
    </div>
  );
}
