import { Model } from '@burand/angular';

export interface Collaborator extends Model {
  admission_date: Date;
  birth_date: Date;
}
