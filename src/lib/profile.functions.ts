import { createServerFn } from "@tanstack/react-start";
import { getRequestHost } from "@tanstack/react-start/server";
import type { ProfileKey } from "./profiles";

export const getProfileKey = createServerFn({ method: "GET" }).handler(
  (): ProfileKey => {
    const host = getRequestHost().toLowerCase();
    if (host.startsWith("harith.")) return "harith";
    return "maxamad";
  },
);
