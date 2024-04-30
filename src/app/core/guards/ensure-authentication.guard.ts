import { inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';

import { SessionContext } from '@contexts/session.context';

export function ensureAuthentication(redirectTo = '/login'): () => Promise<boolean | UrlTree> {
  return async function guard(): Promise<boolean | UrlTree> {
    const sessionContext = inject(SessionContext);
    const router = inject(Router);

    const isLogged = await sessionContext.getFirebaseUser();
    if (!isLogged) {
      return router.parseUrl(redirectTo);
    }

    return true;
  };
}
