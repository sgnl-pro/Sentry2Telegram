class StatData {
  private boot: Date = new Date();
  private lastRequest: Date = new Date();
  private totalRequests = 0;
  private channel: Map<string, {
    total: number;
    payload: unknown;
    date: Date;
  }> = new Map();

  public getLastJson(channelId: string) {
    const channelData = this.channel.get(channelId);
    if (!channelData) {
      return;
    }
    return channelData.payload;
  }

  public logRequest() {
    this.lastRequest = new Date();
    this.totalRequests++;
  }
  public logChannelCall(channelId: string, payload: unknown) {
    let channelData = this.channel.get(channelId);
    if (!channelData) {
      channelData = {
        total: 1,
        payload,
        date: new Date(),
      };
      this.channel.set(channelId, channelData);
    }
    channelData.total++;
    channelData.payload = payload;
    channelData.date = new Date();
  }
}

export const stats = new StatData();
