import { Observable } from 'rxjs';

export class YoutubeVideo {
  id: string;
  link: string;
  title: string;
  description: string;
  thumbnails: [];
  gettingInfo: boolean;
  formats: Observable<[]>;
}
