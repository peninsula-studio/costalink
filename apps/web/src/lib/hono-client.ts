import { hcWithType } from "@repo/api/hc";

export const honoClient = hcWithType("http://localhost:8787/", {
  init: { credentials: "include" },
});
