import { Model } from '@burand/angular/firestore';
import { UserType } from '@enums/user-type';

export interface User extends Model {
  active: boolean;
  name: string;
  email: string;
  avatar: string | null;
  lastAccess: Date | null;
  type: UserType;
}
