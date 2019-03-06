import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, ResponseContentType } from '@angular/http';
import { YoutubeVideo } from './youtube-video';
import { Observable, of } from 'rxjs';
import { catchError, tap, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * search
   */
  public search(value: string): Observable<YoutubeVideo[]> {
    return this.http.get<YoutubeVideo[]>('/api/search?value=' + value)
      .pipe(
        retry(3),
        tap(_ => console.log('Searched Youtube')),
        catchError(this.handleError('search', []))
      );
  }

  /**
   * getInfo
   */
  public getInfo(url: string): Observable<YoutubeVideo> {
    return this.http.get<YoutubeVideo>('/api/info?url=' + url)
      .pipe(retry(3));
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
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
