import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor,HttpRequest,HttpResponse,HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from "rxjs";
import {catchError} from 'rxjs/operators';

@Injectable()
export class GlobalHttpInterceptorService implements HttpInterceptor {
    constructor() {}
    ErrorMessage=''
    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {

          return next.handle(req).pipe(
             catchError( (error) => {
               console.log(error);
               if (error instanceof HttpErrorResponse) {
                if (error.error instanceof ErrorEvent) {
                    console.error("Error Event");
                    this.ErrorMessage="Error Event";
                } else {
                    console.log(`error status : ${error.status} ${error.statusText}`);
                    switch (error.status) {
                        case 401:      //login
                        this.ErrorMessage="ERROR 401"
                            // this.router.navigateByUrl("/login");
                            break;
                        case 403:     //forbidden
                        this.ErrorMessage="ERROR 403"
                            break;
                            // this.router.navigateByUrl("/unauthorized");
                        case 404:
                            this.ErrorMessage="ERROR 404";
                            break;
                        default:
                          this.ErrorMessage='HTTP request error (backend related problem)'
                        break;
                    }
                }
            } else {
                console.error('Something unexpected happened, this is not HTTP error');
                this.ErrorMessage='Something unexpected happened, this is not a HTTP error. Could be angular related';
            }
               return throwError(Error(this.ErrorMessage));
          })
        )
    }
}
