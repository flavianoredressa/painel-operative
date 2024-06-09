import { User } from './user';
import { UserTypes } from './user-types';

export interface Admin extends User {
  type: UserTypes;
}
