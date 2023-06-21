import { Env } from "./mod.ts";

const ReadEnv = () => {
  const {
    SERVER_PORT,
    TELEGRAM_TOKEN,
    BASE_URL,
    // deno-lint-ignore no-explicit-any
  } = new Env().required as any;
  return {
    serverPort: SERVER_PORT,
    telegramToken: TELEGRAM_TOKEN,
    baseUrl: BASE_URL,
  };
};
export const env = ReadEnv();

export const includes = (stack: string, needle: string) =>
  stack.toLowerCase().includes(needle.toLowerCase());
