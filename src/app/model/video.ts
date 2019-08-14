export class Video {
  id: {
    videoId: string;
  };
  snippet: {
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
