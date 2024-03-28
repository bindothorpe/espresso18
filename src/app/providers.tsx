"use client";

import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      {children}
      <Toaster toastOptions={{
        success: {
          style: {
            color: "#E9E9E9",
            backgroundColor: "#80c788",
          },
          iconTheme: {
            primary: "#E9E9E9",
            secondary: "#80c788",
          },
        },
        error: {
          style: {
            color: "#E9E9E9",
            backgroundColor: "#f46b6f",
          },
          iconTheme: {
            primary: "#E9E9E9",
            secondary: "#f46b6f",
          },
        },
      }}/>
    </NextUIProvider>
  );
}
