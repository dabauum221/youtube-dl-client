import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { YoutubeService } from '../youtube.service';
import { YoutubeVideo } from '../youtube-video';
import { FormGroup, FormControl } from '@angular/forms';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-youtube-search',
  templateUrl: './youtube-search.component.html',
  styleUrls: ['./youtube-search.component.css']
})

export class YoutubeSearchComponent implements OnInit {

  searchForm = new FormGroup({
    title: new FormControl(''),
  });
  searching = false;
  videos: YoutubeVideo [];
  informed: number;
  @ViewChild('downloadLink') private downloadLink: ElementRef;

  constructor(private youtubeService: YoutubeService, public deviceService: DeviceDetectorService) { }

  ngOnInit() { }

  public isNotDownloadable(): boolean {
    return [
      'iPhone',
      'iPad',
      'Android'
    ].some((item) => {
        return this.deviceService.device === item;
    });
  }

  /**
   * search
   */
  public search(): void {
    if (this.searching) {
      console.warn('Cannot start a new serach while current search is still gathering info on the videos');
      return;
    }
    this.searching = true;
    let title = this.searchForm.value.title;
    // console.log(value);
    title = title.trim();
    if (!title) {
      this.searching = false;
      alert('Must enter a title');
      return;
    }
    this.videos = [];
    this.youtubeService.search(title).subscribe(videos => {
      this.videos = videos;
      this.searching = false;
      // this.informed = 0;
      for (const video of this.videos) {
        video.ext = 'mp4';
        // this.getInfo(video.link);
      }
    }, error => {
      console.error(error);
    });
  }

  /**
   * getInfo
   */
  public getInfo(url: string): void {
    this.youtubeService.getInfo(url).subscribe(video => {
      const found = this.videos.filter(x => x.id === video.id)[0];
      found.formats = video.formats;
      found.ext = video.ext;
    // Handle error
    }, error => {
      console.error(error);
      this.informed++;
      if (this.informed === this.videos.length) { this.searching = false; }
    // Finally do this
    }, () => {
      this.informed++;
      if (this.informed === this.videos.length) { this.searching = false; }
    });
  }

  public async download(video: YoutubeVideo, watch: boolean): Promise<void> {
    video.pending = true;
    const blob = await this.youtubeService.download(video.link, watch);
    const url = window.URL.createObjectURL(blob);
    const link = this.downloadLink.nativeElement;
    link.href = url;
    if (!watch) { link.download = video.title + '.' + video.ext; }
    link.click();
    window.URL.revokeObjectURL(url);
    video.pending = false;
  }

  /**
   * copy
   */
  public copy(video: YoutubeVideo) {
    video.copied = true;
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = window.location.href + 'api/download?url=' + video.link;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
