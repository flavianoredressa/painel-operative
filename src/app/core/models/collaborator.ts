import { Model } from '@burand/angular';

export interface Collaborator extends Model {
  active: boolean;
  admission_date: Date;
  birth_date: Date;
}
