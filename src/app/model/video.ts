export class Video {
  id: {
    videoId: string;
  };
  url: string;
  snippet: {
    channelTitle: string;
    publishedAt: Date;
    title: string;
    thumbnails: {
      medium: {
        url: string;
        width: number;
        height: number;
      }
    }
  };
  formats: {};
  ext: string;
}
