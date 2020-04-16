import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/components/alert/alert.component';

@Injectable()

export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private dialog: MatDialog ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`;
          } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }
          this.alertError()
          return throwError(errorMessage);
        })
      )
  };

  alertError() {
    this.dialog.open(AlertComponent, {
      width: '450px',
      data: {
        message: "We're sorry! Something went wrong ☹️",
        title: "Failure"
    }})
  };

};