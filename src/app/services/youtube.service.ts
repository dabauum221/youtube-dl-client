import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  public search(value: string, pageToken: string) {
    return this.http.get('/api/search?value=' + value + (pageToken ? ('&pageToken=' + pageToken) : ''))
      .pipe(
        retry(3),
        tap(),
        catchError(this.handleError('search', []))
      );
  }

  /**
   * getInfo
   */
  public getInfo(url: string) {
    return this.http.get('/api/info?url=' + url)
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
