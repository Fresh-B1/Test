export interface Client {
  id: number;
  userId: number;
  accountNumber: string;
  surname: string;
  name: string;
  patronymic: string;
  birthday: string;
  INN: string;
  responsibleUser: string;
  status: string;
}

export interface RootState {
  clients: {
    clients: Client[];
  };
}
