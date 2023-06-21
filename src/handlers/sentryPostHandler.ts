import { Bot } from "../mod.ts";
import { stats } from "../stats.ts";
import { formatToTelegram } from "../formatters.ts";
import { SentryEventData, SentryMessageDto } from "../types.ts";

export const sentryPostHandler = async (
  req: Request,
  bot: Bot,
  channelId: string,
) => {
  let message: SentryMessageDto;
  let event: SentryEventData;
  let json: unknown;

  try {
    json = await req.json();
    stats.logChannelCall(channelId, json);
    message = json as SentryMessageDto;
    if (message.data.error) {
      event = message.data.error;
    } else if (message.data.event) {
      event = message.data.event;
    } else {
      throw Error("Sentry data message error");
    }
  } catch (error) {
    return new Response(`Request error: ${error.message}`, { status: 400 });
  }

  try {
    await bot.api.sendMessage(channelId, formatToTelegram(event, channelId), {
      parse_mode: "HTML",
      disable_web_page_preview: true,
    });
    return new Response("", { status: 204 });
  } catch (error) {
    return new Response(`Bot error: ${error.message}`, { status: 500 });
  }
};
