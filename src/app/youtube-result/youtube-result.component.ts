import { Component, OnInit, Input } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';
import { YoutubeVideo } from '../youtube-video';
import { DeviceDetectorService } from 'ngx-device-detector';
import { TimeAgoPipe } from 'time-ago-pipe';

@Component({
  selector: 'app-youtube-result',
  templateUrl: './youtube-result.component.html',
  styleUrls: ['./youtube-result.component.css']
})
export class YoutubeResultComponent implements OnInit {

  @Input() video: YoutubeVideo;

  constructor(private clipboardService: ClipboardService,
              public deviceService: DeviceDetectorService) { }

  ngOnInit() {
  }

  private isNotDownloadable(): boolean {
    return [
      'iPhone',
      'iPad'
    ].some((item) => {
      return this.deviceService.device === item;
    });
  }

  private download(video: YoutubeVideo, watch: boolean): void {
    window.location.href = '/api/download?url=' + video.link;
  }

  /**
   * copy
   */
  private copy(video: YoutubeVideo) {
    video.copied = true;
    this.clipboardService.copyFromContent(window.location.href + 'api/download?url=' + video.link);
    setTimeout(() => {
      video.copied = false;
    }, 2000);
  }
}
