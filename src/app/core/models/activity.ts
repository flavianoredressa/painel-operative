import { Model } from '@burand/angular';

export interface Activity extends Model {
  name: string;
  active: boolean;
}
