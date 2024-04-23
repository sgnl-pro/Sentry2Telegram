import { Env } from "https://deno.land/x/env@v3.0.2/env.js";
import { existsSync } from "https://deno.land/std@0.223.0/fs/mod.ts";
import { MOCK_EVENT_ALERT_TRIGGERED_WEBHOOK } from "./mocks.ts";

const {
  SERVER_PORT,
  BASE_URL,
  TEST_CID,
  // deno-lint-ignore no-explicit-any
} = new Env().required as any;

// console.log(JSON.stringify(MOCK_EVENT_ALERT_TRIGGERED_WEBHOOK, null, 2));
// Deno.exit(0);

//check file exists
let body = "";

if (existsSync("./test.json")) {
  body = await Deno.readTextFile("./test.json");
} else {
  body = JSON.stringify(MOCK_EVENT_ALERT_TRIGGERED_WEBHOOK);
}

await fetch(
  `http://${BASE_URL}:${SERVER_PORT}?cid=${TEST_CID}`,
  {
    method: "POST",
    body,
  },
);
