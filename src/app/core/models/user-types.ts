import { Model } from '@burand/angular';

export interface UserTypes extends Model {
  name: string;
  active: boolean;
}
