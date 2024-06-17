import type { User } from '../page/Auth/reducer/type';
import type { Client } from '../page/ClientsList/type';

export type Action =
  | { type: 'clients/load'; payload: Client[] }
  | { type: 'client/updateStatus'; payload: Client[] }
  | { type: 'auth/registration'; payload: User }
  | { type: 'auth/login'; payload: User }
  | { type: 'auth/logout' }
  | { type: 'auth/userCheck'; payload: User }