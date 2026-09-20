"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import type { TripPackage, TripPhoto } from "@/lib/trips";
import type { GalleryItem } from "@/components/gallery/types";
import GalleryStrip from "@/components/gallery/GalleryStrip";
import GallerySpread from "@/components/gallery/GallerySpread";

function toGalleryItem(photo: TripPhoto, trip: TripPackage, index: number): GalleryItem {
  return {
    id: `${trip.slug}-${index}`,
    image: photo.url,
    // Falls back to the trip name — the caption is often the only description
    // this photo has, so a missing one shouldn't leave alt text empty.
    alt: photo.caption || trip.name,
    title: trip.name,
    caption: photo.caption,
    meta: [{ label: "Location", value: trip.location }].filter((entry) => entry.value),
  };
}

export default function TripGallery({ trip }: { trip: TripPackage }) {
  const [open, setOpen] = useState<{ index: number; direction: 1 | -1 } | null>(null);
  const items = trip.gallery.map((photo, index) => toGalleryItem(photo, trip, index));

  if (items.length === 0) return null;

  return (
    <div>
      <GalleryStrip
        items={items}
        itemLabel="Photo"
        edgeFade={false}
        onOpen={(index) => setOpen({ index, direction: 1 })}
      />

      <AnimatePresence>
        {open !== null && (
          <GallerySpread
            items={items}
            index={open.index}
            direction={open.direction}
            itemLabel="Photo"
            onIndexChange={(index, direction) => setOpen({ index, direction })}
            onClose={() => setOpen(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
