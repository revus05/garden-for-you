import { getServerUser } from "entities/user/server/get-server-user";
import type { ReactNode } from "react";
import { Toaster } from "shared/ui/sonner";
import { ClientProviders } from "./client-providers";

export async function Providers({ children }: { children: ReactNode }) {
  const user = await getServerUser();

  return (
    <ClientProviders initialUser={user}>
      {children}
      <Toaster position="top-right" />
    </ClientProviders>
  );
}
