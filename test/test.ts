import { serve } from "https://deno.land/std@0.191.0/http/mod.ts";
import { Env } from "https://deno.land/x/env@v2.2.3/env.js";
import { MOCK_EVENT_ALERT_TRIGGERED_WEBHOOK } from "./mocks.ts";

const {
  SERVER_PORT,
  BASE_URL,
  TEST_CID,
  // deno-lint-ignore no-explicit-any
} = new Env().required as any;

// console.log(JSON.stringify(MOCK_EVENT_ALERT_TRIGGERED_WEBHOOK, null, 2));
// Deno.exit(0);
const req = await fetch(
  `http://${BASE_URL}:${SERVER_PORT}?cid=${TEST_CID}`,
  {
    method: "POST",
    body: JSON.stringify(MOCK_EVENT_ALERT_TRIGGERED_WEBHOOK),
  },
);
