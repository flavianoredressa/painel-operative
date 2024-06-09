import { Model } from '@burand/angular/firestore';
import { UserTypes } from './user-types';

export interface User extends Model {
  active: boolean;
  avatar: string | null;
  email: string;
  lastAccess: Date | null;
  name: string;
  type: UserTypes;
  CEP: string | null;
  cellphone: string | null;
  street: string | null;
  number: number | null;
  district: string | null;
  city: string | null;
  state: string | null;
}
