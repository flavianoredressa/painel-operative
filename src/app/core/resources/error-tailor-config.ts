import { errorTailorConfig as config } from '@burand/angular/resources';
import { ErrorTailorConfig } from '@ngneat/error-tailor';

export const errorTailorConfig: ErrorTailorConfig = {
  ...config,

  blurPredicate(element) {
    return (
      element.tagName === 'INPUT' ||
      element.tagName === 'SELECT' ||
      element.tagName === 'NG-SELECT' ||
      element.tagName.startsWith('APP-INPUT')
    );
  }
};
