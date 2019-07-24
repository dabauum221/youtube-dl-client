import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { ClipboardModule } from 'ngx-clipboard';
import { RouterModule, Routes } from '@angular/router';

// Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { VgCoreModule } from 'videogular2/compiled/core';
import { VgControlsModule } from 'videogular2/compiled/controls';
import { VgOverlayPlayModule } from 'videogular2/compiled/overlay-play';
import { VgBufferingModule } from 'videogular2/compiled/buffering';

import { AppComponent } from './app.component';
import { YoutubeSearchComponent } from './youtube-search/youtube-search.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { YoutubeResultComponent } from './youtube-result/youtube-result.component';
import { TimeAgoPipe } from 'time-ago-pipe';

const appRoutes: Routes = [
  { path: 'video-player/:url', component: VideoPlayerComponent },
  { path: '', component: YoutubeSearchComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    YoutubeSearchComponent,
    VideoPlayerComponent,
    YoutubeResultComponent,
    TimeAgoPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
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
