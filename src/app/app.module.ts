import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { ClipboardModule } from 'ngx-clipboard';
import { RouterModule, Routes } from '@angular/router';

import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';

import { AppComponent } from './app.component';
import { YoutubeSearchComponent } from './youtube-search/youtube-search.component';
import { VideoPlayerComponent } from './video-player/video-player.component';

const appRoutes: Routes = [
  { path: 'video-player/:url', component: VideoPlayerComponent },
  { path: '', component: YoutubeSearchComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    YoutubeSearchComponent,
    VideoPlayerComponent
  ],
  imports: [
    BrowserModule,
    DeviceDetectorModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ClipboardModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes
    ),
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
