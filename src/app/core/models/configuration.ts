import { Model } from '@burand/angular/firestore';

export interface Configuration extends Model {
  term: string;
  policy: string;
}
