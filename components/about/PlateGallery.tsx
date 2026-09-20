"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import type { GalleryPlate } from "@/lib/gallery";
import type { GalleryItem } from "@/components/gallery/types";
import GalleryStrip from "@/components/gallery/GalleryStrip";
import GallerySpread from "@/components/gallery/GallerySpread";

function toGalleryItem(plate: GalleryPlate): GalleryItem {
  return {
    id: plate.slug,
    image: plate.image,
    alt: plate.alt,
    title: plate.title,
    caption: plate.caption,
    meta: [
      { label: "Location", value: plate.location },
      { label: "Year", value: plate.year },
      { label: "Credit", value: plate.credit },
    ].filter((entry) => entry.value),
  };
}

export default function PlateGallery({ plates }: { plates: GalleryPlate[] }) {
  // Direction rides along with the index so the spread knows which way to turn.
  const [open, setOpen] = useState<{ index: number; direction: 1 | -1 } | null>(null);
  const items = plates.map(toGalleryItem);

  return (
    <div>
      <GalleryStrip
        items={items}
        itemLabel="Plate"
        onOpen={(index) => setOpen({ index, direction: 1 })}
      />

      <AnimatePresence>
        {open !== null && (
          <GallerySpread
            items={items}
            index={open.index}
            direction={open.direction}
            itemLabel="Plate"
            onIndexChange={(index, direction) => setOpen({ index, direction })}
            onClose={() => setOpen(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
