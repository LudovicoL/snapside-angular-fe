import { ErrorHandler, Injectable, Injector} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
@Injectable()
export class ErrorsHandler implements ErrorHandler {
constructor(
   private injector: Injector
) { }
handleError(error: Error | HttpErrorResponse) {

if (!(error instanceof HttpErrorResponse)) {
  alert('Frontend app error')
  console.error('It happens: ', error);
  return throwError(Error('Frontend app error'))
}

}}
