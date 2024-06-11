"use client";

import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
export function NoAuthButton({ text }: { text: string }) {
  const { toast } = useToast();

  return (
    <div className="flex justify-center items-center h-full">
      <Button
        size="sm"
        variant="ghost"
        onClick={() => {
          toast({
            title: "No Authenticated Needed",
            description:
              "You don't need to be authenticated to access on demo.",
            variant: "default",
          });
        }}
      >
        {text}
      </Button>
    </div>
  );
}
