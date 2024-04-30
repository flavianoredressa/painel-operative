import { UserType } from '@enums/user-type';
import { User } from './user';

export interface Admin extends User {
  type: UserType.ADMIN;
}
