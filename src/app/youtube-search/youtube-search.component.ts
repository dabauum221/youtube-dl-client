import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../youtube.service';
import { YoutubeVideo } from '../youtube-video';

@Component({
  selector: 'app-youtube-search',
  templateUrl: './youtube-search.component.html',
  styleUrls: ['./youtube-search.component.css']
})

export class YoutubeSearchComponent implements OnInit {

  searching = false;

  videos: YoutubeVideo [];

  informed: number;

  constructor(private youtubeService: YoutubeService) { }

  ngOnInit() { }

  /**
   * search
   */
  public search(value: string): void {
    this.searching = true;
    value = value.trim();
    if (!value) {
      this.searching = false;
      alert('Must enter a title');
      return;
    }
    this.videos = [];
    this.youtubeService.search(value).subscribe(videos => {
      this.videos = videos;
      this.informed = 0;
      // this.searching = false;
      for (const video of this.videos) {
        this.getInfo(video.link);
        // console.log(vid.link);
      }
    });
  }

  /**
   * getInfo
   */
  public getInfo(url: string): void {
    this.youtubeService.getInfo(url).subscribe(video => {
      // console.log(video.id);
      // console.log(this.videos.filter(x => x.id === video.id)[0].id);
      const found = this.videos.filter(x => x.id === video.id)[0];
      found.formats = video.formats;
      found.gettingInfo = false;
      // console.log(this.videos);
      this.informed++;
      if (this.informed === this.videos.length) { this.searching = false; }
    });
  }
}
