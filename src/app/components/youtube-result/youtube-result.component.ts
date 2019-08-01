import { Component, OnInit, Input } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-youtube-result',
  templateUrl: './youtube-result.component.html',
  styleUrls: ['./youtube-result.component.css']
})
export class YoutubeResultComponent implements OnInit {

  @Input() video;

  constructor(private _clipboardService: ClipboardService,
              private _snackBar: MatSnackBar,
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
    window.location.href = '/api/download' +
                           '?url=http://www.youtube.com/watch?v=' + video.id.videoId +
                           '&title=' + video.snippet.title;
  }

  /**
   * copy
   */
  public copy(video) {
    this._clipboardService.copyFromContent(window.location.href + 'api/download' +
                                                                 '?url=http://www.youtube.com/watch?v=' + video.id.videoId +
                                                                 '&title=' + escape(video.snippet.title));
    this._snackBar.open('URL Copied!', null, {
      duration: 2000,
    });
  }
}
