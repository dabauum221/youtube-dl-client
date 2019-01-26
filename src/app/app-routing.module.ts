import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { YoutubeSearchComponent } from './youtube-search/youtube-search.component';

const routes: Routes = [
  { path: '', redirectTo: '/youtube-search', pathMatch: 'full'},
  { path: 'youtube-search', component: YoutubeSearchComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
