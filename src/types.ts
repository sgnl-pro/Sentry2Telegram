export interface SentryMessageDto {
  data: {
    event?: SentryEventData;
    error?: SentryEventData;
  };
}

export interface SentryEventData {
  release: string;
  platform: string;
  message: string;
  datetime: string;
  environment: string;
  title: string;
  // deno-lint-ignore camelcase
  web_url: string;
  metadata?: {
    filename: string;
    type: string;
    value: string;
  };
}
