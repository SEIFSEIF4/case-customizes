import { type ClassValue, clsx } from "clsx";
import { Metadata } from "next";
import { twMerge } from "tailwind-merge";

// Utility function to merge class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utility function to format price
export const formatPrice = (price: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formatter.format(price);
};

// Function to construct metadata for the page
export function constructMetadata({
  title = "Case Customization",
  description = "Create custom high-quality phone cases in seconds",
  image = "/thumbnail.png",
  icons = "/favicon.ico",
  manifest = "/manifest.json",
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  manifest?: string;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    icons,
    manifest,
    metadataBase: new URL("https://case-customizes.vercel.app"),
  };
}
