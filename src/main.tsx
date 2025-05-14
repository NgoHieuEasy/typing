import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./font.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { I18nProvider } from "./locales";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { createConfig, http,WagmiProvider } from "wagmi";
import { mainnet } from "wagmi/chains";
import { ConnectKitProvider } from "connectkit";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 0,
      // gcTime: 1000 * 60 * 60 * 2,
      retry: 1,
    },
  },
});

const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
  serialize: (data) => JSON.stringify(data),
  deserialize: (data) => JSON.parse(data),
});
persistQueryClient({
  queryClient,
  persister: localStoragePersister,
  maxAge: 1000 * 60 * 60 * 2,
  dehydrateOptions: {
    shouldDehydrateQuery: (query) => {
      return query.meta?.persist === true;
    },
  },
});

export const wagmiConfig = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(), // Sử dụng transport mặc định
  },
  ssr: true, // nếu bạn dùng Next.js
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <WagmiProvider config={wagmiConfig}>
          <ConnectKitProvider>
            <App />
          </ConnectKitProvider>
        </WagmiProvider>
      </I18nProvider>
    </QueryClientProvider>
  </StrictMode>
);
