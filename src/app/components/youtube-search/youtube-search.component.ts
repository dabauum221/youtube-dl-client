import { Component, Injectable, OnInit, ViewChild, ElementRef } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';
import { FormGroup, FormControl } from '@angular/forms';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Component({
    selector: 'app-youtube-search',
    templateUrl: './youtube-search.component.html',
    styleUrls: ['./youtube-search.component.css']
})

@Injectable()
export class YoutubeSearchComponent implements OnInit {

    searchForm = new FormGroup({
        title: new FormControl(''),
    });
    searching = false;
    title: string;
    videos;
    informed: number;
    pageToken: string = null;

    constructor(private youtubeService: YoutubeService,
                protected localStorage: LocalStorage) { }

    ngOnInit() {
        this.localStorage.getItem('videos').subscribe((videos) => {
          this.videos = videos;
        });
        this.localStorage.getItem<string>('title').subscribe((title: string) => {
          this.title = title;
        });
        this.localStorage.getItem<string>('pageToken').subscribe((pageToken: string) => {
          this.pageToken = pageToken;
        });
    }

    /**
     * search
     */
    public search(more: boolean): void {
        if (this.searching) {
            console.warn('Cannot start a new serach while current search is still gathering info on the videos');
            return;
        }
        if (!more && (!this.searchForm.value.title || this.searchForm.value.title.length === 0)) {
            alert('Must enter a title');
            return;
        }
        this.searching = true;
        if (!more ) {
            this.title = this.searchForm.value.title;
        }
        this.searchForm.value.title = '';
        if (!more) {
          this.localStorage.setItem('title', this.title).subscribe(() => {});
          this.pageToken = null;
          this.videos = [];
        }
        this.youtubeService.search(this.title, this.pageToken).subscribe(result => {
            this.pageToken = result['nextPageToken'];
            if (more) {
                for (const video of result['items']) {
                  this.videos.push(video);
                }
            } else {
                this.videos = result['items'];
            }
            this.localStorage.setItem('videos', this.videos).subscribe(() => {});
            this.localStorage.setItem('pageToken', this.pageToken).subscribe(() => {});
            this.searching = false;
            // this.informed = 0;
            for (const video of this.videos) {
                video.ext = 'mp4';
                // this.getInfo(video.link);
            }
        }, error => {
            console.error(error);
            this.searching = false;
        });
    }

    /**
     * getInfo
     */
    public getInfo(url: string): void {
        this.youtubeService.getInfo(url).subscribe(video => {
            const found = this.videos.filter(x => x['id'] === video['id'])[0];
            found.formats = video['formats'];
            found.ext = video['ext'];
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
}
