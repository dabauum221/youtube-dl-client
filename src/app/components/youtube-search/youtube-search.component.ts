import { Component, Injectable, OnInit, ViewChild, ElementRef } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';
import { YoutubeVideo } from '../../model/youtube-video';
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
    videos: YoutubeVideo [];
    informed: number;

    constructor(private youtubeService: YoutubeService,
                protected localStorage: LocalStorage) { }

    ngOnInit() {
        this.localStorage.getItem<YoutubeVideo[]>('videos').subscribe((videos: YoutubeVideo[]) => {
          this.videos = videos;
        });
        this.localStorage.getItem<string>('title').subscribe((title: string) => {
          this.title = title;
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
        this.searching = true;
        if (!more) {
          this.title = this.searchForm.value.title;
          this.localStorage.setItem('title', this.title).subscribe(() => {});
        }
        this.title = this.title.trim();
        if (!this.title || this.title.length === 0) {
            this.searching = false;
            alert('Must enter a title');
            return;
        }
        this.videos = [];
        this.youtubeService.search(this.title).subscribe(videos => {
            this.videos = videos;
            this.localStorage.setItem('videos', videos).subscribe(() => {});
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
}
