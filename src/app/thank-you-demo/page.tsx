"use client";

import { useState, useEffect } from "react";
import PhonePreview from "@/components/PhonePreview";
import { formatPrice } from "@/lib/utils";
import { CaseColor } from "@prisma/client";
import { AlertCircle, Loader, Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ThankYouDemo = () => {
  const [localColor, setLocalColor] = useState<CaseColor | null>(null);
  const [localImage, setLocalImage] = useState<string | null>(null);

  useEffect(() => {
    const color = localStorage.getItem("selectedColor");
    const imageUrl = localStorage.getItem("croppedImage");

    if (color) {
      const parsedColor = JSON.parse(color);
      setLocalColor(parsedColor.value);
    }

    if (imageUrl) {
      setLocalImage(imageUrl);
    }
  }, []);

  if (!localColor || !localImage) {
    return (
      <div className=" flex gap-3 flex-col justify-center items-center min-h-dvh">
        <Loader className="h-8 w-8 animate-spin text-zinc-500" />
        <p>Loading ...</p>
      </div>
    );
  }

  // Static data
  const data = {
    configuration: {
      croppedImageUrl: localImage,
      color: localColor,
    },
    billingAddress: {
      name: "John Doe",
      street: "123 Main St",
      postalCode: "12345",
      city: "Hometown",
    },
    shippingAddress: {
      name: "Jane Doe",
      street: "456 Oak St",
      postalCode: "67890",
      city: "Anothercity",
    },
    amount: 59.99,
  };

  const orderId = "ABC123456";

  const { configuration, billingAddress, shippingAddress, amount } = data;
  const { color } = configuration as { color: CaseColor };

  return (
    <div className="bg-white">
      <Alert className="max-w-2xl  mx-auto mt-5">
        <Terminal className="h-4 w-4" />

        <AlertDescription>
          This Page is a Demo with static data. The order is not real and no payment
          was made.
        </AlertDescription>
      </Alert>
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-xl">
          <p className="text-base font-medium text-primary">Thank you!</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Your case is on the way!
          </h1>
          <p className="mt-2 text-base text-zinc-500">
            We've received your order and are now processing it.
          </p>

          <div className="mt-12 text-sm font-medium">
            <p className="text-zinc-900">Order number</p>
            <p className="mt-2 text-zinc-500">{orderId}</p>
          </div>
        </div>

        <div className="mt-10 border-t border-zinc-200">
          <div className="mt-10 flex flex-auto flex-col">
            <h4 className="font-semibold text-zinc-900">
              You made a great choice!
            </h4>
            <p className="mt-2 text-sm text-zinc-600">
              We at CaseCustomizes believe that a phone case doesn't only need
              to look good, but also last you for the years to come. We offer a
              5-year print guarantee: If you case isn't of the highest quality,
              we'll replace it for free.
            </p>
          </div>
        </div>

        <div className="flex space-x-6 overflow-hidden mt-4 rounded-xl bg-gray-900/5 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl">
          <PhonePreview
            croppedImageUrl={configuration.croppedImageUrl}
            color={color}
          />
        </div>

        <div>
          <div className="grid grid-cols-2 gap-x-6 py-10 text-sm">
            <div>
              <p className="font-medium text-gray-900">Shipping address</p>
              <div className="mt-2 text-zinc-700">
                <address className="not-italic">
                  <span className="block">{shippingAddress.name}</span>
                  <span className="block">{shippingAddress.street}</span>
                  <span className="block">
                    {shippingAddress.postalCode} {shippingAddress.city}
                  </span>
                </address>
              </div>
            </div>
            <div>
              <p className="font-medium text-gray-900">Billing address</p>
              <div className="mt-2 text-zinc-700">
                <address className="not-italic">
                  <span className="block">{billingAddress.name}</span>
                  <span className="block">{billingAddress.street}</span>
                  <span className="block">
                    {billingAddress.postalCode} {billingAddress.city}
                  </span>
                </address>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 border-t border-zinc-200 py-10 text-sm">
            <div>
              <p className="font-medium text-zinc-900">Payment status</p>
              <p className="mt-2 text-zinc-700">Paid</p>
            </div>

            <div>
              <p className="font-medium text-zinc-900">Shipping Method</p>
              <p className="mt-2 text-zinc-700">
                DHL, takes up to 3 working days
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6 border-t border-zinc-200 pt-10 text-sm">
          <div className="flex justify-between">
            <p className="font-medium text-zinc-900">Subtotal</p>
            <p className="text-zinc-700">{formatPrice(amount)}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium text-zinc-900">Shipping</p>
            <p className="text-zinc-700">{formatPrice(0)}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium text-zinc-900">Total</p>
            <p className="text-zinc-700">{formatPrice(amount)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouDemo;
