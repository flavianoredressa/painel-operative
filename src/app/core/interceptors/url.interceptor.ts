import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { environment } from '@environment';
import { Observable } from 'rxjs';

export function urlInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  if (!request.url.startsWith('/')) {
    return next(request);
  }

  return next(
    request.clone({
      url: `${environment.urlApi}${request.url}`
    })
  );
}
