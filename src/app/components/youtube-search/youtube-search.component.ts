import { Component, Injectable, OnInit, ViewChild, ElementRef } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';

import * as unescape from 'unescape';
import { Video } from 'src/app/model/video';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-youtube-search',
    templateUrl: './youtube-search.component.html',
    styleUrls: ['./youtube-search.component.css']
})

@Injectable()
export class YoutubeSearchComponent implements OnInit {

    searching: boolean = false;
    videos: Array<Video>;
    informed: number;
    pageToken: string = null;

    constructor(private youtubeService: YoutubeService) { }

    ngOnInit() { }

    /**
     * search
     */
    public search(more: boolean): void {
        if (this.searching) {
            console.warn('Cannot start a new serach while current search is still gathering info on the videos');
            return;
        }
        this.searching = true;
        if (!more) {
          this.pageToken = null;
          this.videos = [];
        }
        this.youtubeService.search(this.titleValue, this.pageToken).subscribe( result => {
            this.pageToken = result['nextPageToken'];
            if (more) {
                for (const video of result['items']) {
                  this.videos.push(video);
                }
            } else {
                this.videos = result['items'];
            }
            for (const video of this.videos) {
              video.snippet.title = unescape(video.snippet.title);
              video.ext = 'mp4';
            }
            this.searching = false;
        }, error => { // Handle error
            console.error(error);
            this.searching = false;
        });
    }

    /**
     * getInfo
     */
    public getInfo(url: string): void {
        this.youtubeService.getInfo(url).subscribe( video => {
            const found = this.videos.filter(x => x.id.videoId === video['id'])[0];
            found.formats = video['formats'];
            found.ext = video['ext'];
        }, error => { // Handle error
            console.error(error);
        });
    }
}
