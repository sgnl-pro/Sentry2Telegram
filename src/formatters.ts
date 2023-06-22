import { env } from "./helpers.ts";
import { SentryEventData } from "./types.ts";

export const formatToTelegram = (m: SentryEventData, channel: string) => {
  const isProd = m.environment.toLowerCase().includes("prod");
  let text = `<a href='${m.web_url}'>${
    isProd ? "😡" : "😐"
  } ${m.datetime.toString()}   🔗Sentry</a>`;
  // text += `\n`;
  text += `\n<b>${escapeString(m.release)}</b>`;
  text += `\n<b>${escapeString(m.environment).toUpperCase()}</b>`;
  text += `\n`;
  // text += `\n<b>${escapeString(m.title)}</b>`;
  // text += `\n<b>platform: </b>${escapeString(m.platform)}`;
  // text += `\n<b>environment: </b>${escapeString(m.environment)}`;

  // if (m.metadata?.type) {
  //   text += `\n<b>${escapeString(m.metadata.type)}</b>: ${
  //     escapeString(m.metadata.value)
  //   }`;
  // }
  if (m.metadata?.filename) {
    text += `\n${escapeString(m.metadata.filename)}: `;
  }
  text += `\n`;
  if (m.metadata?.type && m.metadata?.value) {
    text += `<code>${m.metadata.type}:</code>`;
    text += `\n`;
    text += `<code>${m.metadata.value}</code>`;
  } else {
    text += `\n<code>${escapeString(m.message ? m.message : m.title)}</code>`;
  }
  text += `\n`;
  text +=
    `\n<a href='https://jsonviewer.stack.hu#http://${env.baseUrl}:${env.serverPort}/last.json?cid=${channel}'>dbg</a>`;
  return text;
};

const escapeString = (s?: string) => {
  if (!s) {
    return "";
  }
  const lookup: { [name: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
  };
  return s.replace(/[&<>]/g, (c: string) => lookup[c]);
};
