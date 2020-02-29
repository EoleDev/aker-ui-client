import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse }  from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url, httpOptions)
      .pipe(
        retry(3),
        catchError(this.handleError())
      );
  }

  post<T>(url: string, data: any): Observable<T> {
    return this.http.post<T>(url, data, httpOptions)
      .pipe(
        retry(3),
        catchError(this.handleError())
      );
  }

  delete(url: string): Observable<{}> {
    return this.http.delete(url, httpOptions)
      .pipe(
        retry(3),
        catchError(this.handleError())
      );
  }

  put<T>(url: string, data: any): Observable<T> {
    return this.http.put<T>(url, data, httpOptions)
      .pipe(
        retry(3),
        catchError(this.handleError())
      );
  }

  private handleError() {
    return (error: HttpErrorResponse) => {
      if (error.error instanceof ErrorEvent) {
        console.error('An error occured:', error.error.message);
      } else {
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }
      return throwError(
        'Something bad happened; please try again later.');
    };
  }
}
