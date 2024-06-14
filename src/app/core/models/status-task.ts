import { Model } from '@burand/angular';

export interface StatusTask extends Model {
  name: string;
  active: boolean;
}
