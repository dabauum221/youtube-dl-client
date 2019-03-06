import { Component, Injectable, OnInit, ViewChild, ElementRef } from '@angular/core';
import { YoutubeService } from '../youtube.service';
import { YoutubeVideo } from '../youtube-video';
import { FormGroup, FormControl } from '@angular/forms';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ClipboardService } from 'ngx-clipboard'
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
    videos: YoutubeVideo [];
    informed: number;

    constructor(private youtubeService: YoutubeService,
                public deviceService: DeviceDetectorService,
                private clipboardService: ClipboardService,
                protected localStorage: LocalStorage) { }

    ngOnInit() {
        this.localStorage.getItem<YoutubeVideo[]>('videos').subscribe((videos) => {
            this.videos = videos;
        });
    }

    public isNotDownloadable(): boolean {
        return [
            'iPhone',
            'iPad'
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
        title = title.trim();
        if (!title) {
            this.searching = false;
            alert('Must enter a title');
            return;
        }
        this.videos = [];
        this.youtubeService.search(title).subscribe(videos => {
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

    public download(video: YoutubeVideo, watch: boolean): void {
        window.location.href = '/api/download?url=' + video.link;
    }

    /**
     * copy
     */
    public copy(video: YoutubeVideo) {
        video.copied = true;
        this.clipboardService.copyFromContent(window.location.href + 'api/download?url=' + video.link);
        setTimeout( () => {
            video.copied = false;
        }, 2000);
    }
}
