export interface User {
  login: string;
  fullName: string;
  password: string;
}

export interface StateAuth {
  user: User | undefined;
}
