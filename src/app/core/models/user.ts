import { Model } from '@burand/angular/firestore';

export interface User extends Model {
  active: boolean;
  name: string;
  email: string;
  avatar: string | null;
  lastAccess: Date | null;
}
