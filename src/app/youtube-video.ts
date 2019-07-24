import { Observable } from 'rxjs';

export class YoutubeVideo {
  id: string;
  link: string;
  title: string;
  publishedAt: string;
  channelTitle: string;
  ext: string;
  description: string;
  thumbnails: [];
  gettingInfo: boolean;
  format: string;
  formats: Observable<[]>;
  copied: boolean;
}
