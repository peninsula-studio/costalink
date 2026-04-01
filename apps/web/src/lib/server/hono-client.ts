import { hcWithType } from "@repo/server/hc";

export const honoClient = hcWithType("http://localhost:8787/", {
  init: { credentials: "include" },
});
