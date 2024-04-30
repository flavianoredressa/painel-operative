import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { SessionContext } from '@contexts/session.context';
import { environment } from '@environment';
import { Observable, from, switchMap } from 'rxjs';

export function jwtInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  if (!request.url.startsWith(environment.urlApi)) {
    return next(request);
  }

  const useSession = inject(SessionContext);

  return from(useSession.getBearerToken().catch(() => null)).pipe(
    switchMap(token => {
      if (!token) {
        return next(request);
      }

      const requestClone = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      return next(requestClone);
    })
  );
}
