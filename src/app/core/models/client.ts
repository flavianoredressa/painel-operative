import { User } from './user';

export interface Client extends User {
  CNPJ: string;
  manager: string;
  corporateName: string;
}
