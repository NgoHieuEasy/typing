export type ConfigValue = {
  appName: string;
  serverUrl: string;
  socketServerUrl: string;
};

// ----------------------------------------------------------------------

export const CONFIG: ConfigValue = {
  appName: "Bot Dex",
  serverUrl: import.meta.env.VITE_SERVER_URL ?? "",
  socketServerUrl: import.meta.env.VITE_SOCKET_SERVER_URL ?? "",
};
