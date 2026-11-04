export type GalleryCategory = "Rooms" | "Interiors";

export type GalleryImage = {
  src: string;
  alt: string;
  category: GalleryCategory;
  /** Larger images can span two grid cells in the masonry layout. */
  featured?: boolean;
};

export const galleryImages: GalleryImage[] = [
  { src: "/images/rooms/ac-room-1.jpg", alt: "AC Double Bed Room at Hotel Chandreshwar", category: "Rooms", featured: true },
  { src: "/images/rooms/ac-room-2.jpg", alt: "AC Double Bed Room with TV and air conditioner", category: "Rooms" },
  { src: "/images/rooms/ac-room-3.jpg", alt: "AC Double Bed Room interior", category: "Rooms" },
  { src: "/images/rooms/non-ac-room-1.jpg", alt: "Non-AC Double Bed Room at Hotel Chandreshwar", category: "Rooms" },
  { src: "/images/rooms/non-ac-room-2.jpg", alt: "Non-AC Double Bed Room interior", category: "Rooms" },
  { src: "/images/rooms/non-ac-room-3.jpg", alt: "Double bed room with red curtains, Hotel Chandreshwar", category: "Rooms" },
  { src: "/images/gallery/gallery-room-1.jpg", alt: "Double bed room at Hotel Chandreshwar", category: "Rooms" },
  { src: "/images/gallery/gallery-room-2.jpg", alt: "Room interior with wall-mounted TV, Hotel Chandreshwar", category: "Rooms" },
  { src: "/images/gallery/gallery-room-3.jpg", alt: "Double bed room with seating area, Hotel Chandreshwar", category: "Rooms" },
  { src: "/images/gallery/gallery-room-4.jpg", alt: "Double bed room with mustard curtains, Hotel Chandreshwar", category: "Rooms", featured: true },
  { src: "/images/gallery/gallery-room-5.jpg", alt: "Double bed room with red curtains, Hotel Chandreshwar", category: "Rooms" },
  { src: "/images/gallery/gallery-room-6.jpg", alt: "Room interior with television, Hotel Chandreshwar", category: "Rooms" },
  { src: "/images/gallery/gallery-room-7.jpg", alt: "Double bed room with grey curtains, Hotel Chandreshwar", category: "Rooms" },
  { src: "/images/gallery/gallery-room-8.jpg", alt: "Double bed room with gold curtains, Hotel Chandreshwar", category: "Rooms" },
  { src: "/images/gallery/gallery-interior-1.jpg", alt: "Hotel Chandreshwar corridor", category: "Interiors", featured: true },
  { src: "/images/gallery/gallery-interior-2.jpg", alt: "Hotel Chandreshwar hallway leading to guest rooms", category: "Interiors" },
  // No "Property" (exterior) photo — the only one supplied was a
  // low-quality crop from the hotel's printed business card and was
  // removed sitewide rather than shown at poor quality. See
  // public/images/README.md.
];

export const galleryCategories: GalleryCategory[] = ["Rooms", "Interiors"];
