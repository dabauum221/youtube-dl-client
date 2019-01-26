import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { YoutubeVideo } from './youtube-video';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeDownloaderUrl = '/api';  // URL to web api

  constructor(
    private http: HttpClient
  ) { }

  /**
   * search
   */
  public search(value: string): Observable<YoutubeVideo[]> {
    return this.http.get<YoutubeVideo[]>(this.youtubeDownloaderUrl + '/search?value=' + value)
      .pipe(
        tap(_ => this.log('searched youtube')),
        catchError(this.handleError('search', []))
      );
  }

  /**
   * getInfo
   */
  public getInfo(url: string): Observable<YoutubeVideo> {
    return this.http.get<YoutubeVideo>(this.youtubeDownloaderUrl + '/info?url=' + url)
      .pipe();
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    // this.messageService.add(`HeroService: ${message}`);
    console.log(message);
  }
}
