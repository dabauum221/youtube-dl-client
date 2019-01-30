import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeviceDetectorModule } from 'ngx-device-detector';

import { AppComponent } from './app.component';
import { YoutubeSearchComponent } from './youtube-search/youtube-search.component';

@NgModule({
  declarations: [
    AppComponent,
    YoutubeSearchComponent
  ],
  imports: [
    BrowserModule,
    DeviceDetectorModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
