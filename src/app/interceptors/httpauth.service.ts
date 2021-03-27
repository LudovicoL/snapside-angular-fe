import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export class AddHeaderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to add the new header
    const excluded='loginx';

    if (req.url.search(excluded)!==-1||true)
    {
      return next.handle(req);
    }
    else{
          // const clonedRequest = req.clone({ headers: req.headers.set('Authorization', 'Basic '+localStorage.getItem('token')) });
    const clonedRequest = req.clone({ setHeaders:{'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'}  });

    // Pass the cloned request instead of the original request to the next handle
    return next.handle(clonedRequest);}
  }
}



