import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { ClipboardModule } from 'ngx-clipboard';

// Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';

import { AppComponent } from './app.component';
import { YoutubeSearchComponent } from './components/youtube-search/youtube-search.component';
import { YoutubeResultComponent } from './components/youtube-result/youtube-result.component';
import { TimeAgoPipe } from 'time-ago-pipe';

@NgModule({
  declarations: [
    AppComponent,
    YoutubeSearchComponent,
    YoutubeResultComponent,
    TimeAgoPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    DeviceDetectorModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ClipboardModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
