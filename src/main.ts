import { sentryPostHandler } from "./handlers/sentryPostHandler.ts";
import { env } from "./helpers.ts";
import { Bot } from "./mod.ts";
import { stats } from "./stats.ts";

const bot = new Bot(env.telegramToken);
// const menu = new Menu("my-menu-identifier")
//   .text("Info", (ctx) => {
//     if (ctx.chat) {
//       const data = stats.channel.get(ctx.chat.id.toString());
//       let message = "";
//       message += "Server stats:";
//       message += `\nStartup:                  ${stats.boot.toISOString()}`;
//       message +=
//         `\nLast server request:      ${stats.lastRequest.toISOString()}`;
//       if (data) {
//         message += `\nLast channel request:     ${data.date.toISOString()}`;
//       }
//       message += `\nTotal server requests:    ${stats.totalRequests}`;
//       if (data) {
//         message += `\nTotal channel requests:   ${data.total}`;
//       }

//       return ctx.reply(
//         message,
//       );
//     }

//     return ctx.reply("no data");
//   });
// bot.use(menu);
// bot.command("start", async (ctx) => {
//   await ctx.reply("Menu:", { reply_markup: menu });
// });
bot.start();

await Deno.serve({
  port: parseInt(env.serverPort),
  onListen: ({ port, hostname }) => {
    console.log(`Starting server at ${hostname}:${port}`);
  },
}, async (req) => {
  stats.logRequest();

  const url = new URL(req.url);
  const channelId = url.searchParams.get("cid");
  if (!channelId) {
    throw Error("Channel not set");
  }

  if (req.method === "GET") {
    const json = stats.getLastJson(channelId);
    if (!json) {
      return new Response(`Not found`, { status: 404 });
    }
    return new Response(JSON.stringify(json), {
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    });
  }

  if (req.method === "POST") {
    return await sentryPostHandler(req, bot, channelId);
  }
  return new Response(`Method Not Allowed`, { status: 405 });
});
