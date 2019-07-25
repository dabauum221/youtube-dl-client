import { Component, OnInit, Input } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-youtube-result',
  templateUrl: './youtube-result.component.html',
  styleUrls: ['./youtube-result.component.css']
})
export class YoutubeResultComponent implements OnInit {

  @Input() video;

  constructor(private clipboardService: ClipboardService,
              public deviceService: DeviceDetectorService) { }

  ngOnInit() {
  }

  public isNotDownloadable(): boolean {
    return [
      'iPhone',
      'iPad'
    ].some((item) => {
      return this.deviceService.device === item;
    });
  }

  public download(video, watch: boolean): void {
    window.location.href = '/api/download?url=http://www.youtube.com/watch?v=' + video.id.videoId;
  }

  /**
   * copy
   */
  public copy(video) {
    video.copied = true;
    this.clipboardService.copyFromContent(window.location.href + 'api/download?url=http://www.youtube.com/watch?v=' + video.id.videoId);
    setTimeout(() => {
      video.copied = false;
    }, 2000);
  }
}
